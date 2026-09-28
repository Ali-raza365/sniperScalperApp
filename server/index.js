const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const PORT = Number(process.env.PORT) || 8787;
const API_KEY = process.env.SIGNAL_API_KEY || 'sniper-scalper-dev-key';
const SIGNALS_FILE = path.join(__dirname, 'data', 'signals.json');
const OHLC_FILE = path.join(__dirname, 'data', 'ohlc.json');
const OHLC_MAX_BARS = 500;

const app = express();
app.use(cors());
app.use(express.json({ limit: '256kb' }));

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

function requireApiKey(req, res, next) {
  const header = req.header('x-api-key') || req.header('authorization') || '';
  const key = header.replace(/^Bearer\s+/i, '').trim();
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  return next();
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
  return {
    ticket: String(ticket),
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

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'sniper-scalper-signals' });
});

app.get('/signals', (req, res) => {
  const status = String(req.query.status || '').toLowerCase();
  let signals = readSignals();
  if (status === 'open' || status === 'closed') {
    signals = signals.filter(item => item.status === status);
  }
  signals.sort((a, b) => {
    const aTime = new Date(a.openedAt || a.updatedAt || 0).getTime();
    const bTime = new Date(b.openedAt || b.updatedAt || 0).getTime();
    return bTime - aTime;
  });
  res.json({ signals });
});

app.post('/signals', requireApiKey, (req, res) => {
  const mapped = toSignal(req.body || {});
  if (mapped.error) {
    return res.status(400).json({ error: mapped.error });
  }
  const store = readSignals();
  const index = store.findIndex(item => String(item.ticket) === mapped.ticket);
  if (index >= 0) {
    store[index] = { ...store[index], ...mapped };
  } else {
    store.push(mapped);
  }
  writeSignals(store);
  return res.status(index >= 0 ? 200 : 201).json({ signal: mapped });
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
    // Same bar re-posted (still forming) — update in place.
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
});
