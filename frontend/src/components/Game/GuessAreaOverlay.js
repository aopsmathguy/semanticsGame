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
    const [roundStartProps, setRoundStartProps] = useState({
        currentRound: currentRound,
        timer: timer,
    });
    const [roundEndProps, setRoundEndProps] = useState({
        players: players,
        targetWord: targetWord,
        currentRound: currentRound,
    });
    const [gameEndProps, setGameEndProps] = useState({
        players: players,
    });
    useEffect(() => {
        if (gameState == "WAIT_ROUND_START") {
            setRoundStartProps({
                currentRound,
                timer,
            });
        }
        if (gameState == "ROUND_OVER") {
            setRoundEndProps({
                players,
                targetWord,
                currentRound,
            });
        }
        if (gameState == "GAME_OVER") {
            setGameEndProps({
                players,
            });
        }
    }, [gameState, currentRound, timer, players, targetWord]);
    return (
        <StyledOverlay hideOverlay={gameState == "GUESSING"}>
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
                <WaitRoundStart {...roundStartProps} />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != "ROUND_OVER"}
            >
                <RoundEnd {...roundEndProps} />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != "GAME_OVER"}
            >
                <GameEnd {...gameEndProps} />
            </StyledGuessAreaOverlayContent>
        </StyledOverlay>
    );
}
export default GuessAreaOverlay;
