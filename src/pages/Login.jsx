import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserShield, FaSignInAlt } from 'react-icons/fa';
import { authService } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Beneficiary');
  const [rememberMe, setRememberMe] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setIsLoading(true);

      try {
        // Call placeholder auth service
        const response = await authService.login(email, password, role);

        if (response.success) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('role', role);

          let dashboardPath = '/dashboard';
          if (role === 'Field Officer') dashboardPath = '/field-officer';
          else if (role === 'District Officer') dashboardPath = '/district-officer';
          else if (role === 'Finance Officer') dashboardPath = '/finance-officer';
          else if (role === 'Admin') dashboardPath = '/admin';

          navigate(dashboardPath);
        }
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setIsLoading(false);
      }
    }
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
            />
            {errors.email && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password"><FaLock /> Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
            />
            {errors.password && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.password}</span>}
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

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            <FaSignInAlt /> {isLoading ? 'Logging in...' : 'Login'}
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
