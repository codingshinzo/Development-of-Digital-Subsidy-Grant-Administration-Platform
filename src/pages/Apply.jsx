import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaMoneyBillAlt, FaUniversity, FaFileUpload, FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import '../styles/Apply.css';
import { applicationService } from '../services/applicationService';

// ---------------------------------------------------------
// Helper Components
// ---------------------------------------------------------

function Stepper({ currentStep }) {
  return (
    <div className="stepper">
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`}><FaUser /> <span>Personal</span></div>
      <div className="step-line"></div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`}><FaMoneyBillAlt /> <span>Income</span></div>
      <div className="step-line"></div>
      <div className={`step ${currentStep >= 3 ? 'active' : ''}`}><FaUniversity /> <span>Bank</span></div>
      <div className="step-line"></div>
      <div className={`step ${currentStep >= 4 ? 'active' : ''}`}><FaFileUpload /> <span>Documents</span></div>
      <div className="step-line"></div>
      <div className={`step ${currentStep >= 5 ? 'active' : ''}`}><FaCheckCircle /> <span>Preview</span></div>
    </div>
  );
}

// ---------------------------------------------------------
// Main Component
// ---------------------------------------------------------

const Apply = () => {
  const [step, setStep] = useState(1);

  // Use individual state variables for form inputs
  const [fullName, setFullName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [income, setIncome] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [document1, setDocument1] = useState(null);
  const [document2, setDocument2] = useState(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const schemeId = new URLSearchParams(location.search).get('schemeId') || 'SCH-000';

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!fullName) newErrors.fullName = "Full name is required";
      if (!aadhaar) {
        newErrors.aadhaar = "Aadhaar is required";
      } else if (!/^\d{12}$/.test(aadhaar)) {
        newErrors.aadhaar = "Aadhaar must be exactly 12 digits";
      }
    } else if (currentStep === 2) {
      if (!income) newErrors.income = "Income is required";
      if (!occupation) newErrors.occupation = "Occupation is required";
    } else if (currentStep === 3) {
      if (!bankName) newErrors.bankName = "Bank name is required";
      if (!accountNumber) newErrors.accountNumber = "Account number is required";
      if (!ifsc) newErrors.ifsc = "IFSC code is required";
    } else if (currentStep === 4) {
      if (!document1) newErrors.document1 = "Aadhaar Card is required";
      if (!document2) newErrors.document2 = "Income Certificate is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      if (step < 5) setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const applicationData = { schemeId, fullName, aadhaar, income, occupation, bankName, accountNumber, ifsc };
      const response = await applicationService.applyForScheme(applicationData);

      if (response.success) {
        alert(`Application Submitted Successfully!\nYour Application ID is: ${response.applicationId}`);
        navigate('/track-status');
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container apply-container animate-fade-in">
      <div className="apply-header">
        <h2>Apply for Scheme</h2>
        <p>Applying for Scheme ID: <strong>{schemeId}</strong></p>
      </div>

      <Stepper currentStep={step} />

      <div className="apply-card">
        <form onSubmit={step === 5 ? handleFinalSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="step-content animate-fade-in">
              <h3>Personal Details</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); if (errors.fullName) setErrors({ ...errors, fullName: '' }); }} />
                  {errors.fullName && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.fullName}</span>}
                </div>
                <div className="input-group">
                  <label>Aadhaar Number</label>
                  <input type="text" value={aadhaar} onChange={(e) => { setAadhaar(e.target.value); if (errors.aadhaar) setErrors({ ...errors, aadhaar: '' }); }} maxLength="12" />
                  {errors.aadhaar && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.aadhaar}</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="step-content animate-fade-in">
              <h3>Income & Occupation</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Annual Income (₹)</label>
                  <input type="number" value={income} onChange={(e) => { setIncome(e.target.value); if (errors.income) setErrors({ ...errors, income: '' }); }} />
                  {errors.income && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.income}</span>}
                </div>
                <div className="input-group">
                  <label>Occupation</label>
                  <select value={occupation} onChange={(e) => { setOccupation(e.target.value); if (errors.occupation) setErrors({ ...errors, occupation: '' }); }}>
                    <option value="">Select</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Business">Business</option>
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.occupation && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.occupation}</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="step-content animate-fade-in">
              <h3>Bank Details</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Bank Name</label>
                  <input type="text" value={bankName} onChange={(e) => { setBankName(e.target.value); if (errors.bankName) setErrors({ ...errors, bankName: '' }); }} />
                  {errors.bankName && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.bankName}</span>}
                </div>
                <div className="input-group">
                  <label>Account Number</label>
                  <input type="text" value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value); if (errors.accountNumber) setErrors({ ...errors, accountNumber: '' }); }} />
                  {errors.accountNumber && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.accountNumber}</span>}
                </div>
                <div className="input-group">
                  <label>IFSC Code</label>
                  <input type="text" value={ifsc} onChange={(e) => { setIfsc(e.target.value); if (errors.ifsc) setErrors({ ...errors, ifsc: '' }); }} />
                  {errors.ifsc && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.ifsc}</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="step-content animate-fade-in">
              <h3>Upload Documents</h3>
              <p className="help-text">Please upload clear copies of your documents (Dummy upload).</p>
              <div className="form-grid">
                <div className="input-group">
                  <label>Aadhaar Card (PDF/JPG)</label>
                  <input type="file" onChange={(e) => { setDocument1(e.target.files[0]); if (errors.document1) setErrors({ ...errors, document1: '' }); }} />
                  {errors.document1 && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.document1}</span>}
                </div>
                <div className="input-group">
                  <label>Income Certificate (PDF/JPG)</label>
                  <input type="file" onChange={(e) => { setDocument2(e.target.files[0]); if (errors.document2) setErrors({ ...errors, document2: '' }); }} />
                  {errors.document2 && <span style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{errors.document2}</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="step-content animate-fade-in">
              <h3>Preview Application</h3>
              <div className="preview-section">
                <p><strong>Name:</strong> {fullName}</p>
                <p><strong>Aadhaar:</strong> {aadhaar}</p>
                <p><strong>Annual Income:</strong> ₹{income}</p>
                <p><strong>Occupation:</strong> {occupation}</p>
                <p><strong>Bank:</strong> {bankName} - {accountNumber}</p>
                <div className="alert alert-info">
                  Please verify all details before submitting. Once submitted, it cannot be edited.
                </div>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="apply-footer">
            {step > 1 && (
              <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>
                <FaArrowLeft /> Previous
              </button>
            )}

            {step < 5 ? (
              <button type="submit" className="btn btn-primary" style={{ marginLeft: 'auto' }}>
                Next <FaArrowRight />
              </button>
            ) : (
              <button type="submit" className="btn btn-primary" style={{ marginLeft: 'auto' }} disabled={isSubmitting}>
                <FaCheckCircle /> {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default Apply;
