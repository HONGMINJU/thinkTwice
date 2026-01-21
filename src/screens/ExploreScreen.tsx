import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { VALUE_DIMENSIONS } from '../constants/valueDimensions';

export const ExploreScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const TRENDING_ISSUES = [
    { id: '1', title: 'AI 저작권 논쟁', participants: 1234, dimension: 'tech_ethics' },
    { id: '2', title: '정년 연장 vs 청년 일자리', participants: 892, dimension: 'generations' },
    { id: '3', title: '차별금지법 논의', participants: 2341, dimension: 'culture' },
  ];

  const DIVIDED_ISSUES = [
    { id: '4', title: '기본소득제 도입', leftPercent: 48, rightPercent: 52, dimension: 'tax_welfare' },
    { id: '5', title: '자사고 폐지 논란', leftPercent: 51, rightPercent: 49, dimension: 'education' },
    { id: '6', title: '난민 수용 정책', leftPercent: 47, rightPercent: 53, dimension: 'global' },
  ];

  const NOT_PARTICIPATED = [
    { dimension: 'safety_rights', issueCount: 5 },
    { dimension: 'local', issueCount: 3 },
    { dimension: 'gender', issueCount: 4 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>탐색</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="이슈 검색..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>가치 영역별 이슈</Text>

        <View style={styles.categoriesGrid}>
          {VALUE_DIMENSIONS.map((dimension) => (
            <TouchableOpacity key={dimension.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{dimension.icon}</Text>
              <Text style={styles.categoryName}>{dimension.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🔥</Text>
          <Text style={styles.sectionTitle}>지금 많이 보는 이슈</Text>
        </View>

        {TRENDING_ISSUES.map((issue) => {
          const dimension = VALUE_DIMENSIONS.find((d) => d.id === issue.dimension);
          return (
            <Card key={issue.id} style={styles.issueCard}>
              <View style={styles.issueBadge}>
                <Text style={styles.issueBadgeIcon}>{dimension?.icon}</Text>
                <Text style={styles.issueBadgeText}>{dimension?.nameEn}</Text>
              </View>
              <Text style={styles.issueTitle}>{issue.title}</Text>
              <Text style={styles.issueParticipants}>
                💬 {issue.participants}명이 생각 중
              </Text>
            </Card>
          );
        })}

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>⚖️</Text>
          <Text style={styles.sectionTitle}>의견이 팽팽한 이슈</Text>
        </View>

        <Text style={styles.sectionDescription}>
          찬반이 엇갈리는 이슈들, 당신의 생각은?
        </Text>

        {DIVIDED_ISSUES.map((issue) => {
          const dimension = VALUE_DIMENSIONS.find((d) => d.id === issue.dimension);
          return (
            <Card key={issue.id} style={styles.dividedCard}>
              <View style={styles.issueBadge}>
                <Text style={styles.issueBadgeIcon}>{dimension?.icon}</Text>
                <Text style={styles.issueBadgeText}>{dimension?.nameEn}</Text>
              </View>
              <Text style={styles.issueTitle}>{issue.title}</Text>
              <View style={styles.percentBar}>
                <View style={[styles.percentLeft, { flex: issue.leftPercent }]}>
                  <Text style={styles.percentText}>{issue.leftPercent}%</Text>
                </View>
                <View style={[styles.percentRight, { flex: issue.rightPercent }]}>
                  <Text style={styles.percentText}>{issue.rightPercent}%</Text>
                </View>
              </View>
            </Card>
          );
        })}

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🎯</Text>
          <Text style={styles.sectionTitle}>아직 참여하지 않은 영역</Text>
        </View>

        <Text style={styles.sectionDescription}>
          이 영역의 이슈에 참여하면 나의 가치 지도가 더 선명해져요
        </Text>

        {NOT_PARTICIPATED.map((item) => {
          const dimension = VALUE_DIMENSIONS.find((d) => d.id === item.dimension);
          return (
            <TouchableOpacity key={item.dimension} style={styles.notParticipatedItem}>
              <Text style={styles.notParticipatedIcon}>{dimension?.icon}</Text>
              <View style={styles.notParticipatedContent}>
                <Text style={styles.notParticipatedName}>{dimension?.name}</Text>
                <Text style={styles.notParticipatedValues}>
                  {dimension?.leftValue.label} vs {dimension?.rightValue.label}
                </Text>
              </View>
              <View style={styles.issueCountBadge}>
                <Text style={styles.issueCountText}>{item.issueCount}개 이슈</Text>
              </View>
            </TouchableOpacity>
          );
        })}

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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    ...typography.title,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    paddingVertical: spacing.md,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '18%',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  categoryIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  categoryName: {
    ...typography.caption,
    color: colors.text.primary,
    textAlign: 'center',
    fontSize: 9,
  },
  issueCard: {
    marginBottom: spacing.md,
  },
  issueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  issueBadgeIcon: {
    fontSize: 12,
    marginRight: spacing.xs,
  },
  issueBadgeText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontSize: 10,
  },
  issueTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  issueParticipants: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  sectionDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  dividedCard: {
    marginBottom: spacing.md,
  },
  percentBar: {
    flexDirection: 'row',
    height: 28,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  percentLeft: {
    backgroundColor: colors.spectrum.left,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentRight: {
    backgroundColor: colors.spectrum.right,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  notParticipatedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  notParticipatedIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  notParticipatedContent: {
    flex: 1,
  },
  notParticipatedName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: 2,
  },
  notParticipatedValues: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  issueCountBadge: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  issueCountText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});
