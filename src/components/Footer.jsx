import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Government Subsidy System</h3>
          <p>Empowering citizens through transparent and efficient grant disbursement.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/schemes">All Schemes</a></li>
            <li><a href="/track-status">Track Application</a></li>
            <li><a href="#">Guidelines</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@govsubsidy.dummy</p>
          <p>Toll Free: 1800-123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Government Subsidy & Grant Disbursement System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
