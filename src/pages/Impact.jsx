import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaUsers, FaLightbulb, FaPaintBrush, FaQuoteLeft } from 'react-icons/fa';
import { HiOutlineHeart, HiOutlineLightBulb, HiHeart } from 'react-icons/hi';
import SEO from '../components/SEO';

const Impact = () => {
  const stats = [
    { label: 'CHILDREN IMPACTED', value: '500+', icon: <FaUsers /> },
    { label: 'LEARNING INITIATIVES', value: '20+', icon: <FaBookOpen /> },
    { label: 'SUPPORTERS & DONORS', value: '100+', icon: <HiOutlineHeart /> },
    { label: 'CITIES REACHED', value: '5+', icon: <HiOutlineLightBulb /> },
  ];

  return (
    <div style={{ paddingTop: '100px', background: '#FAFCFF', minHeight: '100vh' }}>
      <SEO title="Our Work" description="Discover the impact EnVision Foundation has made in educating and empowering underprivileged children." url="/impact" />

      {/* Hero */}
      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto', textAlign: 'center' }}>
        <div className="section-header center">OUR WORK</div>
        <h1 className="section-heading center">Initiatives That Create <span className="gold-text">Real Change</span></h1>
        <p className="about-desc" style={{ margin: '0 auto 3rem', textAlign: 'center', maxWidth: '800px' }}>
          Through education, creativity, and community support, we work towards giving every child the opportunity to discover their potential and build a brighter future.
        </p>
      </section>

      {/* Stats */}
      <section className="section bg-mesh" style={{ padding: '4rem 5%', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}
            >
              <div style={{ fontSize: '2rem', color: '#DE9E36', marginBottom: '1rem' }}>{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Cards */}
      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto' }}>
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
      </section>

      {/* Success Stories */}
      <section className="section" style={{ backgroundColor: '#FAFCFF', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div className="section-header">SUCCESS STORIES</div>
          <h2 className="section-heading" style={{ marginBottom: '3rem' }}>Making a Real <span className="gold-text">Impact</span></h2>

          <div className="impact-grid">
            <div className="impact-card glass-card">
              <img src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=75&w=500" className="impact-card-img" alt="Read & Lead" loading="lazy" decoding="async" />
              <div className="impact-card-content">
                <span className="impact-badge">Education</span>
                <h4>Project Read & Lead</h4>
                <p>"We successfully established mini-libraries in different areas, providing continuous access to reading materials to over 500 children."</p>
                <span className="student-name">— EnVision Team</span>
              </div>
            </div>
            <div className="impact-card glass-card">
              <img src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=75&w=500" className="impact-card-img" alt="Art Expression" loading="lazy" decoding="async" />
              <div className="impact-card-content">
                <span className="impact-badge">Creative Learning</span>
                <h4>Annual Art Expression</h4>
                <p>"Over 200 children participated in our weekend art therapy and expression workshops, nurturing their hidden creativity."</p>
                <span className="student-name">— Volunteer Team</span>
              </div>
            </div>
            <div className="impact-card glass-card">
              <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=75&w=500" className="impact-card-img" alt="Community Drive" loading="lazy" decoding="async" />
              <div className="impact-card-content">
                <span className="impact-badge">Community</span>
                <h4>Community Learning Drive</h4>
                <p>"Our weekend learning drives brought education directly to underserved communities, reaching families who need it most."</p>
                <span className="student-name">— Field Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-heading">Be a Part of This <span className="gold-text">Journey</span></h2>
        <p className="about-desc" style={{ margin: '0 auto 2.5rem', textAlign: 'center', maxWidth: '700px' }}>
          Your support can help us reach more children and create lasting impact. Join us as a volunteer or make a donation today.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/apply" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Get Involved &rarr;
          </Link>
          <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-donation', { detail: { amount: 1000 } })); }} className="btn-outline-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <HiHeart /> Donate Now &rarr;
          </a>
        </div>
      </section>
    </div>
  );
};

export default Impact;
