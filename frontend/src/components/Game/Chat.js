import React, { useState } from "react";
import { StyledChatContainer, StyledChatMessagesContainer, StyledChatMessageItem, StyledChatSendArea } from "./styles";
function Chat({ messages, sendMessage }) {
    const [ message, setMessage ] = useState('');
    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage(message);
            setMessage('');
        }
    };
    return (
        <StyledChatContainer>
            <StyledChatMessagesContainer>
                {messages.map(({message, color}, index) => (
                    <StyledChatMessageItem 
                        key={index} 
                        color={color}
                    >
                        {message}
                    </StyledChatMessageItem>
                ))}
            </StyledChatMessagesContainer>
            <StyledChatSendArea
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </StyledChatContainer>
    );
}

export default Chat;