import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserShield, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  // Use individual state variables for simplicity
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Beneficiary');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    // Prevent the page from reloading when the form is submitted
    event.preventDefault();
    
    // Set dummy authentication state and role
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
    
    // Choose the dashboard path based on the selected role
    let dashboardPath = '/dashboard'; // Default for Beneficiary
    
    if (role === 'Field Officer') {
      dashboardPath = '/field-officer';
    } else if (role === 'District Officer') {
      dashboardPath = '/district-officer';
    } else if (role === 'Finance Officer') {
      dashboardPath = '/finance-officer';
    } else if (role === 'Admin') {
      dashboardPath = '/admin';
    }
    
    // Redirect to the chosen dashboard
    navigate(dashboardPath);
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card">
        
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to access your dashboard</p>
        </div>
        
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label htmlFor="email"><FaEnvelope /> Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password"><FaLock /> Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="role"><FaUserShield /> Login As</label>
            <select 
              id="role" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Beneficiary">Beneficiary</option>
              <option value="Field Officer">Field Officer</option>
              <option value="District Officer">District Officer</option>
              <option value="Finance Officer">Finance Officer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="auth-options">
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> Remember Me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <FaSignInAlt /> Login
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
