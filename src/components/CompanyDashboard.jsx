import { BookUser, Briefcase, LayoutDashboard, Settings } from 'lucide-react';
import React from 'react';
import "react-circular-progressbar/dist/styles.css";
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/CompanyDashboard.css';
import Navbar from './NavBar';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-sidebar mt-5">
        <nav className="sidebar-nav">
          <NavLink className="nav-item" to={'/company/dashboard'}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink className="nav-item" to={'/company/jobs'}>
            <Briefcase size={20} />

            Jobs
          </NavLink>
          <NavLink className="nav-item" to={'/company/applicants'}>
            <BookUser size={20} />
            Applicants
          </NavLink>
          <NavLink className="nav-item" to={'/company/settings'}>
            <Settings size={20} />
            Settings
          </NavLink>
        </nav>
      </div>

      <div className='mt-5 dashboard-data-panel'> <Outlet /></div>
    </div>
  );
};

export default Dashboard;