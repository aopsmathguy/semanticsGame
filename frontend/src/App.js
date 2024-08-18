import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { words } from './common/word_list';
import Fuse from 'fuse.js'
import './App.css';

import { 
  onHints,
  onScoreGuess, sendMakeGuess
} from './ws';
import { 
  setHints,
  setScoreGuess, selectGuesses,
  selectLastGuess
} from './store/slices/semantle';

function TextBoldIndices({word, indices}){
  const components = [];
  let startIdx = 0;
  for (const [start, end] of indices){
    if (startIdx != start){
      components.push({bold : false, text : word.substring(startIdx, start)});
    }
    components.push({bold : true, text : word.substring(start, end + 1)});
    startIdx = end + 1;
  }
  if (startIdx != word.length){
    components.push({bold : false, text : word.substring(startIdx, word.length)});
  }
  return <>
    {components.map(({bold, text}, i)=>{
      return bold ? <b>{text}</b> : <>{text}</>;
    })}
  </>
}
function App() {
  const dispatch = useDispatch();
  const guesses = useSelector(selectGuesses);
  const lastGuess = useSelector(selectLastGuess);
  const wordFuse = useRef(new Fuse(words, {includeMatches: true}));
  const [currGuess, setCurrGuess] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);
  const suggestionRef = useRef(null); // Ref for the suggestions box
  const inputRef = useRef(null); // Ref for the input box

  const suggestions = wordFuse.current.search(currGuess).slice(0, 10).map(a => {return {word : a.item, indices : a.matches[0].indices}});

  useEffect(()=>{
    return onScoreGuess((data)=>{
      dispatch(setScoreGuess(data));
    });
  }, [dispatch]); 
  useEffect(()=>{
    return onHints((data)=>{
      dispatch(setHints(data));
    });
  }, [dispatch]); 

  const doGuess = function(guess){
    sendMakeGuess({guess});
    setCurrGuess('');
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.ctrlKey) {
        setCurrGuess(currGuess + "\n");
      } else {
        event.preventDefault();
        let guess = currGuess;
        if (highlightedSuggestion !== null) {
          guess = suggestions[highlightedSuggestion].word;
        } 
        setCurrGuess('');
        setHighlightedSuggestion(null);
        setShowSuggestions(false);
        doGuess(guess);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedSuggestion((prev) => (prev === null || prev === suggestions.length - 1) ? 0 : prev + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedSuggestion((prev) => (prev === null || prev === 0) ? suggestions.length - 1 : prev - 1);
    } else if (event.key === "Tab") {
      event.preventDefault();
      setHighlightedSuggestion((prev) => (prev === null || prev === suggestions.length - 1) ? 0 : prev + 1);
    }
  };
  const onChange = function(e) { 
    setShowSuggestions(true);
    setCurrGuess(e.target.value)
    setHighlightedSuggestion(null);
  }
  // Function to handle clicks outside of the suggestions box
  const handleClickOutside = (event) => {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the suggestions box
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="App" style={{margin : "10px"}}>
      <div style={{display: 'flex'}}>
        {/* Table for guesses */}
        <table cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <td width="150px"><b>Word</b></td>
              <td width="50px"><b>Similarity</b></td>
              <td width="200px"></td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(guesses).sort((a, b)=> b[1] - a[1]).map(([guess, sim]) => (
              <tr key={guess} style={{
                backgroundColor: guess === lastGuess?.guess ? 'lightgreen' : 'white'
              }}>
                <td>{guess}</td>
                <td>{Math.round(100 * sim)}%</td>
                <td>
                  <div style={{
                    width: `${sim * 100}%`, 
                    backgroundColor: `hsl(${sim**0.5 * 100}, 100%, 50%)`, 
                    height: '20px',
                    margin : '5px 0px',
                    border : '2px solid black'
                  }}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input 
            ref={inputRef}
            value={currGuess} 
            onKeyDown={handleKeyDown} 
            onChange={onChange}
            onFocus={() => setShowSuggestions(true)}
          />

          {showSuggestions && currGuess.length > 0 && (
            <div 
              className="suggestions-box" 
              ref={suggestionRef}
              style={{
                position: 'absolute',
                top: inputRef.current ? inputRef.current.offsetHeight + 'px' : 'auto',
                left: 0,
                width: inputRef.current ? inputRef.current.offsetWidth + 'px' : 'auto',
              }}
            > 
              {suggestions.map((suggestion, index) => (
                <div style={{
                  width: '100%',
                  background: highlightedSuggestion === index ? 'lightgray' : 'white'
                }}>
                  <button 
                    key={index} 
                    onClick={() => {
                      setCurrGuess(suggestion.word);
                      setShowSuggestions(false);
                      doGuess(suggestion.word);
                    }}
                    onMouseEnter={() => setHighlightedSuggestion(index)}
                    onMouseLeave={() => setHighlightedSuggestion(null)}
                  >
                    <TextBoldIndices word={suggestion.word} indices={suggestion.indices}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default App;