import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';

const DonationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [intentId, setIntentId] = useState(null);
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    amount: '1000',
    address: '',
    city: '',
    state: '',
    utrNumber: ''
  });
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = (e) => {
      if (e.detail && e.detail.amount) {
        setFormData(prev => ({ ...prev, amount: e.detail.amount }));
      }
      setIsOpen(true);
      setStep(1);
    };
    window.addEventListener('open-donation', handleOpen);
    if (window.location.pathname === '/donate') {
      setIsOpen(true);
      setStep(1);
    }
    return () => window.removeEventListener('open-donation', handleOpen);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    try {
      if (step === 1) {
        if (!intentId) {
          const res = await axios.post(`${API}/donations/intent`, { ...formData, status: 'initiated' });
          setIntentId(res.data.donation._id);
        } else {
          await axios.put(`${API}/donations/intent/${intentId}`, { ...formData, status: 'partial' });
        }
      }
      setStep(step + 1);
    } catch (err) {
      console.error(err);
      setStep(step + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 2) {
      handleNext();
      return;
    }
    
    // Step 3 (Final Submit)
    try {
      setIsSubmitting(true);
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append('status', 'pending');
      if (screenshot) data.append('screenshot', screenshot);

      if (intentId) {
        await axios.put(`${API}/donations/intent/${intentId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axios.post(`${API}/donations/intent`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setStep(4); // success screen
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setIntentId(null);
      setFormData({
        donorName: '', email: '', phone: '', amount: '1000', address: '', city: '', state: '', utrNumber: ''
      });
      setScreenshot(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              background: 'white', borderRadius: '20px', width: '90%', maxWidth: '500px',
              padding: '2.5rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <button onClick={close} style={{
              position: 'absolute', top: '15px', right: '20px', background: 'transparent',
              border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666'
            }}>×</button>

            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1.8rem', color: '#031533', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>
                  Make a <span style={{ color: '#DE9E36' }}>Donation</span>
                </h3>
                <p style={{ color: '#5A6A80', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  Please provide your basic details. We save this securely to contact you if needed.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" name="donorName" placeholder="Full Name" value={formData.donorName} onChange={handleChange} className="form-control" required />
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="form-control" required />
                  <input type="tel" name="phone" placeholder="Phone Number (10 digits)" pattern="[0-9]{10}" title="Must be a 10 digit number" value={formData.phone} onChange={handleChange} className="form-control" required maxLength="10" />
                  <input type="number" name="amount" placeholder="Amount (INR)" min="100" value={formData.amount} onChange={handleChange} className="form-control" required />
                  <button type="submit" disabled={isSubmitting} className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Saving...' : 'Next step →'}
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.8rem', color: '#031533', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>
                  Billing <span style={{ color: '#DE9E36' }}>Details</span>
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-control" required />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="form-control" required style={{ flex: 1 }} />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="form-control" required style={{ flex: 1 }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setStep(1)} className="btn-outline-dark" style={{ flex: 1, padding: '0.8rem' }}>Back</button>
                    <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center', padding: '0.8rem' }}>Proceed to Payment</button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.8rem', color: '#031533', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>
                  Complete <span style={{ color: '#DE9E36' }}>Payment</span>
                </h3>
                <p style={{ color: '#5A6A80', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  Amount to pay: <strong>₹{formData.amount}</strong>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem', gap: '0.4rem' }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`upi://pay?pa=8076581299@ptyes&pn=EnVision&am=${formData.amount}`)}`} 
                    alt="UPI QR Code" 
                    decoding="async"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/upi-qr.webp'; }}
                    style={{ border: '2px solid #DE9E36', borderRadius: '10px', padding: '8px', background: 'white', width: '160px', height: '160px', objectFit: 'contain' }} 
                  />
                  <p style={{ margin: '0.3rem 0 0 0', color: '#031533', fontSize: '0.9rem', fontWeight: '600' }}>
                    UPI ID: <span style={{ color: '#DE9E36', fontFamily: 'monospace', userSelect: 'all', background: '#FDF3DF', padding: '2px 6px', borderRadius: '4px' }}>8076581299@ptyes</span>
                  </p>
                  <a 
                    href={`upi://pay?pa=8076581299@ptyes&pn=EnVision&am=${formData.amount}`}
                    style={{ color: '#DE9E36', fontSize: '0.8rem', textDecoration: 'underline', fontWeight: '600' }}
                  >
                    Tap to Pay via UPI App (₹{formData.amount})
                  </a>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" name="utrNumber" placeholder="Enter UTR / Transaction ID *" value={formData.utrNumber} onChange={handleChange} className="form-control" required />
                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#5A6A80', marginBottom: '0.5rem', display: 'block' }}>Upload Payment Screenshot *</label>
                    <input type="file" accept="image/*" onChange={(e) => setScreenshot(e.target.files[0])} className="form-control" required style={{ padding: '0.5rem' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setStep(2)} className="btn-outline-dark" style={{ flex: 1, padding: '0.8rem' }} disabled={isSubmitting}>Back</button>
                    <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center', padding: '0.8rem', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
                      {isSubmitting ? 'Uploading...' : 'Submit Proof'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 4 && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', color: '#10B981', marginBottom: '1rem' }}>♥</div>
                <h3 style={{ fontSize: '1.8rem', color: '#031533', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Thank You!</h3>
                <p style={{ color: '#5A6A80', marginBottom: '2rem', lineHeight: '1.6' }}>Thank you for your generous donation! Your payment details have been submitted. <br/><br/><strong>Once your payment is approved, we will share your Certificate of Appreciation directly to your mobile number ASAP.</strong></p>
                <button onClick={close} className="btn-outline-dark">Close</button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
