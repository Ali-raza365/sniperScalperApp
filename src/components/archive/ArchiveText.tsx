import React, { FC } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { FONTS } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';

export type ArchiveVariant = 'display' | 'title' | 'body' | 'label';

interface ArchiveTextProps extends TextProps {
  variant?: ArchiveVariant;
  color?: string;
  children: React.ReactNode;
}

const VARIANT_STYLE = StyleSheet.create({
  display: {
    fontFamily: FONTS.Bold,
    fontSize: 28,
    letterSpacing: -0.4,
    color: Colors.primary,
  },
  title: {
    fontFamily: FONTS.SemiBold,
    fontSize: 17,
    letterSpacing: 0.2,
    color: Colors.primary,
  },
  body: {
    fontFamily: FONTS.BodyRegular,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.text,
  },
  label: {
    fontFamily: FONTS.BodyMedium,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
  },
});

const ArchiveText: FC<ArchiveTextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...rest
}) => (
  <Text style={[VARIANT_STYLE[variant], color ? { color } : null, style]} {...rest}>
    {children}
  </Text>
);

export default ArchiveText;
