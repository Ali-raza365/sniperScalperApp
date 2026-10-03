/**
 * CourseDetailScreen — SMC / Academy course detail
 * Matches pro-assets/screens/course.png + Design System UI kit
 */
import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { Radii, Spacing } from '../../constants/Spacing';
import { TopBar, SectionHeader, FeatureTile } from '../../components/ds';
import { ProImages } from '../../assets/images/pro';
import { academyRepository } from '../../data/repository';
import type { RootStackParamList } from '../../navigation/types';
import { showToast } from '../../utils/CustomToast';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'CourseDetail'>;

const imageMap = {
  courseChart: ProImages.courseChart,
  newsSample1: ProImages.newsSample1,
  newsSample2: ProImages.newsSample2,
} as const;

const CourseDetailScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const course = academyRepository.getCourseById(route.params?.courseId ?? 'smc');

  const enroll = () => showToast.success('Enrollment desk will confirm shortly.');

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <TopBar title="Academy" tracked={false} showBack onBack={() => navigation.goBack()} centerTitle />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.hero}>
          <Image source={imageMap[course.imageKey]} style={s.heroImg} resizeMode="cover" />
          <View style={s.heroFade} />
          <View style={s.heroContent}>
            <View style={s.badgeRow}>
              <View style={s.levelBadge}>
                <Text style={s.levelTxt}>{course.level.toUpperCase()}</Text>
              </View>
              <View style={s.chip}>
                <Text style={s.chipTxt}>{course.duration.toUpperCase()}</Text>
              </View>
              <View style={s.chip}>
                <Text style={s.chipTxt}>{course.lessons.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={s.heroTitle}>{course.title}</Text>
            <Text style={s.heroSub}>Led by {course.author}</Text>
          </View>
        </View>

        <View style={s.body}>
          <TouchableOpacity style={s.cta} activeOpacity={0.85} onPress={enroll}>
            <Text style={s.ctaTxt}>ENROLL NOW</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 28 }}>
            <SectionHeader label="The Protocol" size="lg" />
          </View>
          <Text style={s.protocol}>{course.protocol}</Text>

          <Text style={s.archLabel}>SYSTEM ARCHITECTURE</Text>
          <View style={s.grid}>
            {course.architecture.map(item => (
              <FeatureTile key={item.title} icon={item.icon} title={item.title} body={item.body} />
            ))}
          </View>

          <TouchableOpacity style={[s.cta, s.ctaWide]} activeOpacity={0.85} onPress={enroll}>
            <Text style={s.ctaTxt}>ENROLL NOW</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40 },
  hero: { height: 300, position: 'relative' },
  heroImg: { width: '100%', height: '100%', opacity: 0.85 },
  heroFade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'transparent',
  },
  heroContent: {
    ...StyleSheet.absoluteFill,
    paddingHorizontal: Spacing.pageMargin,
    paddingTop: 16,
    paddingBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13,13,13,0.35)',
  },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  levelBadge: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.chip,
  },
  levelTxt: { fontSize: 11, fontWeight: '700', color: Colors.white, letterSpacing: 1 },
  chip: {
    backgroundColor: 'rgba(38,35,32,0.9)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radii.chip,
  },
  chipTxt: { fontSize: 11, fontWeight: '600', color: Colors.text, letterSpacing: 0.8 },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    lineHeight: 34,
    marginTop: 'auto',
  },
  heroSub: {
    marginTop: 6,
    fontSize: 15,
    fontStyle: 'italic',
    color: Colors.onSurfaceVariant,
  },
  body: { paddingHorizontal: Spacing.pageMargin, paddingTop: 22 },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: Radii.chip,
  },
  ctaWide: { alignSelf: 'stretch', alignItems: 'center', marginTop: 24 },
  ctaTxt: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textOnAccent,
    letterSpacing: 2,
  },
  protocol: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
  },
  archLabel: {
    marginTop: 28,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 2.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 14,
  },
});

export default CourseDetailScreen;
