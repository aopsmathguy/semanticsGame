import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSocket from "@/ws";
import {
    handleJoinResponse,
    handleRoomListResponse,
    handleJoinRoomResponse,
    handleJoinRoomFail,
    handleLeaveRoomResponse,
    handleSettingsChangeResponse,
    handleRoundStart,
    handleGuessStart,
    handleRoundEnd,
    handleGameEnd,
    handleWaitStartGame,
    handleTimer,
    handlePlayerJoin,
    handlePlayerLeave,
    handleNewHost,
    handleGuessResponse,
    handleSpellingHint,
    handleChatMessageResponse,
    handleDisconnect
} from "@/redux/slices/game";

import { selectActiveView } from "@/redux/slices/game";

import GameContainer from "./GameContainer.jsx";
import MainMenuContainer from "./MainMenuContainer.jsx";
import RoomListContainer from "./RoomListContainer.jsx";
import { StyledAppContainer } from "./styles.jsx";

function AppContainer() {
    const dispatch = useDispatch();

    const socket = useSocket();
    socket.useOnJoinResponse((data) => dispatch(handleJoinResponse(data)));
    socket.useOnRoomListResponse((data) =>
        dispatch(handleRoomListResponse(data))
    );
    socket.useOnJoinRoomResponse((data) =>
        dispatch(handleJoinRoomResponse(data))
    );
    socket.useOnJoinRoomFail(() => dispatch(handleJoinRoomFail()));
    socket.useOnLeaveRoomResponse(() => dispatch(handleLeaveRoomResponse()));
    socket.useOnSettingsChangeResponse((data) =>
        dispatch(handleSettingsChangeResponse(data))
    );
    socket.useOnRoundStart((data) => dispatch(handleRoundStart(data)));
    socket.useOnGuessStart((data) => dispatch(handleGuessStart(data)));
    socket.useOnRoundEnd((data) => dispatch(handleRoundEnd(data)));
    socket.useOnGameEnd((data) => dispatch(handleGameEnd(data)));
    socket.useOnWaitStartGame(() => dispatch(handleWaitStartGame()));
    socket.useOnTimer((data) => dispatch(handleTimer(data)));
    socket.useOnPlayerJoin((data) => dispatch(handlePlayerJoin(data)));
    socket.useOnPlayerLeave((data) => dispatch(handlePlayerLeave(data)));
    socket.useOnNewHost((data) => dispatch(handleNewHost(data)));
    socket.useOnGuessResponse((data) => dispatch(handleGuessResponse(data)));
    socket.useOnSpellingHint((data) => dispatch(handleSpellingHint(data)));
    socket.useOnChatMessageResponse((data) => dispatch(handleChatMessageResponse(data)));
    socket.useOnDisconnect(() => dispatch(handleDisconnect()));
    const activeView = useSelector(selectActiveView);
    return <StyledAppContainer>
      {activeView == "MainMenu" && <MainMenuContainer />}
      {activeView == "RoomList" && <RoomListContainer />}
      {activeView == "Game" && <GameContainer />}
      </StyledAppContainer>
}

export default AppContainer;
