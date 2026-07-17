import React from 'react';
import { FaFileAlt, FaCheckCircle, FaTimesCircle, FaBell } from 'react-icons/fa';
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

function ApplicationRow({ id, schemeName, date, statusText, badgeClass }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{schemeName}</td>
      <td>{date}</td>
      <td><span className={`badge ${badgeClass}`}>{statusText}</span></td>
      <td><button className="btn btn-secondary btn-sm">View</button></td>
    </tr>
  );
}

function NotificationItem({ message, time, isUnread }) {
  return (
    <li className={`notification-item ${isUnread ? 'unread' : ''}`}>
      <p dangerouslySetInnerHTML={{ __html: message }}></p>
      <span className="time">{time}</span>
    </li>
  );
}

// ---------------------------------------------------------
// Main Dashboard Component
// ---------------------------------------------------------

const BeneficiaryDashboard = () => {
  return (
    <div className="dashboard animate-fade-in">

      {/* Statistics Section */}
      <div className="stats-grid">
        <StatCard icon={<FaFileAlt />} title="Total Applications" value="3" type="primary" />
        <StatCard icon={<FaCheckCircle />} title="Pending" value="1" type="warning" />
        <StatCard icon={<FaCheckCircle />} title="Approved" value="2" type="success" />
        <StatCard icon={<FaTimesCircle />} title="Rejected" value="0" type="danger" />
      </div>

      <div className="dashboard-content-grid">

        {/* Recent Applications Table */}
        <div className="card recent-applications">
          <h3>My Applications</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Scheme Name</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <ApplicationRow
                id="APP-2024-001"
                schemeName="Solar Panel Subsidy"
                date="12 Oct 2024"
                statusText="Approved"
                badgeClass="badge-success"
              />
              <ApplicationRow
                id="APP-2024-045"
                schemeName="Education Grant"
                date="15 Nov 2024"
                statusText="Pending"
                badgeClass="badge-warning"
              />
            </tbody>
          </table>
        </div>

        {/* Notifications Sidebar */}
        <div className="card notifications">
          <h3><FaBell /> Notifications</h3>
          <ul className="notification-list">
            <NotificationItem
              message="Your <strong>Education Grant</strong> application is under review by District Officer."
              time="2 hours ago"
              isUnread={true}
            />
            <NotificationItem
              message="Fund disbursed for <strong>Solar Panel Subsidy</strong>."
              time="3 days ago"
              isUnread={false}
            />
            <NotificationItem
              message="New scheme 'Women Entrepreneurship' launched."
              time="1 week ago"
              isUnread={false}
            />
          </ul>
        </div>

      </div>
    </div>
  );
};

export default BeneficiaryDashboard;
