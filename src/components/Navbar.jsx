import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLandmark, FaUserCircle, FaSignOutAlt, FaPlusCircle, FaListAlt } from 'react-icons/fa';
import { authService } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('userRole') || 'CITIZEN';

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    switch (userRole.toUpperCase()) {
      case 'FIELD_OFFICER': return '/field-officer';
      case 'DISTRICT_OFFICER': return '/district-officer';
      case 'FINANCE_OFFICER': return '/finance-officer';
      case 'ADMIN': return '/admin';
      default: return '/dashboard';
    }
  };

  return (
    <nav className="glass-card" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, position: 'sticky', top: 0, zIndex: 100, padding: '0.85rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.25rem', boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}>
            <FaLandmark />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              DBT Portal
            </span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>
              DIRECT BENEFIT TRANSFER
            </span>
          </div>
        </Link>

        {/* Links & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/all-schemes" style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaListAlt /> Schemes Catalog
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/apply" style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaPlusCircle /> Apply Now
              </Link>

              <Link to={getDashboardPath()} className="badge badge-submitted" style={{ padding: '0.4rem 0.85rem', textTransform: 'none', cursor: 'pointer' }}>
                <FaUserCircle /> {userName} ({userRole})
              </Link>

              <button onClick={handleLogout} className="btn-outline" style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn-outline" style={{ padding: '0.45rem 1rem', fontSize: '0.88rem' }}>
                Login
              </Link>
              <Link to="/register" className="btn-brand" style={{ padding: '0.45rem 1rem', fontSize: '0.88rem' }}>
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
