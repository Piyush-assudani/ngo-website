import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaUsers, FaLightbulb, FaPaintBrush } from 'react-icons/fa';
import { HiOutlineHeart, HiOutlineGlobeAlt, HiOutlineBookOpen, HiOutlineLightBulb } from 'react-icons/hi';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div style={{ paddingTop: '100px', background: '#FAFCFF', minHeight: '100vh' }}>
      <SEO title="About Us" description="Learn about EnVision Foundation, our mission to educate underprivileged children, and our journey." url="/about" />

      {/* Hero Banner */}
      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto', paddingBottom: '2rem' }}>
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header">ABOUT US</div>
            <h1 className="section-heading">Creating Brighter Tomorrows, <span className="gold-text">Together</span></h1>
            <p className="about-desc" style={{ color: '#031533', fontWeight: '500', fontSize: '1.25rem' }}>
              EnVision Foundation is a youth-led organisation committed to making education more accessible and meaningful for children.
            </p>
            <p className="about-desc">
              We believe that every child deserves the opportunity to learn, grow, and dream—regardless of their background or circumstances. 
              Through education, awareness, and community-driven initiatives, we strive to create opportunities that empower young minds and open doors to a brighter future.
            </p>
          </motion.div>

          <motion.div
            style={{ position: 'relative' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=75&w=600"
              alt="Children smiling together"
              className="about-blob-img"
              loading="lazy"
              decoding="async"
            />
            <div className="floating-text-top" style={{ top: '-10px', right: '10%' }}>
              More Than <br /> Education
            </div>
            <div className="floating-card glass-card" style={{ bottom: '20px', left: '-30px', maxWidth: '280px' }}>
              <div className="floating-card-icon"><FaBookOpen /></div>
              <div className="floating-card-text">Empowering young minds with opportunities.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-mesh">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header center">OUR PILLARS</div>
          <h2 className="section-heading center">What Drives <span className="gold-text">Us Forward</span></h2>

          <div className="work-grid" style={{ marginTop: '3rem' }}>
            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: '#FDF3DF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#DE9E36', fontSize: '2rem' }}>
                  <HiOutlineGlobeAlt />
                </div>
                <h4 style={{ color: '#031533', fontSize: '1.3rem', marginBottom: '1rem' }}>Equality</h4>
                <p style={{ color: '#5A6A80', lineHeight: '1.6' }}>Ensuring fair opportunities for everyone, irrespective of their background.</p>
              </div>
            </motion.div>

            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: '#FDF3DF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#DE9E36', fontSize: '2rem' }}>
                  <HiOutlineBookOpen />
                </div>
                <h4 style={{ color: '#031533', fontSize: '1.3rem', marginBottom: '1rem' }}>Education</h4>
                <p style={{ color: '#5A6A80', lineHeight: '1.6' }}>Empowering minds through quality learning and skill development.</p>
              </div>
            </motion.div>

            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: '#FDF3DF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#DE9E36', fontSize: '2rem' }}>
                  <HiOutlineHeart />
                </div>
                <h4 style={{ color: '#031533', fontSize: '1.3rem', marginBottom: '1rem' }}>Wellbeing</h4>
                <p style={{ color: '#5A6A80', lineHeight: '1.6' }}>Nurturing physical and mental health for holistic growth.</p>
              </div>
            </motion.div>

            <motion.div className="work-card glass-card" whileHover={{ y: -10 }}>
              <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: '#FDF3DF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#DE9E36', fontSize: '2rem' }}>
                  <HiOutlineLightBulb />
                </div>
                <h4 style={{ color: '#031533', fontSize: '1.3rem', marginBottom: '1rem' }}>Awareness</h4>
                <p style={{ color: '#5A6A80', lineHeight: '1.6' }}>Creating conscious communities to drive sustainable change.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="section" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>
        <div className="section-header center">OUR TEAM</div>
        <h2 className="section-heading center">Meet the <span className="gold-text">Founders</span></h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '3rem' }}>
          
          <motion.div className="work-card glass-card" whileHover={{ y: -10 }} style={{ padding: '2.5rem 2rem', textAlign: 'center', maxWidth: '350px', width: '100%', borderRadius: '20px' }}>
            <img src="/founder-bhavya.webp" alt="Bhavya Yadav" width="140" height="140" loading="lazy" decoding="async" style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #FDF3DF', marginBottom: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
            <h3 style={{ color: '#031533', fontSize: '1.6rem', marginBottom: '0.2rem', fontFamily: 'Playfair Display, serif' }}>Bhavya Yadav</h3>
            <p style={{ color: '#DE9E36', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '1px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Co-Founder</p>
            <p style={{ color: '#5A6A80', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>Leading the vision to empower underprivileged children with education and holistic growth opportunities.</p>
            <div style={{ padding: '0.8rem', background: '#F8FAFC', borderRadius: '10px', color: '#031533', fontWeight: '600', fontSize: '0.95rem' }}>
              📞 +91 95993 01743
            </div>
          </motion.div>

          <motion.div className="work-card glass-card" whileHover={{ y: -10 }} style={{ padding: '2.5rem 2rem', textAlign: 'center', maxWidth: '350px', width: '100%', borderRadius: '20px' }}>
            <img src="/founder-anshika.webp" alt="Anshika Sharma" width="140" height="140" loading="lazy" decoding="async" style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #FDF3DF', marginBottom: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
            <h3 style={{ color: '#031533', fontSize: '1.6rem', marginBottom: '0.2rem', fontFamily: 'Playfair Display, serif' }}>Anshika Sharma</h3>
            <p style={{ color: '#DE9E36', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '1px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Co-Founder</p>
            <p style={{ color: '#5A6A80', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>Driving our mission forward with dedication, strategy, and a passion for sustainable social change.</p>
            <div style={{ padding: '0.8rem', background: '#F8FAFC', borderRadius: '10px', color: '#031533', fontWeight: '600', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span>📞 +91 92894 43439</span>
              <a href="mailto:envision.foundation.27@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>✉️ envision.foundation.27@gmail.com</a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Targets & Approaches + Philosophy */}
      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className="about-grid">
          <div style={{ position: 'relative' }}>
            <div style={{ background: '#F8FAFC', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#031533', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>Targets & Approaches</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#DE9E36', fontSize: '1.5rem' }}>•</span>
                  <p style={{ color: '#5A6A80', fontSize: '1.1rem', lineHeight: '1.6' }}>Connecting young volunteers with meaningful opportunities to contribute.</p>
                </li>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#DE9E36', fontSize: '1.5rem' }}>•</span>
                  <p style={{ color: '#5A6A80', fontSize: '1.1rem', lineHeight: '1.6' }}>Promoting awareness about the importance of education.</p>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#DE9E36', fontSize: '1.5rem' }}>•</span>
                  <p style={{ color: '#5A6A80', fontSize: '1.1rem', lineHeight: '1.6' }}>Making learning opportunities more accessible to children from less-privileged backgrounds.</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="section-header">OUR PHILOSOPHY</div>
            <h2 className="section-heading" style={{ fontSize: '2.4rem' }}>Education is not about a textbook's knowledge but about an individual's <span className="gold-text">overall well-being.</span></h2>
            <p className="about-desc">
              We often depict education as a privilege to urban homes, but we should also wonder about the impact of today's education on the mental health of students. Even today, when a student asks doubts or expresses that they are unable to understand a particular topic, they may be subjected to corporal punishment. They are taught not to ask question and to mug up the textbook.
            </p>
            <p className="about-desc">
              There are thousands of students who die by suicide every year, and academic pressure and examination-related issues can be among the factors contributing to student distress. Also, only educating about science and social sciences is not enough in today's world. We should teach students about AI, mental health, the LGBTQIA+ community, etc.
            </p>
            <p className="about-desc" style={{ fontStyle: 'italic', color: '#031533', fontWeight: 'bold' }}>
              In conclusion, "Educating the mind without educating the heart is no education at all." - Aristotle
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section" style={{ backgroundColor: '#FAFCFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header center">OUR TEAMS</div>
          <h2 className="section-heading center">Our mission comes to life through passionate <br/><span className="gold-text">young volunteers</span></h2>
          <p className="about-desc" style={{ textAlign: 'center', margin: '0 auto 3rem', maxWidth: '800px' }}>
            Working together across different teams to create a meaningful impact.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
            {[
              { icon: '✍🏻', title: 'Writing Team' },
              { icon: '📱', title: 'Social Media' },
              { icon: '💰', title: 'Fundraising' },
              { icon: '🌍', title: 'Outreach' },
              { icon: '🤝', title: 'HR' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="work-card glass-card"
                whileHover={{ y: -8 }}
                style={{ padding: '2.5rem 2rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ color: '#031533', fontSize: '1.2rem' }}>{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-heading">Ready to Make a <span className="gold-text">Difference?</span></h2>
        <p className="about-desc" style={{ margin: '0 auto 2.5rem', textAlign: 'center', maxWidth: '700px' }}>
          Join our community of passionate volunteers who are dedicated to creating real change. Every contribution, big or small, matters.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/apply" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Become a Volunteer &rarr;
          </Link>
          <a href="/#donate" className="btn-outline-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Make a Donation &rarr;
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
