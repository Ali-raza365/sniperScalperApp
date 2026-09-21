/**
 * WatchlistScreen — Institutional watchlist
 * From: desgin/stitch_sniper_scalper_mobile_app/watchlist_institutional/code.html
 */
import React, { FC, useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import ScreenHeader from '../../components/global/ScreenHeader';
import ArchiveText from '../../components/archive/ArchiveText';
import { marketRepository } from '../../data/repository';
import type { AssetCategory, WatchlistAsset } from '../../data/types';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const Sparkline: FC<{ points: number[]; color: string }> = ({ points, color }) => (
  <View style={s.spark}>
    {points.map((h, i) => (
      <View key={i} style={[s.sparkBar, { height: `${Math.max(12, h)}%` as any, backgroundColor: color }]} />
    ))}
  </View>
);

const AssetCard: FC<{ asset: WatchlistAsset; onPress: () => void }> = ({ asset, onPress }) => {
  const bullish = asset.changePct >= 0;
  const accent = bullish ? Colors.primary : Colors.tertiary;
  const changeColor = bullish ? Colors.secondary : Colors.tertiary;
  return (
    <TouchableOpacity style={[s.assetCard, { borderLeftColor: accent }]} onPress={onPress} activeOpacity={0.8}>
      <View style={s.assetTop}>
        <View style={s.assetIdentity}>
          <View style={[s.assetIcon, { backgroundColor: `${accent}18` }]}>
            <MaterialIcons name={asset.icon as any} size={20} color={accent} />
          </View>
          <View>
            <Text style={s.assetSymbol}>{asset.symbol}</Text>
            <Text style={s.assetName}>{asset.name}</Text>
          </View>
        </View>
        <MaterialIcons
          name={asset.starred ? 'star' : 'star-border'}
          size={20}
          color={asset.starred ? Colors.primary : Colors.onSurfaceVariant}
        />
      </View>
      <View style={s.assetBottom}>
        <View>
          <Text style={s.assetPrice}>{asset.price}</Text>
          <View style={s.changeRow}>
            <MaterialIcons
              name={bullish ? 'arrow-drop-up' : 'arrow-drop-down'}
              size={18}
              color={changeColor}
            />
            <Text style={[s.changeTxt, { color: changeColor }]}>
              {bullish ? '+' : ''}{asset.changePct.toFixed(2)}%
            </Text>
          </View>
        </View>
        <Sparkline points={asset.sparkline} color={accent} />
      </View>
    </TouchableOpacity>
  );
};

const WatchlistScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const pulse = marketRepository.getWatchlistPulse();
  const filters = marketRepository.getWatchlistFilters();
  const [category, setCategory] = useState<'all' | AssetCategory>('all');
  const [query, setQuery] = useState('');

  const assets = useMemo(
    () => marketRepository.getWatchlistAssets({ category, query }),
    [category, query],
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScreenHeader title="SMC TERMINAL" rightIcon="notifications" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.liveRow}>
          <View style={s.liveDot} />
          <ArchiveText variant="label" color={Colors.secondary} style={s.liveTxt}>Institutional Pulse</ArchiveText>
        </View>
        <ArchiveText variant="display" style={s.heroTitle}>
          {pulse.session} <ArchiveText variant="display" color={Colors.onSurfaceVariant} style={s.heroMuted}>{pulse.sessionState}</ArchiveText>
        </ArchiveText>
        <ArchiveText variant="body" color={Colors.onSurfaceVariant} style={s.heroNote}>
          Liquidity pools identified at <ArchiveText variant="body" color={Colors.primary}>{pulse.liquidityLevel}</ArchiveText>. {pulse.note}
        </ArchiveText>

        <View style={s.vixCard}>
          <View style={s.vixHead}>
            <Text style={s.vixLabel}>Volatility Index</Text>
            <MaterialIcons name="monitoring" size={18} color={Colors.primary} />
          </View>
          <Text style={s.vixValue}>VIX: {pulse.vix}</Text>
          <View style={s.changeRow}>
            <MaterialIcons name="trending-up" size={16} color={Colors.secondary} />
            <Text style={[s.changeTxt, { color: Colors.secondary }]}>{pulse.vixDelta}</Text>
          </View>
          <View style={s.progressBg}>
            <View style={[s.progressFill, { width: `${pulse.vixFill * 100}%` as any }]} />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
          {filters.map(filter => {
            const active = filter.id === category;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[s.filterChip, active && s.filterChipActive]}
                onPress={() => setCategory(filter.id)}
                activeOpacity={0.8}>
                <Text style={[s.filterTxt, active && s.filterTxtActive]}>{filter.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={s.searchBox}>
          <MaterialIcons name="search" size={18} color={Colors.outline} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Symbols..."
            placeholderTextColor="rgba(164,140,122,0.45)"
            style={s.searchInput}
          />
        </View>

        {assets.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onPress={() => navigation.navigate('BottomTab', { screen: 'Charts' })}
          />
        ))}

        <View style={s.reportCard}>
          <View style={s.reportHead}>
            <View style={s.reportIcon}>
              <MaterialIcons name="insights" size={18} color={Colors.primary} />
            </View>
            <Text style={s.reportTitle}>Market Divergence Report</Text>
          </View>
          <Text style={s.reportBody}>
            Smart Money Sentiment shows heavy accumulation in the USD/CHF pair near the H4 FVG. Retails are currently net short, providing liquidity for an institutional push higher.
          </Text>
          <View style={s.reportRow}>
            <Text style={s.reportKey}>SMC Signal</Text>
            <Text style={[s.reportVal, { color: Colors.primary }]}>BULLISH ACCUMULATION</Text>
          </View>
          <View style={s.reportRow}>
            <Text style={s.reportKey}>Probability</Text>
            <Text style={[s.reportVal, { color: Colors.secondary }]}>82% HIGH</Text>
          </View>
        </View>

        <TouchableOpacity style={s.newsCard} activeOpacity={0.8} onPress={() => navigation.navigate('BottomTab', { screen: 'News' })}>
          <View>
            <Text style={s.newsTitle}>News Terminal</Text>
            <Text style={s.newsSub}>US FOMC Meeting Minutes released in 4h 22m.</Text>
          </View>
          <View style={s.newsIcon}>
            <MaterialIcons name="article" size={20} color={Colors.onSurfaceVariant} />
          </View>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 22 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.secondary },
  liveTxt: { fontSize: 10, letterSpacing: 1.6 },
  heroTitle: { fontSize: 28, letterSpacing: -0.6, marginBottom: 10 },
  heroMuted: { fontSize: 28, fontFamily: FONTS.Light },
  heroNote: { marginBottom: 18 },
  vixCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16,
    borderLeftWidth: 2, borderLeftColor: Colors.primary, marginBottom: 20,
  },
  vixHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  vixLabel: { fontSize: 10, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 1.6, textTransform: 'uppercase' },
  vixValue: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  changeRow: { flexDirection: 'row', alignItems: 'center' },
  changeTxt: { fontSize: 12, fontWeight: '600' },
  progressBg: { height: 4, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 4, overflow: 'hidden', marginTop: 14 },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  filterRow: { gap: 8, paddingBottom: 14 },
  filterChip: { backgroundColor: Colors.surfaceContainerHigh, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  filterChipActive: { backgroundColor: Colors.primaryContainer },
  filterTxt: { fontSize: 11, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 0.8, textTransform: 'uppercase' },
  filterTxtActive: { color: '#623200' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,     backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14, paddingHorizontal: 14, marginBottom: 16,
  },
  searchInput: { flex: 1, color: Colors.text, paddingVertical: 12, fontSize: 14 },
  assetCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16, marginBottom: 12,
    borderLeftWidth: 2,
  },
  assetTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  assetIdentity: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  assetIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  assetSymbol: { fontSize: 16, fontFamily: FONTS.Bold, color: Colors.text },
  assetName: { fontSize: 10, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
  assetBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  assetPrice: { fontSize: 22, fontWeight: '900', color: Colors.text },
  spark: { flexDirection: 'row', alignItems: 'flex-end', height: 40, width: 96, gap: 3 },
  sparkBar: { flex: 1, borderRadius: 1, opacity: 0.9 },
  reportCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 18, marginTop: 8, marginBottom: 12 },
  reportHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  reportIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(255,183,125,0.16)', alignItems: 'center', justifyContent: 'center' },
  reportTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, textTransform: 'uppercase' },
  reportBody: { fontSize: 13, color: Colors.onSurfaceVariant, lineHeight: 20, marginBottom: 16 },
  reportRow: {
    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.surfaceContainerHigh,
    padding: 12, borderRadius: 10, marginBottom: 8,
  },
  reportKey: { fontSize: 11, fontWeight: '700', color: Colors.onSurfaceVariant },
  reportVal: { fontSize: 11, fontWeight: '700' },
  newsCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16, marginBottom: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  newsTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  newsSub: { fontSize: 12, color: Colors.onSurfaceVariant },
  newsIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
});

export default WatchlistScreen;
