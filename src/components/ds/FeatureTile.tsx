import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { Radii } from '../../constants/Spacing';

interface FeatureTileProps {
  icon: string;
  title: string;
  body: string;
}

const FeatureTile: FC<FeatureTileProps> = ({ icon, title, body }) => (
  <View style={styles.tile}>
    <MaterialIcons name={icon as any} size={24} color={Colors.primary} />
    <View style={styles.copy}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tile: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: Radii.cardSm,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 12,
  },
  copy: { gap: 6 },
  title: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.text,
  },
  body: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.onSurfaceVariant,
  },
});

export default FeatureTile;
