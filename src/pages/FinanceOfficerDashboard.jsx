import React from 'react';
import { FaMoneyBillWave, FaFileInvoiceDollar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/Dashboard.css';


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
        <button className="btn btn-primary btn-sm" style={{ marginRight: '0.5rem' }}>Disburse</button>
        <button className="btn btn-secondary btn-sm">Reject</button>
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
          className="btn btn-danger"
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



      </div>
    </div>
  );
};

export default FinanceOfficerDashboard;
