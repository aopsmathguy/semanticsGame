import React, { useState, useRef, useEffect } from "react";
import Suggestions from "./Suggestions.jsx"; // Import the new component
import {
    StyledGuessInputContainer,
    StyledGuessInput,
} from "./styles.jsx";

function GuessInput({ onGuess, wordFuse }) {
    const [currGuess, setCurrGuess] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);
    const suggestionRef = useRef(null);
    const inputRef = useRef(null);

    const suggestions = wordFuse.current
        .search(currGuess)
        .slice(0, 5)
        .map((a) => ({
            word: a.item,
            indices: a.matches[0].indices,
        }));

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (currGuess.trim() === "") {
                return;
            }
            let guess = currGuess;
            if (highlightedSuggestion !== null) {
                guess = suggestions[highlightedSuggestion].word;
            }
            setCurrGuess("");
            setHighlightedSuggestion(null);
            setShowSuggestions(false);
            onGuess({ word: guess });
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedSuggestion((prev) =>
                prev === null || prev === suggestions.length - 1 ? 0 : prev + 1
            );
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedSuggestion((prev) =>
                prev === null || prev === 0 ? suggestions.length - 1 : prev - 1
            );
        } else if (event.key === "Tab") {
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
        if (
            suggestionRef.current &&
            !suggestionRef.current.contains(event.target)
        ) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleSuggestionClick = (word) => {
        setCurrGuess("");
        setShowSuggestions(false);
        onGuess({ word });
        inputRef.current.focus();
    };

    const handleSuggestionHover = (index) => {
        setHighlightedSuggestion(index);
    };

    return (
        <StyledGuessInputContainer>
            <StyledGuessInput
                ref={inputRef}
                value={currGuess}
                onKeyDown={handleKeyDown}
                onChange={onChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter guess"
            />
            {showSuggestions && currGuess.length > 0 && (
                <Suggestions 
                    suggestionRef={suggestionRef}
                    suggestions={suggestions}
                    highlightedSuggestion={highlightedSuggestion}
                    onSuggestionClick={handleSuggestionClick}
                    onSuggestionHover={handleSuggestionHover}
                    inputRef={inputRef}
                />
            )}
        </StyledGuessInputContainer>
    );
}

export default GuessInput;
