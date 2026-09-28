# Sniper Scalper — MT5 ingest server

Local Express server that the MT5 Expert Advisor (or any bridge) posts live
tickets and OHLC bars into. The app polls this server via
`LiveMarketProvider` (see [`src/data/repository.ts`](../src/data/repository.ts))
when `EXPO_PUBLIC_API_URL` is set; otherwise it runs entirely on mock data.

## Run

```bash
cd server
npm install
npm start
```

Listens on `http://0.0.0.0:8787`.

Default API key: `sniper-scalper-dev-key`
Override with `SIGNAL_API_KEY` and `PORT` if needed.

## Endpoints

- `GET /health` — liveness
- `GET /signals?status=open|closed` — newest first
- `POST /signals` — upsert by `ticket` (header `x-api-key`)
- `GET /ohlc?symbol=XAUUSD&timeframe=15m&limit=200` — chronological bars
- `POST /ohlc` — upsert a bar by `symbol` + `timeframe` + `time` (header `x-api-key`)

### Signal payload

```json
{
  "ticket": 123456,
  "symbol": "EURUSD",
  "side": "BUY",
  "volume": 0.1,
  "price": 1.0845,
  "sl": 1.081,
  "tp": 1.092,
  "comment": "FVG long",
  "openedAt": "2026-09-21T12:00:00.000Z",
  "status": "open",
  "profit": 0
}
```

### OHLC bar payload

```json
{
  "symbol": "XAUUSD",
  "timeframe": "15m",
  "time": 1758470400000,
  "open": 2045.1,
  "high": 2046.8,
  "low": 2044.2,
  "close": 2045.9,
  "volume": 1240
}
```

## Smoke test

```bash
cd server
node -e "fetch('http://127.0.0.1:8787/signals',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':'sniper-scalper-dev-key'},body:JSON.stringify({ticket:1001,symbol:'EURUSD',side:'BUY',volume:0.1,price:1.0845,sl:1.081,tp:1.092,comment:'FVG long',status:'open'})}).then(r=>r.json()).then(j=>console.log(JSON.stringify(j,null,2)))"
node -e "fetch('http://127.0.0.1:8787/signals').then(r=>r.json()).then(j=>console.log(JSON.stringify(j,null,2)))"
node -e "fetch('http://127.0.0.1:8787/ohlc',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':'sniper-scalper-dev-key'},body:JSON.stringify({symbol:'XAUUSD',timeframe:'15m',time:Date.now(),open:2045,high:2046,low:2044,close:2045.5,volume:100})}).then(r=>r.json()).then(j=>console.log(JSON.stringify(j,null,2)))"
node -e "fetch('http://127.0.0.1:8787/ohlc?symbol=XAUUSD&timeframe=15m').then(r=>r.json()).then(j=>console.log(JSON.stringify(j,null,2)))"
```

## Phone vs emulator

- Android emulator: app uses `http://10.0.2.2:8787`
- iOS simulator: `http://127.0.0.1:8787`
- Physical device (Expo Go): set `EXPO_PUBLIC_API_URL` to your PC's LAN IP, e.g. `http://192.168.1.20:8787`. Allow the port through your firewall.

## Expert Advisor

1. Copy `ea/SniperScalperBridge.mq5` into MetaTrader 5 `MQL5/Experts`.
2. Compile in MetaEditor.
3. Tools → Options → Expert Advisors: enable **Allow WebRequest for listed URL** and add `http://127.0.0.1:8787` (or your LAN URL).
4. Attach the EA to a chart. Inputs: `InpServerUrl`, `InpApiKey`, `InpOhlcTimeframe`.

The EA posts a signal on every deal (open/close) and posts/updates the
current bar's OHLC on every new bar for the chart's timeframe.
