import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFileInvoiceDollar, FaCheckCircle } from 'react-icons/fa';
import { schemeService } from '../services/schemeService';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const data = await schemeService.getSchemes();
      setSchemes(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = schemes.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#fff' }}>Government Subsidy Schemes Directory</h2>
        <p style={{ color: 'var(--text-muted)' }}>Explore active government subsidy & grant schemes and check eligibility criteria.</p>
      </div>

      <div style={{ maxWidth: '550px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search schemes by keyword or category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
          <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {filtered.map(scheme => (
          <div key={scheme.id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-submitted">{scheme.category || 'Welfare'}</span>
                <strong style={{ color: '#34d399', fontSize: '1.1rem' }}>₹{(scheme.budget || scheme.maxAmount || 250000).toLocaleString()}</strong>
              </div>
              
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>{scheme.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{scheme.description}</p>
              
              <div style={{ padding: '0.85rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                <strong>Eligibility:</strong> {scheme.eligibilityCriteria || 'Income below ₹3,00,000 / Valid Aadhaar'}
              </div>
            </div>

            <Link to="/apply" className="btn-brand" style={{ width: '100%', justifyContent: 'center' }}>
              Apply for Scheme
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Schemes;
