import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles';
import { ValueDimension, UserValueScore } from '../../types';
import { getDimensionLabel } from '../../constants/valueDimensions';

interface ValueDimensionCardProps {
  dimension: ValueDimension;
  score?: UserValueScore;
  index: number;
  onPress?: () => void;
}

export const ValueDimensionCard: React.FC<ValueDimensionCardProps> = ({
  dimension,
  score,
  index,
  onPress,
}) => {
  const value = score?.value ?? 50;
  const participatedIssues = score?.participatedIssues ?? 0;
  const label = getDimensionLabel(dimension.id, value);

  const getIndexEmoji = (idx: number): string => {
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    return emojis[idx] || `${idx + 1}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Text style={styles.index}>{getIndexEmoji(index)}</Text>
        <Text style={styles.name}>
          {dimension.name} ({dimension.nameEn})
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>{dimension.leftValue.label}</Text>
          <Text style={styles.sliderLabel}>{dimension.rightValue.label}</Text>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${value}%` }]} />
          <View style={[styles.marker, { left: `${value}%` }]} />
        </View>

        <View style={styles.percentageRow}>
          <Text style={[styles.percentage, value < 50 && styles.activePercentage]}>
            {100 - value}%
          </Text>
          <Text style={[styles.percentage, value >= 50 && styles.activePercentage]}>
            {value}%
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.labelText}>"{label}"</Text>
        <Text style={styles.issueCount}>참여 이슈: {participatedIssues}건</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  index: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  sliderContainer: {
    marginBottom: spacing.md,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sliderLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  track: {
    height: 8,
    backgroundColor: colors.border.light,
    borderRadius: borderRadius.full,
    position: 'relative',
    overflow: 'visible',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent.primary,
    borderRadius: borderRadius.full,
  },
  marker: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent.primary,
    borderWidth: 2,
    borderColor: colors.background.card,
    top: -4,
    marginLeft: -8,
  },
  percentageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  percentage: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  activePercentage: {
    color: colors.accent.primary,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontStyle: 'italic',
    flex: 1,
  },
  issueCount: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
});
