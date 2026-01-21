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

type BlindSpotScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BlindSpot'>;
  route: RouteProp<RootStackParamList, 'BlindSpot'>;
};

const BLIND_SPOTS = [
  {
    id: '1',
    title: '창작자 생계 문제',
    content:
      'AI 저작권 문제는 단순히 법적 권리의 문제가 아닙니다. 일러스트레이터, 작가 등 창작자들의 생계와 직결되어 있습니다. AI 학습 데이터로 사용된 원작자들에 대한 보상 체계도 함께 논의되어야 합니다.',
  },
  {
    id: '2',
    title: '글로벌 기술 경쟁',
    content:
      '한편으로 AI 규제가 너무 강해지면 국가 경쟁력에 영향을 줄 수 있다는 우려도 있습니다. 미국, 중국 등 주요국의 AI 정책과의 조화도 고려해야 할 사항입니다.',
  },
  {
    id: '3',
    title: '소비자 관점',
    content:
      'AI 창작물을 이용하는 소비자의 권리와 알 권리도 중요합니다. AI가 만든 콘텐츠임을 명시해야 하는지, 가격 차별화가 필요한지 등의 문제도 있습니다.',
  },
];

export const BlindSpotScreen: React.FC<BlindSpotScreenProps> = ({
  navigation,
  route,
}) => {
  const { issueId } = route.params;

  const handleNext = () => {
    navigation.navigate('ValueSpectrum', { issueId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="시야 확장"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainCopy}>
          "미처 생각해보지 못했던{'\n'}새로운 시야가 여기 있습니다"
        </Text>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>💡</Text>
          <Text style={styles.sectionTitle}>이런 관점도 있어요</Text>
        </View>

        {BLIND_SPOTS.map((spot, index) => (
          <Card key={spot.id} style={styles.spotCard}>
            <View style={styles.spotHeader}>
              <View style={styles.spotBadge}>
                <Text style={styles.spotBadgeText}>Blind Spot #{index + 1}</Text>
              </View>
            </View>
            <Text style={styles.spotTitle}>{spot.title}</Text>
            <Text style={styles.spotContent}>{spot.content}</Text>
          </Card>
        ))}

        <View style={styles.divider} />

        <View style={styles.actionContainer}>
          <Button
            title="다른 사람들은 어떻게 생각할까?"
            onPress={handleNext}
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  spotCard: {
    marginBottom: spacing.md,
  },
  spotHeader: {
    marginBottom: spacing.sm,
  },
  spotBadge: {
    backgroundColor: colors.accent.tertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  spotBadgeText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  spotTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  spotContent: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  actionContainer: {
    marginTop: spacing.md,
  },
});
