import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.32.9.17:3000/api';


const demoQuestion = {
  question: 'What is the main function of proteins?',
  options: [
    'Energy storage',
    'Building and repairing tissues',
    'Temperature regulation',
    'Hormone production',
  ],
  correctAnswer: 1,
};

function ResultsScreen({ route, navigation }) {
  const { quizId, answers } = route.params;
  const questions = Array(5).fill(demoQuestion);
  const [score, setScore] = useState(0);

  useEffect(() => {
    calculateScore();
  }, []);

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
        <Text style={styles.scoreText}>{score} / {questions.length}</Text>
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
                styles.wrongOption
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
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