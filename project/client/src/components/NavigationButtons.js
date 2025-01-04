import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function NavigationButtons({ onPrevious, onNext, onSubmit, isFirst, isLast }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isFirst && styles.disabledButton]}
        onPress={onPrevious}
        disabled={isFirst}
      >
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>

      {isLast ? (
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NavigationButtons;