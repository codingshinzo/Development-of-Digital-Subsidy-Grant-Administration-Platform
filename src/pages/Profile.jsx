import React from 'react';
import { FaUser, FaBuilding, FaMapMarkerAlt, FaFileAlt, FaIdBadge } from 'react-icons/fa';
import '../styles/Dashboard.css';

// ---------------------------------------------------------
// Helper Components (Keeps the main component clean)
// ---------------------------------------------------------

function ProfileDetailRow({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}

function DocumentRow({ documentName, statusText, badgeClass }) {
  return (
    <li className="notification-item">
      <p><strong>{documentName}</strong></p>
      <span className={`badge ${badgeClass}`}>{statusText}</span>
    </li>
  );
}

// ---------------------------------------------------------
// Main Profile Component
// ---------------------------------------------------------

const Profile = () => {
  const currentRole = localStorage.getItem('role') || 'Beneficiary';

  return (
    <div className="dashboard animate-fade-in">
      
      <div className="dashboard-header">
        <h2>My Profile</h2>
        <p>Manage your personal and account details.</p>
      </div>

      {currentRole === 'Field Officer' ? (
        // FIELD OFFICER PROFILE
        <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card">
            <h3>
              <FaUser style={{ color: 'var(--primary-color)', marginRight: '10px' }} /> 
              Officer Details
            </h3>
            <div className="profile-details" style={{ marginTop: '1rem' }}>
              <ProfileDetailRow label="Full Name" value="Robert Smith" />
              <ProfileDetailRow label="Email" value="r.smith@gov.in" />
              <ProfileDetailRow label="Phone" value="+91 9123456789" />
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Edit Details</button>
            </div>
          </div>

          <div className="card">
            <h3>
              <FaIdBadge style={{ color: 'var(--primary-color)', marginRight: '10px' }} /> 
              Employment Information
            </h3>
            <div className="profile-details" style={{ marginTop: '1rem' }}>
              <ProfileDetailRow label="Employee ID" value="EMP-FO-8472" />
              <ProfileDetailRow label="Assigned District" value="Hyderabad" />
              <ProfileDetailRow label="Department" value="Subsidies & Grants" />
              <ProfileDetailRow label="Role Level" value="Senior Field Verifier" />
            </div>
          </div>
        </div>
      ) : (
        // BENEFICIARY PROFILE (Default)
        <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          
          <div className="card">
            <h3>
              <FaUser style={{ color: 'var(--primary-color)', marginRight: '10px' }} /> 
              Personal Details
            </h3>
            <div className="profile-details" style={{ marginTop: '1rem' }}>
              <ProfileDetailRow label="Full Name" value="John Doe" />
              <ProfileDetailRow label="Email" value="john.doe@example.com" />
              <ProfileDetailRow label="Phone" value="+91 9876543210" />
              <ProfileDetailRow label="Aadhaar Number" value="XXXX-XXXX-1234" />
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Edit Details</button>
            </div>
          </div>

          <div className="card">
            <h3>
              <FaBuilding style={{ color: 'var(--primary-color)', marginRight: '10px' }} /> 
              Bank Details
            </h3>
            <div className="profile-details" style={{ marginTop: '1rem' }}>
              <ProfileDetailRow label="Bank Name" value="State Bank of India" />
              <ProfileDetailRow label="Account Name" value="John Doe" />
              <ProfileDetailRow label="Account Number" value="XXXXXX7890" />
              <ProfileDetailRow label="IFSC Code" value="SBIN0001234" />
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Update Bank</button>
            </div>
          </div>

          <div className="card">
            <h3>
              <FaMapMarkerAlt style={{ color: 'var(--primary-color)', marginRight: '10px' }} /> 
              Address Details
            </h3>
            <div className="profile-details" style={{ marginTop: '1rem' }}>
              <ProfileDetailRow label="Street" value="123 Main Street" />
              <ProfileDetailRow label="City" value="Hyderabad" />
              <ProfileDetailRow label="State" value="Telangana" />
              <ProfileDetailRow label="Pincode" value="500001" />
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Edit Address</button>
            </div>
          </div>

          <div className="card">
            <h3>
              <FaFileAlt style={{ color: 'var(--primary-color)', marginRight: '10px' }} /> 
              Uploaded Documents
            </h3>
            <ul className="notification-list" style={{ marginTop: '1rem' }}>
              <DocumentRow documentName="Aadhaar Card" statusText="Verified" badgeClass="badge-success" />
              <DocumentRow documentName="Income Certificate" statusText="Pending" badgeClass="badge-warning" />
            </ul>
            <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Upload New Document</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
