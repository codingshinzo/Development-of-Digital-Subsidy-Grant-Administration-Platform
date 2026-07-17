import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaMapMarkedAlt, FaSearchDollar } from 'react-icons/fa';
import { schemesData } from '../data/schemes';

const Home = () => {
  const navigate = useNavigate();

  // Get the first 3 active schemes for the "Latest Schemes" section
  const latestSchemes = schemesData.filter(s => s.status === 'Active').slice(0, 3);

  return (
    <div className="home-container animate-fade-in" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* --------------------------------------------
          Hero Section 
          -------------------------------------------- */}
      <section className="hero-section" style={{ 
        textAlign: 'center', 
        padding: '6rem 1.5rem', 
        background: 'linear-gradient(135deg, var(--primary-color) 0%, #1e293b 100%)', 
        color: 'white' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
            Government Subsidy & Grant Disbursement
          </h1>
          <p style={{ fontSize: '1.25rem', margin: '0 auto', lineHeight: '1.6', opacity: '0.9', fontWeight: '300' }}>
            A secure, transparent, and efficient platform for accessing government schemes and managing your applications.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/all-schemes" className="btn btn-secondary" style={{ backgroundColor: 'white', color: 'var(--primary-color)', padding: '0.875rem 1.75rem', fontSize: '1.05rem', fontWeight: '500', borderRadius: '6px', border: 'none' }}>
              Explore Schemes
            </Link>
            <Link to="/login" className="btn btn-primary" style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '0.875rem 1.75rem', fontSize: '1.05rem', fontWeight: '500', background: 'transparent', borderRadius: '6px' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------
          Statistics Section
          -------------------------------------------- */}
      <section className="statistics-section container" style={{ padding: '4rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="dashboard-content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: '700' }}>45+</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>Active Schemes</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: '700' }}>1.2M+</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>Beneficiaries</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: '700' }}>₹500Cr+</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>Funds Disbursed</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: '700' }}>28</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>States Covered</p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------
          Latest Schemes (3 Cards)
          -------------------------------------------- */}
      <section className="latest-schemes-section container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--text-dark)' }}>Latest Schemes</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.1rem' }}>Discover new opportunities for support and growth.</p>
        </div>
        
        <div className="dashboard-content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {latestSchemes.map(scheme => (
            <div key={scheme.id} className="card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', borderRadius: '12px' }}>
              <span className="category-badge" style={{ alignSelf: 'flex-start', marginBottom: '1.5rem', fontSize: '0.8rem', padding: '0.4rem 1rem', backgroundColor: 'rgba(0,123,255,0.08)', color: 'var(--primary-color)', borderRadius: '30px', fontWeight: '600' }}>
                {scheme.category}
              </span>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-dark)' }}>{scheme.name}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', flexGrow: 1, lineHeight: '1.7' }}>
                {scheme.description}
              </p>
              <button 
                className="btn btn-secondary btn-block"
                style={{ backgroundColor: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', fontWeight: '600', padding: '0.75rem' }}
                onClick={() => {
                  if (!localStorage.getItem('isAuthenticated')) {
                    alert("Please login first to apply for a scheme.");
                  } else {
                    navigate(`/apply?schemeId=${scheme.id}`);
                  }
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------
          Why Choose This Portal
          -------------------------------------------- */}
      <section id="about" className="why-choose-us-section" style={{ padding: '5rem 1.5rem', backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--text-dark)' }}>Why Choose This Portal</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.1rem' }}>A modern approach to government services.</p>
          </div>
          
          <div className="dashboard-content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3.5rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '72px', height: '72px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,123,255,0.1)', borderRadius: '50%', color: 'var(--primary-color)' }}>
                <FaSearchDollar style={{ fontSize: '2rem' }} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-dark)' }}>Transparent</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Clear visibility into grant amounts, eligibility, and fund disbursement processes.
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '72px', height: '72px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(40,167,69,0.1)', borderRadius: '50%', color: 'var(--success-color)' }}>
                <FaShieldAlt style={{ fontSize: '2rem' }} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-dark)' }}>Secure</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Your data and documents are protected with industry-standard security protocols.
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '72px', height: '72px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,193,7,0.1)', borderRadius: '50%', color: 'var(--warning-color)' }}>
                <FaMapMarkedAlt style={{ fontSize: '2rem' }} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-dark)' }}>Easy Tracking</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Real-time application status tracking with clear, step-by-step timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
