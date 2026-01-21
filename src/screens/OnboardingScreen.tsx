import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../components/common';
import { colors, typography, spacing, borderRadius } from '../styles';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

interface OnboardingItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  copy: string;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    icon: '🎚️',
    title: '거리두기',
    description: 'Phase 1',
    copy: '잠시만요, 프레임을 걷어내고\n생각해보면 본질이 보입니다.',
  },
  {
    id: '2',
    icon: '⚖️',
    title: '들여다보기',
    description: 'Phase 2',
    copy: '미처 생각해보면 보지 못했던\n새로운 시야가 여기 있습니다.',
  },
  {
    id: '3',
    icon: '🌈',
    title: '이해하기',
    description: 'Phase 3',
    copy: '다른 입장에서 생각해보면,\n그럴 수도 있습니다.',
  },
  {
    id: '4',
    icon: '🗺️',
    title: '그려보기',
    description: 'Phase 4',
    copy: '나의 궤적을 생각해보면,\n나의 윤곽이 보입니다.',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Main');
    }
  };

  const handleSkip = () => {
    navigation.replace('Main');
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.slide}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.phase}>{item.description}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.copy}>{item.copy}</Text>
    </View>
  );

  const renderDot = (index: number) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: 'clamp',
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="건너뛰기" onPress={handleSkip} variant="outline" size="small" />
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => renderDot(index))}
        </View>

        <Button
          title={currentIndex === onboardingData.length - 1 ? '시작하기' : '다음'}
          onPress={handleNext}
          variant="primary"
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.xl,
    alignItems: 'flex-end',
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  icon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  phase: {
    ...typography.caption,
    color: colors.accent.primary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  title: {
    ...typography.headline,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  copy: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
    marginHorizontal: spacing.xs,
  },
});
