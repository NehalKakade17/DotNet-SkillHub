// routing/Router.js
import { Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import HomePage from "../components/HomePage";
import PaymentPage from "../components/PaymentPage";
import MessagesPage from "../components/MessagesPage";
import HireFreelancers from "../components/HireFreelancers";
import VideoCall from "../components/VideoCall";
import HireConfirmation from "../components/HireConfirmation"; // Import HireConfirmation
import ThankYouPage from "../components/ThankYouPage"; // Import ThankYouPage
import ProfilePage from "../components/ProfilePage";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useEffect, useState } from "react";
import Navigation from "../components/Navbar";
import Projects from "../components/Projects";
import Freelancers from "../components/Freelancers";
import Graphics from "../components/Graphics";
import Web from "../components/Website";
import Mobile from "../components/Mobile";
import Software from "../components/Software";
import ThreeD from "../components/ThreeD";
import Illustration from "../components/Illustration";
import Data from "../components/Data";
import Cyber from "../components/Cyber";
import CreateProject from "../components/Project";

const Router = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    };
    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <>
            {" "}
            <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                {/* Define all your routes here */}
                <Route path="/" element={<HomePage />} /> {/* Home Page */}
                <Route path="/payment" element={<PaymentPage />} />{" "}
                {/* Payment Page */}
                <Route path="/messages" element={<MessagesPage />} />{" "}
                {/* Messages Page */}
                <Route path="/freelancers" element={<HireFreelancers />} />{" "}
                <Route path="/projects" element={<Projects />} />{" "}
                {/* Freelancer List */}
                <Route path="/video-call/:id" element={<VideoCall />} />{" "}
                {/* Video Call */}
                <Route
                    path="/hire-confirmation"
                    element={<HireConfirmation />}
                />{" "}
                <Route path="/payment" element={<PaymentPage />} />
                {/* Hire Confirmation Page */}
                <Route path="/thank-you" element={<ThankYouPage />} />{" "}
                {/* Thank You Page */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/hirefreelancers" element={<Freelancers />} />
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} />}
                />
                <Route path="/signup" element={<SignUp />} />
                {/*hire freelancers by category routes */}
                <Route path="/graphics" element={<Graphics />} />
                <Route path="/web" element={<Web />} />
                <Route path="/mobile" element={<Mobile />} />
                <Route path="/software" element={<Software />} />
                <Route path="/threed" element={<ThreeD />} />
                <Route path="/illu" element={<Illustration />} />
                <Route path="/data" element={<Data />} />
                <Route path="/cyber" element={<Cyber />} />
                <Route path="/createProject" element={<CreateProject />} />
            </Routes>
        </>
    );
};

export default Router;
