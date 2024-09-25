import React, { useRef, useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {
    MobileInputContainer,
    MobileInputSuggestionsWrapper,
    StyledCursor,
    StyledGuessInputMobile,
    StyledSuggestionsContainer,
} from "./styles";

import Suggestions from "./Suggestions";
function MobileKeyboard({ onGuess, wordFuse }) {
    const [input, setInput] = useState("");
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const suggestionRef = useRef(null);
    const keyboard = useRef(null);

    const suggestions = wordFuse.current
        .search(input)
        .slice(0, 5)
        .map((a) => ({
            word: a.item,
            indices: a.matches[0].indices,
        }));

    const handleSuggestionClick = (word) => {
        setInput("");
        setShowSuggestions(false);
        onGuess({ word });
        keyboard.current.setInput(""); // Set keyboard input as well
    };

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            inputRef.current.contains(event.target) ||
            suggestionRef.current &&
            suggestionRef.current.contains(event.target) ||
            keyboard.current &&
            keyboard.current.keyboardDOM &&
            keyboard.current.keyboardDOM.contains(event.target) 
        ) {
            //do nothing
        } else {
            setShowKeyboard(false);
            setShowSuggestions(false);
        }
    };
    useEffect(() => {
        if (showKeyboard) {
            keyboard.current.setInput(input);
        }
    },[showKeyboard]);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <MobileInputContainer>
            <MobileInputSuggestionsWrapper>
                <StyledGuessInputMobile ref={inputRef} 
                    onClick={() => setShowKeyboard(true)}
                >
                    {input}{showKeyboard && <StyledCursor />}
                </StyledGuessInputMobile>
                {showSuggestions && input.length > 0 && (
                    <Suggestions
                        suggestionRef={suggestionRef}
                        suggestions={suggestions}
                        highlightedSuggestion={null}
                        onSuggestionClick={handleSuggestionClick}
                        onSuggestionHover={() => {}}
                        inputRef={inputRef}
                    />
                )}
            </MobileInputSuggestionsWrapper>
            {showKeyboard && <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
                layout={{
                    default: [
                        "q w e r t y u i o p",
                        "a s d f g h j k l",
                        "{space} z x c v b n m {bksp}",
                        "{space} {enter}",
                    ],
                }}
                onChange={(value) => {
                    setInput(value);
                    setShowSuggestions(true);
                }}
                onKeyPress={(button) => {
                    if (button === "{enter}") {
                        if (input.length === 0) return;
                        onGuess({ word: input });
                        setInput("");
                        keyboard.current.setInput("");
                        setShowSuggestions(false);
                    }
                }}
            />}
        </MobileInputContainer>
    );
}
export default MobileKeyboard;
