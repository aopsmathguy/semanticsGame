import React, { useState, useRef, useEffect } from "react";
import {
    StyledChatContainer,
    StyledChatMessagesContainer,
    StyledChatMessageItem,
    StyledChatSendArea,
} from "./styles";

function Chat({ messages, sendMessage, players, playerId }) {
    const myPlayerId = playerId;
    const [message, setMessage] = useState("");
    const messagesContainerRef = useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage({message});
            setMessage("");
        }
    };

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            // Check if we're at the bottom before new message
            const isAtBottom =
                container.scrollHeight - container.scrollTop <=
                container.clientHeight + 35;
            if (isAtBottom) {
                // Scroll to bottom if we were at the bottom
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [messages]); // Run effect whenever messages array changes

    return (
        <StyledChatContainer>
            <StyledChatMessagesContainer ref={messagesContainerRef}>
                {messages.map(({ message, playerId }, index) => (
                    <StyledChatMessageItem key={index}
                    color={myPlayerId == playerId ? "blue" : "black"}>
                            
                            {players[playerId].profile.name}: {message}
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
