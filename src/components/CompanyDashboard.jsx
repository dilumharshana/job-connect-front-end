import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CompanyDashboard.css';

// Sample data
const sampleJobData = [
  { id: 1, name: 'Software Engineer', applicants: 25 },
  { id: 2, name: 'Product Manager', applicants: 18 },
  { id: 3, name: 'UI/UX Designer', applicants: 32 },
  { id: 4, name: 'Data Analyst', applicants: 15 },
];

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState(sampleJobData);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job data from an API (not implemented in this example)
    // setJobs(fetchedJobData);
  }, []);

  const handleCreateJob = () => {
    navigate('/company/create-job', { state: { isEditMode: false } });
  };

  const handleEditJob = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    navigate('/company/create-job', { state: { isEditMode: true, job } });
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((j) => j.id !== jobId));
    // Call an API to delete the job (not implemented in this example)
  };

  return (
    <div className="company-dashboard">
      <div className="dashboard-header">
        <h2>Company Dashboard</h2>
        <button className="create-job-button" onClick={handleCreateJob}>
          Create New Job
        </button>
      </div>
      <div className="job-count">
        <h3>Total Jobs: {jobs.length}</h3>
      </div>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.name}</h3>
            <p>Applicants: {job.applicants}</p>
            <div className="job-actions">
              <button
                className="edit-job-button"
                onClick={() => handleEditJob(job.id)}
              >
                Edit
              </button>
              <button
                className="delete-job-button"
                onClick={() => handleDeleteJob(job.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;