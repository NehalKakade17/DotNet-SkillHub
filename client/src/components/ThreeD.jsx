import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Graphics.css";
import img1 from "../Asset/img1.png";
import img2 from "../Asset/img2.png";
import img3 from "../Asset/img3.png";
import img4 from "../Asset/img4.png";
import gimg from "../Asset/g2.png";
const Graphics = () => {
    return (
        <div id="main">
            <div>
                <div id="imgdiv">
                    <div className="banner-card">
                        <img src={gimg} alt="My Image" />
                    </div>

                    <div className="banner-text">
                        <h1>
                            <b>Hire Expert</b>{" "}
                        </h1>
                        <h1>
                            <b>3D Designers</b>{" "}
                        </h1>
                        <h1>
                            <b>for any job</b>{" "}
                        </h1>
                        <h3>Millions of people use Freelancer to</h3>
                        <h3>turn their ideas into reality.</h3>
                    </div>
                </div>
                <Container fluid id="graprow">
                    <div className="row">
                        <div className="col-11 col-md-6" id="col1">
                            <h3>What is 3D Designer?</h3>
                            <p>
                                At SkillHub.com, professional 3D designers who
                                are adept at planning and representing ideas of
                                businesses or products are available for hire.
                                These 3D designers are able to clearly portray
                                messages for easier understanding by clients and
                                other businesses.Through SkillHub.com, you can
                                have an expert designer that is creative, has a
                                business perspective, and can communicate
                                concisely.
                            </p>
                        </div>
                        <div className="col-11 col-md-6" id="col2">
                            <h3>Hire a 3D Designer</h3>
                            <p>
                                With SkillHub.com, you can hire your own expert
                                designer out of over 19 million freelancers
                                without leaving the comfort of your home. All
                                you have to do is post a project, which is free
                                of charge, on the site. Feel free to include any
                                details about your project in order to find the
                                expert who is the best fit for your needs.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="bottomContainerParent">
                <div className="container text-center">
                    <div className="btmContHeading">
                        <h2>How Hiring a 3D Designer Works</h2>
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
