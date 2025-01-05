import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import placeholderImg from "../assets/placeholder.jpg";

const ChatWindow = ({ selectedChat, messages, closeChat }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const contact = useMemo(
        () => messages.find((msg) => msg.id === selectedChat),
        [selectedChat, messages]
    );

    useEffect(() => {
        try {
            const freelancerMessages = messages.filter(
                (msg) => msg.id === selectedChat
            );

            const savedMessages =
                JSON.parse(
                    localStorage.getItem(`chatMessages_${selectedChat}`)
                ) || [];

            const mergedMessages =
                savedMessages.length > 0 ? savedMessages : freelancerMessages;

            setChatMessages(mergedMessages);
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            setChatMessages([]);
        }
    }, [selectedChat, messages]);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                name: "Client",
                message: newMessage,
                time: new Date().toLocaleTimeString(),
                role: "Client",
                img: placeholderImg,
            };

            const updatedMessages = [...chatMessages, message];
            setChatMessages(updatedMessages);

            localStorage.setItem(
                `chatMessages_${selectedChat}`,
                JSON.stringify(updatedMessages)
            );

            setNewMessage("");
        }
    };

    if (!contact) {
        return (
            <div className="chat-window">
                <p>
                    No contact found for this chat. Please select a valid chat.
                </p>
                <button onClick={closeChat} className="close-chat-btn">
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="video-call-button">
                <Link
                    to={`/video-call/${selectedChat}`}
                    className="btn btn-primary"
                >
                    Join Video Call with {contact.name}
                </Link>
            </div>
            <button onClick={closeChat} className="close-chat-btn">
                Close
            </button>
            <h5>Chat with {contact.name}</h5>
            <div className="chat-messages">
                {chatMessages.length === 0 ? (
                    <p>No messages yet</p>
                ) : (
                    chatMessages.map((msg) => (
                        <Message key={msg.id} msg={msg} />
                    ))
                )}
            </div>
            <MessageInput
                newMessage={newMessage}
                handleInputChange={handleInputChange}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

const Message = ({ msg }) => (
    <div className="message">
        <img src={msg.img} alt={msg.name} className="message-img" />
        <div>
            <strong>
                {msg.name} ({msg.role})
            </strong>
            <p>{msg.message}</p>
            <small>{msg.time}</small>
        </div>
    </div>
);

const MessageInput = ({ newMessage, handleInputChange, handleSendMessage }) => (
    <div className="message-input">
        <textarea
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            rows="3"
        />
        <button onClick={handleSendMessage}>Send</button>
    </div>
);

export default ChatWindow;
