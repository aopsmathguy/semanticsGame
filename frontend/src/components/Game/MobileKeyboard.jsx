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
    const [layoutName, setLayoutName] = useState("default");
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
    const handleKeyPress = (button) => {
        if (button === "{ent}") {
            if (input.length === 0) return;
            onGuess({ word: input });
            setInput("");
            keyboard.current.setInput("");
            setShowSuggestions(false);
        } else if (button === "{shift}") {
            setLayoutName(layoutName === "default" ? "shift" : "default");
        } else if (button === "{numbers}") {
            setLayoutName("numbers");
        } else if (button === "{abc}") {
            setLayoutName("default");
        }
    }
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
                layout={{
                    default: [
                      "q w e r t y u i o p",
                      "a s d f g h j k l",
                      "{shift} z x c v b n m {backspace}",
                      "{numbers} {space} {ent}"
                    ],
                    shift: [
                      "Q W E R T Y U I O P",
                      "A S D F G H J K L",
                      "{shift} Z X C V B N M {backspace}",
                      "{numbers} {space} {ent}"
                    ],
                    numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
                }}
                display={{
                    "{space}": " ",
                    "{numbers}": "123",
                    "{ent}": "↵",
                    "{backspace}": "⌫",
                    "{shift}": "⇧",
                    "{abc}": "ABC"
                }}
                layoutName={layoutName}
                keyboardRef={(r) => (keyboard.current = r)}
                onChange={(value) => {
                    setInput(value);
                    setShowSuggestions(true);
                }}
                onKeyPress={handleKeyPress}
            />}
        </MobileInputContainer>
    );
}
export default MobileKeyboard;
