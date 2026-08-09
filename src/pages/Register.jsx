import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUserCheck, FaUserShield, FaCheckCircle, 
  FaTractor, FaGraduationCap, FaHeartbeat, FaStore, FaTools
} from 'react-icons/fa';
import { authService } from '../services/authService';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const isOfficerRegistration = location.pathname.includes('officer') || queryParams.get('type') === 'officer' || queryParams.get('type') === 'admin';
  const registrationType = isOfficerRegistration ? 'ADMIN' : 'USER';

  // Common User Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Beneficiary specific
  const [beneficiaryType, setBeneficiaryType] = useState('FARMER');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [income, setIncome] = useState('150000');
  const [address, setAddress] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  // Type Specific Sub-Attributes
  const [landAcres, setLandAcres] = useState('2.5');
  const [khasraNumber, setKhasraNumber] = useState('');
  const [cropType, setCropType] = useState('Wheat / Paddy');

  const [institutionName, setInstitutionName] = useState('');
  const [courseName, setCourseName] = useState('B.Tech / B.Sc');
  const [rollNumber, setRollNumber] = useState('');

  const [pensionCardId, setPensionCardId] = useState('');
  const [age, setAge] = useState('65');

  const [businessName, setBusinessName] = useState('');
  const [udyamNumber, setUdyamNumber] = useState('');
  const [enterpriseType, setEnterpriseType] = useState('Micro Enterprise');

  const [eshramId, setEshramId] = useState('');
  const [occupation, setOccupation] = useState('Construction / Craft');
  const [dependents, setDependents] = useState('3');

  // Officer Specific Attributes
  const [officerRole, setOfficerRole] = useState('FIELD_OFFICER');
  const [employeeCode, setEmployeeCode] = useState('');
  const [designation, setDesignation] = useState('Field Inspection Officer');
  const [department, setDepartment] = useState('Revenue & Subsidy Verification');
  const [district, setDistrict] = useState('District Central');

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    setErrors({});
    setServerMessage('');
  }, [location.pathname, location.search]);

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid Email address is required';
    if (!phone.trim() || !/^\d{10}$/.test(phone)) newErrors.phone = '10-digit mobile phone number required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (registrationType === 'USER') {
      if (!aadhaarNumber.trim() || !/^\d{12}$/.test(aadhaarNumber)) {
        newErrors.aadhaarNumber = '12-digit Aadhaar card number required';
      }
      if (!address.trim()) newErrors.address = 'Residential address is required';

      if (beneficiaryType === 'FARMER' && !khasraNumber.trim()) {
        newErrors.khasraNumber = 'Land Khasra / Survey Number is required';
      }
      if (beneficiaryType === 'STUDENT' && (!institutionName.trim() || !rollNumber.trim())) {
        if (!institutionName.trim()) newErrors.institutionName = 'Institution name is required';
        if (!rollNumber.trim()) newErrors.rollNumber = 'Student Roll/ID is required';
      }
      if (beneficiaryType === 'SENIOR_CITIZEN' && !pensionCardId.trim()) {
        newErrors.pensionCardId = 'Pensioner / Senior ID card number required';
      }
      if (beneficiaryType === 'ENTREPRENEUR' && (!businessName.trim() || !udyamNumber.trim())) {
        if (!businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!udyamNumber.trim()) newErrors.udyamNumber = 'Udyam / MSME Registration No. required';
      }
      if (beneficiaryType === 'WORKER' && !eshramId.trim()) {
        newErrors.eshramId = 'E-Shram / Labour Card ID required';
      }
    } else {
      if (!employeeCode.trim()) {
        newErrors.employeeCode = 'Official Employee Code / Officer ID is required';
      }
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
        let specificDetails = {};
        if (beneficiaryType === 'FARMER') {
          specificDetails = { landAcres, khasraNumber, cropType };
        } else if (beneficiaryType === 'STUDENT') {
          specificDetails = { institutionName, courseName, rollNumber };
        } else if (beneficiaryType === 'SENIOR_CITIZEN') {
          specificDetails = { pensionCardId, age };
        } else if (beneficiaryType === 'ENTREPRENEUR') {
          specificDetails = { businessName, udyamNumber, enterpriseType };
        } else if (beneficiaryType === 'WORKER') {
          specificDetails = { eshramId, occupation, dependents };
        }

        const payload = {
          fullName,
          email,
          phone,
          password,
          role: registrationType === 'USER' ? 'CITIZEN' : officerRole,
          beneficiaryType: registrationType === 'USER' ? beneficiaryType : null,
          specificDetails,
          aadhaarNumber,
          category,
          income: parseFloat(income) || 150000,
          address,
          bankAccountNumber,
          ifscCode,
          employeeCode,
          designation,
          department,
          district
        };

        const response = await authService.register(payload);

        if (response.success) {
          alert(`Account Registered Successfully as ${registrationType === 'USER' ? `User (${beneficiaryType})` : `Admin Officer (${officerRole})`}! Please sign in.`);
          navigate(registrationType === 'USER' ? '/login?type=user' : '/login?type=admin');
        } else {
          setServerMessage(response.error || 'Registration failed.');
        }
      } catch (error) {
        setServerMessage(error.message || 'Error saving registration details.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem', background: '#ffffff', minHeight: '85vh' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {registrationType === 'USER' ? (
            <>
              <span className="badge badge-submitted" style={{ marginBottom: '0.75rem', background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }}>
                <FaUserCheck /> Citizen Registration Portal
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: 800 }}>Beneficiary Account Registration</h2>
              <p style={{ color: '#475569', fontSize: '0.95rem' }}>
                Create a beneficiary account to apply for subsidy grants (Farmer, Student, Senior Citizen, Entrepreneur, Worker).
              </p>
            </>
          ) : (
            <>
              <span className="badge badge-approved" style={{ marginBottom: '0.75rem', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
                <FaUserShield /> Government Officer Registration
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: 800 }}>Officer Credentials Registration</h2>
              <p style={{ color: '#475569', fontSize: '0.95rem' }}>
                Register official credentials for Field Officers, District Officers, Finance Officers & Super Admins.
              </p>
            </>
          )}
        </div>

        {/* Card Container */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
        }}>

          {serverMessage && (
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#be123c', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
              {serverMessage}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit}>
            
            {/* Common Section: Core Identity Info */}
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '1.25rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', fontWeight: 700 }}>
              1. Basic Account Credentials
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              
              <div className="form-group">
                <label>Full Legal Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder={registrationType === 'USER' ? 'user@example.com' : 'officer@gov.in'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>10-Digit Mobile Number *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.confirmPassword}</span>}
              </div>

            </div>

            {/* PATH A: BENEFICIARY CITIZEN SPECIFIC FIELDS */}
            {registrationType === 'USER' && (
              <>
                <h3 style={{ fontSize: '1.15rem', color: '#0369a1', marginBottom: '1.25rem', borderBottom: '2px solid #bae6fd', paddingBottom: '0.5rem', fontWeight: 700, marginTop: '1rem' }}>
                  2. Select Beneficiary Type & Dynamic Details
                </h3>

                {/* Sub Category Grid */}
                <div style={{ marginBottom: '1.5rem', background: '#f0f9ff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #bae6fd' }}>
                  <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.75rem' }}>
                    Choose Specific Beneficiary Category:
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.6rem' }}>
                    
                    <div 
                      onClick={() => setBeneficiaryType('FARMER')}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: beneficiaryType === 'FARMER' ? '2px solid #38bdf8' : '1px solid #e2e8f0',
                        background: beneficiaryType === 'FARMER' ? '#e0f2fe' : '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxShadow: beneficiaryType === 'FARMER' ? '0 2px 8px rgba(56, 189, 248, 0.25)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: beneficiaryType === 'FARMER' ? '#0369a1' : '#334155' }}>Farmer</div>
                    </div>

                    <div 
                      onClick={() => setBeneficiaryType('STUDENT')}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: beneficiaryType === 'STUDENT' ? '2px solid #38bdf8' : '1px solid #e2e8f0',
                        background: beneficiaryType === 'STUDENT' ? '#e0f2fe' : '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxShadow: beneficiaryType === 'STUDENT' ? '0 2px 8px rgba(56, 189, 248, 0.25)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: beneficiaryType === 'STUDENT' ? '#0369a1' : '#334155' }}>Student</div>
                    </div>

                    <div 
                      onClick={() => setBeneficiaryType('SENIOR_CITIZEN')}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: beneficiaryType === 'SENIOR_CITIZEN' ? '2px solid #38bdf8' : '1px solid #e2e8f0',
                        background: beneficiaryType === 'SENIOR_CITIZEN' ? '#e0f2fe' : '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxShadow: beneficiaryType === 'SENIOR_CITIZEN' ? '0 2px 8px rgba(56, 189, 248, 0.25)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: beneficiaryType === 'SENIOR_CITIZEN' ? '#0369a1' : '#334155' }}>Senior</div>
                    </div>

                    <div 
                      onClick={() => setBeneficiaryType('ENTREPRENEUR')}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: beneficiaryType === 'ENTREPRENEUR' ? '2px solid #38bdf8' : '1px solid #e2e8f0',
                        background: beneficiaryType === 'ENTREPRENEUR' ? '#e0f2fe' : '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxShadow: beneficiaryType === 'ENTREPRENEUR' ? '0 2px 8px rgba(56, 189, 248, 0.25)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: beneficiaryType === 'ENTREPRENEUR' ? '#0369a1' : '#334155' }}>Business</div>
                    </div>

                    <div 
                      onClick={() => setBeneficiaryType('WORKER')}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: beneficiaryType === 'WORKER' ? '2px solid #38bdf8' : '1px solid #e2e8f0',
                        background: beneficiaryType === 'WORKER' ? '#e0f2fe' : '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxShadow: beneficiaryType === 'WORKER' ? '0 2px 8px rgba(56, 189, 248, 0.25)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: beneficiaryType === 'WORKER' ? '#0369a1' : '#334155' }}>Worker</div>
                    </div>

                  </div>
                </div>

                {/* Specific Category Attribute Input Fields */}
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                  
                  {beneficiaryType === 'FARMER' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label>Landholding Area (Acres) *</label>
                        <input className="form-control" type="text" value={landAcres} onChange={(e) => setLandAcres(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Land Khasra / Survey Number *</label>
                        <input className="form-control" type="text" placeholder="e.g. KHA-9081/A" value={khasraNumber} onChange={(e) => setKhasraNumber(e.target.value)} />
                        {errors.khasraNumber && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.khasraNumber}</span>}
                      </div>
                      <div className="form-group">
                        <label>Primary Crop Cultivation</label>
                        <input className="form-control" type="text" value={cropType} onChange={(e) => setCropType(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {beneficiaryType === 'STUDENT' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label>College / School Name *</label>
                        <input className="form-control" type="text" placeholder="Institution Name" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />
                        {errors.institutionName && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.institutionName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Course / Degree Enrolled</label>
                        <input className="form-control" type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Student Roll / Enrollment ID *</label>
                        <input className="form-control" type="text" placeholder="e.g. STU-2026-90" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
                        {errors.rollNumber && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.rollNumber}</span>}
                      </div>
                    </div>
                  )}

                  {beneficiaryType === 'SENIOR_CITIZEN' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label>Pensioner / Senior ID Card No. *</label>
                        <input className="form-control" type="text" placeholder="e.g. PEN-80912" value={pensionCardId} onChange={(e) => setPensionCardId(e.target.value)} />
                        {errors.pensionCardId && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.pensionCardId}</span>}
                      </div>
                      <div className="form-group">
                        <label>Age (Years)</label>
                        <input className="form-control" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {beneficiaryType === 'ENTREPRENEUR' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label>Enterprise / Business Name *</label>
                        <input className="form-control" type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                        {errors.businessName && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.businessName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Udyam / MSME Registration No. *</label>
                        <input className="form-control" type="text" placeholder="UDYAM-XX-00-0000000" value={udyamNumber} onChange={(e) => setUdyamNumber(e.target.value)} />
                        {errors.udyamNumber && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.udyamNumber}</span>}
                      </div>
                      <div className="form-group">
                        <label>Enterprise Category</label>
                        <input className="form-control" type="text" value={enterpriseType} onChange={(e) => setEnterpriseType(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {beneficiaryType === 'WORKER' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label>E-Shram / Labour Card ID *</label>
                        <input className="form-control" type="text" placeholder="e.g. ESHRAM-9871" value={eshramId} onChange={(e) => setEshramId(e.target.value)} />
                        {errors.eshramId && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.eshramId}</span>}
                      </div>
                      <div className="form-group">
                        <label>Type of Occupation</label>
                        <input className="form-control" type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Number of Family Dependents</label>
                        <input className="form-control" type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} />
                      </div>
                    </div>
                  )}

                </div>

                {/* Identity & Banking Section */}
                <h3 style={{ fontSize: '1.15rem', color: '#0369a1', marginBottom: '1.25rem', borderBottom: '2px solid #bae6fd', paddingBottom: '0.5rem', fontWeight: 700 }}>
                  3. Identity & DBT Direct Bank Account
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  
                  <div className="form-group">
                    <label>12-Digit Aadhaar Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123456789012"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                    />
                    {errors.aadhaarNumber && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.aadhaarNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label>Social Category *</label>
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="GENERAL">General Category</option>
                      <option value="OBC">OBC (Other Backward Class)</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Annual Family Income (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Bank Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bank account number"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Bank IFSC Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. SBIN0001234"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                  </div>

                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Residential Address *</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Enter full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.address}</span>}
                </div>
              </>
            )}

            {/* PATH B: GOVERNMENT OFFICER SPECIFIC FIELDS */}
            {registrationType === 'ADMIN' && (
              <>
                <h3 style={{ fontSize: '1.15rem', color: '#15803d', marginBottom: '1.25rem', borderBottom: '2px solid #bbf7d0', paddingBottom: '0.5rem', fontWeight: 700, marginTop: '1rem' }}>
                  2. Official Employment Credentials
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  
                  <div className="form-group">
                    <label>Officer Designation *</label>
                    <select className="form-control" value={officerRole} onChange={(e) => setOfficerRole(e.target.value)}>
                      <option value="FIELD_OFFICER">Field Officer</option>
                      <option value="DISTRICT_OFFICER">District Officer</option>
                      <option value="FINANCE_OFFICER">Finance Officer</option>
                      <option value="ADMIN">System Administrator</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Official Employee Code / Officer ID *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. EMP-GOV-9081"
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                    />
                    {errors.employeeCode && <span style={{ color: '#be123c', fontSize: '0.8rem' }}>{errors.employeeCode}</span>}
                  </div>

                  <div className="form-group">
                    <label>Official Designation Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Department / Ministry</label>
                    <input
                      type="text"
                      className="form-control"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Assigned Jurisdiction District</label>
                    <input
                      type="text"
                      className="form-control"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>

                </div>
              </>
            )}

            <button
              type="submit"
              className="btn-brand"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '2rem',
                padding: '0.9rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                background: registrationType === 'USER' ? 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff'
              }}
              disabled={isLoading}
            >
              <FaCheckCircle /> {isLoading ? 'Processing Registration...' : registrationType === 'USER' ? `Complete ${beneficiaryType.replace('_', ' ')} Registration` : `Register ${officerRole.replace('_', ' ')} Account`}
            </button>

          </form>

          {/* Dedicated Sign In Link */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link 
              to={registrationType === 'ADMIN' ? '/login?type=admin' : '/login?type=user'} 
              style={{ color: registrationType === 'USER' ? '#0284c7' : '#059669', fontWeight: 700 }}
            >
              Sign In to {registrationType === 'USER' ? 'Beneficiary Portal' : 'Officer Portal'}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;
