import React, { useState } from 'react';
import { FaSearch, FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import { applicationsData } from '../data/applications';
import '../styles/TrackStatus.css';

// ---------------------------------------------------------
// Helper Components
// ---------------------------------------------------------

function TimelineStep({ status, stepText, dateText }) {
  
  // Decide which icon to show based on the status string
  let icon = null;
  if (status === 'completed') {
    icon = <FaCheck />;
  } else if (status === 'in-progress') {
    icon = <FaSpinner className="spin" />;
  } else if (status === 'rejected') {
    icon = <FaTimes />;
  }

  return (
    <div className={`timeline-step ${status}`}>
      <div className="timeline-icon">
        {icon}
      </div>
      <div className="timeline-content">
        <h5>{stepText}</h5>
        {/* Only show the date if it exists */}
        {dateText && <p className="timeline-date">{dateText}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Main Component
// ---------------------------------------------------------

const TrackStatus = () => {
  const [appId, setAppId] = useState('');
  const [application, setApplication] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (event) => {
    // Prevent the page from reloading
    event.preventDefault();
    
    // Ignore empty searches
    if (!appId.trim()) {
      return;
    }

    // Find the application in our dummy data array
    const foundApp = applicationsData.find(app => app.id.toLowerCase() === appId.toLowerCase());
    
    if (foundApp) {
      setApplication(foundApp);
      setErrorMessage('');
    } else {
      setApplication(null);
      setErrorMessage('No application found with the provided ID.');
    }
  };

  return (
    <div className="container track-container animate-fade-in">
      
      <div className="track-header">
        <h2>Track Application Status</h2>
        <p>Enter your Application ID to view the current status.</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="e.g. APP-2024-001" 
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            <FaSearch /> Track
          </button>
        </form>
        {errorMessage && <p className="error-text">{errorMessage}</p>}
      </div>

      {/* Only show the status card if we found an application */}
      {application && (
        <div className="status-card animate-fade-in">
          
          <div className="status-info">
            <h3>{application.schemeName}</h3>
            <p><strong>Applicant:</strong> {application.applicantName}</p>
            <p><strong>Date Applied:</strong> {application.dateApplied}</p>
            <p><strong>Current Status:</strong> <span className="highlight">{application.status}</span></p>
          </div>

          <div className="timeline-container">
            <h4>Application Timeline</h4>
            <div className="timeline">
              {/* Loop through each step in the application's timeline */}
              {application.timeline.map((item, index) => (
                <TimelineStep 
                  key={index}
                  status={item.status}
                  stepText={item.step}
                  dateText={item.date}
                />
              ))}
            </div>
          </div>
          
        </div>
      )}
      
    </div>
  );
};

export default TrackStatus;
