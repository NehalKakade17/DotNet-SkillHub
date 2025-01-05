import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { fetchUsers } from "../utils/fetchProjects";

const Freelancers = () => {
    const [users, setUsers] = useState([]);
    const [expandedIntro, setExpandedIntro] = useState({});
    const [searchTerm, setSearchTerm] = useState(""); // Search input state

    const freelancerImages = [
        "/f2.png",
        "/f3.png",
        "/f4.png",
        "/f5.png",
        "/f6.png",
        "/f7.png",
        "/f8.png",
        "/f9.png",
        "/f10.png",
    ];

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to load users:", error);
            }
        };
        loadUsers();
    }, []);

    // Filtered users based on search term
    const filteredUsers = users.filter((user) => {
        const userData =
            `${user.firstName} ${user.lastName} ${user.skills} ${user.location} ${user.introduction}`.toLowerCase();
        return userData.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="freelancers-container">
            {/* Search Bar */}
            <div className="search-bar  my-3 mx-3">
                <Form.Control
                    type="text"
                    placeholder="Search Freelancers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                    const randomImage =
                        freelancerImages[
                            Math.floor(Math.random() * freelancerImages.length)
                        ];
                    return (
                        <Card
                            className="freelancer-card my-2 mx-3"
                            key={index}
                            style={{ height: "25vh" }}
                        >
                            <Row className="g-0 h-100 p-1">
                                {/* Image Section */}
                                <Col
                                    xs={2}
                                    md={2}
                                    className="d-flex align-items-center"
                                >
                                    <img
                                        src={randomImage}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="card-img my-1"
                                        style={{
                                            width: "11vw",
                                            height: "21vh",
                                            marginLeft: "1vw",
                                            objectFit: "cover",
                                        }}
                                        loading="lazy"
                                    />
                                </Col>
                                {/* Content Section */}
                                <Col xs={10} md={10}>
                                    <Card.Body className="d-flex flex-column justify-content-between p-2">
                                        {/* Title and Rate */}
                                        <div className="d-flex justify-content-between">
                                            <Card.Title className="mb-1">
                                                {user.firstName} {user.lastName}
                                            </Card.Title>
                                            <div className="text-end fw-bold">
                                                ₹{user.rate}/hr
                                            </div>
                                        </div>

                                        {/* Location and Rating */}
                                        <div className="d-flex justify-content-between mb-2">
                                            <div>⭐ ⭐ ⭐ ⭐ ⭐</div>
                                            <div>{user.location}</div>
                                        </div>

                                        {/* Introduction Section */}
                                        <div className="intro-section mb-2 d-flex">
                                            <div
                                                style={{
                                                    maxHeight: expandedIntro[
                                                        index
                                                    ]
                                                        ? "none"
                                                        : "2em",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "inline-block",
                                                }}
                                            >
                                                {user.introduction}
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="d-flex justify-content-between">
                                            <div className="skills mb-2">
                                                {user.skills
                                                    .split(",")
                                                    .map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="skill"
                                                        >
                                                            {skill.trim()}
                                                            {idx <
                                                                user.skills.split(
                                                                    ","
                                                                ).length -
                                                                    1 && " • "}
                                                        </span>
                                                    ))}
                                            </div>

                                            {/* Buttons */}
                                            <div className="d-flex fBtn  flex-row">
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    className=" me-2 "
                                                >
                                                    Invite to Bid
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2 "
                                                >
                                                    Contact
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    );
                })
            ) : (
                <p>No freelancers found matching your search criteria.</p>
            )}
        </div>
    );
};

export default Freelancers;
