# Sniper Scalper — MT5 ingest server

Public Express API for **admin-broadcast** live signals:

1. Admin MT5 EA posts tickets (`POST /signals` + `x-api-key`)
2. Only `ADMIN_MT5_ACCOUNT` may publish
3. Every app user reads `GET /signals` (**no login**)
4. FCM push to all registered devices on new/closed tickets

## Run locally

```bash
cd server
npm install
npm start
```

| Env | Purpose |
|-----|---------|
| `PORT` | Default `8787` |
| `SIGNAL_API_KEY` | EA shared secret |
| `ADMIN_MT5_ACCOUNT` | Admin MT5 login (required in production) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | FCM Admin SDK JSON string |

## Endpoints

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/health` | — | Includes `adminAccount` |
| GET | `/signals` | **public** | Admin account tickets only |
| POST | `/signals` | `x-api-key` | Rejects non-admin account |
| POST/DELETE | `/devices` | **public** | `{ fcmToken }` for push |
| GET/POST | `/ohlc` | GET public / POST key | Chart bars |

## Docker / Railway

Set `ADMIN_MT5_ACCOUNT` to the admin MetaTrader login, plus `SIGNAL_API_KEY` and Firebase credentials. Point the EA and app `EXPO_PUBLIC_API_URL` at the public HTTPS origin.

## Expert Advisor

Attach `ea/SniperScalperBridge.mq5` on the **admin** MT5 account only. Allow WebRequest for your API URL.
