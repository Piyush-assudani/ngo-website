import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  HiOutlineBookOpen,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineSearch,
  HiOutlineShare,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { FaBookOpen, FaFilePdf } from 'react-icons/fa';
import SEO from '../components/SEO';
import FlipBookModal from '../components/FlipBookModal';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';
const CATEGORIES = ['All', 'Annual', 'Quarterly', 'Monthly', 'Special Edition', 'Newsletter'];

const Magazines = () => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // PDF Viewer Modal
  const [selectedMag, setSelectedMag] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/magazines/public`);
      if (res.data?.magazines) {
        setMagazines(res.data.magazines);
      }
    } catch (err) {
      console.warn('Failed to load magazines:', err);
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
      setMagazines((prev) =>
        prev.map((m) => (m._id === mag._id ? { ...m, downloadCount: (m.downloadCount || 0) + 1 } : m))
      );
    } catch (e) {
      // Ignore count increment error
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

  const handleShare = (mag) => {
    const shareUrl = window.location.origin + '/magazines';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedId(mag._id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Filtered
  const filtered = magazines.filter((mag) => {
    const matchesCategory = activeCategory === 'All' || mag.category === activeCategory;
    const matchesSearch =
      mag.title?.toLowerCase().includes(search.toLowerCase()) ||
      mag.edition?.toLowerCase().includes(search.toLowerCase()) ||
      mag.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '100px', background: '#FAFCFF', minHeight: '100vh', paddingBottom: '5rem' }}>
      <SEO
        title="EnVision Magazines & Publications"
        description="Read and download official EnVision Foundation magazines, newsletters, student poems, and stories of social empowerment."
        url="/magazines"
      />

      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-header center" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <HiOutlineSparkles style={{ color: '#DE9E36' }} /> ENVISION PUBLICATIONS
          </div>
          <h1 className="section-heading center" style={{ fontSize: '3rem', margin: '0.5rem 0 1rem' }}>
            Our <span className="gold-text">Magazines</span> & Newsletters
          </h1>
          <p
            className="about-desc"
            style={{ margin: '0 auto 2rem', textAlign: 'center', maxWidth: '720px', color: '#5A6A80', fontSize: '1.1rem', lineHeight: '1.7' }}
          >
            Dive into student artwork, inspiring essays, volunteer journals, and ground reports capturing our mission of "Learning Beyond Books".
          </p>

          {/* Search Bar & Filter Pills */}
          <div style={{ maxWidth: '650px', margin: '0 auto 1.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '50px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <HiOutlineSearch style={{ color: '#94A3B8', fontSize: '1.3rem', marginRight: '0.6rem' }} />
              <input
                type="text"
                placeholder="Search magazines by title, volume, or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.98rem',
                  color: '#031533',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                >
                  <HiOutlineX />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'btn-gold' : 'btn-outline-dark'}
                style={{
                  padding: '0.5rem 1.4rem',
                  borderRadius: '50px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: '#5A6A80' }}>Loading magazines...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              background: 'white',
              borderRadius: '24px',
              maxWidth: '600px',
              margin: '2rem auto',
              border: '1px solid #E2E8F0',
            }}
          >
            <HiOutlineBookOpen style={{ fontSize: '3.5rem', color: '#DE9E36', marginBottom: '1rem' }} />
            <h3 style={{ color: '#031533', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Magazines Found</h3>
            <p style={{ color: '#5A6A80', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {search || activeCategory !== 'All'
                ? 'No magazines matched your current filter. Try adjusting your search query.'
                : 'Our upcoming magazines are currently in press! Check back soon for the next edition.'}
            </p>
            {(search || activeCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                }}
                className="btn-gold"
                style={{ borderRadius: '50px', padding: '0.6rem 1.5rem' }}
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filtered.map((mag, index) => {
              const coverUrl = getFullUrl(mag.coverImage);

              return (
                <motion.div
                  key={mag._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(3, 21, 51, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.35s ease',
                  }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(3, 21, 51, 0.12)' }}
                >
                  {/* Featured Ribbon */}
                  {mag.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        zIndex: 2,
                        background: '#DE9E36',
                        color: '#031533',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '50px',
                        boxShadow: '0 4px 12px rgba(222, 158, 54, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      ★ Featured
                    </div>
                  )}

                  {/* Cover Section */}
                  <div
                    style={{
                      height: '280px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#F1F5F9',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpenReader(mag)}
                    title="Click to read magazine online"
                  >
                    <img
                      src={coverUrl}
                      alt={mag.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600';
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        insetInline: 0,
                        background: 'linear-gradient(to top, rgba(3,21,51,0.7) 0%, transparent 60%)',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      {mag.edition && (
                        <span
                          style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            color: '#031533',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '20px',
                          }}
                        >
                          {mag.edition}
                        </span>
                      )}

                      <span
                        style={{
                          color: 'white',
                          fontSize: '0.78rem',
                          background: 'rgba(0,0,0,0.5)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {mag.fileSize || 'PDF'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#DE9E36', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {mag.category || 'General'}
                      </span>
                      {mag.publishDate && (
                        <span style={{ fontSize: '0.8rem', color: '#8892A0' }}>
                          {new Date(mag.publishDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontSize: '1.35rem',
                        color: '#031533',
                        marginBottom: '0.6rem',
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 700,
                        lineHeight: 1.3,
                      }}
                    >
                      {mag.title}
                    </h3>

                    {mag.description && (
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: '#5A6A80',
                          lineHeight: '1.6',
                          marginBottom: '1.2rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {mag.description}
                      </p>
                    )}

                    {/* Metadata & Actions */}
                    <div style={{ marginTop: 'auto' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '0.8rem',
                          borderTop: '1px solid #F1F5F9',
                          marginBottom: '1rem',
                          fontSize: '0.82rem',
                          color: '#8892A0',
                        }}
                      >
                        <span>
                          <strong>{mag.downloadCount || 0}</strong> downloads
                        </span>

                        <button
                          onClick={() => handleShare(mag)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: copiedId === mag._id ? '#10B981' : '#5A6A80',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                          }}
                        >
                          {copiedId === mag._id ? (
                            <>
                              <HiOutlineCheck /> Link Copied!
                            </>
                          ) : (
                            <>
                              <HiOutlineShare /> Share
                            </>
                          )}
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                        <button
                          onClick={() => handleOpenReader(mag)}
                          className="btn-gold"
                          style={{
                            padding: '0.65rem 0.8rem',
                            fontSize: '0.9rem',
                            borderRadius: '8px',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <HiOutlineEye style={{ marginRight: '4px' }} /> Read
                        </button>

                        <button
                          onClick={() => handleDownload(mag)}
                          className="btn-outline-dark"
                          style={{
                            padding: '0.65rem 0.8rem',
                            fontSize: '0.9rem',
                            borderRadius: '8px',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <HiOutlineDownload style={{ marginRight: '4px' }} /> Download
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─────────────────── 3D PAGE TURNING FLIPBOOK MODAL ─────────────────── */}
      {selectedMag && (
        <FlipBookModal
          pdfUrl={getFullUrl(selectedMag.pdfUrl)}
          title={selectedMag.title}
          onClose={() => setSelectedMag(null)}
          onDownload={() => handleDownload(selectedMag)}
        />
      )}
    </div>
  );
};

export default Magazines;

