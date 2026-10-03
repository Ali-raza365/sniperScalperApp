import React, { FC, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';

interface ListRowProps {
  icon: string;
  label: string;
  onPress?: () => void;
  divider?: boolean;
  trailing?: 'chevron' | 'none';
  children?: ReactNode;
}

const ListRow: FC<ListRowProps> = ({
  icon,
  label,
  onPress,
  divider = false,
  trailing = 'chevron',
  children,
}) => {
  const content = (
    <View style={[styles.row, divider && styles.divider]}>
      <MaterialIcons name={icon as any} size={24} color={Colors.primary} />
      <Text style={styles.label}>{label}</Text>
      {children}
      {trailing === 'chevron' && !children ? (
        <MaterialIcons name="chevron-right" size={22} color={Colors.textMuted} />
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    minHeight: 52,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
});

export default ListRow;
