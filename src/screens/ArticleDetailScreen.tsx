import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Header, Button, Card } from '../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { RootStackParamList } from '../types';
import { getDimensionById } from '../constants/valueDimensions';

type ArticleDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
  route: RouteProp<RootStackParamList, 'ArticleDetail'>;
};

interface ArticleSource {
  id: string;
  source: string;
  title: string;
  stance: 'left' | 'right' | 'neutral';
  stanceLabel: string;
  summary: string;
  publishedAt: string;
}

const MOCK_ARTICLES: ArticleSource[] = [
  {
    id: '1',
    source: '한국경제',
    title: 'AI 창작물 저작권, 기술 발전 막아선 안돼',
    stance: 'left',
    stanceLabel: '혁신 중시',
    summary: 'AI는 도구일 뿐이며, 창작의 주체는 여전히 인간이다. 과도한 규제는 기술 발전을 저해할 수 있다.',
    publishedAt: '2026.01.22',
  },
  {
    id: '2',
    source: '한겨레',
    title: '창작자 권리 보호 없는 AI 발전은 허구',
    stance: 'right',
    stanceLabel: '권리 보호',
    summary: 'AI 학습에 사용된 원작자들의 권리가 침해되고 있다. 창작자 보호 없이 지속 가능한 발전은 불가능하다.',
    publishedAt: '2026.01.22',
  },
  {
    id: '3',
    source: '중앙일보',
    title: 'AI 저작권, 새로운 법적 프레임워크 필요',
    stance: 'neutral',
    stanceLabel: '균형 시각',
    summary: '기존 저작권법으로는 AI 창작물을 규율하기 어렵다. 기술 발전과 권리 보호를 함께 고려한 새 기준이 필요하다.',
    publishedAt: '2026.01.21',
  },
];

const NEUTRAL_REPORT = `이 이슈에 대해 다양한 시각이 존재합니다.

핵심 쟁점
AI가 생성한 창작물의 저작권을 누구에게 귀속시킬 것인가?

주요 관점

1. 혁신 중시 관점
• AI는 붓이나 카메라와 같은 도구에 불과
• 창작 의도와 지시를 한 인간에게 저작권 귀속
• 과도한 규제는 국가 경쟁력 저하 우려

2. 권리 보호 관점
• AI 학습 데이터로 사용된 원작자 권리 침해
• 창작자의 노력과 경제적 가치 보호 필요
• 무분별한 AI 사용으로 인한 창작 생태계 붕괴 우려

3. 균형 시각
• 기존 법체계로는 판단 불가능한 새로운 영역
• 기술 발전과 권리 보호 모두 고려한 새 프레임 필요

현재 상황
• 국내: 명확한 법적 기준 부재
• 해외: 미국, EU 등에서 논의 진행 중`;

export const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const [isEssenceMode, setIsEssenceMode] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const { issueId } = route.params;

  const dimension = getDimensionById('tech_ethics');

  const handleThinkPress = () => {
    navigation.navigate('BalancePick', { issueId });
  };

  const getStanceColor = (stance: 'left' | 'right' | 'neutral') => {
    switch (stance) {
      case 'left':
        return colors.spectrum.left;
      case 'right':
        return colors.spectrum.right;
      default:
        return colors.text.secondary;
    }
  };

  const toggleArticle = (id: string) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="이슈"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryIcon}>{dimension?.icon}</Text>
          <Text style={styles.categoryText}>{dimension?.nameEn}</Text>
        </View>

        <Text style={styles.title}>AI가 만든 그림, 저작권은 누구에게?</Text>

        <Text style={styles.articleCount}>
          {MOCK_ARTICLES.length}개 언론사의 보도
        </Text>

        <View style={styles.divider} />

        <View style={styles.modeContainer}>
          <View style={styles.modeHeader}>
            <Text style={styles.modeIcon}>🔍</Text>
            <Text style={styles.modeTitle}>본질 모드</Text>
          </View>

          <View style={styles.modeToggle}>
            <Text style={[styles.modeLabel, !isEssenceMode && styles.modeLabelActive]}>
              각 언론사 입장
            </Text>
            <Switch
              value={isEssenceMode}
              onValueChange={setIsEssenceMode}
              trackColor={{ false: colors.border.light, true: colors.accent.primary }}
              thumbColor={colors.background.card}
            />
            <Text style={[styles.modeLabel, isEssenceMode && styles.modeLabelActive]}>
              본질 리포트
            </Text>
          </View>

          <Text style={styles.modeDescription}>
            {isEssenceMode
              ? '"프레임을 걷어내고 본질을 봅니다"'
              : '"각 언론사의 시각을 비교해보세요"'}
          </Text>
        </View>

        <View style={styles.divider} />

        {isEssenceMode ? (
          <View style={styles.essenceContent}>
            <View style={styles.essenceBadge}>
              <Text style={styles.essenceBadgeText}>✨ 본질 리포트</Text>
            </View>
            <Text style={styles.essenceText}>{NEUTRAL_REPORT}</Text>
          </View>
        ) : (
          <View style={styles.articlesContainer}>
            <Text style={styles.articlesTitle}>📰 언론사별 보도</Text>
            <Text style={styles.articlesSubtitle}>
              같은 이슈, 다른 시각을 비교해보세요
            </Text>

            {MOCK_ARTICLES.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleCard}
                onPress={() => toggleArticle(article.id)}
                activeOpacity={0.7}
              >
                <View style={styles.articleHeader}>
                  <View style={styles.articleSourceRow}>
                    <Text style={styles.articleSource}>{article.source}</Text>
                    <View
                      style={[
                        styles.stanceBadge,
                        { backgroundColor: getStanceColor(article.stance) },
                      ]}
                    >
                      <Text style={styles.stanceText}>{article.stanceLabel}</Text>
                    </View>
                  </View>
                  <Text style={styles.articleDate}>{article.publishedAt}</Text>
                </View>

                <Text style={styles.articleTitle}>{article.title}</Text>

                <Text
                  style={styles.articleSummary}
                  numberOfLines={expandedArticle === article.id ? undefined : 2}
                >
                  {article.summary}
                </Text>

                <Text style={styles.expandHint}>
                  {expandedArticle === article.id ? '접기' : '더보기'}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.stanceLegend}>
              <Text style={styles.legendTitle}>입장 범례</Text>
              <View style={styles.legendItems}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.spectrum.left }]} />
                  <Text style={styles.legendText}>{dimension?.leftValue.label}</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.text.secondary }]} />
                  <Text style={styles.legendText}>균형</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.spectrum.right }]} />
                  <Text style={styles.legendText}>{dimension?.rightValue.label}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.actionContainer}>
          <Button
            title="💭 나의 생각 정리하기"
            onPress={handleThinkPress}
            variant="primary"
            size="large"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
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
    ...typography.headline,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  articleCount: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  modeContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modeIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  modeTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  modeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  modeLabel: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginHorizontal: spacing.sm,
  },
  modeLabelActive: {
    color: colors.accent.primary,
    fontWeight: '600',
  },
  modeDescription: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  essenceContent: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  essenceBadge: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  essenceBadgeText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '500',
  },
  essenceText: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 26,
  },
  articlesContainer: {
    marginBottom: spacing.md,
  },
  articlesTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  articlesSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  articleCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  articleSourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleSource: {
    ...typography.label,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  stanceBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  stanceText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
    fontSize: 10,
  },
  articleDate: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  articleTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  articleSummary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  expandHint: {
    ...typography.caption,
    color: colors.accent.primary,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
  stanceLegend: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  legendTitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.xs,
  },
  legendText: {
    ...typography.caption,
    color: colors.text.primary,
  },
  actionContainer: {
    marginTop: spacing.md,
  },
});
