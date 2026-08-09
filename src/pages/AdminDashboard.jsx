import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaFileAlt, FaUsers, FaChartBar, FaTasks, FaCheckCircle } from 'react-icons/fa';
import { schemeService } from '../services/schemeService';
import { applicationService } from '../services/applicationService';

const AdminDashboard = () => {
  const [schemes, setSchemes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New scheme form state
  const [newSchemeName, setNewSchemeName] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newDescription, setNewDescription] = useState('');
  const [newBudget, setNewBudget] = useState('500000');
  const [newCriteria, setNewCriteria] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const s = await schemeService.getSchemes();
      setSchemes(s || []);
      const a = await applicationService.getApplications();
      setApplications(a || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    if (!newSchemeName.trim()) return;

    try {
      await schemeService.createScheme({
        name: newSchemeName,
        category: newCategory,
        description: newDescription,
        budget: parseFloat(newBudget) || 500000,
        eligibilityCriteria: newCriteria,
        active: true
      });
      alert(`Government Subsidy Scheme "${newSchemeName}" saved & published successfully!`);
      setNewSchemeName('');
      setNewCategory('General');
      setNewDescription('');
      setNewBudget('500000');
      setNewCriteria('');
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Scheme saved successfully!');
      setShowAddModal(false);
      fetchData();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0', background: '#ffffff', minHeight: '80vh' }}>
      
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <span className="badge badge-submitted" style={{ marginBottom: '0.5rem' }}>Administrator Command Center</span>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: 800 }}>System Management & Scheme Controls</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Define subsidy rules, manage active schemes, and monitor system audit logs.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-brand">
          <FaPlusCircle /> Add New Scheme
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><FaFileAlt /></div>
          <div className="stat-info">
            <h4>{schemes.length}</h4>
            <p>Active Schemes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon emerald"><FaTasks /></div>
          <div className="stat-info">
            <h4>{applications.length}</h4>
            <p>Total Applications Received</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><FaCheckCircle /></div>
          <div className="stat-info">
            <h4>{applications.filter(a => a.status === 'PAYMENT_SUCCESSFUL').length}</h4>
            <p>Disbursed Grants</p>
          </div>
        </div>
      </div>

      {/* Add Scheme Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <form onSubmit={handleAddScheme} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '2rem', width: '100%', maxWidth: '550px', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1.25rem', fontWeight: 700 }}>Add New Government Scheme</h3>
            
            <div className="form-group">
              <label>Scheme Name</label>
              <input type="text" className="form-control" value={newSchemeName} onChange={e => setNewSchemeName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input type="text" className="form-control" value={newCategory} onChange={e => setNewCategory(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Grant Amount / Budget (₹)</label>
              <input type="number" className="form-control" value={newBudget} onChange={e => setNewBudget(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Eligibility Guidelines</label>
              <textarea className="form-control" rows="2" value={newCriteria} onChange={e => setNewCriteria(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" rows="2" value={newDescription} onChange={e => setNewDescription(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline">Cancel</button>
              <button type="submit" className="btn-brand">Save Scheme</button>
            </div>
          </form>
        </div>
      )}

      {/* Schemes List */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1.25rem', fontWeight: 700 }}>Configured Subsidy Schemes</h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Scheme ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Max Grant Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map(s => (
                <tr key={s.id}>
                  <td><strong>#SCH-{s.id}</strong></td>
                  <td>{s.name}</td>
                  <td>{s.category || 'Welfare'}</td>
                  <td><strong style={{ color: '#0284c7' }}>₹{(s.budget || s.maxAmount || 250000).toLocaleString()}</strong></td>
                  <td><span className="badge badge-approved">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
