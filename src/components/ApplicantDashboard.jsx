import { BookUser, Briefcase, FileUser, Heart, LayoutDashboard, Settings, Store } from 'lucide-react';
import React from 'react';
import "react-circular-progressbar/dist/styles.css";
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/CompanyDashboard.css';
import Navbar from './NavBar';

const ApplicantDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-sidebar mt-5">
        <nav className="sidebar-nav">
          <NavLink className="nav-item" to={'/applicant/job-market'}>
            <Store size={20} />
            Job Market
          </NavLink>
          <NavLink className="nav-item" to={'/applicant/jobs'}>
            <FileUser size={20} />
            Applied Jobs
          </NavLink>
          <NavLink className="nav-item" to={'/applicant/applicants'}>
            <Heart size={20} />
            Most suit
          </NavLink>
          <NavLink className="nav-item" to={'/applicant/settings'}>
            <Settings size={20} />
            Settings
          </NavLink>
        </nav>
      </div>

      <div className='mt-5 dashboard-data-panel'> <Outlet /></div>
    </div>
  );
};

export default ApplicantDashboard;