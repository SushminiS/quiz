import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import questions from '../src/data/questions'; // Importing questions.js

function ResultsScreen({ route, navigation }) {
  const { answers } = route.params; // Retrieve answers passed from QuizScreen.
  const [score, setScore] = useState(0);

  useEffect(() => {
    calculateScore();
  }, []);

  // Calculate the score based on the user's answers
  const calculateScore = () => {
    const totalScore = questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    setScore(totalScore);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Your Score</Text>
        <Text style={styles.scoreText}>
          {score} / {questions.length}
        </Text>
        
        {/* Displaying congratulations message if score is 10 or more */}
        {score >= 10 && (
          <Text style={styles.congratulationsText}>Congratulations! Great job!</Text>
        )}
      </View>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreSubtitle}>
          Below are the questions, your answers, and the correct answers.
        </Text>
      </View>

      {questions.map((question, qIndex) => (
        <View key={qIndex} style={styles.questionCard}>
          <Text style={styles.question}>
            {qIndex + 1}. {question.question}
          </Text>

          {question.options.map((option, oIndex) => (
            <View
              key={oIndex}
              style={[
                styles.option,
                oIndex === question.correctAnswer && styles.correctOption,
                answers[qIndex] === oIndex &&
                  oIndex !== question.correctAnswer &&
                  styles.wrongOption,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
              {oIndex === answers[qIndex] && (
                <Text style={styles.answerLabel}>
                  {oIndex === question.correctAnswer
                    ? '(Your Answer - Correct)'
                    : '(Your Answer - Incorrect)'}
                </Text>
              )}
              {oIndex === question.correctAnswer && (
                <Text style={styles.answerLabel}>(Correct Answer)</Text>
              )}
            </View>
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
    backgroundColor: '#f5f5f5',
  },
  scoreCard: {
    backgroundColor: '#2196F3',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  scoreText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  congratulationsText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  scoreSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  option: {
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#f44336',
  },
  optionText: {
    fontSize: 16,
  },
  answerLabel: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  homeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    margin: 15,
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
