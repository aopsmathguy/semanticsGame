import React, {useState} from "react";
import { StyledCreateRoom, StyledCreateRoomButton, StyledRoomNameInput } from "./styles";

const CreateRoomForm = ({ onMakeRoom }) => {
    const [roomName, setRoomName] = useState('');

    const handleChange = (e) => {
        setRoomName(e.target.value);
    };
    const handleSubmit = (e) => {
        onMakeRoom({"room-name" : roomName});
    };
    return (
        <StyledCreateRoom>
            <StyledRoomNameInput
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={handleChange}
            />
            <StyledCreateRoomButton onClick={handleSubmit}>Create Room</StyledCreateRoomButton>
        </StyledCreateRoom>
    );
}
export default CreateRoomForm;