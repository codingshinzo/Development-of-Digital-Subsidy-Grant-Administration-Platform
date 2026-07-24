import React from 'react';
import { FaClipboardCheck, FaCheckDouble, FaTimesCircle, FaTasks } from 'react-icons/fa';
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

function ApprovalRow({ id, applicantName, schemeName, fieldOfficer }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{applicantName}</td>
      <td>{schemeName}</td>
      <td>{fieldOfficer}</td>
      <td>
        <button className="btn btn-primary btn-sm" style={{ marginRight: '0.5rem' }}>Review</button>
        <button className="btn btn-secondary btn-sm">Forward to Finance</button>
      </td>
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
      <td><span className="badge badge-primary">{report.status}</span></td>
      <td>
        <button className="btn btn-primary btn-sm">View Report</button>
      </td>
    </tr>
  );
}

// ---------------------------------------------------------
// Main Dashboard Component
// ---------------------------------------------------------

const DistrictOfficerDashboard = () => {
  return (
    <div className="dashboard animate-fade-in">

      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>District Officer Dashboard</h2>
          <p>Review and approve verified applications.</p>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.href = '/'; }}
        >
          Log Out
        </button>
      </div>

      {/* Statistics Section */}
      <div className="stats-grid">
        <StatCard icon={<FaTasks />} title="Pending Approvals" value="8" type="primary" />
        <StatCard icon={<FaCheckDouble />} title="Approved" value="24" type="success" />
        <StatCard icon={<FaClipboardCheck />} title="Sent Back" value="2" type="warning" />
        <StatCard icon={<FaTimesCircle />} title="Rejected" value="4" type="danger" />
      </div>

      <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>

        {/* Approvals Table */}
        <div className="card recent-applications">
          <h3>Applications Awaiting Approval</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Applicant Name</th>
                <th>Scheme Name</th>
                <th>Field Officer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <ApprovalRow
                id="APP-2024-032"
                applicantName="Priya Sharma"
                schemeName="Women Entrepreneurship"
                fieldOfficer="Amit Patel"
              />
            </tbody>
          </table>
        </div>

        {/* Utilization Reports Table */}
        <div className="card recent-applications" style={{ marginTop: '2rem' }}>
          <h3>Utilization Reports (Read-Only)</h3>
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

export default DistrictOfficerDashboard;
