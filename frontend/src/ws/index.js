import { SocketClient } from '../common/socketUtility';
import { CONFIG } from '../common/socketConfig';

// const WEBSOCKET_HOST = process.env.WEBSOCKET_HOST || "wss://figure-it-out.onrender.com/api/ws";
const WEBSOCKET_HOST = "ws://localhost:3000/api/ws";

// Instantiate the socket client
export const socket = new SocketClient(null, CONFIG);

// Function to connect the WebSocket
function connect() {
    socket.ws = new WebSocket(WEBSOCKET_HOST);
}

// Attempt to reconnect on disconnection
socket.on("disconnect", () => {
    console.log("Disconnected, reconnecting in 1 second");
    setTimeout(connect, 1000);
});

// Handle error events
socket.on("error", (e) => {
    console.error("WebSocket error encountered:", e);
    socket.disconnect();
});

/**
 * Emit events
 */
export const sendMakeGuess = (data) => socket.emit("make-guess", data);

/**
 * Register event listeners
 * @param {String} event - event name
 * @param {Function} callback - callback function to handle event
 * @returns {Function} function to remove the event listener
 */
const registerListener = (event, callback) => {
    socket.on(event, callback);
    return () => {
        socket.removeListener(event, callback);
    };
};

export const onScoreGuess = (callback) => registerListener("score-guess", callback);
export const onHints = (callback) => registerListener("hints", callback);
// Connect the WebSocket on script load
connect();