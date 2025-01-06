import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageUsers = () => {
    // State for managing users, loading, and errors
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null); // Store the userId of the user to delete

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:44338/api/User');
                setUsers(response.data); // Set the users fetched from the backend
                console.log('Fetched users:', response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to load users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); // Fetch users when the component mounts
    }, []);

    // Handle deleting a user
    const handleDelete = async () => {
        if (!userToDelete) {
            console.error('No user to delete');
            return;
        }
        console.log('Deleting user with ID:', userToDelete);
        try {
            // Make DELETE request to delete the user
            await axios.delete(`https://localhost:44338/api/User/${userToDelete}`);
            setUsers(users.filter(user => user.id !== userToDelete)); // Remove deleted user from state
            setShowConfirmModal(false); // Hide the modal after deletion
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Failed to delete user. Please try again later.');
        }
    };

    // Show the confirmation modal with the user to delete
    const handleShowModal = (id) => {
        console.log("Setting userToDelete:", id);
        setUserToDelete(id); // Set the userId to be deleted
        setShowConfirmModal(true); // Show the confirmation modal
    };

    // Close the confirmation modal
    const handleCloseModal = () => {
        setShowConfirmModal(false); // Hide the modal
        setUserToDelete(null); // Reset the userId
    };

    return (
        <Container>
            <h2>Manage Users</h2>

            {loading && <p>Loading users...</p>}
            {error && <p className="text-danger">{error}</p>}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        
                        <tr>
                            <td colSpan="6" className="text-center">No users found</td>
                        </tr>
                    ) : (
                            users.map((user, index) => (
                                
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                    <td>
                                        {/* Show both Edit and Delete buttons only for user with id = 1 */}
                                        {user.id === 1 && (
                                            <>
                                                <Link to={`/admin/users/edit/${user.id}`}>
                                                    <Button variant="warning" className="me-2">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </>
                                        )}

                                        {/* Always show Delete button */}
                                        <Button variant="danger" onClick={() => handleShowModal(user.id)}>
                                            Delete
                                        </Button>
                                    </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            {/* Confirmation Modal for Delete */}
            <Modal show={showConfirmModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageUsers;
