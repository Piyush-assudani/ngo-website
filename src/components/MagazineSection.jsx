import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  HiOutlineBookOpen,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineX,
} from 'react-icons/hi';
import { FaBookOpen, FaFilePdf } from 'react-icons/fa';
import FlipBookModal from './FlipBookModal';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';

const MagazineSection = () => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMag, setSelectedMag] = useState(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const res = await axios.get(`${API}/magazines/public`);
      if (res.data?.magazines) {
        setMagazines(res.data.magazines);
      }
    } catch (err) {
      console.warn('Failed to fetch public magazines:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const base = API.replace('/api', '');
    return `${base}${path}`;
  };

  const handleDownload = async (mag) => {
    try {
      await axios.get(`${API}/magazines/${mag._id}/download`);
      // Update local download count
      setMagazines((prev) =>
        prev.map((m) => (m._id === mag._id ? { ...m, downloadCount: (m.downloadCount || 0) + 1 } : m))
      );
    } catch (e) {
      // Ignore error for download count
    }
    const pdfUrl = getFullUrl(mag.pdfUrl);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.download = `${mag.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenReader = (mag) => {
    setSelectedMag(mag);
  };

  const featuredMag = magazines.find((m) => m.featured) || magazines[0];
  const otherMagazines = magazines.filter((m) => m._id !== featuredMag?._id).slice(0, 3);

  return (
    <section className="section" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-header center" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <HiOutlineSparkles style={{ color: '#DE9E36' }} /> OUR PUBLICATIONS & STORIES
          </div>
          <h2 className="section-heading center" style={{ fontSize: '2.6rem', marginTop: '0.5rem' }}>
            The En<span className="gold-text">Vision</span> Magazine
          </h2>
          <p className="about-desc" style={{ margin: '0.8rem auto 0', textAlign: 'center', maxWidth: '720px', color: '#5A6A80', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Inspiring poetry, real stories of transformation, student creativity, and grassroots milestones — captured in every edition of our official publication.
          </p>
        </div>

        {/* Content Showcase */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: '#5A6A80' }}>Loading publications...</p>
          </div>
        ) : magazines.length === 0 ? (
          /* Placeholder / Coming Soon Teaser if admin hasn't uploaded any magazine yet */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              maxWidth: '750px',
              margin: '0 auto',
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(222, 158, 54, 0.12)',
                color: '#DE9E36',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2.4rem',
              }}
            >
              <FaBookOpen />
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#031533', marginBottom: '0.8rem', fontFamily: 'Playfair Display, serif' }}>
              EnVision Chronicle &bull; Volume 1 Coming Soon!
            </h3>
            <p style={{ color: '#5A6A80', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 2rem' }}>
              We are assembling a special collection of stories written by underprivileged children, volunteers, and ground changemakers. Check back shortly or explore our gallery!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/gallery" className="btn-outline-dark" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>
                View Our Gallery
              </Link>
              <Link to="/contact" className="btn-gold" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>
                Contribute an Article &rarr;
              </Link>
            </div>
          </motion.div>
        ) : (
          <div>
            {/* Featured Hero Card */}
            {featuredMag && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 20px 50px rgba(3, 21, 51, 0.08)',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  marginBottom: otherMagazines.length > 0 ? '3rem' : '1.5rem',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    alignItems: 'center',
                    gap: '2.5rem',
                    padding: '2.5rem',
                  }}
                >
                  {/* Magazine Cover Preview Container */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '260px',
                        maxWidth: '100%',
                        borderRadius: '14px',
                        boxShadow: '0 25px 40px -15px rgba(3, 21, 51, 0.35), 0 0 0 1px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                        cursor: 'pointer',
                        aspectRatio: '3 / 4',
                      }}
                      onClick={() => handleOpenReader(featuredMag)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(222, 158, 54, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 25px 40px -15px rgba(3, 21, 51, 0.35)';
                      }}
                      title="Click to read online"
                    >
                      <img
                        src={getFullUrl(featuredMag.coverImage)}
                        alt={featuredMag.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(3, 21, 51, 0.7) 0%, transparent 60%)',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '1.2rem',
                          color: 'white',
                        }}
                      >
                        <span
                          style={{
                            background: '#DE9E36',
                            color: '#031533',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: '50px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                          }}
                        >
                          Click to Read
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Magazine Info */}
                  <div>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: 'rgba(222, 158, 54, 0.15)',
                          color: '#B27615',
                          padding: '5px 14px',
                          borderRadius: '50px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          letterSpacing: '0.5px',
                        }}
                      >
                        ★ FEATURED EDITION
                      </span>
                      {featuredMag.edition && (
                        <span
                          style={{
                            background: '#EEF2F6',
                            color: '#031533',
                            padding: '5px 14px',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                          }}
                        >
                          {featuredMag.edition}
                        </span>
                      )}
                      {featuredMag.category && (
                        <span style={{ color: '#5A6A80', fontSize: '0.85rem' }}>
                          • {featuredMag.category}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontSize: '2.2rem',
                        color: '#031533',
                        marginBottom: '1rem',
                        fontFamily: 'Playfair Display, serif',
                        lineHeight: 1.25,
                      }}
                    >
                      {featuredMag.title}
                    </h3>

                    <p style={{ color: '#5A6A80', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.8rem' }}>
                      {featuredMag.description ||
                        'An inspiring look into grassroots education, community empowerment workshops, and heartfelt experiences shared by students and volunteers.'}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap', color: '#5A6A80', fontSize: '0.9rem' }}>
                      {featuredMag.publishDate && (
                        <div>
                          <strong>Published:</strong> {new Date(featuredMag.publishDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </div>
                      )}
                      {featuredMag.fileSize && (
                        <div>
                          <strong>File Size:</strong> {featuredMag.fileSize}
                        </div>
                      )}
                      {featuredMag.downloadCount > 0 && (
                        <div>
                          <strong>Downloads:</strong> {featuredMag.downloadCount}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleOpenReader(featuredMag)}
                        className="btn-gold"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.85rem 1.8rem',
                          borderRadius: '50px',
                          fontSize: '1rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <HiOutlineEye style={{ fontSize: '1.2rem' }} /> Read Online
                      </button>

                      <button
                        onClick={() => handleDownload(featuredMag)}
                        className="btn-outline-dark"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.85rem 1.8rem',
                          borderRadius: '50px',
                          fontSize: '1rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <HiOutlineDownload style={{ fontSize: '1.2rem' }} /> Download PDF
                      </button>

                      <Link
                        to="/magazines"
                        className="btn-outline-dark"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.85rem 1.5rem',
                          borderRadius: '50px',
                          fontSize: '0.95rem',
                          borderColor: '#CBD5E1',
                          color: '#5A6A80',
                        }}
                      >
                        View All Issues &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Recent Magazines (if any) */}
            {otherMagazines.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.4rem', color: '#031533', fontFamily: 'Playfair Display, serif' }}>
                    Recent Editions
                  </h4>
                  <Link
                    to="/magazines"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#DE9E36',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                    }}
                  >
                    Browse All ({magazines.length}) <HiOutlineArrowRight />
                  </Link>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {otherMagazines.map((mag, idx) => (
                    <motion.div
                      key={mag._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(3, 21, 51, 0.08)' }}
                    >
                      <div
                        style={{ height: '200px', overflow: 'hidden', position: 'relative', cursor: 'pointer', background: '#F1F5F9' }}
                        onClick={() => handleOpenReader(mag)}
                      >
                        <img
                          src={getFullUrl(mag.coverImage)}
                          alt={mag.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400';
                          }}
                        />
                        {mag.edition && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              background: 'rgba(3, 21, 51, 0.85)',
                              backdropFilter: 'blur(4px)',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              padding: '3px 10px',
                              borderRadius: '20px',
                            }}
                          >
                            {mag.edition}
                          </span>
                        )}
                      </div>

                      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h4 style={{ fontSize: '1.15rem', color: '#031533', marginBottom: '0.5rem', fontWeight: 700 }}>
                          {mag.title}
                        </h4>
                        {mag.description && (
                          <p
                            style={{
                              fontSize: '0.88rem',
                              color: '#5A6A80',
                              lineHeight: '1.5',
                              marginBottom: '1rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {mag.description}
                          </p>
                        )}

                        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.6rem', paddingTop: '0.8rem', borderTop: '1px solid #F1F5F9' }}>
                          <button
                            onClick={() => handleOpenReader(mag)}
                            className="btn-gold"
                            style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px', justifyContent: 'center' }}
                          >
                            <HiOutlineEye /> Read
                          </button>
                          <button
                            onClick={() => handleDownload(mag)}
                            className="btn-outline-dark"
                            style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px', justifyContent: 'center' }}
                          >
                            <HiOutlineDownload /> PDF
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ─────────────────── 3D PAGE TURNING FLIPBOOK MODAL ─────────────────── */}
      {selectedMag && (
        <FlipBookModal
          pdfUrl={getFullUrl(selectedMag.pdfUrl)}
          title={selectedMag.title}
          onClose={() => setSelectedMag(null)}
          onDownload={() => handleDownload(selectedMag)}
        />
      )}
    </section>
  );
};

export default MagazineSection;

