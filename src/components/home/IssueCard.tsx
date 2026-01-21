import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles';
import { Issue } from '../../types';
import { getDimensionById } from '../../constants/valueDimensions';

interface IssueCardProps {
  issue: Issue;
  onPress: () => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onPress }) => {
  const dimension = getDimensionById(issue.dimensionId);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryIcon}>{dimension?.icon}</Text>
          <Text style={styles.categoryText}>{dimension?.nameEn}</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {issue.title}
      </Text>

      <Text style={styles.summary} numberOfLines={2}>
        {issue.summary}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.source}>{issue.source}</Text>
        <View style={styles.participantContainer}>
          <Text style={styles.participantIcon}>💬</Text>
          <Text style={styles.participantCount}>
            {issue.participantCount >= 1000
              ? `${(issue.participantCount / 1000).toFixed(1)}K`
              : issue.participantCount}
            명이 생각 중
          </Text>
        </View>
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
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  categoryText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  summary: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  participantCount: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
