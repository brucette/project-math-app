import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operation: null,
  setNumber: null,
  questions: {},
  answers: null,
  currentProblemIndex: 0,
  gameOver: false,
  isCorrect: null
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    submitOperation: (state, action) => {
      state.operation = action.payload;

      if (state.operation === '+' || state.operation === '-') {
        state.setNumber = 1000;
      } else if (state.operation === '*' || state.operation === '/') {
        state.setNumber = 12;
      } else if (state.operation === 'eq' || state.operation === 'fr') {
        state.setNumber = 10;
      }
    },
    submitQuestion: (state, action) => {
      state.questions = action.payload;
      console.log('state.questions', state.questions)
    },
    submitAnswer: (state, action) => {
      state.answers = action.payload;

      // eslint-disable-next-line eqeqeq
      if (state.answers.replace(',', '.') == state.questions.answer) {
        state.isCorrect = true
      } else {
        state.isCorrect = false
      }
    },
    goToNextQuestion: (state) => {
      if (state.currentProblemIndex + 1 === 9) {
        state.gameOver = true
      } else {
        state.currentProblemIndex += 1
      }
    }
  }
});