import styled from "styled-components";
//game layout
export const StyledGameLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;
export const StyledRoomBarWrapper = styled.div`
    height: 30px;
`;
export const StyledGameBarWrapper = styled.div`
    height: 70px;
    padding-bottom: 10px;
`;

export const StyledGameContentWrapper = styled.div`
    display: flex;
    flex-grow: 1;
`;

export const StyledPlayersSidebarWrapper = styled.div`
    width: min(200px, 24%);
    padding-right: 10px;
`;

export const StyledGuessListAndInputWrapper = styled.div`
    position: relative;
    flex-grow: 1;
`;

export const StyledChatWrapper = styled.div`
    width: min(300px, 36%);
    padding-left: 10px;
`;
//roombar
export const RoomBarContainer = styled.div`
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    background-color: #ccc;
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
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid black;
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
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid black;
    align-items: center;
`;
//overlay stuff
export const StyledOverlay = styled.div`
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
    // overflow-y: auto;
`;

export const StyledSettingRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

export const StyledLabel = styled.label`
    text-align: left;
    color: white;
`;

export const StyledSelect = styled.select`
    font: inherit;
    width: 100px;
`;
export const StyledButton = styled.button`
    font: inherit;
    padding: 5px;
    flex: 1 1 auto;
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
`;

export const StyledGuessRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ isLastGuess }) =>
        isLastGuess ? "lightgreen" : "white"};
    border-bottom: 1px solid black;
`;

export const StyledWordColumn = styled.div`
    width: min(100px, 25%);
    font-weight: bold;
`;

export const StyledSimilarityColumn = styled.div`
    width: min(100px, 25%);
    text-align: center;
`;

export const StyledProgressBarContainer = styled.div`
    width: min(150px, 37.5%);
    margin: 5px 0;
`;
export const StyledProgressBarBorder = styled.div`
    border: 2px solid black;
`;

export const StyledProgressBar = styled.div`
    height: 20px;
    width: ${({ sim }) => `${sim * 100}%`};
    background-color: ${({ sim }) => `hsl(${sim ** 0.5 * 100}, 100%, 50%)`};
`;

export const StyledPlayerAvatarColumn = styled.div`
    width: min(50px, 12.5%);
`;
