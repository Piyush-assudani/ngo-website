import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/SEO';
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await axios.post(`${API}/contact`, formData);
      setSuccessMsg('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', background: '#FAFCFF', minHeight: '100vh' }}>
      <SEO title="Contact Us" description="Get in touch with EnVision Foundation. We'd love to hear from you!" url="/contact" />

      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-header center">GET IN TOUCH</div>
          <h1 className="section-heading center">We'd Love to <span className="gold-text">Hear From You</span></h1>
          <p className="about-desc" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '700px' }}>
            Have a question, want to volunteer, or looking to partner with us? Reach out and we'll get back to you soon.
          </p>
        </div>

        <div className="about-grid" style={{ gap: '3rem' }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Contact <span className="gold-text">Information</span></h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="floating-card-icon" style={{ width: '55px', height: '55px' }}>
                  <HiOutlineMail style={{ fontSize: '1.5rem' }} />
                </div>
                <div>
                  <h4 style={{ color: '#031533', marginBottom: '0.3rem' }}>Email Us</h4>
                  <a href="mailto:envision.foundation.27@gmail.com" style={{ color: '#5A6A80', textDecoration: 'none' }}>envision.foundation.27@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="floating-card-icon" style={{ width: '55px', height: '55px' }}>
                  <HiOutlinePhone style={{ fontSize: '1.5rem' }} />
                </div>
                <div>
                  <h4 style={{ color: '#031533', marginBottom: '0.3rem' }}>Call Us</h4>
                  <a href="tel:+919599301743" style={{ color: '#5A6A80', textDecoration: 'none' }}>+91 95993 01743</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="floating-card-icon" style={{ width: '55px', height: '55px' }}>
                  <FaInstagram style={{ fontSize: '1.5rem' }} />
                </div>
                <div>
                  <h4 style={{ color: '#031533', marginBottom: '0.3rem' }}>Instagram</h4>
                  <a 
                    href="https://www.instagram.com/envisionfoundation_ngo?psln=MWw4bmRtYXR6cTFlZQ==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#DE9E36', textDecoration: 'none', fontWeight: '500' }}
                  >
                    @envisionfoundation_ngo
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="floating-card-icon" style={{ width: '55px', height: '55px' }}>
                  <HiOutlineLocationMarker style={{ fontSize: '1.5rem' }} />
                </div>
                <div>
                  <h4 style={{ color: '#031533', marginBottom: '0.3rem' }}>Location</h4>
                  <p style={{ color: '#5A6A80' }}>New Delhi, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            }}
          >
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: '#031533', marginBottom: '2rem' }}>Send us a Message</h3>
            {successMsg && <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '1rem' }}>{successMsg}</div>}
            {errorMsg && <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>{errorMsg}</div>}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#031533', fontSize: '0.95rem' }}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '10px', border: '1px solid #E2E8F0', fontFamily: 'Inter, sans-serif', fontSize: '1rem', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#DE9E36'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#031533', fontSize: '0.95rem' }}>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '10px', border: '1px solid #E2E8F0', fontFamily: 'Inter, sans-serif', fontSize: '1rem', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#DE9E36'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#031533', fontSize: '0.95rem' }}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '10px', border: '1px solid #E2E8F0', fontFamily: 'Inter, sans-serif', fontSize: '1rem', resize: 'vertical', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#DE9E36'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                ></textarea>
              </div>
              <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '1.1rem', borderRadius: '10px', fontSize: '1.1rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending...' : 'Send Message \u2192'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
