import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    LogOut,
    Lock,
    User,
    Briefcase,
    GraduationCap,
    Save,
    ChevronRight,
    CheckCircle
} from 'lucide-react';
import Select from 'react-select';
import '../styles/Settings.css';

const userName = JSON.parse(localStorage.getItem("job-connect"))?.userName || "User";
const userId = JSON.parse(localStorage.getItem("job-connect"))?.userId || "User";

const ApplicantSettings = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState(userName || '');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activePanel, setActivePanel] = useState(null);

    // Skills and education state
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [experience, setExperience] = useState('');
    const [selectedEducation, setSelectedEducation] = useState([]);

    //utility states
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/applicant/${userId}/settings`)
        setExperience(data?.years_of_experience)
        setSelectedSkills(data?.skills)
        setSelectedEducation(data?.qualifications)
    }

    // Sample options for skills and education
    const skillOptions = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'react', label: 'React' },
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'sql', label: 'SQL' },
        { value: 'mongodb', label: 'MongoDB' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'typescript', label: 'TypeScript' }
    ];

    const educationOptions = [
        { value: 'highschool', label: 'High School' },
        { value: 'associate', label: 'Associate Degree' },
        { value: 'bachelor', label: 'Bachelor\'s Degree' },
        { value: 'master', label: 'Master\'s Degree' },
        { value: 'phd', label: 'PhD' },
        { value: 'certification', label: 'Professional Certification' }
    ];

    const handleLogout = () => {
        // Handle logout logic here
        navigate('/user-login');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        // Password reset logic would go here

        setPasswordError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showSuccess('Password updated successfully');
        setActivePanel(null);
    };

    const handleUpdateUsername = (e) => {
        e.preventDefault();
        if (username.trim() === '') {
            return;
        }

        // Username update logic would go here

        showSuccess('Username updated successfully');
        setActivePanel(null);
    };

    const handleUpdateQualifications = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const userId = JSON.parse(localStorage.getItem("job-connect")).userId

            const payload = {
                skills: selectedSkills.map(skill => skill.value),
                years_of_experience: experience,
                qualifications: selectedEducation.map(edu => edu.value),
                userId
            };

            await axios.post('http://localhost:5000/api/applicant/qualifications', payload);
            showSuccess('Qualifications updated successfully');
            setActivePanel(null);
        } catch (error) {
            console.error('Error updating qualifications:', error);
        } finally {
            setLoading(false)
        }
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const togglePanel = (panel) => {
        setActivePanel(activePanel === panel ? null : panel);
        setPasswordError('');
    };

    return (
        <div className="applicant-settings-container">
            <div className="settings-header">
                <h1>Account Settings</h1>
                <p>Manage your account settings and preferences</p>
            </div>

            {successMessage && (
                <div className="success-message">
                    <CheckCircle size={18} />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="settings-grid">
                <div className="settings-card logout-card">
                    <div className="settings-card-header">
                        <LogOut size={20} />
                        <h2>Session</h2>
                    </div>
                    <p>End your current session and return to the login page</p>
                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Log Out</span>
                    </button>
                </div>

                <div className="settings-card">
                    <div
                        className={`settings-card-header ${activePanel === 'password' ? 'active' : ''}`}
                        onClick={() => togglePanel('password')}
                    >
                        <Lock size={20} />
                        <h2>Password</h2>
                        <ChevronRight size={20} className={`arrow ${activePanel === 'password' ? 'down' : ''}`} />
                    </div>

                    {activePanel === 'password' && (
                        <form className="settings-form" onSubmit={handleResetPassword}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {passwordError && <div className="error-message">{passwordError}</div>}
                            <button type="submit" className="update-button" disabled={loading}>
                                <Save size={16} />
                                <span>Update Password</span>
                            </button>
                        </form>
                    )}
                </div>

                <div className="settings-card">
                    <div
                        className={`settings-card-header ${activePanel === 'username' ? 'active' : ''}`}
                        onClick={() => togglePanel('username')}
                    >
                        <User size={20} />
                        <h2>Username</h2>
                        <ChevronRight size={20} className={`arrow ${activePanel === 'username' ? 'down' : ''}`} />
                    </div>

                    {activePanel === 'username' && (
                        <form className="settings-form" onSubmit={handleUpdateUsername}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="update-button" disabled={loading}>
                                <Save size={16} />
                                <span>Update Username</span>
                            </button>
                        </form>
                    )}
                </div>

                <div className="settings-card qualifications-card">
                    <div
                        className={`settings-card-header ${activePanel === 'qualifications' ? 'active' : ''}`}
                        onClick={() => togglePanel('qualifications')}
                    >
                        <Briefcase size={20} />
                        <h2>Skills & Experience</h2>
                        <ChevronRight size={20} className={`arrow ${activePanel === 'qualifications' ? 'down' : ''}`} />
                    </div>

                    {activePanel === 'qualifications' && (
                        <form className="settings-form" onSubmit={handleUpdateQualifications}>
                            <div className="form-group">
                                <label>Skills</label>
                                <Select
                                    isMulti
                                    name="skills"
                                    options={skillOptions}
                                    className="react-select"
                                    classNamePrefix="select"
                                    value={selectedSkills}
                                    onChange={setSelectedSkills}
                                    placeholder="Select skills..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Years of Experience</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="50"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Education</label>
                                <Select
                                    isMulti
                                    name="education"
                                    options={educationOptions}
                                    className="react-select"
                                    classNamePrefix="select"
                                    value={selectedEducation}
                                    onChange={setSelectedEducation}
                                    placeholder="Select education..."
                                />
                            </div>

                            <button type="submit" className="update-button" disabled={loading}>
                                <Save size={16} />
                                <span>Update Qualifications</span>
                            </button>
                        </form>
                    )}
                </div>

                <div className="settings-card education-card">
                    <div className="settings-card-header">
                        <GraduationCap size={20} />
                        <h2>Need Help?</h2>
                    </div>
                    <p>Contact our support team for assistance with your account settings.</p>
                    <a href="#" className="help-link">Visit Help Center</a>
                </div>
            </div>
        </div>
    );
};

export default ApplicantSettings;