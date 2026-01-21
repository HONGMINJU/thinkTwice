import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IssueCard } from '../components/home/IssueCard';
import { colors, typography, spacing } from '../styles';
import { RootStackParamList, MainTabParamList, Issue } from '../types';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'AI가 만든 그림, 저작권은 누구에게?',
    summary:
      '생성형 AI로 만든 창작물의 저작권 귀속 문제가 법적 논쟁으로 번지고 있습니다. 기술 발전과 창작자 권리 보호 사이에서 어떤 균형점을 찾아야 할까요?',
    originalContent: '',
    neutralContent: '',
    dimensionId: 'tech_ethics',
    source: '한국일보',
    publishedAt: '2026-01-22',
    participantCount: 1234,
  },
  {
    id: '2',
    title: '정년 연장 vs 청년 일자리, 세대 간 공정은?',
    summary:
      '고령화 시대, 정년 연장 논의가 본격화되고 있습니다. 기성세대의 경험 보존과 청년세대의 기회 확대, 어느 쪽이 더 시급할까요?',
    originalContent: '',
    neutralContent: '',
    dimensionId: 'generations',
    source: '경향신문',
    publishedAt: '2026-01-21',
    participantCount: 892,
  },
  {
    id: '3',
    title: '주 52시간, 유연화냐 준수냐',
    summary:
      '경제계는 유연화를, 노동계는 철저한 준수를 요구합니다. 일과 삶의 균형, 그리고 기업 경쟁력 사이에서 우리는 무엇을 선택해야 할까요?',
    originalContent: '',
    neutralContent: '',
    dimensionId: 'work_life',
    source: '매일경제',
    publishedAt: '2026-01-20',
    participantCount: 567,
  },
  {
    id: '4',
    title: '차별금지법, 다양성과 전통 사이',
    summary:
      '포괄적 차별금지법 제정을 둘러싼 논쟁이 계속됩니다. 소수자 보호와 전통적 가치관, 공존할 수 있는 방법은 없을까요?',
    originalContent: '',
    neutralContent: '',
    dimensionId: 'culture',
    source: '한겨레',
    publishedAt: '2026-01-19',
    participantCount: 2341,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleIssuePress = (issueId: string) => {
    navigation.navigate('ArticleDetail', { issueId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>생각해보면</Text>
          <Text style={styles.headerSubtitle}>오늘의 이슈</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          바로 판단하지 말고, 한 번만 생각해보면 어떨까요?
        </Text>

        {MOCK_ISSUES.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onPress={() => handleIssuePress(issue.id)}
          />
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    ...typography.title,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  notificationIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
});
