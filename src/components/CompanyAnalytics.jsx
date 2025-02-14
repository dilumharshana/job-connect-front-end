import axios from "axios";
import { BarChart2, Bell, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";

export const CompanyAnalytics = () => {
    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const companyId = JSON.parse(localStorage.getItem("job-connect")).userId
                const response = await axios.get(`http://localhost:5000/api/company/${companyId}/dashboard`);
                setJobs(response?.data?.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) {
        return <>Loading dashboard ...</>
    }


    return <main className="dashboard-main">

        <div className="dashboard-stats">
            <div className="stat-card dark-glass">
                <Bell size={24} />
                <div>
                    <p>Active Jobs</p>
                    <h1>{jobs?.activeJobCount}</h1>
                </div>
            </div>
            <div className="stat-card dark-glass">
                <Users size={24} />
                <div>
                    <p>Inactive Jobs</p>
                    <h1>{jobs?.inActiveJobCount}</h1>
                </div>
            </div>
            <div className="stat-card dark-glass">
                <Users size={24} />
                <div>
                    <p>Applicants</p>
                    <h1>{jobs?.applicantsCount}</h1>
                </div>
            </div>
            <div className="stat-card dark-glass">
                <Users size={24} />
                <div>
                    <p>Add Clicks</p>
                    <h1>{jobs?.jobClicks}</h1>
                </div>
            </div>
        </div>

        <section className="jobs-section">
            <div className="job-grid">
                <div>
                    <p className="dashboard-job-analytics-card-title">Most applied job</p>
                    <JobCard
                        key={jobs?.leastAppliedJob.id}
                        job={jobs?.mostAppliedJob}
                        status="active"
                        onClick={() => navigate(`/job/${jobs?.leastAppliedJob.id}`)}
                    />
                </div>

                <div>
                    <p className="dashboard-job-analytics-card-title">Least applied job</p>

                    <JobCard
                        key={jobs?.leastAppliedJob.id}
                        job={jobs?.leastAppliedJob}
                        status="active"
                        onClick={() => navigate(`/job/${jobs?.leastAppliedJob.id}`)}
                    />
                </div>
            </div>
        </section>



    </main>;
};
