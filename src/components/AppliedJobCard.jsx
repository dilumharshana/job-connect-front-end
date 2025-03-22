import { ArrowRight, Building2, Calendar } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AppliedJobCard.css';

const AppliedJobCard = ({ job }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/applicant/application-status`, { state: { status: job?.status } });
    };

    // Function to determine status color
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'interviewed':
                return 'status-interviewed';
            case 'rejected':
                return 'status-rejected';
            case 'offered':
                return 'status-offered';
            case 'accepted':
                return 'status-accepted';
            default:
                return 'status-pending';
        }
    };

    // Format date to a readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="applied-job-card" onClick={handleCardClick}>
            <div className="card-header">
                <h3 className="applied-job-title">{job.job_name}</h3>
                <div className={`status-badge ${getStatusColor(job.status)}`}>
                    {job.status}
                </div>
            </div>

            <div className="card-body">
                <div className="info-row">
                    <Building2 size={18} />
                    <span className="info-text">{job.company_name}</span>
                </div>

                <div className="info-row">
                    <Calendar size={18} />
                    <span className="info-text">Applied on : {formatDate(job.created_on)}</span>
                </div>
            </div>

            <div className="card-footer">
                <span className="view-details">View Details</span>
                <ArrowRight size={16} />
            </div>
        </div>
    );
};

export default AppliedJobCard;