/**
 * FaqsScreen — Knowledge base
 * From: desgin/stitch_sniper_scalper_mobile_app/faqs_support/code.html
 */
import React, { FC, useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import ScreenHeader from '../../components/global/ScreenHeader';
import ArchiveText from '../../components/archive/ArchiveText';
import { supportRepository } from '../../data/repository';
import type { FaqCategory } from '../../data/types';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const ACCENT: Record<FaqCategory['accent'], string> = {
  primary: Colors.primary,
  secondary: Colors.secondary,
  tertiary: Colors.tertiary,
  neutral: Colors.onSurfaceVariant,
};

const FaqsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('fvg');
  const categories = useMemo(() => supportRepository.getFaqs(query), [query]);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScreenHeader title="SMC TERMINAL" rightIcon="search" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <ArchiveText variant="display" style={s.hero}>KNOWLEDGE BASE</ArchiveText>
        <ArchiveText variant="body" color={Colors.onSurfaceVariant} style={s.lead}>
          Master the mechanics of Smart Money Concepts. Access institutional-grade documentation and operational guides.
        </ArchiveText>
        <View style={s.searchBox}>
          <MaterialIcons name="search" size={18} color={Colors.outline} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search FAQs..."
            placeholderTextColor="rgba(164,140,122,0.45)"
            style={s.searchInput}
          />
        </View>

        {categories.map(category => {
          const accent = ACCENT[category.accent];
          return (
            <View key={category.id} style={[s.card, { borderLeftColor: accent }]}>
              <View style={s.cardHead}>
                <Text style={[s.eyebrow, { color: accent }]}>{category.eyebrow}</Text>
                <MaterialIcons name={category.icon as any} size={16} color={accent} />
              </View>
              <Text style={s.cardTitle}>{category.title}</Text>
              {category.items.map(item => {
                const open = openId === item.id;
                return (
                  <View key={item.id} style={s.faqItem}>
                    <TouchableOpacity
                      style={s.faqQ}
                      activeOpacity={0.75}
                      onPress={() => setOpenId(open ? null : item.id)}>
                      <Text style={s.question}>{item.question}</Text>
                      <MaterialIcons
                        name="expand-more"
                        size={18}
                        color={Colors.onSurfaceVariant}
                        style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
                      />
                    </TouchableOpacity>
                    {open ? <Text style={s.answer}>{item.answer}</Text> : null}
                  </View>
                );
              })}
            </View>
          );
        })}

        {categories.length === 0 ? (
          <Text style={s.empty}>No archive entries match that query.</Text>
        ) : null}

        <View style={s.cta}>
          <View style={s.ctaBar} />
          <Text style={s.ctaTitle}>STILL HAVE QUESTIONS?</Text>
          <Text style={s.ctaSub}>Our institutional desk is available 24/5 to assist with your technical inquiries.</Text>
          <TouchableOpacity style={s.ctaBtn} activeOpacity={0.85} onPress={() => navigation.navigate('ContactUs')}>
            <Text style={s.ctaTxt}>CONTACT SUPPORT</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 22 },
  hero: { fontSize: 30, letterSpacing: -0.4, marginBottom: 10 },
  lead: { fontSize: 14, lineHeight: 22, marginBottom: 18 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,     backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14, paddingHorizontal: 14, marginBottom: 20,
  },
  searchInput: { flex: 1, color: Colors.text, paddingVertical: 14, fontSize: 14 },
  card: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16, marginBottom: 12, borderLeftWidth: 2 },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  cardTitle: { fontSize: 18, fontFamily: FONTS.Bold, color: Colors.text, marginBottom: 12 },
  faqItem: { paddingTop: 2 },
  faqQ: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, gap: 10 },
  question: { flex: 1, fontSize: 13, fontWeight: '600', color: Colors.text },
  answer: { fontSize: 13, color: Colors.onSurfaceVariant, lineHeight: 20, paddingBottom: 12 },
  empty: { color: Colors.onSurfaceVariant, textAlign: 'center', marginVertical: 20 },
  cta: {
    backgroundColor: Colors.surfaceContainerHigh, borderRadius: 18, padding: 22, alignItems: 'center', marginTop: 12,
    overflow: 'hidden',
  },
  ctaBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: Colors.primaryContainer },
  ctaTitle: { fontSize: 18, fontWeight: '800', color: Colors.primary, marginBottom: 8, marginTop: 8 },
  ctaSub: { fontSize: 13, color: Colors.onSurfaceVariant, textAlign: 'center', marginBottom: 16, lineHeight: 20 },
  ctaBtn: { backgroundColor: Colors.primaryContainer, paddingVertical: 12, paddingHorizontal: 22, borderRadius: 8 },
  ctaTxt: { fontSize: 12, fontWeight: '800', color: '#623200', letterSpacing: 1.4 },
});

export default FaqsScreen;
