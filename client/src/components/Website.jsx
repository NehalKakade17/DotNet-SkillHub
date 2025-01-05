import { Container, Row, Col } from "react-bootstrap";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Graphics.css";
import img1 from "../Asset/img1.png";
import img2 from "../Asset/img2.png";
import img3 from "../Asset/img3.png";
import img4 from "../Asset/img4.png";
import gimg from "../Asset/g2.png";
import React from "react";
const Graphics = () => {
    return (
        <div id="main">
            <div>
                {/* ******Image************* */}
                <div id="imgdiv">
                    <div className="banner-card">
                        <img src={gimg} alt="My Image" />
                    </div>

                    <div className="banner-text">
                        <h1>Hire Expert </h1>
                        <h1>Website Designers </h1>
                        <h1>for any job </h1>
                        <h6>Millions of people use Freelancer to</h6>
                        <h6>turn their ideas into reality.</h6>
                    </div>
                </div>

                <Container fluid id="graprow">
                    <Row>
                        <Col xs={11} md={6} id="col1">
                            <h3>What is Website Design?</h3>
                            <p>
                                When considering the term website design more
                                often consumers reference the process of
                                creating visual elements of a website for
                                distribution to end-users, via the internet. The
                                color schemes, typography or fonts, imagery,
                                layout and overall graphical appearance are
                                typically forefront of one’s mind as a visible
                                demonstration of careful planning and design
                                formation.
                            </p>
                        </Col>
                        <Col xs={11} md={6} id="col2">
                            <h3>Hire a Website Designer</h3>
                            <p>
                                On SkillHub.com, you can hire a Web Designer to
                                create a website or update your existing
                                website, whether it's completely custom or
                                hosted on platforms like Squarespace, Wix... and
                                more!
                            </p>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            </div>
            <div className="bottomContainerParent">
                <div className="container bottom-container text-center">
                    <div className="btmContHeading">
                        <h2>How Hiring a Website Designer Works</h2>
                    </div>
                    <div className="row">
                        {/* Step 1: Post a Job */}
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                            <div className="step-box">
                                <img src={img3} alt="My Image" height="60px" />
                                <h3>1. Post a Job</h3>
                                <p>Tell us what you need done in seconds.</p>
                            </div>
                        </div>
                        {/* Step 2: Choose a Freelancer */}
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                            <div className="step-box">
                                <img src={img4} alt="My Image" height="60px" />
                                <h3>2. Choose a Freelancer</h3>
                                <p>
                                    Get your first bid in seconds and choose
                                    from the best.
                                </p>
                            </div>
                        </div>
                        {/* Step 3: Track Progress */}
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                            <div className="step-box">
                                <img src={img2} alt="My Image" height="60px" />
                                <h3>3. Track Progress</h3>
                                <p>
                                    Chat with your freelancer and review their
                                    work 24/7.
                                </p>
                            </div>
                        </div>
                        {/* Step 4: Pay Safely */}
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                            <div className="step-box">
                                <img src={img1} alt="My Image" height="60px" />
                                <h3>4. Pay Safely</h3>
                                <p>
                                    Only pay when you're completely satisfied.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graphics;
