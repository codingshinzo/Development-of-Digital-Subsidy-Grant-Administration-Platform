import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle, FaShieldAlt, FaChartLine, FaUserCheck,
  FaFileInvoiceDollar, FaBuilding, FaArrowRight, FaTasks, FaCalculator
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* Hero Section */}
      <section className="hero-section glass-card" style={{ borderRadius: 'var(--radius-xl)', padding: '3.5rem 2rem', marginBottom: '3rem' }}>
        <span className="badge badge-submitted" style={{ marginBottom: '1rem', padding: '0.4rem 1rem' }}>
          <FaShieldAlt /> Government Direct Benefit Transfer Portal
        </span>
        <h1 className="hero-title">
          Transparent & Digitized Government Subsidy Tracking
        </h1>
        <p className="hero-subtitle">
          Empowering citizens with automated eligibility verification, multi-stage transparent officer approvals, and direct bank disbursement tracking.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/apply" className="btn-brand" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            Apply for Subsidy <FaArrowRight />
          </Link>
          <Link to="/track-status" className="btn-outline" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            Track Application Status
          </Link>
        </div>
      </section>

      {/* Live Impact Counter */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><FaFileInvoiceDollar /></div>
          <div className="stat-info">
            <h4>₹ 12,450 Cr+</h4>
            <p>Direct Grants Disbursed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon emerald"><FaUserCheck /></div>
          <div className="stat-info">
            <h4>4,85,000+</h4>
            <p>Beneficiaries Enrolled</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber"><FaTasks /></div>
          <div className="stat-info">
            <h4>98.4 %</h4>
            <p>Verification Accuracy</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple"><FaChartLine /></div>
          <div className="stat-info">
            <h4>3-Stage</h4>
            <p>Transparent Approval Chain</p>
          </div>
        </div>
      </div>

      {/* 4-Step Approval Lifecycle */}
      <section className="glass-card" style={{ padding: '2.5rem', margin: '3rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>How the Subsidy Workflow Operates</h2>
          <p style={{ color: 'var(--text-muted)' }}>From online application to direct bank account disbursement</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>
              1
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>1. Citizen Submission</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Fill online application form, select target scheme, and upload mandatory identity & income documents.</p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>
              <FaCalculator />
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>2. Automated Scoring</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>System computes an automated eligibility score out of 100 based on Income, Category, and Documents.</p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>
              3
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>3. 3-Officer Review</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Field Officer ground-check $\rightarrow$ District Officer scrutiny $\rightarrow$ Finance Officer final approval.</p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>
              4
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>4. Bank Disbursement</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Direct credit to beneficiary bank account with instant transaction reference tracking number.</p>
          </div>

        </div>
      </section>

      {/* Featured Schemes Grid */}
      <section style={{ margin: '3rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: '#fff' }}>Featured Government Welfare Schemes</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Check eligibility guidelines and apply online</p>
          </div>
          <Link to="/all-schemes" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            View All Schemes $\rightarrow$
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-submitted" style={{ marginBottom: '0.75rem' }}>Housing Welfare</span>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Pradhan Mantri Awas Yojana</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Financial housing assistance up to ₹2,50,000 for economically weaker sections & low income families.</p>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)' }}>
                <strong>Eligibility:</strong> Annual income $\le$ ₹3,00,000 / Category: General, OBC, SC, ST
              </div>
            </div>
            <Link to="/apply" className="btn-brand" style={{ width: '100%', justifyContent: 'center' }}>
              Apply Now
            </Link>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-approved" style={{ marginBottom: '0.75rem' }}>Agriculture</span>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>PM-KISAN Samman Nidhi</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Direct annual income support of ₹6,000 in three equal installments for land-holding farmer families.</p>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)' }}>
                <strong>Eligibility:</strong> Small & marginal farmers with valid land records.
              </div>
            </div>
            <Link to="/apply" className="btn-emerald" style={{ width: '100%', justifyContent: 'center' }}>
              Apply Now
            </Link>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-escalated" style={{ marginBottom: '0.75rem' }}>Education</span>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>National Higher Education Grant</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Merit-cum-means scholarship grant up to ₹50,000 annually for undergraduate & postgraduate students.</p>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)' }}>
                <strong>Eligibility:</strong> Students with family annual income below ₹2,50,000.
              </div>

            </div>
            <Link to="/apply" className="btn-brand" style={{ width: '100%', justifyContent: 'center' }}>
              Apply Now
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
