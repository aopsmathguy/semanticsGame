import React, { useState, useRef, useEffect } from "react";
import {
    StyledChatContainer,
    StyledChatMessagesContainer,
    StyledChatMessageItem,
    StyledChatSendArea,
} from "./styles";
import { StyledText } from "../Shared/styles";

function Chat({ messages, sendMessage }) {
    const [message, setMessage] = useState("");
    const messagesContainerRef = useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage(message);
            setMessage("");
        }
    };

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            // Check if we're at the bottom before new message
            const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 35;
            console.log(container.scrollHeight - container.scrollTop,  container.clientHeight);
            if (isAtBottom) {
                // Scroll to bottom if we were at the bottom
                container.scrollTop = container.scrollHeight; 
            }
        }
    }, [messages]); // Run effect whenever messages array changes

    return (
        <StyledChatContainer>
            <StyledChatMessagesContainer ref={messagesContainerRef}>
                {messages.map(({ message, color }, index) => (
                    <StyledChatMessageItem key={index}>
                        <StyledText color={color}>{message}</StyledText>
                    </StyledChatMessageItem>
                ))}
            </StyledChatMessagesContainer>
            <StyledText>
                <StyledChatSendArea
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </StyledText>
        </StyledChatContainer>
    );
}

export default Chat;