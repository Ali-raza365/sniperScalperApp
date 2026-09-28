/**
 * ChartScreen — "SMC TERMINAL" Chart View
 * Pixel-perfect from: desgin/stitch_sniper_scalper_mobile_app/live_chart_tv_style/code.html
 */
import React, { FC, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { marketRepository } from '../../data/repository';
import type { RootStackParamList } from '../../navigation/types';
import { showToast } from '../../utils/CustomToast';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const ChartScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const snapshot = marketRepository.getChartSnapshot();
  const [activeTF, setActiveTF] = useState(snapshot.defaultTimeframeIndex);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.avatar}>
            <MaterialIcons name="person" size={18} color={Colors.onSurfaceVariant} />
          </View>
          <Text style={s.headerTitle}>SMC TERMINAL</Text>
        </View>
        <TouchableOpacity style={s.notifBtn} activeOpacity={0.75} onPress={() => navigation.navigate('Watchlist')}>
          <MaterialIcons name="notifications" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Timeframe Selector */}
        <View style={s.toolbar}>
          <View style={s.tfRow}>
            {snapshot.timeframes.map((tf, i) => (
              <TouchableOpacity
                key={tf}
                style={[s.tfBtn, i === activeTF && s.tfBtnActive]}
                onPress={() => setActiveTF(i)}
                activeOpacity={0.7}>
                <Text style={[s.tfTxt, i === activeTF && s.tfTxtActive]}>{tf}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={s.toolbarRight}>
            <TouchableOpacity style={s.toolBtn} activeOpacity={0.8} onPress={() => showToast.success('Indicator overlays are loaded from the archive snapshot.')}>
              <MaterialIcons name="settings-input-component" size={16} color={Colors.text} />
              <Text style={s.toolBtnTxt}>Indicators</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.toolBtn} activeOpacity={0.8} onPress={() => showToast.success('Chart snapshot captured.')}>
              <MaterialIcons name="camera-alt" size={16} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Chart */}
        <View style={s.chartBox}>
          {/* Volume overlay */}
          <View style={s.chartOverlay}>
            <Text style={s.volLabel}>{snapshot.volumeLabel}</Text>
            <Text style={s.volValue}>{snapshot.volumeValue}</Text>
          </View>
          {/* FVG Zone */}
          <View style={s.fvgZone}>
            <Text style={s.fvgLabel}>{snapshot.fvgLabel}</Text>
          </View>
          {/* Order Block */}
          <View style={s.obZone}>
            <Text style={s.obLabel}>{snapshot.obLabel}</Text>
          </View>
          {/* Candles */}
          <View style={s.candleArea}>
            {snapshot.candles.map((c, i) => (
              <View key={i} style={s.candleCol}>
                <View style={[s.wick, { height: c.h * 0.35, backgroundColor: c.bear ? 'rgba(255,177,196,0.45)' : 'rgba(175,198,255,0.45)' }]} />
                <View style={[s.candleBody, {
                  height: c.h,
                  backgroundColor: c.bear ? Colors.tertiaryContainer : Colors.secondaryContainer,
                  ...(i === snapshot.candles.length - 1 && { shadowColor: Colors.secondary, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4 }),
                }]} />
                <View style={[s.wick, { height: c.h * 0.2, backgroundColor: c.bear ? 'rgba(255,177,196,0.45)' : 'rgba(175,198,255,0.45)' }]} />
                {i === snapshot.candles.length - 1 && (
                  <View style={s.sellSignal}><Text style={s.sellSignalTxt}>SELL SIGNAL</Text></View>
                )}
              </View>
            ))}
          </View>
          {/* Price Scale */}
          <View style={s.priceScale}>
            {snapshot.priceScale.map((p, i) => (
              <Text key={i} style={[s.priceLabel, i === snapshot.activePriceIndex && s.priceLabelActive]}>{p}</Text>
            ))}
          </View>
          {/* Time Scale */}
          <View style={s.timeScale}>
            {snapshot.timeScale.map(t => (
              <Text key={t} style={s.timeLabel}>{t}</Text>
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View style={s.statsRow}>
          {/* Sentiment Matrix */}
          <View style={[s.statCard, { flex: 1 }]}>
            <View style={s.statAccent} />
            <Text style={s.statTitle}>Sentiment Matrix</Text>
            {snapshot.sentiment.map((item, index) => (
              <View key={item.label}>
                {index > 0 ? <View style={{ height: 12 }} /> : null}
                <View style={s.statItem}>
                  <Text style={s.statLabel}>{item.label}</Text>
                  <Text style={[s.statValue, { color: item.tone === 'bearish' ? Colors.tertiary : Colors.secondary }]}>{item.value}%</Text>
                </View>
                <View style={s.progressBg}>
                  <View style={[s.progressFill, { width: `${item.value}%`, backgroundColor: item.tone === 'bearish' ? Colors.tertiary : Colors.secondary }]} />
                </View>
              </View>
            ))}
          </View>

          {/* Execution Engine */}
          <View style={[s.statCard, { flex: 1.6 }]}>
            <Text style={s.statTitle}>Execution Engine</Text>
            <Text style={s.execDesc}>{snapshot.executionNote}</Text>
            <View style={s.execChips}>
              <View style={s.execChip}><Text style={s.execChipLabel}>Spread</Text><Text style={s.execChipValue}>{snapshot.spread}</Text></View>
              <View style={s.execChip}><Text style={s.execChipLabel}>Leverage</Text><Text style={s.execChipValue}>{snapshot.leverage}</Text></View>
            </View>
            <View style={s.execBtns}>
              <TouchableOpacity style={[s.execBtn, { backgroundColor: Colors.secondaryContainer }]} activeOpacity={0.85} onPress={() => showToast.success('Buy ticket queued against the liquidity map.')}>
                <MaterialIcons name="trending-up" size={18} color={Colors.text} />
                <Text style={s.execBtnTxt}>INSTITUTIONAL BUY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.execBtn, { backgroundColor: Colors.tertiaryContainer }]} activeOpacity={0.85} onPress={() => showToast.success('Sell ticket queued against the liquidity map.')}>
                <MaterialIcons name="trending-down" size={18} color={Colors.text} />
                <Text style={s.execBtnTxt}>LIQUIDITY SELL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Decorative gradients (simulated) */}
      <View style={s.glowTL} />
      <View style={s.glowBR} />
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight ?? 24) + 10,
    paddingBottom: 14,
    backgroundColor: 'rgba(19,19,19,0.92)',
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(86,67,52,0.12)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.2)' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Colors.primaryContainer, letterSpacing: 2 },
  notifBtn: { padding: 6 },
  scroll: { paddingHorizontal: 16, paddingTop: 8 },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, gap: 10 },
  tfRow: { flexDirection: 'row', backgroundColor: Colors.surfaceContainerLow, borderRadius: 12, padding: 4, gap: 2 },
  tfBtn: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8 },
  tfBtnActive: { backgroundColor: 'rgba(255,183,125,0.12)' },
  tfTxt: { fontSize: 11, fontWeight: '700', color: Colors.onSurfaceVariant },
  tfTxtActive: { color: Colors.primary },
  toolbarRight: { flexDirection: 'row', gap: 8 },
  toolBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.surfaceContainerHigh, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  toolBtnTxt: { fontSize: 11, fontWeight: '700', color: Colors.text },
  chartBox: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: 20, overflow: 'hidden', minHeight: 260, marginBottom: 20, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.10)', position: 'relative' },
  chartOverlay: { position: 'absolute', top: 14, left: 16, zIndex: 2 },
  volLabel: { fontSize: 9, fontWeight: '700', color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  volValue: { fontSize: 18, fontWeight: '700', color: Colors.text },
  fvgZone: { position: 'absolute', top: '20%', left: '18%', width: '18%', height: '14%', backgroundColor: 'rgba(175,198,255,0.10)', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(175,198,255,0.4)', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  fvgLabel: { fontSize: 7, fontWeight: '900', color: Colors.secondary, letterSpacing: 1, textTransform: 'uppercase' },
  obZone: { position: 'absolute', bottom: '20%', right: '8%', width: '28%', height: '18%', backgroundColor: 'rgba(255,183,125,0.10)', borderLeftWidth: 2, borderColor: Colors.primary, justifyContent: 'flex-start', padding: 6, zIndex: 2 },
  obLabel: { fontSize: 7, fontWeight: '900', color: Colors.primary, letterSpacing: 1, textTransform: 'uppercase' },
  candleArea: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, padding: 16, paddingTop: 60, paddingBottom: 44, paddingRight: 70, flex: 1, minHeight: 260 },
  candleCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', position: 'relative' },
  wick: { width: 2 },
  candleBody: { width: 14, borderRadius: 3, opacity: 0.85 },
  sellSignal: { position: 'absolute', top: -22, backgroundColor: Colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  sellSignalTxt: { fontSize: 8, fontWeight: '900', color: Colors.background },
  priceScale: { position: 'absolute', right: 0, top: 0, bottom: 44, width: 60, backgroundColor: 'rgba(27,27,27,0.85)', justifyContent: 'space-between', paddingVertical: 12, alignItems: 'center' },
  priceLabel: { fontSize: 9, color: 'rgba(221,193,174,0.6)', fontWeight: '500' },
  priceLabelActive: { color: Colors.primary, fontWeight: '700', backgroundColor: 'rgba(255,183,125,0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  timeScale: { position: 'absolute', bottom: 0, left: 0, right: 60, height: 36, backgroundColor: 'rgba(27,27,27,0.85)', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'center' },
  timeLabel: { fontSize: 9, color: 'rgba(221,193,174,0.6)', fontWeight: '500' },
  statsRow: { flexDirection: 'row', gap: 14, marginBottom: 20 },
  statCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden' },
  statAccent: { position: 'absolute', top: 0, left: 0, width: 3, height: '100%', backgroundColor: Colors.primary },
  statTitle: { fontSize: 9, fontWeight: '900', color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 },
  statItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 },
  statLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(226,226,226,0.6)', textTransform: 'uppercase' },
  statValue: { fontSize: 18, fontWeight: '700' },
  progressBg: { height: 3, backgroundColor: Colors.surfaceContainerHigh, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  execDesc: { fontSize: 10, color: 'rgba(226,226,226,0.4)', marginBottom: 14, lineHeight: 14 },
  execChips: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  execChip: { backgroundColor: Colors.surfaceContainerHigh, borderRadius: 12, padding: 10, alignItems: 'center', flex: 1, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.10)' },
  execChipLabel: { fontSize: 8, color: Colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  execChipValue: { fontSize: 12, fontWeight: '700', color: Colors.text },
  execBtns: { gap: 10 },
  execBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12 },
  execBtnTxt: { fontSize: 10, fontWeight: '900', color: Colors.text, letterSpacing: 1.5 },
  glowTL: { position: 'absolute', top: -80, left: -80, width: 200, height: 200, backgroundColor: 'rgba(255,183,125,0.04)', borderRadius: 100 },
  glowBR: { position: 'absolute', bottom: -80, right: -80, width: 200, height: 200, backgroundColor: 'rgba(175,198,255,0.04)', borderRadius: 100 },
});

export default ChartScreen;
