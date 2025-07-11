import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Award,
  BookOpen,
  Clock,
  Target,
  ChevronRight,
  Moon,
  Volume2,
  Smartphone,
} from 'lucide-react-native';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onValueChange?: (value: boolean) => void;
}

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [voiceResponses, setVoiceResponses] = useState(true);

  const userStats = [
    {
      icon: <BookOpen size={20} color="#2563EB" />,
      label: 'Documents',
      value: '12',
      color: '#2563EB',
    },
    {
      icon: <Target size={20} color="#059669" />,
      label: 'Questions Asked',
      value: '89',
      color: '#059669',
    },
    {
      icon: <Award size={20} color="#F59E0B" />,
      label: 'Quizzes Taken',
      value: '15',
      color: '#F59E0B',
    },
    {
      icon: <Clock size={20} color="#DC2626" />,
      label: 'Study Hours',
      value: '24.5',
      color: '#DC2626',
    },
  ];

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Get notified about quiz reminders and study streaks',
          icon: <Bell size={20} color="#64748B" />,
          type: 'toggle',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          id: 'voice',
          title: 'Voice Responses',
          subtitle: 'Enable audio responses in voice chat',
          icon: <Volume2 size={20} color="#64748B" />,
          type: 'toggle',
          value: voiceResponses,
          onValueChange: setVoiceResponses,
        },
        {
          id: 'theme',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: <Moon size={20} color="#64748B" />,
          type: 'toggle',
          value: darkMode,
          onValueChange: setDarkMode,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'edit-profile',
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          icon: <Edit size={20} color="#64748B" />,
          type: 'navigation',
          onPress: () => console.log('Edit profile'),
        },
        {
          id: 'privacy',
          title: 'Privacy & Security',
          subtitle: 'Manage your privacy settings',
          icon: <Shield size={20} color="#64748B" />,
          type: 'navigation',
          onPress: () => console.log('Privacy settings'),
        },
        {
          id: 'devices',
          title: 'Connected Devices',
          subtitle: 'Manage your logged-in devices',
          icon: <Smartphone size={20} color="#64748B" />,
          type: 'navigation',
          onPress: () => console.log('Connected devices'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help or contact support',
          icon: <HelpCircle size={20} color="#64748B" />,
          type: 'navigation',
          onPress: () => console.log('Help & Support'),
        },
      ],
    },
    {
      title: 'Account Actions',
      items: [
        {
          id: 'logout',
          title: 'Sign Out',
          subtitle: 'Sign out of your account',
          icon: <LogOut size={20} color="#DC2626" />,
          type: 'action',
          onPress: () => {
            Alert.alert(
              'Sign Out',
              'Are you sure you want to sign out?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Sign out') },
              ]
            );
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    switch (item.type) {
      case 'toggle':
        return (
          <View key={item.id} style={styles.settingItem}>
            <View style={styles.settingIcon}>{item.icon}</View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
              thumbColor={item.value ? '#2563EB' : '#F1F5F9'}
            />
          </View>
        );
      
      case 'navigation':
      case 'action':
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            <View style={styles.settingIcon}>{item.icon}</View>
            <View style={styles.settingContent}>
              <Text style={[
                styles.settingTitle,
                item.id === 'logout' && styles.settingTitleDanger,
              ]}>
                {item.title}
              </Text>
              {item.subtitle && (
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#2563EB', '#1D4ED8']}
            style={styles.profileGradient}
          >
            <View style={styles.profileAvatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.profileName}>Student Name</Text>
            <Text style={styles.profileEmail}>student@example.com</Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color="#2563EB" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            {userStats.map((stat, index) => (
              <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                <View style={styles.statHeader}>
                  {stat.icon}
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievement Badge */}
        <View style={styles.section}>
          <View style={styles.achievementCard}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.achievementGradient}
            >
              <Award size={24} color="#FFFFFF" />
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Study Streak Champion</Text>
                <Text style={styles.achievementSubtitle}>5 days in a row! Keep it up!</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <View style={styles.settingsGroup}>
              {group.items.map((item) => renderSettingItem(item))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.section}>
          <View style={styles.appInfo}>
            <Text style={styles.appName}>Study Buddy</Text>
            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Text style={styles.appCopyright}>© 2024 Study Buddy. All rights reserved.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileGradient: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    marginLeft: 4,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  achievementCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  achievementGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  achievementContent: {
    flex: 1,
    marginLeft: 16,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingTitleDanger: {
    color: '#DC2626',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 18,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  appCopyright: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});