import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Trophy,
  Play,
  CheckCircle,
  XCircle,
  RotateCcw,
  Target,
  Clock,
  Award,
  TrendingUp,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  id: string;
  title: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number;
}

export default function QuizScreen() {
  const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [quizHistory] = useState<QuizResult[]>([
    {
      id: '1',
      title: 'Physics Chapter 5 Quiz',
      score: 85,
      totalQuestions: 10,
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      timeSpent: 12,
    },
    {
      id: '2',
      title: 'Mathematics Review',
      score: 92,
      totalQuestions: 8,
      completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      timeSpent: 15,
    },
    {
      id: '3',
      title: 'Chemistry Basics',
      score: 78,
      totalQuestions: 12,
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      timeSpent: 18,
    },
  ]);

  const sampleQuiz: Question[] = [
    {
      id: '1',
      question: 'What is the first law of thermodynamics?',
      options: [
        'Energy cannot be created or destroyed',
        'Entropy always increases',
        'Heat flows from hot to cold',
        'Work equals force times distance',
      ],
      correctAnswer: 0,
      explanation: 'The first law of thermodynamics states that energy cannot be created or destroyed, only transformed from one form to another.',
    },
    {
      id: '2',
      question: 'Which of the following is a vector quantity?',
      options: [
        'Mass',
        'Temperature',
        'Velocity',
        'Energy',
      ],
      correctAnswer: 2,
      explanation: 'Velocity is a vector quantity because it has both magnitude and direction, unlike scalar quantities like mass, temperature, and energy.',
    },
    {
      id: '3',
      question: 'What is the speed of light in a vacuum?',
      options: [
        '3 × 10⁸ m/s',
        '3 × 10⁶ m/s',
        '3 × 10⁷ m/s',
        '3 × 10⁹ m/s',
      ],
      correctAnswer: 0,
      explanation: 'The speed of light in a vacuum is approximately 3 × 10⁸ meters per second, which is a fundamental constant in physics.',
    },
  ];

  const startQuiz = (quiz: Question[]) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setIsQuizActive(true);
    setStartTime(new Date());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      completeQuiz(newAnswers);
    }
  };

  const completeQuiz = (finalAnswers: number[]) => {
    const correctCount = finalAnswers.reduce((count, answer, index) => {
      return count + (answer === currentQuiz[index].correctAnswer ? 1 : 0);
    }, 0);

    const score = Math.round((correctCount / currentQuiz.length) * 100);
    const timeSpent = startTime ? Math.round((Date.now() - startTime.getTime()) / (1000 * 60)) : 0;

    setShowResult(true);
    setIsQuizActive(false);
  };

  const resetQuiz = () => {
    setCurrentQuiz([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setIsQuizActive(false);
    setStartTime(null);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#F59E0B';
    if (score >= 70) return '#EF4444';
    return '#6B7280';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  if (isQuizActive && !showResult) {
    const currentQuestion = currentQuiz[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.quizContainer}>
          {/* Quiz Header */}
          <View style={styles.quizHeader}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Question {currentQuestionIndex + 1} of {currentQuiz.length}
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </View>
            <TouchableOpacity style={styles.exitButton} onPress={resetQuiz}>
              <XCircle size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Question */}
          <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.optionSelected,
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                >
                  <View
                    style={[
                      styles.optionCircle,
                      selectedAnswer === index && styles.optionCircleSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLetter,
                        selectedAnswer === index && styles.optionLetterSelected,
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      selectedAnswer === index && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Next Button */}
          <View style={styles.nextContainer}>
            <TouchableOpacity
              style={[
                styles.nextButton,
                selectedAnswer === null && styles.nextButtonDisabled,
              ]}
              onPress={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              <LinearGradient
                colors={selectedAnswer !== null ? ['#2563EB', '#1D4ED8'] : ['#E2E8F0', '#CBD5E1']}
                style={styles.nextGradient}
              >
                <Text
                  style={[
                    styles.nextButtonText,
                    selectedAnswer === null && styles.nextButtonTextDisabled,
                  ]}
                >
                  {currentQuestionIndex < currentQuiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (showResult) {
    const correctCount = answers.reduce((count, answer, index) => {
      return count + (answer === currentQuiz[index].correctAnswer ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / currentQuiz.length) * 100);
    const timeSpent = startTime ? Math.round((Date.now() - startTime.getTime()) / (1000 * 60)) : 0;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Result Header */}
          <View style={styles.resultHeader}>
            <LinearGradient
              colors={['#2563EB', '#1D4ED8']}
              style={styles.resultGradient}
            >
              <Trophy size={48} color="#FFFFFF" />
              <Text style={styles.resultTitle}>Quiz Complete!</Text>
              <Text style={styles.resultScore}>{score}%</Text>
              <Text style={styles.resultGrade}>Grade: {getScoreGrade(score)}</Text>
            </LinearGradient>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <CheckCircle size={24} color="#10B981" />
              <Text style={styles.statValue}>{correctCount}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statCard}>
              <XCircle size={24} color="#EF4444" />
              <Text style={styles.statValue}>{currentQuiz.length - correctCount}</Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={24} color="#F59E0B" />
              <Text style={styles.statValue}>{timeSpent}m</Text>
              <Text style={styles.statLabel}>Time</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.resultActions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => startQuiz(sampleQuiz)}>
              <RotateCcw size={20} color="#2563EB" />
              <Text style={styles.actionButtonText}>Retake Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={resetQuiz}>
              <Trophy size={20} color="#059669" />
              <Text style={styles.actionButtonText}>Back to Quizzes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Quiz Center</Text>
          <Text style={styles.subtitle}>
            Test your knowledge and track your progress
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.quickStatsContainer}>
            <View style={[styles.quickStatCard, { borderLeftColor: '#2563EB' }]}>
              <Target size={20} color="#2563EB" />
              <Text style={styles.quickStatValue}>85%</Text>
              <Text style={styles.quickStatLabel}>Avg Score</Text>
            </View>
            <View style={[styles.quickStatCard, { borderLeftColor: '#059669' }]}>
              <Trophy size={20} color="#059669" />
              <Text style={styles.quickStatValue}>12</Text>
              <Text style={styles.quickStatLabel}>Completed</Text>
            </View>
            <View style={[styles.quickStatCard, { borderLeftColor: '#F59E0B' }]}>
              <TrendingUp size={20} color="#F59E0B" />
              <Text style={styles.quickStatValue}>+5%</Text>
              <Text style={styles.quickStatLabel}>This Week</Text>
            </View>
          </View>
        </View>

        {/* Start New Quiz */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start New Quiz</Text>
          <TouchableOpacity
            style={styles.newQuizCard}
            onPress={() => startQuiz(sampleQuiz)}
          >
            <LinearGradient
              colors={['#2563EB', '#1D4ED8']}
              style={styles.newQuizGradient}
            >
              <View style={styles.newQuizIcon}>
                <Play size={24} color="#FFFFFF" />
              </View>
              <View style={styles.newQuizContent}>
                <Text style={styles.newQuizTitle}>Physics Chapter 5</Text>
                <Text style={styles.newQuizSubtitle}>3 questions • ~5 minutes</Text>
              </View>
              <View style={styles.newQuizArrow}>
                <Play size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.generateContainer}>
            <Text style={styles.generateTitle}>Generate Custom Quiz</Text>
            <Text style={styles.generateSubtitle}>
              AI will create questions based on your uploaded documents
            </Text>
            <TouchableOpacity style={styles.generateButton}>
              <Text style={styles.generateButtonText}>Generate Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quiz History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Quizzes</Text>
          <View style={styles.historyContainer}>
            {quizHistory.map((result) => (
              <View key={result.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>{result.title}</Text>
                    <Text style={styles.historyTime}>{formatTime(result.completedAt)}</Text>
                  </View>
                  <View style={styles.historyScore}>
                    <Text
                      style={[
                        styles.historyScoreText,
                        { color: getScoreColor(result.score) },
                      ]}
                    >
                      {result.score}%
                    </Text>
                    <Text style={styles.historyGrade}>
                      {getScoreGrade(result.score)}
                    </Text>
                  </View>
                </View>
                <View style={styles.historyStats}>
                  <Text style={styles.historyStat}>
                    {Math.round((result.score / 100) * result.totalQuestions)}/{result.totalQuestions} correct
                  </Text>
                  <Text style={styles.historyStat}>•</Text>
                  <Text style={styles.historyStat}>{result.timeSpent}m</Text>
                </View>
              </View>
            ))}
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
  quickStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  newQuizCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  newQuizGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  newQuizIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  newQuizContent: {
    flex: 1,
  },
  newQuizTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  newQuizSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  newQuizArrow: {
    marginLeft: 12,
  },
  generateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  generateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  generateSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historyContainer: {
    gap: 12,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 12,
    color: '#64748B',
  },
  historyScore: {
    alignItems: 'flex-end',
  },
  historyScoreText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  historyGrade: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  historyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyStat: {
    fontSize: 12,
    color: '#64748B',
  },
  // Quiz Active Styles
  quizContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  exitButton: {
    padding: 8,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  optionSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionCircleSelected: {
    backgroundColor: '#2563EB',
  },
  optionLetter: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  optionLetterSelected: {
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 22,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#2563EB',
  },
  nextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nextButtonTextDisabled: {
    color: '#64748B',
  },
  // Result Styles
  resultHeader: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  resultGradient: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  resultGrade: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
});