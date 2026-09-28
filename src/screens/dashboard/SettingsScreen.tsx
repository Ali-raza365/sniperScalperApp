/**
 * SettingsScreen — "SMC ELITE" Profile & Settings
 * Pixel-perfect from: desgin/stitch_sniper_scalper_mobile_app/app_settings/code.html
 */
import React, { FC, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Platform, StatusBar, Switch,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { accountRepository } from '../../data/repository';
import type { RootStackParamList } from '../../navigation/types';
import { showToast } from '../../utils/CustomToast';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// ── Reusable row types ─────────────────────────────────────
interface SettingsRowProps {
  icon: string;
  label: string;
  sublabel?: string;
  sublabelColor?: string;
  onPress?: () => void;
}

const SettingsRow: FC<SettingsRowProps> = ({ icon, label, sublabel, sublabelColor, onPress }) => (
  <TouchableOpacity style={s.row} onPress={onPress} activeOpacity={0.7}>
    <View style={s.rowLeft}>
      <MaterialIcons name={icon as any} size={20} color={Colors.onSurfaceVariant} />
      <View>
        <Text style={s.rowLabel}>{label}</Text>
        {sublabel && (
          <Text style={[s.rowSublabel, sublabelColor ? { color: sublabelColor } : {}]}>
            {sublabel}
          </Text>
        )}
      </View>
    </View>
    <MaterialIcons name="chevron-right" size={18} color={Colors.onSurfaceVariant} style={{ opacity: 0.45 }} />
  </TouchableOpacity>
);

interface ToggleRowProps {
  icon: string;
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
}

const ToggleRow: FC<ToggleRowProps> = ({ icon, label, value, onToggle }) => (
  <View style={s.row}>
    <View style={s.rowLeft}>
      <MaterialIcons name={icon as any} size={20} color={Colors.onSurfaceVariant} />
      <Text style={s.rowLabel}>{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: Colors.surfaceContainerHighest, true: Colors.primaryContainer }}
      thumbColor={value ? Colors.text : Colors.outline}
      ios_backgroundColor={Colors.surfaceContainerHighest}
    />
  </View>
);

// ── Section Header ─────────────────────────────────────────
const SectionHeader: FC<{ accentColor: string; label: string }> = ({ accentColor, label }) => (
  <View style={s.sectionHead}>
    <View style={[s.sectionAccent, { backgroundColor: accentColor }]} />
    <Text style={[s.sectionLabel, { color: accentColor }]}>{label}</Text>
  </View>
);

// ── Main Screen ────────────────────────────────────────────
const SettingsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const profile = accountRepository.getProfile();
  const [signalAlerts, setSignalAlerts] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <MaterialIcons name="arrow-back" size={22} color={Colors.primary} />
          <Text style={s.headerTitle}>SMC ELITE</Text>
        </View>
        <View style={s.avatar}>
          <MaterialIcons name="person" size={18} color={Colors.onSurfaceVariant} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Profile Overview */}
        <View style={s.profileCard}>
          <View style={s.profileAvatar}>
            <MaterialIcons name="person" size={32} color={Colors.onSurfaceVariant} />
            <View style={s.onlineDot} />
          </View>
          <View>
            <Text style={s.profileName}>{profile.name}</Text>
            <Text style={s.profileRole}>{profile.role}</Text>
          </View>
        </View>

        {/* ── Account ── */}
        <SectionHeader accentColor={Colors.primary} label="ACCOUNT" />
        <View style={s.group}>
          <SettingsRow icon="person" label="Personal Information" onPress={() => showToast.success('Profile records are locked to the archive desk.')} />
          <View style={s.divider} />
          <SettingsRow icon="verified-user" label="Subscription Status" sublabel={profile.plan} sublabelColor={Colors.secondary} onPress={() => showToast.success('Pro Elite remains active.')} />
          <View style={s.divider} />
          <SettingsRow icon="payments" label="Billing & Invoices" onPress={() => showToast.success('Billing statements are available from the desk.')} />
        </View>

        {/* ── Notifications ── */}
        <SectionHeader accentColor={Colors.secondary} label="NOTIFICATIONS" />
        <View style={s.group}>
          <ToggleRow icon="notifications-active" label="Signal Alerts" value={signalAlerts} onToggle={setSignalAlerts} />
          <View style={s.divider} />
          <ToggleRow icon="newspaper" label="Market News Updates" value={newsUpdates} onToggle={setNewsUpdates} />
          <View style={s.divider} />
          <ToggleRow icon="mail" label="Newsletter & Insights" value={newsletter} onToggle={setNewsletter} />
        </View>

        {/* ── Appearance ── */}
        <SectionHeader accentColor={Colors.outline} label="APPEARANCE" />
        <View style={[s.group, { padding: 16 }]}>
          <View style={s.themeGrid}>
            {/* Dark theme (active) */}
            <View style={[s.themeCard, s.themeCardActive]}>
              <View style={s.themePreviewDark}>
                <View style={s.themePreviewBar} />
                <View style={[s.themePreviewBar, { width: '50%' }]} />
              </View>
              <Text style={[s.themeLabel, { color: Colors.primary }]}>Archive Dark</Text>
            </View>
            {/* Light theme (inactive) */}
            <View style={[s.themeCard, { opacity: 0.5 }]}>
              <View style={s.themePreviewLight}>
                <View style={[s.themePreviewBar, { backgroundColor: '#CBD5E1' }]} />
                <View style={[s.themePreviewBar, { width: '50%', backgroundColor: '#CBD5E1' }]} />
              </View>
              <Text style={[s.themeLabel, { color: Colors.text }]}>Modern Light</Text>
            </View>
          </View>
        </View>

        {/* ── Security ── */}
        <SectionHeader accentColor={Colors.tertiary} label="SECURITY" />
        <View style={s.group}>
          <SettingsRow icon="lock" label="Change Password" onPress={() => showToast.success('Password changes require desk verification.')} />
          <View style={s.divider} />
          <SettingsRow icon="fingerprint" label="Biometric Authentication" onPress={() => showToast.success('Biometric unlock is available on supported devices.')} />
          <View style={s.divider} />
          <SettingsRow
            icon="security"
            label="Two-Factor Auth (2FA)"
            sublabel="Disabled"
            sublabelColor={Colors.tertiary}
            onPress={() => showToast.success('Enable 2FA from the security desk.')}
          />
        </View>

        {/* About & Contact quick links */}
        <SectionHeader accentColor={Colors.onSurfaceVariant} label="INFORMATION" />
        <View style={s.group}>
          <SettingsRow icon="info" label="About Us" onPress={() => navigation.navigate('AboutUs')} />
          <View style={s.divider} />
          <SettingsRow icon="contact-support" label="Contact & Support" onPress={() => navigation.navigate('ContactUs')} />
          <View style={s.divider} />
          <SettingsRow icon="quiz" label="FAQs & Knowledge Base" onPress={() => navigation.navigate('Faqs')} />
        </View>

        {/* Logout */}
        <TouchableOpacity style={s.logoutBtn} activeOpacity={0.85} onPress={() => showToast.success('Demo session remains open — auth is not connected yet.')}>
          <Text style={s.logoutTxt}>LOG OUT OF SESSION</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight ?? 24) + 10,
    paddingBottom: 14,
    backgroundColor: Colors.surfaceContainerLow,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Colors.primaryContainer, letterSpacing: 2 },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(86,67,52,0.2)',
    overflow: 'hidden',
  },
  scroll: { paddingHorizontal: 16, paddingTop: 20 },
  // Profile
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 16,
    padding: 18, marginBottom: 28,
  },
  profileAvatar: { position: 'relative', width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center' },
  onlineDot: { position: 'absolute', bottom: 1, right: 1, width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.primaryContainer, borderWidth: 2, borderColor: Colors.surfaceContainerLow },
  profileName: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  profileRole: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 2 },
  // Section header
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4, marginBottom: 10, marginTop: 4 },
  sectionAccent: { width: 3, height: 14, borderRadius: 2 },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  // Group
  group: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, marginBottom: 20, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  rowLabel: { fontSize: 13.5, color: Colors.text },
  rowSublabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 1 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(86,67,52,0.12)', marginLeft: 50 },
  // Appearance
  themeGrid: { flexDirection: 'row', gap: 14 },
  themeCard: { flex: 1, gap: 10, padding: 10, backgroundColor: Colors.surfaceContainer, borderRadius: 10, borderWidth: 1, borderColor: 'transparent' },
  themeCardActive: { borderColor: `${Colors.primary}40`, shadowColor: Colors.primary, shadowOpacity: 0.15, shadowRadius: 8, elevation: 2 },
  themePreviewDark: { height: 56, backgroundColor: Colors.background, borderRadius: 8, padding: 8, gap: 6 },
  themePreviewLight: { height: 56, backgroundColor: '#F1F5F9', borderRadius: 8, padding: 8, gap: 6 },
  themePreviewBar: { height: 6, backgroundColor: Colors.surfaceContainerHigh, borderRadius: 3, width: '100%' },
  themeLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  // Logout
  logoutBtn: {
    borderWidth: 1, borderColor: `${Colors.tertiary}30`,
    backgroundColor: 'rgba(255,177,196,0.06)',
    paddingVertical: 16, borderRadius: 16, alignItems: 'center',
    marginBottom: 12,
  },
  logoutTxt: { fontSize: 12, fontWeight: '700', color: Colors.tertiary, letterSpacing: 2, textTransform: 'uppercase' },
});

export default SettingsScreen;
