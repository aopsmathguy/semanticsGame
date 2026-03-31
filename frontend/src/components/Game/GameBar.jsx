import React from "react";
import { StyledGameBarContainer, StyledGameBarPlayerAvatar } from "./styles";
import Timer from "./Timer";
import Avatar from "../Shared/Avatar";
import { GAME_STATE } from "@common/gameState";

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
        console.log(gameState);
        switch (gameState) {
            case GAME_STATE.WAIT_START:
                return "Waiting for host to start...";
            case GAME_STATE.WAIT_ROUND_START:
                return "Round starting soon...";
            case GAME_STATE.GUESSING:
                return targetWord;
            case GAME_STATE.ROUND_OVER:
                return targetWord;
            case GAME_STATE.GAME_OVER:
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
