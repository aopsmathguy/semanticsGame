import styled from 'styled-components';
export const StyledRoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
`;

export const StyledRoomListBarWrapper = styled.div`
    height: 70px;
    box-sizing: border-box;
    border-bottom: 3px solid #000;
    margin-bottom: 10px;
    background-color: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const StyledRoomListContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 3px solid #000;
    background-color: white;
    width : min(600px, 100%);
`;
export const StyledMakeRoomContainer = styled.div`
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 3px solid #000;
    margin-top: 10px;
    background-color: white;
    width : min(600px, 100%);
    height: 60px;
`;

export const StyledRoomItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #000;
    cursor: pointer;
`;
export const StyledRoomName = styled.div`
    flex: 2;
`;
export const StyledHints = styled.div`
    flex: 1;
`;
export const StyledPlayers = styled.div`
    flex: 1;
`;
export const StyledJoinButton = styled.button`
    flex: 1;
    background-color: #00f;
    color: white;
    border: none;
    cursor: pointer;
`;
export const StyledCreateRoom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
`;
export const StyledRoomNameInput = styled.input`
    flex: 2;
`;
export const StyledCreateRoomButton = styled.button`
    flex: 1;
    background-color: #080;
    color: white;
    border: none;
    cursor: pointer;
`;