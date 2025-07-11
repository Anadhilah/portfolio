import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react-native';

interface VoiceSession {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

export default function VoiceScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [sessions, setSessions] = useState<VoiceSession[]>([
    {
      id: '1',
      question: 'What is the law of thermodynamics?',
      answer: 'The laws of thermodynamics are fundamental principles that describe the behavior of energy in physical systems. The first law states that energy cannot be created or destroyed, only transformed from one form to another.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
    },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Voice Recording', 'Voice recording is not available on web platform. This would use speech recognition on mobile devices.');
      return;
    }
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate processing and getting an answer
    setTimeout(() => {
      const mockQuestion = 'Explain quantum mechanics in simple terms';
      const mockAnswer = 'Quantum mechanics is the branch of physics that describes the behavior of matter and energy at the atomic and subatomic level. Unlike classical physics, quantum mechanics shows us that particles can exist in multiple states simultaneously until they are observed.';
      
      const newSession: VoiceSession = {
        id: Date.now().toString(),
        question: mockQuestion,
        answer: mockAnswer,
        timestamp: new Date(),
      };
      
      setSessions(prev => [newSession, ...prev]);
      setCurrentAnswer(mockAnswer);
      
      if (isVoiceEnabled && Platform.OS !== 'web') {
        speakText(mockAnswer);
      }
    }, 2000);
  };

  const speakText = (text: string) => {
    if (Platform.OS === 'web') {
      Alert.alert('Text-to-Speech', 'Text-to-speech is not available on web platform');
      return;
    }

    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    Speech.speak(text, {
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      rate: 0.8,
      pitch: 1.0,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Voice Tutor</Text>
          <Text style={styles.subtitle}>
            Ask questions using your voice and get spoken responses
          </Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(37, 99, 235, 0.8)', 'rgba(29, 78, 216, 0.9)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.heroTitle}>Voice-Powered Learning</Text>
            <Text style={styles.heroSubtitle}>Speak naturally and get instant AI responses</Text>
          </LinearGradient>
        </View>

        {/* Voice Controls */}
        <View style={styles.section}>
          <View style={styles.controlsCard}>
            {/* Recording Button */}
            <View style={styles.recordingContainer}>
              <TouchableOpacity
                style={[
                  styles.recordButton,
                  isRecording && styles.recordButtonActive,
                ]}
                onPress={isRecording ? stopRecording : startRecording}
              >
                <LinearGradient
                  colors={isRecording ? ['#DC2626', '#B91C1C'] : ['#2563EB', '#1D4ED8']}
                  style={styles.recordGradient}
                >
                  {isRecording ? (
                    <MicOff size={32} color="#FFFFFF" />
                  ) : (
                    <Mic size={32} color="#FFFFFF" />
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={styles.recordingStatus}>
                {isRecording ? `Recording ${formatTime(recordingTime)}` : 'Tap to ask a question'}
              </Text>
            </View>

            {/* Voice Settings */}
            <View style={styles.settingsRow}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => setIsVoiceEnabled(!isVoiceEnabled)}
              >
                {isVoiceEnabled ? (
                  <Volume2 size={20} color="#2563EB" />
                ) : (
                  <VolumeX size={20} color="#64748B" />
                )}
                <Text style={[
                  styles.settingText,
                  { color: isVoiceEnabled ? '#2563EB' : '#64748B' }
                ]}>
                  Voice Responses
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Current Answer */}
        {currentAnswer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Latest Response</Text>
            <View style={styles.answerCard}>
              <View style={styles.answerHeader}>
                <Text style={styles.answerTitle}>AI Response</Text>
                <View style={styles.answerControls}>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => speakText(currentAnswer)}
                  >
                    {isSpeaking ? (
                      <Pause size={16} color="#2563EB" />
                    ) : (
                      <Play size={16} color="#2563EB" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setCurrentAnswer('')}
                  >
                    <RotateCcw size={16} color="#64748B" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.answerText}>{currentAnswer}</Text>
            </View>
          </View>
        )}

        {/* Voice History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice History</Text>
          <View style={styles.historyContainer}>
            {sessions.map((session) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                  <Text style={styles.sessionTime}>
                    {formatTimestamp(session.timestamp)}
                  </Text>
                  <TouchableOpacity
                    style={styles.speakButton}
                    onPress={() => speakText(session.answer)}
                  >
                    <Play size={14} color="#2563EB" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.questionContainer}>
                  <Text style={styles.questionLabel}>Question:</Text>
                  <Text style={styles.questionText}>{session.question}</Text>
                </View>
                
                <View style={styles.answerContainer}>
                  <Text style={styles.answerLabel}>Answer:</Text>
                  <Text style={styles.sessionAnswerText}>{session.answer}</Text>
                </View>
              </View>
            ))}
            
            {sessions.length === 0 && (
              <View style={styles.emptyState}>
                <Mic size={48} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>No voice sessions yet</Text>
                <Text style={styles.emptySubtitle}>
                  Start your first voice conversation with the AI tutor
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Voice Interaction Tips</Text>
            <View style={styles.tip}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Speak clearly and at normal pace</Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Ask specific questions about your documents</Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Use headphones for better audio quality</Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Tap the stop button when finished asking</Text>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
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
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
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
  controlsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recordingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  recordButton: {
    marginBottom: 16,
  },
  recordButtonActive: {
    transform: [{ scale: 1.05 }],
  },
  recordGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
  },
  settingText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  answerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  answerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  answerControls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  historyContainer: {
    gap: 12,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTime: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  speakButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    marginBottom: 12,
  },
  questionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  answerContainer: {
    marginBottom: 4,
  },
  answerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sessionAnswerText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
    lineHeight: 20,
  },
});