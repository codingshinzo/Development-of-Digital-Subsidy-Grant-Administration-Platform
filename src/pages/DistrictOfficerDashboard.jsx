import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaShieldAlt, FaUserCheck } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';

const DistrictOfficerDashboard = () => {
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
    const remarks = prompt(`District Officer review remarks for ${actionName}:`, `Level 2 District scrutiny completed. Approved for payment.`);
    if (remarks === null) return;

    try {
      await applicationService.updateStatus(appId, newStatus, remarks);
      alert(`Application #APP-${appId} updated to ${newStatus}!`);
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const pendingQueue = applications.filter(a => a.status === 'FIELD_VERIFIED');

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <span className="badge badge-review" style={{ marginBottom: '0.5rem' }}>Level 2 Review Portal</span>
        <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>District Officer Secondary Scrutiny Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Review Level 1 Field Officer verification evidence and approve for Finance Sign-off.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon amber"><FaUserCheck /></div>
          <div className="stat-info">
            <h4>{pendingQueue.length}</h4>
            <p>Pending Level 2 Scrutiny</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon emerald"><FaCheckCircle /></div>
          <div className="stat-info">
            <h4>{applications.filter(a => a.status === 'DISTRICT_VERIFIED' || a.status === 'APPROVED_FOR_PAYMENT').length}</h4>
            <p>Scrutinized & Forwarded to Finance</p>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>Level 2 Scrutiny Queue</h3>

        {isLoading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading pending applications...</p>
        ) : pendingQueue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
            ✓ No pending applications requiring District Officer scrutiny.
          </div>
        ) : (
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Scheme</th>
                  <th>Field Officer Remarks</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingQueue.map((app) => (
                  <tr key={app.id}>
                    <td><strong>#APP-{app.id}</strong></td>
                    <td>{app.scheme?.name || 'Subsidy Scheme'}</td>
                    <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{app.remarks || 'Field ground check passed.'}</td>
                    <td><strong style={{ color: '#34d399' }}>{app.eligibilityScore || 80} / 100</strong></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleAction(app.id, 'DISTRICT_VERIFIED', 'Approve & Forward to Finance')}
                          className="btn-emerald"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          <FaCheckCircle /> Approve (Level 3)
                        </button>
                        <button
                          onClick={() => handleAction(app.id, 'DISTRICT_REJECTED', 'Reject Application')}
                          className="btn-outline"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: '#fb7185' }}
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

export default DistrictOfficerDashboard;
