import React from 'react';
import { FaFileSignature, FaUserCheck, FaTimesCircle, FaTasks } from 'react-icons/fa';
import '../styles/Dashboard.css';
import { utilizationReports } from '../data/utilizationReports';

// ---------------------------------------------------------
// Helper Components (Keeps the main component clean)
// ---------------------------------------------------------

function StatCard({ icon, title, value, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

function VerificationRow({ id, applicantName, schemeName, score, statusText, badgeClass }) {
  // Determine score color based on value
  let scoreClass = 'badge-warning';
  if (score >= 80) scoreClass = 'badge-success';
  else if (score < 50) scoreClass = 'badge-danger';

  return (
    <tr>
      <td>{id}</td>
      <td>{applicantName}</td>
      <td>{schemeName}</td>
      <td>
        <span className={`badge ${scoreClass}`}>{score}%</span>
      </td>
      <td><span className={`badge ${badgeClass}`}>{statusText}</span></td>
      <td><button className="btn btn-primary btn-sm">Verify Documents</button></td>
    </tr>
  );
}

function UtilizationReportRow({ report }) {
  return (
    <tr>
      <td>{report.applicationId}</td>
      <td>{report.beneficiaryName}</td>
      <td>{report.schemeName}</td>
      <td>₹{report.amountReceived}</td>
      <td>{report.purpose}</td>
      <td><a href="#" className="text-primary">View</a></td>
      <td><span className="badge badge-warning">{report.status}</span></td>
      <td>
        <button className="btn btn-primary btn-sm" style={{marginRight: '0.5rem'}}>View</button>
        <button className="btn btn-success btn-sm" style={{marginRight: '0.5rem'}}>Approve</button>
        <button className="btn btn-danger btn-sm" style={{marginRight: '0.5rem'}}>Reject</button>
        <button className="btn btn-secondary btn-sm">Req. Proof</button>
      </td>
    </tr>
  );
}

// ---------------------------------------------------------
// Main Dashboard Component
// ---------------------------------------------------------

const FieldOfficerDashboard = () => {
  return (
    <div className="dashboard animate-fade-in">
      
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Field Officer Dashboard</h2>
          <p>Review and verify applicant documents.</p>
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.href = '/'; }}
        >
          Log Out
        </button>
      </div>

      {/* Statistics Section */}
      <div className="stats-grid">
        <StatCard icon={<FaTasks />} title="Total Assigned" value="12" type="primary" />
        <StatCard icon={<FaFileSignature />} title="Pending Verification" value="5" type="warning" />
        <StatCard icon={<FaUserCheck />} title="Verified" value="6" type="success" />
        <StatCard icon={<FaTimesCircle />} title="Rejected" value="1" type="danger" />
      </div>

      <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>
        
        {/* Pending Verifications Table */}
        <div className="card recent-applications">
          <h3>Pending Verifications</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Applicant Name</th>
                <th>Scheme Name</th>
                <th>Eligibility Scoring</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <VerificationRow 
                id="APP-2024-045" 
                applicantName="Ramesh Kumar" 
                schemeName="Solar Panel Subsidy" 
                score={85}
                statusText="Verification Pending" 
                badgeClass="badge-warning" 
              />
              <VerificationRow 
                id="APP-2024-051" 
                applicantName="Sunita Devi" 
                schemeName="Education Grant" 
                score={45}
                statusText="Verification Pending" 
                badgeClass="badge-warning" 
              />
            </tbody>
          </table>
        </div>

        {/* Utilization Reports Table */}
        <div className="card recent-applications" style={{ marginTop: '2rem' }}>
          <h3>Utilization Reports</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Beneficiary Name</th>
                <th>Scheme Name</th>
                <th>Amount Received</th>
                <th>Purpose</th>
                <th>Uploaded Bills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {utilizationReports.map((report) => (
                <UtilizationReportRow key={report.id} report={report} />
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default FieldOfficerDashboard;
