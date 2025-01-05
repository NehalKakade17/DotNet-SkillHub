// import { useState } from "react";
// import { Container, Form, Button, Row, Col } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const SignUp = () => {
//     // State for form data
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });
//     const validateForm = () => {
//         const newErrors = {};

//         // Name validation (required)
//         if (!formData.name) {
//             newErrors.name = "Name is required";
//         } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
//             newErrors.name =
//                 "Name cannot contain numbers or special characters";
//         } else if (formData.name.length < 2) {
//             newErrors.name = "Name must be at least 2 characters long";
//         }

//         // Email validation (required and valid email format)
//         if (!formData.email) {
//             newErrors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = "Email is invalid";
//         }

//         // Password validation (required and minimum length of 6 characters)
//         if (!formData.password) {
//             newErrors.password = "Password is required";
//         } else if (formData.password.length < 6) {
//             newErrors.password = "Password must be at least 6 characters";
//         }

//         setErrors(newErrors);

//         return Object.keys(newErrors).length === 0; // Return true if no errors
//     };
//     const [errors, setErrors] = useState({});
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     // Handle form data change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             const existingUsers =
//                 JSON.parse(localStorage.getItem("users")) || [];
//             existingUsers.push(formData);
//             localStorage.setItem("users", JSON.stringify(existingUsers));
//             setMessage("Sign-up successful! Please log in.");

//             // Simulate sign-up logic and redirect to login after successful sign-up
//             setTimeout(() => {
//                 navigate("/login");
//             }, 1); // Wait for 2 seconds before redirecting
//         }
//     };

//     return (
//         <Container
//             className="d-flex justify-content-center"
//             style={{ minHeight: "100vh" }}
//         >
//             <div className="w-100" style={{ maxWidth: "400px" }}>
//                 <h2 className="my-4">Sign Up</h2>

//                 {/* Sign-Up Form */}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="formName">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter your name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             isInvalid={!!errors.name}
//                             style={{ width: "400px" }}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             {errors.name}
//                         </Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group controlId="formEmail" className="mt-3">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter your email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             isInvalid={!!errors.email}
//                             style={{ width: "400px" }}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             {errors.email}
//                         </Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group controlId="formPassword" className="mt-3">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Enter your password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             isInvalid={!!errors.password}
//                             style={{ width: "400px" }}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             {errors.password}
//                         </Form.Control.Feedback>
//                     </Form.Group>

//                     <Button variant="primary" type="submit" className="mt-3">
//                         Sign Up
//                     </Button>
//                 </Form>

//                 {/* Toggle between Sign-Up and Login */}
//                 {message && (
//                     <Row className="mt-4">
//                         <Col className="text-center">
//                             <p className="text-success">{message}</p>
//                         </Col>
//                     </Row>
//                 )}

//                 {/* Link to Login page */}
//                 <Row className="mt-4">
//                     <Col className="text-center">
//                         <span>
//                             Already have an account?{" "}
//                             <Link
//                                 to="/Login"
//                                 style={{ textDecoration: "none" }}
//                             >
//                                 Log In
//                             </Link>
//                         </span>
//                     </Col>
//                 </Row>

//                 {/* Link back to Home */}
//                 <div className="mt-3 text-center">
//                     <Link to="/">Back to Home</Link>
//                 </div>
//             </div>
//         </Container>
//     );
// };

// export default SignUp;
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { postUserDetails } from "../utils/fetchProjects";

const SignUp = () => {
    // State for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        location: "",
        designation: "",
        introduction: "",
        skills: "",
        rate: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};

        // First Name validation
        if (!formData.firstName) {
            newErrors.firstName = "First name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
            newErrors.firstName = "First name should only contain letters";
        } else if (formData.firstName.length < 2) {
            newErrors.firstName = "First name must be at least 2 characters";
        }

        // Last Name validation
        if (!formData.lastName) {
            newErrors.lastName = "Last name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
            newErrors.lastName = "Last name should only contain letters";
        } else if (formData.lastName.length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters";
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/.test(
                formData.password
            )
        ) {
            newErrors.password =
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }

        // Location validation
        if (!formData.location) {
            newErrors.location = "Location is required";
        }

        // Designation validation
        if (!formData.designation) {
            newErrors.designation = "Designation is required";
        }

        // Introduction validation
        if (!formData.introduction) {
            newErrors.introduction = "Introduction is required";
        } else if (formData.introduction.length < 10) {
            newErrors.introduction =
                "Introduction must be at least 10 characters long";
        }

        // Skills validation
        if (!formData.skills) {
            newErrors.skills = "Skills are required";
        }

        // Rate validation
        if (!formData.rate) {
            newErrors.rate = "Rate is required";
        } else if (isNaN(formData.rate) || formData.rate <= 0) {
            newErrors.rate = "Rate must be a positive number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const responseData = await postUserDetails(formData); // Post to the backend

                // Success message and redirect
                setMessage("Sign-up successful! Please log in.");
                console.log("Server Response:", responseData); // Optional: Log the response for debugging

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } catch (error) {
                // Show error message
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <Container
            className="d-flex justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="my-4 text-center">Sign Up</h2>

                {/* Sign-Up Form */}
                <Form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your first name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group controlId="formLastName" className="mt-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label>Email Address</Form.Label>
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

                    {/* Password */}
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

                    {/* Location */}
                    <Form.Group controlId="formLocation" className="mt-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            isInvalid={!!errors.location}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.location}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Designation */}
                    <Form.Group controlId="formDesignation" className="mt-3">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            isInvalid={!!errors.designation}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.designation}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Introduction */}
                    <Form.Group controlId="formIntroduction" className="mt-3">
                        <Form.Label>Introduction</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us about yourself"
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleChange}
                            isInvalid={!!errors.introduction}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.introduction}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Skills */}
                    <Form.Group controlId="formSkills" className="mt-3">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your skills (comma-separated)"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            isInvalid={!!errors.skills}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.skills}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Rate */}
                    <Form.Group controlId="formRate" className="mt-3">
                        <Form.Label>Rate (in INR)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your rate"
                            name="rate"
                            value={formData.rate}
                            onChange={handleChange}
                            isInvalid={!!errors.rate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.rate}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-4 w-100"
                    >
                        Sign Up
                    </Button>
                </Form>

                {/* Success Message */}
                {message && (
                    <Row className="mt-4">
                        <Col className="text-center">
                            <p className="text-success">{message}</p>
                        </Col>
                    </Row>
                )}

                {/* Link to Login */}
                <Row className="mt-4">
                    <Col className="text-center">
                        <span>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                style={{ textDecoration: "none" }}
                            >
                                Log In
                            </Link>
                        </span>
                    </Col>
                </Row>

                {/* Link to Home */}
                <div className="mt-3 text-center">
                    <Link to="/login">Back to Home</Link>
                </div>
            </div>
        </Container>
    );
};

export default SignUp;
