import React from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
import { motion } from 'framer-motion';

const DonationSection = () => {
  return (
    <section className="section bg-light" id="donate" style={{ backgroundColor: '#F8F9FA' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Make an Impact Today</h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Your contribution directly empowers underprivileged children with the resources they need to learn, grow, and succeed.
            <br />
            <strong>You can start by donating a minimum of ₹100.</strong>
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            padding: '3rem',
            maxWidth: '500px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ fontSize: '1.2rem', color: '#031533', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Scan to Donate</h4>
            <img 
              src="/upi-qr.webp" 
              alt="UPI QR Code - 8076581299@ptyes" 
              loading="lazy"
              decoding="async"
              width="210"
              height="210"
              onError={(e) => { e.target.onerror = null; e.target.src = '/upi-qr.png'; }}
              style={{ width: '210px', height: '210px', objectFit: 'contain', border: '4px solid #DE9E36', borderRadius: '15px', padding: '12px', background: 'white', boxShadow: '0 4px 15px rgba(222, 158, 54, 0.15)' }} 
            />
            <p style={{ marginTop: '1rem', color: '#031533', fontWeight: '600', fontSize: '1rem', marginBottom: '0.3rem' }}>
              UPI ID: <span style={{ color: '#DE9E36', fontFamily: 'monospace', fontSize: '1.05rem', userSelect: 'all', background: '#FDF3DF', padding: '2px 8px', borderRadius: '6px' }}>8076581299@ptyes</span>
            </p>
            <a 
              href="upi://pay?pa=8076581299@ptyes&pn=EnVision" 
              style={{ color: '#DE9E36', fontSize: '0.85rem', textDecoration: 'underline', fontWeight: '600', marginTop: '4px' }}
            >
              Tap to Pay directly via UPI App
            </a>
          </div>

          <p style={{ color: '#8892A0', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            After making your payment, please click below to submit your details and payment screenshot so we can acknowledge your contribution!
          </p>

          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-donation', { detail: { amount: 100 } }))}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '50px',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <HiOutlineHeart style={{ fontSize: '1.4rem' }} /> DONATE NOW
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default DonationSection;
