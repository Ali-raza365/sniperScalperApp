# sniperScalperApp

SMC-style trading terminal app. Built with **Expo SDK 57**, **Expo Dev Client** (required for FCM push), and **EAS Build** for Play Store releases (package `com.sniperscalperapp`).

**Login is optional.** One admin MetaTrader 5 account publishes signals; every user (guest or signed-in) sees them.

## Stack

- Expo SDK 57 (React Native 0.86, React 19.2) + `expo-dev-client`
- React Navigation (native-stack + bottom-tabs) — **not** Expo Router
- `@react-native-firebase/messaging` for FCM (not Expo Go)
- `react-native-webview` for the live TradingView-style chart terminal
- `server/` — admin MT5 ingest, public signals, Firebase Admin FCM broadcast

## Getting started

```sh
npm install
# Place google-services.json at repo root (Firebase Android app com.sniperscalperapp)
npx eas-cli build -p android --profile development   # Dev Client APK
npx expo start --dev-client
```

Live signals + push: see [`docs/LIVE_SIGNALS_SETUP.md`](docs/LIVE_SIGNALS_SETUP.md).

## Project structure

- `src/navigation` — React Navigation stacks & tabs
- `src/screens/dashboard` — Home, Charts, Academy, News, Settings, Watchlist, About, Contact, FAQs
- `src/data` — mock data + repository layer (swappable for live providers)
- `src/components`, `src/utils`, `src/constants` — shared UI/helpers
- `desgin/` — original Stitch HTML design references (typo kept intentionally to match design source)
- `server/` — admin MT5 ingest, public `/signals`, `/devices` FCM registration
- `docs/LIVE_SIGNALS_SETUP.md` — admin broadcast + FCM checklist
- `src/providers` — AlertsProvider (optional push registration)

## Testing

```sh
npm test
```

## Release (Play Store)

Production builds go through **EAS Build** using package `com.sniperscalperapp`
(set in [`app.json`](app.json)) and a `production` profile (see
[`eas.json`](eas.json)) that outputs an Android App Bundle with
`versionCode` auto-incremented.

To update the existing Play Store listing, the build **must** be signed with
the same upload keystore currently used for that listing — a new/auto-generated
keystore will produce an AAB Google Play will reject as a different app.

One-time setup (run with your own EAS account, not a shared/dev one):

```sh
npx eas-cli login
npx eas-cli init            # links this repo to your EAS project
npx eas-cli credentials     # → Android → production →
                             #   "Set up a new keystore" → "I want to upload my own"
                             #   point it at your existing .jks/.keystore file
```

Then build and submit:

```sh
npx eas-cli build -p android --profile production
npx eas-cli submit -p android --profile production
```

Before the first production build, confirm `android.versionCode` in
`app.json`/EAS is higher than the version currently live on Play Store.
