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
            const { playerId, profile } = action.payload;
            const { name, avatar } = profile;
            state.playerId = playerId;
            state.profile = { name, avatar };
            state.activeView = "RoomList";
        },
        handleRoomListResponse: (state, action) => {
            const { rooms } = action.payload;
            const roomList = {};
            for (const room of rooms) {
                const { roomId, room: roomData } = room;
                const { "room-name": roomName, players, settings } = roomData;
                const playersData = {};
                for (const player of players) {
                    const { playerId, profile, playerRoomInfo } = player;
                    players[playerId] = { profile, playerRoomInfo };
                }
                roomList[roomId] = { roomName, playersData, settings };
            }
            state.roomList = roomList;
        },
        handleJoinRoomResponse: (state, action) => {
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
            room.guesses = {};
            room.targetWord = "";
            for (const playerId in room.players) {
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.roundScore = 0;
                playerRoomInfo.solved = false;
            }
            room.gameState = "WAIT_ROUND_START";
        },
        handleGuessStart: (state, action) => {
            const room = state.room;
            room.gameState = "GUESSING";
        },
        handleRoundEnd: (state, action) => {
            const { targetWord, scores } = action.payload;
            const room = state.room;
            room.targetWord = targetWord;
            for (const player of scores) {
                const { playerId, score, roundScore, solved } = player;
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.score = score;
                playerRoomInfo.roundScore = roundScore;
                playerRoomInfo.solved = solved;
            }
            room.gameState = "WAIT_ROUND_END";
        },
        handleGameEnd: (state, action) => {
            const { scores } = action.payload;
            const room = state.room;
            for (const player of scores) {
                const { playerId, score } = player;
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.score = score;
            }
            room.gameState = "WAIT_GAME_END";
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
            room.gameState = "WAIT_START_GAME";
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
        },
        handlePlayerLeave: (state, action) => {
            const { playerId } = action.payload;
            const room = state.room;
            delete room.players[playerId];
        },
        handleNewHost: (state, action) => {
            const { hostId } = action.payload;
            const room = state.room;
            room.hostId = hostId;
        },
        handleGuessResponse: (state, action) => {
            const { playerId, word, wordHash, similarity, hidden, solved } =
                action.payload;
            const room = state.room;
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
            if (playerId === state.playerId) {
                room.lastGuessHash = wordHash;
            }
            if (solved) {
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.solved = true;
            }
        },
        handleChatMessageResponse: (state, action) => {
            const { playerId, message } = action.payload;
            const room = state.room;
            room.chatMessages.push({ playerId, message });
        }
    },
});

export const {
    handleJoinResponse,
    handleRoomListResponse,
    handleJoinRoomResponse,
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
    handleChatMessageResponse,
} = gameSlice.actions;

export default gameSlice.reducer;
