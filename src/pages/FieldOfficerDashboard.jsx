import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSearch, FaUserCheck } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';

const FieldOfficerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const data = await applicationService.getApplications();
      setApplications(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (appId, newStatus, actionName) => {
    const remarks = prompt(`Enter Field Officer verification remarks for ${actionName}:`, `Field verification completed. Status updated to ${newStatus}.`);
    if (remarks === null) return;

    try {
      await applicationService.updateStatus(appId, newStatus, remarks);
      alert(`Application #APP-${appId} updated to ${newStatus}!`);
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  // Filter for Level 1 queue
  const pendingQueue = applications.filter(a => a.status === 'SUBMITTED' || a.status === 'IN_REVIEW');

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-submitted" style={{ marginBottom: '0.5rem' }}>Level 1 Review Portal</span>
          <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>Field Officer Verification Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Conduct ground verification, inspect uploaded documents, and approve or escalate applications.</p>
        </div>
      </div>

      {/* Metric summary */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><FaUserCheck /></div>
          <div className="stat-info">
            <h4>{pendingQueue.length}</h4>
            <p>Pending Ground Verification</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon emerald"><FaCheckCircle /></div>
          <div className="stat-info">
            <h4>{applications.filter(a => a.status === 'FIELD_VERIFIED').length}</h4>
            <p>Verified & Escalated to Level 2</p>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>Level 1 Verification Queue</h3>

        {isLoading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading pending applications...</p>
        ) : pendingQueue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
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
                  <th>Auto Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingQueue.map((app) => (
                  <tr key={app.id}>
                    <td><strong>#APP-{app.id}</strong></td>
                    <td>{app.scheme?.name || 'Subsidy Scheme'}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: (app.eligibilityScore || 75) >= 60 ? '#34d399' : '#fb7185' }}>
                        {app.eligibilityScore || 75} / 100
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '280px' }}>
                      {app.remarks || 'Auto-eligibility score calculated.'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleAction(app.id, 'FIELD_VERIFIED', 'Approve & Escalate to District Officer')}
                          className="btn-emerald"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          <FaCheckCircle /> Approve (Level 2)
                        </button>
                        <button
                          onClick={() => handleAction(app.id, 'FIELD_REJECTED', 'Reject Application')}
                          className="btn-outline"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: '#fb7185', borderColor: 'rgba(244, 63, 94, 0.3)' }}
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
