import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUser, FaIdCard, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const Register = () => {
  // Use individual state variables for each input field
  const [fullName, setFullName] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterSubmit = (event) => {
    // Prevent page reload on form submit
    event.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }
    
    if (aadhaarNumber.length !== 12) {
      setErrorMessage("Aadhaar Number must be exactly 12 digits.");
      return;
    }
    
    // Dummy registration successful
    setErrorMessage('');
    alert("Registration Successful! Please login.");
    navigate('/login');
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card register-card">
        
        <div className="auth-header">
          <h2>Beneficiary Registration</h2>
          <p>Create an account to apply for schemes</p>
        </div>

        {/* Display error message if it exists */}
        {errorMessage && (
          <div className="alert alert-danger" style={{color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center'}}>
            {errorMessage}
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
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="aadhaarNumber"><FaIdCard /> Aadhaar Number</label>
              <input 
                type="text" 
                id="aadhaarNumber" 
                placeholder="12 digit Aadhaar" 
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                maxLength="12"
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="email"><FaEnvelope /> Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Optional" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone"><FaPhone /> Mobile Number</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="10 digit mobile" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength="10"
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="password"><FaLock /> Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Create password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Re-enter password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
            
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
            <FaUserPlus /> Register Now
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
