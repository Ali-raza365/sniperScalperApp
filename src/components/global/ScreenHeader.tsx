import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import { goBack } from '../../utils/NavigationUtil';
import ArchiveText from '../archive/ArchiveText';

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
      <ArchiveText variant="title" color={Colors.primaryContainer} style={styles.title}>
        {title}
      </ArchiveText>
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
    backgroundColor: 'rgba(57,57,57,0.6)',
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  title: {
    fontFamily: FONTS.Brand,
    fontSize: 15,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScreenHeader;
