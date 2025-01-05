import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Graphics.css";
import img1 from "../Asset/img1.png";
import img2 from "../Asset/img2.png";
import img3 from "../Asset/img3.png";
import img4 from "../Asset/img4.png";
import gimg from "../Asset/g2.png";
import React from "react";
import { Row, Col } from "react-bootstrap";

const Software = () => {
    return (
        <div id="main">
            <div>
                <div id="imgdiv">
                    <div className="banner-card">
                        <img src={gimg} alt="My Image" />
                    </div>

                    <div className="banner-text">
                        <h1>Hire Expert</h1>
                        <h1>Software Development</h1>
                        <h1>for any job</h1>
                        <h6>Millions of people use Freelancer to</h6>
                        <h6>turn their ideas into reality.</h6>
                    </div>
                </div>

                <Container fluid id="graprow">
                    <Row>
                        <Col xs={11} md={6} id="col1">
                            <h3>What is Software Development?</h3>
                            <p>
                                Software development is the process of creating
                                an application to do specific tasks on a
                                computer or another device. This includes the
                                research, design, programming, and testing of
                                the software. We're talking programming – the
                                wrangling of code. Sometimes this can mean some
                                front-end web development, or a bit of back-end
                                work with your servers and databases.
                            </p>
                        </Col>
                        <Col xs={11} md={6} id="col2">
                            <h3>Hire a Software Developer</h3>
                            <p>
                                Use SkillHub to hire an affordable Software
                                Developer for your project. Whether you need to
                                create a bespoke application or update and
                                maintain and existing codebase, Freelancer.com
                                has you covered.
                            </p>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            </div>
            <div className="bottomContainerParent">
                <div className="container bottom-container text-center">
                    <div className="btmContHeading">
                        <h2>How Hiring a Software Developer works</h2>
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

export default Software;
