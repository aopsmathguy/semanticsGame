//game screen
import React, { useEffect, useState, useRef } from "react";
import Game from "../components/Game/Game";
import words from "../common/word_list";
import Fuse from "fuse.js";
function GameContainer() {
    const wordFuse = useRef(new Fuse(words, { includeMatches: true }));
    return (
        <Game
            // gameState={'GUESSING'}
            gameState={'WAIT_START'}
            timer={8}
            timerEmphasize={true}
            hostId={2}
            playerId={1}
            players={{
                1: {
                    profile: {
                        name: "Player 1",
                        avatar: {
                            colorIdx: 1,
                            shapeIdx: 1,
                            eyesIdx: 1,
                        },
                    },
                    playerRoomInfo: {
                        playerId: 1,
                        score: 0,
                        solved: false,
                    },
                },
                2: {
                    profile: {
                        name: "Player 2",
                        avatar: {
                            colorIdx: 2,
                            shapeIdx: 2,
                            eyesIdx: 2,
                        },
                    },
                    playerRoomInfo: {
                        playerId: 2,
                        score: 0,
                        solved: false,
                    },
                },
                3: {
                    profile: {
                        name: "Player 3",
                        avatar: {
                            colorIdx: 3,
                            shapeIdx: 3,
                            eyesIdx: 3,
                        },
                    },
                    playerRoomInfo: {
                        playerId: 3,
                        score: 0,
                        solved: true,
                    },
                },
                4: {
                    profile: {
                        name: "Player 4",
                        avatar: {
                            colorIdx: 4,
                            shapeIdx: 0,
                            eyesIdx: 4,
                        },
                    },
                    playerRoomInfo: {
                        playerId: 4,
                        score: 0,
                        solved: true,
                    },
                },
                5: {
                    profile: {
                        name: "Player 5",
                        avatar: {
                            colorIdx: 5,
                            shapeIdx: 1,
                            eyesIdx: 5,
                        },
                    },
                    playerRoomInfo: {
                        playerId: 5,
                        score: 0,
                        solved: false,
                    },
                },
                6: {
                    profile: {
                        name: "Player 6",
                        avatar: {
                            colorIdx: 6,
                            shapeIdx: 2,
                            eyesIdx: 6,
                        },
                    },
                    playerRoomInfo: {
                        playerId: 6,
                        score: 0,
                        solved: false,
                    },
                },
                7: {
                    profile: {
                        name: "Player 7",
                        avatar: {
                            colorIdx: 7,
                            shapeIdx: 3,
                            eyesIdx: 7,
                        },
                    },
                    playerRoomInfo: {
                        playerId: 7,
                        score: 0,
                        solved: false,
                    },
                },
            }}
            settings={{
                maxPlayers: 8,
                guessTime: 60,
                numberOfRounds: 5,
                numberOfHints: 5,
            }}
            onChangeSettings={(data) => {console.log('settings changed', data)}}
            onStartGame={() => {console.log('start game')}}
            currentRound={1}
            guesses={{
                1: {
                    playerId: 1,
                    word: "hello",
                    similarity: 0.5,
                },
                2: {
                    playerId: 2,
                    word: "hi",
                    similarity: 0.7,
                },
                3: {
                    playerId: 3,
                    word: "hey",
                    similarity: 0.9,
                },
                4: {
                    playerId: 4,
                    word: "yo",
                    similarity: 1.0,
                },
                5 : {
                    playerId: 1,
                    word: "word234",
                    similarity: 0.5,
                },
                6: {
                    playerId: 2,
                    word: "word123",
                    similarity: 0.7,
                },
                7: {
                    playerId: 3,
                    word: "word456",
                    similarity: 0.9,
                },
            }}
            lastGuessHash={4}
            wordFuse={wordFuse}
            onGuess={(data) => {console.log('guess', data)}}
            messages={[
                { message: "hello", color: "green" },
                { message: "hi", color: "red" },
                { message: "hey", color: "blue" },
                { message: "yo", color: "yellow" },
                { message: "asef", color: "green" },
                { message: "hi", color: "red" },
                { message: "hey", color: "blue" },
                { message: "yo", color: "yellow" },
                { message: "asef", color: "green" },
                { message: "hello", color: "green" },
                { message: "hi", color: "red" },
                { message: "hey", color: "blue" },
                { message: "yo", color: "yellow" },
                { message: "asef", color: "green" },
                { message: "hi", color: "red" },
                { message: "hey", color: "blue" },
                { message: "yo", color: "yellow" },
                { message: "asef", color: "green" },
                { message: "hello", color: "green" },
                { message: "hi", color: "red" },
                { message: "hey", color: "blue" },
                { message: "yo", color: "yellow" },
                { message: "asef", color: "green" },
                { message: "hi", color: "red" },
                { message: "hey", color: "blue" },
                { message: "yo", color: "yellow" },
                { message: "asef", color: "green" },
            ]}
            sendMessage={(data) => {console.log('message', data)}}
        />
    );
}
export default GameContainer;
