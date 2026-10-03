import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { Radii, Spacing } from '../../constants/Spacing';

interface CourseCardProps {
  level: string;
  image: ImageSourcePropType;
  title: string;
  body: string;
  lessons: string;
  duration: string;
  author: string;
  onView?: () => void;
}

const CourseCard: FC<CourseCardProps> = ({
  level,
  image,
  title,
  body,
  lessons,
  duration,
  author,
  onView,
}) => (
  <View style={styles.card}>
    <View style={styles.media}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.levelBadge}>
        <Text style={styles.levelTxt}>{level.toUpperCase()}</Text>
      </View>
    </View>
    <View style={styles.body}>
      <View style={styles.titleRow}>
        <View style={styles.titleBar} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.desc}>{body}</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <MaterialIcons name="menu-book" size={18} color={Colors.primary} />
          <View>
            <Text style={styles.statLabel}>LESSONS</Text>
            <Text style={styles.statValue}>{lessons}</Text>
          </View>
        </View>
        <View style={styles.stat}>
          <MaterialIcons name="schedule" size={18} color={Colors.primary} />
          <View>
            <Text style={styles.statLabel}>DURATION</Text>
            <Text style={styles.statValue}>{duration}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.authorRow}>
          <Image
            source={require('../../assets/images/pro/avatar-fx-ramzan.png')}
            style={styles.authorAvatar}
          />
          <Text style={styles.author}>{author}</Text>
        </View>
        <TouchableOpacity style={styles.viewBtn} onPress={onView} activeOpacity={0.75}>
          <Text style={styles.viewTxt}>VIEW COURSE</Text>
          <MaterialIcons name="arrow-forward" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.card,
    overflow: 'hidden',
  },
  media: { height: 180, backgroundColor: Colors.surfaceContainerHigh },
  image: { width: '100%', height: '100%' },
  levelBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radii.chip,
  },
  levelTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 1,
  },
  body: { padding: Spacing.xl },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  titleBar: { width: 4, height: 22, borderRadius: 2, backgroundColor: Colors.primary },
  title: { flex: 1, fontSize: 20, fontWeight: '700', color: Colors.text },
  desc: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.onSurfaceVariant,
  },
  stats: { flexDirection: 'row', gap: 32, marginTop: 18 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1.2,
  },
  statValue: { fontSize: 14, fontWeight: '600', color: Colors.text, marginTop: 2 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  authorAvatar: { width: 28, height: 28, borderRadius: 14 },
  author: { fontSize: 15, fontWeight: '500', color: Colors.text },
  viewBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewTxt: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1.2,
  },
});

export default CourseCard;
