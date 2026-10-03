import React, { FC, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../auth/AuthContext';
import { showToast } from '../../utils/CustomToast';
import type { AuthStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password) {
      showToast.error('Enter email and password.');
      return;
    }
    setBusy(true);
    try {
      await signIn(email, password);
    } catch (e: any) {
      showToast.error(e?.message ?? 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={s.card}>
        <View style={s.mark}>
          <MaterialIcons name="shield" size={40} color={Colors.primary} />
        </View>
        <Text style={s.title}>Sign in</Text>
        <Text style={s.sub}>Access your institutional archive</Text>

        <Text style={s.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={Colors.textMuted}
          style={s.input}
        />

        <Text style={s.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor={Colors.textMuted}
          style={s.input}
        />

        <TouchableOpacity
          style={[s.btn, busy && s.btnDisabled]}
          onPress={onSubmit}
          disabled={busy}
          activeOpacity={0.85}>
          {busy ? (
            <ActivityIndicator color={Colors.textOnAccent} />
          ) : (
            <Text style={s.btnTxt}>SIGN IN</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={s.linkWrap}
          activeOpacity={0.8}>
          <Text style={s.link}>
            No account? <Text style={s.linkAccent}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
  },
  mark: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(246,177,122,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 26, fontWeight: '800', color: Colors.primary },
  sub: { fontSize: 14, color: Colors.onSurfaceVariant, marginTop: 6, marginBottom: 22 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(86,67,52,0.25)',
    color: Colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 15,
  },
  btn: {
    backgroundColor: Colors.primaryContainer,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  btnDisabled: { opacity: 0.7 },
  btnTxt: { fontSize: 13, fontWeight: '900', color: Colors.textOnAccent, letterSpacing: 1.5 },
  linkWrap: { marginTop: 18, alignItems: 'center' },
  link: { fontSize: 14, color: Colors.onSurfaceVariant },
  linkAccent: { color: Colors.primary, fontWeight: '700' },
});

export default LoginScreen;
