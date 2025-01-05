import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the Home page after 3 seconds
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, [navigate]);

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow text-center">
                        <Card.Body>
                            <h2 className="text-success mb-4">
                                Thank You for Hiring!
                            </h2>
                            <p className="mb-4">
                                Your freelancer has been successfully hired. We
                                will be in touch with you soon!
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                className="mt-3"
                                onClick={() => navigate("/")}
                            >
                                Back to Home
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ThankYouPage;
