# Live MT5 signals + Firebase Auth + FCM

End-to-end setup for account-filtered live signals and push notifications when the app is closed. Requires an **Expo Dev Client** build — `@react-native-firebase/*` does **not** work in Expo Go.

## 1. Firebase Console

1. Create (or open) a Firebase project.
2. Add an **Android** app with package name **`com.sniperscalperapp`** (must match [`app.json`](../app.json)).
3. Download **`google-services.json`** and place it at the **repo root** (same folder as `app.json`). This file is safe to commit (client config).
4. Authentication → Sign-in method → enable **Email/Password**.
5. Project settings → Service accounts → Generate new private key → save as `server/firebase-service-account.json` locally **or** paste the JSON into Railway as `FIREBASE_SERVICE_ACCOUNT_JSON`. **Never commit** the service account file (see `.gitignore`).

Optional later: add an iOS app + `GoogleService-Info.plist`.

## 2. Deploy the ingest server

```bash
cd server
npm install
# Local: place firebase-service-account.json, then npm start
```

Or deploy with Docker / Railway (see [`server/README.md`](../server/README.md)):

- `SIGNAL_API_KEY` — same value you put in the EA `InpApiKey`
- `FIREBASE_SERVICE_ACCOUNT_JSON` — full JSON string of the service account

Note the public HTTPS URL, e.g. `https://your-service.up.railway.app`.

## 3. App env + Dev Client

Create `.env` in the repo root (gitignored):

```env
EXPO_PUBLIC_API_URL=https://your-service.up.railway.app
```

Build and install a development client (native Firebase modules):

```bash
npm install
npx eas-cli build -p android --profile development
# install the APK, then:
npx expo start --dev-client
```

Or locally after prebuild: `npx expo prebuild` + run on a device/emulator.

## 4. Sign in and configure Settings

1. Open the Dev Client → Register / Login (Firebase email/password).
2. Settings → enter your **MT5 Account Login** (the number shown in MT5).
3. Turn **Signal Alerts** on (grants notification permission and registers the FCM token with `POST /devices`).

## 5. MetaTrader 5 EA

1. Copy [`server/ea/SniperScalperBridge.mq5`](../server/ea/SniperScalperBridge.mq5) into `MQL5/Experts`, compile.
2. Tools → Options → Expert Advisors → **Allow WebRequest for listed URL** → add your API origin (exact HTTPS URL, no path).
3. Attach EA; set `InpServerUrl` to that origin and `InpApiKey` to match the server.

## 6. Smoke test

1. Place a trade on the configured MT5 account.
2. Home → **LIVE SIGNALS** should show the ticket (side / volume when live).
3. Background or kill the app → another trade should deliver an **FCM** notification.
4. Trades on a different MT5 login must not appear for this user.

## Mock fallback

If `EXPO_PUBLIC_API_URL` is unset, Home still shows bundled mock signals. Firebase Auth can still run; live fetch / device registration simply no-ops until the URL is set.
