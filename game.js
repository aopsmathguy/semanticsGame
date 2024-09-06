import { words } from "./common/word_list.js";
import wordEmbeddings from "./embeddings.js";
function generateId() {
    return crypto.getRandomValues(new Int32Array(1))[0];
}
function hiddenString(str, indices) {
    return str
        .split("")
        .map((c, i) => (indices ? (indices.includes(i) ? c : "_") : "_"))
        .join("");
}
function hashStr(str) {
    // Cyrb53 hash function (optimized for JavaScript)
    let h1 = 0,
        h2 = 0,
        i;
    for (i = 0; i < str.length; i++) {
        let ch = str.charCodeAt(i);
        h1 = (h1 << 5) + h1 + ch;
        h2 = (h2 << 5) + h2 + ch;
        h1 = h1 & h1; // Convert to 32bit integer
        h2 = h2 & h2; // Convert to 32bit integer
    }
    let hash = h1 ^ (h2 << 16);

    // Allow for negative values:
    return hash | 0; // Use bitwise OR with 0 to get signed 32-bit integer
}
function getDistinctSubset(words, k) {
    // if (k > words.length) {
    //     throw new Error(
    //         "k cannot be larger than the number of words in the array"
    //     );
    // }

    // Create a copy of the array to avoid modifying the original
    const wordsCopy = [...words];

    // Shuffle the array using the Fisher-Yates Shuffle algorithm
    for (let i = wordsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordsCopy[i], wordsCopy[j]] = [wordsCopy[j], wordsCopy[i]];
    }

    // Return the first k elements of the shuffled array
    return wordsCopy.slice(0, k);
}
class Game {
    constructor() {
        this.players = new Map(); //playerId -> Player
        this.rooms = new Map(); //roomId -> Room
    }
    socketJoined(socket) {
        socket.on("join", (data) => this.joinHandler(socket, data));
        socket.on("room-list-request", (data) =>
            this.roomListRequestHandler(socket, data)
        );
        socket.on("make-room", (data) => this.makeRoomHandler(socket, data));
        socket.on("join-room", (data) => this.joinRoomHandler(socket, data));
        socket.on("leave-room", (data) => this.leaveRoomHandler(socket, data));
        socket.on("settings-change", (data) =>
            this.settingsChangeHandler(socket, data)
        );
        socket.on("start-game", (data) => this.startGameHandler(socket, data));
        socket.on("guess", (data) => this.guessHandler(socket, data));
        socket.on("chat-message", (data) =>
            this.chatMessageHandler(socket, data)
        );
        socket.on("disconnect", () => {
            this.disconnectHandler(socket);
        });
    }
    joinHandler(socket, data) {
        const { profile } = data;
        profile.name =
            profile.name || words[Math.floor(Math.random() * words.length)];
        const playerId = generateId();
        console.log("Player joined", playerId, profile);
        socket.playerId = playerId;
        const player = new Player(socket, playerId, profile);
        this.players.set(playerId, player);
        socket.emit("join-response", { playerId, profile });
        this.roomListRequestHandler(socket, {});
    }
    roomListRequestHandler(socket, data) {
        const rooms = [];
        for (const [roomId, roomObj] of this.rooms) {
            const playersData = [];
            for (const [
                playerId,
                { playerRoomInfo, profile },
            ] of roomObj.players) {
                playersData.push({ playerId, profile, playerRoomInfo });
            }
            const room = {
                "room-name": roomObj.roomName,
                "players": playersData,
                "settings": roomObj.settings,
            };
            rooms.push({ roomId: roomId, room });
        }
        socket.emit("room-list-response", { rooms });
    }
    makeRoomHandler(socket, data) {
        let { "room-name": roomName } = data;
        const playerId = socket.playerId;
        if (!playerId) {
            console.log("Player not found", playerId);
            return;
        }
        const { profile } = this.players.get(playerId);
        roomName = roomName || profile.name + "'s room";
        const roomId = generateId();
        const room = new Room(this, roomId, roomName);
        this.rooms.set(roomId, room);
        this.joinRoomHandler(socket, { roomId });
    }
    async joinRoomHandler(socket, data) {
        const { roomId } = data;
        const playerId = socket.playerId;
        if (!playerId) {
            console.log("Player not found", playerId);
            return;
        }
        const player = this.players.get(playerId);
        const roomObj = this.rooms.get(roomId);
        if (roomObj === undefined) {
            console.log("Room not found", roomId);
            socket.emit("join-room-fail", { reason: "Room not found" });
            return;
        }
        const { maxPlayers } = roomObj.settings;
        if (roomObj.players.size >= maxPlayers) {
            console.log("Room is full", roomId);
            socket.emit("join-room-fail", { reason: "Room is full" });
            return;
        }
        player.roomId = roomId;
        roomObj.players.set(playerId, {
            playerRoomInfo: new PlayerRoomInfo(player.playerId),
            profile: player.profile,
        });
        if (!roomObj.hostId) {
            roomObj.hostId = playerId;
        }
        const playersData = [];
        for (const [playerId, { playerRoomInfo, profile }] of roomObj.players) {
            playersData.push({ playerId, profile, playerRoomInfo });
        }
        const room = {
            "room-name": roomObj.roomName,
            "gameState": roomObj.gameState,
            "timer": roomObj.timer,
            "hostId": roomObj.hostId,
            "players": playersData,
            "settings": roomObj.settings,
            "currentRound": roomObj.currentRound,
            "guesses": roomObj.guesses.map(
                (guess) => roomObj.createGuessResponse(guess, playerId === guess.playerId)
            ),
            "targetWord":
                roomObj.gameState === "ROUND_OVER"
                    ? roomObj.targetWord
                    : roomObj.currentSpellingHint,
        };
        socket.emit("join-room-response", {
            roomId,
            room,
        });
        roomObj.socketEmit(
            "player-join",
            { playerId, profile: player.profile },
            playerId
        );
    }
    leaveRoomHandler(socket, data) {
        const playerId = socket.playerId;
        if (!playerId) {
            console.log("Player not found", playerId);
            return;
        }
        const player = this.players.get(playerId);
        const roomId = player.roomId;
        const roomObj = this.rooms.get(roomId);
        roomObj.players.delete(playerId);
        if (roomObj.hostId === playerId) {
            if (roomObj.players.size > 0) {
                roomObj.hostId = Array.from(roomObj.players.keys())[0];
            } else {
                roomObj.hostId = 0;
            }
        }
        roomObj.playerSolveOrder = roomObj.playerSolveOrder.filter(
            (id) => id !== playerId
        );
        player.roomId = null;
        socket.emit("leave-room-response", {});
        roomObj.socketEmit("player-leave", { playerId }, playerId);
        if (roomObj.players.size === 0) {
            this.rooms.delete(roomId);
        }

        this.roomListRequestHandler(socket, {});
    }
    async settingsChangeHandler(socket, data) {
        const playerId = socket.playerId;
        if (!playerId) {
            console.log("Player not found", playerId);
            return;
        }
        const player = this.players.get(playerId);
        const roomId = player.roomId;
        const roomObj = this.rooms.get(roomId);
        if (playerId !== roomObj.hostId) {
            return;
        }
        const { settings } = data;
        roomObj.settings = settings;
        roomObj.socketEmit("settings-change-response", { settings });
    }
    async startGameHandler(socket, data) {
        const playerId = socket.playerId;
        if (!playerId) {
            console.log("Player not found", playerId);
            return;
        }
        const player = this.players.get(playerId);
        const roomId = player.roomId;
        const roomObj = this.rooms.get(roomId);
        if (playerId !== roomObj.hostId) {
            return;
        }
        await roomObj.startGame();
    }
    async guessHandler(socket, data) {
        const { word } = data;
        const playerId = socket.playerId;
        if (!playerId) {
            console.log("Player not found", playerId);
            return;
        }
        const player = this.players.get(playerId);
        const roomId = player.roomId;
        const roomObj = this.rooms.get(roomId);
        if (roomObj.gameState !== "GUESSING") {
            console.log("Not guessing state", roomObj.gameState);
            return;
        }
        const { playerRoomInfo } = roomObj.players.get(playerId);
        if (playerRoomInfo.solved) {
            console.log("Player already solved", playerId);
            return;
        }
        if (word == roomObj.targetWord) {
            roomObj.playerSolveOrder.push(playerId);
            playerRoomInfo.solved = true;
        }
        const similarity = await wordEmbeddings.getSimilarity(
            word,
            roomObj.targetWord
        );
        const guess = { playerId, word, similarity };
        roomObj.guesses.push(guess);
        player.socketEmit(
            "guess-response",
            roomObj.createGuessResponse(guess, true)
        );
        roomObj.socketEmit(
            "guess-response",
            roomObj.createGuessResponse(guess, false),
            playerId
        );
    }
    chatMessageHandler(socket, data) {
        const { message } = data;
        const playerId = socket.playerId;
        if (!playerId) {
            console.log("Player not found", playerId);
            return;
        }
        const player = this.players.get(playerId);
        const roomId = player.roomId;
        const roomObj = this.rooms.get(roomId);
        roomObj.socketEmit("chat-message-response", { playerId, message });
    }
    disconnectHandler(socket) {
        const playerId = socket.playerId;
        console.log("Player disconnected", playerId);
        const player = this.players.get(playerId);
        if (player === undefined) {
            return;
        }
        if (player.roomId !== null) {
            this.leaveRoomHandler(socket, {});
        }
        this.players.delete(playerId);
    }
}
class Room {
    constructor(game, roomId, roomName) {
        this.game = game;

        this.roomId = roomId;
        this.roomName = roomName;
        this.gameState = "WAIT_START"; //'WAIT_START' | 'WAIT_ROUND_START' | 'GUESSING' | 'ROUND_OVER' | 'GAME_OVER'
        this.timer = 0;
        this._hostId = 0;
        this.players = new Map(); //playerId -> {playerRoomInfo: PlayerRoomInfo, profile: Profile}
        this.settings = {
            maxPlayers: 8,
            guessTime: 60,
            numberOfRounds: 3,
            numberOfHints: 5,
        };

        this.currentRound = 0;
        this.targetWord = "";
        this.currentSpellingHint = "";
        this.wordRanking = null;
        this.guesses = []; //{ playerId, word, similarity }

        this.playerSolveOrder = [];
        this.salt = "";
    }
    get hostId() {
        return this._hostId;
    }
    set hostId(value) {
        this._hostId = value;
        this.socketEmit("new-host", { hostId: value });
    }

    async createHints(allSimilarities) {
        const hints = this.settings.numberOfHints;
        let wordsBySimilarity = allSimilarities.filter(({ similarity }) => similarity < 0.65);
        if (wordsBySimilarity[20].similarity > 0.47) {
            wordsBySimilarity = wordsBySimilarity.filter(
                ({ similarity }) => similarity > 0.47
            );
        } else {
            wordsBySimilarity = wordsBySimilarity.splice(0, 20);
        }
        return getDistinctSubset(wordsBySimilarity, hints);
    }
    createGuessResponse(guess, isSender) {
        const settings = this.settings;
        const wordHash = hashStr(guess.word + this.salt);
        const hidden = guess.similarity > 0.65 && !isSender;
        let ranking = this.wordRanking.get(guess.word)?.ranking;
        if (ranking == undefined || ranking >= 100) {
            ranking = 100;
        }
        return {
            playerId: guess.playerId,
            word: hidden ? hiddenString(guess.word) : guess.word,
            wordHash: wordHash,
            similarity: guess.similarity,
            ranking: ranking,
            hidden: hidden,
            solved: guess.word === this.targetWord,
        };
    }
    async startGame() {
        if (this.gameState !== "WAIT_START") {
            return;
        }
        this.currentRound = 0;
        while (this.currentRound < this.settings.numberOfRounds) {
            await this.doRound();
        }
        await this.gameOver();
    }
    async doRound() {
        this.currentRound++;

        this.gameState = "WAIT_ROUND_START";
        this.timer = 3;
        this.socketEmit("round-start", {
            currentRound: this.currentRound,
        });
        while (this.timer > 0) {
            this.socketEmit("timer", {
                timeLeft: this.timer,
                emphasize: false,
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.timer--;
        }

        this.targetWord = words[Math.floor(Math.random() * words.length)];
        console.log("Target word", this.targetWord);
        const allSimilarities = await wordEmbeddings.getSimilarities(this.targetWord, words);
        this.wordRanking = new Map(allSimilarities.map(({ word, similarity }, i) => [word, {ranking : i, similarity}])); 
        const hints = await this.createHints(allSimilarities);

        for (const [playerId, { playerRoomInfo }] of this.players) {
            //reset roundScores to 0
            playerRoomInfo.roundScore = 0;
            playerRoomInfo.solved = false;
        }
        this.guesses = hints.map(({ word, similarity }) => {
            return {
                playerId: 0, //dummy playerId
                word,
                similarity,
            };
        });
        this.playerSolveOrder = [];
        this.salt = Math.random().toString(36).substring(2, 15);

        this.gameState = "GUESSING";
        this.timer = this.settings.guessTime;

        const spellingHints = Math.ceil(this.targetWord.length / 3);
        const indices = getDistinctSubset(
            Array.from({ length: this.targetWord.length }, (_, i) => i),
            spellingHints
        );
        let spellingHintsRevealed = 0;
        this.currentSpellingHint = hiddenString(this.targetWord);
        this.socketEmit("guess-start", {
            targetWord: this.currentSpellingHint,
            guesses: this.guesses.map((guess) =>
                this.createGuessResponse(guess, false)
            ),
        });
        while (this.timer > 0) {
            const emphasize = this.timer < 10;
            this.socketEmit("timer", {
                timeLeft: this.timer,
                emphasize,
            });
            if (this.playerSolveOrder.length === this.players.size) {
                break;
            }
            const hintsReveal = Math.floor(
                (spellingHints + 1) * (1 - this.timer / this.settings.guessTime)
            );
            if (hintsReveal > spellingHintsRevealed) {
                spellingHintsRevealed = hintsReveal;
                this.currentSpellingHint = hiddenString(
                    this.targetWord,
                    indices.slice(0, hintsReveal)
                );
                this.socketEmit("spelling-hint", {
                    targetWord: this.currentSpellingHint,
                });
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.timer--;
        }
        this.gameState = "ROUND_OVER";
        this.timer = 5;
        for (const [i, playerId] of this.playerSolveOrder.entries()) {
            const playerRoomInfo = this.players.get(playerId).playerRoomInfo;
            const numPlayers = this.players.size;
            playerRoomInfo.roundScore = Math.floor(
                50 + (50 * (numPlayers - i)) / numPlayers
            );
            playerRoomInfo.score += playerRoomInfo.roundScore;
        }
        const scores = Array.from(this.players.values()).map(
            (playerInfo) => playerInfo.playerRoomInfo
        );
        this.socketEmit("round-end", {
            targetWord: this.targetWord,
            scores,
        });
        while (this.timer > 0) {
            this.socketEmit("timer", {
                timeLeft: this.timer,
                emphasize: false,
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.timer--;
        }
    }
    async gameOver() {
        this.gameState = "GAME_OVER";
        this.timer = 10;
        const scores = Array.from(this.players.values()).map(
            (playerInfo) => playerInfo.playerRoomInfo
        );
        this.socketEmit("game-end", {
            scores: scores,
        });
        while (this.timer > 0) {
            this.socketEmit("timer", {
                timeLeft: this.timer,
                emphasize: false,
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.timer--;
        }
        this.gameState = "WAIT_START";
        this.timer = 0;
        this.currentRound = 0;
        for (const [playerId, { playerRoomInfo }] of this.players) {
            playerRoomInfo.score = 0;
            playerRoomInfo.roundScore = 0;
        }
        this.socketEmit("wait-start-game", {});
    }
    socketEmit(event, data, excludePlayerId = null) {
        for (const [playerId, { playerRoomInfo }] of this.players) {
            if (playerId !== excludePlayerId) {
                this.game.players.get(playerId).socketEmit(event, data);
            }
        }
    }
}
class Player {
    constructor(socket, playerId, profile) {
        this.socket = socket;
        this.playerId = playerId;
        this.profile = profile;

        this.roomId = null;
    }
    socketEmit(event, data) {
        this.socket.emit(event, data);
    }
}
class PlayerRoomInfo {
    constructor(playerId) {
        this.playerId = playerId;
        this.score = 0;
        this.roundScore = 0;
        this.solved = false;
    }
}

export default Game;
