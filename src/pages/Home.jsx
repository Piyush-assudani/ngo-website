import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiOutlineLightBulb, HiOutlineHeart, HiHeart, HiOutlineUsers, HiOutlineHome } from 'react-icons/hi';
import { FaBookOpen, FaPaintBrush, FaLightbulb, FaUsers, FaGraduationCap, FaQuoteLeft, FaCheck, FaTimes } from 'react-icons/fa';
import SEO from '../components/SEO';
import DonationSection from '../components/DonationSection';
import MagazineSection from '../components/MagazineSection';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', review: '', rating: 5, role: 'Supporter' });

  useEffect(() => {
    axios.get(`${API}/website/public-reviews`)
      .then(res => {
        if (res.data.reviews) {
          setReviews(res.data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/website/reviews`, reviewForm, { timeout: 10000 });
      
      // Instantly update the UI with the new review!
      if (response.data && response.data.review) {
        setReviews(prev => [response.data.review, ...prev].slice(0, 10)); // Keep max 10 reviews
      }

      setIsReviewModalOpen(false);
      setIsSuccessModalOpen(true);
      setReviewForm({ name: '', review: '', rating: 5, role: 'Supporter' });
    } catch (err) {
      alert('Failed to submit review. The server might be unreachable right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SEO title="Home" url="/" />
      {/* ── EXACT DESIGN HERO SECTION ── */}
      <section className="hero">
        <div className="hero-grid">
          
          {/* Left Column */}
          <div className="hero-left">
            <motion.div 
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              EDUCATE &bull; EMPOWER &bull; NURTURE &bull; CREATE
            </motion.div>
            
            <motion.h1 
              className="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Learning <br />
              <span className="gold-text">Beyond</span> Books
            </motion.h1>
            
            <motion.p 
              className="hero-desc"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              At <strong>EnVision Foundation</strong>, we believe every child has hidden potential. 
              We go beyond classrooms to educate, empower, and nurture the creativity of underprivileged children.
            </motion.p>
            
            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a href="#donate" className="btn-gold">
                <HiHeart /> Make a Donation &rarr;
              </a>
              <Link to="/about" className="btn-outline-dark">
                Know More
              </Link>
            </motion.div>
            
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <div className="stat-item">
                <h3>500+</h3>
                <p>CHILDREN IMPACTED</p>
              </div>
              <div className="stat-item">
                <h3>20+</h3>
                <p>LEARNING INITIATIVES</p>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <p>SUPPORTERS & DONORS</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Blob & Floating elements) */}
          <div className="hero-right">
            <motion.div 
              className="floating-text-top"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              Brighter Tomorrows ✈️
            </motion.div>

            <motion.img 
              src="/hero-child.webp" 
              alt="Happy smiling child learning" 
              className="hero-blob"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="450"
              height="450"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
            />

            <motion.div 
              className="floating-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="floating-card-icon">
                <FaBookOpen />
              </div>
              <div className="floating-card-text">
                Because every child's creativity deserves a chance.
              </div>
            </motion.div>

            <motion.div 
              className="hero-bottom-script"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              People &bull; Ideas &bull; Opportunities &bull; Brighter Tomorrows
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── EXACT DESIGN ABOUT SECTION ── */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="about-grid">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-header">ABOUT US</div>
            <h2 className="section-heading">Creating Brighter Tomorrows, <span className="gold-text">Together</span></h2>
            <p className="about-desc">
              EnVision Foundation is a non-profit initiative dedicated to educating, empowering, and nurturing the hidden creativity of underprivileged children. We believe learning goes far beyond textbooks — it's about exposure, opportunities, and the confidence to dream.
            </p>
            <Link to="/about" className="btn-outline-dark" style={{ display: 'inline-block' }}>
              Know More About Us &rarr;
            </Link>
          </motion.div>

          <motion.div 
            style={{ position: 'relative' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=75&w=600" 
              alt="Children smiling together" 
              className="about-blob-img" 
              loading="lazy"
              decoding="async"
            />
            <div className="floating-text-top" style={{ top: '-10px', right: '10%' }}>
              More Than <br/> Education
            </div>
            <div className="floating-card glass-card" style={{ bottom: '20px', left: '-30px', maxWidth: '280px' }}>
              <div className="floating-card-icon"><FaBookOpen /></div>
              <div className="floating-card-text">Empowering young minds with opportunities.</div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* ── EXACT DESIGN STATS BANNER ── */}
      <section className="section bg-mesh" style={{ padding: '4rem 5%', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div className="stat-item" style={{ borderRight: '1px solid #E2E8F0' }}>
            <FaUsers style={{ fontSize: '2rem', color: '#DE9E36', marginBottom: '1rem' }} />
            <h3>500+</h3>
            <p>CHILDREN IMPACTED</p>
          </div>
          <div className="stat-item" style={{ borderRight: '1px solid #E2E8F0' }}>
            <FaGraduationCap style={{ fontSize: '2rem', color: '#DE9E36', marginBottom: '1rem' }} />
            <h3>20+</h3>
            <p>LEARNING INITIATIVES</p>
          </div>
          <div className="stat-item" style={{ borderRight: '1px solid #E2E8F0' }}>
            <HiOutlineHeart style={{ fontSize: '2rem', color: '#DE9E36', marginBottom: '1rem' }} />
            <h3>100+</h3>
            <p>SUPPORTERS & DONORS</p>
          </div>
          <div className="stat-item">
            <HiOutlineLightBulb style={{ fontSize: '2rem', color: '#DE9E36', marginBottom: '1rem' }} />
            <h3>A Brighter</h3>
            <p>TOMORROW</p>
          </div>
        </div>
      </section>

      {/* ── EXACT DESIGN OUR WORK SECTION ── */}
      <section className="section" style={{ backgroundColor: '#FDF3DF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header center">OUR WORK</div>
          <h2 className="section-heading center">Initiatives That Create <span className="gold-text">Real Change</span></h2>
          <p className="about-desc" style={{ margin: '0 auto 4rem', textAlign: 'center', maxWidth: '800px' }}>
            Through education, creativity, and community support, we work towards giving every child the opportunity to discover their potential and build a brighter future.
          </p>

          <div className="work-grid">
            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=75&w=500" alt="Education" className="work-card-img" loading="lazy" decoding="async" />
              <div className="work-card-content">
                <div className="work-card-icon"><FaBookOpen /></div>
                <h4>Education Support</h4>
                <p>Providing access to quality learning resources for underprivileged children.</p>
              </div>
            </motion.div>

            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <img src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=75&w=500" alt="Creative Learning" className="work-card-img" loading="lazy" decoding="async" />
              <div className="work-card-content">
                <div className="work-card-icon"><FaPaintBrush /></div>
                <h4>Creative Learning</h4>
                <p>Encouraging art, music, and creativity beyond traditional academics.</p>
              </div>
            </motion.div>

            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=75&w=500" alt="Skill Development" className="work-card-img" loading="lazy" decoding="async" />
              <div className="work-card-content">
                <div className="work-card-icon"><FaLightbulb /></div>
                <h4>Skill Development</h4>
                <p>Building real-world skills to help children become confident and independent.</p>
              </div>
            </motion.div>

            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=75&w=500" alt="Community Outreach" className="work-card-img" loading="lazy" decoding="async" />
              <div className="work-card-content">
                <div className="work-card-icon"><FaUsers /></div>
                <h4>Community Outreach</h4>
                <p>Working with communities to create lasting and meaningful impact.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── EXACT DESIGN MAKE A DIFFERENCE (ss4) ── */}
      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className="support-section glass-card">
          <div className="about-grid" style={{ gap: '2rem' }}>
            
            <div>
              <div className="section-header">MAKE A DIFFERENCE</div>
              <h2 className="section-heading" style={{ fontSize: '3rem' }}>Be a Part of Their <br/><span className="gold-text">Brighter</span> Future</h2>
              <p className="about-desc">
                Your support helps us educate, empower, and nurture the hidden creativity of underprivileged children. Together, we can give them the opportunities they deserve.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-donation', { detail: { amount: 1000 } })); }} className="btn-gold" style={{ display: 'inline-flex' }}>
                  <HiHeart /> Donate Now &rarr;
                </a>
                <Link to="/apply" className="btn-outline-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Get Involved &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── EXACT DESIGN IMPACT STORIES ── */}
      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className="section-header">IMPACT STORIES</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: '1rem' }}>Real Stories.<br/><span className="gold-text">Brighter</span> Futures.</h2>
            <p className="about-desc" style={{ marginBottom: 0 }}>
              Every child has a story, and with the right support, that story can be extraordinary. Here are a few glimpses of the change we are creating together.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-outline-dark" style={{ padding: '0.5rem 1rem', borderRadius: '50%' }}>&lt;</button>
            <button className="btn-gold" style={{ padding: '0.5rem 1rem', borderRadius: '50%' }}>&gt;</button>
          </div>
        </div>

        <div className="impact-grid">
          <div className="impact-card glass-card">
            <img src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=75&w=500" className="impact-card-img" alt="Education" loading="lazy" decoding="async" />
            <div className="impact-card-content">
              <span className="impact-badge">Education</span>
              <h4>A New Love for Learning</h4>
              <p>"With the support from EnVision, I got access to books and learning resources I never had before. Now I enjoy studying and dream of becoming a teacher."</p>
              <span className="student-name">— Student, Balotra</span>
            </div>
          </div>
          <div className="impact-card glass-card">
            <img src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=75&w=500" className="impact-card-img" alt="Creative Learning" loading="lazy" decoding="async" />
            <div className="impact-card-content">
              <span className="impact-badge">Creative Learning</span>
              <h4>Discovering Hidden Talents</h4>
              <p>"Through art and activity sessions, I discovered my interest in drawing. EnVision gave me the platform and confidence to explore my creativity."</p>
              <span className="student-name">— Student, Balotra</span>
            </div>
          </div>
          <div className="impact-card glass-card">
            <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=75&w=500" className="impact-card-img" alt="Community Support" loading="lazy" decoding="async" />
            <div className="impact-card-content">
              <span className="impact-badge">Community Support</span>
              <h4>A Brighter Tomorrow</h4>
              <p>"The guidance and support from EnVision has helped me grow, not just in studies, but also in confidence and life skills."</p>
              <span className="student-name">— Student, Balotra</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXACT DESIGN WHY IT MATTERS ── */}
      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto', paddingBottom: '2rem' }}>
        <div className="about-grid">
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=75&w=600" 
              alt="Kids walking together" 
              className="about-blob-img"
              loading="lazy"
              decoding="async"
              style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
            />
            <div className="floating-text-top" style={{ top: '20px', left: '-30px', transform: 'rotate(-5deg)', fontSize: '2.5rem', lineHeight: '1' }}>
              Stronger<br/>Communities<br/>Happier<br/>Children
            </div>
          </div>
          <div>
            <div className="section-header">WHY IT MATTERS</div>
            <h2 className="section-heading" style={{ fontSize: '2.8rem' }}>Together We Build <br/><span className="gold-text">Stronger</span> Communities</h2>
            <p className="about-desc">
              When we educate, empower, and nurture children, we don't just change individual lives — we create stronger families, healthier communities, and a brighter society for generations to come.
            </p>
            
            <div className="matters-features">
              <div className="matter-item">
                <div className="matter-icon"><HiOutlineUsers /></div>
                <div>
                  <h5>Empowered Children</h5>
                  <p>More confident and independent individuals.</p>
                </div>
              </div>
              <div className="matter-item">
                <div className="matter-icon"><HiOutlineHome /></div>
                <div>
                  <h5>Stronger Communities</h5>
                  <p>Creating lasting social impact.</p>
                </div>
              </div>
              <div className="matter-item">
                <div className="matter-icon"><HiOutlineHeart /></div>
                <div>
                  <h5>Brighter Futures</h5>
                  <p>A more equal and opportunity-rich tomorrow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXACT DESIGN TESTIMONIALS ── */}
      <section className="section bg-mesh" style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div className="section-header">WHAT PEOPLE SAY</div>
          <div className="testimonials-header">
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Voices of <span className="gold-text">Support</span><br/>
              <span style={{ fontSize: '1.2rem', fontFamily: 'Inter, sans-serif', fontWeight: '400', color: '#5A6A80', display: 'block', marginTop: '1rem', maxWidth: '600px' }}>
                We are grateful to our donors, volunteers, and well-wishers who believe in our vision and support our mission.
              </span>
            </h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-outline-dark" style={{ padding: '0.5rem 1rem', borderRadius: '50%' }}>&lt;</button>
              <button className="btn-gold" style={{ padding: '0.5rem 1rem', borderRadius: '50%' }}>&gt;</button>
              <button onClick={() => setIsReviewModalOpen(true)} className="btn-outline-dark" style={{ marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                Leave a Review
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {reviews.length > 0 ? reviews.map((r) => (
              <div className="testimonial-card glass-card" key={r._id}>
                <FaQuoteLeft className="quote-icon" />
                <p>"{r.review}"</p>
                <span className="testimonial-author">— {r.name || r.role || 'Supporter'}</span>
              </div>
            )) : (
              <p style={{ color: '#5A6A80', fontStyle: 'italic', gridColumn: '1 / -1', textAlign: 'center' }}>
                Be the first to share your thoughts and support for EnVision Foundation!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── ENVISION MAGAZINE & PUBLICATIONS SECTION ── */}
      <MagazineSection />

      {/* ── EXACT DESIGN QUOTE ── */}
      <section className="quote-section">
        <FaQuoteLeft style={{ fontSize: '4rem', color: '#DE9E36', opacity: '0.5', marginBottom: '2rem' }} />
        <h2 className="big-quote">"The best way to find yourself is to lose yourself in the service of others."</h2>
        <span className="quote-author">Mahatma Gandhi</span>
      </section>

      {/* ── EXACT DESIGN JOIN JOURNEY ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="journey-card">
          <img 
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=75&w=600" 
            alt="Smiling boy" 
            loading="lazy"
            decoding="async"
            style={{ width: '100%', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', objectFit: 'cover', aspectRatio: '4/3' }}
          />
          <div>
            <div className="section-header">STAY CONNECTED</div>
            <h2 className="section-heading" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Join Our Journey</h2>
            <p className="about-desc" style={{ marginBottom: '1rem' }}>
              Get updates about our initiatives, stories, and upcoming events.
            </p>
            <form className="subscribe-form">
              <input type="email" placeholder="Enter your email address" className="subscribe-input" required />
              <button type="submit" className="btn-gold" style={{ borderRadius: '8px', padding: '1rem 2rem' }}>Subscribe &rarr;</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── DONATE SECTION ── */}
      <DonationSection />

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '15px', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsReviewModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <FaTimes color="#5A6A80" />
            </button>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#031533' }}>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
                <input type="text" required value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} className="form-control" placeholder="Your name" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Role</label>
                <select value={reviewForm.role} onChange={e => setReviewForm({...reviewForm, role: e.target.value})} className="form-control">
                  <option value="Supporter">Supporter</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Donor">Donor</option>
                  <option value="Parent">Parent</option>
                  <option value="Student">Student</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Review</label>
                <textarea required value={reviewForm.review} onChange={e => setReviewForm({...reviewForm, review: e.target.value})} className="form-control" placeholder="Share your experience..." rows="4"></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="btn-outline-dark" style={{ flex: 1, padding: '0.8rem', justifyContent: 'center' }} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ flex: 1, padding: '0.8rem', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '20px', width: '90%', maxWidth: '450px', textAlign: 'center', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <button onClick={() => setIsSuccessModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <FaTimes color="#5A6A80" />
            </button>
            <div style={{ margin: '0 auto 1.5rem', position: 'relative', display: 'inline-block' }}>
              {/* Confetti decoration using pseudo-elements/spans */}
              <div style={{ width: '80px', height: '80px', background: '#DE9E36', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(222, 158, 54, 0.4)' }}>
                <FaCheck style={{ color: 'white', fontSize: '2.5rem' }} />
              </div>
              {/* Simple CSS shapes for confetti */}
              <div style={{ position: 'absolute', top: '-10px', left: '-20px', width: '10px', height: '10px', background: '#DE9E36', borderRadius: '50%', opacity: 0.8 }}></div>
              <div style={{ position: 'absolute', bottom: '10px', right: '-30px', width: '15px', height: '15px', background: '#DE9E36', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', opacity: 0.6, transform: 'rotate(45deg)' }}></div>
              <div style={{ position: 'absolute', top: '20px', right: '-20px', width: '6px', height: '15px', background: '#DE9E36', borderRadius: '10px', transform: 'rotate(30deg)', opacity: 0.7 }}></div>
              <div style={{ position: 'absolute', bottom: '-15px', left: '10px', width: '8px', height: '8px', background: '#DE9E36', transform: 'rotate(15deg)', opacity: 0.9 }}></div>
            </div>
            
            <h2 style={{ fontSize: '2.2rem', color: '#031533', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>Congratulations!</h2>
            <h4 style={{ fontSize: '1.1rem', color: '#3A4A60', fontWeight: '600', marginBottom: '1rem' }}>Thank you for sharing your feedback.</h4>
            <p style={{ color: '#5A6A80', lineHeight: '1.6', marginBottom: '2rem' }}>
              Your review helps us grow and inspires<br/>more people to support our mission.
            </p>
            
            <button onClick={() => setIsSuccessModalOpen(false)} className="btn-gold" style={{ display: 'inline-flex', width: '80%', padding: '1rem', justifyContent: 'center', fontSize: '1.1rem', borderRadius: '10px' }}>
              Back to Reviews &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
