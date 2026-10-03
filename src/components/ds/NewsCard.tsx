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
  tickers?: string[];
  alert?: string;
  image?: ImageSourcePropType;
  headline: string;
  excerpt: string;
  onFullReport?: () => void;
}

const NewsCard: FC<NewsCardProps> = ({
  source,
  timestamp,
  tag = '$BUSINESS',
  tickers,
  alert,
  image,
  headline,
  excerpt,
  onFullReport,
}) => {
  const tags = tickers?.length ? tickers : [tag];

  return (
    <View style={[styles.card, image ? styles.cardFlushMedia : null]}>
      {image ? (
        <View style={styles.mediaFlush}>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>
      ) : null}

      <View style={styles.body}>
        <View style={styles.meta}>
          <View style={styles.sourceRow}>
            <View style={styles.sourceBadge}>
              <Text style={styles.source} numberOfLines={1}>
                {source.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.time}>{timestamp}</Text>
          </View>
          <View style={styles.tagRow}>
            {tags.map(t => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagTxt}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        {!image ? (
          <>
            <Text style={styles.headline}>{headline}</Text>
            <Text style={styles.excerpt} numberOfLines={2}>
              {excerpt}
            </Text>
          </>
        ) : (
          <Text style={styles.headline}>{headline}</Text>
        )}

        <View style={styles.footer}>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.action}
              activeOpacity={0.7}
              onPress={() => showToast.success('Article saved to archive.')}>
              <MaterialIcons name="bookmark-border" size={16} color={Colors.onSurfaceVariant} />
              <Text style={styles.actionTxt}>SAVE</Text>
            </TouchableOpacity>
            {!alert ? (
              <TouchableOpacity
                style={styles.action}
                activeOpacity={0.7}
                onPress={() => showToast.success('Share sheet opened.')}>
                <MaterialIcons name="share" size={16} color={Colors.onSurfaceVariant} />
                <Text style={styles.actionTxt}>SHARE</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {alert ? (
            <Text style={styles.alertTxt}>{alert.toUpperCase()}</Text>
          ) : (
            <TouchableOpacity
              style={styles.fullReport}
              activeOpacity={0.75}
              onPress={
                onFullReport ??
                (() => showToast.success('Full report is reserved for the archive desk.'))
              }>
              <Text style={styles.fullReportTxt}>
                {image ? 'FULL REPORT →' : 'ANALYSIS AVAILABLE →'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
    overflow: 'hidden',
  },
  cardFlushMedia: {
    padding: 0,
  },
  body: {
    padding: 18,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  sourceBadge: {
    backgroundColor: 'rgba(246,177,122,0.12)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(246,177,122,0.28)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    maxWidth: 160,
  },
  source: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.4,
  },
  time: { fontSize: 11, color: 'rgba(201,184,164,0.6)', fontWeight: '500' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' },
  tag: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 0.5,
  },
  mediaFlush: {
    height: 168,
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
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.onSurfaceVariant,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(138,128,120,0.18)',
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.2,
  },
  fullReport: { marginLeft: 'auto' },
  fullReportTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 1.2,
  },
  alertTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.tertiary,
    letterSpacing: 1.2,
    marginLeft: 'auto',
  },
});

export default NewsCard;
