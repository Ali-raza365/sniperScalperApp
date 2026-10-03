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

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password) {
      showToast.error('Enter email and password.');
      return;
    }
    if (password.length < 6) {
      showToast.error('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      showToast.error('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      await signUp(email, password);
      showToast.success('Account created.');
    } catch (e: any) {
      showToast.error(e?.message ?? 'Registration failed.');
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
        <TouchableOpacity style={s.back} onPress={() => navigation.goBack()} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={s.title}>Create account</Text>
        <Text style={s.sub}>Email / password via Firebase Auth</Text>

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

        <Text style={s.label}>Confirm password</Text>
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
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
            <Text style={s.btnTxt}>REGISTER</Text>
          )}
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
  back: { marginBottom: 12, alignSelf: 'flex-start' },
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
});

export default RegisterScreen;
