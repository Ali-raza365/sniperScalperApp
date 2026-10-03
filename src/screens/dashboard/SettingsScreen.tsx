/**
 * SettingsScreen — optional account, Signal Alerts, info
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
  ActivityIndicator,
  TouchableOpacity,
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
import { useAlerts } from '../../providers/AlertsProvider';
import {
  getSignalAlertsEnabled,
  setSignalAlertsEnabled,
} from '../../services/prefs';
import { showToast } from '../../utils/CustomToast';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const { user, signOut } = useAuth();
  const { syncPushRegistration } = useAlerts();
  const profile = accountRepository.getProfile();
  const [signalAlerts, setSignalAlertsLocal] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const alerts = await getSignalAlertsEnabled();
        if (!active) return;
        setSignalAlertsLocal(alerts);
      })();
      return () => {
        active = false;
      };
    }, []),
  );

  const onSignalAlertsChange = async (value: boolean) => {
    setSignalAlertsLocal(value);
    setSaving(true);
    try {
      await setSignalAlertsEnabled(value);
      await syncPushRegistration();
      showToast.success(
        value
          ? 'You will get push alerts for admin signals.'
          : 'Signal alerts turned off.',
      );
    } finally {
      setSaving(false);
    }
  };

  const onSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      showToast.success('Signed out.');
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
            <Text style={s.role}>
              {user ? 'Signed in' : `${profile.role} · Guest`}
            </Text>
          </View>
          {saving ? <ActivityIndicator color={Colors.primary} /> : null}
        </View>

        <View style={s.sectionGap}>
          <SectionHeader label="Account" color="blue" />
        </View>
        <View style={s.group}>
          {user ? (
            <TouchableOpacity
              style={s.accountRow}
              onPress={onSignOut}
              disabled={signingOut}
              activeOpacity={0.75}
            >
              <MaterialIcons name="logout" size={24} color={Colors.tertiary} />
              <Text style={[s.accountLabel, { color: Colors.tertiary }]}>
                {signingOut ? 'Signing out…' : 'Sign out'}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <ListRow
                icon="login"
                label="Sign in"
                onPress={() => navigation.navigate('Login')}
              />
              <ListRow
                icon="person-add"
                label="Create account"
                divider
                onPress={() => navigation.navigate('Register')}
              />
            </>
          )}
        </View>
        <Text style={s.hint}>
          Login is optional. Live signals and alerts work for guests too.
        </Text>

        <View style={s.sectionGap}>
          <SectionHeader label="Notification Preferences" color="blue" />
        </View>
        <View style={s.group}>
          <ListRow icon="notifications" label="Signal Alerts" trailing="none">
            <Switch
              value={signalAlerts}
              onValueChange={onSignalAlertsChange}
              trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.primaryContainer }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.surfaceContainerHigh}
            />
          </ListRow>
          <ListRow icon="article" label="Market News Updates" trailing="none" divider>
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
        <Text style={s.hint}>
          Live signals come from the admin MetaTrader 5 account and are shared with every user.
        </Text>

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
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  accountLabel: { flex: 1, fontSize: 16, fontWeight: '600' },
  hint: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textMuted,
    paddingHorizontal: 4,
  },
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
