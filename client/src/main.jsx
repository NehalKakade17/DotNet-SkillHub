import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS globally
import "./style.css"; // If you have any custom styles

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot instead of render
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

