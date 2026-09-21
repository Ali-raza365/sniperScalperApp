const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const PORT = Number(process.env.PORT) || 8787;
const API_KEY = process.env.SIGNAL_API_KEY || 'sniper-scalper-dev-key';
const DATA_FILE = path.join(__dirname, 'data', 'signals.json');

const app = express();
app.use(cors());
app.use(express.json({ limit: '128kb' }));

function readStore() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStore(signals) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(signals, null, 2));
}

function requireApiKey(req, res, next) {
  const header = req.header('x-api-key') || req.header('authorization') || '';
  const key = header.replace(/^Bearer\s+/i, '').trim();
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  return next();
}

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
  let signals = readStore();
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
  const store = readStore();
  const index = store.findIndex(item => String(item.ticket) === mapped.ticket);
  if (index >= 0) {
    store[index] = { ...store[index], ...mapped };
  } else {
    store.push(mapped);
  }
  writeStore(store);
  return res.status(index >= 0 ? 200 : 201).json({ signal: mapped });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sniper Scalper signals listening on http://0.0.0.0:${PORT}`);
  console.log('POST /signals requires x-api-key');
});
