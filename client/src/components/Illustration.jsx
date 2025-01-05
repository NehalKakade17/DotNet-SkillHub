import { Container, Col, Row } from "react-bootstrap";

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
                        <h1>Hire Expert</h1>
                        <h1>Illustrators</h1>
                        <h1>for any job</h1>
                        <h6>Millions of people use Freelancer to</h6>
                        <h6>turn their ideas into reality.</h6>
                    </div>
                </div>

                <Container fluid id="graprow">
                    <Row>
                        <Col xs={11} md={6} id="col1">
                            <h3>What is Illustrator</h3>
                            <p>
                                There are many career pathways for artists to
                                purse, one is a freelance illustrator. Freelance
                                illustration is useful in many industries, but
                                is most popular in marketing, publishing and
                                entertainment. If you enjoy drawing, you may
                                consider a career in illustration. In this
                                article, we explain what freelance illustration
                                is, what illustrators do, how to start a career
                                in freelance illustration and provide helpful
                                tips on being a freelance illustrator.
                            </p>
                        </Col>
                        <Col xs={11} md={6} id="col2">
                            <h3>Hire a freelance Illustrator?</h3>
                            <p>
                                Use SkillHub.com to hire an affordable Software
                                Developer for your project. Whether you need to
                                create a bespoke application or update and
                                maintain and existing codebase, SkillHub.com has
                                you covered.
                            </p>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            </div>
            <div className="bottomContainerParent">
                <div className="container bottom-container text-center">
                    <div className="btmContHeading">
                        <h2>How Hiring a freelance Illustrator Works</h2>
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
