/**
 * AboutUsScreen — Sniper Scalper brand / archive story
 * From: desgin/stitch_sniper_scalper_mobile_app/about_us/code.html
 */
import React, { FC } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import ScreenHeader from '../../components/global/ScreenHeader';
import ArchiveText from '../../components/archive/ArchiveText';
import { supportRepository } from '../../data/repository';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const AboutUsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const philosophy = supportRepository.getAboutPhilosophy();

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScreenHeader title="SMC ELITE" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.pulse}>
          <View style={s.pulseDot} />
          <ArchiveText variant="label" color={Colors.secondary} style={s.pulseTxt}>The Institutional Archive</ArchiveText>
        </View>
        <ArchiveText variant="display" style={s.hero}>
          Sniper{'\n'}<ArchiveText variant="display" color={Colors.text} style={s.heroAlt}>Scalper</ArchiveText>
        </ArchiveText>
        <ArchiveText variant="body" color={Colors.onSurfaceVariant} style={s.lead}>
          Precision is not an act, but a habit. We distill the chaos of global liquidity into institutional-grade signals.
        </ArchiveText>
        <TouchableOpacity style={s.primaryBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Watchlist')}>
          <Text style={s.primaryTxt}>ACCESS ARCHIVE</Text>
        </TouchableOpacity>

        <View style={s.founderCard}>
          <View style={s.founderAvatar}>
            <MaterialIcons name="person" size={42} color={Colors.onSurfaceVariant} />
          </View>
          <View>
            <Text style={s.founderName}>FX RAMZAN</Text>
            <Text style={s.founderRole}>Founder & Lead Strategist</Text>
          </View>
        </View>

        <View style={s.missionCard}>
          <View style={s.goldRule} />
          <Text style={s.missionTitle}>Mission Statement</Text>
          <Text style={s.missionBody}>
            The Institutional Archive was born from a necessity to move beyond the retail noise. Sniper Scalper provides a surgical look into the mechanics of the market—identifying Fair Value Gaps, Liquidity Sweeps, and Order Blocks with clinical precision. We don't trade patterns; we trade intent.
          </Text>
        </View>

        <View style={s.statCard}>
          <MaterialIcons name="analytics" size={42} color={Colors.primary} />
          <Text style={s.statValue}>98% Accuracy</Text>
          <Text style={s.statSub}>Model 01 Backtest results</Text>
        </View>

        <Text style={s.sectionTitle}>
          SMC Algorithm{'\n'}<Text style={{ color: Colors.text }}>Philosophy</Text>
        </Text>
        <Text style={s.sectionSub}>A multi-layered execution framework designed for high-frequency institutional desks.</Text>

        {philosophy.map(item => (
          <View
            key={item.id}
            style={[
              s.philCard,
              item.accent === 'secondary' && { borderLeftColor: Colors.secondary },
              item.accent === 'tertiary' && { borderLeftColor: Colors.tertiary },
            ]}>
            {item.number ? <Text style={s.philNum}>{item.number}</Text> : null}
            {item.kicker ? (
              <Text style={[s.philKicker, { color: item.accent === 'tertiary' ? Colors.tertiary : Colors.secondary }]}>
                {item.kicker}
              </Text>
            ) : null}
            <Text style={s.philTitle}>{item.title}</Text>
            <Text style={s.philBody}>{item.body}</Text>
          </View>
        ))}

        <View style={s.cta}>
          <Text style={s.ctaTitle}>Ready to trade like an Institution?</Text>
          <Text style={s.ctaSub}>Join 15,000+ traders using Sniper Scalper to navigate the markets with surgical precision.</Text>
          <TouchableOpacity style={s.ctaPrimary} activeOpacity={0.85} onPress={() => navigation.navigate('Watchlist')}>
            <Text style={s.ctaPrimaryTxt}>START SCALPING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.ctaGhost} activeOpacity={0.85} onPress={() => navigation.navigate('BottomTab', { screen: 'Academy' })}>
            <Text style={s.ctaGhostTxt}>VIEW SAMPLES</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 24 },
  pulse: {
    alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(4,93,208,0.12)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16,
  },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.secondary },
  pulseTxt: { letterSpacing: 1.8 },
  hero: { fontSize: 42, lineHeight: 46, marginBottom: 14 },
  heroAlt: { fontSize: 42, lineHeight: 46 },
  lead: { fontSize: 16, lineHeight: 24, marginBottom: 22 },
  primaryBtn: { backgroundColor: Colors.primaryContainer, paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 24 },
  primaryTxt: { fontSize: 12, fontWeight: '800', color: '#623200', letterSpacing: 2 },
  founderCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: Colors.surfaceContainerHigh,
    padding: 16, borderRadius: 14, marginBottom: 16,
  },
  founderAvatar: {
    width: 64, height: 80, borderRadius: 10, backgroundColor: Colors.surfaceContainerHighest,
    alignItems: 'center', justifyContent: 'center', borderLeftWidth: 2, borderLeftColor: Colors.primary,
  },
  founderName: { fontSize: 18, fontFamily: FONTS.Bold, color: Colors.primary },
  founderRole: { fontSize: 11, color: Colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },
  missionCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 20, marginBottom: 12 },
  goldRule: { width: 40, height: 2, backgroundColor: Colors.primary, marginBottom: 14 },
  missionTitle: { fontSize: 22, fontWeight: '600', color: Colors.text, marginBottom: 10 },
  missionBody: { fontSize: 14, color: Colors.onSurfaceVariant, lineHeight: 22 },
  statCard: {
    backgroundColor: 'rgba(255,140,0,0.08)', borderRadius: 16, padding: 22, alignItems: 'center',
    marginBottom: 28,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.primary, letterSpacing: 1, textTransform: 'uppercase', marginTop: 8 },
  statSub: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 4 },
  sectionTitle: { fontSize: 26, fontWeight: '800', color: Colors.primary, marginBottom: 8 },
  sectionSub: { fontSize: 12, color: Colors.onSurfaceVariant, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16, lineHeight: 18 },
  philCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 18, marginBottom: 12,
    borderLeftWidth: 2, borderLeftColor: Colors.primary,
  },
  philNum: { fontSize: 28, fontWeight: '900', color: Colors.primary, marginBottom: 8 },
  philKicker: { fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  philTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  philBody: { fontSize: 13, color: Colors.onSurfaceVariant, lineHeight: 20 },
  cta: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 24, padding: 22, alignItems: 'center', marginTop: 12 },
  ctaTitle: { fontSize: 24, fontWeight: '800', color: Colors.text, textAlign: 'center', marginBottom: 8 },
  ctaSub: { fontSize: 13, color: Colors.onSurfaceVariant, textAlign: 'center', marginBottom: 18, lineHeight: 20 },
  ctaPrimary: { backgroundColor: Colors.primary, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 8, marginBottom: 10, width: '100%', alignItems: 'center' },
  ctaPrimaryTxt: { fontSize: 12, fontWeight: '800', color: '#4d2600', letterSpacing: 2 },
  ctaGhost: { backgroundColor: Colors.surfaceContainerHigh, paddingVertical: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  ctaGhostTxt: { fontSize: 12, fontWeight: '800', color: Colors.text, letterSpacing: 2 },
});

export default AboutUsScreen;
