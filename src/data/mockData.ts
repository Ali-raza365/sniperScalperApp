import { Colors } from '../constants/Colors';
import type {
  AboutPhilosophy,
  AcademyCourse,
  AssetCategory,
  CatalogCourse,
  ChartSnapshot,
  ContactChannel,
  ContactStat,
  CoursePreview,
  EnquiryChannel,
  FaqCategory,
  HomeBento,
  NewsFeed,
  SettingsProfile,
  Signal,
  WatchlistAsset,
  WatchlistPulse,
} from './types';

export const SIGNALS: Signal[] = [
  {
    id: 'eurusd-fvg',
    pair: 'EURUSD',
    bias: 'BULLISH',
    icon: 'trending-up',
    desc: 'FVG identified at 1.0845. Institutional accumulation detected on 15m TF.',
    time: '2m ago',
  },
  {
    id: 'gbpusd-sweep',
    pair: 'GBPUSD',
    bias: 'BEARISH',
    icon: 'trending-down',
    desc: 'Liquidity sweep at 1.2650. Market Structure Shift confirmed. Entry targets: 1.2610.',
    time: '15m ago',
  },
];

export const HOME_BENTO: HomeBento[] = [
  {
    id: 'calendar',
    icon: 'event',
    title: 'Economic Calendar',
    sub: 'High Impact Events Only',
    destination: 'News',
  },
  {
    id: 'news',
    icon: 'newspaper',
    title: 'Market News',
    sub: 'Global Macro Insights',
    destination: 'News',
  },
];

export const COURSE_PREVIEWS: CoursePreview[] = [
  {
    id: 'smc',
    label: 'SMC',
    title: 'Smart Money Concepts',
    sub: 'Orderblocks & Liquidity',
    progress: 0.66,
    tone: 'primary',
  },
  {
    id: 'vsa',
    label: 'VSA',
    title: 'Volume Spread',
    sub: 'Professional Accumulation',
    progress: 0,
    tone: 'secondary',
  },
  {
    id: 'ict',
    label: 'ICT',
    title: 'Inner Circle Trader',
    sub: 'Time and Price Theory',
    progress: 0,
    tone: 'tertiary',
  },
];

export const ENQUIRY_CHANNELS: EnquiryChannel[] = [
  { id: 'phone', icon: 'call', color: Colors.primary, label: 'Inquiry Line', url: 'tel:+10000000000' },
  { id: 'whatsapp', icon: 'chat', color: '#4ADE80', label: 'WhatsApp', url: 'https://wa.me/' },
  { id: 'telegram', icon: 'send', color: Colors.secondary, label: 'Telegram', url: 'https://t.me/' },
  { id: 'email', icon: 'mail', color: Colors.tertiary, label: 'Email Archival', url: 'mailto:desk@sniperscalper.com' },
];

export const HOME_CHART_CANDLES = [40, 60, 80, 65, 90, 55, 75];

export const CHART_SNAPSHOT: ChartSnapshot = {
  symbol: 'XAUUSD',
  timeframe: 'M15',
  volumeLabel: 'Volume (24h)',
  volumeValue: '12.4B USD',
  fvgLabel: 'FVG Bearish',
  obLabel: 'H4 Bullish OB',
  timeframes: ['1m', '5m', '15m', '1h', '4h', 'D'],
  defaultTimeframeIndex: 2,
  candles: [
    { h: 60, bear: false },
    { h: 80, bear: false },
    { h: 50, bear: true },
    { h: 100, bear: false },
    { h: 75, bear: false },
    { h: 45, bear: true },
    { h: 90, bear: false },
  ],
  priceScale: ['2045', '2040', '2035', '2034', '2030', '2025'],
  activePriceIndex: 3,
  timeScale: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
  sentiment: [
    { label: 'Retail Shorts', value: 72, tone: 'bearish' },
    { label: 'Inst. Longs', value: 88, tone: 'bullish' },
  ],
  executionNote: 'Liquidity identified at 2030.12. Execute with precision.',
  spread: '0.4 pips',
  leverage: '1:100',
};

export const ACADEMY_COURSE: AcademyCourse = {
  title: 'Smart Money Concepts (SMC)',
  badge: 'Beginner',
  students: '12 Modules',
  progress: 0,
  instructor: {
    name: 'FX Ramzan',
    role: 'Founder & Lead Strategist',
    bio: 'Specializing in high-frequency liquidity sweeps and fair value gap execution for tier-1 institutional desks.',
  },
  documents: [
    { icon: 'terminal', name: 'SMC Cheat Sheet.pdf' },
    { icon: 'analytics', name: 'Liquidity Checklist' },
  ],
  liveSession: {
    label: 'Live Session Today',
    desc: 'Market Review: NY Session Open with FX Ramzan',
  },
  modules: [],
};

export const ACADEMY_CATALOG: CatalogCourse[] = [
  {
    id: 'smc',
    level: 'Beginner',
    title: 'Smart Money Concepts (SMC)',
    body: 'Master the mechanics of institutional liquidity and order flow. Understand how major players move price and learn to identify high-probability setups.',
    lessons: '12 Modules',
    duration: '8 Hours',
    author: 'FX Ramzan',
    imageKey: 'courseChart',
    protocol:
      'Deconstruct the financial matrix. This program is an Architectural Protocol designed to rewire your perception of liquidity. We move beyond retail noise, focusing exclusively on how institutional algorithms deliver price through the lens of Smart Money Concepts.',
    architecture: [
      { icon: 'account-tree', title: 'Market Structure', body: 'Identify the true narrative behind price swings.' },
      { icon: 'opacity', title: 'Liquidity', body: 'Locate the fuel that drives institutional moves.' },
      { icon: 'apps', title: 'Order Blocks', body: 'Pinpoint the footprints of large institutional orders.' },
      { icon: 'call-split', title: 'FVG', body: 'Exploit Fair Value Gaps and algorithmic inefficiencies.' },
    ],
  },
  {
    id: 'scalping',
    level: 'Intermediate',
    title: 'Precision Scalping System',
    body: 'A complete intraday execution framework: entries, risk, and trade management.',
    lessons: '10 Modules',
    duration: '6 Hours',
    author: 'FX Ramzan',
    imageKey: 'newsSample1',
    protocol:
      'Build a repeatable scalping protocol for liquid majors and gold. Focus on session timing, micro structure, and risk that survives noise.',
    architecture: [
      { icon: 'schedule', title: 'Session Timing', body: 'Trade only when institutional volume is present.' },
      { icon: 'gps-fixed', title: 'Entry Triggers', body: 'Define precise confirmation before you strike.' },
      { icon: 'shield', title: 'Risk Shield', body: 'Cap downside with volatility-aware stops.' },
      { icon: 'trending-up', title: 'Management', body: 'Scale out with structure, not emotion.' },
    ],
  },
];

export const NEWS_FEED: NewsFeed = {
  tickerItems: [
    "BITGET LAUNCHES CRYPTO INDUSTRY'S FIRST EVER US STOCK OPTIONS TRADING",
    'FROM CRYPTO TO GOLD: UEX LAUNCHES FIRST CROSS-ASSET TRADING TOURNAMENT',
  ],
  articles: [
    {
      id: 'bitget',
      source: 'Pakistan News Express',
      time: '22h ago',
      tickers: ['$BUSINESS'],
      tag: '$BUSINESS',
      imageKey: 'newsSample1',
      title: "Bitget Launches Crypto Industry's First Ever US Stock Options Trading",
      summary:
        "VICTORIA, Seychelles, July 03, 2026 (GLOBE NEWSWIRE) — Bitget, the world's largest Universal Exchange, expands access to US equity options.",
    },
    {
      id: 'uex',
      source: 'Riauone.com | Berita Nusantara Terkini',
      time: '23h ago',
      tickers: ['$BUSINESS'],
      tag: '$BUSINESS',
      imageKey: 'newsSample2',
      title: 'From Crypto to Gold: UEX Launches First Cross-Asset Trading Tournament',
      summary:
        "VICTORIA, Seychelles, July 01, 2026 (GLOBE NEWSWIRE) — the world's first cross-asset trading tournament spanning crypto, gold and indices.",
    },
  ],
  calendar: [],
  sentiment: { label: 'BULLISH', value: 68 },
  volatility: { label: '18.42', value: '18.42', fill: 42 },
};

export const WATCHLIST_PULSE: WatchlistPulse = {
  session: 'LONDON SESSION',
  sessionState: 'OPEN',
  note: 'Volatility is currently trending above 14-day median. Institutional order flow remains concentrated in Major Pairs.',
  liquidityLevel: '1.2640',
  vix: '18.42',
  vixDelta: '+4.2% (Moderate Risk)',
  vixFill: 0.66,
};

export const WATCHLIST_ASSETS: WatchlistAsset[] = [
  {
    id: 'btcusd',
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    category: 'crypto',
    icon: 'monetization-on',
    price: '64,281.50',
    changePct: 2.14,
    starred: true,
    sparkline: [38, 42, 35, 58, 52, 78, 90],
  },
  {
    id: 'eurusd',
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    category: 'forex',
    icon: 'euro',
    price: '1.08425',
    changePct: -0.45,
    starred: false,
    sparkline: [90, 84, 80, 62, 68, 38, 28],
  },
  {
    id: 'nas100',
    symbol: 'NAS100',
    name: 'Nasdaq 100 Index',
    category: 'indices',
    icon: 'show-chart',
    price: '18,245.20',
    changePct: 1.12,
    starred: true,
    sparkline: [40, 48, 44, 62, 58, 78, 84],
  },
  {
    id: 'gbpjpy',
    symbol: 'GBPJPY',
    name: 'Pound / Yen',
    category: 'forex',
    icon: 'attach-money',
    price: '191.458',
    changePct: 0.08,
    starred: false,
    sparkline: [50, 52, 50, 54, 56, 58, 60],
  },
  {
    id: 'xauusd',
    symbol: 'XAUUSD',
    name: 'Gold / US Dollar',
    category: 'metals',
    icon: 'auto-awesome',
    price: '2,384.12',
    changePct: 0.52,
    starred: true,
    sparkline: [42, 36, 50, 58, 70, 78, 88],
  },
  {
    id: 'ethusd',
    symbol: 'ETHUSD',
    name: 'Ethereum / US Dollar',
    category: 'crypto',
    icon: 'toll',
    price: '3,421.10',
    changePct: -1.12,
    starred: false,
    sparkline: [82, 88, 60, 48, 40, 36, 42],
  },
];

export const WATCHLIST_FILTERS: Array<{ id: 'all' | AssetCategory; label: string }> = [
  { id: 'all', label: 'All Assets' },
  { id: 'forex', label: 'Forex' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'indices', label: 'Indices' },
];

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'smc',
    eyebrow: 'Category',
    title: 'SMC Logic',
    icon: 'psychology',
    accent: 'primary',
    items: [
      {
        id: 'fvg',
        question: 'What is a Fair Value Gap (FVG)?',
        answer:
          'A Fair Value Gap occurs when there is an imbalance in price movement where one side of the market is aggressively pushed, leaving a visual gap on the 3-candle sequence. Institutional traders look for these gaps to be filled as a retest of liquidity.',
      },
      {
        id: 'ob',
        question: 'How to identify Order Blocks?',
        answer:
          'An Order Block is the last opposite candle before a strong displacement in price. Bullish OBs are the last down candle before an upward move, while Bearish OBs are the last up candle before a downward move.',
      },
    ],
  },
  {
    id: 'nav',
    eyebrow: 'Navigation',
    title: 'Platform Navigation',
    icon: 'explore',
    accent: 'secondary',
    items: [
      {
        id: 'heatmap',
        question: 'How to use the Heatmap?',
        answer:
          'The Institutional Heatmap visualizes pending orders in the limit order book. Darker regions indicate higher liquidity density, often serving as magnets for price movement.',
      },
      {
        id: 'watchlists',
        question: 'Where are my saved watchlists?',
        answer:
          'Saved watchlists can be accessed from the Watchlist screen via Home, or from the star control on each asset card.',
      },
    ],
  },
  {
    id: 'sub',
    eyebrow: 'Accounts',
    title: 'Subscription Info',
    icon: 'payments',
    accent: 'tertiary',
    items: [
      {
        id: 'upgrade',
        question: 'Can I upgrade mid-billing cycle?',
        answer:
          'Yes, upgrades are processed immediately with a pro-rated charge based on the remaining days of your current cycle.',
      },
    ],
  },
  {
    id: 'risk',
    eyebrow: 'Strategic',
    title: 'Risk Management',
    icon: 'shield',
    accent: 'neutral',
    items: [
      {
        id: 'lot',
        question: 'How to calculate Lot Size?',
        answer:
          'Use the integrated calculator in the Signals tab. Enter your account balance and risk percentage (0.5% – 1% recommended) to get precise lot sizes.',
      },
    ],
  },
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sublabel: 'Real-time Trading Queries',
    icon: 'chat',
    url: 'https://wa.me/',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    sublabel: 'Signal & Technical Desk',
    icon: 'send',
    url: 'https://t.me/',
  },
  {
    id: 'email',
    label: 'Support Email',
    sublabel: 'Corporate & Technical Inquiries',
    icon: 'mail',
    url: 'mailto:desk@sniperscalper.com',
  },
];

export const CONTACT_STATS: ContactStat[] = [
  { value: '24/7', label: 'Uptime Support' },
  { value: '< 15m', label: 'Avg Response' },
  { value: '128-bit', label: 'Encrypted' },
  { value: 'Global', label: 'Multi-region' },
];

export const CONTACT_CATEGORIES = [
  'Technical Support',
  'Signal Desk Inquiry',
  'Institutional Membership',
  'Account Management',
];

export const ABOUT_PHILOSOPHY: AboutPhilosophy[] = [
  {
    id: 'void',
    number: '01',
    title: 'The Liquidity Void',
    body: 'We identify where the Smart Money has failed to fill orders, creating imbalances that the market must eventually reconcile.',
    accent: 'primary',
  },
  {
    id: 'ob',
    kicker: 'Execution',
    title: 'Order Block Refinement',
    body: 'Filtering macro institutional intent into micro entry points. We wait for the footprint before we strike.',
    accent: 'secondary',
  },
  {
    id: 'risk',
    kicker: 'Mitigation',
    title: 'Dynamic Risk Shield',
    body: "Institutions don't use fixed pips. Our algorithm calculates risk based on volatility-adjusted ATR and liquidity pools.",
    accent: 'tertiary',
  },
];

export const SETTINGS_PROFILE: SettingsProfile = {
  name: 'FX Ramzan',
  role: 'Founder & Lead Strategist',
  plan: 'Sniper Scalper',
  office: 'Ahmadpur East',
};
