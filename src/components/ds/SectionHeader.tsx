import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

type Accent = 'peach' | 'blue' | 'muted';

interface SectionHeaderProps {
  label: string;
  color?: Accent;
  size?: 'sm' | 'lg';
}

const barColors: Record<Accent, string> = {
  peach: Colors.primary,
  blue: Colors.secondary,
  muted: Colors.onSurfaceVariant,
};

const textColors: Record<Accent, string> = {
  peach: Colors.text,
  blue: Colors.secondary,
  muted: Colors.onSurfaceVariant,
};

const SectionHeader: FC<SectionHeaderProps> = ({ label, color = 'peach', size = 'sm' }) => {
  const big = size === 'lg';
  return (
    <View style={styles.row}>
      <View style={[styles.bar, { height: big ? 24 : 18, backgroundColor: barColors[color] }]} />
      <Text
        style={[
          styles.label,
          {
            fontSize: big ? 20 : 13,
            letterSpacing: big ? 1.2 : 2.8,
            color: textColors[color],
          },
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bar: { width: 4, borderRadius: 2 },
  label: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default SectionHeader;
