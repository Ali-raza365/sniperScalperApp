import React, { FC, useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, StatusBar, RefreshControl } from 'react-native';
import { Colors } from '../../constants/Colors';
import ScreenHeader from '../../components/global/ScreenHeader';
import ArchiveText from '../../components/archive/ArchiveText';
import SignalCard from '../../components/archive/SignalCard';
import { useLiveSignals } from '../../hooks/useLiveSignals';
import type { SignalStatus } from '../../data/types';

const FILTERS: Array<{ id: SignalStatus | 'all'; label: string }> = [
  { id: 'open', label: 'Open' },
  { id: 'closed', label: 'Closed' },
  { id: 'all', label: 'All' },
];

const SignalsScreen: FC = () => {
  const [filter, setFilter] = useState<SignalStatus | 'all'>('open');
  const { signals, live, refreshing, refresh } = useLiveSignals('all');

  const visible = useMemo(
    () => (filter === 'all' ? signals : signals.filter(item => (item.status ?? 'open') === filter)),
    [filter, signals],
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScreenHeader title="LIVE SIGNALS" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }>
        <View style={s.topRow}>
          <View style={s.pulseRow}>
            <View style={[s.pulseDot, live ? s.pulseLive : s.pulseMock]} />
            <ArchiveText variant="label" color={live ? Colors.secondary : Colors.onSurfaceVariant}>
              {live ? 'Connected' : 'Archive fallback'}
            </ArchiveText>
          </View>
          <ArchiveText variant="label">{visible.length} tickets</ArchiveText>
        </View>

        <View style={s.chips}>
          {FILTERS.map(item => {
            const active = item.id === filter;
            return (
              <TouchableOpacity
                key={item.id}
                style={[s.chip, active && s.chipActive]}
                onPress={() => setFilter(item.id)}
                activeOpacity={0.8}>
                <ArchiveText
                  variant="label"
                  color={active ? '#623200' : Colors.onSurfaceVariant}
                  style={s.chipTxt}>
                  {item.label}
                </ArchiveText>
              </TouchableOpacity>
            );
          })}
        </View>

        {visible.length === 0 ? (
          <View style={s.empty}>
            <View style={s.emptyRail} />
            <ArchiveText variant="title" color={Colors.text} style={s.emptyTitle}>
              Desk quiet — waiting on MT5
            </ArchiveText>
            <ArchiveText variant="body" color={Colors.onSurfaceVariant} style={s.emptyBody}>
              Open tickets from the Expert Advisor will land here within about 10 seconds of a POST.
            </ArchiveText>
          </View>
        ) : (
          visible.map(signal => (
            <View key={signal.id} style={s.cardWrap}>
              <SignalCard signal={signal} />
            </View>
          ))
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 20 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  pulseRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pulseDot: { width: 8, height: 8, borderRadius: 4 },
  pulseLive: { backgroundColor: Colors.secondary },
  pulseMock: { backgroundColor: Colors.outline },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  chip: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipActive: { backgroundColor: Colors.primaryContainer },
  chipTxt: { letterSpacing: 1.2 },
  empty: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 22,
    overflow: 'hidden',
  },
  emptyRail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: Colors.primary,
  },
  emptyTitle: { marginBottom: 8 },
  emptyBody: { lineHeight: 20 },
  cardWrap: { marginBottom: 16 },
});

export default SignalsScreen;
