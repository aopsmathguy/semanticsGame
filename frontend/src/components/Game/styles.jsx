import styled from "styled-components";
//game layout
export const StyledGameLayout = styled.div`
    height: 100dvh;
    display: grid;
    grid-gap: 10px;
    gap: 10px;
    grid-template-areas: "roombar roombar roombar" "gamebar gamebar gamebar" "players game chat";
    grid-template-columns: 1fr 3fr 1.5fr;
    grid-template-rows: min-content 70px 1fr;
    @media (max-width: 768px) and (orientation: portrait) {
        font-size: 0.8em;
        grid-template-areas: 
            "roombar roombar" 
            "gamebar gamebar" 
            "game game"
            "players chat";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: min-content 70px 2fr 1fr; 
    }
`;
export const StyledRoomBarWrapper = styled.div`
    grid-area: roombar;
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
//roombar
export const RoomBarContainer = styled.div`
    border-radius: 15px;
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    background-color: white;
    box-sizing: border-box;
    border: 3px solid black;
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
    font-size: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
//game bar

export const StyledGameBarContainer = styled.div`
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    box-sizing: border-box;
    border: 3px solid #000;
    background-color: white;
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
`;
//playerlist
export const StyledPlayerListArea = styled.div`
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid black;
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
    height: 48px;
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
    margin-bottom: -7px; /* Adjust as needed for spacing */
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
`;
//chat stuff
export const StyledChatContainer = styled.div`
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid black;
`;
export const StyledChatMessagesContainer = styled.div`
    flex: 1 1 auto;
    height: 32px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    color: black;
    scroll-behavior: smooth;
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
    width: auto;
    flex-grow: 0;
    min-width: 0;
    box-sizing: border-box;
    border: 2px solid black;
`;
//guess list and input
export const StyledGuessAreaContainer = styled.div`
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    background-color: #aaa;
    border: 3px solid black;
    align-items: center;
`;
//overlay stuff
export const StyledOverlay = styled.div`
    border-radius: 15px;
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
    padding: 10px;
`;
export const StyledStartButtonContainer = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    padding: 10px;
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
    width: 100px;
`;
export const StyledButton = styled.button`
    font: inherit;
    padding: 5px;
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
    margin-bottom: 10px;
`;
export const StyledPlayerRoundScoresContainer = styled.div`
    width: min(200px, 100%);
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
`;
export const StyledGuessInput = styled.input`
    font: inherit;
    position: relative;
    flex: 0 0 auto;
    width: 120px;
    box-sizing: border-box;
    border: 2px solid black;
`;
export const StyledSuggestionsContainer = styled.div`
    position: absolute;
    z-index: 1;
    background-color: white;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`;
export const StyledSuggestionItem = styled.div`
    cursor: pointer;
    text-align: left;
    border: 0;
    background: rgba(0, 0, 0, 0);
    padding: 5px;
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
    max-width: 400px;
    border: 2px solid black;
    background-color: white;
    scroll-behavior: smooth;
`;

export const StyledGuessRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; 
    border-bottom: 1px solid black;
    padding: 0px 10px;
    min-height: 40px; 
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
    margin: 5px 0;
`;
export const StyledProgressBarWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
export const StyledProgressBarBorder = styled.div`
    border: 2px solid black;
    flex-grow: 1;
`;

export const StyledProgressBar = styled.div`
    height: 20px;
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
`;
export const StyledPlayerAvatarContainer = styled.div`
    width : 0;
    height : 100%;
    display: block;
`;