import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserShield, FaSignInAlt } from 'react-icons/fa';
import { authService } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CITIZEN');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter email/phone and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(email, password, role);

      if (response.success && response.token) {

        const userRole = response.role || role;
        let dashboardPath = '/dashboard';
        if (userRole === 'FIELD_OFFICER' || userRole === 'Field Officer') dashboardPath = '/field-officer';
        else if (userRole === 'DISTRICT_OFFICER' || userRole === 'District Officer') dashboardPath = '/district-officer';
        else if (userRole === 'FINANCE_OFFICER' || userRole === 'Finance Officer') dashboardPath = '/finance-officer';
        else if (userRole === 'ADMIN' || userRole === 'Admin') dashboardPath = '/admin';

        navigate(dashboardPath);
      } else {
        setErrorMessage(response.error || 'Invalid credentials or login failed.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Login error connecting to backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem 1rem' }}>
      <div className="glass-card" style={{ maxWidth: '480px', margin: '0 auto', padding: '2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>Portal Authentication</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sign in to access your direct benefit transfer portal</p>
        </div>

        {errorMessage && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', color: '#fb7185', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          
          <div className="form-group">
            <label htmlFor="email"><FaEnvelope /> Email / Mobile Phone</label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter email address or mobile"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"><FaLock /> Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role"><FaUserShield /> Sign In As</label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="CITIZEN">Citizen / Beneficiary</option>
              <option value="FIELD_OFFICER">Field Officer (Level 1)</option>
              <option value="DISTRICT_OFFICER">District Officer (Level 2)</option>
              <option value="FINANCE_OFFICER">Finance Officer (Level 3)</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>

          <button type="submit" className="btn-brand" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.85rem' }} disabled={isLoading}>
            <FaSignInAlt /> {isLoading ? 'Authenticating with DB...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Register here</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
