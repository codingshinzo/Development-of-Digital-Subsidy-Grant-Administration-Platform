import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoice, FaCalculator, FaCheckCircle, FaUpload, FaArrowRight } from 'react-icons/fa';
import { schemeService } from '../services/schemeService';
import { applicationService } from '../services/applicationService';

const Apply = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState('');
  const [income, setIncome] = useState('150000');
  const [category, setCategory] = useState('GENERAL');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [address, setAddress] = useState('');
  const [documentType, setDocumentType] = useState('Income Certificate & Aadhaar Card');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const data = await schemeService.getSchemes();
      setSchemes(data || []);
      if (data && data.length > 0) setSelectedSchemeId(data[0].id);
    } catch (e) {
      console.error(e);
    }
  };

  // Automated Score Preview Calculation (Diagram v1.2: Income 30 pts, Category 40 pts, Document 30 pts)
  const calculateScorePreview = () => {
    let incScore = 30;
    const numIncome = parseFloat(income) || 0;
    if (numIncome > 300000) incScore = 10;
    else if (numIncome > 150000) incScore = 20;

    let catScore = 40;
    let docScore = 30;

    return incScore + catScore + docScore;
  };

  const estimatedScore = calculateScorePreview();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        schemeId: selectedSchemeId || 1,
        income,
        category,
        aadhaarNumber,
        address,
        documentType
      };

      const result = await applicationService.applyForScheme(payload);

      if (result.success || result.id) {
        setSuccessMessage(`Application #APP-${result.id || '101'} submitted successfully! Automated eligibility score: ${estimatedScore}/100.`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#fff' }}>Apply for Government Subsidy</h2>
        <p style={{ color: 'var(--text-muted)' }}>Complete the digital application for automated eligibility scoring & officer review.</p>
      </div>

      {successMessage && (
        <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
          <FaCheckCircle /> {successMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', maxWidth: '1050px', margin: '0 auto' }}>
        
        {/* Main Application Form */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem' }}>
          
          <div className="form-group">
            <label htmlFor="scheme">Select Welfare Scheme</label>
            <select
              id="scheme"
              className="form-control"
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
            >
              {schemes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Max Amount: ₹{s.budget || s.maxAmount || '250000'})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="aadhaar">Aadhaar Number (12 Digits)</label>
            <input
              type="text"
              id="aadhaar"
              className="form-control"
              placeholder="e.g. 987654321012"
              maxLength="12"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="income">Annual Household Income (₹)</label>
              <input
                type="number"
                id="income"
                className="form-control"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Social Category</label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="GENERAL">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Permanent Address</label>
            <textarea
              id="address"
              className="form-control"
              rows="3"
              placeholder="Enter full address as per Aadhaar"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="docs"><FaUpload /> Supporting Documents Upload</label>
            <select
              id="docs"
              className="form-control"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="Income Certificate & Aadhaar Card">Income Certificate & Aadhaar Card (Verified PDF)</option>
              <option value="Land Holding & Ration Card">Land Holding & Ration Card (Verified PDF)</option>
              <option value="Student Marksheet & College ID">Student Marksheet & College ID (Verified PDF)</option>
            </select>
          </div>

          <button type="submit" className="btn-brand" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.85rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'} <FaArrowRight />
          </button>
        </form>

        {/* Live Automated Score Preview Meter (Diagram v1.2) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <span className="badge badge-submitted" style={{ marginBottom: '1rem' }}>
              <FaCalculator /> Automated Score Gauge
            </span>
            
            <div style={{ margin: '1.5rem 0', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: estimatedScore >= 60 ? '#34d399' : '#fb7185' }}>
                {estimatedScore}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>out of 100</div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span>Income Points:</span>
                <strong>{income <= 150000 ? '30/30' : income <= 300000 ? '20/30' : '10/30'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span>Category Points:</span>
                <strong>40/40</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Document Completeness:</span>
                <strong>30/30</strong>
              </div>
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: estimatedScore >= 60 ? '#34d399' : '#fb7185' }}>
              {estimatedScore >= 60 ? '✓ Score meets 60+ threshold! Will pass to Level 1 Field Review.' : '✗ Score below threshold. May be flagged for manual review.'}
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>3-Stage Verification Pipeline</h4>
            <ol style={{ paddingLeft: '1.25rem', lineHeight: '1.7' }}>
              <li>Field Officer conducts ground visit & document review.</li>
              <li>District Officer performs secondary scrutiny.</li>
              <li>Finance Approver signs off & credits bank account.</li>
            </ol>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Apply;
