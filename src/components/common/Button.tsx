import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../styles';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  const buttonStyles: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    disabled && styles.disabled,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.text.inverse : colors.accent.primary}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
  } as ViewStyle,
  pressed: {
    opacity: 0.7,
  },
  primary: {
    backgroundColor: colors.accent.primary,
  },
  secondary: {
    backgroundColor: colors.background.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  smallSize: {
    height: 36,
    paddingHorizontal: spacing.md,
  },
  mediumSize: {
    height: 48,
    paddingHorizontal: spacing.lg,
  },
  largeSize: {
    height: 56,
    paddingHorizontal: spacing.xl,
  },
  disabled: {
    backgroundColor: colors.border.light,
    cursor: 'not-allowed',
  } as ViewStyle,
  text: {
    ...typography.button,
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.accent.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: colors.text.tertiary,
  },
});
