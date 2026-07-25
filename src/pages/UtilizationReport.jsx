import React, { useState, useEffect } from 'react';
import { FaChartBar, FaMoneyBillWave, FaLandmark, FaCheckCircle, FaChartPie } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';
import { paymentService } from '../services/paymentService';

const UtilizationReport = () => {
  const [apps, setApps] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const a = await applicationService.getApplications();
      setApps(a || []);
      const p = await paymentService.getPayments();
      setPayments(p || []);
    } catch (e) {
      console.error(e);
    }
  };

  const totalDisbursed = apps.filter(a => a.status === 'PAYMENT_SUCCESSFUL').length * 250000;

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <span className="badge badge-submitted" style={{ marginBottom: '0.5rem' }}>Analytics & Transparency</span>
        <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>Fund Utilization & Disbursement Analytics</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time transparency reports on scheme budget utilization and district distribution.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon emerald"><FaMoneyBillWave /></div>
          <div className="stat-info">
            <h4>₹ {totalDisbursed.toLocaleString()}</h4>
            <p>Total Disbursed Subsidies</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue"><FaCheckCircle /></div>
          <div className="stat-info">
            <h4>{apps.filter(a => a.status === 'PAYMENT_SUCCESSFUL').length}</h4>
            <p>Successful Grants</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber"><FaChartPie /></div>
          <div className="stat-info">
            <h4>99.2 %</h4>
            <p>Fund Allocation Efficiency</p>
          </div>
        </div>
      </div>

      {/* Distribution visual breakdown */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.5rem' }}>Scheme Budget Utilization Summary</h3>
        
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
              <span>Pradhan Mantri Awas Yojana (Housing)</span>
              <strong>78% Utilized (₹7.8 Cr / ₹10 Cr)</strong>
            </div>
            <div style={{ height: '10px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: 'var(--gradient-brand)' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
              <span>PM-KISAN Samman Nidhi (Agriculture)</span>
              <strong>92% Utilized (₹4.6 Cr / ₹5 Cr)</strong>
            </div>
            <div style={{ height: '10px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: 'var(--gradient-emerald)' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
              <span>National Higher Education Grant</span>
              <strong>64% Utilized (₹1.9 Cr / ₹3 Cr)</strong>
            </div>
            <div style={{ height: '10px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '64%', height: '100%', background: 'var(--gradient-amber)' }}></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default UtilizationReport;
