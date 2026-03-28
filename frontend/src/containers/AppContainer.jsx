import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSocket from "@/ws";
import {
    handleJoinResponse, handleRoomListResponse, handleJoinRoomResponse,
    handleJoinRoomFail, handleLeaveRoomResponse, handleSettingsChangeResponse,
    handleRoundStart, handleGuessStart, handleRoundEnd, handleGameEnd,
    handleWaitStartGame, handleTimer, handlePlayerJoin, handlePlayerLeave,
    handleNewHost, handleGuessResponse, handleSpellingHint,
    handleChatMessageResponse, handleDisconnect,
} from "@/redux/slices/game";

import { selectActiveView } from "@/redux/slices/game";

import GameContainer from "./GameContainer.jsx";
import MainMenuContainer from "./MainMenuContainer.jsx";
import RoomListContainer from "./RoomListContainer.jsx";
import { StyledAppContainer } from "./styles.jsx";

function AppContainer() {
    const dispatch = useDispatch();

    const { on } = useSocket();
    on("join-response",             (data) => dispatch(handleJoinResponse(data)));
    on("room-list-response",        (data) => dispatch(handleRoomListResponse(data)));
    on("join-room-response",        (data) => dispatch(handleJoinRoomResponse(data)));
    on("join-room-fail",            ()     => dispatch(handleJoinRoomFail()));
    on("leave-room-response",       ()     => dispatch(handleLeaveRoomResponse()));
    on("settings-change-response",  (data) => dispatch(handleSettingsChangeResponse(data)));
    on("round-start",               (data) => dispatch(handleRoundStart(data)));
    on("guess-start",               (data) => dispatch(handleGuessStart(data)));
    on("round-end",                 (data) => dispatch(handleRoundEnd(data)));
    on("game-end",                  (data) => dispatch(handleGameEnd(data)));
    on("wait-start-game",           ()     => dispatch(handleWaitStartGame()));
    on("timer",                     (data) => dispatch(handleTimer(data)));
    on("player-join",               (data) => dispatch(handlePlayerJoin(data)));
    on("player-leave",              (data) => dispatch(handlePlayerLeave(data)));
    on("new-host",                  (data) => dispatch(handleNewHost(data)));
    on("guess-response",            (data) => dispatch(handleGuessResponse(data)));
    on("spelling-hint",             (data) => dispatch(handleSpellingHint(data)));
    on("chat-message-response",     (data) => dispatch(handleChatMessageResponse(data)));
    on("disconnect",                ()     => dispatch(handleDisconnect()));
    const activeView = useSelector(selectActiveView);
    return <StyledAppContainer>
      {activeView == "MainMenu" && <MainMenuContainer />}
      {activeView == "RoomList" && <RoomListContainer />}
      {activeView == "Game" && <GameContainer />}
      </StyledAppContainer>
}

export default AppContainer;
