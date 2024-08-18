import React, { useState, useRef, useEffect } from 'react';
import WordSuggestion from './WordSuggestion.js';
import {StyledSuggestionsContainer} from './styles';
function GuessInput({ onGuess, wordFuse }) {
  const [currGuess, setCurrGuess] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);
  const suggestionRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = wordFuse.current
    .search(currGuess)
    .slice(0, 10)
    .map((a) => ({
      word: a.item,
      indices: a.matches[0].indices,
    }));

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        setCurrGuess(currGuess + '\n');
      } else {
        event.preventDefault();
        let guess = currGuess;
        if (highlightedSuggestion !== null) {
          guess = suggestions[highlightedSuggestion].word;
        }
        setCurrGuess('');
        setHighlightedSuggestion(null);
        setShowSuggestions(false);
        onGuess(guess);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedSuggestion((prev) =>
        prev === null || prev === suggestions.length - 1 ? 0 : prev + 1
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedSuggestion((prev) =>
        prev === null || prev === 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (event.key === 'Tab') {
      event.preventDefault();
      setHighlightedSuggestion((prev) =>
        prev === null || prev === suggestions.length - 1 ? 0 : prev + 1
      );
    }
  };

  const onChange = (e) => {
    setShowSuggestions(true);
    setCurrGuess(e.target.value);
    setHighlightedSuggestion(null);
  };

  const handleClickOutside = (event) => {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        ref={inputRef}
        value={currGuess}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        onFocus={() => setShowSuggestions(true)}
      />

      {showSuggestions && currGuess.length > 0 && (
        <StyledSuggestionsContainer
          ref={suggestionRef}
          style={{
            position: 'absolute',
            top: inputRef.current ? inputRef.current.offsetHeight + 'px' : 'auto',
            left: 0,
            width: inputRef.current ? inputRef.current.offsetWidth + 'px' : 'auto',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <WordSuggestion
              suggestion={suggestion}
              highlighted={highlightedSuggestion === index}
              key={index}
              onClick={() => {
                setCurrGuess(suggestion.word);
                setShowSuggestions(false);
                onGuess(suggestion.word);
              }}
              onMouseEnter={() => setHighlightedSuggestion(index)}
              onMouseLeave={() => setHighlightedSuggestion(null)}
            />
          ))}
        </StyledSuggestionsContainer>
      )}
    </div>
  );
}

export default GuessInput;