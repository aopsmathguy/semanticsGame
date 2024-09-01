import React from "react";
import {
    StyledGameLayout,
    StyledGameBarWrapper,
    StyledGameContentWrapper,
    StyledPlayersSidebarWrapper,
    StyledGuessListAndInputWrapper,
    StyledChatWrapper,
} from "./styles";
import GameBar from "./GameBar";
import PlayerList from "./PlayerList";
import GuessArea from "./GuessArea";
import Chat from "./Chat";
function Game({ gameState,
    currentRound,
    timer,
    timerEmphasize, playerId, players, guesses, lastGuessHash, onGuess, messages, sendMessage, wordFuse }) {
    return (
        <StyledGameLayout>
            <StyledGameBarWrapper >
                <GameBar gameState={gameState} currentRound={currentRound} timer={timer} timerEmphasize={timerEmphasize} players={players} playerId={playerId}/>
            </StyledGameBarWrapper>
            <StyledGameContentWrapper>
                <StyledPlayersSidebarWrapper>
                    <PlayerList players={players} playerId={playerId}/>
                </StyledPlayersSidebarWrapper>
                <StyledGuessListAndInputWrapper>
                    <GuessArea guesses={guesses} lastGuessHash={lastGuessHash} players={players} onGuess={onGuess} wordFuse={wordFuse}/>
                </StyledGuessListAndInputWrapper>
                <StyledChatWrapper>
                    <Chat messages={messages} sendMessage={sendMessage} />
                </StyledChatWrapper>
            </StyledGameContentWrapper>
        </StyledGameLayout>
    );
}
export default Game;
