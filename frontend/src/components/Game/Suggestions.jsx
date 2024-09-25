import React from "react";
import WordSuggestion from "./WordSuggestion.jsx";
import { StyledSuggestionsContainer } from "./styles.jsx";

function Suggestions({
    suggestions,
    highlightedSuggestion,
    onSuggestionClick,
    onSuggestionHover,
    suggestionRef,
    inputRef,
}) {
    return (
        <StyledSuggestionsContainer
            ref={suggestionRef}
            style={{
                position: "absolute",
                bottom: inputRef.current
                    ? inputRef.current.offsetHeight + "px"
                    : "auto", // Position above input
                left: inputRef.current
                    ? inputRef.current.offsetLeft + "px"
                    : "auto",
                width: inputRef.current
                    ? inputRef.current.offsetWidth + "px"
                    : "auto",
            }}
        >
            {suggestions.map((suggestion, index) => (
                <WordSuggestion
                    suggestion={suggestion}
                    highlighted={highlightedSuggestion === index}
                    key={index}
                    onClick={() => onSuggestionClick(suggestion.word)}
                    onMouseEnter={() => onSuggestionHover(index)}
                    onMouseLeave={() => onSuggestionHover(null)}
                />
            ))}
        </StyledSuggestionsContainer>
    );
}

export default Suggestions;