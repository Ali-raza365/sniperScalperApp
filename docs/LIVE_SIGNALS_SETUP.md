# Live MT5 signals (admin broadcast) + FCM push

One **admin MetaTrader 5 account** publishes trades. **Every app user** sees those signals and can get push alerts — **no per-user MT5 account**.

**Login is optional** (Settings → Sign in / Create account). Guests can use the full app; Firebase Email/Password is only for optional accounts.

Requires an **Expo Dev Client** build for FCM (`@react-native-firebase/messaging` does not work in Expo Go).

## Architecture

1. Admin EA on MT5 → `POST /signals` (API key) with `account` = admin login  
2. Server stores only that admin account’s tickets (`ADMIN_MT5_ACCOUNT`)  
3. App `GET /signals` (public) → Home LIVE SIGNALS for all users  
4. Server FCM → every registered device when Signal Alerts is on  

## 1. Firebase (push only)

1. Firebase project → Android app package **`com.sniperscalperapp`**  
2. Drop **`google-services.json`** at repo root  
3. Service account private key → server env `FIREBASE_SERVICE_ACCOUNT_JSON` (never commit)  

Enable **Email/Password** in Firebase Auth if you want optional Sign in / Register in Settings.

## 2. Deploy ingest server

```bash
cd server
npm install
```

Env:

| Var | Purpose |
|-----|---------|
| `SIGNAL_API_KEY` | EA `x-api-key` |
| `ADMIN_MT5_ACCOUNT` | Admin MT5 login number (only this account can publish) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | FCM Admin SDK |

Docker / Railway: see [`server/README.md`](../server/README.md).

## 3. App

```env
EXPO_PUBLIC_API_URL=https://your-service.up.railway.app
```

```bash
npx eas-cli build -p android --profile development
npx expo start --dev-client
```

Open the app (guest by default). Settings → **Signal Alerts** on for push. Optional: Sign in / Create account.

## 4. Admin MT5 EA

1. Copy [`server/ea/SniperScalperBridge.mq5`](../server/ea/SniperScalperBridge.mq5)  
2. Allow WebRequest for the public API URL  
3. Attach EA on the **admin** account; `InpServerUrl` + `InpApiKey`  

Trades from any other MT5 login are rejected when `ADMIN_MT5_ACCOUNT` is set.

## 5. Smoke test

1. Admin places a trade → all users see it on Home LIVE SIGNALS  
2. With alerts on + app backgrounded → FCM notification  
3. Non-admin account posts → `403 not_admin_account`  
