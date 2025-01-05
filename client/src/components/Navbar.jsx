import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../style.css"; // Import the global CSS file here

const Navigation = ({ isLoggedIn, handleLogout }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <div className="d-inline-block">
                        <img
                            src="/src/assets/logo.png"
                            alt="logo"
                            className="logo"
                            style={{ width: "35px" }}
                        />
                    </div>{" "}
                    <div className="d-inline-block">SkillHub</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={isActive("/") ? "active-link" : ""}
                        >
                            Home
                        </Nav.Link>

                        {!isLoggedIn ? (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/hirefreelancers"
                                    className={
                                        isActive("/hirefreelancers")
                                            ? "active-link"
                                            : ""
                                    }
                                >
                                    Hire Freelancers
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/login"
                                    className={
                                        isActive("/login") ? "active-link" : ""
                                    }
                                >
                                    Login
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/signup"
                                    className={
                                        isActive("/signup") ? "active-link" : ""
                                    }
                                >
                                    Sign Up
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/freelancers"
                                    className={
                                        isActive("/freelancers")
                                            ? "active-link"
                                            : ""
                                    }
                                >
                                    Freelancers
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/projects"
                                    className={
                                        isActive("/projects")
                                            ? "active-link"
                                            : ""
                                    }
                                >
                                    Projects
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/messages"
                                    className={
                                        isActive("/messages")
                                            ? "active-link"
                                            : ""
                                    }
                                >
                                    Messages
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/profile"
                                    className={
                                        isActive("/profile")
                                            ? "active-link"
                                            : ""
                                    }
                                >
                                    My Profile
                                </Nav.Link>
                                <Nav.Item>
                                    <Button
                                        variant="outline-light"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
