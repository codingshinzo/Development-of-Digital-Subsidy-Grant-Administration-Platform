import React, { useState } from 'react';
import { FaUser, FaBuilding, FaMapMarkerAlt, FaFileAlt, FaIdBadge, FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../styles/Dashboard.css';
import { beneficiaryService } from '../services/beneficiaryService';

function ProfileDetailRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
      <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{value}</span>
    </div>
  );
}

const Profile = () => {
  const currentRole = localStorage.getItem('role') || 'Beneficiary';

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editEmail, setEditEmail] = useState(currentRole === 'Field Officer' ? 'r.smith@gov.in' : 'john.doe@example.com');
  const [editPhone, setEditPhone] = useState(currentRole === 'Field Officer' ? '+91 9123456789' : '+91 9876543210');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!editEmail) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editEmail)) {
      newErrors.email = "Invalid email format";
    }

    if (!editPhone) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await beneficiaryService.updateProfile({ email: editEmail, phone: editPhone });
        if (response.success) {
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Update failed", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="dashboard animate-fade-in" style={{ padding: '2rem' }}>

      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2>My Profile</h2>
        <p>Manage your personal and account details</p>
      </div>

      <div className="dashboard-content-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>

        {/* Left Column - Generic User Info */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <FaUserCircle style={{ fontSize: '6rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{currentRole === 'Field Officer' ? 'Robert Smith' : 'John Doe'}</h3>
          <span className="badge badge-primary" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem' }}>{currentRole}</span>

          <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left' }}>
            {isEditing ? (
              <form onSubmit={handleProfileSubmit}>
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.85rem' }}>Email</label>
                  <input style={{ width: '100%', padding: '0.5rem' }} value={editEmail} onChange={(e) => { setEditEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }} />
                  {errors.email && <span style={{ color: 'var(--danger-color)', fontSize: '0.8rem' }}>{errors.email}</span>}
                </div>
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.85rem' }}>Phone</label>
                  <input style={{ width: '100%', padding: '0.5rem' }} value={editPhone} onChange={(e) => { setEditPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: '' }); }} />
                  {errors.phone && <span style={{ color: 'var(--danger-color)', fontSize: '0.8rem' }}>{errors.phone}</span>}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" className="btn btn-secondary btn-block" onClick={() => { setIsEditing(false); setErrors({}); }}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  <FaEnvelope style={{ marginRight: '10px' }} />
                  <span>{editEmail}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  <FaPhone style={{ marginRight: '10px' }} />
                  <span>{editPhone}</span>
                </div>
                <button className="btn btn-secondary btn-block" style={{ marginTop: '2rem' }} onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Role Specific Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {currentRole === 'Field Officer' ? (
            <div className="card" style={{ padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                <FaIdBadge style={{ marginRight: '10px' }} /> Employment Information
              </h3>
              <ProfileDetailRow label="Employee ID" value="EMP-FO-8472" />
              <ProfileDetailRow label="Assigned District" value="Hyderabad" />
              <ProfileDetailRow label="Department" value="Subsidies & Grants" />
              <ProfileDetailRow label="Role Level" value="Senior Field Verifier" />
            </div>
          ) : currentRole === 'Beneficiary' ? (
            <>
              <div className="card" style={{ padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                  <FaUser style={{ marginRight: '10px' }} /> Personal Details
                </h3>
                <ProfileDetailRow label="Aadhaar Number" value="XXXX-XXXX-1234" />
                <ProfileDetailRow label="Gender" value="Male" />
                <ProfileDetailRow label="Date of Birth" value="12 May 1985" />
              </div>

              <div className="card" style={{ padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                  <FaBuilding style={{ marginRight: '10px' }} /> Bank Details
                </h3>
                <ProfileDetailRow label="Bank Name" value="State Bank of India" />
                <ProfileDetailRow label="Account Name" value="John Doe" />
                <ProfileDetailRow label="Account Number" value="XXXXXX7890" />
                <ProfileDetailRow label="IFSC Code" value="SBIN0001234" />
                <button className="btn btn-secondary btn-sm" style={{ marginTop: '1.5rem' }}>Update Bank Settings</button>
              </div>

              <div className="card" style={{ padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                  <FaMapMarkerAlt style={{ marginRight: '10px' }} /> Address
                </h3>
                <ProfileDetailRow label="Address Line 1" value="123 Main Street, Apt 4B" />
                <ProfileDetailRow label="City & State" value="Hyderabad, Telangana" />
                <ProfileDetailRow label="Pincode" value="500001" />
              </div>
            </>
          ) : (
            <div className="card" style={{ padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                <FaIdBadge style={{ marginRight: '10px' }} /> Admin / Officer Information
              </h3>
              <ProfileDetailRow label="System ID" value={`SYS-${currentRole.toUpperCase()}-001`} />
              <ProfileDetailRow label="Access Level" value="Full Dashboard Access" />
              <ProfileDetailRow label="Department" value="State Administration" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
