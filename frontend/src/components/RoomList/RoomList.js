import { StyledText } from '../Shared/styles';
import CreateRoomForm from './CreateRoomForm';
import RoomItem from './RoomItem';
import { StyledRoomListWrapper, StyledRoomListBarWrapper, StyledRoomListContainer, StyledMakeRoomContainer } from './styles';
function RoomList({ roomList, onJoinRoom, onMakeRoom, onRefresh }) {
    const joinRoomHandler = (roomId) => {
        onJoinRoom({roomId});
    }
    const refreshHandler = () => {
        onRefresh({});
    }
    const roomListEntries = Object.entries(roomList);
    return (
        <StyledRoomListWrapper>
            <StyledRoomListBarWrapper>
                <StyledText fontSize={30}>Room List</StyledText>
                <button onClick={refreshHandler} style={{marginLeft: "10px"}}>Refresh</button>
            </StyledRoomListBarWrapper>
            <StyledRoomListContainer>
                {roomListEntries.length > 0 ? roomListEntries.map(([roomId, room]) => {
                    const { roomName, playersData, settings } = room;
                    const roomIdInt = parseInt(roomId);
                    return (
                        <RoomItem key={roomIdInt} 
                            roomId={roomIdInt}
                            roomName={roomName}
                            playersData={playersData}
                            settings={settings}
                            onJoinRoom={joinRoomHandler.bind(this, roomIdInt)}
                        />
                    );
                }) : <StyledText fontSize={20} color="grey">No rooms available</StyledText>}
            </StyledRoomListContainer>
            <StyledMakeRoomContainer>
                <CreateRoomForm onMakeRoom={onMakeRoom} />
            </StyledMakeRoomContainer>
        </StyledRoomListWrapper>
    );
}
export default RoomList;