import React, { useState, useEffect } from 'react';
import { StyledGuessAreaOverlay, StyledGuessAreaOverlayContent } from './styles';
//on gameState = "WAIT_START_GAME", show settings
//on gameState = "WAIT_ROUND_START", show round number with timer
//on gameState = "GUESSING", hide overlay
//on gameState = "WAIT_ROUND_END", show target word and roundScores
//on gameState = "WAIT_GAME_END", show final scores podium
import RoomSettings from './RoomSettings';
function GuessAreaOverlay({
    settings,
    onChangeSettings,
    onStartGame,
    gameState,
    currentRound,
    timer,
    playerId,
    players,
    hostId,
}) {
    const hidden = gameState == "GUESSING";
    return <>
        <StyledGuessAreaOverlay hidden={hidden}/>
        <StyledGuessAreaOverlayContent hidden={hidden}>
            <RoomSettings 
            settings={settings} onChangeSettings={onChangeSettings} onStartGame={onStartGame} isHost={hostId == playerId}/>
        </StyledGuessAreaOverlayContent>
    </>
}
export default GuessAreaOverlay;