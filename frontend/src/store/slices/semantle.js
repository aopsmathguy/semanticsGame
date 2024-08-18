import { createSlice } from '@reduxjs/toolkit';
export const semantleSlice = createSlice({
  name: 'semantle',
  initialState: {
    guesses : {},
    lastGuess : null
  },
  reducers: {
    setHints : (state, action)=>{
      const guesses = action.payload.guesses;
      state.guesses = {};
      for (const {guess, sim} of guesses){
        state.guesses[guess] = sim;
      }
      state.lastGuess = null;
    },
    setScoreGuess : (state, action) =>{
      const {guess, sim} = action.payload;
      state.guesses[guess] = sim;
      state.lastGuess = guess;
    }
  },
});

export const { setHints, setScoreGuess } = semantleSlice.actions;

export const selectGuesses = state => state.semantle.guesses;
export const selectLastGuess = state => {
  const word = state.semantle.lastGuess;
  if (!word){
    return null;
  }
  return {guess : word, sim : state.semantle.guesses[word]}
};
export default semantleSlice.reducer;
