import React from "react";

export const RegistrationLayout = ({ children }) => {
    return <div className="modern-registration-container">
        <div className="registration-left">
            <div className="content-wrapper">
                <div className="brand-section">
                    <h1>JobConnect</h1>
                    <p className="brand-tagline">Where Great Companies Find Great Talent</p>
                </div>
                <div className="illustration-wrapper">
                    <div className="floating-card">
                        <div className="card-icon">🚀</div>
                        <div className="card-text">Join 10,000+ companies already hiring</div>
                    </div>
                    <div className="floating-card delay-1">
                        <div className="card-icon">📈</div>
                        <div className="card-text">Access to AI-powered matching</div>
                    </div>
                    <div className="floating-card delay-2">
                        <div className="card-icon">🎯</div>
                        <div className="card-text">Smart analytics dashboard</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="registration-right">
            {children}
        </div>
    </div>;
};
