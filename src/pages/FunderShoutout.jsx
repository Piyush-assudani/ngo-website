import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { FaShareAlt, FaHeart } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';

const FunderShoutout = () => {
  const { slug } = useParams();
  const [funder, setFunder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/shoutouts/${slug}`)
      .then(res => setFunder(res.data))
      .catch(err => setError('Shoutout not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Shoutout to ${funder.donorName}`,
        text: `Check out this amazing contribution to EnVision Foundation by ${funder.donorName}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Loading...</div>;
  if (error || !funder) return <div style={{ paddingTop: '150px', textAlign: 'center' }}><h2>Not Found</h2><Link to="/funders">Back to Funders</Link></div>;

  return (
    <div style={{ paddingTop: '120px', background: '#FAFCFF', minHeight: '100vh', paddingBottom: '4rem' }}>
      <SEO title={`Thank You ${funder.donorName} | EnVision Foundation`} description={`A huge thank you to ${funder.donorName} for supporting our cause.`} />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{ padding: '3rem', textAlign: 'center', borderRadius: '30px', background: 'linear-gradient(145deg, #ffffff, #F8FAFC)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
        >
          <div style={{ color: '#DE9E36', fontSize: '2rem', marginBottom: '1rem' }}><FaHeart /></div>
          
          <div style={{ marginBottom: '2rem' }}>
            {funder.image ? (
              <img src={`https://envision.piyushassudani.in${funder.image}`} alt={funder.donorName} loading="lazy" decoding="async" width="150" height="150" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '5px solid #FDF3DF', margin: '0 auto', display: 'block', boxShadow: '0 10px 20px rgba(222, 158, 54, 0.2)' }} />
            ) : (
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: '#FDF3DF', color: '#DE9E36', fontSize: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: '5px solid #fff', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(222, 158, 54, 0.2)' }}>
                {funder.donorName.charAt(0)}
              </div>
            )}
          </div>

          <h2 style={{ color: '#031533', fontSize: '2.2rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>{funder.donorName}</h2>
          <p style={{ color: '#DE9E36', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2rem' }}>Generous Supporter</p>
          
          {funder.message && (
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', fontStyle: 'italic', color: '#5A6A80', fontSize: '1.1rem', lineHeight: '1.6', position: 'relative', border: '1px solid #E2E8F0', marginBottom: '2rem' }}>
              <span style={{ position: 'absolute', top: '-15px', left: '20px', fontSize: '2rem', color: '#DE9E36', background: '#fff', padding: '0 10px' }}>"</span>
              {funder.message}
              <span style={{ position: 'absolute', bottom: '-25px', right: '20px', fontSize: '2rem', color: '#DE9E36', background: '#fff', padding: '0 10px' }}>"</span>
            </div>
          )}

          <p style={{ color: '#5A6A80', marginBottom: '2rem' }}>
            Thank you for being a part of our journey to create brighter tomorrows. 
            Your support empowers us to educate and uplift underprivileged children.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/funders" className="btn-outline-dark" style={{ padding: '0.8rem 1.5rem', borderRadius: '50px' }}>View All Funders</Link>
            <button onClick={handleShare} className="btn-gold" style={{ padding: '0.8rem 1.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaShareAlt /> Share
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FunderShoutout;
