import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const quizzes = [
  { id: 1, title: 'Nutrition Basics' },
  { id: 2, title: 'Vitamins & Minerals' },
  { id: 3, title: 'Healthy Eating' },
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NutriMind</Text>
        <Text style={styles.tagline}>Test your nutrition knowledge</Text>
      </View>
      
      <ScrollView horizontal style={styles.scrollView}>
        {quizzes.map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            style={styles.quizCard}
            onPress={() => navigation.navigate('Quiz', { quizId: quiz.id })}
          >
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizInfo}>15 Questions</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  scrollView: {
    padding: 15,
  },
  quizCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginRight: 15,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  quizInfo: {
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;