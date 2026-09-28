# sniperScalperApp

SMC-style trading terminal app. Built with **Expo SDK 57**, using **Expo Go** for day-to-day development and **EAS Build** for Play Store releases (package `com.sniperscalperapp`, same identity as the live listing).

## Stack

- Expo SDK 57 (React Native 0.86, React 19.2)
- React Navigation (native-stack + bottom-tabs) — **not** Expo Router
- `@expo/vector-icons` for iconography
- `react-native-webview` for the live TradingView-style chart terminal (Phase 2)

## Getting started

```sh
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android/iOS) or press `a` / `i` for an emulator/simulator.

## Project structure

- `src/navigation` — React Navigation stacks & tabs
- `src/screens/dashboard` — Home, Charts, Academy, News, Settings, Watchlist, About, Contact, FAQs
- `src/data` — mock data + repository layer (swappable for live providers)
- `src/components`, `src/utils`, `src/constants` — shared UI/helpers
- `desgin/` — original Stitch HTML design references (typo kept intentionally to match design source)
- `server/` — local MT5 ingest server (signals/OHLC) for live data, added in Phase 3

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
