/**
 * SettingsScreen — profile & preferences
 * Matches pro-assets/screens/settings.png + Design System UI kit
 */
import React, { FC, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Switch,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { Radii, Spacing } from '../../constants/Spacing';
import { TopBar, SectionHeader, ListRow } from '../../components/ds';
import { ProImages } from '../../assets/images/pro';
import { accountRepository } from '../../data/repository';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const profile = accountRepository.getProfile();
  const [signalAlerts, setSignalAlerts] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <TopBar title="Sniper Scalper" avatar={ProImages.avatar} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.profileCard}>
          <View style={s.avatarWrap}>
            <Image source={ProImages.avatar} style={s.avatar} />
            <View style={s.onlineDot} />
          </View>
          <View>
            <Text style={s.name}>{profile.name}</Text>
            <Text style={s.role}>{profile.role}</Text>
          </View>
        </View>

        <View style={s.sectionGap}>
          <SectionHeader label="Notification Preferences" color="blue" />
        </View>
        <View style={s.group}>
          <ListRow icon="notifications" label="Signal Alerts" trailing="none">
            <Switch
              value={signalAlerts}
              onValueChange={setSignalAlerts}
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

        <View style={{ height: 100 }} />
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
  name: { fontSize: 24, fontWeight: '700', color: Colors.primary },
  role: { fontSize: 15, color: Colors.onSurfaceVariant, marginTop: 4 },
  sectionGap: { marginTop: 28, marginBottom: 12 },
  group: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.cardSm,
    overflow: 'hidden',
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
