import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { goBack } from '../../utils/NavigationUtil';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
}

const ScreenHeader: FC<ScreenHeaderProps> = ({
  title,
  showBack = true,
  rightIcon,
  onRightPress,
}) => (
  <View style={styles.header}>
    <View style={styles.left}>
      {showBack ? (
        <TouchableOpacity onPress={goBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialIcons name="arrow-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
      ) : (
        <MaterialIcons name="menu" size={22} color={Colors.primary} />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
    {rightIcon ? (
      <TouchableOpacity onPress={onRightPress} style={styles.avatar} activeOpacity={0.75}>
        <MaterialIcons name={rightIcon as any} size={18} color={Colors.onSurfaceVariant} />
      </TouchableOpacity>
    ) : (
      <View style={styles.avatar}>
        <MaterialIcons name="person" size={18} color={Colors.onSurfaceVariant} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight ?? 24) + 10,
    paddingBottom: 14,
    backgroundColor: Colors.surfaceContainerLow,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.primaryContainer,
    letterSpacing: 2,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(86,67,52,0.2)',
  },
});

export default ScreenHeader;
