// useSocket.js
import { useState, useEffect } from "react";
import { SocketClient } from "../common/socketUtility";
import { CONFIG } from "../common/socketConfig";

const WEBSOCKET_HOST =
  process.env.REACT_APP_WEBSOCKET_HOST || "ws://localhost:3000/api/ws"; // Use environment variable for flexibility

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new SocketClient(null, CONFIG);
    setSocket(newSocket);

    const connect = () => {
      newSocket.ws = new WebSocket(WEBSOCKET_HOST);
    };

    connect(); // Connect on mount

    newSocket.on("disconnect", () => {
      console.log("Disconnected, reconnecting in 1 second");
      setTimeout(connect, 1000);
    });

    newSocket.on("error", (e) => {
      console.error("WebSocket error encountered:", e);
      newSocket.disconnect();
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Emit events
  const emitEvent = (eventName, data) => socket?.emit(eventName, data);

  // Register listener helper function
  const useEventListener = (eventName, callback) => 
    useEffect(() => {
      const listener = (data) => callback(data);
      socket?.on(eventName, listener);
      return () => socket?.removeListener(eventName, listener);
    }, [callback, socket]);

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
  const useOnChatMessageResponse = (callback) => useEventListener("chat-message-response", callback);

  return {
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
    useOnChatMessageResponse,
  };
};

export default useSocket;