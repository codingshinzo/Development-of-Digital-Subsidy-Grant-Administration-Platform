import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaUserCheck } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';

const FieldOfficerDashboard = () => {
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setIsLoading(true);
    try {
      const data = await applicationService.getFieldQueue();
      setQueue(data || []);
    } catch (e) {
      console.error('Error fetching Field Officer queue:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (appId, action, actionLabel) => {
    const comments = prompt(`Enter Level 1 Field Officer comments for ${actionLabel}:`, `Physical ground inspection completed for #APP-${appId}.`);
    if (comments === null) return;
    if ((action === 'REJECT' || action === 'REQUEST_CORRECTION') && !comments.trim()) {
      alert('Comments are compulsory when rejecting or requesting correction.');
      return;
    }

    try {
      await applicationService.processFieldAction(appId, action, comments);
      alert(`Application #APP-${appId} action (${actionLabel}) processed successfully!`);
      fetchQueue();
    } catch (error) {
      alert(`Action failed: ${error.message}`);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0', background: '#ffffff', minHeight: '80vh' }}>
      
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <span className="badge badge-submitted" style={{ marginBottom: '0.5rem' }}>Level 1 Review Portal</span>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: 800 }}>Field Officer Verification Dashboard</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Conduct ground verification, inspect uploaded documents, and approve or escalate applications.</p>
        </div>
      </div>

      {/* Metric summary */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><FaUserCheck /></div>
          <div className="stat-info">
            <h4>{queue.length}</h4>
            <p>Pending Level 1 Ground Verifications</p>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1.25rem', fontWeight: 700 }}>Level 1 Verification Queue</h3>

        {isLoading ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Loading pending applications...</p>
        ) : queue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
            ✓ No pending applications in Field Officer queue.
          </div>
        ) : (
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Scheme</th>
                  <th>Eligibility Score</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((app) => (
                  <tr key={app.id}>
                    <td><strong>#APP-{app.id}</strong></td>
                    <td>{app.scheme?.name || 'Subsidy Scheme'}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: (app.eligibilityScore || 0) >= 50 ? '#047857' : '#be123c' }}>
                        {app.eligibilityScore != null ? app.eligibilityScore : 'N/A'} / 100
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '280px' }}>
                      {app.remarks || 'Awaiting ground inspection.'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleAction(app.id, 'APPROVE', 'Approve & Escalate to District Officer')}
                          className="btn-brand"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          <FaCheckCircle /> Approve (Level 2)
                        </button>
                        <button
                          onClick={() => handleAction(app.id, 'REJECT', 'Reject Application')}
                          className="btn-outline"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: '#be123c', borderColor: '#fecdd3' }}
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default FieldOfficerDashboard;
