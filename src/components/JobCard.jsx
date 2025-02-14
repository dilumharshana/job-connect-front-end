import React from 'react';
import { Briefcase, Users, TrendingUp } from 'lucide-react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';


const JobCard = ({ job, status, onClick }) => {
    return (
        <div className={`job-card ${status}-job`} onClick={onClick}>
            <div className="job-card-header">
                <Briefcase className="job-icon" />
                <div>
                    <h3>{job.job_name}</h3>
                    <p className="job-salary">{job.salary}</p>
                </div>
            </div>

            <div>
                <p className="job-description">{job.description}</p>

                <div className="skill-loaders">
                    <div className="skill-loader">
                        {/* <span>Communication</span> */}
                        <CircularProgressbar
                            value={parseInt(job.communication_level)}
                            text={`${job.communication_level}`}
                            styles={buildStyles({
                                textColor: '#46db18',
                                pathColor: '#46db18',
                                trailColor: 'rgba(59,130,246,0.2)'
                            })}
                        />

                    </div>

                    <div className="skill-loader">
                        {/* <span>Critical Thinking</span> */}
                        <CircularProgressbar
                            value={parseInt(job.critical_think_level)}
                            text={`${job.critical_think_level}`}
                            styles={buildStyles({
                                textColor: '#00c0f5',
                                pathColor: '#00c0f5',
                                trailColor: 'rgba(16,185,129,0.2)'
                            })}
                        />

                    </div>

                    <div className="skill-loader">
                        {/* <span>Problem Solving</span> */}
                        <CircularProgressbar
                            value={parseInt(job.job_knowledge_level)}
                            text={`${job.job_knowledge_level}`}
                            styles={buildStyles({
                                textColor: '#f5a700',
                                pathColor: '#f5a700',
                                trailColor: 'hsla(78, 74.50%, 50.80%, 0.20)'
                            })}
                        />

                    </div>
                </div>
                <div className="job-stats">
                    <div className="stat-item">
                        <Users />
                        <span>{job.numberOfApplicants} Applicants</span>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default JobCard;