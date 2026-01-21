import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Header, Button, ValueSlider } from '../components/common';
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
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(50);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showBlindSpotModal, setShowBlindSpotModal] = useState(false);
  const { issueId } = route.params;

  const dimension = getDimensionById('tech_ethics');

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

  const handleThinkPress = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    setShowModal(false);
    // Show toast after selection
    setShowToast(true);
    // Auto-hide toast after 5 seconds
    setTimeout(() => setShowToast(false), 5000);
    // TODO: 저장 로직
  };

  const getOppositeLabel = () => {
    if (selectedValue < 50) return dimension?.rightValue.label;
    return dimension?.leftValue.label;
  };

  const getOppositePercent = () => {
    // Mock data - in real app, fetch from server
    if (selectedValue < 50) return 48;
    return 52;
  };

  const getResultLabel = () => {
    if (selectedValue < 35) return dimension?.leftValue.label + '을(를) 중시';
    if (selectedValue > 65) return dimension?.rightValue.label + '을(를) 중시';
    return '균형 잡힌 시각';
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

        {hasSubmitted ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>✅ 나의 선택</Text>
            <Text style={styles.resultLabel}>{getResultLabel()}</Text>
            <View style={styles.resultBar}>
              <View style={[styles.resultFill, { width: `${selectedValue}%` }]} />
              <View style={[styles.resultMarker, { left: `${selectedValue}%` }]} />
            </View>
            <View style={styles.resultLabels}>
              <Text style={styles.resultValueLabel}>{dimension?.leftValue.label}</Text>
              <Text style={styles.resultValueLabel}>{dimension?.rightValue.label}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.editButton}>다시 선택하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionContainer}>
            <Button
              title="💭 생각해보기"
              onPress={handleThinkPress}
              variant="primary"
              size="large"
            />
          </View>
        )}
      </ScrollView>

      {/* 생각해보기 모달 */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>💭 생각해보기</Text>
              <Pressable onPress={() => setShowModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.modalQuestion}>
              이 이슈에서 당신이 더 중요하게{'\n'}여기는 가치는 무엇인가요?
            </Text>

            <View style={styles.modalDimensionBadge}>
              <Text style={styles.modalDimensionIcon}>{dimension?.icon}</Text>
              <Text style={styles.modalDimensionName}>{dimension?.name}</Text>
            </View>

            <View style={styles.modalSlider}>
              <ValueSlider
                value={selectedValue}
                onValueChange={setSelectedValue}
                leftLabel={dimension?.leftValue.label || ''}
                rightLabel={dimension?.rightValue.label || ''}
                leftDescription={dimension?.leftValue.description}
                rightDescription={dimension?.rightValue.description}
              />
            </View>

            <Button
              title="선택 완료"
              onPress={handleSubmit}
              variant="primary"
              size="large"
            />
          </View>
        </View>
      </Modal>

      {/* 블라인드스팟 토스트 배너 */}
      {showToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toastContent}>
            <Text style={styles.toastIcon}>🌈</Text>
            <View style={styles.toastTextContainer}>
              <Text style={styles.toastTitle}>다른 시각도 있어요</Text>
              <Text style={styles.toastMessage}>
                {getOppositePercent()}%는 '{getOppositeLabel()}'을 선택했어요
              </Text>
            </View>
            <TouchableOpacity
              style={styles.toastButton}
              onPress={() => {
                setShowToast(false);
                setShowBlindSpotModal(true);
              }}
            >
              <Text style={styles.toastButtonText}>알아보기</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setShowToast(false)} style={styles.toastClose}>
              <Text style={styles.toastCloseText}>✕</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* 블라인드스팟 상세 모달 */}
      <Modal
        visible={showBlindSpotModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBlindSpotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.blindSpotModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🌈 다른 시각 알아보기</Text>
              <Pressable onPress={() => setShowBlindSpotModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.blindSpotBadge}>
              <Text style={styles.blindSpotBadgeText}>
                '{getOppositeLabel()}' 관점
              </Text>
            </View>

            <Text style={styles.blindSpotQuestion}>
              왜 {getOppositePercent()}%의 사람들이{'\n'}이 관점을 선택했을까요?
            </Text>

            <View style={styles.blindSpotReasons}>
              {selectedValue >= 50 ? (
                <>
                  <View style={styles.blindSpotReasonItem}>
                    <Text style={styles.blindSpotReasonIcon}>💡</Text>
                    <Text style={styles.blindSpotReasonText}>
                      AI 기술이 빠르게 발전하는 상황에서 창작자의 생계가 위협받을 수 있어요
                    </Text>
                  </View>
                  <View style={styles.blindSpotReasonItem}>
                    <Text style={styles.blindSpotReasonIcon}>💡</Text>
                    <Text style={styles.blindSpotReasonText}>
                      학습 데이터로 사용된 원작에 대한 동의나 보상이 없었어요
                    </Text>
                  </View>
                  <View style={styles.blindSpotReasonItem}>
                    <Text style={styles.blindSpotReasonIcon}>💡</Text>
                    <Text style={styles.blindSpotReasonText}>
                      창작 생태계가 무너지면 장기적으로 AI 학습 데이터도 부족해질 수 있어요
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.blindSpotReasonItem}>
                    <Text style={styles.blindSpotReasonIcon}>💡</Text>
                    <Text style={styles.blindSpotReasonText}>
                      AI는 붓이나 카메라처럼 창작을 돕는 도구일 뿐이에요
                    </Text>
                  </View>
                  <View style={styles.blindSpotReasonItem}>
                    <Text style={styles.blindSpotReasonIcon}>💡</Text>
                    <Text style={styles.blindSpotReasonText}>
                      과도한 규제는 기술 발전과 국가 경쟁력을 저해할 수 있어요
                    </Text>
                  </View>
                  <View style={styles.blindSpotReasonItem}>
                    <Text style={styles.blindSpotReasonIcon}>💡</Text>
                    <Text style={styles.blindSpotReasonText}>
                      새로운 창작의 기회가 더 많은 사람에게 열릴 수 있어요
                    </Text>
                  </View>
                </>
              )}
            </View>

            <Text style={styles.blindSpotFooter}>
              다른 관점을 이해한다고 해서{'\n'}내 생각이 바뀌는 건 아니에요 🙂
            </Text>

            <Button
              title="이해했어요"
              onPress={() => setShowBlindSpotModal(false)}
              variant="primary"
              size="large"
            />
          </View>
        </View>
      </Modal>
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
  resultContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  resultTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  resultLabel: {
    ...typography.body,
    color: colors.accent.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  resultBar: {
    height: 8,
    backgroundColor: colors.border.light,
    borderRadius: borderRadius.full,
    position: 'relative',
    marginBottom: spacing.sm,
  },
  resultFill: {
    height: '100%',
    backgroundColor: colors.accent.primary,
    borderRadius: borderRadius.full,
  },
  resultMarker: {
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
  resultLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  resultValueLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  editButton: {
    ...typography.bodySmall,
    color: colors.accent.primary,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.title,
    color: colors.text.primary,
  },
  modalClose: {
    fontSize: 24,
    color: colors.text.tertiary,
    padding: spacing.sm,
  },
  modalQuestion: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  modalDimensionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  modalDimensionIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  modalDimensionName: {
    ...typography.subtitle,
    color: colors.accent.primary,
  },
  modalSlider: {
    marginBottom: spacing.xl,
  },
  // Toast styles
  toastContainer: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.md,
    right: spacing.md,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.primary,
  },
  toastIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  toastTextContainer: {
    flex: 1,
  },
  toastTitle: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: 2,
  },
  toastMessage: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  toastButton: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  toastButtonText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  toastClose: {
    padding: spacing.xs,
  },
  toastCloseText: {
    fontSize: 16,
    color: colors.text.tertiary,
  },
  // BlindSpot Modal styles
  blindSpotModalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    maxHeight: '80%',
  },
  blindSpotBadge: {
    backgroundColor: colors.accent.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  blindSpotBadgeText: {
    ...typography.subtitle,
    color: colors.text.inverse,
  },
  blindSpotQuestion: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  blindSpotReasons: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  blindSpotReasonItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  blindSpotReasonIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  blindSpotReasonText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 24,
  },
  blindSpotFooter: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
});
