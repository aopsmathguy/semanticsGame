import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        activeView: "MainMenu", // MainMenu, RoomList, Game
        playerId: null,
        profile: null,
        roomList: null,
        room: null,
    },
    reducers: {
        handleJoinResponse: (state, action) => {
            console.log("handleJoinResponse", action.payload);
            const { playerId, profile } = action.payload;
            const { name, avatar } = profile;
            state.playerId = playerId;
            state.profile = { name, avatar };
        },
        handleRoomListResponse: (state, action) => {
            console.log("handleRoomListResponse", action.payload);
            const { rooms } = action.payload;
            const roomList = {};
            for (const room of rooms) {
                const { roomId, room: roomData } = room;
                const { "room-name": roomName, players, settings } = roomData;
                const playersData = {};
                for (const player of players) {
                    const { playerId, profile, playerRoomInfo } = player;
                    playersData[playerId] = { profile, playerRoomInfo };
                }
                roomList[roomId] = { roomName, playersData, settings };
            }
            console.log("roomList", roomList);
            state.roomList = roomList;
            state.activeView = "RoomList";
        },
        handleJoinRoomResponse: (state, action) => {
            console.log("handleJoinRoomResponse", action.payload);
            const { roomId, room: roomData } = action.payload;
            const {
                "room-name": roomName,
                gameState,
                timer,
                hostId,
                players,
                settings,
                currentRound,
                guesses,
                targetWord,
            } = roomData;
            const playersData = {};
            for (const player of players) {
                const { playerId, profile, playerRoomInfo } = player;
                playersData[playerId] = { profile, playerRoomInfo };
            }
            const guessesData = {};
            for (const guess of guesses) {
                const { playerId, word, wordHash, similarity, hidden, solved } =
                    guess;
                const existingGuess = guessesData[wordHash];
                if (existingGuess && !existingGuess.hidden) {
                    continue;
                }
                guessesData[wordHash] = {
                    playerId,
                    word,
                    similarity,
                    hidden,
                    solved,
                };
            }
            state.room = {
                roomId,
                roomName,
                gameState,
                timer,
                timerEmphasize: false,
                hostId,
                players: playersData,
                settings,
                currentRound,
                guesses: guessesData,
                lastGuessHash: null,
                targetWord,
                chatMessages: [],
            };
            state.activeView = "Game";
        },
        handleJoinRoomFail: (state) => {
            state.room = null;
            state.activeView = "RoomList";
        },
        handleLeaveRoomResponse: (state) => {
            state.room = null;
            state.activeView = "RoomList";
        },
        handleSettingsChangeResponse: (state, action) => {
            const { settings } = action.payload;
            state.room.settings = settings;
        },
        handleRoundStart: (state, action) => {
            const { currentRound } = action.payload;
            const room = state.room;
            room.currentRound = currentRound;
            room.gameState = "WAIT_ROUND_START";
        },
        handleGuessStart: (state, action) => {
            const { targetWord } = action.payload;
            const room = state.room;
            room.guesses = {};
            room.targetWord = targetWord;
            for (const playerId in room.players) {
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.roundScore = 0;
                playerRoomInfo.solved = false;
            }
            room.gameState = "GUESSING";
        },
        handleRoundEnd: (state, action) => {
            const { targetWord, scores } = action.payload;
            console.log("handleRoundEnd", targetWord, scores);
            const room = state.room;
            room.targetWord = targetWord;
            for (const player of scores) {
                const { playerId, score, roundScore, solved } = player;
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.score = score;
                playerRoomInfo.roundScore = roundScore;
                playerRoomInfo.solved = solved;
            }
            room.gameState = "ROUND_OVER";

            const color = "#f80";
            const content = `The word was **${targetWord}**`;
            room.chatMessages.push({ color, content });
        },
        handleGameEnd: (state, action) => {
            const { scores } = action.payload;
            const room = state.room;
            for (const player of scores) {
                const { playerId, score } = player;
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.score = score;
            }
            room.gameState = "GAME_OVER";
            
            const winner = Object.values(room.players).reduce((a, b) => a.playerRoomInfo.score > b.playerRoomInfo.score ? a : b);
            const color = "#f80";
            const content = `Game over! **${winner.profile.name}** wins with **${winner.playerRoomInfo.score}** points!`;
            room.chatMessages.push({ color, content });
        },
        handleWaitStartGame: (state) => {
            const room = state.room;
            for (const playerId in room.players) {
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.score = 0;
                playerRoomInfo.roundScore = 0;
                playerRoomInfo.solved = false;
            }
            room.timer = 0;
            room.currentRound = 0;
            room.gameState = "WAIT_START";
        },
        handleTimer: (state, action) => {
            const { timeLeft, emphasize } = action.payload;
            const room = state.room;
            room.timer = timeLeft;
            room.timerEmphasize = emphasize;
        },
        handlePlayerJoin: (state, action) => {
            const { playerId, profile } = action.payload;
            const room = state.room;
            room.players[playerId] = {
                profile,
                playerRoomInfo: { score: 0, roundScore: 0, solved: false },
            };

            const color = "#56CE27";
            const content = `**${room.players[playerId].profile.name} joined the room**`;
            room.chatMessages.push({ color, content });
        },
        handlePlayerLeave: (state, action) => {
            const { playerId } = action.payload;
            const room = state.room;

            const color = "#f00";
            const content = `**${room.players[playerId].profile.name} left the room**`;
            room.chatMessages.push({ color, content });


            delete room.players[playerId];
        },
        handleNewHost: (state, action) => {
            const { hostId } = action.payload;
            const room = state.room;
            if (room){
                room.hostId = hostId;
            }
        },
        handleGuessResponse: (state, action) => {
            const { playerId, word, wordHash, similarity, hidden, solved } =
                action.payload;
            const room = state.room;
            if (playerId === state.playerId) {
                room.lastGuessHash = wordHash;
            }
            const existingGuess = room.guesses[wordHash];
            if (existingGuess && !existingGuess.hidden) {
                return;
            }
            room.guesses[wordHash] = {
                playerId,
                word,
                similarity,
                hidden,
                solved,
            };
            if (solved) {
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.solved = true;

                const color = "#56CE27";
                const content = `**${room.players[playerId].profile.name} found the word!**`;
                room.chatMessages.push({ color, content });
            }
        },
        handleSpellingHint : (state, action) => {
            const { targetWord } = action.payload;
            const room = state.room;
            room.targetWord = targetWord;
        }, 
        handleChatMessageResponse: (state, action) => {
            const { playerId, message } = action.payload;
            const room = state.room;
            const myPlayerId = state.playerId;
            const color = playerId === myPlayerId ? "blue" : "black";
            const content = `**${room.players[playerId].profile.name}:** ${message}`;
            room.chatMessages.push({ color, content });
        },
        handleDisconnect: (state) => {
            state.activeView = "MainMenu";
            state.playerId = null;
            state.roomList = null;
            state.room = null;
        }
    },
});

export const {
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
    handleDisconnect,
} = gameSlice.actions;

export const selectActiveView = (state) => state.game.activeView;

export const selectProfile = (state) => state.game.profile;

export const selectRoomList = (state) => state.game.roomList;

export const selectGameState = (state) => state.game.room?.gameState;
export const selectRoomName = (state) => state.game.room?.roomName;
export const selectTimer = (state) => state.game.room?.timer;
export const selectTimerEmphasize = (state) => state.game.room?.timerEmphasize;
export const selectHostId = (state) => state.game.room?.hostId;
export const selectPlayerId = (state) => state.game.playerId;
export const selectPlayers = (state) => state.game.room?.players;
export const selectSettings = (state) => state.game.room?.settings;
export const selectCurrentRound = (state) => state.game.room?.currentRound;
export const selectGuesses = (state) => state.game.room?.guesses;
export const selectLastGuessHash = (state) => state.game.room?.lastGuessHash;
export const selectTargetWord = (state) => state.game.room?.targetWord;
export const selectChatMessages = (state) => state.game.room?.chatMessages;
export default gameSlice.reducer;
