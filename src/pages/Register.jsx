import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUser, FaIdCard, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { authService } from '../services/authService';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full name is required";

    if (!aadhaarNumber) {
      newErrors.aadhaarNumber = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar number must be exactly 12 digits";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setIsLoading(true);

      try {
        const userData = { fullName, aadhaarNumber, email, phone, password };
        const response = await authService.register(userData);

        if (response.success) {
          alert("Registration Successful! Please login.");
          navigate('/login');
        }
      } catch (error) {
        console.error("Registration failed", error);
        setErrors({ general: "Registration failed. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card register-card">

        <div className="auth-header">
          <h2>Beneficiary Registration</h2>
          <p>Create an account to apply for schemes</p>
        </div>

        {errors.general && (
          <div className="alert alert-danger" style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit}>
          <div className="form-grid">

            <div className="input-group">
              <label htmlFor="fullName"><FaUser /> Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="As per Aadhaar"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
              />
              {errors.fullName && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.fullName}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="aadhaarNumber"><FaIdCard /> Aadhaar Number</label>
              <input
                type="text"
                id="aadhaarNumber"
                placeholder="12 digit Aadhaar"
                value={aadhaarNumber}
                onChange={(e) => {
                  setAadhaarNumber(e.target.value);
                  if (errors.aadhaarNumber) setErrors({ ...errors, aadhaarNumber: '' });
                }}
                maxLength="12"
              />
              {errors.aadhaarNumber && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.aadhaarNumber}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email"><FaEnvelope /> Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Optional"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
              />
              {errors.email && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="phone"><FaPhone /> Mobile Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="10 digit mobile"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                maxLength="10"
              />
              {errors.phone && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.phone}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="password"><FaLock /> Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
              />
              {errors.password && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.password}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
              />
              {errors.confirmPassword && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginTop: '0.2rem', display: 'block' }}>{errors.confirmPassword}</span>}
            </div>

          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} disabled={isLoading}>
            <FaUserPlus /> {isLoading ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>

      </div>
    </div>
  );
};

export default Register;
