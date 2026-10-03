/**
 * NewsScreen — institutional market news terminal
 * Matches desgin/.../live_news_tv_style + Design System UI kit
 */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { Spacing, Radii } from '../../constants/Spacing';
import { TopBar, NewsCard } from '../../components/ds';
import { ProImages } from '../../assets/images/pro';
import { newsRepository } from '../../data/repository';
import type { CalendarImpact } from '../../data/types';
import type { RootStackParamList } from '../../navigation/types';
import { showToast } from '../../utils/CustomToast';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const imageMap = {
  newsSample1: ProImages.newsSample1,
  newsSample2: ProImages.newsSample2,
  courseChart: ProImages.courseChart,
} as const;

const impactAccent = (impact: CalendarImpact) => {
  if (impact === 'high') return Colors.tertiary;
  if (impact === 'medium') return Colors.secondary;
  return Colors.outline;
};

const impactLabel = (impact: CalendarImpact) => {
  if (impact === 'high') return 'High Impact';
  if (impact === 'medium') return 'Volatility Risk';
  return null;
};

const NewsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const feed = newsRepository.getFeed();
  const tickerAnim = useRef(new Animated.Value(0)).current;
  const [tickerWidth] = useState(900);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(tickerAnim, {
        toValue: -tickerWidth,
        duration: 22000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [tickerAnim, tickerWidth]);

  const tickerText = feed.tickerItems.join('  ·  ') + '  ·  ';

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <TopBar
        title="Sniper Scalper"
        showBack
        onBack={() => navigation.navigate('BottomTab', { screen: 'Home' })}
        leadingAvatar={ProImages.avatar}
        icons={[
          { name: 'refresh', onPress: () => showToast.success('Feed refreshed.') },
          { name: 'menu', onPress: () => showToast.success('Menu opened.') },
        ]}
      />

      <View style={s.ticker}>
        <View style={s.tickerBadge}>
          <Text style={s.tickerBadgeTxt}>BREAKING</Text>
        </View>
        <View style={s.tickerScroll}>
          <Animated.View style={[s.tickerInner, { transform: [{ translateX: tickerAnim }] }]}>
            <Text style={s.tickerItem}>{tickerText}</Text>
            <Text style={s.tickerItem}>{tickerText}</Text>
          </Animated.View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.feedHead}>
          <View style={s.feedTitleRow}>
            <View style={s.feedAccent} />
            <Text style={s.feedTitle}>Institutional Feed</Text>
          </View>
          <View style={s.liveChip}>
            <Text style={s.liveChipTxt}>Real-Time Active</Text>
          </View>
        </View>

        {feed.articles.map(art => (
          <NewsCard
            key={art.id}
            source={art.source}
            timestamp={art.time}
            tag={art.tag ?? art.tickers[0] ?? '$BUSINESS'}
            tickers={art.tickers}
            alert={art.alert}
            image={art.imageKey ? imageMap[art.imageKey] : undefined}
            headline={art.title}
            excerpt={art.summary}
          />
        ))}

        <View style={s.sectionCard}>
          <View style={s.sectionTitleRow}>
            <MaterialIcons name="calendar-today" size={20} color={Colors.primary} />
            <Text style={s.sectionTitle}>Economic Calendar</Text>
          </View>

          <View style={s.calList}>
            {feed.calendar.map(evt => {
              const accent = impactAccent(evt.impact);
              const label = impactLabel(evt.impact);
              return (
                <View
                  key={evt.id}
                  style={[
                    s.calRow,
                    evt.impact === 'high' && s.calRowHigh,
                    { borderLeftColor: accent },
                  ]}>
                  <View style={s.calTimeCol}>
                    <Text style={s.calTime}>{evt.time}</Text>
                    <Text style={s.calCcy}>{evt.currency}</Text>
                  </View>
                  <View style={s.calBody}>
                    <Text style={s.calEventTitle}>{evt.title}</Text>
                    <View style={s.calMeta}>
                      <Text style={s.calDetail}>{evt.detail}</Text>
                      {label ? (
                        <Text style={[s.calImpact, { color: accent }]}>{label}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            style={s.calBtn}
            activeOpacity={0.8}
            onPress={() => showToast.success('Weekly calendar opens in the next release.')}>
            <Text style={s.calBtnTxt}>View Weekly Calendar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={s.insightCard}
          activeOpacity={0.85}
          onPress={() => showToast.success('Premium insight reserved for Archive Desk.')}>
          <Image source={ProImages.courseChart} style={s.insightImg} resizeMode="cover" />
          <View style={s.insightScrim} />
          <View style={s.insightCopy}>
            <View style={s.insightBadge}>
              <Text style={s.insightBadgeTxt}>Premium Insight</Text>
            </View>
            <Text style={s.insightTitle}>Q4 Market Outlook: The Liquidity Shift</Text>
            <Text style={s.insightSub}>
              Exclusive Archive Desk analysis on central bank digital currencies.
            </Text>
          </View>
        </TouchableOpacity>

        <View style={s.pulseRow}>
          <View style={s.pulseCard}>
            <Text style={s.pulseLabel}>Sentiment</Text>
            <View style={s.pulseValueRow}>
              <Text style={[s.pulseValue, { color: Colors.secondary }]}>{feed.sentiment.label}</Text>
            </View>
            <View style={s.pulseTrack}>
              <View style={[s.pulseFill, { width: `${feed.sentiment.value}%`, backgroundColor: Colors.secondary }]} />
            </View>
          </View>
          <View style={s.pulseCard}>
            <Text style={s.pulseLabel}>Volatility Index</Text>
            <View style={s.pulseValueRow}>
              <Text style={[s.pulseValue, { color: Colors.tertiary }]}>{feed.volatility.value}</Text>
              <MaterialIcons name="trending-up" size={16} color={Colors.tertiary} />
            </View>
            <View style={s.pulseTrack}>
              <View style={[s.pulseFill, { width: `${feed.volatility.fill}%`, backgroundColor: Colors.tertiary }]} />
            </View>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  ticker: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: Colors.surfaceContainerLowest,
    minHeight: 40,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  tickerBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  tickerBadgeTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textOnAccent,
    letterSpacing: 1.5,
  },
  tickerScroll: { flex: 1, overflow: 'hidden', justifyContent: 'center' },
  tickerInner: { flexDirection: 'row', alignItems: 'center' },
  tickerItem: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.3,
    paddingHorizontal: 12,
  },
  scroll: {
    paddingHorizontal: Spacing.pageMargin,
    paddingTop: 22,
    gap: 16,
  },
  feedHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  feedTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  feedAccent: {
    width: 3,
    height: 22,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
  liveChip: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
  },
  liveChipTxt: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
    padding: 18,
    marginTop: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  calList: { gap: 10 },
  calRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(38,35,32,0.45)',
    borderLeftWidth: 2,
  },
  calRowHigh: {
    backgroundColor: 'rgba(239,83,80,0.06)',
  },
  calTimeCol: {
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calTime: { fontSize: 12, fontWeight: '700', color: Colors.text },
  calCcy: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  calBody: { flex: 1 },
  calEventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 18,
  },
  calMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  calDetail: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  calImpact: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  calBtn: {
    marginTop: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(138,128,120,0.35)',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  calBtnTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  insightCard: {
    height: 220,
    borderRadius: Radii.cardSm,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceContainerLow,
  },
  insightImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  insightScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,13,13,0.55)',
  },
  insightCopy: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
  },
  insightBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(13,13,13,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  insightBadgeTxt: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primaryContainer,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  insightTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 22,
  },
  insightSub: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(201,184,164,0.85)',
    lineHeight: 17,
  },
  pulseRow: { flexDirection: 'row', gap: 12 },
  pulseCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
    padding: 14,
  },
  pulseLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  pulseValueRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  pulseValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  pulseTrack: {
    height: 3,
    backgroundColor: Colors.surfaceContainerHigh,
    marginTop: 10,
    overflow: 'hidden',
  },
  pulseFill: { height: '100%' },
});

export default NewsScreen;
