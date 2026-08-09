import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaCheckCircle, FaChartPie, FaDownload, FaFilePdf } from 'react-icons/fa';
import { apiClient } from '../services/apiClient';

const UtilizationReport = () => {
  const [stats, setStats] = useState(null);
  const [schemesData, setSchemesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [sData, schData] = await Promise.all([
        apiClient.request('/api/dashboard/stats').catch(() => null),
        apiClient.request('/api/dashboard/schemes').catch(() => [])
      ]);

      setStats(sData);
      setSchemesData(schData || []);
    } catch (e) {
      console.error('Error loading utilization analytics:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/dashboard/reports/excel', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'subsidy_schemes_report.csv';
      a.click();
    } catch (err) {
      alert('Failed to download Excel report: ' + err.message);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/dashboard/reports/pdf', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'subsidy_schemes_report.pdf';
      a.click();
    } catch (err) {
      alert('Failed to download PDF report: ' + err.message);
    }
  };

  const totalDisbursed = stats?.totalDisbursedAmount || 0;
  const approvedGrantsCount = stats?.totalApprovedGrants || 0;

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0', background: '#ffffff', minHeight: '80vh' }}>
      
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <span className="badge badge-submitted" style={{ marginBottom: '0.5rem' }}>Analytics & Transparency</span>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: 800 }}>Fund Utilization & Disbursement Analytics</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Real-time database analytics on scheme budget utilization and district distribution.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleDownloadExcel} className="btn-outline" style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem' }}>
            <FaDownload /> Export CSV / Excel
          </button>
          <button onClick={handleDownloadPdf} className="btn-brand" style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem' }}>
            <FaFilePdf /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
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
            <h4>{approvedGrantsCount}</h4>
            <p>Successful Approved Grants</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber"><FaChartPie /></div>
          <div className="stat-info">
            <h4>{stats?.totalApplications ? Math.round((approvedGrantsCount / Math.max(1, stats.totalApplications)) * 1000) / 10 : 0} %</h4>
            <p>Approval Conversion Efficiency</p>
          </div>
        </div>
      </div>

      {/* Dynamic Scheme Utilization Progress Bars */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1.5rem', fontWeight: 700 }}>Database Scheme Budget Utilization</h3>
        
        {isLoading ? (
          <p style={{ color: '#64748b', padding: '2rem', textAlign: 'center' }}>Loading live database utilization statistics...</p>
        ) : schemesData.length === 0 ? (
          <p style={{ color: '#64748b', padding: '2rem', textAlign: 'center' }}>No configured schemes found in database.</p>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {schemesData.map(scheme => {
              const utilPct = scheme.utilizationPercentage || 0;
              const totalBudg = scheme.totalBudget || 0;
              const usedBudg = scheme.budgetUsed || 0;

              return (
                <div key={scheme.schemeId}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: '#334155' }}>
                    <span style={{ fontWeight: 600 }}>{scheme.schemeName}</span>
                    <div>
                      {scheme.budgetWarning && (
                        <span className="badge badge-rejected" style={{ marginRight: '0.5rem', fontSize: '0.7rem' }}>
                          WARNING (&gt;80%)
                        </span>
                      )}
                      <strong>
                        {utilPct}% Utilized (₹{usedBudg.toLocaleString()} / ₹{totalBudg.toLocaleString()})
                      </strong>
                    </div>
                  </div>
                  <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${Math.min(100, Math.max(0, utilPct))}%`, 
                        height: '100%', 
                        background: utilPct >= 80 ? 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' : 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 100%)',
                        transition: 'width 0.5s ease' 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};

export default UtilizationReport;
