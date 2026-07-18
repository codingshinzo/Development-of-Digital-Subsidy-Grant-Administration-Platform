import React, { useState } from 'react';
import '../styles/UtilizationReport.css';

const UtilizationReport = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    amountUtilized: '',
    utilizationDate: '',
    billFile: null,
    photoFile: null,
    remarks: '',
    declaration: false
  });

  const [submitted, setSubmitted] = useState(false);

  // Hardcoded details for demonstration as requested
  const applicationDetails = {
    applicationId: "APP-2024-123",
    schemeName: "Agriculture Equipment Subsidy",
    amountSanctioned: 75000,
    amountReceived: 75000,
    disbursementDate: "2024-07-01",
    currentStatus: "Fund Disbursed"
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.declaration) {
      // Logic to save to localStorage or dummy data would go here
      setSubmitted(true);
    } else {
      alert("Please accept the declaration before submitting.");
    }
  };

  if (applicationDetails.currentStatus !== "Fund Disbursed") {
    return (
      <div className="utilization-container">
        <h2>Access Denied</h2>
        <p>You can only submit a utilization report after the subsidy amount has been disbursed.</p>
      </div>
    );
  }

  return (
    <div className="utilization-container animate-fade-in">
      <div className="utilization-header">
        <h2>Submit Utilization Report</h2>
        <p>Provide details on how the disbursed subsidy amount was used.</p>
      </div>

      {submitted ? (
        <div className="card success-message">
          <h3>Utilization Report Submitted Successfully</h3>
          <p>Status: <span className="badge badge-warning">Pending Field Officer Verification</span></p>
        </div>
      ) : (
        <div className="utilization-content">
          <div className="card application-details-card">
            <h3>Application Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Application ID:</span>
                <span className="detail-value">{applicationDetails.applicationId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Scheme Name:</span>
                <span className="detail-value">{applicationDetails.schemeName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Amount Sanctioned:</span>
                <span className="detail-value">₹{applicationDetails.amountSanctioned}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Amount Received:</span>
                <span className="detail-value">₹{applicationDetails.amountReceived}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Disbursement Date:</span>
                <span className="detail-value">{applicationDetails.disbursementDate}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Status:</span>
                <span className="detail-value badge badge-success">{applicationDetails.currentStatus}</span>
              </div>
            </div>
          </div>

          <form className="card utilization-form" onSubmit={handleSubmit}>
            <h3>Utilization Details</h3>
            
            <div className="form-group">
              <label>Purpose of Utilization *</label>
              <textarea 
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                placeholder="Explain how the funds were used..."
              ></textarea>
            </div>

            <div className="form-group">
              <label>Amount Utilized (₹) *</label>
              <input 
                type="number"
                name="amountUtilized"
                value={formData.amountUtilized}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Date of Utilization *</label>
              <input 
                type="date"
                name="utilizationDate"
                value={formData.utilizationDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Bills/Invoices *</label>
              <input 
                type="file"
                name="billFile"
                onChange={handleChange}
                required
              />
              <small>Upload a PDF or Image file showing the proof of purchase.</small>
            </div>

            <div className="form-group">
              <label>Upload Photos *</label>
              <input 
                type="file"
                name="photoFile"
                onChange={handleChange}
                required
              />
              <small>Upload photos of equipment, setup, or related work.</small>
            </div>

            <div className="form-group">
              <label>Additional Remarks</label>
              <textarea 
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Any additional information you want to provide..."
              ></textarea>
            </div>

            <div className="form-group checkbox-group">
              <input 
                type="checkbox"
                id="declaration"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
                required
              />
              <label htmlFor="declaration">I hereby declare that the information provided is true and accurate.</label>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">Submit Report</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UtilizationReport;
