import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-navbar' : ''}`}>
      <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/favicon.webp" alt="EnVision Logo" width="60" height="60" decoding="async" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
        <div className="nav-text" style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: '#031533', margin: 0, fontWeight: '800' }}>
            En<span style={{ color: '#DE9E36' }}>V</span>ision Foundation
          </h1>
          <p style={{ fontSize: '0.65rem', color: '#8892A0', letterSpacing: '3px', margin: 0, textTransform: 'uppercase' }}>Learning Beyond Books</p>
        </div>
      </Link>
      
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', marginLeft: 'auto', marginRight: '1rem' }}
      >
        ☰
      </button>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} style={{ color: isActive('/') ? '#DE9E36' : '#5A6A80', fontWeight: isActive('/') ? '600' : '500', position: 'relative' }}>
          Home
          {isActive('/') && <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: '#DE9E36' }}></span>}
        </Link>
        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} style={{ color: isActive('/about') ? '#DE9E36' : '#5A6A80', fontWeight: isActive('/about') ? '600' : '500', position: 'relative' }}>
          About
          {isActive('/about') && <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: '#DE9E36' }}></span>}
        </Link>
        <Link to="/impact" className={`nav-link ${isActive('/impact') ? 'active' : ''}`} style={{ color: isActive('/impact') ? '#DE9E36' : '#5A6A80', fontWeight: isActive('/impact') ? '600' : '500', position: 'relative' }}>
          Our Work
          {isActive('/impact') && <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: '#DE9E36' }}></span>}
        </Link>
        <Link to="/apply" className={`nav-link ${isActive('/apply') ? 'active' : ''}`} style={{ color: isActive('/apply') ? '#DE9E36' : '#5A6A80', fontWeight: isActive('/apply') ? '600' : '500', position: 'relative' }}>
          Get Involved
          {isActive('/apply') && <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: '#DE9E36' }}></span>}
        </Link>
        <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`} style={{ color: isActive('/gallery') ? '#DE9E36' : '#5A6A80', fontWeight: isActive('/gallery') ? '600' : '500', position: 'relative' }}>
          Gallery
          {isActive('/gallery') && <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: '#DE9E36' }}></span>}
        </Link>
        <Link to="/magazines" className={`nav-link ${isActive('/magazines') ? 'active' : ''}`} style={{ color: isActive('/magazines') ? '#DE9E36' : '#5A6A80', fontWeight: isActive('/magazines') ? '600' : '500', position: 'relative' }}>
          Magazine
          {isActive('/magazines') && <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: '#DE9E36' }}></span>}
        </Link>
        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} style={{ color: isActive('/contact') ? '#DE9E36' : '#5A6A80', fontWeight: isActive('/contact') ? '600' : '500', position: 'relative' }}>
          Contact
          {isActive('/contact') && <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', backgroundColor: '#DE9E36' }}></span>}
        </Link>
        <button 
          onClick={() => { window.dispatchEvent(new CustomEvent('open-donation', { detail: { amount: 1000 } })); setIsMenuOpen(false); }} 
          className="btn-gold mobile-donate-btn" 
          style={{ display: 'none', padding: '0.8rem 1.8rem', fontSize: '1rem', borderRadius: '50px', border: 'none', cursor: 'pointer', marginTop: '1rem', width: '100%', justifyContent: 'center' }}
        >
          <span style={{ marginRight: '8px' }}>♡</span> Donate Now
        </button>
      </div>

      <div className="nav-donate-btn">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-donation', { detail: { amount: 1000 } }))} 
          className="btn-gold" 
          style={{ padding: '0.8rem 1.8rem', fontSize: '1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ marginRight: '8px' }}>♡</span> Donate Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
