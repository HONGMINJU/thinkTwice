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
              <Text style={styles.categoryNameEn}>{dimension.nameEn}</Text>
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
          <Text style={styles.sectionIcon}>📌</Text>
          <Text style={styles.sectionTitle}>가치별 이슈 모음</Text>
        </View>

        {VALUE_DIMENSIONS.slice(0, 5).map((dimension) => (
          <TouchableOpacity key={dimension.id} style={styles.valueIssueItem}>
            <Text style={styles.valueIssueIcon}>{dimension.icon}</Text>
            <View style={styles.valueIssueContent}>
              <Text style={styles.valueIssueName}>{dimension.name}</Text>
              <Text style={styles.valueIssueValues}>
                {dimension.leftValue.label} vs {dimension.rightValue.label}
              </Text>
            </View>
            <Text style={styles.valueIssueArrow}>›</Text>
          </TouchableOpacity>
        ))}

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
  },
  categoryCard: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2%',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  categoryName: {
    ...typography.caption,
    color: colors.text.primary,
    textAlign: 'center',
    fontSize: 10,
  },
  categoryNameEn: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
    fontSize: 8,
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
  valueIssueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  valueIssueIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  valueIssueContent: {
    flex: 1,
  },
  valueIssueName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: 2,
  },
  valueIssueValues: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  valueIssueArrow: {
    fontSize: 20,
    color: colors.text.tertiary,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});
