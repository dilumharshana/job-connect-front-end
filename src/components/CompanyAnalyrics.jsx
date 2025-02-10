import { BarChart2, Bell, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";

export const CompanyAnalytics = () => {
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

    return <main className="dashboard-main">

        <div className="dashboard-stats">
            <div className="stat-card dark-glass">
                <BarChart2 size={24} />
                <div>
                    <p>Total Jobs</p>
                    <h>{jobs.activeJobs.length + jobs.inactiveJobs.length}</h>
                </div>
            </div>
            <div className="stat-card dark-glass">
                <Bell size={24} />
                <div>
                    <p>Active Jobs</p>
                    <h>{jobs.activeJobs.length}</h>
                </div>
            </div>
            <div className="stat-card dark-glass">
                <Users size={24} />
                <div>
                    <p>Applicants</p>
                    <h>{jobs.activeJobs.length}</h>
                </div>
            </div>
        </div>


        <section className="jobs-section">

            <h2>Active Jobs</h2>

            <div className='expectation-levels-container'>
                <div className='expected-level-container'><div className='expected-level-indicator communication-indicator-color'></div>Communication skill level</div>
                <div className='expected-level-container'><div className='expected-level-indicator critical-thinking-indicator-color'></div> Critical thinking level</div>
                <div className='expected-level-container'><div className='expected-level-indicator job-knowledge-indicator-color'></div>Job related knowledge level</div>
            </div>

            <div className="job-grid">
                {loading ? (
                    <div className="loading-spinner" />
                ) : (
                    filterJobs(jobs.activeJobs).map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            status="active"
                            onClick={() => navigate(`/job/${job.id}`)}
                        />
                    ))
                )}
            </div>
        </section>

        <section className="jobs-section">
            <h2>Inactive Jobs</h2>
            <div className="job-grid">
                {!loading && filterJobs(jobs.inactiveJobs).map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        status="inactive"
                        onClick={() => navigate(`/job/${job.id}`)}
                    />
                ))}
            </div>
        </section>

    </main>;
};
