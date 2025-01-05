import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import img1 from "../Asset/img1.png";
import img2 from "../Asset/img2.png";
import img3 from "../Asset/img3.png";
import img4 from "../Asset/img4.png";
import gimg from "../Asset/m3.png";
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
                        <h1>Hire Expert</h1>
                        <h1>Mobile App Designers</h1>
                        <h1>for any job</h1>
                        <h6>Millions of people use Freelancer to</h6>
                        <h6>turn their ideas into reality.</h6>
                    </div>
                </div>

                <div className="container text-center"></div>
                <div className="row" id="graprow">
                    <div className="col-12 col-md-6" id="col1">
                        <h3>What is Mobile App Developers?</h3>
                        <p>
                            Mobile Development is the process of developing
                            software for mobile devices. This includes coding
                            applications for phones, tablets and other portable
                            gadgets, as well as designing the user interface,
                            troubleshooting bugs, creating back-ends for
                            databases, and more. As a Mobile Developer, you'll
                            be able to build customized applications that are
                            tailored to the needs of individual users on a
                            variety of platforms such as iOS and Android.
                        </p>
                    </div>
                    <div className="col-12 col-md-6" id="col2">
                        <h3>Hire a Mobile App Developer</h3>
                        <p>
                            Hiring on SkillHub.com gives you access to certified
                            Mobile Developers from all over the world at
                            competitive rates. Browse through freelance profiles
                            today to find the right fit for your project needs.
                            Post a job today and hire your next Mobile Developer
                            right away!
                        </p>
                    </div>
                </div>
            </div>
            <div className="bottomContainerParent">
                <div className="container bottom-container text-center">
                    <div className="btmContHeading">
                        <h2>How Hiring a Mobile App Developer</h2>
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
