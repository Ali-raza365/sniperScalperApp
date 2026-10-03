import React, { FC } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Platform, Dimensions, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { marketRepository } from '../../data/repository';
import type { CoursePreview, HomeBento, Signal } from '../../data/types';
import type { RootStackParamList } from '../../navigation/types';
import { openExternal } from '../../utils/linking';
import { useLiveSignals } from '../../hooks/useLiveSignals';

const { width: W } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const BIAS_COLOR = { BULLISH: Colors.secondary, BEARISH: Colors.tertiary };
const TONE_COLOR = { primary: Colors.primary, secondary: Colors.secondary, tertiary: Colors.tertiary };
const BENTO_THEME: Record<string, { iconColor: string; bg: string }> = {
  calendar: { iconColor: Colors.primary, bg: 'rgba(255,183,125,0.12)' },
  news: { iconColor: Colors.secondary, bg: 'rgba(175,198,255,0.12)' },
};

const SignalCard: FC<{ signal: Signal; live?: boolean }> = ({ signal, live }) => {
  const biasColor = BIAS_COLOR[signal.bias];
  const sideLabel = signal.side ?? (signal.bias === 'BEARISH' ? 'SELL' : 'BUY');
  const metaParts: string[] = [];
  if (live && signal.volume != null) metaParts.push(`${signal.volume} lots`);
  if (live && signal.price != null) metaParts.push(`@ ${signal.price}`);
  const desc =
    live && metaParts.length
      ? `${sideLabel} · ${metaParts.join(' · ')}${signal.comment ? ` — ${signal.comment}` : ''}`
      : signal.desc;

  return (
    <View style={s.signalCard}>
      <View style={[s.signalIcon, { backgroundColor: Colors.surfaceContainerHigh }]}>
        <MaterialIcons name={signal.icon as any} size={20} color={biasColor} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={s.signalRow}>
          <Text style={[s.signalPair, { color: biasColor }]}>
            {signal.pair} • {live ? sideLabel : signal.bias}
          </Text>
          <Text style={s.signalTime}>{signal.time}</Text>
        </View>
        <Text style={s.signalDesc}>{desc}</Text>
      </View>
    </View>
  );
};

const BentoCard: FC<{ item: HomeBento; onPress: () => void }> = ({ item, onPress }) => {
  const theme = BENTO_THEME[item.id] ?? BENTO_THEME.news;
  return (
    <TouchableOpacity style={s.bentoCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[s.bentoIcon, { backgroundColor: theme.bg }]}>
        <MaterialIcons name={item.icon as any} size={22} color={theme.iconColor} />
      </View>
      <Text style={s.bentoTitle}>{item.title}</Text>
      <Text style={s.bentoSub}>{item.sub}</Text>
    </TouchableOpacity>
  );
};

const CourseCard: FC<{ course: CoursePreview; onPress: () => void }> = ({ course, onPress }) => (
  <TouchableOpacity style={s.courseCard} onPress={onPress} activeOpacity={0.85}>
    <View style={s.courseBanner}>
      <Text style={[s.courseLabel, { color: TONE_COLOR[course.tone] }]}>{course.label}</Text>
    </View>
    <View style={s.courseBody}>
      <Text style={s.courseTitle}>{course.title}</Text>
      <Text style={s.courseSub}>{course.sub}</Text>
      <View style={s.progressBg}>
        <View style={[s.progressFill, { width: `${course.progress * 100}%` as any }]} />
      </View>
    </View>
  </TouchableOpacity>
);

const EnquiryBtn: FC<{ icon: string; color: string; label: string; onPress: () => void }> = ({
  icon, color, label, onPress,
}) => (
  <TouchableOpacity style={s.enquiryBtn} activeOpacity={0.75} onPress={onPress}>
    <MaterialIcons name={icon as any} size={18} color={color} />
    <Text style={s.enquiryLabel}>{label}</Text>
  </TouchableOpacity>
);

const HomeScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const { signals, live: signalsLive } = useLiveSignals('open');
  const bento = marketRepository.getHomeBento();
  const courses = marketRepository.getCoursePreviews();
  const enquiries = marketRepository.getEnquiryChannels();
  const candles = marketRepository.getHomeChartCandles();
  const chart = marketRepository.getChartSnapshot();

  return (
  <View style={s.root}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
    <View style={s.header}>
      <View style={s.headerLeft}>
        <MaterialIcons name="menu" size={22} color={Colors.primary} />
        <Text style={s.headerTitle}>INSTITUTIONAL ARCHIVE</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Watchlist')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <MaterialIcons name="monitor" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
      <View style={s.hero}>
        <View style={s.heroIconBox}>
          <MaterialIcons name="inventory-2" size={44} color={Colors.primary} />
        </View>
        <Text style={s.heroH1}>ACCESSING THE{'\n'}<Text style={s.heroH1Sub}>Institutional Archive</Text></Text>
        <Text style={s.heroDesc}>Public portal to high-frequency market intelligence, liquidity maps, and professional Smart Money Concepts.</Text>
        <TouchableOpacity style={s.heroBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Watchlist')}>
          <Text style={s.heroBtnText}>VIEW INTEL</Text>
        </TouchableOpacity>
      </View>

      <View style={s.section}>
        <View style={s.sectionHead}>
          <View style={s.sectionLeft}>
            <View style={s.accent} />
            <Text style={s.sectionTitle}>LIVE SIGNALS</Text>
            {signalsLive && <View style={s.liveDot} />}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Watchlist')}>
            <Text style={s.viewAll}>View Archive</Text>
          </TouchableOpacity>
        </View>
        {signals.map((signal, index) => (
          <View key={signal.id} style={{ marginBottom: index === signals.length - 1 ? 0 : 10 }}>
            <SignalCard signal={signal} live={signalsLive} />
          </View>
        ))}
      </View>

      <View style={s.bentoGrid}>
        {bento.map(item => (
          <BentoCard
            key={item.id}
            item={item}
            onPress={() =>
              item.destination === 'Watchlist'
                ? navigation.navigate('Watchlist')
                : navigation.navigate('BottomTab', { screen: item.destination })
            }
          />
        ))}
      </View>

      <View style={s.section}>
        <View style={s.sectionHead}>
          <View style={s.sectionLeft}><View style={s.accent} /><Text style={s.sectionTitle}>CHART TERMINAL</Text></View>
        </View>
        <View style={s.chartBox}>
          <View style={s.chartTop}>
            <View style={s.chartPill}><Text style={s.chartPillTxt}>{chart.symbol} {chart.timeframe}</Text></View>
            <View style={s.liveRow}>
              <View style={s.liveDot} />
              <Text style={s.liveTxt}>LIVE</Text>
            </View>
          </View>
          <View style={s.candles}>
            {candles.map((h, i) => (
              <View key={i} style={s.candle}>
                <View style={[s.wick, { height: h * 0.3 }]} />
                <View style={[s.body, { height: h, backgroundColor: i % 2 === 0 ? Colors.tertiaryContainer : Colors.secondaryContainer }]} />
                <View style={[s.wick, { height: h * 0.2 }]} />
              </View>
            ))}
          </View>
          <TouchableOpacity style={s.fsBtn} activeOpacity={0.8} onPress={() => navigation.navigate('BottomTab', { screen: 'Charts' })}>
            <MaterialIcons name="fullscreen" size={16} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.section}>
        <View style={s.sectionHead}>
          <View style={s.sectionLeft}><View style={s.accent} /><Text style={s.sectionTitle}>CURRICULUM</Text></View>
          <Text style={s.viewAll}>{courses.length} Modules</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14 }}>
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => navigation.navigate('BottomTab', { screen: 'Academy' })}
            />
          ))}
        </ScrollView>
      </View>

      <View style={s.enquiriesBox}>
        <Text style={s.enquiriesTitle}>ENQUIRIES</Text>
        <Text style={s.enquiriesSub}>Public desk for archive access requests</Text>
        <View style={s.enquiriesGrid}>
          {enquiries.map(channel => (
            <EnquiryBtn
              key={channel.id}
              icon={channel.icon}
              color={channel.color}
              label={channel.label}
              onPress={() => (channel.id === 'phone' ? navigation.navigate('ContactUs') : openExternal(channel.url))}
            />
          ))}
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
    backgroundColor: 'rgba(19,19,19,0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(86,67,52,0.15)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 14, fontWeight: '900', color: Colors.primaryContainer, letterSpacing: 0.5 },
  scroll: { paddingHorizontal: 20, paddingTop: 24 },
  hero: { alignItems: 'center', marginBottom: 40, paddingTop: 16 },
  heroIconBox: {
    width: 88, height: 88, borderRadius: 20, backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.2)',
  },
  heroH1: { fontSize: 30, fontWeight: '900', color: Colors.primary, textAlign: 'center', lineHeight: 36, marginBottom: 12 },
  heroH1Sub: { color: Colors.text, fontSize: 28, fontWeight: '900', textTransform: 'uppercase' },
  heroDesc: { fontSize: 13, color: Colors.onSurfaceVariant, textAlign: 'center', maxWidth: W * 0.72, lineHeight: 20, marginBottom: 24 },
  heroBtn: {
    backgroundColor: Colors.surfaceContainerHighest, paddingVertical: 14, paddingHorizontal: 32,
    borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.2)',
  },
  heroBtnText: { color: Colors.text, fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },
  section: { marginBottom: 36 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  accent: { width: 3, height: 22, backgroundColor: Colors.primaryContainer, borderRadius: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary, letterSpacing: 0.3 },
  viewAll: { fontSize: 9, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase' },
  signalCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.07)',
  },
  signalIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  signalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  signalPair: { fontSize: 9.5, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  signalTime: { fontSize: 9.5, color: Colors.onSurfaceVariant },
  signalDesc: { fontSize: 12.5, color: Colors.text, lineHeight: 18, fontWeight: '500' },
  bentoGrid: { flexDirection: 'row', gap: 14, marginBottom: 36 },
  bentoCard: {
    flex: 1, backgroundColor: Colors.surfaceContainerHigh, borderRadius: 20, padding: 18, aspectRatio: 1,
    justifyContent: 'flex-end', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.10)',
  },
  bentoIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 'auto' as any },
  bentoTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  bentoSub: { fontSize: 9.5, color: Colors.onSurfaceVariant, fontWeight: '500' },
  chartBox: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 18, aspectRatio: 16 / 9,
    padding: 12, justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.10)',
  },
  chartTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chartPill: {
    backgroundColor: 'rgba(19,19,19,0.85)', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.06)',
  },
  chartPillTxt: { fontSize: 9, fontWeight: '700', color: Colors.text },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#4ADE80' },
  liveTxt: { fontSize: 9, fontWeight: '700', color: Colors.text, letterSpacing: 2 },
  candles: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, flex: 1, paddingTop: 12, paddingBottom: 4 },
  candle: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  wick: { width: 1.5, backgroundColor: 'rgba(175,198,255,0.5)' },
  body: { width: 8, borderRadius: 2, opacity: 0.85 },
  fsBtn: {
    alignSelf: 'flex-end', backgroundColor: 'rgba(57,57,57,0.5)', padding: 6, borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.10)',
  },
  courseCard: {
    width: 190, backgroundColor: Colors.surfaceContainerLow, borderRadius: 18, overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.07)',
  },
  courseBanner: { height: 80, backgroundColor: Colors.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center' },
  courseLabel: { fontSize: 30, fontWeight: '900', opacity: 0.3 },
  courseBody: { padding: 14 },
  courseTitle: { fontSize: 12.5, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  courseSub: { fontSize: 9.5, color: Colors.onSurfaceVariant, marginBottom: 10 },
  progressBg: { height: 3, backgroundColor: Colors.surfaceContainerHigh, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primaryContainer, borderRadius: 4 },
  enquiriesBox: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 24, padding: 20,
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.07)', marginBottom: 8,
  },
  enquiriesTitle: { fontSize: 20, fontWeight: '900', color: Colors.primary, letterSpacing: -0.5, textAlign: 'center' },
  enquiriesSub: { fontSize: 11, color: Colors.onSurfaceVariant, marginTop: 2, marginBottom: 20, textAlign: 'center' },
  enquiriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  enquiryBtn: {
    width: (W - 80) / 2, flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.surfaceContainerHigh, padding: 12, borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.12)',
  },
  enquiryLabel: { fontSize: 11, fontWeight: '700', color: Colors.text },
});

export default HomeScreen;
