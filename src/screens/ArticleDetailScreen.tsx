import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Header, Button } from '../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { RootStackParamList } from '../types';
import { getDimensionById } from '../constants/valueDimensions';

type ArticleDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
  route: RouteProp<RootStackParamList, 'ArticleDetail'>;
};

const ORIGINAL_TEXT = `인공지능(AI)이 생성한 창작물의 저작권을 둘러싼 논쟁이 뜨겁다. 일각에서는 "AI는 도구일 뿐이므로 사용자에게 저작권이 있다"고 주장하는 반면, 다른 한편에서는 "AI 학습에 사용된 원본 창작자들의 권리가 침해당하고 있다"며 강력히 반발하고 있다.

전문가들은 "현행 저작권법으로는 이 문제를 해결하기 어렵다"고 입을 모은다. 기술 발전 속도를 법이 따라가지 못하고 있다는 것이다.`;

const NEUTRAL_TEXT = `인공지능(AI)이 생성한 창작물의 저작권에 대해 다양한 의견이 존재합니다.

한쪽 관점: AI를 도구로 보고, 사용자에게 저작권을 인정해야 한다는 의견이 있습니다.

다른 관점: AI 학습에 사용된 원본 창작물의 저작권자 권리를 고려해야 한다는 의견도 있습니다.

현재 상황: 전문가들은 현행 저작권법이 AI 창작물에 대한 명확한 기준을 제시하지 못하고 있다고 분석합니다.`;

export const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const [isANCEnabled, setIsANCEnabled] = useState(false);
  const { issueId } = route.params;

  const dimension = getDimensionById('tech_ethics');

  const handleThinkPress = () => {
    navigation.navigate('BalancePick', { issueId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="기사 상세"
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

        <Text style={styles.meta}>한국일보 · 2026.01.22</Text>

        <View style={styles.divider} />

        <View style={styles.ancContainer}>
          <View style={styles.ancHeader}>
            <Text style={styles.ancIcon}>🎚️</Text>
            <Text style={styles.ancTitle}>ANC 스위치</Text>
          </View>

          <View style={styles.ancToggle}>
            <Text style={[styles.ancLabel, !isANCEnabled && styles.ancLabelActive]}>
              OFF
            </Text>
            <Switch
              value={isANCEnabled}
              onValueChange={setIsANCEnabled}
              trackColor={{ false: colors.border.light, true: colors.accent.primary }}
              thumbColor={colors.background.card}
            />
            <Text style={[styles.ancLabel, isANCEnabled && styles.ancLabelActive]}>
              ON
            </Text>
          </View>

          <Text style={styles.ancDescription}>
            {isANCEnabled
              ? '"프레임을 걷어내고 본질을 봅니다"'
              : '"원문 기사를 표시합니다"'}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.articleContent}>
          {isANCEnabled ? (
            <>
              <View style={styles.neutralBadge}>
                <Text style={styles.neutralBadgeText}>🔇 중립 리포트</Text>
              </View>
              <Text style={styles.articleText}>{NEUTRAL_TEXT}</Text>
            </>
          ) : (
            <>
              <View style={styles.originalBadge}>
                <Text style={styles.originalBadgeText}>📄 원문 기사</Text>
              </View>
              <Text style={styles.articleText}>{ORIGINAL_TEXT}</Text>
            </>
          )}
        </View>

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
  meta: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  ancContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  ancHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ancIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  ancTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  ancToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  ancLabel: {
    ...typography.label,
    color: colors.text.tertiary,
    marginHorizontal: spacing.md,
  },
  ancLabelActive: {
    color: colors.accent.primary,
    fontWeight: '600',
  },
  ancDescription: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  articleContent: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  neutralBadge: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  neutralBadgeText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '500',
  },
  originalBadge: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  originalBadgeText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  articleText: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 26,
  },
  actionContainer: {
    marginTop: spacing.md,
  },
});
