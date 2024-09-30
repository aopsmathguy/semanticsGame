import Avatar from "../Shared/Avatar";
import { StyledHints, StyledJoinButton, StyledPlayerAbsoluteAvatar, StyledPlayerAvatarContainer, StyledPlayerAvatars, StyledPlayers, StyledRoomItem, StyledRoomName } from "./styles";

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
    const avatars = Object.values(playersData).map(player => player.profile.avatar);
    return <StyledRoomItem>
        <StyledRoomName>{roomName}</StyledRoomName>
        <StyledHints>{numberOfHints} hints</StyledHints>
        <StyledPlayers>{players}/{maxPlayers}</StyledPlayers>
        <StyledPlayerAvatars>{
            avatars.map((avatar, i) => (
                <StyledPlayerAvatarContainer key={i}>
                    <StyledPlayerAbsoluteAvatar>
                        <Avatar opts={avatar} size={48} />
                    </StyledPlayerAbsoluteAvatar>
                </StyledPlayerAvatarContainer>
            ))
            }</StyledPlayerAvatars>
        <StyledJoinButton onClick={() => onJoinRoom({roomId})} disabled={players >= maxPlayers}>Join</StyledJoinButton>
    </StyledRoomItem>
}
export default RoomItem;