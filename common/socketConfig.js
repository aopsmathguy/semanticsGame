import { SocketConfig } from "./socketUtility.js";
const profileSchema = {
    name: "string",
    avatar: {
        colorIdx: "uint8",
        shapeIdx: "uint8",
        eyesIdx: "uint8",
        mouthIdx: "uint8",
    },
};
const playerRoomInfoSchema = {
    playerId: "int32",
    score: "uint32",
    roundScore: "uint32",
    solved : "boolean",
};
const roomSettingsSchema = {
    maxPlayers: "uint8",
    guessTime: "uint8",
    numberOfRounds: "uint8",
    numberOfHints: "uint8",
};
const guessSchema = {
    playerId: "int32",
    word: "string",
    wordHash: "int32",
    similarity: "float32",
    hidden: "boolean",
    solved: "boolean",
};
export const CONFIG = new SocketConfig({
    packetSchemas: {
        //client to server events
        "join": {
            profile: profileSchema,
        },
        "room-list-request": {},
        "make-room": {
            "room-name": "string",
        },
        "join-room": {
            roomId: "int32",
        },
        "leave-room": {},
        "settings-change": {
            settings: roomSettingsSchema
        },
        "start-game": {},
        "guess": {
            word: "string",
        },
        "chat-message": {
            message: "string",
        },
        //server to client events
        "join-response": {
            playerId: "int32",
            profile: profileSchema,
        },
        "room-list-response": {
            rooms: [
                {
                    roomId: "int32",
                    room: {
                        "room-name": "string",
                        "players": [{
                            "playerId": "int32",
                            "profile" : profileSchema,
                            "playerRoomInfo" : playerRoomInfoSchema
                        }],
                        "settings": roomSettingsSchema,
                    },
                },
            ],
        },
        "join-room-response": {
            roomId: "int32",
            room: {
                "room-name": "string",
                "gameState": "string",
                "timer": "uint32",
                "hostId": "int32",
                "players": [{
                    "playerId": "int32",
                    "profile" : profileSchema,
                    "playerRoomInfo" : playerRoomInfoSchema
                }],
                "settings": roomSettingsSchema,
                "currentRound": "uint8",
                "guesses": [guessSchema],
                "targetWord": "string",
            },
        },
        "join-room-fail": {
            "reason": "string",
        },
        "leave-room-response": {},
        "settings-change-response": {
            settings: roomSettingsSchema
        },
        "round-start": {
            currentRound: "uint8",
        },
        "guess-start": { 
            targetWord: "string",
            guesses : [guessSchema],
        },
        "round-end": {
            "targetWord": "string",
            "scores": [playerRoomInfoSchema],
        },
        "game-end": {
            scores: [
                {
                    playerId: "int32",
                    score: "uint32",
                },
            ],
        },
        "wait-start-game": {},
        "timer": {
            timeLeft: "uint8",
            emphasize: "boolean",
        },
        "spelling-hint": {
            targetWord: "string",//gives another letter in the spelling
        },
        "player-join": {
            playerId: "int32",
            profile: profileSchema,
        },
        "player-leave": {
            playerId: "int32",
        },
        "new-host": {
            hostId: "int32",
        },
        "guess-response": guessSchema,
        "chat-message-response": {
            playerId: "int32",
            message: "string",
        }
    },
    heartBeatInterval: 10000,
    keepAliveTimeout: 20000,
});
