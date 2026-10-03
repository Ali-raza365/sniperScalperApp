const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const PORT = Number(process.env.PORT) || 8787;
const API_KEY = process.env.SIGNAL_API_KEY || 'sniper-scalper-dev-key';
/** Single admin MT5 login that publishes signals to every app user. */
const ADMIN_MT5_ACCOUNT = String(process.env.ADMIN_MT5_ACCOUNT || '').trim();
const SIGNALS_FILE = path.join(__dirname, 'data', 'signals.json');
const OHLC_FILE = path.join(__dirname, 'data', 'ohlc.json');
const DEVICES_FILE = path.join(__dirname, 'data', 'devices.json');
const OHLC_MAX_BARS = 500;

const app = express();
app.use(cors());
app.use(express.json({ limit: '256kb' }));

// ---------- Firebase Admin (FCM push only — no end-user auth) ----------

let admin = null;
let firebaseReady = false;

function initFirebase() {
  try {
    // eslint-disable-next-line global-require
    admin = require('firebase-admin');
    if (admin.apps.length) {
      firebaseReady = true;
      return;
    }

    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      const json = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      admin.initializeApp({ credential: admin.credential.cert(json) });
      firebaseReady = true;
      console.log('Firebase Admin initialized from FIREBASE_SERVICE_ACCOUNT_JSON');
      return;
    }

    const credPath =
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      path.join(__dirname, 'firebase-service-account.json');
    if (fs.existsSync(credPath)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const json = require(credPath);
      admin.initializeApp({ credential: admin.credential.cert(json) });
      firebaseReady = true;
      console.log('Firebase Admin initialized from', credPath);
      return;
    }

    console.warn(
      'Firebase Admin not configured — FCM push disabled until you set FIREBASE_SERVICE_ACCOUNT_JSON or place server/firebase-service-account.json',
    );
  } catch (err) {
    console.warn('Firebase Admin init failed:', err.message);
  }
}

initFirebase();

// ---------- storage helpers ----------

function readJson(file, fallback) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function readSignals() {
  const parsed = readJson(SIGNALS_FILE, []);
  return Array.isArray(parsed) ? parsed : [];
}

function writeSignals(signals) {
  writeJson(SIGNALS_FILE, signals);
}

function readOhlcStore() {
  const parsed = readJson(OHLC_FILE, {});
  return parsed && typeof parsed === 'object' ? parsed : {};
}

function writeOhlcStore(store) {
  writeJson(OHLC_FILE, store);
}

function readDevices() {
  const parsed = readJson(DEVICES_FILE, []);
  return Array.isArray(parsed) ? parsed : [];
}

function writeDevices(devices) {
  writeJson(DEVICES_FILE, devices);
}

function requireApiKey(req, res, next) {
  const header = req.header('x-api-key') || '';
  const key = header.replace(/^Bearer\s+/i, '').trim();
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  return next();
}

function isAdminAccount(account) {
  if (!ADMIN_MT5_ACCOUNT) return true; // unset = accept any (local/dev)
  return account != null && String(account) === ADMIN_MT5_ACCOUNT;
}

// ---------- signals (admin MT5 → all users) ----------

function normalizeSide(value) {
  return String(value || '').toUpperCase() === 'SELL' ? 'SELL' : 'BUY';
}

function normalizeStatus(value) {
  return String(value || '').toLowerCase() === 'closed' ? 'closed' : 'open';
}

function toSignal(body) {
  const ticket = body.ticket;
  if (ticket == null || String(ticket).trim() === '') {
    return { error: 'ticket is required' };
  }
  const symbol = String(body.symbol || '').trim().toUpperCase();
  if (!symbol) {
    return { error: 'symbol is required' };
  }
  const accountRaw = body.account;
  const account =
    accountRaw == null || String(accountRaw).trim() === ''
      ? null
      : String(accountRaw).trim();

  return {
    ticket: String(ticket),
    account,
    symbol,
    side: normalizeSide(body.side),
    volume: Number(body.volume) || 0,
    price: body.price ?? null,
    sl: body.sl ?? null,
    tp: body.tp ?? null,
    comment: body.comment != null ? String(body.comment) : '',
    openedAt: body.openedAt || new Date().toISOString(),
    status: normalizeStatus(body.status),
    profit: body.profit == null ? null : Number(body.profit),
    updatedAt: new Date().toISOString(),
  };
}

async function sendPushToAllDevices(signal, isNew) {
  if (!firebaseReady || !admin) return;
  if (!isNew && signal.status !== 'closed') return;

  const tokens = [...new Set(readDevices().map(d => d.fcmToken).filter(Boolean))];
  if (!tokens.length) return;

  const title =
    signal.status === 'closed'
      ? `Closed ${signal.side} ${signal.symbol}`
      : `${signal.side} ${signal.symbol}`;
  const bodyParts = [];
  if (signal.volume) bodyParts.push(`${signal.volume} lots`);
  if (signal.price != null) bodyParts.push(`@ ${signal.price}`);
  if (signal.comment) bodyParts.push(signal.comment);
  const body = bodyParts.join(' · ') || 'New Sniper Scalper signal';

  try {
    const result = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title, body },
      data: {
        ticket: String(signal.ticket),
        symbol: String(signal.symbol),
        side: String(signal.side),
        account: String(signal.account || ''),
        status: String(signal.status),
      },
      android: { priority: 'high' },
    });

    if (result.failureCount > 0) {
      const invalid = new Set();
      result.responses.forEach((r, i) => {
        if (!r.success) {
          const code = r.error?.code || '';
          if (
            code.includes('registration-token-not-registered') ||
            code.includes('invalid-registration-token')
          ) {
            invalid.add(tokens[i]);
          }
        }
      });
      if (invalid.size) {
        writeDevices(readDevices().filter(d => !invalid.has(d.fcmToken)));
      }
    }
  } catch (err) {
    console.warn('FCM send failed:', err.message);
  }
}

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'sniper-scalper-signals',
    firebase: firebaseReady,
    adminAccount: ADMIN_MT5_ACCOUNT || null,
  });
});

/** Public — every app user sees admin account signals. */
app.get('/signals', (req, res) => {
  const status = String(req.query.status || '').toLowerCase();
  let signals = readSignals();

  if (ADMIN_MT5_ACCOUNT) {
    signals = signals.filter(item => String(item.account) === ADMIN_MT5_ACCOUNT);
  }

  if (status === 'open' || status === 'closed') {
    signals = signals.filter(item => item.status === status);
  }
  signals.sort((a, b) => {
    const aTime = new Date(a.openedAt || a.updatedAt || 0).getTime();
    const bTime = new Date(b.openedAt || b.updatedAt || 0).getTime();
    return bTime - aTime;
  });
  return res.json({ signals });
});

app.post('/signals', requireApiKey, async (req, res) => {
  const mapped = toSignal(req.body || {});
  if (mapped.error) {
    return res.status(400).json({ error: mapped.error });
  }

  if (!isAdminAccount(mapped.account)) {
    return res.status(403).json({
      error: 'not_admin_account',
      message: `Only ADMIN_MT5_ACCOUNT (${ADMIN_MT5_ACCOUNT}) may publish signals`,
    });
  }

  const store = readSignals();
  const index = store.findIndex(item => String(item.ticket) === mapped.ticket);
  const isNew = index < 0;
  if (index >= 0) {
    store[index] = { ...store[index], ...mapped };
  } else {
    store.push(mapped);
  }
  writeSignals(store);

  sendPushToAllDevices(mapped, isNew).catch(() => undefined);

  return res.status(isNew ? 201 : 200).json({ signal: mapped });
});

// ---------- devices (public FCM token register — no user auth) ----------

app.post('/devices', (req, res) => {
  const fcmToken = String(req.body?.fcmToken || '').trim();
  if (!fcmToken) return res.status(400).json({ error: 'fcmToken is required' });

  const devices = readDevices();
  const idx = devices.findIndex(d => d.fcmToken === fcmToken);
  const entry = {
    fcmToken,
    updatedAt: new Date().toISOString(),
  };
  if (idx >= 0) {
    devices[idx] = { ...devices[idx], ...entry };
  } else {
    devices.push(entry);
  }
  writeDevices(devices);
  return res.status(idx >= 0 ? 200 : 201).json({ device: entry });
});

app.delete('/devices', (req, res) => {
  const fcmToken = String(req.body?.fcmToken || req.query.fcmToken || '').trim();
  if (!fcmToken) return res.status(400).json({ error: 'fcmToken is required' });
  writeDevices(readDevices().filter(d => d.fcmToken !== fcmToken));
  return res.json({ ok: true });
});

// ---------- OHLC bars ----------

function ohlcKey(symbol, timeframe) {
  return `${String(symbol || '').trim().toUpperCase()}:${String(timeframe || '').trim()}`;
}

function toBar(body) {
  const symbol = String(body.symbol || '').trim().toUpperCase();
  const timeframe = String(body.timeframe || '').trim();
  const time = body.time != null ? Number(body.time) : Date.now();
  if (!symbol) return { error: 'symbol is required' };
  if (!timeframe) return { error: 'timeframe is required' };
  if (!Number.isFinite(time)) return { error: 'time must be a unix timestamp (ms)' };

  const open = Number(body.open ?? body.o);
  const high = Number(body.high ?? body.h);
  const low = Number(body.low ?? body.l);
  const close = Number(body.close ?? body.c);
  if ([open, high, low, close].some(v => !Number.isFinite(v))) {
    return { error: 'open/high/low/close must be numbers' };
  }

  return {
    symbol,
    timeframe,
    time,
    open,
    high,
    low,
    close,
    volume: Number(body.volume ?? body.v) || 0,
  };
}

app.get('/ohlc', (req, res) => {
  const symbol = String(req.query.symbol || '').trim().toUpperCase();
  const timeframe = String(req.query.timeframe || '').trim();
  const limit = Math.min(Number(req.query.limit) || 200, OHLC_MAX_BARS);
  if (!symbol || !timeframe) {
    return res.status(400).json({ error: 'symbol and timeframe query params are required' });
  }
  const store = readOhlcStore();
  const bars = store[ohlcKey(symbol, timeframe)] || [];
  return res.json({ symbol, timeframe, bars: bars.slice(-limit) });
});

app.post('/ohlc', requireApiKey, (req, res) => {
  const mapped = toBar(req.body || {});
  if (mapped.error) {
    return res.status(400).json({ error: mapped.error });
  }
  const store = readOhlcStore();
  const key = ohlcKey(mapped.symbol, mapped.timeframe);
  const bars = store[key] || [];

  const lastIndex = bars.length - 1;
  if (lastIndex >= 0 && bars[lastIndex].time === mapped.time) {
    bars[lastIndex] = mapped;
  } else {
    bars.push(mapped);
    if (bars.length > OHLC_MAX_BARS) {
      bars.splice(0, bars.length - OHLC_MAX_BARS);
    }
  }

  store[key] = bars;
  writeOhlcStore(store);
  return res.status(201).json({ bar: mapped });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sniper Scalper ingest server listening on http://0.0.0.0:${PORT}`);
  console.log('POST /signals and POST /ohlc require header x-api-key');
  console.log(
    ADMIN_MT5_ACCOUNT
      ? `Admin MT5 account (broadcast source): ${ADMIN_MT5_ACCOUNT}`
      : 'ADMIN_MT5_ACCOUNT unset — accepting signals from any account (dev)',
  );
  console.log('GET /signals and /devices are public (no user auth)');
});
