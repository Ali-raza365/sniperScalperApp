# Sniper Scalper — MT5 ingest server

Public Express API that:

1. Accepts MT5 EA posts (`POST /signals`, `POST /ohlc`) with `x-api-key`
2. Stores tickets with **MT5 account login**
3. Serves filtered signals to the app (`GET /signals`) with **Firebase ID token**
4. Registers FCM device tokens (`POST /devices`) and sends **FCM push** on new tickets

## Run locally

```bash
cd server
npm install
npm start
```

Listens on `http://0.0.0.0:8787`.

| Env | Purpose |
|-----|---------|
| `PORT` | Listen port (default `8787`) |
| `SIGNAL_API_KEY` | Shared secret for EA posts (default `sniper-scalper-dev-key`) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full service-account JSON string (Railway secret) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to service-account JSON file |

You can also drop `server/firebase-service-account.json` (gitignored) for local Admin SDK.

Without Firebase credentials, EA ingest still works; app Bearer auth and FCM push return `503` / are skipped.

## Endpoints

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/health` | — | `{ ok, firebase }` |
| POST | `/signals` | `x-api-key` | Upsert by ticket; includes `account`; FCM on new ticket |
| GET | `/signals` | Bearer Firebase ID | Filtered to caller's registered account(s); `?account=` / `?status=` |
| POST | `/devices` | Bearer | `{ fcmToken, account }` upsert |
| DELETE | `/devices` | Bearer | `{ fcmToken }` unregister |
| GET/POST | `/ohlc` | GET open / POST key | Chart bars |

### Signal payload (EA)

```json
{
  "ticket": 123456,
  "account": 98765432,
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

## Docker / Railway

```bash
cd server
docker build -t sniper-scalper-signals .
docker run -p 8787:8787 \
  -e SIGNAL_API_KEY=your-key \
  -e FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}' \
  sniper-scalper-signals
```

**Railway:** create a service from `server/`, set the env vars above, deploy. Copy the public HTTPS URL into:

- App `.env` → `EXPO_PUBLIC_API_URL=https://…`
- EA input `InpServerUrl` (no trailing slash)
- MT5 WebRequest allow-list for that origin

## Expert Advisor

1. Copy `ea/SniperScalperBridge.mq5` into MetaTrader 5 `MQL5/Experts`.
2. Compile in MetaEditor.
3. Tools → Options → Expert Advisors: enable **Allow WebRequest for listed URL** and add your public HTTPS origin (or `http://127.0.0.1:8787` for local).
4. Attach the EA. Inputs: `InpServerUrl`, `InpApiKey`, `InpOhlcTimeframe`.

Every deal POST includes `account` = `AccountInfoInteger(ACCOUNT_LOGIN)`.

## Smoke test (EA path)

```bash
# Start server with Firebase configured, then:
node -e "fetch('http://127.0.0.1:8787/signals',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':'sniper-scalper-dev-key'},body:JSON.stringify({ticket:1001,account:12345678,symbol:'EURUSD',side:'BUY',volume:0.1,price:1.0845,status:'open'})}).then(r=>r.json()).then(console.log)"
```

`GET /signals` requires a real Firebase ID token from a signed-in user who registered that account via `POST /devices`.
