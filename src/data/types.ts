export type Bias = 'BULLISH' | 'BEARISH';
export type LessonState = 'done' | 'current' | 'locked';
export type CalendarImpact = 'high' | 'medium' | 'low';
export type AssetCategory = 'forex' | 'crypto' | 'indices' | 'metals';
export type ContactChannelKind = 'whatsapp' | 'telegram' | 'email' | 'phone';
export type SignalSide = 'BUY' | 'SELL';
export type SignalStatus = 'open' | 'closed';

export interface Signal {
  id: string;
  pair: string;
  bias: Bias;
  icon: string;
  desc: string;
  time: string;
  /** Present when this signal was sourced live from the MT5 ingest server. */
  ticket?: string;
  /** MT5 ACCOUNT_LOGIN from the EA payload. */
  account?: string;
  symbol?: string;
  side?: SignalSide;
  status?: SignalStatus;
  comment?: string;
  openedAt?: string;
  volume?: number;
  price?: number;
  sl?: number;
  tp?: number;
  profit?: number;
}

export interface OhlcBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CoursePreview {
  id: string;
  label: string;
  title: string;
  sub: string;
  progress: number;
  tone: 'primary' | 'secondary' | 'tertiary';
}

export interface EnquiryChannel {
  id: string;
  icon: string;
  label: string;
  color: string;
  url: string;
}

export interface HomeBento {
  id: string;
  icon: string;
  title: string;
  sub: string;
  destination: 'News' | 'Watchlist';
}

export interface ChartCandle {
  h: number;
  bear: boolean;
}

export interface ChartSentiment {
  label: string;
  value: number;
  tone: 'bullish' | 'bearish';
}

export interface ChartSnapshot {
  symbol: string;
  timeframe: string;
  volumeLabel: string;
  volumeValue: string;
  fvgLabel: string;
  obLabel: string;
  timeframes: string[];
  defaultTimeframeIndex: number;
  candles: ChartCandle[];
  priceScale: string[];
  activePriceIndex: number;
  timeScale: string[];
  sentiment: ChartSentiment[];
  executionNote: string;
  spread: string;
  leverage: string;
}

export interface Lesson {
  id: string;
  state: LessonState;
  title: string;
  meta: string;
  badge?: string;
}

export interface AcademyModule {
  id: string;
  number: string;
  name: string;
  duration: string;
  locked: boolean;
  lockHint?: string;
  lessons: Lesson[];
}

export interface AcademyDocument {
  icon: string;
  name: string;
}

export interface AcademyCourse {
  title: string;
  badge: string;
  students: string;
  progress: number;
  modules: AcademyModule[];
  instructor: {
    name: string;
    role: string;
    bio: string;
  };
  documents: AcademyDocument[];
  liveSession: {
    label: string;
    desc: string;
  };
}

export interface NewsArticle {
  id: string;
  source: string;
  time: string;
  tickers: string[];
  title: string;
  summary: string;
  alert?: string;
  tag?: string;
  /** Local require() image key from ProImages, e.g. 'newsSample1' */
  imageKey?: 'newsSample1' | 'newsSample2' | 'courseChart';
}

export interface CatalogCourse {
  id: string;
  level: string;
  title: string;
  body: string;
  lessons: string;
  duration: string;
  author: string;
  imageKey: 'courseChart' | 'newsSample1' | 'newsSample2';
  protocol: string;
  architecture: Array<{ icon: string; title: string; body: string }>;
}

export interface CalendarEvent {
  id: string;
  time: string;
  currency: string;
  title: string;
  impact: CalendarImpact;
  detail: string;
}

export interface NewsFeed {
  tickerItems: string[];
  articles: NewsArticle[];
  calendar: CalendarEvent[];
  sentiment: { label: string; value: number };
  volatility: { label: string; value: string; fill: number };
}

export interface WatchlistAsset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  icon: string;
  price: string;
  changePct: number;
  starred: boolean;
  sparkline: number[];
}

export interface WatchlistPulse {
  session: string;
  sessionState: string;
  note: string;
  liquidityLevel: string;
  vix: string;
  vixDelta: string;
  vixFill: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  eyebrow: string;
  title: string;
  icon: string;
  accent: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  items: FaqItem[];
}

export interface ContactChannel {
  id: ContactChannelKind;
  label: string;
  sublabel: string;
  icon: string;
  url: string;
}

export interface ContactStat {
  value: string;
  label: string;
}

export interface AboutPhilosophy {
  id: string;
  number?: string;
  kicker?: string;
  title: string;
  body: string;
  accent: 'primary' | 'secondary' | 'tertiary';
}

export interface SettingsProfile {
  name: string;
  role: string;
  plan: string;
  office?: string;
}
