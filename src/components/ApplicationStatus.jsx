import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Clock, FileCheck, Users, Award, X, ArrowLeft } from 'lucide-react';
import '../styles/ApplicationStatus.css';

const ApplicationStatus = () => {
    const navigate = useNavigate();
    const { state } = useLocation()
    const { status: currentStatus } = state

    console.log(currentStatus);


    // Define the application steps
    const steps = [
        { id: 'facedInterview', label: 'Faced Interview', icon: <Users /> },
        { id: 'applied', label: 'Application Submitted', icon: <FileCheck /> },
        { id: 'pending', label: 'Pending', icon: <Clock /> },
        { id: 'applicationReviewed', label: 'Application Reviewed', icon: <FileCheck /> },
        {
            id: 'hired', label: currentStatus === 'notHired' ? 'Not Hired' : 'Hired',
            icon: currentStatus === 'notHired' ? <X /> : <Award />
        }
    ];

    // Find the current step index
    const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

    // Function to determine step status
    const getStepStatus = (index) => {
        if (index < currentStepIndex) return 'completed';
        if (index === currentStepIndex) return 'active';
        return 'upcoming';
    };

    // Handle go back button click
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="application-status-container mt-5">
            <div className="status-header">
                <h1>Application Status</h1>
                <p className="status-description">
                    Track your application progress through our hiring process
                </p>
            </div>

            <div className="stepper">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className={`stepper-item ${getStepStatus(index)}`}>
                            <div className="stepper-icon">
                                {getStepStatus(index) === 'completed' ? <Check /> : step.icon}
                            </div>
                            <div className="stepper-label">
                                <span className="stepper-title">{step.label}</span>
                                {getStepStatus(index) === 'active' && (
                                    <span className="stepper-subtitle">Current Stage</span>
                                )}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`stepper-connector ${index < currentStepIndex ? 'completed' : ''
                                }`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {currentStatus === 'hired' && (
                <div className="success-message">
                    <Award size={32} />
                    <h2>Congratulations!</h2>
                    <p>You've been selected for this position. We're excited to welcome you on board!</p>
                </div>
            )}

            {currentStatus === 'notHired' && (
                <div className="failure-message">
                    <X size={32} />
                    <h2>Thank you for your interest</h2>
                    <p>We appreciate your application but have decided to move forward with other candidates.</p>
                </div>
            )}

            <div className="status-details">
                <h3>What's Next?</h3>
                {currentStatus === 'applicationSubmitted' && (
                    <p>Your application has been submitted successfully. Our team will review it shortly.</p>
                )}
                {currentStatus === 'pending' && (
                    <p>Your application is currently being processed. We'll notify you once it's reviewed.</p>
                )}
                {currentStatus === 'applicationReviewed' && (
                    <p>Your application has been reviewed. If you match our requirements, we'll schedule an interview.</p>
                )}
                {currentStatus === 'facedInterview' && (
                    <p>Thank you for completing the interview. We're evaluating your performance and will get back to you soon.</p>
                )}
                {currentStatus === 'hired' && (
                    <p>Please check your email for onboarding details and next steps to join our team.</p>
                )}
                {currentStatus === 'notHired' && (
                    <p>Feel free to apply for other positions that match your skills and experience.</p>
                )}
            </div>

            <button className="back-button" onClick={handleGoBack}>
                <ArrowLeft size={18} />
                <span>Go Back</span>
            </button>
        </div>
    );
};

export default ApplicationStatus;