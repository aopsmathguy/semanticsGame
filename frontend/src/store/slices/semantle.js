import { createSlice } from '@reduxjs/toolkit';
export const semantleSlice = createSlice({
  name: 'semantle',
  initialState: {
    guesses : {}
  },
  reducers: {
    setHints : (state, action)=>{
      const guesses = action.payload.guesses;
      state.guesses = {};
      for (const {guess, sim} of guesses){
        state.guesses[guess] = sim;
      }
    },
    setScoreGuess : (state, action) =>{
      const {guess, sim} = action.payload;
      state.guesses[guess] = sim;
    }
  },
});

export const { setHints, setScoreGuess } = semantleSlice.actions;

export const selectGuesses = state => state.semantle.guesses;
export default semantleSlice.reducer;
