import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHome, FaFileAlt, FaUserEdit, FaCheckCircle,
  FaMoneyBillWave, FaUsers, FaChartBar, FaSignOutAlt
} from 'react-icons/fa';
import '../styles/Sidebar.css';

// ---------------------------------------------------------
// Helper Component
// ---------------------------------------------------------

function SidebarLink({ path, icon, name, isExact }) {
  const handleLogoutClick = () => {
    if (path === '/') {
      localStorage.removeItem('isAuthenticated');
    }
  };

  return (
    <li>
      <NavLink
        to={path}
        end={isExact}
        onClick={handleLogoutClick}
        className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
      >
        <span className="sidebar-icon">{icon}</span>
        {name}
      </NavLink>
    </li>
  );
}

// ---------------------------------------------------------
// Main Component
// ---------------------------------------------------------

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Get role from localStorage, fallback to Beneficiary
  let currentRole = localStorage.getItem('role') || 'Beneficiary';

  // Define navigation links based on the role
  let navLinks = [];

  if (currentRole === 'Field Officer') {
    navLinks = [
      { name: 'Dashboard', path: '/field-officer', icon: <FaHome /> },
      { name: 'Pending Verifications', path: '/field-officer/pending', icon: <FaFileAlt /> },
      { name: 'Profile', path: '/profile', icon: <FaUserEdit /> },
      { name: 'Log Out', path: '/', icon: <FaSignOutAlt /> },
    ];
  } else if (currentRole === 'District Officer') {
    navLinks = [
      { name: 'Dashboard', path: '/district-officer', icon: <FaHome /> },
      { name: 'Pending Approvals', path: '/district-officer/pending', icon: <FaCheckCircle /> },
      { name: 'Profile', path: '/profile', icon: <FaUserEdit /> },
      { name: 'Log Out', path: '/', icon: <FaSignOutAlt /> },
    ];
  } else if (currentRole === 'Finance Officer') {
    navLinks = [
      { name: 'Dashboard', path: '/finance-officer', icon: <FaHome /> },
      { name: 'Payment Queue', path: '/finance-officer/payments', icon: <FaMoneyBillWave /> },
      { name: 'Profile', path: '/profile', icon: <FaUserEdit /> },
      { name: 'Log Out', path: '/', icon: <FaSignOutAlt /> },
    ];
  } else if (currentRole === 'Admin') {
    navLinks = [
      { name: 'Dashboard', path: '/admin', icon: <FaHome /> },
      { name: 'Manage Users', path: '/admin/users', icon: <FaUsers /> },
      { name: 'Manage Schemes', path: '/admin/schemes', icon: <FaFileAlt /> },
      { name: 'Reports', path: '/admin/reports', icon: <FaChartBar /> },
      { name: 'Profile', path: '/profile', icon: <FaUserEdit /> },
      { name: 'Log Out', path: '/', icon: <FaSignOutAlt /> },
    ];
  } else {
    // Default Beneficiary Links
    navLinks = [
      { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
      { name: 'Schemes', path: '/schemes', icon: <FaFileAlt /> },
      { name: 'Track Status', path: '/track-status', icon: <FaChartBar /> },
      { name: 'Utilization Report', path: '/utilization-report', icon: <FaFileAlt /> },
      { name: 'Profile', path: '/profile', icon: <FaUserEdit /> },
      { name: 'Log Out', path: '/', icon: <FaSignOutAlt /> },
    ];
  }

  return (
    <aside className="sidebar">

      {/* Profile Section inside Sidebar */}
      <div className="sidebar-profile">
        <div className="avatar">
          {currentRole.charAt(0)}
        </div>
        <div className="user-info">
          <h4>{currentRole} User</h4>
          <p>{currentRole}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <ul>
          {navLinks.map((link, index) => {
            // Determine if the link should exactly match the path (to prevent active state bugs)
            const isExactMatch = link.path === '/dashboard' || link.path.endsWith('-officer') || link.path.endsWith('admin') || link.path === '/';

            return (
              <SidebarLink
                key={index}
                path={link.path}
                icon={link.icon}
                name={link.name}
                isExact={isExactMatch}
              />
            );
          })}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;
