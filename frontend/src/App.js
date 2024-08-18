import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { words } from './common/word_list';
import Fuse from 'fuse.js';
import './App.css';

import { onHints, onScoreGuess, sendMakeGuess } from './ws';
import {
  setHints,
  setScoreGuess,
  selectGuesses,
  selectLastGuess,
} from './store/slices/semantle';

import GuessTable from './components/GuessTable';
import GuessInput from './components/GuessInput';

function App() {
  const dispatch = useDispatch();
  const guesses = useSelector(selectGuesses);
  const lastGuess = useSelector(selectLastGuess);
  const wordFuse = useRef(new Fuse(words, { includeMatches: true }));

  useEffect(() => {
    return onScoreGuess((data) => {
      dispatch(setScoreGuess(data));
    });
  }, [dispatch]);

  useEffect(() => {
    return onHints((data) => {
      dispatch(setHints(data));
    });
  }, [dispatch]);

  const doGuess = (guess) => {
    sendMakeGuess({ guess });
  };

  return (
    <div className="App" style={{ margin: '10px' }}>
      <div style={{ display: 'flex' }}>
        <GuessTable guesses={guesses} lastGuess={lastGuess} />
        <GuessInput onGuess={doGuess} wordFuse={wordFuse} />
      </div>
    </div>
  );
}

export default App;