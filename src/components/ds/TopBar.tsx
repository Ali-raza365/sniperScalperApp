import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ImageSourcePropType,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';

interface TopBarProps {
  title: string;
  tracked?: boolean;
  avatar?: ImageSourcePropType;
  icons?: Array<{ name: string; onPress?: () => void }>;
  onBack?: () => void;
  showBack?: boolean;
  centerTitle?: boolean;
}

const TopBar: FC<TopBarProps> = ({
  title,
  tracked = true,
  avatar,
  icons = [],
  onBack,
  showBack = false,
  centerTitle = false,
}) => (
  <View style={styles.bar}>
    {(showBack || onBack) ? (
      <TouchableOpacity onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={styles.backBtn}>
        <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
    ) : null}
    <Text
      style={[
        styles.title,
        tracked ? styles.titleTracked : styles.titlePlain,
        centerTitle && styles.titleCenter,
        !(showBack || onBack) && { marginLeft: 0 },
      ]}
      numberOfLines={1}>
      {title}
    </Text>
    <View style={styles.trailing}>
      {icons.map(ic => (
        <TouchableOpacity key={ic.name} onPress={ic.onPress} style={styles.iconBtn} activeOpacity={0.75}>
          <MaterialIcons name={ic.name as any} size={22} color={Colors.text} />
        </TouchableOpacity>
      ))}
      {avatar ? <Image source={avatar} style={styles.avatar} /> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: Spacing.pageMargin,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight ?? 24) + 10,
    paddingBottom: 14,
    backgroundColor: Colors.background,
  },
  backBtn: { padding: 2 },
  title: {
    flex: 1,
    fontWeight: '700',
    color: Colors.primary,
  },
  titleTracked: {
    fontSize: 18,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: Colors.primary,
  },
  titlePlain: {
    fontSize: 18,
    letterSpacing: 0.3,
    color: Colors.text,
    textTransform: 'none',
  },
  titleCenter: {
    textAlign: 'center',
  },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { padding: 4 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default TopBar;
