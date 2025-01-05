import { useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import processPayment from "../controllers/paymentController"; // Import the controller function

const PaymentPage = () => {
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(null); // To show payment status
    const [errors, setErrors] = useState({}); // To store form validation errors
    const navigate = useNavigate();

    const validateInputs = () => {
        const errors = {};
        if (!amount || isNaN(amount) || amount <= 0) {
            errors.amount = "Please enter a valid amount.";
        }
        if (!cardNumber || !validateCardNumber(cardNumber)) {
            errors.cardNumber = "Please enter a valid card number.";
        }
        if (!expiryDate || !validateExpiryDate(expiryDate)) {
            errors.expiryDate = "Please enter a valid expiry date.";
        }
        if (!cvv || !validateCVV(cvv)) {
            errors.cvv = "Please enter a valid CVV.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0; // No errors mean valid input
    };

    // Credit Card Number Validation (Luhn Algorithm)
    const validateCardNumber = (cardNumber) => {
        const regex = /^(\d{4}[- ]?){3}\d{4}$/;
        return regex.test(cardNumber.replace(/\s+/g, "").replace(/[-]+/g, ""));
    };

    // Expiry Date Validation (should be in the future)
    const validateExpiryDate = (expiryDate) => {
        const today = new Date();
        const [month, year] = expiryDate.split("/");
        const expiryMonth = parseInt(month, 10);
        const expiryYear = parseInt(year, 10);
        const expiryDateObj = new Date(`20${expiryYear}-${expiryMonth}-01`);

        return expiryDateObj >= today;
    };

    // CVV Validation (should be 3 or 4 digits)
    const validateCVV = (cvv) => {
        return /^[0-9]{3,4}$/.test(cvv);
    };

    // Credit Card Number Formatting (inserting dashes every 4 digits)
    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, "") // Remove non-digit characters
            .replace(/(\d{4})(?=\d)/g, "$1-")
            .slice(0, 19); // Insert a dash every 4 digits
    };

    // Expiry Date Formatting (inserting slash after 2 digits)
    const formatExpiryDate = (value) => {
        return value
            .replace(/\D/g, "") // Remove non-digit characters
            .replace(/(\d{2})(?=\d)/g, "$1/"); // Insert slash after 2 digits
    };

    // CVV Formatting (ensuring only 3 digits are allowed)
    const formatCVV = (value) => {
        return value.replace(/\D/g, "").slice(0, 3); // Only allow 3 digits
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            const result = await processPayment(
                amount,
                cardNumber,
                expiryDate,
                cvv
            ); // Call the controller function for payment processing
            setPaymentStatus({ success: true, message: result });

            // Redirect to the "Thank You" page after 2 seconds
            setTimeout(() => {
                navigate("/thank-you"); // Redirect to the Thank You page
            }, 2000);
        } catch (error) {
            setPaymentStatus({ success: false, message: error });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="mt-5 shadow-lg">
                        <Card.Body>
                            <Card.Title className="text-center">
                                Payment Page
                            </Card.Title>
                            {paymentStatus && (
                                <Alert
                                    variant={
                                        paymentStatus.success
                                            ? "success"
                                            : "danger"
                                    }
                                    className="text-center"
                                >
                                    {paymentStatus.message}
                                </Alert>
                            )}
                            <form onSubmit={handlePaymentSubmit}>
                                <div className="mb-3">
                                    <label>Amount</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        placeholder="Amount"
                                    />
                                    {errors.amount && (
                                        <div className="text-danger">
                                            {errors.amount}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={cardNumber}
                                        onChange={(e) =>
                                            setCardNumber(
                                                formatCardNumber(e.target.value)
                                            )
                                        }
                                        placeholder="1234-1234-1234-1234"
                                    />
                                    {errors.cardNumber && (
                                        <div className="text-danger">
                                            {errors.cardNumber}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label>Expiry Date (MM/YY)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={expiryDate}
                                        onChange={(e) =>
                                            setExpiryDate(
                                                formatExpiryDate(e.target.value)
                                            )
                                        }
                                        placeholder="MM/YY"
                                    />
                                    {errors.expiryDate && (
                                        <div className="text-danger">
                                            {errors.expiryDate}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label>CVV</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={cvv}
                                        onChange={(e) =>
                                            setCvv(formatCVV(e.target.value))
                                        }
                                        placeholder="123"
                                    />
                                    {errors.cvv && (
                                        <div className="text-danger">
                                            {errors.cvv}
                                        </div>
                                    )}
                                </div>
                                <Button variant="primary" type="submit">
                                    Pay Now
                                </Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
