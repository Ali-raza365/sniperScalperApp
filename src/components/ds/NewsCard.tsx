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
import { Radii } from '../../constants/Spacing';
import { showToast } from '../../utils/CustomToast';

interface NewsCardProps {
  source: string;
  timestamp: string;
  tag?: string;
  image?: ImageSourcePropType;
  headline: string;
  excerpt: string;
  onFullReport?: () => void;
}

const NewsCard: FC<NewsCardProps> = ({
  source,
  timestamp,
  tag = '$BUSINESS',
  image,
  headline,
  excerpt,
  onFullReport,
}) => (
  <View style={styles.card}>
    <View style={styles.meta}>
      <Text style={styles.source} numberOfLines={1}>
        {source.toUpperCase()}
      </Text>
      <Text style={styles.time}>{timestamp}</Text>
      <View style={styles.tag}>
        <Text style={styles.tagTxt}>{tag}</Text>
      </View>
    </View>
    {image ? (
      <View style={styles.media}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
    ) : null}
    <Text style={styles.headline}>{headline}</Text>
    <Text style={styles.excerpt} numberOfLines={3}>
      {excerpt}
    </Text>
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.action}
        activeOpacity={0.7}
        onPress={() => showToast.success('Article saved to archive.')}>
        <MaterialIcons name="bookmark-border" size={18} color={Colors.onSurfaceVariant} />
        <Text style={styles.actionTxt}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.action}
        activeOpacity={0.7}
        onPress={() => showToast.success('Share sheet opened.')}>
        <MaterialIcons name="share" size={18} color={Colors.onSurfaceVariant} />
        <Text style={styles.actionTxt}>SHARE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fullReport}
        activeOpacity={0.75}
        onPress={onFullReport ?? (() => showToast.success('Full report is reserved for the archive desk.'))}>
        <Text style={styles.fullReportTxt}>FULL REPORT →</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
    padding: 18,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  source: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.6,
    maxWidth: '42%',
  },
  time: { fontSize: 12, color: Colors.textMuted },
  tag: {
    marginLeft: 'auto',
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 0.5,
  },
  media: {
    height: 160,
    borderRadius: Radii.media,
    overflow: 'hidden',
    marginVertical: 14,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  image: { width: '100%', height: '100%' },
  headline: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: Colors.text,
  },
  excerpt: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.onSurfaceVariant,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  action: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  fullReport: { marginLeft: 'auto' },
  fullReportTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.8,
  },
});

export default NewsCard;
