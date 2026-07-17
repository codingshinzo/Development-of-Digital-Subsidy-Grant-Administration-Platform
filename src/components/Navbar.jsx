import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaBuilding className="navbar-icon" />
          <span className="navbar-title">GovSubsidy</span>
        </Link>
        <div className="navbar-links">
          <div className="nav-auth">
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
