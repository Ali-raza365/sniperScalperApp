import BottomTab from './BottomTab';

// ── Main App Screens ───────────────────────────────────────
export const dashboardStack = [
  { name: 'BottomTab', component: BottomTab },
];

// ── Auth Stack ─────────────────────────────────────────────
export const authStack: { name: string; component: any }[] = [];

// Merged — BottomTab is the initial route
export const mergedStacks = [...dashboardStack, ...authStack];
