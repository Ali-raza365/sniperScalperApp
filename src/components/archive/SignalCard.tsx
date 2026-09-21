import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import type { Signal } from '../../data/types';
import ArchiveText from './ArchiveText';

interface SignalCardProps {
  signal: Signal;
}

const SignalCard: FC<SignalCardProps> = ({ signal }) => {
  const bullish = (signal.side ?? (signal.bias === 'BEARISH' ? 'SELL' : 'BUY')) === 'BUY';
  const chipColors = bullish
    ? [Colors.primary, Colors.primaryContainer]
    : [Colors.tertiary, Colors.tertiaryContainer];
  const rail = bullish ? Colors.primary : Colors.tertiary;
  const icon = signal.icon || (bullish ? 'trending-up' : 'trending-down');
  const pair = signal.symbol ?? signal.pair;
  const time = signal.time ?? '';
  const desc = signal.desc ?? signal.comment ?? '';

  return (
    <View style={styles.card}>
      <View style={[styles.rail, { backgroundColor: rail }]} />
      <View style={styles.iconWrap}>
        <MaterialIcons name={icon as any} size={18} color={rail} />
      </View>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={styles.pairRow}>
            <ArchiveText variant="label" color={Colors.text} style={styles.pair}>
              {pair}
            </ArchiveText>
            <LinearGradient colors={chipColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.chip}>
              <ArchiveText variant="label" color={Colors.background} style={styles.chipTxt}>
                {bullish ? 'BUY' : 'SELL'}
              </ArchiveText>
            </LinearGradient>
          </View>
          {time ? (
            <ArchiveText variant="label" style={styles.time}>
              {time}
            </ArchiveText>
          ) : null}
        </View>
        {desc ? (
          <ArchiveText variant="body" style={styles.desc}>
            {desc}
          </ArchiveText>
        ) : null}
        {(signal.price != null || signal.sl != null || signal.tp != null) && (
          <View style={styles.metaRow}>
            {signal.price != null ? <ArchiveText variant="label">IN {String(signal.price)}</ArchiveText> : null}
            {signal.sl != null ? <ArchiveText variant="label">SL {String(signal.sl)}</ArchiveText> : null}
            {signal.tp != null ? <ArchiveText variant="label">TP {String(signal.tp)}</ArchiveText> : null}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    overflow: 'hidden',
  },
  rail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  pairRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  pair: { letterSpacing: 1, color: Colors.text, fontSize: 11 },
  chip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  chipTxt: { fontSize: 8, letterSpacing: 1.2, color: '#2F1500' },
  time: { fontSize: 9 },
  desc: { fontSize: 13, lineHeight: 18 },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
});

export default SignalCard;
