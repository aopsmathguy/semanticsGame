import React, { useState, useEffect } from "react";
import {
    StyledOverlay,
    StyledGuessAreaOverlay,
    StyledGuessAreaOverlayContent,
} from "./styles";
//on gameState = "WAIT_START", show settings
//on gameState = "WAIT_ROUND_START", show round number with timer
//on gameState = "GUESSING", hide overlay
//on gameState = "ROUND_OVER", show target word and roundScores
//on gameState = "GAME_OVER", show final scores podium
import RoomSettings from "./RoomSettings";
import WaitRoundStart from "./WaitRoundStart";
import RoundEnd from "./RoundEnd";
import GameEnd from "./GameEnd";
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
    targetWord,
}) {
    return (
        <StyledOverlay hideOverlay={gameState == "GUESSING"} >
            <StyledGuessAreaOverlay hideOverlay={gameState == "GUESSING"} />
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != "WAIT_START"}
            >
                <RoomSettings
                    settings={settings}
                    onChangeSettings={onChangeSettings}
                    onStartGame={onStartGame}
                    isHost={hostId == playerId}
                />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != "WAIT_ROUND_START"}
            >
                <WaitRoundStart
                    gameState={gameState}
                    currentRound={currentRound}
                    timer={timer}
                />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != "ROUND_OVER"}
            >
                <RoundEnd
                    players={players}
                    targetWord={targetWord}
                    currentRound={currentRound}
                />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != "GAME_OVER"}
            >
                <GameEnd players={players} />
            </StyledGuessAreaOverlayContent>
        </StyledOverlay>
    );
}
export default GuessAreaOverlay;
