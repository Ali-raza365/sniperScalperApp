const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const PORT = Number(process.env.PORT) || 8787;
const API_KEY = process.env.SIGNAL_API_KEY || 'sniper-scalper-dev-key';
const SIGNALS_FILE = path.join(__dirname, 'data', 'signals.json');
const OHLC_FILE = path.join(__dirname, 'data', 'ohlc.json');
const DEVICES_FILE = path.join(__dirname, 'data', 'devices.json');
const OHLC_MAX_BARS = 500;

const app = express();
app.use(cors());
app.use(express.json({ limit: '256kb' }));

// ---------- Firebase Admin (optional until credentials are configured) ----------

let admin = null;
let firebaseReady = false;

function initFirebase() {
  try {
    // Lazy require so local EA-only testing works without firebase-admin installed yet.
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
      'Firebase Admin not configured — app Bearer auth and FCM push disabled until you set FIREBASE_SERVICE_ACCOUNT_JSON or place server/firebase-service-account.json',
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

async function requireFirebaseUser(req, res, next) {
  if (!firebaseReady || !admin) {
    return res.status(503).json({
      error: 'firebase_unavailable',
      message: 'Configure Firebase Admin credentials on the server',
    });
  }
  const header = req.header('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res.status(401).json({ error: 'missing_bearer_token' });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(match[1].trim());
    req.user = { uid: decoded.uid, email: decoded.email || null };
    return next();
  } catch {
    return res.status(401).json({ error: 'invalid_token' });
  }
}

function accountsForUid(uid) {
  return [
    ...new Set(
      readDevices()
        .filter(d => d.uid === uid && d.account)
        .map(d => String(d.account)),
    ),
  ];
}

// ---------- signals (MT5 deal tickets) ----------

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

async function sendPushForSignal(signal, isNew) {
  if (!firebaseReady || !admin || !signal.account) return;
  if (!isNew && signal.status !== 'closed') return;

  const devices = readDevices().filter(
    d => d.fcmToken && String(d.account) === String(signal.account),
  );
  const tokens = [...new Set(devices.map(d => d.fcmToken))];
  if (!tokens.length) return;

  const title =
    signal.status === 'closed'
      ? `Closed ${signal.side} ${signal.symbol}`
      : `${signal.side} ${signal.symbol}`;
  const bodyParts = [];
  if (signal.volume) bodyParts.push(`${signal.volume} lots`);
  if (signal.price != null) bodyParts.push(`@ ${signal.price}`);
  if (signal.comment) bodyParts.push(signal.comment);
  const body = bodyParts.join(' · ') || `Account ${signal.account}`;

  try {
    const result = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title, body },
      data: {
        ticket: String(signal.ticket),
        symbol: String(signal.symbol),
        side: String(signal.side),
        account: String(signal.account),
        status: String(signal.status),
      },
      android: { priority: 'high' },
    });

    // Drop invalid tokens
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
  });
});

app.get('/signals', requireFirebaseUser, (req, res) => {
  const status = String(req.query.status || '').toLowerCase();
  const registered = accountsForUid(req.user.uid);
  const requested = String(req.query.account || '').trim();

  // Prefer explicit ?account= (Settings MT5 login). Otherwise fall back to
  // accounts linked via FCM device registration. No account → empty list
  // (never leak other users' tickets).
  let accountFilter = [];
  if (requested) {
    accountFilter = [requested];
  } else if (registered.length) {
    accountFilter = registered;
  } else {
    return res.json({ signals: [] });
  }

  let signals = readSignals().filter(
    item => item.account != null && accountFilter.includes(String(item.account)),
  );
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
  const store = readSignals();
  const index = store.findIndex(item => String(item.ticket) === mapped.ticket);
  const isNew = index < 0;
  if (index >= 0) {
    store[index] = { ...store[index], ...mapped };
  } else {
    store.push(mapped);
  }
  writeSignals(store);

  // Fire-and-forget push
  sendPushForSignal(mapped, isNew).catch(() => undefined);

  return res.status(isNew ? 201 : 200).json({ signal: mapped });
});

// ---------- devices (FCM tokens) ----------

app.post('/devices', requireFirebaseUser, (req, res) => {
  const fcmToken = String(req.body?.fcmToken || '').trim();
  const account = String(req.body?.account || '').trim();
  if (!fcmToken) return res.status(400).json({ error: 'fcmToken is required' });
  if (!account) return res.status(400).json({ error: 'account is required' });

  const devices = readDevices();
  const idx = devices.findIndex(
    d => d.uid === req.user.uid && d.fcmToken === fcmToken,
  );
  const entry = {
    uid: req.user.uid,
    email: req.user.email,
    fcmToken,
    account,
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

app.delete('/devices', requireFirebaseUser, (req, res) => {
  const fcmToken = String(req.body?.fcmToken || req.query.fcmToken || '').trim();
  if (!fcmToken) return res.status(400).json({ error: 'fcmToken is required' });
  const next = readDevices().filter(
    d => !(d.uid === req.user.uid && d.fcmToken === fcmToken),
  );
  writeDevices(next);
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
  console.log('GET /signals and /devices require Firebase Bearer ID token');
});
