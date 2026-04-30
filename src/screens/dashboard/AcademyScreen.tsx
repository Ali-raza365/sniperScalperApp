/**
 * AcademyScreen — Course List + Detail
 * Pixel-perfect from: desgin/stitch_sniper_scalper_mobile_app/course_details_smc/code.html
 */
import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors } from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type LessonState = 'done' | 'current' | 'locked';

interface LessonRowProps {
  state: LessonState;
  title: string;
  meta: string;
  badge?: string;
}

const LessonRow: FC<LessonRowProps> = ({ state, title, meta, badge }) => {
  const iconName = state === 'done' ? 'check-circle' : state === 'current' ? 'play-arrow' : 'lock';
  const iconColor = state === 'done' ? Colors.primary : state === 'current' ? Colors.background : Colors.onSurfaceVariant;
  const iconBg = state === 'done' ? 'rgba(255,183,125,0.12)' : state === 'current' ? Colors.primaryContainer : Colors.surfaceContainerHigh;
  const borderColor = state === 'current' ? `${Colors.primary}60` : 'transparent';

  return (
    <View style={[s.lessonRow, { borderColor }]}>
      <View style={[s.lessonIcon, { backgroundColor: iconBg }]}>
        <MaterialIcons name={iconName} size={16} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[s.lessonTitle, state === 'locked' && { opacity: 0.5 }, state === 'current' && { color: Colors.primary }]}>{title}</Text>
        <Text style={s.lessonMeta}>{meta}</Text>
      </View>
      {badge ? (
        <View style={s.watchingBadge}><Text style={s.watchingTxt}>{badge}</Text></View>
      ) : state === 'done' ? (
        <MaterialIcons name="description" size={18} color={Colors.onSurfaceVariant} />
      ) : state === 'locked' ? (
        <MaterialIcons name="lock" size={18} color="rgba(221,193,174,0.35)" />
      ) : null}
    </View>
  );
};

const AcademyScreen: FC = () => (
  <View style={s.root}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

    {/* Header */}
    <View style={s.header}>
      <View style={s.headerLeft}>
        <MaterialIcons name="menu" size={22} color={Colors.primary} />
        <Text style={s.headerTitle}>SMC ELITE</Text>
      </View>
      <View style={s.avatar}>
        <MaterialIcons name="person" size={18} color={Colors.onSurfaceVariant} />
      </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
      {/* Hero Video Banner */}
      <View style={s.heroBanner}>
        {/* Simulated video thumbnail */}
        <View style={s.videoGrad} />
        <View style={s.bannerContent}>
          <View style={s.badgeRow}>
            <View style={s.premiumBadge}><Text style={s.premiumBadgeTxt}>Premium Course</Text></View>
            <View style={s.viewersRow}>
              <MaterialIcons name="visibility" size={11} color={Colors.onSurfaceVariant} />
              <Text style={s.viewersTxt}>12.4k Students</Text>
            </View>
          </View>
          <Text style={s.bannerTitle}>Mastering Institutional Order Flow & Liquidity</Text>
          <View style={s.progressRow}>
            <TouchableOpacity style={s.continueBtn} activeOpacity={0.85}>
              <MaterialIcons name="play-arrow" size={20} color={Colors.background} />
              <Text style={s.continueTxt}>Continue Learning</Text>
            </TouchableOpacity>
            <View>
              <Text style={s.progressLabel}>Your Progress</Text>
              <Text style={s.progressPct}>64% Complete</Text>
              <View style={s.progressBg}><View style={[s.progressFill, { width: '64%' }]} /></View>
            </View>
          </View>
        </View>
        {/* Play overlay */}
        <TouchableOpacity style={s.playOverlay} activeOpacity={0.8}>
          <View style={s.playCircle}>
            <MaterialIcons name="play-arrow" size={36} color={Colors.text} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Syllabus */}
      <View style={s.syllabusHead}>
        <View style={s.accentBar} />
        <Text style={s.syllabusTitle}>COURSE SYLLABUS</Text>
      </View>

      {/* Module 1 */}
      <View style={s.moduleCard}>
        <View style={s.moduleHeader}>
          <View>
            <Text style={s.moduleNum}>Module 01</Text>
            <Text style={s.moduleName}>Foundation of Smart Money</Text>
          </View>
          <Text style={s.moduleDuration}>02:45:00 TOTAL</Text>
        </View>
        <LessonRow state="done" title="The Myth of Retail Support/Resistance" meta="Lesson 1.1 • Video • 42 mins" />
        <LessonRow state="current" title="Market Structure & Break of Structure (BOS)" meta="Current Lesson • 58 mins" badge="WATCHING" />
        <LessonRow state="locked" title="Identifying Change of Character (CHOCH)" meta="Lesson 1.3 • Video • 65 mins" />
      </View>

      {/* Module 2 — locked */}
      <View style={[s.moduleCard, s.moduleLocked]}>
        <View style={s.moduleHeader}>
          <View>
            <Text style={[s.moduleNum, { color: Colors.onSurfaceVariant }]}>Module 02</Text>
            <Text style={s.moduleName}>Liquidity Concepts & FVG</Text>
          </View>
          <Text style={s.moduleDuration}>03:12:00 TOTAL</Text>
        </View>
        <View style={s.lockedRow}>
          <MaterialIcons name="lock" size={14} color={Colors.onSurfaceVariant} />
          <Text style={s.lockedTxt}>Complete Module 01 to unlock institutional entry patterns.</Text>
        </View>
      </View>

      {/* Instructor Card */}
      <View style={s.instructorCard}>
        <Text style={s.instructorLabel}>LEAD INSTRUCTOR</Text>
        <View style={s.instructorRow}>
          <View style={s.instructorAvatar}>
            <MaterialIcons name="person" size={28} color={Colors.onSurfaceVariant} />
          </View>
          <View>
            <Text style={s.instructorName}>FX Ramzan</Text>
            <Text style={s.instructorRole}>Founder & Lead Strategist</Text>
          </View>
        </View>
        <Text style={s.instructorBio}>Specializing in high-frequency liquidity sweeps and fair value gap execution for tier-1 institutional desks.</Text>
        <TouchableOpacity style={s.viewProfileBtn} activeOpacity={0.8}>
          <Text style={s.viewProfileTxt}>VIEW FULL PROFILE</Text>
        </TouchableOpacity>
      </View>

      {/* Archive Docs */}
      <View style={s.docsCard}>
        <Text style={s.docsLabel}>ARCHIVE DOCUMENTS</Text>
        {[
          { icon: 'terminal', name: 'SMC Cheat Sheet.pdf' },
          { icon: 'analytics', name: 'Liquidity Checklist' },
        ].map((doc, i) => (
          <View key={i} style={s.docRow}>
            <MaterialIcons name={doc.icon as any} size={18} color={Colors.secondary} />
            <Text style={s.docName}>{doc.name}</Text>
            <MaterialIcons name="download" size={14} color={Colors.onSurfaceVariant} />
          </View>
        ))}
        <View style={s.liveSession}>
          <View style={s.liveSessionDot} />
          <View style={{ flex: 1 }}>
            <Text style={s.liveSessionLabel}>Live Session Today</Text>
            <Text style={s.liveSessionDesc}>Market Review: NY Session Open with FX Ramzan</Text>
          </View>
        </View>
        <TouchableOpacity style={s.joinLiveBtn} activeOpacity={0.85}>
          <Text style={s.joinLiveTxt}>JOIN LIVE STREAM</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.background,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Colors.primaryContainer, letterSpacing: 2 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.15)' },
  scroll: { paddingHorizontal: 20, paddingTop: 8 },
  // Hero Banner
  heroBanner: { borderRadius: 18, overflow: 'hidden', aspectRatio: 16 / 9, backgroundColor: Colors.surfaceContainerLowest, marginBottom: 28, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.15)', position: 'relative' },
  videoGrad: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(19,19,19,0.55)' },
  bannerContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 18 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  premiumBadge: { backgroundColor: Colors.secondaryContainer, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  premiumBadgeTxt: { fontSize: 9, fontWeight: '700', color: Colors.text, letterSpacing: 1 },
  viewersRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewersTxt: { fontSize: 10, color: Colors.onSurfaceVariant },
  bannerTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, lineHeight: 22, marginBottom: 12 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  continueBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.primaryContainer, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  continueTxt: { fontSize: 11, fontWeight: '700', color: Colors.background, letterSpacing: 1 },
  progressLabel: { fontSize: 8.5, color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
  progressPct: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  progressBg: { width: 80, height: 5, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 4, overflow: 'hidden', marginTop: 2 },
  progressFill: { height: '100%', backgroundColor: Colors.primaryContainer, borderRadius: 4 },
  playOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  playCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,140,0,0.85)', alignItems: 'center', justifyContent: 'center' },
  // Syllabus
  syllabusHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  accentBar: { width: 3, height: 28, backgroundColor: Colors.primary, borderRadius: 2 },
  syllabusTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, letterSpacing: 0.3 },
  moduleCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 18, marginBottom: 14, borderLeftWidth: 2, borderLeftColor: 'rgba(255,183,125,0.2)' },
  moduleLocked: { opacity: 0.6 },
  moduleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  moduleNum: { fontSize: 9.5, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 2 },
  moduleName: { fontSize: 17, fontWeight: '600', color: Colors.text },
  moduleDuration: { fontSize: 10, color: Colors.onSurfaceVariant, fontFamily: 'monospace' },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: 'rgba(53,53,53,0.35)', borderRadius: 12, marginBottom: 8, borderWidth: 1 },
  lessonIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  lessonTitle: { fontSize: 12.5, fontWeight: '500', color: Colors.text, marginBottom: 2 },
  lessonMeta: { fontSize: 9, color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
  watchingBadge: { backgroundColor: 'rgba(255,183,125,0.12)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  watchingTxt: { fontSize: 8.5, fontWeight: '700', color: Colors.primary },
  lockedRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lockedTxt: { fontSize: 11, color: Colors.onSurfaceVariant, fontStyle: 'italic', flex: 1 },
  instructorCard: { backgroundColor: Colors.surfaceContainerHigh, borderRadius: 16, padding: 18, marginBottom: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.10)' },
  instructorLabel: { fontSize: 9, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  instructorAvatar: { width: 56, height: 56, borderRadius: 10, backgroundColor: Colors.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,183,125,0.3)' },
  instructorName: { fontSize: 16, fontWeight: '700', color: Colors.text },
  instructorRole: { fontSize: 10.5, color: Colors.onSurfaceVariant },
  instructorBio: { fontSize: 12, color: Colors.onSurfaceVariant, lineHeight: 18, marginBottom: 14 },
  viewProfileBtn: { borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(164,140,122,0.25)', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  viewProfileTxt: { fontSize: 10, fontWeight: '700', color: Colors.primary, letterSpacing: 1.5, textTransform: 'uppercase' },
  docsCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
  docsLabel: { fontSize: 9, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2, padding: 18, paddingBottom: 12 },
  docRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingVertical: 12 },
  docName: { flex: 1, fontSize: 12.5, color: Colors.text },
  liveSession: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: 'rgba(53,53,53,0.2)', padding: 18, paddingTop: 14 },
  liveSessionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.secondary, marginTop: 4 },
  liveSessionLabel: { fontSize: 10, fontWeight: '700', color: Colors.secondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  liveSessionDesc: { fontSize: 12, color: Colors.onSurfaceVariant },
  joinLiveBtn: { backgroundColor: Colors.secondaryContainer, margin: 18, marginTop: 12, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  joinLiveTxt: { fontSize: 11, fontWeight: '700', color: Colors.text, letterSpacing: 2 },
});

export default AcademyScreen;
