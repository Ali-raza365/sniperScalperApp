import React, { FC, useState } from 'react';
import {
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
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || password.length < 6) {
      showToast.error('Use a valid email and password (6+ characters).');
      return;
    }
    setBusy(true);
    try {
      await signUp(email, password);
      showToast.success('Account created.');
      navigation.goBack();
    } catch (e: any) {
      showToast.error(e?.message ?? 'Registration failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <TouchableOpacity style={s.back} onPress={() => navigation.goBack()} hitSlop={12}>
        <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <Text style={s.title}>Create account</Text>
      <Text style={s.sub}>Optional — you can browse signals without signing up.</Text>

      <TextInput
        style={s.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={Colors.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <TextInput
        style={s.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password (6+ characters)"
        placeholderTextColor={Colors.textMuted}
        secureTextEntry
      />

      <TouchableOpacity style={s.btn} onPress={onSubmit} disabled={busy} activeOpacity={0.85}>
        {busy ? (
          <ActivityIndicator color={Colors.background} />
        ) : (
          <Text style={s.btnTxt}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={s.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  back: { position: 'absolute', top: 52, left: 20, zIndex: 1 },
  title: { fontSize: 28, fontWeight: '700', color: Colors.primary, marginBottom: 8 },
  sub: { fontSize: 14, color: Colors.onSurfaceVariant, marginBottom: 28, lineHeight: 20 },
  input: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnTxt: { fontSize: 16, fontWeight: '700', color: Colors.background },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.secondary,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default RegisterScreen;
