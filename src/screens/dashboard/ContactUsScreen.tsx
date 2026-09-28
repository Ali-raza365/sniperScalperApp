/**
 * ContactUsScreen — Direct desk support
 * From: desgin/stitch_sniper_scalper_mobile_app/contact_us/code.html
 */
import React, { FC, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import ScreenHeader from '../../components/global/ScreenHeader';
import { supportRepository } from '../../data/repository';
import { openExternal } from '../../utils/linking';
import { showToast } from '../../utils/CustomToast';

const CHANNEL_COLORS: Record<string, string> = {
  whatsapp: Colors.primary,
  telegram: Colors.secondary,
  email: Colors.onSurfaceVariant,
};

const ContactUsScreen: FC = () => {
  const channels = supportRepository.getContactChannels();
  const stats = supportRepository.getContactStats();
  const categories = supportRepository.getContactCategories();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [message, setMessage] = useState('');

  const submit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast.error('Name, email, and message are required.');
      return;
    }
    showToast.success(`Inquiry queued for ${category}. The desk will reply shortly.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScreenHeader title="SMC ELITE" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.kickerRow}>
          <View style={s.accent} />
          <Text style={s.kicker}>Institutional Access</Text>
        </View>
        <Text style={s.hero}>DIRECT{'\n'}DESK SUPPORT</Text>
        <Text style={s.lead}>
          Connect with our risk management specialists and technical support desk for immediate assistance with your trading environment.
        </Text>

        {channels.map(channel => {
          const color = CHANNEL_COLORS[channel.id] ?? Colors.primary;
          return (
            <TouchableOpacity
              key={channel.id}
              style={s.channel}
              activeOpacity={0.8}
              onPress={() => openExternal(channel.url)}>
              <View style={s.channelLeft}>
                <View style={[s.channelIcon, { backgroundColor: `${color}18` }]}>
                  <MaterialIcons name={channel.icon as any} size={20} color={color} />
                </View>
                <View>
                  <Text style={s.channelLabel}>{channel.label}</Text>
                  <Text style={s.channelSub}>{channel.sublabel}</Text>
                </View>
              </View>
              <MaterialIcons name="arrow-forward" size={18} color={Colors.outline} />
            </TouchableOpacity>
          );
        })}

        <View style={s.statusBanner}>
          <Text style={s.statusTxt}>Status: Desk Online</Text>
        </View>

        <View style={s.formCard}>
          <Text style={s.formTitle}>Secure Communication</Text>
          <Text style={s.formSub}>Inquiries are handled with institutional priority.</Text>

          <Text style={s.label}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Institutional Name"
            placeholderTextColor="rgba(164,140,122,0.4)"
            style={s.input}
          />
          <Text style={s.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="official@domain.com"
            placeholderTextColor="rgba(164,140,122,0.4)"
            keyboardType="email-address"
            autoCapitalize="none"
            style={s.input}
          />
          <Text style={s.label}>Service category</Text>
          <View style={s.catWrap}>
            {categories.map(item => (
              <TouchableOpacity
                key={item}
                style={[s.catChip, item === category && s.catChipActive]}
                onPress={() => setCategory(item)}
                activeOpacity={0.8}>
                <Text style={[s.catTxt, item === category && s.catTxtActive]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={s.label}>Message</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Detailed technical description of your inquiry..."
            placeholderTextColor="rgba(164,140,122,0.4)"
            multiline
            style={[s.input, s.textarea]}
          />
          <TouchableOpacity style={s.submit} activeOpacity={0.85} onPress={submit}>
            <Text style={s.submitTxt}>TRANSMIT MESSAGE</Text>
          </TouchableOpacity>
        </View>

        <View style={s.statsGrid}>
          {stats.map(stat => (
            <View key={stat.label} style={s.statCard}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 22 },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  accent: { width: 3, height: 22, backgroundColor: Colors.primary, borderRadius: 2 },
  kicker: { fontSize: 12, fontWeight: '700', color: Colors.primary, letterSpacing: 2, textTransform: 'uppercase' },
  hero: { fontSize: 36, fontWeight: '800', color: Colors.primary, lineHeight: 40, marginBottom: 12 },
  lead: { fontSize: 14, color: Colors.onSurfaceVariant, lineHeight: 22, marginBottom: 20 },
  channel: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16, marginBottom: 10,
  },
  channelLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  channelIcon: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  channelLabel: { fontSize: 14, fontWeight: '800', color: Colors.text, letterSpacing: 0.6, textTransform: 'uppercase' },
  channelSub: { fontSize: 11, color: Colors.onSurfaceVariant, marginTop: 2 },
  statusBanner: { backgroundColor: Colors.surfaceContainerHigh, borderRadius: 12, padding: 16, marginVertical: 8 },
  statusTxt: { fontSize: 10, fontWeight: '800', color: Colors.primary, letterSpacing: 2.4, textTransform: 'uppercase' },
  formCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: 18, padding: 18, marginTop: 12, marginBottom: 16 },
  formTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, letterSpacing: 1, textTransform: 'uppercase' },
  formSub: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 4, marginBottom: 18 },
  label: { fontSize: 10, fontWeight: '700', color: Colors.primary, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, marginTop: 8 },
  input: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    color: Colors.text, fontSize: 14, marginBottom: 4,
  },
  textarea: { minHeight: 110, textAlignVertical: 'top' },
  catWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  catChip: { backgroundColor: Colors.surfaceContainerHigh, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  catChipActive: { backgroundColor: Colors.primaryContainer },
  catTxt: { fontSize: 11, color: Colors.onSurfaceVariant, fontWeight: '600' },
  catTxtActive: { color: '#623200' },
  submit: { backgroundColor: Colors.primaryContainer, paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  submitTxt: { fontSize: 12, fontWeight: '800', color: '#623200', letterSpacing: 2 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', flexGrow: 1, backgroundColor: Colors.surfaceContainerLow, borderRadius: 14, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.primary, marginBottom: 4 },
  statLabel: { fontSize: 10, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 1, textTransform: 'uppercase' },
});

export default ContactUsScreen;
