import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import ArchiveText from './ArchiveText';

const ArchiveSection: FC<{ title: string; right?: React.ReactNode }> = ({ title, right }) => (
  <View style={styles.row}>
    <View style={styles.left}>
      <View style={styles.rail} />
      <ArchiveText variant="title">{title}</ArchiveText>
    </View>
    {right}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  rail: { width: 2, height: 22, backgroundColor: Colors.primary, borderRadius: 1 },
});

export default ArchiveSection;
