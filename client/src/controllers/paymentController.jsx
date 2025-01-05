// paymentController.js

const validateCardNumber = (cardNumber) => {
    // Regular expression for validating a credit card number (Luhn's Algorithm check)
    const regex = /^(\d{4}[- ]?){3}\d{4}$/;
    return regex.test(cardNumber.replace(/\s+/g, "").replace(/[-]+/g, ""));
};

const validateExpiryDate = (expiryDate) => {
    const today = new Date();
    const [month, year] = expiryDate.split("/");
    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(year, 10);
    const expiryDateObj = new Date(`20${expiryYear}-${expiryMonth}-01`);

    return expiryDateObj >= today; // Expiry date should be in the future
};

const validateCVV = (cvv) => {
    // CVV should be 3 digits for most cards (Visa, MasterCard, etc.)
    return /^[0-9]{3,4}$/.test(cvv);
};

const processPayment = async (amount, cardNumber, expiryDate, cvv) => {
    return new Promise((resolve, reject) => {
        // Validate the card details
        if (!validateCardNumber(cardNumber)) {
            return reject("Invalid card number. Please check the number.");
        }

        if (!validateExpiryDate(expiryDate)) {
            return reject("Invalid expiry date. Please check the expiration.");
        }

        if (!validateCVV(cvv)) {
            return reject("Invalid CVV. It should be 3 or 4 digits.");
        }

        // Simulate a delay as a mock of a real payment gateway
        setTimeout(() => {
            // Simulating success response from the payment gateway
            if (amount > 0) {
                resolve("Payment Successful!");
            } else {
                reject("Payment Failed! Please check your details.");
            }
        }, 2000);
    });
};

export default processPayment;
