import React from "react";
import { StyledGameBarContainer, StyledGameBarPlayerAvatar } from "./styles";
import Timer from "./Timer";
import Avatar from "../Shared/Avatar";

function GameBar({
    gameState,
    currentRound,
    timer,
    timerEmphasize,
    players,
    playerId,
    targetWord,
    settings
}) {
    const { profile } = players[playerId];
    const { name, avatar } = profile;
    const { numberOfRounds } = settings;
    const state = (() => {
        switch (
            gameState //'WAIT_START' | 'WAIT_ROUND_START' | 'GUESSING' | 'WAIT_ROUND_END' | 'WAIT_GAME_END'
        ) {
            case "WAIT_START":
                return "Waiting for host to start...";
            case "WAIT_ROUND_START":
                return "Round starting soon...";
            case "GUESSING":
                return targetWord;
            case "ROUND_OVER":
                return targetWord;
            case "GAME_OVER":
                return "Game over!";
            default:
                return "Unknown state";
        }
    })();
    return (
        <div style={{position:"relative", "width" : "100%", height : "100%"}}>
            <StyledGameBarContainer>
                <Timer timer={timer} timerEmphasize={timerEmphasize} />
                <div><b>Round {currentRound} of {numberOfRounds}</b></div>
                <div>{state}</div>
                <StyledGameBarPlayerAvatar>
                    <Avatar
                        size={70}
                        opts={avatar}
                        />
                </StyledGameBarPlayerAvatar>
            </StyledGameBarContainer>
        </div>
    );
}

export default GameBar;
