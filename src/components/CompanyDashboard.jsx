import { Briefcase } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import "react-circular-progressbar/dist/styles.css";
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/CompanyDashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState({ activeJobs: [], inactiveJobs: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/jobs');
        const response = {
          "activeJobs": [
            {
              "id": "JOB-001",
              "name": "Senior Software Engineer",
              "description": "Develop and maintain AI-powered applications using modern tech stacks.",
              "salary": "$120,000",
              "expectedCommunicationLevel": "85%",
              "expectedCriticalThinkingLevel": "90%",
              "expectedProbSolLevel": "95%",
              "numberOfApplicants": 42,
              "postedDate": "2024-03-15",
              "location": "Remote",
              "department": "Engineering",
              "closingDate": "2024-04-30"
            },
            {
              "id": "JOB-001",
              "name": "AI Engineer",
              "description": "Develop and maintain AI-powered applications using modern tech stacks.",
              "salary": "$120,000",
              "expectedCommunicationLevel": "85%",
              "expectedCriticalThinkingLevel": "90%",
              "expectedProbSolLevel": "95%",
              "numberOfApplicants": 42,
              "postedDate": "2024-03-15",
              "location": "Remote",
              "department": "Engineering",
              "closingDate": "2024-04-30"
            },
            {
              "id": "JOB-001",
              "name": "Software Engineer",
              "description": "Develop and maintain AI-powered applications using modern tech stacks.",
              "salary": "$120,000",
              "expectedCommunicationLevel": "85%",
              "expectedCriticalThinkingLevel": "90%",
              "expectedProbSolLevel": "95%",
              "numberOfApplicants": 42,
              "postedDate": "2024-03-15",
              "location": "Remote",
              "department": "Engineering",
              "closingDate": "2024-04-30"
            },
            {
              "id": "JOB-001",
              "name": "Devops Engineer",
              "description": "Develop and maintain AI-powered applications using modern tech stacks.",
              "salary": "$120,000",
              "expectedCommunicationLevel": "85%",
              "expectedCriticalThinkingLevel": "90%",
              "expectedProbSolLevel": "95%",
              "numberOfApplicants": 42,
              "postedDate": "2024-03-15",
              "location": "Remote",
              "department": "Engineering",
              "closingDate": "2024-04-30"
            },
            {
              "id": "JOB-002",
              "name": "UX Designer",
              "description": "Design intuitive interfaces for AI-driven job matching platforms.",
              "salary": "$95,000",
              "expectedCommunicationLevel": "90%",
              "expectedCriticalThinkingLevel": "85%",
              "expectedProbSolLevel": "80%",
              "numberOfApplicants": 28,
              "postedDate": "2024-03-20",
              "location": "New York, NY",
              "department": "Design",
              "closingDate": "2024-05-15"
            }
          ],
          "inactiveJobs": [
            {
              "id": "JOB-003",
              "name": "Marketing Manager",
              "description": "Lead AI product marketing campaigns (position closed).",
              "salary": "$110,000",
              "expectedCommunicationLevel": "95%",
              "expectedCriticalThinkingLevel": "85%",
              "expectedProbSolLevel": "75%",
              "numberOfApplicants": 56,
              "postedDate": "2023-12-01",
              "location": "San Francisco, CA",
              "department": "Marketing",
              "closingDate": "2024-02-28"
            }
          ]
        };
        setJobs(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filterJobs = (jobs) => {
    return jobs.filter(job =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h1 className="brand">JobConnect</h1>
        <nav className="sidebar-nav">
          <button className="nav-item active" onClick={() => navigate('/company/dashboard')}>
            <Briefcase size={20} />
            Dashboard
          </button>
          <button className="nav-item active" onClick={() => navigate('/company/jobs')}>
            <Briefcase size={20} />
            Jobs
          </button>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;