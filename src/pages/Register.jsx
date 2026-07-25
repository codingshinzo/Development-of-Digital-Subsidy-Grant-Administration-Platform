import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUser, FaIdCard, FaEnvelope, FaPhone, FaLock, FaBuilding, FaBriefcase, FaUniversity } from 'react-icons/fa';
import { authService } from '../services/authService';

const Register = () => {
  const [registrationType, setRegistrationType] = useState('CITIZEN'); // 'CITIZEN' or 'OFFICER'

  // Shared fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Citizen / Beneficiary fields
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [income, setIncome] = useState('150000');
  const [address, setAddress] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  // Officer fields
  const [officerRole, setOfficerRole] = useState('FIELD_OFFICER');
  const [department, setDepartment] = useState('Revenue Department');
  const [designation, setDesignation] = useState('Verification Officer');
  const [district, setDistrict] = useState('District Central');

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid Email is required';
    if (!phone.trim() || !/^\d{10}$/.test(phone)) newErrors.phone = '10-digit mobile number required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (registrationType === 'CITIZEN') {
      if (!aadhaarNumber.trim() || !/^\d{12}$/.test(aadhaarNumber)) {
        newErrors.aadhaarNumber = '12-digit Aadhaar number required';
      }
      if (!address.trim()) newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setServerMessage('');

    if (validate()) {
      setIsLoading(true);
      try {
        const payload = {
          fullName,
          email,
          phone,
          password,
          role: registrationType === 'CITIZEN' ? 'CITIZEN' : officerRole,
          aadhaarNumber,
          category,
          income: parseFloat(income) || 150000,
          address,
          bankAccountNumber: bankAccountNumber || '999988887777',
          ifscCode: ifscCode || 'SBIN0001234',
          designation,
          department,
          district
        };

        const response = await authService.register(payload);

        if (response.success) {
          alert('Registration Successful! Your details are stored in the database. Please login.');
          navigate('/login');
        } else {
          setServerMessage(response.error || 'Registration failed on server.');
        }
      } catch (error) {
        setServerMessage(error.message || 'Error connecting to database.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div className="glass-card" style={{ maxWidth: '750px', margin: '0 auto', padding: '2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>User Account Registration</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Create a new account in the Subsidy Tracking Database</p>

          {/* Registration Type Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.25rem' }}>
            <button
              type="button"
              className={registrationType === 'CITIZEN' ? 'btn-brand' : 'btn-outline'}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
              onClick={() => setRegistrationType('CITIZEN')}
            >
              Citizen / Beneficiary
            </button>
            <button
              type="button"
              className={registrationType === 'OFFICER' ? 'btn-brand' : 'btn-outline'}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
              onClick={() => setRegistrationType('OFFICER')}
            >
              Government Officer
            </button>
          </div>
        </div>

        {serverMessage && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', color: '#fb7185', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {serverMessage}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            
            <div className="form-group">
              <label htmlFor="fullName"><FaUser /> Full Name</label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Full Name as per ID"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && <span style={{ color: '#fb7185', fontSize: '0.8rem' }}>{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email"><FaEnvelope /> Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span style={{ color: '#fb7185', fontSize: '0.8rem' }}>{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone"><FaPhone /> Mobile Phone</label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="10-digit mobile"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <span style={{ color: '#fb7185', fontSize: '0.8rem' }}>{errors.phone}</span>}
            </div>

            {registrationType === 'CITIZEN' ? (
              <>
                <div className="form-group">
                  <label htmlFor="aadhaar"><FaIdCard /> Aadhaar Number</label>
                  <input
                    type="text"
                    id="aadhaar"
                    className="form-control"
                    placeholder="12-digit Aadhaar"
                    maxLength="12"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                  />
                  {errors.aadhaarNumber && <span style={{ color: '#fb7185', fontSize: '0.8rem' }}>{errors.aadhaarNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Social Category</label>
                  <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="GENERAL">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Annual Family Income (₹)</label>
                  <input type="number" className="form-control" value={income} onChange={(e) => setIncome(e.target.value)} />
                </div>

                <div className="form-group">
                  <label><FaUniversity /> Bank Account Number</label>
                  <input type="text" className="form-control" placeholder="Bank Account No." value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
                </div>

                <div className="form-group">
                  <label><FaUniversity /> Bank IFSC Code</label>
                  <input type="text" className="form-control" placeholder="e.g. SBIN0001234" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Permanent Residential Address</label>
                  <input type="text" className="form-control" placeholder="Enter complete address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <span style={{ color: '#fb7185', fontSize: '0.8rem' }}>{errors.address}</span>}
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Officer Role</label>
                  <select className="form-control" value={officerRole} onChange={(e) => setOfficerRole(e.target.value)}>
                    <option value="FIELD_OFFICER">Field Officer (Level 1)</option>
                    <option value="DISTRICT_OFFICER">District Officer (Level 2)</option>
                    <option value="FINANCE_OFFICER">Finance Officer (Level 3)</option>
                    <option value="ADMIN">System Administrator</option>
                  </select>
                </div>

                <div className="form-group">
                  <label><FaBuilding /> Department</label>
                  <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>

                <div className="form-group">
                  <label><FaBriefcase /> Designation</label>
                  <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Assigned District</label>
                  <input type="text" className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="password"><FaLock /> Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span style={{ color: '#fb7185', fontSize: '0.8rem' }}>{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <span style={{ color: '#fb7185', fontSize: '0.8rem' }}>{errors.confirmPassword}</span>}
            </div>

          </div>

          <button type="submit" className="btn-brand" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.85rem' }} disabled={isLoading}>
            <FaUserPlus /> {isLoading ? 'Saving to Database...' : 'Complete Registration'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already registered? <Link to="/login" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Login here</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
