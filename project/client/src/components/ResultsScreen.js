import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import QuizCard from './quiz/QuizCard';
import { getQuizQuestions, calculateScore } from '../services/quizService';

function ResultsScreen({ route, navigation }) {
  const { quizId, answers } = route.params;
  const questions = getQuizQuestions(quizId);
  const score = calculateScore(quizId, answers);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Quiz Results</Text>
        <Text style={styles.scoreText}>
          Score: {score} / {questions.length}
        </Text>
      </View>

      {questions.map((question, index) => (
        <View key={index} style={styles.questionCard}>
          <Text style={styles.questionText}>
            {index + 1}. {question.question}
          </Text>
          {question.options.map((option, optIndex) => (
            <Text
              key={optIndex}
              style={[
                styles.optionText,
                optIndex === question.correctAnswer
                  ? styles.correctAnswer
                  : answers[index] === optIndex
                  ? styles.wrongAnswer
                  : null,
              ]}
            >
              {option}
            </Text>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  scoreCard: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  questionCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 6,
  },
  correctAnswer: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  wrongAnswer: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  homeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultsScreen;
