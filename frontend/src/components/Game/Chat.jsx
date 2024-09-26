import React, { useState, useRef, useEffect } from "react";
import {
    StyledChatContainer,
    StyledChatMessagesContainer,
    StyledChatMessageItem,
    StyledChatSendArea,
} from "./styles";
import Markdown from "react-markdown";

function Chat({ messages, sendMessage, players, playerId }) {
    const [previousScrollTop, setPreviousScrollTop] = useState(0);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [message, setMessage] = useState("");
    const messagesContainerRef = useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (message.trim() === "") return;
            sendMessage({ message });
            setMessage("");
        }
    };
    const onScroll = (e) => {
        const container = messagesContainerRef.current;
        if (container) {
            const bottom =
                (previousScrollTop <= container.scrollTop && isAtBottom) ||
                container.scrollHeight - container.scrollTop <=
                    container.clientHeight + 35;
            setPreviousScrollTop(container.scrollTop);
            setIsAtBottom(bottom);
        }
    };
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            // Check if we're at the bottom before new message
            if (isAtBottom) {
                // Scroll to bottom if we were at the bottom
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [messages]); // Run effect whenever messages array changes

    return (
        <StyledChatContainer>
            <StyledChatMessagesContainer
                ref={messagesContainerRef}
                onScroll={onScroll}
            >
                {messages.map(({ color, content, id}) => (
                    <StyledChatMessageItem key={id} color={color}>
                        <Markdown>{content}</Markdown>
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
