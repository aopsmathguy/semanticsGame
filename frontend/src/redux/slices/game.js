import { createSlice } from "@reduxjs/toolkit";
const addGuess = (guesses, guess, playerSolveCallback) => {
    const { playerId, word, wordHash, similarity, ranking, hidden, solved } = guess;
    let existingGuess = guesses[wordHash];
    if (!existingGuess){
        if (playerId){
            existingGuess = guesses[wordHash] = {
                playerIds: [playerId],
                word,
                similarity,
                ranking,
                hidden,
                solved,
            };
        } else{
            existingGuess = guesses[wordHash] = {
                playerIds: [],
                word,
                similarity,
                ranking,
                hidden,
                solved,
            };
        }
        
    } else{
        if (!existingGuess.playerIds.includes(playerId)){
            existingGuess.playerIds.push(playerId);
        }
        if (!hidden){
            existingGuess.hidden = false;
            existingGuess.word = word;
        }
    } 
    if (solved){
        playerSolveCallback(playerId);
    }
}
const addChatMessage = (chatMessages, color, content) => {
    chatMessages.push({ color, content });
    if (chatMessages.length > 100){
        //remove top 10 messages
        chatMessages.splice(0, 10);
    }
}
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
                    playersData[playerId] = { profile, playerRoomInfo };
                }
                roomList[roomId] = { roomName, playersData, settings };
            }
            state.roomList = roomList;
            state.activeView = "RoomList";
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
                addGuess(guessesData, guess, (playerId) => {});
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
            const { targetWord, guesses } = action.payload;
            const room = state.room;
            room.guesses = {};
            room.targetWord = targetWord;
            for (const playerId in room.players) {
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.roundScore = 0;
                playerRoomInfo.solved = false;
            }

            for (const guess of guesses) {
                addGuess(room.guesses, guess, (playerId) => {});
            }

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
            room.gameState = "ROUND_OVER";

            const color = "#f80";
            const content = `The word was **${targetWord}**`;
            addChatMessage(room.chatMessages, color, content);
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
            addChatMessage(room.chatMessages, color, content);
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
            addChatMessage(room.chatMessages, color, content);
        },
        handlePlayerLeave: (state, action) => {
            const { playerId } = action.payload;
            const room = state.room;

            const color = "#f00";
            const content = `**${room.players[playerId].profile.name} left the room**`;
            addChatMessage(room.chatMessages, color, content);


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
            const { playerId, word, wordHash, similarity, ranking, hidden, solved } =
                action.payload;
            const room = state.room;
            if (playerId === state.playerId) {
                room.lastGuessHash = wordHash;
            }
            addGuess(room.guesses, { playerId, word, wordHash, similarity, ranking, hidden, solved }, (playerId) => {
                const { playerRoomInfo } = room.players[playerId];
                playerRoomInfo.solved = true;
                const color = "#56CE27";
                const content = `**${room.players[playerId].profile.name} found the word!**`;
                addChatMessage(room.chatMessages, color, content);
            });
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
            addChatMessage(room.chatMessages, color, content);
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
