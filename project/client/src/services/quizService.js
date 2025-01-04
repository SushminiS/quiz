// Simulated database for quiz questions
const quizData = {
  1: {
    questions: [
      {
        question: "What is the main function of proteins?",
        options: [
          "Energy storage",
          "Building and repairing tissues",
          "Temperature regulation",
          "Hormone production"
        ],
        correctAnswer: 1
      },
      // Add more questions here
    ]
  },
  // Add more quizzes here
};

// Simulated local storage for quiz attempts
let quizAttempts = {};

export const QuizService = {
  getQuizQuestions(quizId) {
    return quizData[quizId]?.questions || [];
  },

  async getPreviousAttempt(quizId) {
    return quizAttempts[quizId] || null;
  },

  async submitQuiz(quizId, answers) {
    quizAttempts[quizId] = answers;
    return true;
  },

  async resetQuiz(quizId) {
    delete quizAttempts[quizId];
    return true;
  },

  calculateScore(quizId, answers) {
    const questions = this.getQuizQuestions(quizId);
    return questions.reduce((score, question, index) => {
      return score + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  }
};


