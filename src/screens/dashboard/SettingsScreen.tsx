/**
 * SettingsScreen — profile, MT5 account, Signal Alerts, sign out
 */
import React, { FC, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Switch,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { Radii, Spacing } from '../../constants/Spacing';
import { TopBar, SectionHeader, ListRow } from '../../components/ds';
import { ProImages } from '../../assets/images/pro';
import { accountRepository } from '../../data/repository';
import { useAuth } from '../../auth/AuthContext';
import {
  getMt5Account,
  getSignalAlertsEnabled,
  setMt5Account,
  setSignalAlertsEnabled,
} from '../../services/prefs';
import { showToast } from '../../utils/CustomToast';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const { user, signOut, syncPushRegistration } = useAuth();
  const profile = accountRepository.getProfile();
  const [mt5Account, setMt5AccountLocal] = useState('');
  const [signalAlerts, setSignalAlertsLocal] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const [account, alerts] = await Promise.all([
          getMt5Account(),
          getSignalAlertsEnabled(),
        ]);
        if (!active) return;
        setMt5AccountLocal(account);
        setSignalAlertsLocal(alerts);
      })();
      return () => {
        active = false;
      };
    }, []),
  );

  const persistMt5AndSync = async (account: string, alerts: boolean) => {
    setSaving(true);
    try {
      await setMt5Account(account);
      await setSignalAlertsEnabled(alerts);
      await syncPushRegistration();
    } finally {
      setSaving(false);
    }
  };

  const onMt5Blur = async () => {
    const trimmed = mt5Account.trim();
    setMt5AccountLocal(trimmed);
    await persistMt5AndSync(trimmed, signalAlerts);
    if (trimmed && signalAlerts) {
      showToast.success('MT5 account saved. Alerts will use this login.');
    }
  };

  const onSignalAlertsChange = async (value: boolean) => {
    setSignalAlertsLocal(value);
    await persistMt5AndSync(mt5Account.trim(), value);
    if (value && !mt5Account.trim()) {
      showToast.error('Enter your MT5 account login to receive alerts.');
    }
  };

  const onSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } catch (e: any) {
      showToast.error(e?.message ?? 'Sign out failed.');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <TopBar
        title="Sniper Scalper"
        showBack
        onBack={() => navigation.navigate('BottomTab', { screen: 'Home' })}
        avatar={ProImages.avatar}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.profileCard}>
          <View style={s.avatarWrap}>
            <Image source={ProImages.avatar} style={s.avatar} />
            <View style={s.onlineDot} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{user?.email ?? profile.name}</Text>
            <Text style={s.role}>{profile.role}</Text>
          </View>
        </View>

        <View style={s.sectionGap}>
          <SectionHeader label="MT5 Live Signals" color="blue" />
        </View>
        <View style={s.group}>
          <View style={s.inputRow}>
            <MaterialIcons name="account-balance" size={24} color={Colors.primary} />
            <View style={s.inputCol}>
              <Text style={s.inputLabel}>MT5 Account Login</Text>
              <TextInput
                style={s.input}
                value={mt5Account}
                onChangeText={setMt5AccountLocal}
                onBlur={onMt5Blur}
                placeholder="e.g. 12345678"
                placeholderTextColor={Colors.textMuted}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {saving ? <ActivityIndicator color={Colors.primary} /> : null}
          </View>
          <ListRow icon="notifications" label="Signal Alerts" trailing="none" divider>
            <Switch
              value={signalAlerts}
              onValueChange={onSignalAlertsChange}
              trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.primaryContainer }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.surfaceContainerHigh}
            />
          </ListRow>
        </View>
        <Text style={s.hint}>
          Only trades from this MT5 login appear in LIVE SIGNALS. Turn Signal Alerts on to get
          push notifications when the app is closed.
        </Text>

        <View style={s.sectionGap}>
          <SectionHeader label="Notification Preferences" color="blue" />
        </View>
        <View style={s.group}>
          <ListRow icon="article" label="Market News Updates" trailing="none">
            <Switch
              value={newsUpdates}
              onValueChange={setNewsUpdates}
              trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.primaryContainer }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.surfaceContainerHigh}
            />
          </ListRow>
          <ListRow icon="mail" label="Newsletter & Insights" trailing="none" divider>
            <Switch
              value={newsletter}
              onValueChange={setNewsletter}
              trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.primaryContainer }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.surfaceContainerHigh}
            />
          </ListRow>
        </View>

        <View style={s.sectionGap}>
          <SectionHeader label="Information" color="muted" />
        </View>
        <View style={s.group}>
          <ListRow icon="info" label="About Us" onPress={() => navigation.navigate('AboutUs')} />
          <ListRow
            icon="help"
            label="Contact & Support"
            divider
            onPress={() => navigation.navigate('ContactUs')}
          />
          <ListRow
            icon="help-outline"
            label="FAQs & Knowledge Base"
            divider
            onPress={() => navigation.navigate('Faqs')}
          />
        </View>

        <TouchableOpacity
          style={s.signOutBtn}
          onPress={onSignOut}
          disabled={signingOut}
          activeOpacity={0.8}
        >
          {signingOut ? (
            <ActivityIndicator color={Colors.tertiary} />
          ) : (
            <>
              <MaterialIcons name="logout" size={20} color={Colors.tertiary} />
              <Text style={s.signOutTxt}>Sign out</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={s.office}>
          <MaterialIcons name="location-on" size={16} color={Colors.textMuted} />
          <Text style={s.officeTxt}>Office: {profile.office ?? 'Ahmadpur East'}</Text>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.pageMargin, paddingTop: 8 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  avatarWrap: { position: 'relative' },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  onlineDot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primaryContainer,
    borderWidth: 2,
    borderColor: Colors.surfaceContainerLow,
  },
  name: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  role: { fontSize: 15, color: Colors.onSurfaceVariant, marginTop: 4 },
  sectionGap: { marginTop: 28, marginBottom: 12 },
  group: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  inputCol: { flex: 1 },
  inputLabel: { fontSize: 13, color: Colors.onSurfaceVariant, marginBottom: 4 },
  input: {
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  hint: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textMuted,
    paddingHorizontal: 4,
  },
  signOutBtn: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
  },
  signOutTxt: { fontSize: 16, fontWeight: '600', color: Colors.tertiary },
  office: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 32,
  },
  officeTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textMuted,
  },
});

export default SettingsScreen;
