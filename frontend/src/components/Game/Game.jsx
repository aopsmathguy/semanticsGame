import React from "react";
import {
    StyledGameLayout,
    StyledRoomBarWrapper,
    StyledGameBarWrapper,
    StyledPlayersSidebarWrapper,
    StyledGuessListAndInputWrapper,
    StyledChatWrapper,
    StyledKeyboardWrapper
} from "./styles";
import RoomBar from "./RoomBar";
import GameBar from "./GameBar";
import PlayerList from "./PlayerList";
import GuessArea from "./GuessArea";
import Chat from "./Chat";
import GuessAreaOverlay from "./GuessAreaOverlay";
import MobileKeyboard from "./MobileKeyboard";

function Game({
    gameState,
    roomName,
    timer,
    timerEmphasize,
    hostId,
    playerId,
    players,
    settings,
    onChangeSettings,
    onLeaveRoom,
    onStartGame,
    currentRound,
    guesses,
    lastGuessHash,
    onGuess,
    targetWord,
    messages,
    sendMessage,
    wordFuse,
}) {
    return (
        <StyledGameLayout>
            <StyledRoomBarWrapper>
                <RoomBar roomName={roomName} onLeave={onLeaveRoom} />
            </StyledRoomBarWrapper>
            <StyledGameBarWrapper>
                <GameBar
                    gameState={gameState}
                    currentRound={currentRound}
                    timer={timer}
                    timerEmphasize={timerEmphasize}
                    players={players}
                    playerId={playerId}
                    targetWord={targetWord}
                    settings={settings}
                />
            </StyledGameBarWrapper>
            <StyledPlayersSidebarWrapper>
                <PlayerList
                    players={players}
                    playerId={playerId}
                    hostId={hostId}
                />
            </StyledPlayersSidebarWrapper>
            <StyledGuessListAndInputWrapper>
                <GuessArea
                    guesses={guesses}
                    lastGuessHash={lastGuessHash}
                    players={players}
                    onGuess={onGuess}
                    wordFuse={wordFuse}
                />
                <GuessAreaOverlay
                    settings={settings}
                    onChangeSettings={onChangeSettings}
                    onStartGame={onStartGame}
                    gameState={gameState}
                    currentRound={currentRound}
                    timer={timer}
                    playerId={playerId}
                    players={players}
                    hostId={hostId}
                    targetWord={targetWord}
                />
            </StyledGuessListAndInputWrapper>
            <StyledChatWrapper>
                <Chat
                    messages={messages}
                    sendMessage={sendMessage}
                    players={players}
                    playerId={playerId}
                />
            </StyledChatWrapper>
            <StyledKeyboardWrapper>
                <MobileKeyboard onGuess={onGuess} wordFuse={wordFuse} />
            </StyledKeyboardWrapper>
        </StyledGameLayout>
    );
}
export default Game;
