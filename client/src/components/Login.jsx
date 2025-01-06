import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/fetchProjects"; // Utility function for login
import PropTypes from "prop-types";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation (required and valid email format)
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        // Password validation (required)
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form before proceeding
        if (validateForm()) {
            try {
                // Send the login credentials and receive the response from the backend
                const response = await loginUser(formData); // Post to backend

                // Log the response to check the structure
                console.log("Login Response:", response);

                // Check if response is valid and contains necessary data
                if (!response || !response.userId || !response.role) {
                    throw new Error("No valid data received from server.");
                }

                // Destructure the user information from the response
                const { role, userId, email, firstName, lastName } = response;

                // Show success message
                setMessage("Login successful!");

                // Trigger onLogin callback to handle login state
                onLogin(role);

                // Store user info in local storage (or any state management)
                localStorage.setItem("userId", userId);
                localStorage.setItem("email", email);
                localStorage.setItem("role", role);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);

                // Redirect based on role after a short delay for better user experience
                setTimeout(() => {
                    if (role === "Admin") {
                        navigate("/Dashboard"); // Admin dashboard redirect
                    } else {
                        navigate("/"); // Redirect to home for regular users
                    }
                }, 2000); // Optional delay for success message
            } catch (error) {
                // Handle different error scenarios
                console.error("Error during login:", error); // Log the error for debugging purposes

                // Check if error has a response (server-side issue)
                if (error.response) {
                    // Show server-side error message (e.g., invalid credentials)
                    setMessage(error.response.data.message || "An error occurred during login.");
                }
                // Check if error is due to request (e.g., network issues)
                else if (error.request) {
                    setMessage("Network error. Please try again later.");
                }
                // Handle unexpected errors (e.g., form validation errors)
                else {
                    setMessage("An unexpected error occurred. Please try again.");
                }
            }
        } else {
            // Display message if validation fails
            setMessage("Please fill in all required fields.");
        }
    };





        


    return (
        <Container
            className="d-flex justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <h2 className="my-4 text-center">Log In</h2>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Log In
                    </Button>
                </Form>

                {message && (
                    <Row className="mt-4">
                        <Col className="text-center">
                            <p
                                className={
                                    message === "Login successful!"
                                        ? "text-success"
                                        : "text-danger"
                                }
                            >
                                {message}
                            </p>
                        </Col>
                    </Row>
                )}

                <Row className="mt-4">
                    <Col className="text-center">
                        <span>
                            Do not have an account?{" "}
                            <Link to="/signup">Sign Up</Link>
                        </span>
                    </Col>
                </Row>
                <div className="mt-3 text-center">
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </Container>
    );
};
Login.propTypes = {
    onLogin: PropTypes.func.isRequired, // onLogin is required and should be a function
};
export default Login;

