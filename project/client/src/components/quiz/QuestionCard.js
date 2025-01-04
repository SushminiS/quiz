import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function QuestionCard({ question, selectedAnswer, onSelectAnswer, isReview, correctAnswer }) {
  const getOptionStyle = (index) => {
    if (!isReview) return selectedAnswer === index ? styles.selectedOption : styles.option;
    
    if (index === correctAnswer) return styles.correctOption;
    if (selectedAnswer === index && index !== correctAnswer) return styles.wrongOption;
    return styles.option;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getOptionStyle(index)}
          onPress={() => !isReview && onSelectAnswer(index)}
          disabled={isReview}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  question: {
    fontSize: 18,
    marginBottom: 15,
  },
  option: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    marginBottom: 10,
  },
  correctOption: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginBottom: 10,
  },
  wrongOption: {
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default QuestionCard;