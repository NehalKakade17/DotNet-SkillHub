import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./navigation.css";
import graphics from "../Asset/graphics.png";
import web from "../Asset/web.png";
import software from "../Asset/software.png";
import mobile from "../Asset/mobile.png";
import illu from "../Asset/illustation.png";
import data from "../Asset/data.png";
import threeD from "../Asset/threeD.png";
import cyber from "../Asset/cyber.png";

const categories = [
    { title: "Graphic designers", image: graphics, route: "/graphics" },
    { title: "Website designers", image: web, route: "/web" },
    { title: "Mobile app developers", image: mobile, route: "/mobile" },
    { title: "Software developers", image: software, route: "/software" },
    { title: "3D artists", image: threeD, route: "/threeD" },
    { title: "Illustration", image: illu, route: "/illu" },
    { title: "Data analysis", image: data, route: "/data" },
    { title: "Cybersecurity", image: cyber, route: "/cyber" },
];

const Freelancers = () => {
    return (
        <div>
            {/* Main App Content */}
            <div className="hirebyskills">
                <h1 className="title1">Hire freelancers by skill</h1>
                <div className="card-container1">
                    {categories.map((category) => (
                        <Card key={category.title} category={category} />
                    ))}
                </div>
            </div>

            {/* Routes */}
            <Routes>
                {categories.map((category) => (
                    <Route
                        key={category.title}
                        path={category.route}
                        element={<CategoryPage title={category.title} />}
                    />
                ))}
            </Routes>
        </div>
    );
};

// Card Component with Clickable Div
const Card = ({ category }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(category.route);
    };

    return (
        <div className="card1" onClick={handleNavigate}>
            <img
                src={category.image}
                alt={category.title}
                className="card-image1"
            />
            <div className="card-title1">{category.title}</div>
        </div>
    );
};

// Category Page Component
const CategoryPage = ({ title }) => {
    return (
        <div className="category-page">
            <h1>{title}</h1>
            <p>Welcome to the {title} page! Explore more details here.</p>
        </div>
    );
};

export default Freelancers;
