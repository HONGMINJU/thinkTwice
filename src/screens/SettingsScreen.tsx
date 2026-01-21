import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  showArrow = false,
  showSwitch = false,
  switchValue,
  onSwitchChange,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={showSwitch}
    activeOpacity={showSwitch ? 1 : 0.7}
  >
    <Text style={styles.settingIcon}>{icon}</Text>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {showArrow && <Text style={styles.settingArrow}>›</Text>}
    {showSwitch && (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: colors.border.light, true: colors.accent.primary }}
        thumbColor={colors.background.card}
      />
    )}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC = () => {
  const [issueNotification, setIssueNotification] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>설정</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 프로필</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="📝"
              title="닉네임 설정"
              subtitle="아직 설정되지 않음"
              showArrow
            />
            <SettingItem
              icon="🖼️"
              title="프로필 이미지"
              showArrow
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 알림</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="📰"
              title="이슈 알림"
              subtitle="새로운 이슈가 등록되면 알림"
              showSwitch
              switchValue={issueNotification}
              onSwitchChange={setIssueNotification}
            />
            <SettingItem
              icon="📊"
              title="주간 리포트"
              subtitle="매주 나의 가치 변화 리포트"
              showSwitch
              switchValue={weeklyReport}
              onSwitchChange={setWeeklyReport}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 앱 설정</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="🌙"
              title="다크 모드"
              showSwitch
              switchValue={darkMode}
              onSwitchChange={setDarkMode}
            />
            <SettingItem
              icon="🔤"
              title="폰트 크기"
              subtitle="보통"
              showArrow
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ 정보</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="📖"
              title="서비스 소개"
              showArrow
            />
            <SettingItem
              icon="📄"
              title="이용약관"
              showArrow
            />
            <SettingItem
              icon="🔒"
              title="개인정보처리방침"
              showArrow
            />
            <SettingItem
              icon="📱"
              title="버전 정보"
              subtitle="1.0.0"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>생각해보면 (Think Twice)</Text>
          <Text style={styles.footerSubtext}>
            바로 판단하지 말고, 한 번만 생각해보면
          </Text>
        </View>

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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  sectionContent: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    color: colors.text.primary,
  },
  settingSubtitle: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  settingArrow: {
    fontSize: 20,
    color: colors.text.tertiary,
  },
  logoutButton: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  logoutText: {
    ...typography.body,
    color: colors.accent.secondary,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  footerSubtext: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});
