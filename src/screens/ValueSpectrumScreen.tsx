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
import { colors, typography, spacing, borderRadius } from '../styles';
import { RootStackParamList } from '../types';
import { getDimensionById } from '../constants/valueDimensions';

type ValueSpectrumScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ValueSpectrum'>;
  route: RouteProp<RootStackParamList, 'ValueSpectrum'>;
};

const LEFT_REASONS = [
  '기술 발전이 멈추면 국가 경쟁력이 떨어질 수 있습니다.',
  'AI는 도구일 뿐, 창작의 주체는 사람입니다.',
  '지나친 규제는 혁신을 저해할 수 있습니다.',
];

const RIGHT_REASONS = [
  '창작자의 노력과 권리는 보호받아야 합니다.',
  '학습 데이터로 사용된 원작자에 대한 보상이 필요합니다.',
  '기술이 아무리 발전해도 인간의 권리가 우선입니다.',
];

export const ValueSpectrumScreen: React.FC<ValueSpectrumScreenProps> = ({
  navigation,
  route,
}) => {
  const { issueId } = route.params;
  const dimension = getDimensionById('tech_ethics');

  const handleComplete = () => {
    navigation.navigate('Main');
  };

  if (!dimension) return null;

  const userValue = 65;
  const leftPercentage = 42;
  const rightPercentage = 58;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="가치 스펙트럼"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainCopy}>
          "다른 입장에서 생각해보면,{'\n'}그럴 수도 있습니다"
        </Text>

        <View style={styles.divider} />

        <Text style={styles.distributionTitle}>
          이 이슈에서 사람들의 선택 분포
        </Text>

        <View style={styles.spectrumContainer}>
          <View style={styles.spectrumLabels}>
            <Text style={styles.spectrumLabel}>{dimension.leftValue.label}</Text>
            <Text style={styles.spectrumLabel}>{dimension.rightValue.label}</Text>
          </View>

          <View style={styles.spectrumBar}>
            <View style={[styles.spectrumFillLeft, { width: `${leftPercentage}%` }]} />
            <View style={[styles.spectrumFillRight, { width: `${rightPercentage}%` }]} />
          </View>

          <View style={styles.spectrumPercentages}>
            <Text style={styles.spectrumPercentage}>{leftPercentage}%</Text>
            <Text style={styles.spectrumPercentage}>{rightPercentage}%</Text>
          </View>

          <View style={[styles.userMarker, { left: `${userValue}%` }]}>
            <Text style={styles.userMarkerText}>▲</Text>
            <Text style={styles.userMarkerLabel}>나</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.reasonsSection}>
          <Card style={styles.reasonCard}>
            <View style={styles.reasonHeader}>
              <Text style={styles.reasonIcon}>📌</Text>
              <Text style={styles.reasonTitle}>
                {dimension.leftValue.label}을(를) 선택한 사람들의 이유
              </Text>
            </View>
            {LEFT_REASONS.map((reason, index) => (
              <View key={index} style={styles.reasonItem}>
                <Text style={styles.reasonBullet}>•</Text>
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}
          </Card>

          <Card style={styles.reasonCard}>
            <View style={styles.reasonHeader}>
              <Text style={styles.reasonIcon}>📌</Text>
              <Text style={styles.reasonTitle}>
                {dimension.rightValue.label}을(를) 선택한 사람들의 이유
              </Text>
            </View>
            {RIGHT_REASONS.map((reason, index) => (
              <View key={index} style={styles.reasonItem}>
                <Text style={styles.reasonBullet}>•</Text>
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.actionContainer}>
          <Button
            title="완료"
            onPress={handleComplete}
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
  mainCopy: {
    ...typography.title,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 28,
    marginVertical: spacing.lg,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  distributionTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  spectrumContainer: {
    paddingHorizontal: spacing.md,
    position: 'relative',
    paddingBottom: spacing.xl,
  },
  spectrumLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  spectrumLabel: {
    ...typography.label,
    color: colors.text.secondary,
  },
  spectrumBar: {
    flexDirection: 'row',
    height: 12,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  spectrumFillLeft: {
    backgroundColor: colors.spectrum.left,
  },
  spectrumFillRight: {
    backgroundColor: colors.spectrum.right,
  },
  spectrumPercentages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  spectrumPercentage: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  userMarker: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    marginLeft: -15,
  },
  userMarkerText: {
    color: colors.accent.primary,
    fontSize: 16,
  },
  userMarkerLabel: {
    ...typography.caption,
    color: colors.accent.primary,
    fontWeight: '600',
  },
  reasonsSection: {
    marginTop: spacing.md,
  },
  reasonCard: {
    marginBottom: spacing.md,
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  reasonIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  reasonTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    flex: 1,
  },
  reasonItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  reasonBullet: {
    ...typography.body,
    color: colors.text.secondary,
    marginRight: spacing.sm,
  },
  reasonText: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
  actionContainer: {
    marginTop: spacing.lg,
  },
});
