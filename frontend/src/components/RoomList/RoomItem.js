import { StyledHints, StyledJoinButton, StyledPlayers, StyledRoomItem, StyledRoomName } from "./styles";

function RoomItem({
    roomId,
    roomName,
    playersData,
    settings,
    onJoinRoom
}){
    const maxPlayers = settings.maxPlayers;
    const players = Object.keys(playersData).length;
    const numberOfHints = settings.numberOfHints;
    return <StyledRoomItem>
        <StyledRoomName>{roomName}</StyledRoomName>
        <StyledHints>{numberOfHints} hints</StyledHints>
        <StyledPlayers>{players}/{maxPlayers} players</StyledPlayers>
        <StyledJoinButton onClick={() => onJoinRoom({roomId})}>Join</StyledJoinButton>
    </StyledRoomItem>
}
export default RoomItem;