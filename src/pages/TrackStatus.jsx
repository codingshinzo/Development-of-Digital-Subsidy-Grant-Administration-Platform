import React, { useState, useEffect } from 'react';
import { FaSearch, FaCheckCircle, FaUserCheck, FaFileContract, FaMoneyCheckAlt, FaTimesCircle, FaClock } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';

const TrackStatus = () => {
  const [appIdInput, setAppIdInput] = useState('');
  const [activeApp, setActiveApp] = useState(null);
  const [allApps, setAllApps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const data = await applicationService.getApplications();
      setAllApps(data || []);
      if (data && data.length > 0) setActiveApp(data[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!appIdInput) return;
    const cleanId = appIdInput.replace(/\D/g, '');
    const found = allApps.find(a => String(a.id) === cleanId);
    if (found) {
      setActiveApp(found);
    } else {
      alert(`Application #APP-${cleanId} not found.`);
    }
  };

  const getStageStepState = (stageIndex, currentStatus) => {
    // Stage 1: Submitted / Automated Scoring
    // Stage 2: Field Officer Review
    // Stage 3: District Officer Review
    // Stage 4: Finance Officer & Disbursement

    if (currentStatus === 'FIELD_REJECTED' || currentStatus === 'DISTRICT_REJECTED') {
      return 'rejected';
    }

    const statusMap = {
      'SUBMITTED': 1,
      'FIELD_VERIFIED': 2,
      'DISTRICT_VERIFIED': 3,
      'APPROVED_FOR_PAYMENT': 4,
      'PAYMENT_SUCCESSFUL': 4
    };

    const currentLevel = statusMap[currentStatus] || 1;

    if (stageIndex < currentLevel) return 'completed';
    if (stageIndex === currentLevel) return 'active';
    return 'pending';
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#fff' }}>Application Lifecycle Tracker</h2>
        <p style={{ color: 'var(--text-muted)' }}>Enter your Application ID to view step-by-step 3-stage officer approval progress.</p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} style={{ maxWidth: '550px', margin: '0 auto 2.5rem auto', display: 'flex', gap: '0.75rem' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Application ID (e.g. 1, 101)"
          value={appIdInput}
          onChange={(e) => setAppIdInput(e.target.value)}
        />
        <button type="submit" className="btn-brand" style={{ padding: '0.75rem 1.5rem', flexShrink: 0 }}>
          <FaSearch /> Track
        </button>
      </form>

      {activeApp ? (
        <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '850px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
            <div>
              <span className="badge badge-submitted" style={{ marginBottom: '0.4rem' }}>Application Status</span>
              <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>#APP-{activeApp.id} - {activeApp.scheme?.name || 'Subsidy Scheme'}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Submitted on: {activeApp.submittedDate ? new Date(activeApp.submittedDate).toLocaleDateString() : 'Today'}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Automated Score</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399' }}>{activeApp.eligibilityScore || 85} / 100</div>
            </div>
          </div>

          {/* Stepper Chain (Diagram v1.2) */}
          <div className="workflow-stepper">
            
            <div className={`workflow-step ${getStageStepState(1, activeApp.status)}`}>
              <div className="step-icon">1</div>
              <div className="step-label">Application Submitted</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Auto-Scored</span>
            </div>

            <div className={`workflow-step ${getStageStepState(2, activeApp.status)}`}>
              <div className="step-icon">2</div>
              <div className="step-label">Field Officer Review</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Ground Check</span>
            </div>

            <div className={`workflow-step ${getStageStepState(3, activeApp.status)}`}>
              <div className="step-icon">3</div>
              <div className="step-label">District Officer Review</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>2nd Layer Scrutiny</span>
            </div>

            <div className={`workflow-step ${getStageStepState(4, activeApp.status)}`}>
              <div className="step-icon">4</div>
              <div className="step-label">Finance & Disbursement</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Bank Transfer</span>
            </div>

          </div>

          {/* Stage Remarks Box */}
          <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaClock style={{ color: 'var(--accent-blue)' }} /> System & Officer Log Remarks
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
              {activeApp.remarks || 'Application is progressing through the official 3-level verification pipeline smoothly.'}
            </p>
          </div>

        </div>
      ) : (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ color: 'var(--text-muted)' }}>Select or search an application to view lifecycle details.</p>
        </div>
      )}

    </div>
  );
};

export default TrackStatus;
