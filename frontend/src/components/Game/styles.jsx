import styled from "styled-components";
//game layout
export const StyledGameLayout = styled.div`
    height: 100dvh;
    width: 100vw;
    display: grid;
    grid-gap: 0.25em;
    gap: 0.25em;
    grid-template-areas: "roombar roombar roombar" "gamebar gamebar gamebar" "players game chat";
    grid-template-columns: 1fr 3fr 1.5fr;
    grid-template-rows: min-content min-content 1fr;
    @media (max-width: 768px) and (orientation: portrait) {
        grid-template-areas: 
            "gamebar gamebar" 
            "game game"
            "players chat"
            "keyboard keyboard";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: min-content 2.5fr 1fr min-content; 
    }
`;
export const StyledRoomBarWrapper = styled.div`
    grid-area: roombar;
    @media (max-width: 768px) and (orientation: portrait) {
        display: none;
    }
`;
export const StyledGameBarWrapper = styled.div`
    grid-area: gamebar;
`;

export const StyledPlayersSidebarWrapper = styled.div`
    grid-area: players;
`;

export const StyledGuessListAndInputWrapper = styled.div`
    position: relative;
    grid-area: game;
`;


export const StyledChatWrapper = styled.div`
    grid-area: chat;
`;
export const StyledKeyboardWrapper = styled.div`
    grid-area: keyboard;
    display: none;
    @media (max-width: 768px) and (orientation: portrait) {
        display: block;
    }
`;
//roombar
export const RoomBarContainer = styled.div`
    border-radius: 0.75em;
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    background-color: white;
    box-sizing: border-box;
    border: 0.15em solid black;
`;

export const RoomName = styled.div`
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
`;

export const LeaveButton = styled.div`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
//game bar

export const StyledGameBarContainer = styled.div`
    border-radius: 0.75em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    box-sizing: border-box;
    border: 0.15em solid #000;
    background-color: white;
    padding: 0.25em;
`;
export const StyledGameBar = styled.div`
    width: 100%;
    height: 100%;
`;
export const StyledTimer = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center; /* Align items vertically */
`;
export const StyledEmphasis = styled.div`
    left: 0;
    top: 50%;
    transform: translate(0px, -50%);
    display: flex;
    align-items: center;

    opacity: 0;
    animation: ${({ timerEmphasis }) =>
        timerEmphasis ? "pulse 0.5s infinite" : "none"};
    @keyframes pulse {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0.5;
        }
    }
`;

export const StyledGameBarPlayerAvatar = styled.div`
    position: absolute;
    right: 0;
    top : 50%;
    transform: translateY(-50%);
    overflow: hidden;
`;
//playerlist
export const StyledPlayerListArea = styled.div`
    border-radius: 0.75em;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 0.15em solid black;
    overflow: hidden;
`;
export const StyledPlayerListContainer = styled.div`
    flex: 1 1 auto;
    height: 32px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    color: black;
`;
export const StyledPlayerCard = styled.div`
    flex: 0 0 auto;
    cursor: pointer;
    position: relative;
    width: 100%;
    &:nth-child(odd) {
        background-color: ${({ solved }) =>
            solved ? "hsl(120, 100%, 80%)" : "hsl(0, 0%, 90%)"};
    }
    &:nth-child(even) {
        background-color: ${({ solved }) =>
            solved ? "hsl(120, 100%, 90%)" : "hsl(0, 0%, 100%)"};
    }
`;
export const StyledPlayerInfo = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-grow: 1; /* Allow this element to take up remaining space */
`;

export const StyledPlayerName = styled.div`
    font-weight: bold;
    margin-bottom: -0.35em; 
    color: ${({ isMe }) => (isMe ? "blue" : "black")};
    text-decoration: ${({ isHost }) => (isHost ? "underline" : "none")};
`;

export const StyledPlayerScore = styled.div`
    font-style: italic;
    color: grey;
`;
export const StyledPlayerAvatar = styled.div`
    position: absolute;
    right: 0;
    top : 50%;
    transform: translateY(-50%);
    overflow: hidden;
`;
export const StyledPlayerRank = styled.div`
    position: absolute;
    left: 0;
    top : 0;
    font-weight: bold;
    margin-left: 0.3em;
`;
//chat stuff
export const StyledChatContainer = styled.div`
    border-radius: 0.75em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 0.15em solid black;
`;
export const StyledChatMessagesContainer = styled.div`
    flex: 1 1 auto;
    height: 32px;
    overflow-x: hidden;
    overflow-y: auto;
    color: black;
    scroll-behavior: smooth;
    word-break: break-all;
`;
export const StyledChatMessageItem = styled.p`
    padding: 0.2em;
    margin: 0;
    color: ${({ color }) => color || "inherit"};
    &:nth-child(odd) {
        background-color: #f0f0f0;
    }
    &:nth-child(even) {
        background-color: #ffffff;
    }
`;
export const StyledChatSendArea = styled.input`
    position: relative;
    font: inherit;
    height: 2.2em;
    width: 100%;
    flex-grow: 0;
    min-width: 0;
    box-sizing: border-box;
    border: 0.1em solid black;
`;
//guess list and input
export const StyledGuessAreaContainer = styled.div`
    border-radius: 0.75em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    background-color: #aaa;
    border: 0.15em solid black;
    align-items: center;
`;
//overlay stuff
export const StyledOverlay = styled.div`
    border-radius: 0.75em;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    visibility: ${({ hideOverlay }) => (hideOverlay ? "hidden" : "visible")};
    transition: visibility 1s;
`;
export const StyledGuessAreaOverlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: ${({ hideOverlay }) => (hideOverlay ? 0 : 1)};
    visibility: ${({ hideOverlay }) => (hideOverlay ? "hidden" : "visible")};
    transition: opacity 1s, visibility 1s;
`;
export const StyledGuessAreaOverlayContent = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: ${({ hideOverlay }) =>
        hideOverlay ? "translateY(-100%)" : "translateY(0)"};
    visibility: ${({ hideOverlay }) => (hideOverlay ? "hidden" : "visible")};
    transition: transform 1s, visibility 1s;
    overflow-y: auto;
`;
export const StyledRoomSettingsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const StyledRoomSettingsListContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

export const StyledSettingRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
`;
export const StyledStartButtonContainer = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    padding: 0.5em;
`;
export const StyledLabel = styled.label`
    text-align: left;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
export const StyledSelect = styled.select`
    font: inherit;
    width: 5em;
`;
export const StyledButton = styled.button`
    font: inherit;
    padding: 0.25em;
    flex: 1 1 auto;
    border: 0;
    background-color: #080;
    color: white;
    &:hover {
        filter: brightness(90%);
    }
    &:disabled {
      filter: brightness(50%);
      cursor: not-allowed;
    }
`;
export const StyledWordReveal = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
`;
export const StyledPlayerRoundScoresContainer = styled.div`
    width: min(10em, 100%);
    display: flex;
    flex-direction: column;
    // overflow-y: auto;
`;
export const StyledPlayerRoundScores = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledWaitRoundContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

//guess input stuff
export const StyledGuessInputContainer = styled.div`
    display: flex;
    flex: 0 0 auto;
    @media (max-width: 768px) and (orientation: portrait) {
        display: none;
    }
`;
export const StyledGuessInput = styled.input`
    font: inherit;
    position: relative;
    flex: 0 0 auto;
    width: 150px;
    box-sizing: border-box;
    border: 0.1em solid black;
`;
export const StyledSuggestionsContainer = styled.div`
    position: absolute;
    z-index: 1;
    background-color: white;
    border: 0.05em solid black;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;
export const StyledSuggestionItem = styled.div`
    cursor: pointer;
    text-align: left;
    border: 0;
    background: rgba(0, 0, 0, 0);
    padding: 0.25em;
    background: white;
    &.highlighted {
        background: lightgray;
    }
`;
//guess list stuff

export const StyledGuessListContainer = styled.div`
    flex: 1 1 auto;
    height: 32px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    color: black;
    width: 100%;
    max-width: 22em;
    border: 0.1em solid black;
    background-color: white;
    scroll-behavior: smooth;
`;

export const StyledGuessRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; 
    border-bottom: 1px solid black;
    padding: 0em 0.5em;
    &:nth-child(odd) {
        background-color: ${({ isLastGuess }) =>
        isLastGuess ? "lightgreen" : "#f0f0f0"};
    }
    &:nth-child(even) {
        background-color:${({ isLastGuess }) =>
        isLastGuess ? "lightgreen" : "#ffffff"};
    }
`;

export const StyledWordColumn = styled.div`
    flex : 2;
    font-weight: bold;
`;

export const StyledSimilarityColumn = styled.div`
    flex : 1;
    text-align: center;
`;

export const StyledProgressBarContainer = styled.div`
    flex : 1.5;
`;
export const StyledProgressBarWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
export const StyledProgressBarBorder = styled.div`
    border: 0.1em solid black;
    flex-grow: 1;
    height: 1em;
`;

export const StyledProgressBar = styled.div`
    height: 100%;
    width: ${({ ranking }) => `${100-ranking}%`};
    background-color: ${({ ranking }) => `hsl(${100-ranking}, 100%, 50%)`};
`;
export const StyledProgressBarText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const StyledPlayerAvatarColumn = styled.div`
    flex : 0.5;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-right: 36px;
`;
export const StyledPlayerAvatarContainer = styled.div`
    width : 0;
    height : 100%;
    display: block;
    position: relative;
`;
export const StyledPlayerAbsoluteAvatar = styled.div`
    position: absolute;
    height: 36px;
    top: 50%;
    transform: translateY(-50%); 
    overflow: hidden;
`;
//keyboard styles
export const MobileInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
`;
export const MobileInputSuggestionsWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
export const StyledGuessInputMobile = styled.div`
    height: 2.2em;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: left;
    border: 0em solid black;
    box-sizing: border-box;
    background-color: #88f;
    color: white;
    padding: 0 5px;
`;
export const StyledCursor = styled.div`
    display: inline;
    width: .2ch;
    margin-left: .25ch;
    height: 80%;
    background-color: white;
    animation: cursorpulse 1s infinite;
    @keyframes cursorpulse {
        0% {
            opacity: 1;
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        75% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
`;