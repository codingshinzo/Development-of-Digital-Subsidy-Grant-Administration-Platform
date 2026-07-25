import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaMoneyCheckAlt, FaRupeeSign, FaLandmark } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';
import { paymentService } from '../services/paymentService';

const FinanceOfficerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [disbursements, setDisbursements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apps = await applicationService.getApplications();
      setApplications(apps || []);
      const payments = await paymentService.getPayments();
      setDisbursements(payments || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisburse = async (appId, amount) => {
    const confirmDisburse = window.confirm(`Release payment of ₹${amount} for Application #APP-${appId}?`);
    if (!confirmDisburse) return;

    try {
      await applicationService.updateStatus(appId, 'PAYMENT_SUCCESSFUL', `Payment of ₹${amount} successfully disbursed to beneficiary account.`);
      await paymentService.disbursePayment(appId);
      alert(`Payment of ₹${amount} disbursed successfully! Transaction reference generated.`);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const readyQueue = applications.filter(a => a.status === 'DISTRICT_VERIFIED' || a.status === 'APPROVED_FOR_PAYMENT');

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <span className="badge badge-approved" style={{ marginBottom: '0.5rem' }}>Level 3 Finance Sign-off</span>
        <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>Finance Officer Payment & Disbursement Portal</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Final sign-off, grant amount release, and direct bank account disbursement tracking.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon emerald"><FaRupeeSign /></div>
          <div className="stat-info">
            <h4>₹ {readyQueue.length * 250000}</h4>
            <p>Pending Disbursement Pool</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><FaMoneyCheckAlt /></div>
          <div className="stat-info">
            <h4>{applications.filter(a => a.status === 'PAYMENT_SUCCESSFUL').length}</h4>
            <p>Completed Transactions</p>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>Disbursement Queue (Ready for Release)</h3>

        {isLoading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading disbursement queue...</p>
        ) : readyQueue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
            ✓ All approved applications have been disbursed.
          </div>
        ) : (
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Scheme</th>
                  <th>Approved Amount</th>
                  <th>Scrutiny Log</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {readyQueue.map((app) => {
                  const amount = app.scheme?.budget || app.scheme?.maxAmount || 250000;
                  return (
                    <tr key={app.id}>
                      <td><strong>#APP-{app.id}</strong></td>
                      <td>{app.scheme?.name || 'Subsidy Scheme'}</td>
                      <td><strong style={{ color: '#34d399', fontSize: '1.05rem' }}>₹{amount.toLocaleString()}</strong></td>
                      <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{app.remarks || 'District scrutiny sign-off complete.'}</td>
                      <td>
                        <button
                          onClick={() => handleDisburse(app.id, amount)}
                          className="btn-emerald"
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
