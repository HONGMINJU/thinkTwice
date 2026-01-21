import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Header, Button, ValueSlider } from '../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { RootStackParamList } from '../types';
import { getDimensionById } from '../constants/valueDimensions';

type BalancePickScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BalancePick'>;
  route: RouteProp<RootStackParamList, 'BalancePick'>;
};

export const BalancePickScreen: React.FC<BalancePickScreenProps> = ({
  navigation,
  route,
}) => {
  const [selectedValue, setSelectedValue] = useState(50);
  const { issueId } = route.params;

  const dimension = getDimensionById('tech_ethics');

  const handleComplete = () => {
    navigation.navigate('BlindSpot', { issueId });
  };

  if (!dimension) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="나의 생각 정리"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>
          "이 이슈에서 당신이 더 중요하게{'\n'}여기는 가치는 무엇인가요?"
        </Text>

        <View style={styles.divider} />

        <View style={styles.dimensionBadge}>
          <Text style={styles.dimensionIcon}>{dimension.icon}</Text>
          <Text style={styles.dimensionName}>{dimension.nameEn}</Text>
        </View>

        <View style={styles.sliderContainer}>
          <ValueSlider
            value={selectedValue}
            onValueChange={setSelectedValue}
            leftLabel={dimension.leftValue.label}
            rightLabel={dimension.rightValue.label}
            leftDescription={dimension.leftValue.description}
            rightDescription={dimension.rightValue.description}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.otherAxesContainer}>
          <Text style={styles.otherAxesTitle}>다른 가치 축으로 보기</Text>

          {['generations', 'work_life', 'culture'].map((dimId) => {
            const otherDim = getDimensionById(dimId);
            if (!otherDim) return null;

            return (
              <TouchableOpacity key={dimId} style={styles.otherAxisItem}>
                <Text style={styles.otherAxisIcon}>{otherDim.icon}</Text>
                <View style={styles.otherAxisContent}>
                  <Text style={styles.otherAxisName}>{otherDim.name}</Text>
                  <Text style={styles.otherAxisValues}>
                    {otherDim.leftValue.label} vs {otherDim.rightValue.label}
                  </Text>
                </View>
                <Text style={styles.otherAxisArrow}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.actionContainer}>
          <Button
            title="선택 완료"
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
  question: {
    ...typography.title,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 28,
    marginVertical: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  dimensionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  dimensionIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  dimensionName: {
    ...typography.subtitle,
    color: colors.accent.primary,
  },
  sliderContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  otherAxesContainer: {
    marginTop: spacing.md,
  },
  otherAxesTitle: {
    ...typography.label,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  otherAxisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  otherAxisIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  otherAxisContent: {
    flex: 1,
  },
  otherAxisName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: 2,
  },
  otherAxisValues: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  otherAxisArrow: {
    fontSize: 20,
    color: colors.text.tertiary,
  },
  actionContainer: {
    marginTop: spacing.xl,
  },
});
