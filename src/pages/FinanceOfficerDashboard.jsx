import React from 'react';
import { FaMoneyBillWave, FaFileInvoiceDollar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
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

function PaymentRow({ id, applicantName, bankDetails, amount }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{applicantName}</td>
      <td>{bankDetails}</td>
      <td>{amount}</td>
      <td>
        <button className="btn btn-primary btn-sm" style={{marginRight: '0.5rem'}}>Disburse</button>
        <button className="btn btn-secondary btn-sm">Reject</button>
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

const FinanceOfficerDashboard = () => {
  return (
    <div className="dashboard animate-fade-in">
      
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Finance Officer Dashboard</h2>
          <p>Manage payments and disburse funds.</p>
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
        <StatCard icon={<FaFileInvoiceDollar />} title="Payment Queue" value="15" type="primary" />
        <StatCard icon={<FaMoneyBillWave />} title="Disbursed Today" value="₹2.5L" type="success" />
        <StatCard icon={<FaCheckCircle />} title="Approved Payments" value="45" type="warning" />
        <StatCard icon={<FaTimesCircle />} title="Rejected Payments" value="1" type="danger" />
      </div>

      <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>
        
        {/* Payments Table */}
        <div className="card recent-applications">
          <h3>Payment Queue</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Applicant Name</th>
                <th>Bank Details</th>
                <th>Amount (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <PaymentRow 
                id="APP-2024-032" 
                applicantName="Priya Sharma" 
                bankDetails="SBI - xxxx1234" 
                amount="50,000" 
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

export default FinanceOfficerDashboard;
