/**
 * AcademyScreen — Institutional Training course catalog
 * Matches pro-assets/screens/academy.png + Design System UI kit
 */
import React, { FC } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';
import { TopBar, CourseCard } from '../../components/ds';
import { ProImages } from '../../assets/images/pro';
import { academyRepository } from '../../data/repository';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const imageMap = {
  courseChart: ProImages.courseChart,
  newsSample1: ProImages.newsSample1,
  newsSample2: ProImages.newsSample2,
} as const;

const AcademyScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const catalog = academyRepository.getCatalog();

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <TopBar
        title="Academy"
        showBack
        onBack={() => navigation.navigate('BottomTab', { screen: 'Home' })}
        avatar={ProImages.avatar}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <Text style={s.eyebrow}>INSTITUTIONAL TRAINING</Text>
        <Text style={s.hero}>Courses</Text>
        <Text style={s.lead}>
          Access three professional trading courses designed to build a complete trading system, taught
          with an institutional approach to the markets.
        </Text>

        <View style={s.enrollPill}>
          <View style={s.dot} />
          <Text style={s.enrollTxt}>LIVE ENROLLMENT OPEN</Text>
        </View>
        <Text style={s.disclaimer}>
          For educational purposes only. Not financial advice — trading involves risk of loss.
        </Text>

        <View style={s.list}>
          {catalog.map(course => (
            <CourseCard
              key={course.id}
              level={course.level}
              image={imageMap[course.imageKey]}
              title={course.title}
              body={course.body}
              lessons={course.lessons}
              duration={course.duration}
              author={course.author}
              onView={() => navigation.navigate('CourseDetail', { courseId: course.id })}
            />
          ))}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.pageMargin, paddingTop: 8 },
  eyebrow: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3.5,
    marginTop: 8,
  },
  hero: {
    marginTop: 12,
    fontSize: 48,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 52,
  },
  lead: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
  },
  enrollPill: {
    marginTop: 18,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  enrollTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  disclaimer: {
    marginTop: 14,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
    color: Colors.textMuted,
  },
  list: { marginTop: 22, gap: 18 },
});

export default AcademyScreen;
