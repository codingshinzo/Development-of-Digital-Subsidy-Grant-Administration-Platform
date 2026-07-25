import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaSearch, FaFileInvoiceDollar, FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import { applicationService } from '../services/applicationService';

const BeneficiaryDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userName = localStorage.getItem('userName') || 'Citizen';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return <span className="badge badge-submitted"><FaClock /> Level 1: Field Review</span>;
      case 'FIELD_VERIFIED':
        return <span className="badge badge-review"><FaClock /> Level 2: District Review</span>;
      case 'DISTRICT_VERIFIED':
        return <span className="badge badge-review"><FaClock /> Level 3: Finance Approval</span>;
      case 'APPROVED_FOR_PAYMENT':
      case 'PAYMENT_SUCCESSFUL':
        return <span className="badge badge-approved"><FaCheckCircle /> Approved & Disbursed</span>;
      case 'FIELD_REJECTED':
      case 'DISTRICT_REJECTED':
        return <span className="badge badge-rejected"><FaExclamationTriangle /> Application Rejected</span>;
      default:
        return <span className="badge badge-submitted">{status || 'In Progress'}</span>;
    }
  };

  return (
    <div className="dashboard-page animate-fade-in" style={{ padding: '1rem 0' }}>
      
      {/* Welcome Banner */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>Welcome back, {userName}!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Track your government subsidy applications and check real-time eligibility scores.</p>
        </div>
        <Link to="/apply" className="btn-brand">
          <FaPlusCircle /> Apply New Scheme
        </Link>
      </div>

      {/* Overview Metric Cards */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><FaFileInvoiceDollar /></div>
          <div className="stat-info">
            <h4>{applications.length}</h4>
            <p>Total Applications</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon emerald"><FaCheckCircle /></div>
          <div className="stat-info">
            <h4>{applications.filter(a => a.status === 'PAYMENT_SUCCESSFUL' || a.status === 'APPROVED_FOR_PAYMENT').length}</h4>
            <p>Approved Grants</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber"><FaClock /></div>
          <div className="stat-info">
            <h4>{applications.filter(a => a.status !== 'PAYMENT_SUCCESSFUL' && a.status !== 'FIELD_REJECTED' && a.status !== 'DISTRICT_REJECTED').length}</h4>
            <p>In Review Chain</p>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Your Subsidy Applications</h3>
          <Link to="/track-status" className="btn-outline" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
            <FaSearch /> Visual Stage Tracker
          </Link>
        </div>

        {isLoading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading applications...</p>
        ) : applications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-lg)' }}>
            <FaFileInvoiceDollar style={{ fontSize: '2.5rem', color: 'var(--text-dim)', marginBottom: '1rem' }} />
            <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>No Active Applications Found</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>You haven't submitted any subsidy applications yet.</p>
            <Link to="/apply" className="btn-brand">Apply Now</Link>
          </div>
        ) : (
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Scheme Name</th>
                  <th>Submitted Date</th>
                  <th>Eligibility Score</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td><strong>#APP-{app.id}</strong></td>
                    <td>{app.scheme?.name || 'Government Subsidy Scheme'}</td>
                    <td>{app.submittedDate ? new Date(app.submittedDate).toLocaleDateString() : 'Today'}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: (app.eligibilityScore || 80) >= 60 ? '#34d399' : '#fb7185' }}>
                        {app.eligibilityScore || 80} / 100
                      </span>
                    </td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td>
                      <Link to="/track-status" className="btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                        Track
                      </Link>
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

export default BeneficiaryDashboard;
