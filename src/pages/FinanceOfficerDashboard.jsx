import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaMoneyCheckAlt, FaRupeeSign } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';

const FinanceOfficerDashboard = () => {
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setIsLoading(true);
    try {
      const data = await applicationService.getFinanceQueue();
      setQueue(data || []);
    } catch (e) {
      console.error('Error fetching Finance Officer queue:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisburse = async (appId, amount) => {
    const comments = prompt(`Enter Finance Officer disbursement sign-off comments for #APP-${appId}:`, `Final finance approval sign-off for ₹${amount}.`);
    if (comments === null) return;

    try {
      await applicationService.processFinanceAction(appId, 'APPROVE', comments);
      alert(`Application #APP-${appId} approved for payment disbursement!`);
      fetchQueue();
    } catch (e) {
      alert(`Disbursement action failed: ${e.message}`);
    }
  };

  const totalPendingPool = queue.reduce((acc, a) => acc + (a.scheme?.budget || 0), 0);

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0', background: '#ffffff', minHeight: '80vh' }}>
      
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <span className="badge badge-approved" style={{ marginBottom: '0.5rem' }}>Level 3 Finance Sign-off</span>
        <h2 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: 800 }}>Finance Officer Payment & Disbursement Portal</h2>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Final sign-off, grant amount release, and direct bank account disbursement tracking.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon emerald"><FaRupeeSign /></div>
          <div className="stat-info">
            <h4>₹ {totalPendingPool.toLocaleString()}</h4>
            <p>Pending Level 3 Disbursement Pool</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><FaMoneyCheckAlt /></div>
          <div className="stat-info">
            <h4>{queue.length}</h4>
            <p>Ready for Sign-off</p>
          </div>
        </div>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1.25rem', fontWeight: 700 }}>Disbursement Queue (Ready for Release)</h3>

        {isLoading ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Loading disbursement queue...</p>
        ) : queue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
            ✓ All approved applications have been disbursed.
          </div>
        ) : (
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Scheme</th>
                  <th>Approved Grant Amount</th>
                  <th>Scrutiny Log</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((app) => {
                  const amount = app.scheme?.budget || 0;
                  return (
                    <tr key={app.id}>
                      <td><strong>#APP-{app.id}</strong></td>
                      <td>{app.scheme?.name || 'Subsidy Scheme'}</td>
                      <td><strong style={{ color: '#0284c7', fontSize: '1.05rem' }}>₹{amount.toLocaleString()}</strong></td>
                      <td style={{ fontSize: '0.85rem', color: '#475569' }}>{app.remarks || 'District scrutiny sign-off complete.'}</td>
                      <td>
                        <button
                          onClick={() => handleDisburse(app.id, amount)}
                          className="btn-brand"
                          style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                        >
                          <FaMoneyCheckAlt /> Disburse Grant
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default FinanceOfficerDashboard;
