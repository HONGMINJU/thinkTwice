import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
  Platform,
  Pressable,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../styles';
import { SliderProps } from '../../types';

interface ValueSliderProps extends SliderProps {
  showLabels?: boolean;
  readonly?: boolean;
}

export const ValueSlider: React.FC<ValueSliderProps> = ({
  value,
  onValueChange,
  leftLabel,
  rightLabel,
  leftDescription,
  rightDescription,
  showLabels = true,
  readonly = false,
}) => {
  const [trackWidth, setTrackWidth] = useState(300);
  const trackRef = useRef<View>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const calculateValue = (locationX: number) => {
    const newValue = Math.max(0, Math.min(100, (locationX / trackWidth) * 100));
    onValueChange(Math.round(newValue));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !readonly,
    onMoveShouldSetPanResponder: () => !readonly,
    onPanResponderGrant: (evt) => {
      calculateValue(evt.nativeEvent.locationX);
    },
    onPanResponderMove: (evt) => {
      calculateValue(evt.nativeEvent.locationX);
    },
  });

  const handleWebClick = (event: any) => {
    if (readonly || Platform.OS !== 'web') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const locationX = event.clientX - rect.left;
    calculateValue(locationX);
  };

  return (
    <View style={styles.container}>
      {showLabels && (
        <View style={styles.labelsContainer}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>{leftLabel}</Text>
            {leftDescription && (
              <Text style={styles.description}>{leftDescription}</Text>
            )}
          </View>
          <View style={[styles.labelBox, styles.rightLabelBox]}>
            <Text style={styles.label}>{rightLabel}</Text>
            {rightDescription && (
              <Text style={styles.description}>{rightDescription}</Text>
            )}
          </View>
        </View>
      )}

      <Pressable
        style={styles.trackContainer}
        onLayout={handleLayout}
        {...(Platform.OS === 'web' ? { onClick: handleWebClick } : {})}
        {...panResponder.panHandlers}
      >
        <View ref={trackRef} style={styles.track}>
          <View style={[styles.fill, { width: `${value}%` }]} />
        </View>
        <View style={[styles.thumb, { left: `${value}%` }]} />
      </Pressable>

      <View style={styles.percentageContainer}>
        <Text style={[styles.percentage, value < 50 && styles.activePercentage]}>
          {100 - value}%
        </Text>
        <Text style={[styles.percentage, value >= 50 && styles.activePercentage]}>
          {value}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  labelBox: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  rightLabelBox: {
    paddingRight: 0,
    paddingLeft: spacing.sm,
    alignItems: 'flex-end',
  },
  label: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  trackContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
  } as any,
  track: {
    height: 8,
    backgroundColor: colors.border.light,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent.primary,
    borderRadius: borderRadius.full,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background.card,
    borderWidth: 3,
    borderColor: colors.accent.primary,
    marginLeft: -12,
    top: 8,
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  percentage: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
  },
  activePercentage: {
    color: colors.accent.primary,
    fontWeight: '600',
  },
});
