// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-text">JobConnect</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="nav-btn" onClick={() => navigate('/applicant-login')}>Applicant Login</button>
          <button className="nav-btn" onClick={() => navigate('/company-login')}>Company Login</button>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            AI-Powered Job Matching Platform™
          </h1>
          <p className="hero-description">
            Connecting talented professionals with leading companies through intelligent matching algorithms.
            Our platform empowers both job seekers and employers to make data-driven decisions in real-time.
          </p>

          <div className="registration-cards">
            <div className="card company-card">
              <div className="card-content">
                <h2>For Companies</h2>
                <p>Post jobs and find the perfect candidates for your organization</p>
                <ul className="features-list">
                  <li>✓ Smart candidate matching</li>
                  <li>✓ Advanced analytics dashboard</li>
                  <li>✓ Automated screening process</li>
                </ul>
                <button
                  className="register-btn"
                  onClick={() => navigate('/company/register')}
                >
                  Register Company
                </button>
              </div>
            </div>

            <div className="card applicant-card">
              <div className="card-content">
                <h2>For Job Seekers</h2>
                <p>Find your dream job with AI-powered job matching</p>
                <ul className="features-list">
                  <li>✓ Personalized job recommendations</li>
                  <li>✓ Skills assessment tools</li>
                  <li>✓ Career growth tracking</li>
                </ul>
                <button
                  className="register-btn"
                  onClick={() => navigate('/applicant/register')}
                >
                  Register as Applicant
                </button>
              </div>
            </div>

            <div className="card applicant-card">
              <div className="card-content">
                <h2>Get an Ai mock interview</h2>
                <p>Find your dream job with AI-powered job matching</p>
                <ul className="features-list">
                  <li>✓ Personalized job recommendations</li>
                  <li>✓ Skills assessment tools</li>
                  <li>✓ Career growth tracking</li>
                </ul>
                <button
                  className="register-btn"
                  onClick={() => navigate('/user/upload-cv')}
                >
                  Face free AI interview
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="notification-card">
            <div className="notification-icon">
              <svg viewBox="0 0 24 24" fill="none" className="bell-icon">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
              </svg>
            </div>
            <div className="notification-content">
              <p>Over 1000+ companies have joined our platform this month!</p>
            </div>
          </div>
        </div>
      </main>

      <div className="featured-section">
        <p>As featured in</p>
        <div className="featured-logos">
          <div className="logo-item">TechCrunch</div>
          <div className="logo-item">Forbes</div>
          <div className="logo-item">Reuters</div>
          <div className="logo-item">Bloomberg</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;