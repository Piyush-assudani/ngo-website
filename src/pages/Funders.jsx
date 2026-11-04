import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';

const Funders = () => {
  const [funders, setFunders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/shoutouts`)
      .then(res => setFunders(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: '100px', background: '#FAFCFF', minHeight: '100vh' }}>
      <SEO title="Our Funders" description="Celebrating the amazing people who support EnVision Foundation's mission." url="/funders" />

      <section className="section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-header center">OUR SUPPORTERS</div>
          <h1 className="section-heading center">Wall of <span className="gold-text">Gratitude</span></h1>
          <p className="about-desc" style={{ margin: '0 auto 2rem', textAlign: 'center', maxWidth: '700px' }}>
            To everyone who believes in our vision and generously contributes to our cause — thank you. You are making a real difference.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#5A6A80' }}>Loading funders...</div>
        ) : funders.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#5A6A80', padding: '3rem' }}>No shoutouts yet.</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {funders.map((f, i) => (
              <motion.div 
                key={f._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card"
                style={{ padding: '2rem', textAlign: 'center', borderRadius: '20px' }}
              >
                {f.image ? (
                  <img src={`https://envision.piyushassudani.in${f.image}`} alt={f.donorName} loading="lazy" decoding="async" width="100" height="100" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #DE9E36', margin: '0 auto 1.5rem', display: 'block' }} />
                ) : (
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#FDF3DF', color: '#DE9E36', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '3px solid #DE9E36', fontWeight: 'bold' }}>
                    {f.donorName.charAt(0)}
                  </div>
                )}
                <h3 style={{ color: '#031533', fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>{f.donorName}</h3>
                <p style={{ color: '#DE9E36', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>Supporter</p>
                {f.message && <p style={{ color: '#5A6A80', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>"{f.message}"</p>}
                
                <Link to={`/funders/${f.slug}`} className="btn-outline-dark" style={{ display: 'inline-block', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  View Shoutout
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Funders;
