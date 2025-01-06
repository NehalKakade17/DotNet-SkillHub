import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const Dashboard = ({ userRole }) => {
    return (
      <Container>
        <h2>{userRole === "Admin" ? "Admin Dashboard" : "User Dashboard"}</h2>

      {/* Admin Section */}
      {userRole === 'Admin' && (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>
                  You can view and manage all registered users.
                </Card.Text>
                <Link to="/admin/users">
                  <Button variant="primary">Manage Users</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>System Settings</Card.Title>
                <Card.Text>
                  Configure system settings like project categories.
                </Card.Text>
                <Link to="/admin/settings">
                  <Button variant="primary">Manage Settings</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* User Section */}
      {userRole === 'User' && (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Your Projects</Card.Title>
                <Card.Text>
                  View and manage the projects you are working on.
                </Card.Text>
                <Link to="/projects">
                  <Button variant="primary">View Projects</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Freelancer Directory</Card.Title>
                <Card.Text>
                  Browse freelancers based on your project needs.
                </Card.Text>
                <Link to="/hirefreelancers">
                  <Button variant="primary">Browse Freelancers</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* General Dashboard Content */}
      <Row className="mt-5">
        <Col>
          <h2>Quick Actions</h2>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Update Profile</Card.Title>
                  <Card.Text>
                    Update your personal details.
                  </Card.Text>
                  <Link to="/profile">
                    <Button variant="secondary">Edit Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>View Payment History</Card.Title>
                  <Card.Text>
                    View your payment and transaction history.
                  </Card.Text>
                  <Link to="/payment">
                    <Button variant="secondary">View History</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
Dashboard.propTypes = {
    userRole: PropTypes.string,  // Change this to allow null or undefined
};

export default Dashboard;
