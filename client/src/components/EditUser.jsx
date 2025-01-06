import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams(); // Get the user ID from the URL
    console.log('Edit User ID:', id);
    const navigate = useNavigate(); // For redirecting after saving changes
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null); // State to track errors

    useEffect(() => {
        // Fetch the user data for the given ID
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://localhost:44338/api/User/${id}`);
                setUser(response.data); // Set the fetched user data
            } catch (err) {
                setError('Failed to load user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            id: user.id,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            location: event.target.location.value,
            designation: event.target.designation.value,
            introduction: event.target.introduction.value,
            skills: event.target.skills.value,
            role: user.role // Keep the existing role (since it's read-only)
        
            // Do not update the role field, it will remain as the original value
        };
        console.log('Updated User:', updatedUser);
        try {
            // Make PUT request to update user data
            await axios.put(`https://localhost:44338/api/User/${id}`, updatedUser);

            // Redirect to the user management page after successful update
            navigate('/admin/users');
        } catch (err) {
            setError('Failed to update user data. Please try again later.');
        }
        if (loading) {
            return <p>Loading user data...</p>;
        }

        // Show error message if any
        if (error) {
            return <p className="text-danger">{error}</p>;
        }
    };

    const handleChange = (e) => {
        // Update the user state with the new form values
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) {
        return <p>Loading user data...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <Container>
            <h2>Edit User</h2>
            <Form onSubmit={handleSubmit}>
           
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={user.firstName || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={user.lastName || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {/* Password Field */}
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        defaultValue={user.password}
                        required
                    />
                </Form.Group>

                {/* Location Field */}
                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        defaultValue={user.location}
                        required
                    />
                </Form.Group>

                {/* Designation Field */}
                <Form.Group controlId="designation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                        type="text"
                        name="designation"
                        defaultValue={user.designation}
                        required
                    />
                </Form.Group>

                {/* Introduction Field */}
                <Form.Group controlId="introduction">
                    <Form.Label>Introduction</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="introduction"
                        defaultValue={user.introduction}
                        required
                    />
                </Form.Group>

                {/* Skills Field */}
                <Form.Group controlId="skills">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                        type="text"
                        name="skills"
                        defaultValue={user.skills}
                        required
                    />
                </Form.Group>

                {/* Role Field - Non-editable */}
                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type="text"
                        name="role"
                        value={user.role}
                        disabled
                        readOnly
                    />
                </Form.Group>

                
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
};

export default EditUser;
