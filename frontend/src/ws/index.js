import { useEffect } from "react";
import { SocketClient } from "@common/socketUtility";
import { CONFIG } from "@common/socketConfig";

const WEBSOCKET_HOST =
  import.meta.env.VITE_WEBSOCKET_HOST
    || "ws://localhost:3000/api/ws";
    // || "https://e1b11dd17125.ngrok.app/api/ws";

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

export const emit = (eventName, data) => socket.emit(eventName, data);

const useSocket = () => {
  const on = (eventName, callback) => {
    useEffect(() => {
      socket.on(eventName, callback);
      return () => socket.removeListener(eventName, callback);
    }, [eventName, callback]);
  };
  return { on };
};

export default useSocket;
