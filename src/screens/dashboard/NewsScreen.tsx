/**
 * NewsScreen — "INSTITUTIONAL FEED"
 * Pixel-perfect from: desgin/stitch_sniper_scalper_mobile_app/live_news_tv_style/code.html
 */
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, StatusBar, Animated, Easing } from 'react-native';
import { Colors } from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TICKER_ITEMS = [
  '$GOLD Hits All-Time High at 2154.30 Amid Global Uncertainty',
  'FED Chair Powell Hints at Quantitative Tightening Strategy Shifts',
  '$EURUSD Technical Rejection at Daily Supply Zone 1.09450',
  'ECB Maintains Interest Rates; Lagarde Emphasizes Data-Dependent Approach',
];

interface NewsArticle {
  source: string;
  time: string;
  tickers: string[];
  title: string;
  summary: string;
  alert?: string;
}

const ARTICLES: NewsArticle[] = [
  { source: 'Bloomberg', time: '1m ago', tickers: ['$EURUSD', '$DXY'], title: 'German Manufacturing PMI Drops to 42.1; Euro Slumps as Recession Fears Deepen', summary: 'European markets react sharply as industrial output data from the Eurozone\'s largest economy misses estimates by a wide margin. Liquidity grabs observed at 1.08200 level...' },
  { source: 'Archive Desk', time: '8m ago', tickers: ['$GOLD'], title: 'Smart Money Order Flow: Significant Institutional Bids Spotted at $2140.00 Level', summary: 'XAUUSD is currently testing a Daily FVG (Fair Value Gap). Order flow depth suggests massive accumulation by institutional desks before the NY open...', alert: 'High Volatility Alert' },
  { source: 'Reuters', time: '14m ago', tickers: ['$BTC'], title: 'ETF Inflows Surge as Institutional Adoption Reaches Critical Inflection Point', summary: 'Major asset managers signal increased allocation to digital assets as institutional infrastructure matures globally...' },
];

const CalendarEvent: FC<{ time: string; currency: string; title: string; impact: 'high' | 'medium' | 'low'; detail: string }> = ({ time, currency, title, impact, detail }) => {
  const color = impact === 'high' ? Colors.tertiary : impact === 'medium' ? Colors.secondary : Colors.onSurfaceVariant;
  const bg = impact === 'high' ? 'rgba(255,177,196,0.07)' : 'rgba(175,198,255,0.07)';
  return (
    <View style={[s.calEvent, { backgroundColor: bg, borderLeftColor: color }]}>
      <View style={s.calTime}>
        <Text style={s.calTimeTxt}>{time}</Text>
        <Text style={s.calCurrency}>{currency}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.calTitle}>{title}</Text>
        <View style={s.calBottom}>
          <Text style={s.calDetail}>{detail}</Text>
          {impact !== 'low' && (
            <Text style={[s.calImpact, { color }]}>{impact === 'high' ? 'High Impact' : 'Volatility Risk'}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const NewsScreen: FC = () => {
  const tickerAnim = useRef(new Animated.Value(0)).current;
  const [tickerWidth] = useState(600);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(tickerAnim, {
        toValue: -tickerWidth,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.avatar}><MaterialIcons name="person" size={18} color={Colors.onSurfaceVariant} /></View>
          <Text style={s.headerTitle}>SMC TERMINAL</Text>
        </View>
        <View style={s.headerRight}>
          <TouchableOpacity style={s.iconBtn} activeOpacity={0.75}>
            <MaterialIcons name="notifications" size={22} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={s.iconBtn} activeOpacity={0.75}>
            <MaterialIcons name="menu" size={22} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Breaking Ticker */}
      <View style={s.ticker}>
        <View style={s.tickerBadge}><Text style={s.tickerBadgeTxt}>BREAKING</Text></View>
        <View style={s.tickerScroll}>
          <Animated.View style={[s.tickerInner, { transform: [{ translateX: tickerAnim }] }]}>
            {TICKER_ITEMS.map((item, i) => (
              <Text key={i} style={s.tickerItem}>{item}{'  •  '}</Text>
            ))}
          </Animated.View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Feed Header */}
        <View style={s.feedHeader}>
          <View style={s.feedHeaderLeft}>
            <View style={s.accentBar} />
            <Text style={s.feedTitle}>Institutional Feed</Text>
          </View>
          <View style={s.liveBadge}><Text style={s.liveBadgeTxt}>Real-Time WebSocket Active</Text></View>
        </View>

        {/* Articles */}
        {ARTICLES.map((art, i) => (
          <TouchableOpacity key={i} style={s.articleCard} activeOpacity={0.85}>
            <View style={s.articleHead}>
              <View style={s.articleMeta}>
                <View style={s.sourceBadge}><Text style={s.sourceBadgeTxt}>{art.source}</Text></View>
                <Text style={s.articleTime}>{art.time}</Text>
              </View>
              <View style={s.tickerTags}>
                {art.tickers.map(t => (
                  <View key={t} style={s.tickerTag}><Text style={s.tickerTagTxt}>{t}</Text></View>
                ))}
              </View>
            </View>
            <Text style={s.articleTitle}>{art.title}</Text>
            <Text style={s.articleSummary} numberOfLines={2}>{art.summary}</Text>
            <View style={s.articleFooter}>
              <View style={s.articleActions}>
                <TouchableOpacity style={s.actionBtn} activeOpacity={0.7}>
                  <MaterialIcons name="bookmark" size={14} color={Colors.onSurfaceVariant} />
                  <Text style={s.actionTxt}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.actionBtn} activeOpacity={0.7}>
                  <MaterialIcons name="share" size={14} color={Colors.onSurfaceVariant} />
                  <Text style={s.actionTxt}>Share</Text>
                </TouchableOpacity>
              </View>
              {art.alert ? (
                <Text style={s.alertTxt}>{art.alert}</Text>
              ) : (
                <Text style={s.readMoreTxt}>Analysis Available →</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Economic Calendar */}
        <View style={s.calCard}>
          <View style={s.calHeadRow}>
            <MaterialIcons name="calendar-today" size={18} color={Colors.primary} />
            <Text style={s.calHead}>Economic Calendar</Text>
          </View>
          <CalendarEvent time="14:30" currency="USD" title="Core PPI m/m" impact="high" detail="Forecast: 0.2%" />
          <CalendarEvent time="16:15" currency="GBP" title="BOE Gov Bailey Speaks" impact="medium" detail="Impact: Med" />
          <CalendarEvent time="19:00" currency="NZD" title="Business Confidence" impact="low" detail="Impact: Low" />
          <TouchableOpacity style={s.calViewAllBtn} activeOpacity={0.8}>
            <Text style={s.calViewAllTxt}>VIEW WEEKLY CALENDAR</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={s.statsRow}>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Sentiment</Text>
            <Text style={[s.statValue, { color: Colors.secondary }]}>BULLISH</Text>
            <View style={s.statBar}><View style={[s.statFill, { width: '68%', backgroundColor: Colors.secondary }]} /></View>
          </View>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Volatility Index</Text>
            <View style={s.statValueRow}>
              <Text style={[s.statValue, { color: Colors.tertiary }]}>18.42</Text>
              <MaterialIcons name="trending-up" size={14} color={Colors.tertiary} />
            </View>
            <View style={s.statBar}><View style={[s.statFill, { width: '42%', backgroundColor: Colors.tertiary }]} /></View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight ?? 24) + 10,
    paddingBottom: 14,
    backgroundColor: 'rgba(19,19,19,0.92)',
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(86,67,52,0.12)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.2)' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: Colors.primaryContainer, letterSpacing: 2 },
  headerRight: { flexDirection: 'row', gap: 4 },
  iconBtn: { padding: 6 },
  ticker: { flexDirection: 'row', height: 38, backgroundColor: Colors.surfaceContainerLowest, borderLeftWidth: 3, borderLeftColor: Colors.primary, overflow: 'hidden' },
  tickerBadge: { backgroundColor: Colors.primary, paddingHorizontal: 12, justifyContent: 'center', zIndex: 2 },
  tickerBadgeTxt: { fontSize: 9, fontWeight: '900', color: Colors.background, letterSpacing: 1.5 },
  tickerScroll: { flex: 1, overflow: 'hidden', justifyContent: 'center' },
  tickerInner: { flexDirection: 'row', alignItems: 'center' },
  tickerItem: { fontSize: 12, color: Colors.onSurfaceVariant, fontWeight: '500', paddingLeft: 16, flexShrink: 0 },
  scroll: { paddingHorizontal: 20, paddingTop: 20 },
  feedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  feedHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  accentBar: { width: 3, height: 22, backgroundColor: Colors.primary, borderRadius: 2 },
  feedTitle: { fontSize: 18, fontWeight: '700', color: Colors.primary, letterSpacing: 0.3 },
  liveBadge: { backgroundColor: Colors.surfaceContainerHigh, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  liveBadgeTxt: { fontSize: 8, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 0.5 },
  articleCard: { backgroundColor: Colors.surfaceContainerLow, padding: 18, marginBottom: 3 },
  articleHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  articleMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sourceBadge: { backgroundColor: 'rgba(255,183,125,0.10)', paddingHorizontal: 8, paddingVertical: 2, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,183,125,0.2)' },
  sourceBadgeTxt: { fontSize: 9, fontWeight: '900', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  articleTime: { fontSize: 10, color: 'rgba(221,193,174,0.6)' },
  tickerTags: { flexDirection: 'row', gap: 6 },
  tickerTag: { backgroundColor: Colors.surfaceContainerHigh, paddingHorizontal: 6, paddingVertical: 3 },
  tickerTagTxt: { fontSize: 9, fontWeight: '700', color: Colors.secondary },
  articleTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, lineHeight: 22, marginBottom: 10 },
  articleSummary: { fontSize: 12.5, color: Colors.onSurfaceVariant, lineHeight: 18, marginBottom: 14 },
  articleFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(86,67,52,0.12)', paddingTop: 12 },
  articleActions: { flexDirection: 'row', gap: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionTxt: { fontSize: 9, fontWeight: '700', color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  readMoreTxt: { fontSize: 9, fontWeight: '700', color: Colors.secondary, textTransform: 'uppercase', letterSpacing: 1 },
  alertTxt: { fontSize: 9, fontWeight: '700', color: Colors.tertiary, textTransform: 'uppercase', letterSpacing: 1 },
  calCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 12, padding: 18, marginTop: 16, marginBottom: 16 },
  calHeadRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  calHead: { fontSize: 15, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  calEvent: { flexDirection: 'row', gap: 14, padding: 12, borderRadius: 10, borderLeftWidth: 2, marginBottom: 10 },
  calTime: { alignItems: 'center', justifyContent: 'center', minWidth: 40 },
  calTimeTxt: { fontSize: 11, fontWeight: '700', color: Colors.text },
  calCurrency: { fontSize: 9, fontWeight: '700', color: Colors.onSurfaceVariant },
  calTitle: { fontSize: 12.5, fontWeight: '700', color: Colors.text, lineHeight: 17 },
  calBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  calDetail: { fontSize: 9.5, color: Colors.onSurfaceVariant, textTransform: 'uppercase' },
  calImpact: { fontSize: 9.5, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  calViewAllBtn: { borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(164,140,122,0.2)', paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  calViewAllTxt: { fontSize: 9, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase' },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: Colors.surfaceContainerLow, padding: 14 },
  statLabel: { fontSize: 8.5, fontWeight: '700', color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  statValueRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  statBar: { height: 3, backgroundColor: Colors.surfaceContainerHigh, borderRadius: 4, overflow: 'hidden' },
  statFill: { height: '100%', borderRadius: 4 },
});

export default NewsScreen;
