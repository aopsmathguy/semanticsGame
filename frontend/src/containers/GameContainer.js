//game screen
import React, { useEffect, useState, useRef } from "react";
import Game from "../components/Game/Game";
import { words } from "../common/word_list";
import Fuse from "fuse.js";

import { useSelector } from "react-redux";
import {
    selectGameState,
    selectRoomName,
    selectTimer,
    selectTimerEmphasize,
    selectHostId,
    selectPlayerId,
    selectPlayers,
    selectSettings,
    selectCurrentRound,
    selectGuesses,
    selectLastGuessHash,
    selectTargetWord,
    selectChatMessages,
} from "../redux/slices/game";

import useSocket from "../ws";
function GameContainer() {
    const wordFuse = useRef(new Fuse(words, { includeMatches: true }));
    const gameState = useSelector(selectGameState);
    const roomName = useSelector(selectRoomName);
    const timer = useSelector(selectTimer);
    const timerEmphasize = useSelector(selectTimerEmphasize);
    const hostId = useSelector(selectHostId);
    const playerId = useSelector(selectPlayerId);
    const players = useSelector(selectPlayers);
    const settings = useSelector(selectSettings);
    const currentRound = useSelector(selectCurrentRound);
    const guesses = useSelector(selectGuesses);
    const lastGuessHash = useSelector(selectLastGuessHash);
    const targetWord = useSelector(selectTargetWord);
    const messages = useSelector(selectChatMessages);

    const socket = useSocket();
    const onChangeSettings = socket.emitSettingsChange;
    const onLeaveRoom = socket.emitLeaveRoom;
    const onStartGame = socket.emitStartGame;
    const onGuess = socket.emitGuess;
    const sendMessage = socket.emitChatMessage;

    return (
        <>
            {gameState != null ? (
                <Game
                    gameState={gameState}
                    roomName={roomName}
                    timer={timer}
                    timerEmphasize={timerEmphasize}
                    hostId={hostId}
                    playerId={playerId}
                    players={players}
                    settings={settings}
                    onChangeSettings={onChangeSettings}
                    onLeaveRoom={onLeaveRoom}
                    onStartGame={onStartGame}
                    currentRound={currentRound}
                    guesses={guesses}
                    lastGuessHash={lastGuessHash}
                    onGuess={onGuess}
                    targetWord={targetWord}
                    messages={messages}
                    sendMessage={sendMessage}
                    wordFuse={wordFuse}
                />
            ) : null}
        </>
    );
}
export default GameContainer;
