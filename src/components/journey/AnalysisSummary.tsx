import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles';
import { UserValueScore } from '../../types';
import { VALUE_DIMENSIONS } from '../../constants/valueDimensions';

interface AnalysisSummaryProps {
  scores: UserValueScore[];
}

export const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ scores }) => {
  const getTopValues = () => {
    const leftLeaning: string[] = [];
    const rightLeaning: string[] = [];
    const balanced: string[] = [];

    scores.forEach((score) => {
      const dimension = VALUE_DIMENSIONS.find((d) => d.id === score.dimensionId);
      if (!dimension) return;

      if (score.value < 40) {
        leftLeaning.push(dimension.leftValue.label);
      } else if (score.value > 60) {
        rightLeaning.push(dimension.rightValue.label);
      } else {
        balanced.push(dimension.name);
      }
    });

    return { leftLeaning, rightLeaning, balanced };
  };

  const generateSummary = (): string => {
    const { leftLeaning, rightLeaning, balanced } = getTopValues();

    const topKeywords = [...leftLeaning.slice(0, 2), ...rightLeaning.slice(0, 2)];

    if (topKeywords.length === 0) {
      return '아직 충분한 데이터가 없습니다. 더 많은 이슈에 참여해 보세요.';
    }

    const keywordStr = topKeywords.join(', ');

    let tendency = '';
    if (leftLeaning.length > rightLeaning.length + 2) {
      tendency = '전통적이고 안정적인 가치를 중시하는';
    } else if (rightLeaning.length > leftLeaning.length + 2) {
      tendency = '변화와 새로운 가치를 중시하는';
    } else if (balanced.length > 5) {
      tendency = '균형 잡힌 시각을 가진';
    } else {
      tendency = '다양한 가치를 고려하는';
    }

    return `당신은 ${keywordStr} 등의 가치를 중시하며, ${tendency} 실용적 성향입니다.`;
  };

  const getKeywords = (): string[] => {
    const keywords: string[] = [];

    scores.forEach((score) => {
      const dimension = VALUE_DIMENSIONS.find((d) => d.id === score.dimensionId);
      if (!dimension) return;

      if (score.value < 40) {
        keywords.push(dimension.leftValue.label);
      } else if (score.value > 60) {
        keywords.push(dimension.rightValue.label);
      }
    });

    return keywords.slice(0, 5);
  };

  const keywords = getKeywords();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🏷️</Text>
        <Text style={styles.title}>종합 분석</Text>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>{generateSummary()}</Text>
      </View>

      {keywords.length > 0 && (
        <View style={styles.keywordsContainer}>
          <Text style={styles.keywordsLabel}>나의 가치 키워드</Text>
          <View style={styles.keywordsList}>
            {keywords.map((keyword, index) => (
              <View key={index} style={styles.keywordBadge}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  summaryBox: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryText: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 24,
  },
  keywordsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.md,
  },
  keywordsLabel: {
    ...typography.label,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordBadge: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  keywordText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '500',
  },
});
