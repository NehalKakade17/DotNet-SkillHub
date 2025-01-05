import { Container, Row, Col, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faGooglePlay,
    faAppStore,
} from "@fortawesome/free-brands-svg-icons";
import "../style.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-5">
            <Container>
                <Row>
                    {/* Freelancer Section */}
                    <Col md={4}>
                        <h6 className="mb-3 fs-4 fw-bold">Freelancer</h6>
                        <Nav className="flex-column">
                            <Nav.Link
                                href="/hirefreelancers"
                                className=" text-white"
                            >
                                Categories
                            </Nav.Link>
                            <Nav.Link href="/projects" className="text-white">
                                Projects
                            </Nav.Link>

                            <Nav.Link
                                href="/freelancers"
                                className="text-white"
                            >
                                Freelancers
                            </Nav.Link>
                        </Nav>
                    </Col>

                    {/* About Section */}
                    <Col md={4}>
                        <h6 className="mb-3 fw-bold fs-4">About</h6>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="text-white">
                                About Us
                            </Nav.Link>
                            <Nav.Link href="/projects" className="text-white">
                                How it Works
                            </Nav.Link>

                            <Nav.Link href="/sitemap" className="text-white">
                                Sitemap
                            </Nav.Link>
                        </Nav>
                    </Col>

                    {/* Apps and Social Section */}
                    <Col md={4}>
                        <h6 className=" mb-3 fw-bold fs-4">Socials</h6>
                        <Nav className="d-flex justify-content-start ">
                            <Nav.Link href="#" className="text-white me-1 fs-4">
                                <FontAwesomeIcon icon={faFacebook} />
                            </Nav.Link>
                            <Nav.Link href="#" className="text-white me-1 fs-4">
                                <FontAwesomeIcon icon={faTwitter} />
                            </Nav.Link>
                            <Nav.Link href="#" className="text-white fs-4">
                                <FontAwesomeIcon icon={faInstagram} />
                            </Nav.Link>
                        </Nav>
                    </Col>
                </Row>

                <hr className="my-4 border-secondary" />

                <p>&copy; 2024 SkillHub. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
