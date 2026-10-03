/**
 * SplashScreen — Precision Trading Terminal boot
 * Matches pro-assets/screens/splash.png + Design System UI kit
 */
import React, { FC, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
import { Radii } from '../constants/Spacing';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    const t = setTimeout(() => {
      navigation.replace('BottomTab');
    }, 2200);
    return () => clearTimeout(t);
  }, [navigation, progress]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['8%', '100%'],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.surfaceContainerLowest} />
      <View style={styles.center}>
        <View style={styles.mark}>
          <MaterialIcons name="shield" size={56} color={Colors.primary} />
        </View>
        <Text style={styles.brand}>
          <Text style={styles.brandPeach}>SNIPER</Text>
          <Text style={styles.brandWhite}> SCALPER</Text>
        </Text>
        <Text style={styles.tagline}>PRECISION TRADING TERMINAL</Text>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { width: barWidth }]} />
        </View>
        <Text style={styles.status}>CONNECTING TO SERVER</Text>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.footLabel}>SERVER STATUS</Text>
          <Text style={styles.footValue}>OPTIMAL</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.footLabel}>PROTOCOL</Text>
          <Text style={styles.footValue}>V.4.22.8</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  mark: {
    width: 130,
    height: 130,
    borderRadius: Radii.iconTile,
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  brand: {
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 2,
    marginBottom: 10,
  },
  brandPeach: { color: Colors.primary },
  brandWhite: { color: Colors.text },
  tagline: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 4,
    marginBottom: 56,
  },
  track: {
    width: '80%',
    height: 2,
    backgroundColor: 'rgba(246,177,122,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  status: {
    marginTop: 18,
    color: Colors.primaryContainer,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 28,
    right: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
  },
  footValue: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 4,
  },
});

export default SplashScreen;
