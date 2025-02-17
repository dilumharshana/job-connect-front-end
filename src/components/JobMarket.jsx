import { Filter, PlusCircle, Search, Star, UserCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import "../styles/JobMarket.css"
import axios from "axios";

export const JobMarket = () => {
    const [jobs, setJobs] = useState({ activeJobs: [], inactiveJobs: [] });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:5000/api/applicant/alljobs/${category}`);
                setJobs(response?.data?.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };
        fetchJobs();
    }, [category]);

    const filterJobs = (jobs) => {
        return jobs.filter(job =>
            job.job_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return <main className="dashboard-main">
        <div className="dashboard-header">
            <div className="search-section">
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>

                </div>
            </div>

            <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
                <option value="all" defaultValue="Category">Select job category</option>
                <option value="software-engineer" defaultValue="software-engineer">Software Engineer</option>
                <option value="human-resource" defaultValue="Category">Human Resources</option>
                <option value="devops-engineer" defaultValue="Category">Devops Engineer</option>
                <option value="accountant" defaultValue="Category">Accountant</option>
            </select>
            <button className="interview-job-btn" onClick={() => navigate('/create-job')}>
                <UserCheck size={20} />
                Interview and<span className="get-me-job-text">Get me a job</span>
            </button>
        </div>

        <section className="jobs-section">

            <h3>Jobs - All</h3>

            <div className='expectation-levels-container mt-3'>
                <div className='expected-level-container'><div className='expected-level-indicator communication-indicator-color'></div>Communication skill level</div>
                <div className='expected-level-container'><div className='expected-level-indicator critical-thinking-indicator-color'></div> Critical thinking level</div>
                <div className='expected-level-container'><div className='expected-level-indicator job-knowledge-indicator-color'></div>Job related knowledge level</div>
            </div>

            <div className="job-grid">
                {loading ? (
                    <div className="loading-spinner" />
                ) : (
                    filterJobs(jobs).map(job => (
                        <JobCard
                            key={job?.id}
                            job={job}
                            status="active"
                            onClick={() => navigate(`/job/${job?.id}`)}
                            isApplicant={true}
                        />
                    ))
                )}
            </div>
        </section>

    </main>;
};
