import React, { useState } from 'react';
import { Building2, MapPin, Briefcase, Brain, MessageSquare, BookOpen, DollarSign, MousePointer } from 'lucide-react';
import '../styles/ViewJob.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewJob = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { state } = useLocation()
    const { jobData } = state
    const navigate = useNavigate()

    const userId = JSON.parse(localStorage.getItem('job-connect'))?.userId;

    const handleAction = async (action) => {
        setIsLoading(true);
        setError(null);

        const endpoint = action === 'apply'
            ? 'http://127.0.0.1:5000/api/applicant/apply'
            : 'http://127.0.0.1:5000/api/applicant/later';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobId: jobData?.id,
                    applicantId: userId
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${action} for job`);
            }

            // Handle success - you might want to add a success message or redirect
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="job-view-container">
            <div className="job-card-apply">
                <div className="card-header">
                    <div className="card-header-content">
                        <h1 className="apply-job-title">{jobData?.job_name}</h1>
                        <div className="company-info">
                            <Building2 className="icon" />
                            <span>{jobData?.companyName}</span>
                        </div>
                    </div>
                </div>

                <div className="card-content">
                    <div className="job-details">
                        <div className="detail-item">
                            <MapPin className="icon" />
                            <span>Work Mode: {jobData?.work_mode}</span>
                        </div>

                        <div className="detail-item">
                            <Briefcase className="icon" />
                            <span>Experience: {jobData?.experience} years</span>
                        </div>

                        <div className="detail-item">
                            <DollarSign className="icon" />
                            <span>Salary: ${jobData?.salary}</span>
                        </div>

                        <div className="detail-item">
                            <MousePointer className="icon" />
                            <span>Clicks: {jobData?.clicks}</span>
                        </div>
                    </div>

                    <div className="skills-section">
                        <h3>Required Skills</h3>
                        <div className="skill-bars">
                            <div className="skill-bar">
                                <MessageSquare className="icon" />
                                <div className="skill-info">
                                    <span>Communication Skills</span>
                                    <div className="progress-bar">
                                        <div
                                            className="progress"
                                            style={{ width: `${jobData?.communication_level}%` }}
                                        />
                                    </div>
                                    <span>{jobData?.communication_level}%</span>
                                </div>
                            </div>

                            <div className="skill-bar">
                                <BookOpen className="icon" />
                                <div className="skill-info">
                                    <span>Job Knowledge</span>
                                    <div className="progress-bar">
                                        <div
                                            className="progress"
                                            style={{ width: `${jobData?.job_knowledge_level}%` }}
                                        />
                                    </div>
                                    <span>{jobData?.job_knowledge_level}%</span>
                                </div>
                            </div>

                            <div className="skill-bar">
                                <Brain className="icon" />
                                <div className="skill-info">
                                    <span>Critical Thinking</span>
                                    <div className="progress-bar">
                                        <div
                                            className="progress"
                                            style={{ width: `${jobData?.critical_think_level}%` }}
                                        />
                                    </div>
                                    <span>{jobData?.critical_think_level}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="description-section">
                        <h3>Job Description</h3>
                        <p>{jobData?.description}</p>
                    </div>
                </div>

                <div className="card-footer">
                    {error && <div className="error-message">{error}</div>}
                    <button
                        // onClick={() => handleAction('apply')}
                        onClick={() => navigate('/upload-cv', { state: { jobData } })}
                        disabled={isLoading}
                        className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'Applying...' : 'Start Interview'}
                    </button>
                    <button
                        onClick={() => handleAction('later')}
                        disabled={isLoading}
                        className={`btn btn-secondary ${isLoading ? 'loading' : ''}`}
                    >
                        Participate Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewJob;