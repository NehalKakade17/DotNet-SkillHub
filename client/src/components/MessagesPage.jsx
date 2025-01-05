import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChatWindow from "./ChatWindow"; // Import the ChatWindow component

const MessagesPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const messages = [
        {
            id: 1,
            name: "Aakash Deshmukh",
            message:
                "Hi, I need some help with a web development project. Can you assist?",
            time: "11:45 AM",
            role: "Web Developer",
            img: "src/assets/placeholder.jpg",
        },
        {
            id: 2,
            name: "Priya Patil",
            message:
                "I’ve completed the UI design, would love to hear your feedback!",
            time: "10:30 AM",
            role: "UI/UX Designer",
            img: "src/assets/placeholder.jpg",
        },
        {
            id: 3,
            name: "Ravi Gaikwad",
            message:
                "Working on an Android app update, can we discuss some features?",
            time: "9:15 AM",
            role: "Android Developer",
            img: "src/assets/placeholder.jpg",
        },
        {
            id: 4,
            name: "Ananya Joshi",
            message:
                "I’m excited about the full-stack development project! Let’s sync soon.",
            time: "8:50 AM",
            role: "Full-Stack Developer",
            img: "src/assets/placeholder.jpg",
        },
        {
            id: 5,
            name: "Arjun Kulkarni",
            message: "Can you please send over the cloud architecture design?",
            time: "7:30 AM",
            role: "Cloud Architect",
            img: "src/assets/placeholder.jpg",
        },
    ];

    const handleChatClick = (chatId) => {
        setSelectedChat(chatId);
    };

    const closeChat = () => {
        setSelectedChat(null);
    };

    return (
        <div className="messages-page">
            <Container fluid>
                <Row className="h-100">
                    {/* List of chats */}
                    <Col
                        md={selectedChat ? 4 : 3} // Shrink when chat is active
                        className="message-list p-0 w-100 d-flex flex-column"
                    >
                        <div className="message-cards-container overflow-auto">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className="message-card"
                                    onClick={() => handleChatClick(msg.id)}
                                >
                                    <div className="message-card-body">
                                        <div className="message-card-header">
                                            <strong>{msg.name}</strong>
                                        </div>
                                        <div className="message-card-body-text">
                                            {msg.message}
                                        </div>
                                        <div className="message-card-footer">
                                            <small>{msg.time}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>

                    {/* Chat window */}
                    {selectedChat && (
                        <Col
                            md={selectedChat ? 8 : 9} // Expand when chat is active
                            className="chat-window-container p-0"
                        >
                            <ChatWindow
                                selectedChat={selectedChat}
                                messages={messages}
                                closeChat={closeChat}
                            />
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default MessagesPage;
