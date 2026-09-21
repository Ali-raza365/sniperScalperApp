/**
 * AcademyScreen — Course List + Detail
 * Pixel-perfect from: desgin/stitch_sniper_scalper_mobile_app/course_details_smc/code.html
 */
import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { academyRepository } from '../../data/repository';
import type { LessonState } from '../../data/types';
import type { RootStackParamList } from '../../navigation/types';
import { showToast } from '../../utils/CustomToast';
import ScreenHeader from '../../components/global/ScreenHeader';

type Nav = NativeStackNavigationProp<RootStackParamList>;

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

  return (
    <View style={[s.lessonRow, state === 'current' && s.lessonRowCurrent]}>
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

const AcademyScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const course = academyRepository.getCourse();

  return (
  <View style={s.root}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
    <ScreenHeader title="SMC ELITE" showBack={false} />

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
      {/* Hero Video Banner */}
      <View style={s.heroBanner}>
        {/* Simulated video thumbnail */}
        <View style={s.videoGrad} />
        <View style={s.bannerContent}>
          <View style={s.badgeRow}>
            <View style={s.premiumBadge}><Text style={s.premiumBadgeTxt}>{course.badge}</Text></View>
            <View style={s.viewersRow}>
              <MaterialIcons name="visibility" size={11} color={Colors.onSurfaceVariant} />
              <Text style={s.viewersTxt}>{course.students}</Text>
            </View>
          </View>
          <Text style={s.bannerTitle}>{course.title}</Text>
          <View style={s.progressRow}>
            <TouchableOpacity style={s.continueBtn} activeOpacity={0.85} onPress={() => showToast.success('Resuming the current lesson from the archive.')}>
              <MaterialIcons name="play-arrow" size={20} color={Colors.background} />
              <Text style={s.continueTxt}>Continue Learning</Text>
            </TouchableOpacity>
            <View>
              <Text style={s.progressLabel}>Your Progress</Text>
              <Text style={s.progressPct}>{course.progress}% Complete</Text>
              <View style={s.progressBg}><View style={[s.progressFill, { width: `${course.progress}%` }]} /></View>
            </View>
          </View>
        </View>
        {/* Play overlay */}
        <TouchableOpacity style={s.playOverlay} activeOpacity={0.8} onPress={() => showToast.success('Lesson player is queued.')}>
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

      {course.modules.map(mod => (
        <View key={mod.id} style={[s.moduleCard, mod.locked && s.moduleLocked]}>
          <View style={s.moduleHeader}>
            <View>
              <Text style={[s.moduleNum, mod.locked && { color: Colors.onSurfaceVariant }]}>{mod.number}</Text>
              <Text style={s.moduleName}>{mod.name}</Text>
            </View>
            <Text style={s.moduleDuration}>{mod.duration}</Text>
          </View>
          {mod.locked ? (
            <View style={s.lockedRow}>
              <MaterialIcons name="lock" size={14} color={Colors.onSurfaceVariant} />
              <Text style={s.lockedTxt}>{mod.lockHint}</Text>
            </View>
          ) : (
            mod.lessons.map(lesson => (
              <LessonRow key={lesson.id} state={lesson.state} title={lesson.title} meta={lesson.meta} badge={lesson.badge} />
            ))
          )}
        </View>
      ))}

      {/* Instructor Card */}
      <View style={s.instructorCard}>
        <Text style={s.instructorLabel}>LEAD INSTRUCTOR</Text>
        <View style={s.instructorRow}>
          <View style={s.instructorAvatar}>
            <MaterialIcons name="person" size={28} color={Colors.onSurfaceVariant} />
          </View>
          <View>
            <Text style={s.instructorName}>{course.instructor.name}</Text>
            <Text style={s.instructorRole}>{course.instructor.role}</Text>
          </View>
        </View>
        <Text style={s.instructorBio}>{course.instructor.bio}</Text>
        <TouchableOpacity style={s.viewProfileBtn} activeOpacity={0.8} onPress={() => navigation.navigate('AboutUs')}>
          <Text style={s.viewProfileTxt}>VIEW FULL PROFILE</Text>
        </TouchableOpacity>
      </View>

      {/* Archive Docs */}
      <View style={s.docsCard}>
        <Text style={s.docsLabel}>ARCHIVE DOCUMENTS</Text>
        {course.documents.map((doc, i) => (
          <TouchableOpacity key={i} style={s.docRow} activeOpacity={0.8} onPress={() => showToast.success(`${doc.name} queued for download.`)}>
            <MaterialIcons name={doc.icon as any} size={18} color={Colors.secondary} />
            <Text style={s.docName}>{doc.name}</Text>
            <MaterialIcons name="download" size={14} color={Colors.onSurfaceVariant} />
          </TouchableOpacity>
        ))}
        <View style={s.liveSession}>
          <View style={s.liveSessionDot} />
          <View style={{ flex: 1 }}>
            <Text style={s.liveSessionLabel}>{course.liveSession.label}</Text>
            <Text style={s.liveSessionDesc}>{course.liveSession.desc}</Text>
          </View>
        </View>
        <TouchableOpacity style={s.joinLiveBtn} activeOpacity={0.85} onPress={() => showToast.success('Live stream desk is standing by.')}>
          <Text style={s.joinLiveTxt}>JOIN LIVE STREAM</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 8 },
  // Hero Banner
  heroBanner: { borderRadius: 18, overflow: 'hidden', aspectRatio: 16 / 9, backgroundColor: Colors.surfaceContainerLowest, marginBottom: 28, position: 'relative' },
  videoGrad: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(19,19,19,0.55)' },
  bannerContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 18 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  premiumBadge: { backgroundColor: Colors.secondaryContainer, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  premiumBadgeTxt: { fontSize: 9, fontWeight: '700', color: Colors.text, letterSpacing: 1 },
  viewersRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewersTxt: { fontSize: 10, color: Colors.onSurfaceVariant },
  bannerTitle: { fontSize: 17, fontFamily: FONTS.Bold, color: Colors.text, lineHeight: 22, marginBottom: 12 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  continueBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.primaryContainer, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  continueTxt: { fontSize: 11, fontWeight: '700', color: Colors.background, letterSpacing: 1 },
  progressLabel: { fontSize: 8.5, color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
  progressPct: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  progressBg: { width: 80, height: 5, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 4, overflow: 'hidden', marginTop: 2 },
  progressFill: { height: '100%', backgroundColor: Colors.primaryContainer, borderRadius: 4 },
  playOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  playCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,140,0,0.85)', alignItems: 'center', justifyContent: 'center' },
  // Syllabus
  syllabusHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  accentBar: { width: 3, height: 28, backgroundColor: Colors.primary, borderRadius: 2 },
  syllabusTitle: { fontSize: 18, fontFamily: FONTS.Bold, color: Colors.text, letterSpacing: 0.3 },
  moduleCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 18, marginBottom: 14, borderLeftWidth: 2, borderLeftColor: 'rgba(255,183,125,0.2)' },
  moduleLocked: { opacity: 0.6 },
  moduleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  moduleNum: { fontSize: 9.5, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 2 },
  moduleName: { fontSize: 17, fontFamily: FONTS.SemiBold, color: Colors.text },
  moduleDuration: { fontSize: 10, color: Colors.onSurfaceVariant, fontFamily: 'monospace' },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: 'rgba(53,53,53,0.35)', borderRadius: 12, marginBottom: 8 },
  lessonRowCurrent: { borderLeftWidth: 2, borderLeftColor: Colors.primary },
  lessonIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  lessonTitle: { fontSize: 12.5, fontWeight: '500', color: Colors.text, marginBottom: 2 },
  lessonMeta: { fontSize: 9, color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
  watchingBadge: { backgroundColor: 'rgba(255,183,125,0.12)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  watchingTxt: { fontSize: 8.5, fontWeight: '700', color: Colors.primary },
  lockedRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lockedTxt: { fontSize: 11, color: Colors.onSurfaceVariant, fontStyle: 'italic', flex: 1 },
  instructorCard: { backgroundColor: Colors.surfaceContainerHigh, borderRadius: 16, padding: 18, marginBottom: 14 },
  instructorLabel: { fontSize: 9, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  instructorAvatar: { width: 56, height: 56, borderRadius: 10, backgroundColor: Colors.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,183,125,0.3)' },
  instructorName: { fontSize: 16, fontWeight: '700', color: Colors.text },
  instructorRole: { fontSize: 10.5, color: Colors.onSurfaceVariant },
  instructorBio: { fontSize: 12, color: Colors.onSurfaceVariant, lineHeight: 18, marginBottom: 14 },
  viewProfileBtn: { backgroundColor: Colors.surfaceContainer, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
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
