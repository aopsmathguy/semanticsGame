import React, { useState, useEffect } from "react";
import {
    StyledOverlay,
    StyledGuessAreaOverlay,
    StyledGuessAreaOverlayContent,
} from "./styles";
import { GAME_STATE } from "@common/gameState";
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
        settings: settings,
    });
    const [roundEndProps, setRoundEndProps] = useState({
        players: players,
        targetWord: targetWord,
        currentRound: currentRound,
        settings: settings,
    });
    const [gameEndProps, setGameEndProps] = useState({
        players: players,
    });
    useEffect(() => {
        switch (gameState){
            case GAME_STATE.WAIT_ROUND_START:
                setRoundStartProps({
                    currentRound,
                    timer,
                    settings
                });
                break;
            case GAME_STATE.ROUND_OVER:
                setRoundEndProps({
                    players,
                    targetWord,
                    currentRound,
                    settings
                });
                break;
            case GAME_STATE.GAME_OVER:
                setGameEndProps({
                    players,
                });
                break;
        }
    }, [gameState, currentRound, timer, players, targetWord, settings]);
    return (
        <StyledOverlay hideOverlay={gameState == GAME_STATE.GUESSING}>
            <StyledGuessAreaOverlay hideOverlay={gameState == GAME_STATE.GUESSING} />
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != GAME_STATE.WAIT_START}
            >
                <RoomSettings
                    settings={settings}
                    onChangeSettings={onChangeSettings}
                    onStartGame={onStartGame}
                    isHost={hostId === playerId}
                />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != GAME_STATE.WAIT_ROUND_START}
            >
                <WaitRoundStart {...roundStartProps} />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != GAME_STATE.ROUND_OVER}
            >
                <RoundEnd {...roundEndProps} />
            </StyledGuessAreaOverlayContent>
            <StyledGuessAreaOverlayContent
                hideOverlay={gameState != GAME_STATE.GAME_OVER}
            >
                <GameEnd {...gameEndProps} />
            </StyledGuessAreaOverlayContent>
        </StyledOverlay>
    );
}
export default GuessAreaOverlay;
