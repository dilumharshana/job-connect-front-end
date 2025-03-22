import { Filter, PlusCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import axios from "axios";

export const CompanyJobs = () => {
    const [jobs, setJobs] = useState({ activeJobs: [], inactiveJobs: [] });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const companyId = JSON.parse(localStorage.getItem('job-connect')).userId;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/company/${companyId}/jobs`);
                setJobs(response?.data?.data);
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
            </div>
        </div>

        <section className="jobs-section">

            <h2>Applied Jobs</h2>

            <div className='expectation-levels-container'>
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
                        />
                    ))
                )}
            </div>
        </section>

    </main>;
};
