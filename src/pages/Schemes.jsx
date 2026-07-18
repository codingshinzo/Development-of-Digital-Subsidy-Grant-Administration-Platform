import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaMoneyBillWave } from 'react-icons/fa';
import { schemesData } from '../data/schemes';
import '../styles/Schemes.css';

// ---------------------------------------------------------
// Helper Components
// ---------------------------------------------------------

function SchemeCard({ scheme, onApply, onViewDetails }) {
  const isActive = scheme.status === 'Active';
  
  return (
    <div className="scheme-card animate-fade-in">
      <div className="scheme-card-header">
        <span className="category-badge">{scheme.category}</span>
        <span className={`status-badge ${isActive ? 'active' : 'closed'}`}>
          {scheme.status}
        </span>
      </div>
      
      <h3 className="scheme-title">{scheme.name}</h3>
      <p className="scheme-desc">{scheme.description}</p>
      
      <div className="scheme-details">
        <div className="detail-item">
          <FaMoneyBillWave className="detail-icon" />
          <div>
            <strong>Grant Amount</strong>
            <p>{scheme.amount}</p>
          </div>
        </div>
      </div>

      <div className="scheme-footer">
        <button 
          className="btn btn-secondary btn-block"
          onClick={() => onViewDetails(scheme.eligibility)}
        >
          View Details
        </button>
        <button 
          className="btn btn-primary btn-block"
          disabled={!isActive}
          onClick={() => onApply(scheme.id)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Main Schemes Component
// ---------------------------------------------------------

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const navigate = useNavigate();

  // Get unique categories for the dropdown
  const categories = ['All', ...new Set(schemesData.map(s => s.category))];

  // Filter schemes based on search text and selected category
  const filteredSchemes = schemesData.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || scheme.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleApply = (schemeId) => {
    if (!localStorage.getItem('isAuthenticated')) {
      alert("Please login first to apply for a scheme.");
    } else {
      navigate(`/apply?schemeId=${schemeId}`);
    }
  };

  const handleViewDetails = (eligibilityInfo) => {
    alert(`Eligibility:\n${eligibilityInfo}`);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 140px)' }}>
      
      <div className="schemes-header animate-fade-in">
        <h2>Government Schemes & Subsidies</h2>
        <p>Explore and apply for various government grants and subsidies available for you.</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="schemes-controls animate-fade-in">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search schemes by name or keywords..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <FaFilter className="filter-icon" />
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Schemes Grid */}
      <div className="schemes-grid">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map(scheme => (
            <SchemeCard 
              key={scheme.id} 
              scheme={scheme} 
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No schemes found matching your criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Schemes;
