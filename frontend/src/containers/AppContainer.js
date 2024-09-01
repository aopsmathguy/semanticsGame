import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import words from '../common/word_list';
import Fuse from 'fuse.js';

import useSocket from '../ws';
import {
  handleJoinResponse,
  handleRoomListResponse,
  handleJoinRoomResponse,
  handleLeaveRoomResponse,
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
} from '../redux/slices/game';

import GameContainer from './GameContainer';
import MainMenuContainer from './MainMenuContainer';

function AppContainer() {
  const socket = useSocket();
  
  const dispatch = useDispatch();

  const wordFuse = useRef(new Fuse(words, { includeMatches: true }));

  socket.useOnJoinResponse((data) => dispatch(handleJoinResponse(data)));
  socket.useOnRoomListResponse((data) => dispatch(handleRoomListResponse(data)));
  socket.useOnJoinRoomResponse((data) => dispatch(handleJoinRoomResponse(data)));
  socket.useOnLeaveRoomResponse(() => dispatch(handleLeaveRoomResponse()));
  socket.useOnRoundStart((data) => dispatch(handleRoundStart(data)));
  socket.useOnGuessStart(() => dispatch(handleGuessStart()));
  socket.useOnRoundEnd((data) => dispatch(handleRoundEnd(data)));
  socket.useOnGameEnd((data) => dispatch(handleGameEnd(data)));
  socket.useOnWaitStartGame(() => dispatch(handleWaitStartGame()));
  socket.useOnTimer((data) => dispatch(handleTimer(data)));
  socket.useOnPlayerJoin((data) => dispatch(handlePlayerJoin(data)));
  socket.useOnPlayerLeave((data) => dispatch(handlePlayerLeave(data)));
  socket.useOnNewHost((data) => dispatch(handleNewHost(data)));
  socket.useOnGuessResponse((data) => dispatch(handleGuessResponse(data)));

  return (
    <div>
      <GameContainer />
      {/* <MainMenuContainer /> */}
    </div>
  );
}

export default AppContainer;