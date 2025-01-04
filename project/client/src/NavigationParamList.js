// In JavaScript, we typically define the types as plain objects or comments to represent the navigation structure.
// Since JavaScript doesn't have type annotations like TypeScript, you can just describe your navigation parameters as constants.

export const MainStackParamList = {
  Home: undefined,
  Quiz: {
    quizId: 'number',  // Representing that quizId is a number, as TypeScript would
  },
  Results: {
    quizId: 'number',
    answers: 'object',  // We can specify that answers is an object (or record in TypeScript)
  },
};
