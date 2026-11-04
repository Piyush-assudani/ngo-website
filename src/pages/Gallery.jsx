import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/SEO';

const API = import.meta.env.VITE_API_URL || 'https://envision.piyushassudani.in/api';

// No fallback gallery, fetch entirely from database

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get(`${API}/website/public-gallery`)
      .then(res => {
        if (res.data.images && res.data.images.length > 0) {
          setImages(res.data.images.map(img => ({
            ...img,
            imageUrl: img.imageUrl.startsWith('http') ? img.imageUrl : `${API.replace('/api', '')}${img.imageUrl}`
          })));
        }
      })
      .catch(() => {});
  }, []);

  const categories = ['All', ...new Set(images.map(i => i.category).filter(Boolean))];
  const filtered = filter === 'All' ? images : images.filter(i => i.category === filter);

  return (
    <div style={{ paddingTop: '100px', background: '#FAFCFF', minHeight: '100vh' }}>
      <SEO title="Gallery" description="Explore moments from EnVision Foundation's initiatives — education, creativity, and community outreach." url="/gallery" />

      <section className="section" style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-header center">OUR GALLERY</div>
          <h1 className="section-heading center">Moments That <span className="gold-text">Matter</span></h1>
          <p className="about-desc" style={{ margin: '0 auto 2rem', textAlign: 'center', maxWidth: '700px' }}>
            A glimpse into the lives we're touching and the change we're creating together.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={filter === cat ? 'btn-gold' : 'btn-outline-dark'}
                style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.9rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#5A6A80' }}>
            <p>No images uploaded yet. Check back later!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
              whileHover={{ y: -8 }}
            >
              <img
                src={item.imageUrl}
                alt={item.caption || item.title}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: index % 3 === 0 ? '350px' : '280px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.5rem 1.5rem',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white',
              }}>
                {item.category && (
                  <span style={{ fontSize: '0.75rem', background: '#DE9E36', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: '600', marginBottom: '0.5rem', display: 'inline-block' }}>
                    {item.category}
                  </span>
                )}
                <p style={{ fontSize: '1rem', fontWeight: '600', margin: '0.5rem 0 0' }}>
                  {item.caption || item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#8892A0' }}>
            <p style={{ fontSize: '1.2rem' }}>No images found in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Gallery;
