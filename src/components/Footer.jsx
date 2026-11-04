import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        
        {/* Brand Section */}
        <div>
          <img src="/favicon.webp" alt="EnVision Logo" width="120" height="120" loading="lazy" decoding="async" style={{ width: '120px', borderRadius: '50%', marginBottom: '1rem', border: '1px solid #E2E8F0' }} />
          <p className="footer-desc">
            EnVision Foundation is a non-profit initiative dedicated to educating, empowering, and nurturing the hidden creativity of underprivileged children.
          </p>
          <div className="social-icons">
            <a href="https://www.instagram.com/envisionfoundation_ngo?psln=MWw4bmRtYXR6cTFlZQ==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Follow us on Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/impact" className="footer-link">Our Work</Link>
            <Link to="/apply" className="footer-link">Get Involved</Link>
            <Link to="/gallery" className="footer-link">Gallery</Link>
            <Link to="/magazines" className="footer-link">Magazines</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>

        {/* Our Work */}
        <div>
          <h3 className="footer-heading">Our Work</h3>
          <div className="footer-links">
            <Link to="#" className="footer-link">Education Support</Link>
            <Link to="#" className="footer-link">Creative Learning</Link>
            <Link to="#" className="footer-link">Skill Development</Link>
            <Link to="#" className="footer-link">Community Outreach</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="footer-heading">Contact Us</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="footer-contact-item">
              <HiOutlineLocationMarker className="footer-contact-icon" style={{ fontSize: '1.2rem' }} />
              <span>New Delhi,<br/>India</span>
            </div>
            <div className="footer-contact-item">
              <HiOutlineMail className="footer-contact-icon" style={{ fontSize: '1.2rem' }} />
              <a href="mailto:envision.foundation.27@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>envision.foundation.27@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <HiOutlinePhone className="footer-contact-icon" style={{ fontSize: '1.2rem' }} />
              <span>+91 95993 01743</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2026 EnVision Foundation. All rights reserved.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ height: '1px', width: '40px', backgroundColor: '#8892A0' }}></div>
          <span className="footer-brand">Learning Beyond Books</span>
          <div style={{ height: '1px', width: '40px', backgroundColor: '#8892A0' }}></div>
        </div>
        <div className="footer-credit">
          <p style={{ margin: 0 }}>Designed and developed by Piyush Assudani,</p>
          <p style={{ margin: 0 }}>Founder Assudani Developer | Contact: 9413879444</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
