import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import questions from '../data/questions'; 

const API_URL = 'http://10.32.9.17:3000/api';

function QuizScreen({ route, navigation }) {
  const { quizId } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [previousAttempt, setPreviousAttempt] = useState(null);

  useEffect(() => {
    checkPreviousAttempt();
  }, []);

  const checkPreviousAttempt = async () => {
    try {
      const response = await axios.get(`${API_URL}/attempts/${quizId}`);
      if (response.data) {
        setPreviousAttempt(response.data);
      }
    } catch (error) {
      console.error('Error fetching previous attempt:', error);
    }
  };

  const handleAnswer = (optionIndex) => {
    if (previousAttempt) return;
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/attempts`, {
        quizId,
        answers,
      });
      navigation.replace('Results', { quizId, answers });
    } catch (error) {
      console.error('Error submitting quiz:', error.response || error.message);
      Alert.alert('Error', 'Failed to submit quiz: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleReset = async () => {
    try {
      await axios.delete(`${API_URL}/attempts/${quizId}`);
      setPreviousAttempt(null);
      setAnswers({});
    } catch (error) {
      Alert.alert('Error', 'Failed to reset quiz');
    }
  };

  return (
    <View style={styles.container}>
      {previousAttempt && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Quiz</Text>
        </TouchableOpacity>
      )}

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
        <Text style={styles.question}>{questions[currentQuestion].question}</Text>
        
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.option, answers[currentQuestion] === index && styles.selectedOption]}
            onPress={() => handleAnswer(index)}
            disabled={previousAttempt !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
          onPress={() => setCurrentQuestion(curr => curr - 1)}
          disabled={currentQuestion === 0}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        {currentQuestion < questions.length - 1 ? (
          <TouchableOpacity
            style={[styles.navButton, !answers[currentQuestion] && styles.disabledButton]} 
            onPress={() => setCurrentQuestion(curr => curr + 1)}
            disabled={!answers[currentQuestion]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={handleSubmit}
            disabled={previousAttempt !== null}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#2196F3',
  },
  optionText: {
    fontSize: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '45%',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizScreen;
