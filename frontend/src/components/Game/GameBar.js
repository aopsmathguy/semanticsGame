import React from "react";
import { StyledGameBarContainer } from "./styles";
import Timer from "./Timer";
import Avatar from "../Shared/Avatar";

function GameBar({
    gameState,
    currentRound,
    timer,
    timerEmphasize,
    players,
    playerId,
    targetWord
}) {
    const { profile } = players[playerId];
    const { name, avatar } = profile;
    const state = (() => {
        switch (
            gameState //'WAIT_START' | 'WAIT_ROUND_START' | 'GUESSING' | 'WAIT_ROUND_END' | 'WAIT_GAME_END'
        ) {
            case "WAIT_START":
                return "Waiting for host to start...";
            case "WAIT_ROUND_START":
                return "Waiting...";
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
        <StyledGameBarContainer>
            <Timer timer={timer} timerEmphasize={timerEmphasize} />
            <div><b>Round {currentRound}</b></div>
            <div>{state}</div>
            <div style={{position:"absolute", right : "0", top: "0"}}>
                <Avatar
                    size={70}
                    opts={avatar}
                    />
            </div>
        </StyledGameBarContainer>
    );
}

export default GameBar;
