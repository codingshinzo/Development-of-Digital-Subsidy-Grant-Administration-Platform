import React from 'react';
import { FaUsers, FaClipboardList, FaMoneyCheckAlt, FaChartPie, FaFileAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
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

function ActivityRow({ activity, user, time }) {
  return (
    <tr>
      <td>{activity}</td>
      <td>{user}</td>
      <td>{time}</td>
    </tr>
  );
}

function UtilizationReportRow({ report }) {
  return (
    <tr>
      <td>{report.id}</td>
      <td>{report.applicationId}</td>
      <td>{report.beneficiaryName}</td>
      <td>{report.schemeName}</td>
      <td>₹{report.amountUtilized}</td>
      <td><span className="badge badge-warning">{report.status}</span></td>
      <td>{report.submittedDate}</td>
    </tr>
  );
}

// ---------------------------------------------------------
// Main Dashboard Component
// ---------------------------------------------------------

const AdminDashboard = () => {
  return (
    <div className="dashboard animate-fade-in">

      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Admin Dashboard</h2>
          <p>System overview and management.</p>
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
        <StatCard icon={<FaUsers />} title="Total Users" value="1,245" type="primary" />
        <StatCard icon={<FaClipboardList />} title="Active Schemes" value="12" type="success" />
        <StatCard icon={<FaMoneyCheckAlt />} title="Total Disbursed" value="₹4.2Cr" type="warning" />
        <StatCard icon={<FaChartPie />} title="Pending Apps" value="342" type="danger" />
      </div>

      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Utilization Reports Overview</h3>
      <div className="stats-grid">
        <StatCard icon={<FaFileAlt />} title="Total Reports" value={utilizationReports.length.toString()} type="primary" />
        <StatCard icon={<FaHourglassHalf />} title="Pending Verification" value="1" type="warning" />
        <StatCard icon={<FaCheckCircle />} title="Verified" value="1" type="success" />
        <StatCard icon={<FaTimesCircle />} title="Rejected" value="0" type="danger" />
      </div>

      <div className="dashboard-content-grid">

        {/* System Activities Table */}
        <div className="card recent-applications">
          <h3>System Activities</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <ActivityRow activity="New Scheme Created" user="Admin" time="10 mins ago" />
              <ActivityRow activity="Payment Batch Processed" user="Finance Officer" time="1 hour ago" />
              <ActivityRow activity="New Field Officer Registered" user="Admin" time="3 hours ago" />
            </tbody>
          </table>
        </div>

        {/* Utilization Reports Table */}
        <div className="card recent-applications" style={{ marginTop: '2rem' }}>
          <h3>All Utilization Reports</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>App ID</th>
                <th>Beneficiary Name</th>
                <th>Scheme Name</th>
                <th>Amount Utilized</th>
                <th>Status</th>
                <th>Submitted Date</th>
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

export default AdminDashboard;
