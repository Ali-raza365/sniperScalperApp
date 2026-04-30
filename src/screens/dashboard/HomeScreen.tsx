import React, { FC } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Platform, Dimensions, StatusBar,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width: W } = Dimensions.get('window');

const SignalCard: FC<{ pair: string; bias: string; biasColor: string; icon: string; desc: string; time: string }> = ({
  pair, bias, biasColor, icon, desc, time,
}) => (
  <View style={s.signalCard}>
    <View style={[s.signalIcon, { backgroundColor: Colors.surfaceContainerHigh }]}>
      <MaterialIcons name={icon} size={20} color={biasColor} />
    </View>
    <View style={{ flex: 1 }}>
      <View style={s.signalRow}>
        <Text style={[s.signalPair, { color: biasColor }]}>{pair} • {bias}</Text>
        <Text style={s.signalTime}>{time}</Text>
      </View>
      <Text style={s.signalDesc}>{desc}</Text>
    </View>
  </View>
);

const BentoCard: FC<{ icon: string; iconColor: string; bg: string; title: string; sub: string }> = ({
  icon, iconColor, bg, title, sub,
}) => (
  <View style={s.bentoCard}>
    <View style={[s.bentoIcon, { backgroundColor: bg }]}>
      <MaterialIcons name={icon} size={22} color={iconColor} />
    </View>
    <Text style={s.bentoTitle}>{title}</Text>
    <Text style={s.bentoSub}>{sub}</Text>
  </View>
);

const CourseCard: FC<{ label: string; labelColor: string; title: string; sub: string; progress: number }> = ({
  label, labelColor, title, sub, progress,
}) => (
  <View style={s.courseCard}>
    <View style={s.courseBanner}>
      <Text style={[s.courseLabel, { color: labelColor }]}>{label}</Text>
    </View>
    <View style={s.courseBody}>
      <Text style={s.courseTitle}>{title}</Text>
      <Text style={s.courseSub}>{sub}</Text>
      <View style={s.progressBg}>
        <View style={[s.progressFill, { width: `${progress * 100}%` as any }]} />
      </View>
    </View>
  </View>
);

const EnquiryBtn: FC<{ icon: string; color: string; label: string }> = ({ icon, color, label }) => (
  <TouchableOpacity style={s.enquiryBtn} activeOpacity={0.75}>
    <MaterialIcons name={icon} size={18} color={color} />
    <Text style={s.enquiryLabel}>{label}</Text>
  </TouchableOpacity>
);

const HomeScreen: FC = () => (
  <View style={s.root}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
    {/* Header */}
    <View style={s.header}>
      <View style={s.headerLeft}>
        <MaterialIcons name="menu" size={22} color={Colors.primary} />
        <Text style={s.headerTitle}>INSTITUTIONAL ARCHIVE</Text>
      </View>
      <MaterialIcons name="monitoring" size={22} color={Colors.primary} />
    </View>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
      {/* Hero */}
      <View style={s.hero}>
        <View style={s.heroIconBox}>
          <MaterialIcons name="inventory-2" size={44} color={Colors.primary} />
        </View>
        <Text style={s.heroH1}>ACCESSING THE{'\n'}<Text style={s.heroH1Sub}>Institutional Archive</Text></Text>
        <Text style={s.heroDesc}>Public portal to high-frequency market intelligence, liquidity maps, and professional Smart Money Concepts.</Text>
        <TouchableOpacity style={s.heroBtn} activeOpacity={0.85}>
          <Text style={s.heroBtnText}>VIEW INTEL</Text>
        </TouchableOpacity>
      </View>

      {/* Live Signals */}
      <View style={s.section}>
        <View style={s.sectionHead}>
          <View style={s.sectionLeft}>
            <View style={s.accent} /><Text style={s.sectionTitle}>LIVE SIGNALS</Text>
          </View>
          <Text style={s.viewAll}>View Archive</Text>
        </View>
        <SignalCard pair="EURUSD" bias="BULLISH" biasColor={Colors.secondary} icon="trending-up" desc="FVG identified at 1.0845. Institutional accumulation detected on 15m TF." time="2m ago" />
        <View style={{ height: 10 }} />
        <SignalCard pair="GBPUSD" bias="BEARISH" biasColor={Colors.tertiary} icon="trending-down" desc="Liquidity sweep at 1.2650. Market Structure Shift confirmed. Entry targets: 1.2610." time="15m ago" />
      </View>

      {/* Bento Grid */}
      <View style={s.bentoGrid}>
        <BentoCard icon="event" iconColor={Colors.primary} bg="rgba(255,183,125,0.12)" title="Economic Calendar" sub="High Impact Events Only" />
        <BentoCard icon="newspaper" iconColor={Colors.secondary} bg="rgba(175,198,255,0.12)" title="Market News" sub="Global Macro Insights" />
      </View>

      {/* Chart Terminal */}
      <View style={s.section}>
        <View style={s.sectionHead}>
          <View style={s.sectionLeft}><View style={s.accent} /><Text style={s.sectionTitle}>CHART TERMINAL</Text></View>
        </View>
        <View style={s.chartBox}>
          <View style={s.chartTop}>
            <View style={s.chartPill}><Text style={s.chartPillTxt}>XAUUSD M15</Text></View>
            <View style={s.liveRow}>
              <View style={s.liveDot} />
              <Text style={s.liveTxt}>LIVE</Text>
            </View>
          </View>
          <View style={s.candles}>
            {[40, 60, 80, 65, 90, 55, 75].map((h, i) => (
              <View key={i} style={s.candle}>
                <View style={[s.wick, { height: h * 0.3 }]} />
                <View style={[s.body, { height: h, backgroundColor: i % 2 === 0 ? Colors.tertiaryContainer : Colors.secondaryContainer }]} />
                <View style={[s.wick, { height: h * 0.2 }]} />
              </View>
            ))}
          </View>
          <TouchableOpacity style={s.fsBtn} activeOpacity={0.8}>
            <MaterialIcons name="fullscreen" size={16} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Curriculum */}
      <View style={s.section}>
        <View style={s.sectionHead}>
          <View style={s.sectionLeft}><View style={s.accent} /><Text style={s.sectionTitle}>CURRICULUM</Text></View>
          <Text style={s.viewAll}>3 Modules</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14 }}>
          <CourseCard label="SMC" labelColor={Colors.primary} title="Smart Money Concepts" sub="Orderblocks & Liquidity" progress={0.66} />
          <CourseCard label="VSA" labelColor={Colors.secondary} title="Volume Spread" sub="Professional Accumulation" progress={0} />
          <CourseCard label="ICT" labelColor={Colors.tertiary} title="Inner Circle Trader" sub="Time and Price Theory" progress={0} />
        </ScrollView>
      </View>

      {/* Enquiries */}
      <View style={s.enquiriesBox}>
        <Text style={s.enquiriesTitle}>ENQUIRIES</Text>
        <Text style={s.enquiriesSub}>Public desk for archive access requests</Text>
        <View style={s.enquiriesGrid}>
          <EnquiryBtn icon="call" color={Colors.primary} label="Inquiry Line" />
          <EnquiryBtn icon="chat" color="#4ADE80" label="WhatsApp" />
          <EnquiryBtn icon="send" color={Colors.secondary} label="Telegram" />
          <EnquiryBtn icon="mail" color={Colors.tertiary} label="Email Archival" />
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  </View>
);

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
