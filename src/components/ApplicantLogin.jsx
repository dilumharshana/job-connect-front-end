import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/applicantLogin.css';

const ApplicantLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/applicant/login', {
                email,
                password,
            });

            if (response.data.loginSuccessful) {
                localStorage.setItem('job-connect-applicant', response.data.token);
                navigate('/applicant-dashboard');
            } else {
                setError(response.data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome Back!</h1>
                <p className="login-subtitle">Login to access your dashboard and continue your journey.</p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        {error.includes('email') && <span className="error-message">{error}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        {error.includes('password') && <span className="error-message">{error}</span>}
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplicantLogin;