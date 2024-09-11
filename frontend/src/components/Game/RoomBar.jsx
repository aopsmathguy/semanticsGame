import { RoomBarContainer, RoomName, LeaveButton } from './styles';

function RoomBar({ roomName, onLeave }) {
  const clickHandler = () => {
    onLeave({});
  };

  return (
    <div style={{position:"relative", "width" : "100%", height : "100%"}}>
        <RoomBarContainer>
            <LeaveButton onClick={clickHandler}>←</LeaveButton>
            <RoomName>{roomName}</RoomName>
        </RoomBarContainer>
    </div>
  );
}

export default RoomBar;