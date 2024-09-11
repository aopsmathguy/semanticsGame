import React from "react";
import { StyledGuessAreaContainer } from "./styles";
import GuessList from "./GuessList";
import GuessInput from "./GuessInput";
function GuessArea({guesses, lastGuessHash, onGuess, wordFuse, players}) {
    return <StyledGuessAreaContainer>
        <GuessList guesses={guesses} lastGuessHash={lastGuessHash} players={players}/>
        <GuessInput onGuess={onGuess} wordFuse={wordFuse}/>
    </StyledGuessAreaContainer>;
}
export default GuessArea;