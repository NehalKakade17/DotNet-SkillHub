import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const HireConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { freelancer } = location.state || {}; // Access passed freelancer details

    const handleConfirmHire = () => {
        // Navigate to the payment page after confirming the hire
        navigate("/payment", { state: { freelancer } });
    };

    if (!freelancer) {
        return (
            <Container className="text-center py-5">
                <h4>Loading freelancer details...</h4>
            </Container>
        ); // Show a loading message if no freelancer data
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow">
                        <Card.Header className="text-center bg-primary text-white">
                            <h2>Confirm Hire</h2>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-4">
                                <Col xs={12} className="text-center">
                                    <img
                                        src={freelancer.img}
                                        alt={freelancer.name}
                                        className="img-fluid rounded-circle mb-3"
                                        style={{ maxWidth: "150px" }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>
                                        <strong>Name:</strong> {freelancer.name}
                                    </h5>
                                    <h5>
                                        <strong>Role:</strong> {freelancer.role}
                                    </h5>
                                </Col>
                            </Row>
                            <Row className="text-center mt-4">
                                <Col>
                                    <Button
                                        variant="success"
                                        size="lg"
                                        onClick={handleConfirmHire}
                                    >
                                        Confirm Hire
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HireConfirmation;
