/**
 * ChartScreen — TradingView chrome around live terminal
 * Matches pro-assets/screens/chart.png (chrome only; body is LiveChartTerminal)
 */
import React, { FC, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { Radii, Spacing } from '../../constants/Spacing';
import { marketRepository } from '../../data/repository';
import LiveChartTerminal from '../../components/charts/LiveChartTerminal';
import type { RootStackParamList, TabParamList } from '../../navigation/types';
import { showToast } from '../../utils/CustomToast';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type ChartsRoute = RouteProp<TabParamList, 'Charts'>;

const ChartScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ChartsRoute>();
  const snapshot = marketRepository.getChartSnapshot();
  const [activeTF, setActiveTF] = useState(snapshot.defaultTimeframeIndex);

  const displaySymbol = route.params?.symbol ?? snapshot.symbol;
  const displayCategory = route.params?.category ?? 'metals';
  const activeTimeframe = snapshot.timeframes[activeTF];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={s.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Watchlist')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.symbol}>{displaySymbol}</Text>
          <Text style={s.meta}>
            {activeTimeframe} • TradingView
          </Text>
        </View>
        <View style={s.headerRight}>
          <TouchableOpacity
            style={s.iconBtn}
            activeOpacity={0.75}
            onPress={() => showToast.success('Alerts desk is standing by.')}>
            <MaterialIcons name="notifications-none" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.iconBtn}
            activeOpacity={0.75}
            onPress={() => showToast.success('Chart settings opened.')}>
            <MaterialIcons name="settings" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.toolbar}>
        <View style={s.symbolChip}>
          <Text style={s.symbolChipTxt}>{displaySymbol}</Text>
        </View>
        <TouchableOpacity
          style={s.plusBtn}
          activeOpacity={0.75}
          onPress={() => showToast.success('Compare symbols from Watchlist.')}>
          <MaterialIcons name="add" size={20} color={Colors.text} />
        </TouchableOpacity>
        <View style={s.tfRow}>
          {snapshot.timeframes.slice(0, 4).map((tf, i) => {
            const idx = snapshot.timeframes.indexOf(tf);
            const active = idx === activeTF;
            return (
              <TouchableOpacity
                key={tf}
                style={[s.tfBtn, active && s.tfBtnActive]}
                onPress={() => setActiveTF(idx)}
                activeOpacity={0.7}>
                <Text style={[s.tfTxt, active && s.tfTxtActive]}>{tf}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={s.toolBtn}
          activeOpacity={0.75}
          onPress={() => showToast.success('Indicator overlays loaded.')}>
          <MaterialIcons name="insights" size={18} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={s.chartBox}>
        <LiveChartTerminal
          symbol={displaySymbol}
          category={displayCategory}
          timeframe={activeTimeframe}
          height={480}>
          <View style={s.fallback}>
            <MaterialIcons name="show-chart" size={40} color={Colors.primary} />
            <Text style={s.fallbackTitle}>
              {displaySymbol} · {activeTimeframe.toUpperCase()}
            </Text>
            <Text style={s.fallbackBody}>
              Live TradingView chart loads when network is available.
            </Text>
          </View>
        </LiveChartTerminal>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surfaceContainerLowest },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Spacing.pageMargin,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight ?? 24) + 10,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },
  headerCenter: { flex: 1 },
  symbol: { fontSize: 18, fontWeight: '700', color: Colors.text },
  meta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  headerRight: { flexDirection: 'row', gap: 4 },
  iconBtn: { padding: 4 },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.pageMargin,
    paddingBottom: 10,
    backgroundColor: Colors.background,
  },
  symbolChip: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radii.chip,
  },
  symbolChipTxt: { fontSize: 12, fontWeight: '700', color: Colors.text },
  plusBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tfRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  tfBtn: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: Radii.chip },
  tfBtnActive: { backgroundColor: 'rgba(246,177,122,0.18)' },
  tfTxt: { fontSize: 12, fontWeight: '700', color: Colors.textMuted },
  tfTxtActive: { color: Colors.primary },
  toolBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartBox: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    marginBottom: Platform.OS === 'ios' ? 85 : 68,
  },
  fallback: {
    flex: 1,
    minHeight: 320,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 32,
  },
  fallbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 1.2,
  },
  fallbackBody: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export default ChartScreen;
