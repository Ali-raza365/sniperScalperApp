import React, { FC } from 'react';
import {
  View, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { marketRepository } from '../../data/repository';
import type { CoursePreview, HomeBento } from '../../data/types';
import type { RootStackParamList } from '../../navigation/types';
import { openExternal } from '../../utils/linking';
import ArchiveText from '../../components/archive/ArchiveText';
import SignalCard from '../../components/archive/SignalCard';
import ScreenHeader from '../../components/global/ScreenHeader';
import { useLiveSignals } from '../../hooks/useLiveSignals';

const { width: W } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const TONE_COLOR = { primary: Colors.primary, secondary: Colors.secondary, tertiary: Colors.tertiary };
const BENTO_THEME: Record<string, { iconColor: string; bg: string }> = {
  calendar: { iconColor: Colors.primary, bg: 'rgba(255,183,125,0.12)' },
  news: { iconColor: Colors.secondary, bg: 'rgba(175,198,255,0.12)' },
};

const BentoCard: FC<{ item: HomeBento; onPress: () => void }> = ({ item, onPress }) => {
  const theme = BENTO_THEME[item.id] ?? BENTO_THEME.news;
  return (
    <TouchableOpacity style={s.bentoCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[s.bentoIcon, { backgroundColor: theme.bg }]}>
        <MaterialIcons name={item.icon as any} size={22} color={theme.iconColor} />
      </View>
      <ArchiveText variant="title" color={Colors.text} style={s.bentoTitle}>{item.title}</ArchiveText>
      <ArchiveText variant="label">{item.sub}</ArchiveText>
    </TouchableOpacity>
  );
};

const CourseCard: FC<{ course: CoursePreview; onPress: () => void }> = ({ course, onPress }) => (
  <TouchableOpacity style={s.courseCard} onPress={onPress} activeOpacity={0.85}>
    <View style={s.courseBanner}>
      <ArchiveText variant="display" color={TONE_COLOR[course.tone]} style={s.courseLabel}>
        {course.label}
      </ArchiveText>
    </View>
    <View style={s.courseBody}>
      <ArchiveText variant="title" color={Colors.text} style={s.courseTitle}>{course.title}</ArchiveText>
      <ArchiveText variant="label" style={s.courseSub}>{course.sub}</ArchiveText>
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
    <ArchiveText variant="label" color={Colors.text} style={s.enquiryLabel}>{label}</ArchiveText>
  </TouchableOpacity>
);

const HomeScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const { signals, live } = useLiveSignals('all');
  const latest = signals.slice(0, 3);
  const bento = marketRepository.getHomeBento();
  const courses = marketRepository.getCoursePreviews();
  const enquiries = marketRepository.getEnquiryChannels();
  const candles = marketRepository.getHomeChartCandles();
  const chart = marketRepository.getChartSnapshot();

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScreenHeader
        title="Institutional Archive"
        showBack={false}
        rightIcon="monitoring"
        onRightPress={() => navigation.navigate('Watchlist')}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.hero}>
          <View style={s.heroIconBox}>
            <MaterialIcons name="inventory-2" size={44} color={Colors.primary} />
          </View>
          <ArchiveText variant="display" style={s.heroH1}>
            ACCESSING THE{'\n'}
            <ArchiveText variant="display" color={Colors.text} style={s.heroH1Sub}>Institutional Archive</ArchiveText>
          </ArchiveText>
          <ArchiveText variant="body" color={Colors.onSurfaceVariant} style={s.heroDesc}>
            Public portal to high-frequency market intelligence, liquidity maps, and professional Smart Money Concepts.
          </ArchiveText>
          <TouchableOpacity style={s.heroBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Watchlist')}>
            <ArchiveText variant="label" color={Colors.text} style={s.heroBtnText}>VIEW INTEL</ArchiveText>
          </TouchableOpacity>
        </View>

        <View style={s.section}>
          <View style={s.sectionHead}>
            <View style={s.sectionLeft}>
              <View style={s.accent} />
              <ArchiveText variant="title">LIVE SIGNALS</ArchiveText>
              <View style={[s.pulseChip, live ? s.pulseLive : s.pulseMock]}>
                <View style={[s.pulseDot, live ? s.pulseDotLive : s.pulseDotMock]} />
                <ArchiveText variant="label" color={live ? Colors.secondary : Colors.onSurfaceVariant} style={s.pulseTxt}>
                  {live ? 'Connected' : 'Fallback'}
                </ArchiveText>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signals')}>
              <ArchiveText variant="label">View Archive</ArchiveText>
            </TouchableOpacity>
          </View>
          {latest.length === 0 ? (
            <View style={s.emptyCard}>
              <ArchiveText variant="body" color={Colors.onSurfaceVariant}>
                Desk quiet — waiting on MT5
              </ArchiveText>
            </View>
          ) : (
            latest.map(signal => (
              <View key={signal.id} style={s.signalWrap}>
                <SignalCard signal={signal} />
              </View>
            ))
          )}
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
            <View style={s.sectionLeft}>
              <View style={s.accent} />
              <ArchiveText variant="title">CHART TERMINAL</ArchiveText>
            </View>
          </View>
          <View style={s.chartBox}>
            <View style={s.chartTop}>
              <View style={s.chartPill}>
                <ArchiveText variant="label" color={Colors.text}>{chart.symbol} {chart.timeframe}</ArchiveText>
              </View>
              <View style={s.liveRow}>
                <View style={s.liveDot} />
                <ArchiveText variant="label" color={Colors.text}>LIVE</ArchiveText>
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
            <View style={s.sectionLeft}>
              <View style={s.accent} />
              <ArchiveText variant="title">CURRICULUM</ArchiveText>
            </View>
            <ArchiveText variant="label">{courses.length} Modules</ArchiveText>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
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
          <ArchiveText variant="display" style={s.enquiriesTitle}>ENQUIRIES</ArchiveText>
          <ArchiveText variant="body" color={Colors.onSurfaceVariant} style={s.enquiriesSub}>
            Public desk for archive access requests
          </ArchiveText>
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
  scroll: { paddingHorizontal: 20, paddingTop: 24 },
  hero: { alignItems: 'center', marginBottom: 40, paddingTop: 16 },
  heroIconBox: {
    width: 88, height: 88, borderRadius: 20, backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  heroH1: { textAlign: 'center', lineHeight: 36, marginBottom: 12, fontFamily: FONTS.Black },
  heroH1Sub: { fontSize: 26, textTransform: 'uppercase', fontFamily: FONTS.Bold },
  heroDesc: { textAlign: 'center', maxWidth: W * 0.78, marginBottom: 24 },
  heroBtn: {
    backgroundColor: Colors.surfaceContainerHighest, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 8,
  },
  heroBtnText: { letterSpacing: 1.5, fontFamily: FONTS.SemiBold },
  section: { marginBottom: 36 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, flexWrap: 'wrap' },
  accent: { width: 2, height: 22, backgroundColor: Colors.primary, borderRadius: 1 },
  pulseChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20,
  },
  pulseLive: { backgroundColor: 'rgba(175,198,255,0.12)' },
  pulseMock: { backgroundColor: Colors.surfaceContainerHigh },
  pulseDot: { width: 7, height: 7, borderRadius: 4 },
  pulseDotLive: { backgroundColor: Colors.secondary },
  pulseDotMock: { backgroundColor: Colors.outline },
  pulseTxt: { letterSpacing: 1.2 },
  emptyCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16,
    borderLeftWidth: 2, borderLeftColor: Colors.primary,
  },
  signalWrap: { marginBottom: 16 },
  bentoGrid: { flexDirection: 'row', gap: 16, marginBottom: 36 },
  bentoCard: {
    flex: 1, backgroundColor: Colors.surfaceContainerHigh, borderRadius: 20, padding: 18, aspectRatio: 1,
    justifyContent: 'flex-end',
  },
  bentoIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 'auto' as any },
  bentoTitle: { fontSize: 14, color: Colors.text, marginBottom: 4 },
  chartBox: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 18, aspectRatio: 16 / 9,
    padding: 12, justifyContent: 'space-between',
  },
  chartTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chartPill: {
    backgroundColor: Colors.surfaceContainerLow, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.secondary },
  candles: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, flex: 1, paddingTop: 12, paddingBottom: 4 },
  candle: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  wick: { width: 1.5, backgroundColor: 'rgba(175,198,255,0.5)' },
  body: { width: 8, borderRadius: 2, opacity: 0.85 },
  fsBtn: {
    alignSelf: 'flex-end', backgroundColor: 'rgba(57,57,57,0.5)', padding: 6, borderRadius: 8,
  },
  courseCard: {
    width: 190, backgroundColor: Colors.surfaceContainerLow, borderRadius: 18, overflow: 'hidden',
  },
  courseBanner: { height: 80, backgroundColor: Colors.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center' },
  courseLabel: { fontSize: 30, opacity: 0.35 },
  courseBody: { padding: 14 },
  courseTitle: { fontSize: 13, color: Colors.text, marginBottom: 4 },
  courseSub: { marginBottom: 10 },
  progressBg: { height: 3, backgroundColor: Colors.surfaceContainerHigh, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primaryContainer, borderRadius: 4 },
  enquiriesBox: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 24, padding: 20, marginBottom: 8,
  },
  enquiriesTitle: { letterSpacing: -0.5, textAlign: 'center' },
  enquiriesSub: { marginTop: 4, marginBottom: 20, textAlign: 'center' },
  enquiriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  enquiryBtn: {
    width: (W - 80) / 2, flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.surfaceContainerHigh, padding: 12, borderRadius: 12,
  },
  enquiryLabel: { letterSpacing: 0.8 },
});

export default HomeScreen;
