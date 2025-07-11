import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  Target,
  Brain,
  ChevronRight,
  Flame,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, change, color }) => (
  <View style={[styles.statsCard, { borderLeftColor: color }]}>
    <View style={styles.statsHeader}>
      {icon}
      <View style={styles.statsContent}>
        <Text style={styles.statsValue}>{value}</Text>
        <Text style={styles.statsTitle}>{title}</Text>
      </View>
    </View>
    {change && (
      <View style={styles.changeContainer}>
        <TrendingUp size={12} color="#059669" />
        <Text style={styles.changeText}>{change}</Text>
      </View>
    )}
  </View>
);

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  gradient: string[];
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, subtitle, onPress, gradient }) => (
  <TouchableOpacity style={styles.quickActionWrapper} onPress={onPress}>
    <LinearGradient colors={gradient} style={styles.quickAction}>
      <View style={styles.quickActionIcon}>{icon}</View>
      <View style={styles.quickActionContent}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={20} color="#FFFFFF" />
    </LinearGradient>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [streak, setStreak] = useState(5);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const quickActions = [
    {
      icon: <BookOpen size={24} color="#FFFFFF" />,
      title: 'Start Studying',
      subtitle: 'Upload documents and begin learning',
      gradient: ['#2563EB', '#1D4ED8'],
      onPress: () => router.push('/upload'),
    },
    {
      icon: <Brain size={24} color="#FFFFFF" />,
      title: 'Ask Questions',
      subtitle: 'Get AI-powered answers instantly',
      gradient: ['#059669', '#047857'],
      onPress: () => router.push('/chat'),
    },
    {
      icon: <Target size={24} color="#FFFFFF" />,
      title: 'Take Quiz',
      subtitle: 'Test your knowledge and track progress',
      gradient: ['#DC2626', '#B91C1C'],
      onPress: () => router.push('/quiz'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, Student! 👋</Text>
            <Text style={styles.subtitle}>Ready to learn something new today?</Text>
          </View>
          <View style={styles.streakContainer}>
            <Flame size={20} color="#F59E0B" />
            <Text style={styles.streakText}>{streak} day streak</Text>
          </View>
        </View>

        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(37, 99, 235, 0.8)', 'rgba(29, 78, 216, 0.9)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.heroTitle}>Your AI Study Companion</Text>
            <Text style={styles.heroSubtitle}>Upload, learn, and excel with personalized AI tutoring</Text>
          </LinearGradient>
        </View>

        {/* Progress Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.progressContainer}>
            <LinearGradient
              colors={['#EFF6FF', '#DBEAFE']}
              style={styles.progressCard}
            >
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Study Goal</Text>
                <Text style={styles.progressPercentage}>75%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%' }]} />
              </View>
              <Text style={styles.progressSubtitle}>3 of 4 sessions completed</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              icon={<BookOpen size={20} color="#2563EB" />}
              title="Documents"
              value="12"
              change="+3 this week"
              color="#2563EB"
            />
            <StatsCard
              icon={<Brain size={20} color="#059669" />}
              title="Questions Asked"
              value="89"
              change="+15 today"
              color="#059669"
            />
            <StatsCard
              icon={<Award size={20} color="#DC2626" />}
              title="Quiz Score"
              value="92%"
              change="+8% avg"
              color="#DC2626"
            />
            <StatsCard
              icon={<Clock size={20} color="#F59E0B" />}
              title="Study Time"
              value="2.5h"
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#EFF6FF' }]}>
                <BookOpen size={16} color="#2563EB" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Uploaded "Physics Chapter 5"</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#ECFDF5' }]}>
                <Brain size={16} color="#059669" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Asked 5 questions about thermodynamics</Text>
                <Text style={styles.activityTime}>Yesterday</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#FEF2F2' }]}>
                <Award size={16} color="#DC2626" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Completed quiz with 95% score</Text>
                <Text style={styles.activityTime}>2 days ago</Text>
              </View>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 4,
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
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
  progressContainer: {
    marginTop: 8,
  },
  progressCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsContent: {
    marginLeft: 12,
    flex: 1,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  statsTitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
    marginLeft: 4,
  },
  quickActionsContainer: {
    gap: 12,
  },
  quickActionWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '400',
  },
});