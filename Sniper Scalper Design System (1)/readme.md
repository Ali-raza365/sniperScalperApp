# Sniper Scalper Design System

**Sniper Scalper — Precision Trading Terminal** is an Android trading-education and market-analysis app by **FX Ramzan** (Founder & Lead Strategist, office: Ahmadpur East). It combines live TradingView-style charting (XAUUSD gold spot, candles, MA, RSI, volume), an **Academy** of institutional trading courses (Smart Money Concepts, etc.), a market **News** feed with breaking-news ticker, signal alerts, and settings.

## Sources
- 6 Android app screenshots in `uploads/` (splash, XAUUSD chart, Academy list, Academy course detail, News feed, Settings). **No codebase, Figma, or font/logo files were provided** — every token and component here is reconstructed from those screenshots.
- No logo asset exists in the sources. The splash shows a peach shield glyph in a dark squircle; we do NOT recreate it as a brand mark. Where a mark would go, render "SNIPER SCALPER" in the tracked-uppercase app-bar style.

## Brand in one line
A dark, institutional trading terminal: near-black warm surfaces, one signature peach-orange accent, tracked uppercase labels, Material Android bones, market teal/red reserved strictly for price data.

## CONTENT FUNDAMENTALS
- **Voice**: authoritative, institutional, slightly dramatic "trading floor" jargon. Examples: "PRECISION TRADING TERMINAL", "INSTITUTIONAL TRAINING", "THE PROTOCOL", "Deconstruct the financial matrix", "SYSTEM ARCHITECTURE", "CONNECTING TO SERVER", "SERVER STATUS: OPTIMAL".
- **Casing**: UPPERCASE + heavy letter-spacing for all labels, eyebrows, app bars, buttons ("ENROLL NOW", "VIEW COURSE →", "LIVE ENROLLMENT OPEN"). Sentence case for body copy and card titles.
- **Body copy**: benefit-led, 1–3 sentences, second person ("rewire your perception of liquidity", "Master the mechanics…"). No emoji anywhere.
- **Compliance-conscious**: the app itself carries the disclaimer "For educational purposes only. Not financial advice — trading involves risk of loss." Keep it on marketing/education surfaces.
- Feature blurbs are terse noun-phrases + one clause: "LIQUIDITY — Locate the fuel that drives institutional moves."

## VISUAL FOUNDATIONS
- **Color**: layered warm near-blacks (`#121212` app, `#1c1a18` card, `#262320` nested). One accent family: peach `#f6b17a` (headings, icons, filled CTAs) and vivid orange `#f5820d` (toggles, active nav pill, links, breaking-news chip). Body text is warm tan `#c9b8a4`; headings off-white `#eceae7`. Teal `#26a69a` / red `#ef5350` are **market data only** — never decorative. Blue `#1a6ce0` marks course levels; soft blue `#aecbfa` tags news categories.
- **Type**: Roboto (Material Android). Big light-tracked display headings ("Courses" ~64px med), 40px course titles, 17px body at 1.55. Signature move: 700-weight uppercase with 0.12em (app bar) to 0.28em (eyebrow) tracking.
- **Backgrounds**: flat solid darks; photographic imagery only inside media cards (chart-monitor photography, warm orange-lit), often with a bottom-fade protection gradient into the card surface. No patterns, no decorative gradients.
- **Shape**: very round. Pills (999px) for chips/CTAs/toggles; 24px large cards; 16px nested cards & media. App icon is a squircle.
- **Elevation**: elevation = lighter surface, shadows minimal/none. Cards are borderless surface steps; occasional 1px `rgba(255,255,255,.08)` hairline dividers inside list groups.
- **Buttons**: filled CTA = peach fill, dark text, pill, uppercase tracked. Text/link action = peach uppercase + `→`. Chips = dark pill with dot or icon prefix.
- **Toggles**: Material switch, orange track when on, gray-brown when off.
- **Nav**: bottom bar, 5 destinations (Home, Charts, Academy, News, Settings), Material icons; active item peach with a soft dark-peach pill halo behind the icon.
- **Section headers**: 3px peach (or blue) left bar + tracked uppercase label, muted color.
- **Imagery**: warm, orange-toned photos of trading screens/desks; dark & moody; no illustration style present.
- **Motion**: assume Material standard easing, fast fades/slides; no bounces. Hover (web recreations): slight surface lighten; press: opacity .85.
- **Layout**: 20px screen margins, generous vertical whitespace, single-column stacks; stat rows (icon + label over value) in two columns.

## ICONOGRAPHY
- The app uses **Material Symbols/Icons** (home, show_chart, school, article, settings, notifications, mail, info, help, bookmark, share, schedule, menu_book…). We link **Material Symbols Outlined** from Google Fonts CDN — same set, zero substitution risk. Icons render in peach on dark.
- No custom SVG icon set, no emoji, occasional unicode `→` in link-buttons.
- No logo file exists (see Sources). **Do not draw a shield mark.**

## Index
- `styles.css` → `tokens/` (colors, typography, spacing, fonts)
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/core/` — Button, LinkAction, Chip, Badge, Toggle, Card, ListRow, SectionHeader, BottomNav, TopBar, StatPair, CourseCard, NewsCard, FeatureTile
- `ui_kits/sniper-scalper-app/` — 412×917 Android screen recreations (splash, academy, course detail, news, settings) with click-through nav
- `templates/playstore-screenshots/` — 1080×1920 Google Play promotional screenshot template (policy-compliant marketing frames around real app UI)
- `SKILL.md` — agent skill entry point

## Intentional additions
- `StatPair`, `FeatureTile`, `LinkAction` — patterns visible in screenshots, named by us.
- Play Store screenshot template — requested deliverable, not an in-app surface.
