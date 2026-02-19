import React from "react";
import "./style/WelcomeScreen.css";

const WelcomeScreen = ({ onDismiss }) => {
    return (
        <div className="welcome-overlay">
            <div className="welcome-card">
                {/* Animated background elements */}
                <div className="welcome-bg-orb orb-1"></div>
                <div className="welcome-bg-orb orb-2"></div>
                <div className="welcome-bg-orb orb-3"></div>

                <div className="welcome-content">
                    {/* Header */}
                    <div className="welcome-header">
                        <div className="welcome-logo-icon">◈</div>
                        <h1 className="welcome-title">GEC EventHub</h1>
                        <p className="welcome-tagline">College Event Management Platform</p>
                    </div>

                    {/* About Section */}
                    <div className="welcome-section">
                        <h3>🎯 About This Project</h3>
                        <p>
                            GEC EventHub is a full-stack event management platform built for
                            colleges. Create events, manage enrollments, send automated emails,
                            and interact with an AI assistant — all in one place.
                        </p>
                    </div>

                    {/* Disclaimer Section */}
                    <div className="welcome-section disclaimer">
                        <h3>🛡️ Important Disclaimer</h3>
                        <ul>
                            <li>
                                <span className="bullet safe">✔</span> <span>This website is{" "}
                                    <strong>completely safe</strong> and <strong>not harmful</strong>{" "}
                                    in any way.</span>
                            </li>
                            <li>
                                <span className="bullet safe">✔</span> <span>Created by{" "}
                                    <strong>Sunil Pradhan</strong> as a{" "}
                                    <strong>student project</strong>.</span>
                            </li>
                            <li>
                                <span className="bullet warn">⚠</span> Currently in{" "}
                                <strong>testing phase</strong>.
                            </li>
                            <li>
                                <span className="bullet warn">⚠</span> <span>All data and events
                                    shown are <strong>dummy/sample data</strong>.</span>
                            </li>
                            <li>
                                <span className="bullet safe">✔</span> <span>Every feature and
                                    function is <strong>fully functional</strong> — feel free to
                                    explore and test everything, including the <strong>AI assistant</strong>!</span>
                            </li>
                        </ul>
                    </div>

                    {/* Creator Section */}
                    <div className="welcome-section creator">
                        <h3>👨‍💻 Created By</h3>
                        <div className="creator-info">
                            <div className="creator-avatar">S</div>
                            <div className="creator-details">
                                <span className="creator-name">Sunil Pradhan</span>
                                <a
                                    href="https://sunil-pradhan04.github.io/My-Portfolio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-link"
                                >
                                    🔗 View Portfolio
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="welcome-cta" onClick={onDismiss}>
                        Got it! Let's Explore 🚀
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
