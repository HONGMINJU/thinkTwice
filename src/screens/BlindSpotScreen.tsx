import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Header, Button, Card } from '../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { RootStackParamList } from '../types';
import { getDimensionById } from '../constants/valueDimensions';

type BlindSpotScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BlindSpot'>;
  route: RouteProp<RootStackParamList, 'BlindSpot'>;
};

// 혁신 중시 관점의 이유들
const INNOVATION_REASONS = [
  'AI는 붓이나 카메라처럼 창작을 돕는 도구일 뿐',
  '과도한 규제는 기술 발전과 국가 경쟁력 저해',
  'AI를 통해 더 많은 사람에게 창작 기회 제공',
];

// 권리 보호 관점의 이유들
const PROTECTION_REASONS = [
  '창작자의 생계가 위협받을 수 있음',
  '학습 데이터 사용에 대한 동의나 보상 부재',
  '창작 생태계 붕괴 시 AI 발전에도 악영향',
];

export const BlindSpotScreen: React.FC<BlindSpotScreenProps> = ({
  navigation,
  route,
}) => {
  const { oppositeLabel, oppositePercent, selectedValue } = route.params;

  const dimension = getDimensionById('tech_ethics');
  const myPercent = 100 - oppositePercent;

  // 사용자가 50 이상 선택 = 혁신 중시
  const isInnovationSide = selectedValue >= 50;
  const myLabel = isInnovationSide ? dimension?.leftValue.label : dimension?.rightValue.label;

  const myReasons = isInnovationSide ? INNOVATION_REASONS : PROTECTION_REASONS;
  const oppositeReasons = isInnovationSide ? PROTECTION_REASONS : INNOVATION_REASONS;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="다른 시각 알아보기"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 나의 위치 표시 */}
        <View style={styles.positionContainer}>
          <Text style={styles.positionTitle}>이 이슈에서 나의 위치</Text>
          <View style={styles.spectrumBar}>
            <View style={[styles.spectrumLeft, { flex: myPercent }]} />
            <View style={[styles.spectrumRight, { flex: oppositePercent }]} />
            <View
              style={[
                styles.positionMarker,
                { left: `${selectedValue}%` }
              ]}
            />
          </View>
          <View style={styles.spectrumLabels}>
            <Text style={styles.spectrumLabelLeft}>{dimension?.leftValue.label}</Text>
            <Text style={styles.spectrumLabelRight}>{dimension?.rightValue.label}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 양쪽 진영 비교 */}
        <View style={styles.comparisonContainer}>
          {/* 내 진영 */}
          <View style={[styles.sideCard, styles.mySideCard]}>
            <View style={styles.sideHeader}>
              <Text style={styles.sideLabel}>나의 진영</Text>
              <View style={styles.myBadge}>
                <Text style={styles.badgeText}>ME</Text>
              </View>
            </View>
            <Text style={styles.sideTitle}>{myLabel}</Text>
            <Text style={styles.sidePercent}>{myPercent}%</Text>
            <View style={styles.reasonsList}>
              {myReasons.map((reason, index) => (
                <View key={index} style={styles.reasonItem}>
                  <Text style={styles.reasonBullet}>•</Text>
                  <Text style={styles.reasonText}>{reason}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* VS */}
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          {/* 반대 진영 */}
          <View style={[styles.sideCard, styles.oppositeSideCard]}>
            <View style={styles.sideHeader}>
              <Text style={styles.sideLabel}>다른 진영</Text>
              <View style={styles.newBadge}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            </View>
            <Text style={styles.sideTitle}>{oppositeLabel}</Text>
            <Text style={styles.sidePercent}>{oppositePercent}%</Text>
            <View style={styles.reasonsList}>
              {oppositeReasons.map((reason, index) => (
                <View key={index} style={styles.reasonItem}>
                  <Text style={styles.reasonBullet}>•</Text>
                  <Text style={styles.reasonText}>{reason}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 푸터 메시지 */}
        <View style={styles.footerCard}>
          <Text style={styles.footerEmoji}>🙂</Text>
          <Text style={styles.footerText}>
            다른 관점을 이해한다고 해서{'\n'}내 생각이 바뀌는 건 아니에요
          </Text>
          <Text style={styles.footerSubtext}>
            다양한 시각을 알면 더 깊이 생각할 수 있어요
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <Button
            title="이해했어요"
            onPress={() => navigation.goBack()}
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
  // 나의 위치
  positionContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  positionTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  spectrumBar: {
    height: 12,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: spacing.sm,
  },
  spectrumLeft: {
    backgroundColor: colors.spectrum.left,
  },
  spectrumRight: {
    backgroundColor: colors.spectrum.right,
  },
  positionMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background.card,
    borderWidth: 3,
    borderColor: colors.accent.primary,
    top: -4,
    marginLeft: -10,
  },
  spectrumLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spectrumLabelLeft: {
    ...typography.caption,
    color: colors.spectrum.left,
    fontWeight: '600',
  },
  spectrumLabelRight: {
    ...typography.caption,
    color: colors.spectrum.right,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.lg,
  },
  // 양쪽 진영 비교
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  sideCard: {
    flex: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  mySideCard: {
    backgroundColor: colors.background.card,
    borderWidth: 2,
    borderColor: colors.spectrum.left,
    marginRight: spacing.xs,
  },
  oppositeSideCard: {
    backgroundColor: colors.background.card,
    borderWidth: 2,
    borderColor: colors.spectrum.right,
    marginLeft: spacing.xs,
  },
  sideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sideLabel: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  myBadge: {
    backgroundColor: colors.spectrum.left,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  newBadge: {
    backgroundColor: colors.spectrum.right,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '700',
    fontSize: 10,
  },
  sideTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sidePercent: {
    ...typography.headline,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  vsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  vsText: {
    ...typography.caption,
    color: colors.text.tertiary,
    fontWeight: '700',
  },
  reasonsList: {
    marginTop: spacing.xs,
  },
  reasonItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  reasonBullet: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginRight: spacing.xs,
  },
  reasonText: {
    ...typography.caption,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 18,
  },
  // 푸터
  footerCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  footerEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  footerText: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  actionContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
