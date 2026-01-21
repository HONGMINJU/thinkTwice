import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { RadarChart } from '../components/journey/RadarChart';
import { ValueDimensionCard } from '../components/journey/ValueDimensionCard';
import { AnalysisSummary } from '../components/journey/AnalysisSummary';
import { Card } from '../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { VALUE_DIMENSIONS } from '../constants/valueDimensions';
import { UserValueScore } from '../types';

const MOCK_SCORES: UserValueScore[] = [
  { dimensionId: 'tech_ethics', value: 70, participatedIssues: 3 },
  { dimensionId: 'generations', value: 35, participatedIssues: 2 },
  { dimensionId: 'work_life', value: 55, participatedIssues: 4 },
  { dimensionId: 'gender', value: 45, participatedIssues: 1 },
  { dimensionId: 'global', value: 65, participatedIssues: 2 },
  { dimensionId: 'local', value: 60, participatedIssues: 1 },
  { dimensionId: 'education', value: 75, participatedIssues: 3 },
  { dimensionId: 'safety_rights', value: 30, participatedIssues: 2 },
  { dimensionId: 'tax_welfare', value: 40, participatedIssues: 2 },
  { dimensionId: 'culture', value: 65, participatedIssues: 2 },
];

const RECENT_ISSUES = [
  { title: 'AI 저작권 논쟁', result: '인격권 보호 70%' },
  { title: '정년 연장 법안', result: '연공서열 35%' },
  { title: '주 52시간 유연화', result: '균형 55%' },
];

// 아직 탐색하지 않은 관점 (블라인드 스팟)
const UNEXPLORED_PERSPECTIVES = [
  {
    issueId: '1',
    issueTitle: 'AI 저작권 논쟁',
    dimensionId: 'tech_ethics',
    myChoice: '혁신',
    unexploredView: '권리 보호',
    unexploredPercent: 48,
  },
  {
    issueId: '2',
    issueTitle: '정년 연장 법안',
    dimensionId: 'generations',
    myChoice: '연공서열',
    unexploredView: '능력주의',
    unexploredPercent: 65,
  },
  {
    issueId: '4',
    issueTitle: '차별금지법 논의',
    dimensionId: 'culture',
    myChoice: '다양성',
    unexploredView: '전통',
    unexploredPercent: 41,
  },
];

export const MyJourneyScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>나의 생각 궤적</Text>
        <TouchableOpacity>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainCopy}>
          "나의 궤적을 생각해보면,{'\n'}나의 윤곽이 보입니다"
        </Text>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📊</Text>
          <Text style={styles.sectionTitle}>나의 가치 지도</Text>
        </View>

        <Card style={styles.chartCard}>
          <RadarChart scores={MOCK_SCORES} size={280} />
        </Card>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📋</Text>
          <Text style={styles.sectionTitle}>영역별 나의 성향</Text>
        </View>

        {VALUE_DIMENSIONS.map((dimension, index) => {
          const score = MOCK_SCORES.find((s) => s.dimensionId === dimension.id);
          return (
            <ValueDimensionCard
              key={dimension.id}
              dimension={dimension}
              score={score}
              index={index}
            />
          );
        })}

        <View style={styles.divider} />

        <AnalysisSummary scores={MOCK_SCORES} />

        <View style={styles.divider} />

        {/* 블라인드 스팟: 탐색하지 않은 관점 */}
        {UNEXPLORED_PERSPECTIVES.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🎯</Text>
              <Text style={styles.sectionTitle}>탐색하지 않은 관점</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{UNEXPLORED_PERSPECTIVES.length}</Text>
              </View>
            </View>

            <Text style={styles.sectionDescription}>
              다른 관점도 살펴보면 시야가 넓어져요
            </Text>

            {UNEXPLORED_PERSPECTIVES.map((item) => {
              const dimension = VALUE_DIMENSIONS.find((d) => d.id === item.dimensionId);
              return (
                <TouchableOpacity key={item.issueId} style={styles.unexploredCard}>
                  <View style={styles.unexploredHeader}>
                    <Text style={styles.unexploredIcon}>{dimension?.icon}</Text>
                    <Text style={styles.unexploredIssue}>{item.issueTitle}</Text>
                  </View>
                  <View style={styles.unexploredContent}>
                    <View style={styles.unexploredChoice}>
                      <Text style={styles.unexploredLabel}>나의 선택</Text>
                      <Text style={styles.unexploredValue}>{item.myChoice}</Text>
                    </View>
                    <Text style={styles.unexploredArrow}>→</Text>
                    <View style={styles.unexploredChoice}>
                      <Text style={styles.unexploredLabel}>미탐색 관점</Text>
                      <View style={styles.unexploredHighlight}>
                        <Text style={styles.unexploredHighlightText}>{item.unexploredView}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.unexploredHint}>
                    {item.unexploredPercent}%의 사람들이 이 관점을 선택했어요
                  </Text>
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />
          </>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📝</Text>
          <Text style={styles.sectionTitle}>최근 참여한 이슈</Text>
        </View>

        <Card style={styles.recentCard}>
          {RECENT_ISSUES.map((issue, index) => (
            <View
              key={index}
              style={[
                styles.recentItem,
                index < RECENT_ISSUES.length - 1 && styles.recentItemBorder,
              ]}
            >
              <Text style={styles.recentTitle}>• {issue.title}</Text>
              <Text style={styles.recentResult}>({issue.result})</Text>
            </View>
          ))}
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    ...typography.title,
    color: colors.text.primary,
  },
  shareIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  mainCopy: {
    ...typography.title,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 28,
    marginVertical: spacing.md,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  chartCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  recentCard: {
    padding: spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  recentItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  recentTitle: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  recentResult: {
    ...typography.bodySmall,
    color: colors.accent.primary,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
  // 블라인드 스팟 섹션 스타일
  countBadge: {
    backgroundColor: colors.semantic.error,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginLeft: spacing.sm,
  },
  countBadgeText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
    fontSize: 11,
  },
  sectionDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  unexploredCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.secondary,
  },
  unexploredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  unexploredIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  unexploredIssue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  unexploredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  unexploredChoice: {
    alignItems: 'center',
    flex: 1,
  },
  unexploredLabel: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  unexploredValue: {
    ...typography.body,
    color: colors.text.secondary,
  },
  unexploredArrow: {
    fontSize: 18,
    color: colors.text.tertiary,
    marginHorizontal: spacing.sm,
  },
  unexploredHighlight: {
    backgroundColor: colors.accent.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  unexploredHighlightText: {
    ...typography.body,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  unexploredHint: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
