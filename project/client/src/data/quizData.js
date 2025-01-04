export const quizzes = [
  { id: 1, title: 'Nutrition Basics' },
  { id: 2, title: 'Vitamins & Minerals' },
  { id: 3, title: 'Healthy Eating' },
];

export const demoQuestion = {
  question: 'What is the main function of proteins?',
  options: [
    'Energy storage',
    'Building and repairing tissues',
    'Temperature regulation',
    'Hormone production',
  ],
  correctAnswer: 1,
};

// Generate 15 questions using the demo question for each quiz
export const quizQuestions = {
  1: Array(15).fill(demoQuestion),
  2: Array(15).fill(demoQuestion),
  3: Array(15).fill(demoQuestion),
};