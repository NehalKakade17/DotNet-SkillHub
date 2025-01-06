import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import RouterComponent from "./router/Router"; // Import Router.js
import "./style.css"; // Import the global CSS file here

const App = () => {
    const [userRole, setUserRole] = useState(null); // Initially no role
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (role) => {
        setUserRole(role); // Set the role after login
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Store the login state
        localStorage.setItem("userRole", role); // Store the role in localStorage
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        localStorage.removeItem("isLoggedIn"); // Remove the login state
        localStorage.removeItem("userRole"); // Remove the stored role
    };

    useEffect(() => {
        // Check if the user is logged in and fetch the role from localStorage
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn) {
            const savedRole = localStorage.getItem("userRole");
            if (savedRole) {
                setUserRole(savedRole);
            }
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <RouterComponent
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
            <Footer />
        </Router>
    );
};

export default App;
