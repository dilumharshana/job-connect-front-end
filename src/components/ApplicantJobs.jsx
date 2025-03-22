import { Filter, PlusCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import axios from "axios";
import AppliedJobCard from "./AppliedJobCard";

export const ApplicantJobs = () => {
    const [jobs, setJobs] = useState({ activeJobs: [], inactiveJobs: [] });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const applicantId = JSON.parse(localStorage.getItem('job-connect')).userId;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                if (!applicantId) return
                const response = await axios.get(`http://localhost:5000/api/applicant/${applicantId}/applied`);
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
        return jobs?.filter(job =>
            job?.job_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return <main className="dashboard-main">
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
                        <AppliedJobCard job={job} key={job.id} />
                    ))
                )}
            </div>
        </section>

    </main>;
};
