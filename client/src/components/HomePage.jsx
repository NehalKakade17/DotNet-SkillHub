import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import video from "./video.mp4";
import "../style.css";

const HomePage = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (cardId) => {
        setHoveredCard(cardId);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    return (
        <main>
            {/* Hero Section */}
            <section
                className="hero text-white  position-relative"
                style={{
                    height: "100vh",
                    position: "relative",
                    backgroundColor: "black",
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",

                        zIndex: "-1",
                        opacity: "0.4",
                    }}
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Container>
                    <Container className="hero-content">
                        <h1 className="display-2 fw-bolder">
                            Welcome to SkillHub
                        </h1>

                        <p className="lead fw-bold">
                            Find top freelancers for your projects or explore
                            exciting opportunities today!
                        </p>
                        <Row>
                            <Col md={3} sm={0} xs={0}></Col>
                            <Col md={6}>
                                <Button
                                    size="lg"
                                    as={Link}
                                    to="/hirefreelancers"
                                >
                                    Hire Freelancers
                                </Button>{" "}
                                <Button
                                    size="lg"
                                    variant="outline-light"
                                    as={Link}
                                    to="/projects"
                                >
                                    Find Work
                                </Button>
                            </Col>

                            <Col md={3} sm={0} xs={0}></Col>
                        </Row>
                    </Container>
                </Container>
            </section>

            {/* About Us Section */}
            <section className="about-us py-5">
                <Container>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={4}>
                            <div>
                                <h1 className="fw-bold">About Us</h1>
                                <p>
                                    We help connect clients with freelancers to
                                    build amazing projects...
                                </p>
                            </div>

                            {/* About Us Card with Hover Zoom Effect */}
                            <Card
                                className="zoom-card"
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                }}
                                onMouseEnter={() => handleMouseEnter("aboutUs")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    style={{
                                        className: "cardImg",
                                        overflow: "hidden",
                                        position: "relative",
                                        height: "20rem",
                                    }}
                                >
                                    <Card.Img
                                        className="cardImg"
                                        variant="top"
                                        src="https://images.unsplash.com/photo-1597239451147-f163967b8581?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA4fHxmcmVlbGFuY2V8ZW58MHx8MHx8fDA%3D"
                                        alt="About Us"
                                        style={{
                                            objectFit: "cover",
                                            height: "20rem",
                                            width: "100%",
                                            transition: "transform 0.3s ease", // Apply transition for smooth zoom effect
                                            transform:
                                                hoveredCard === "aboutUs"
                                                    ? "scale(1.1)"
                                                    : "scale(1)", // Zoom effect on hover
                                        }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>Our Mission</Card.Title>
                                    <Card.Text>
                                        We are committed to providing the best
                                        platform to connect freelancers with
                                        clients.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={2}></Col>
                        <Col md={4}>
                            <div className="chooseUs">
                                <h1 className="fw-bold">Why Choose Us?</h1>
                                <p>
                                    Our platform offers a wide variety of
                                    talented freelancers...
                                </p>
                            </div>

                            {/* Why Choose Us Card with Hover Zoom Effect */}
                            <Card
                                className="zoom-card"
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                }}
                                onMouseEnter={() =>
                                    handleMouseEnter("whyChooseUs")
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    style={{
                                        overflow: "hidden",
                                        position: "relative",
                                        height: "20rem",
                                    }}
                                >
                                    <Card.Img
                                        className="cardImg"
                                        variant="top"
                                        src="https://plus.unsplash.com/premium_photo-1664199486328-e5d95cab0fcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHxmcmVlbGFuY2V8ZW58MHx8MHx8fDA%3D"
                                        alt="Why Choose Us"
                                        style={{
                                            objectFit: "cover",
                                            height: "20rem",
                                            width: "100%",
                                            transition: "transform 0.3s ease", // Apply transition for smooth zoom effect
                                            transform:
                                                hoveredCard === "whyChooseUs"
                                                    ? "scale(1.1)"
                                                    : "scale(1)", // Zoom effect on hover
                                        }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>Our Value</Card.Title>
                                    <Card.Text>
                                        With FreelancerApp, you get access to a
                                        growing pool of talented freelancers.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default HomePage;
