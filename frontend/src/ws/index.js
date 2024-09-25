// useSocket.js
import { useState, useEffect, useRef } from "react";
import { SocketClient } from "@common/socketUtility";
import { CONFIG } from "@common/socketConfig";

const WEBSOCKET_HOST =
  import.meta.env.VITE_WEBSOCKET_HOST 
    // || "ws://localhost:3000/api/ws"; // Use environment variable for flexibility
    || "https://2fb030cdd9eb.ngrok.app/api/ws"; // Use environment variable for flexibility
const socket = new SocketClient(null, CONFIG);
const connect = () => {
  socket.ws = new WebSocket(WEBSOCKET_HOST);
};
socket.on("disconnect", () => {
  console.log("Disconnected, reconnecting in 1 second");
  setTimeout(connect, 1000);
});

socket.on("error", (e) => {
  console.error("WebSocket error encountered:", e);
  socket.disconnect();
});
connect();

const useSocket = () => {
  // Emit events
  const emitEvent = (eventName, data) => {
    socket.emit(eventName, data);
  };

  // Register listener helper function
  const useEventListener = (eventName, callback) => {
    useEffect(() => {
      socket.on(eventName, callback);
      return () => socket.removeListener(eventName, callback);
    }, [eventName, callback]);
  }

  // Specific event emitters (for better readability)
  const emitJoin = (data) => emitEvent("join", data);
  const emitRoomListRequest = (data) => emitEvent("room-list-request", data);
  const emitMakeRoom = (data) => emitEvent("make-room", data);
  const emitJoinRoom = (data) => emitEvent("join-room", data);
  const emitLeaveRoom = (data) => emitEvent("leave-room", data);
  const emitSettingsChange = (data) => emitEvent("settings-change", data);
  const emitStartGame = (data) => emitEvent("start-game", data);
  const emitGuess = (data) => emitEvent("guess", data);
  const emitChatMessage = (data) => emitEvent("chat-message", data);

  // Specific event listeners
  const useOnJoinResponse = (callback) => useEventListener("join-response", callback);
  const useOnRoomListResponse = (callback) => useEventListener("room-list-response", callback);
  const useOnJoinRoomResponse = (callback) => useEventListener("join-room-response", callback);
  const useOnJoinRoomFail = (callback) => useEventListener("join-room-fail", callback);
  const useOnLeaveRoomResponse = (callback) => useEventListener("leave-room-response", callback);
  const useOnSettingsChangeResponse = (callback) => useEventListener("settings-change-response", callback);
  const useOnRoundStart = (callback) => useEventListener("round-start", callback);
  const useOnGuessStart = (callback) => useEventListener("guess-start", callback);
  const useOnRoundEnd = (callback) => useEventListener("round-end", callback);
  const useOnGameEnd = (callback) => useEventListener("game-end", callback);
  const useOnWaitStartGame = (callback) => useEventListener("wait-start-game", callback);
  const useOnTimer = (callback) => useEventListener("timer", callback);
  const useOnPlayerJoin = (callback) => useEventListener("player-join", callback);
  const useOnPlayerLeave = (callback) => useEventListener("player-leave", callback);
  const useOnNewHost = (callback) => useEventListener("new-host", callback);
  const useOnGuessResponse = (callback) => useEventListener("guess-response", callback);
  const useOnSpellingHint = (callback) => useEventListener("spelling-hint", callback);
  const useOnChatMessageResponse = (callback) => useEventListener("chat-message-response", callback);
  const useOnDisconnect = (callback) => useEventListener("disconnect", callback);
  return {
    socket,
    emitJoin,
    emitRoomListRequest,
    emitMakeRoom,
    emitJoinRoom,
    emitLeaveRoom,
    emitSettingsChange,
    emitStartGame,
    emitGuess,
    emitChatMessage,
    useOnJoinResponse,
    useOnRoomListResponse,
    useOnJoinRoomResponse,
    useOnJoinRoomFail,
    useOnLeaveRoomResponse,
    useOnSettingsChangeResponse,
    useOnRoundStart,
    useOnGuessStart,
    useOnRoundEnd,
    useOnGameEnd,
    useOnWaitStartGame,
    useOnTimer,
    useOnPlayerJoin,
    useOnPlayerLeave,
    useOnNewHost,
    useOnGuessResponse,
    useOnSpellingHint,
    useOnChatMessageResponse,
    useOnDisconnect,
  };
};

export default useSocket;