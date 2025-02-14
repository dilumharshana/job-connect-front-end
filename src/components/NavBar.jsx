import { Bell, User } from 'lucide-react';
import React from 'react';
import '../styles/NavbarStyles.css'

const Navbar = () => {
    const userName = JSON.parse(localStorage.getItem("job-connect"))?.userName || "User";

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <span className="company-name">JobConnect</span>
                <div className="navbar-end">
                    <div className="user-profile">
                        <span className="username">{userName}</span>
                        <User size={20} className="icon" color='#fff' />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;