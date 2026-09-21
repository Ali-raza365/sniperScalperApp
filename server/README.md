# Sniper Scalper — MT5 ingest server

Express endpoint the Expert Advisor posts into. The app polls `GET /signals` in Phase 4.

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
- `POST /signals` — upsert by `ticket` (header `x-api-key`)
- `GET /signals?status=open|closed` — newest first

Payload:

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

## Smoke test

```bash
cd server
node -e "fetch('http://127.0.0.1:8787/signals',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':'sniper-scalper-dev-key'},body:JSON.stringify({ticket:1001,symbol:'EURUSD',side:'BUY',volume:0.1,price:1.0845,sl:1.081,tp:1.092,comment:'FVG long',status:'open'})}).then(r=>r.json()).then(j=>console.log(JSON.stringify(j,null,2)))"
node -e "fetch('http://127.0.0.1:8787/signals').then(r=>r.json()).then(j=>console.log(JSON.stringify(j,null,2)))"
```

## Phone vs emulator

- Android emulator: app uses `http://10.0.2.2:8787`
- iOS simulator: `http://127.0.0.1:8787`
- Physical device: set `API_BASE_URL` in `src/data/apiConfig.ts` to your PC LAN IP, e.g. `http://192.168.1.20:8787`. Allow the port through Windows Firewall.

## Expert Advisor

1. Copy `ea/SniperScalperBridge.mq5` into MetaTrader 5 `MQL5/Experts`.
2. Compile in MetaEditor.
3. Tools → Options → Expert Advisors: enable **Allow WebRequest for listed URL** and add `http://127.0.0.1:8787` (or the LAN URL).
4. Attach the EA to a chart. Inputs: `InpServerUrl`, `InpApiKey`.
