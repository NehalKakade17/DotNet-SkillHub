import { BrowserRouter as Router } from "react-router-dom"; // Use Router for wrapping the Routes
import Footer from "./components/Footer";
import RouterComponent from "./router/Router"; // Import Router.js
import "./style.css"; // Import the global CSS file here

const App = () => {
    return (
        <Router>
            <RouterComponent />{" "}
            {/* Use the Router component for handling routes */}
            <Footer />
        </Router>
    );
};

export default App;

