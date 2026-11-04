import React, { useState, useEffect, useRef } from 'react';
import {
  HiOutlineX,
  HiOutlineDownload,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
  HiOutlineArrowsExpand,
} from 'react-icons/hi';
import { FaFilePdf, FaBookOpen } from 'react-icons/fa';

// Optional subtle paper sound synthesized using Web Audio API (no external file needed!)
const playPageTurnSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {
    // Audio context may be restricted by browser policy before first interaction
  }
};

const FlipBookModal = ({ pdfUrl, title, onClose, onDownload }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // Current spread index (0 = cover)
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' or 'prev'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDualPage, setIsDualPage] = useState(window.innerWidth >= 768);
  const [fallbackToIframe, setFallbackToIframe] = useState(false);

  const containerRef = useRef(null);

  // Monitor viewport size for dual page vs single page
  useEffect(() => {
    const handleResize = () => {
      setIsDualPage(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipping, totalPages, isDualPage]);

  // Load and render PDF pages using PDF.js
  useEffect(() => {
    let isCancelled = false;

    const renderPdf = async () => {
      setLoading(true);
      setLoadProgress(0);

      // Wait for pdfjsLib to become available
      let pdfjs = window.pdfjsLib;
      if (!pdfjs) {
        let attempts = 0;
        while (!pdfjs && attempts < 25) {
          await new Promise((r) => setTimeout(r, 100));
          pdfjs = window.pdfjsLib;
          attempts++;
        }
      }

      if (!pdfjs) {
        console.warn('PDF.js not available, falling back to iframe');
        setFallbackToIframe(true);
        setLoading(false);
        return;
      }

      try {
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        if (isCancelled) return;
        setTotalPages(numPages);

        const renderedPages = [];

        for (let i = 1; i <= numPages; i++) {
          if (isCancelled) return;

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;

          renderedPages.push(canvas.toDataURL('image/jpeg', 0.88));
          setLoadProgress(Math.round((i / numPages) * 100));
        }

        if (!isCancelled) {
          setPages(renderedPages);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to render PDF with PDF.js:', err);
        if (!isCancelled) {
          setFallbackToIframe(true);
          setLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  // Page navigation logic
  const step = isDualPage ? 2 : 1;

  const canGoNext = isDualPage
    ? currentIndex + (currentIndex === 0 ? 1 : 2) < totalPages
    : currentIndex < totalPages - 1;

  const canGoPrev = currentIndex > 0;

  const goNext = () => {
    if (!canGoNext || isFlipping) return;

    if (soundEnabled) playPageTurnSound();
    setIsFlipping(true);
    setFlipDirection('next');

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (isDualPage) {
          return prev === 0 ? 1 : prev + 2;
        }
        return prev + 1;
      });
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  const goPrev = () => {
    if (!canGoPrev || isFlipping) return;

    if (soundEnabled) playPageTurnSound();
    setIsFlipping(true);
    setFlipDirection('prev');

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (isDualPage) {
          return prev <= 2 ? 0 : prev - 2;
        }
        return prev - 1;
      });
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  // Toggle fullscreen
  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Calculate which pages are shown
  // In dual-page mode:
  // index 0 -> Cover page on right side (or centered)
  // index 1 -> Left: page 1, Right: page 2
  // index 3 -> Left: page 3, Right: page 4
  const leftPageIndex = isDualPage ? (currentIndex === 0 ? null : currentIndex) : null;
  const rightPageIndex = isDualPage ? (currentIndex === 0 ? 0 : currentIndex + 1) : currentIndex;

  const leftPageImg = leftPageIndex !== null && leftPageIndex < pages.length ? pages[leftPageIndex] : null;
  const rightPageImg = rightPageIndex !== null && rightPageIndex < pages.length ? pages[rightPageIndex] : null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 12, 25, 0.94)',
        backdropFilter: 'blur(10px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
      }}
      onClick={onClose}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '1240px',
          height: '94vh',
          background: '#0B1322',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top Bar ── */}
        <div
          style={{
            padding: '0.8rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.02)',
            color: 'white',
            flexWrap: 'wrap',
            gap: '0.8rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <FaBookOpen style={{ color: '#DE9E36', fontSize: '1.4rem' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#F1F5F9', fontFamily: 'Playfair Display, serif' }}>
                {title || 'EnVision Magazine'}
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Interactive 3D FlipBook Edition</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="icon-btn"
              title={soundEnabled ? 'Mute Page Flip Sound' : 'Enable Page Flip Sound'}
              style={{
                color: soundEnabled ? '#DE9E36' : '#64748B',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
            >
              {soundEnabled ? <HiOutlineVolumeUp /> : <HiOutlineVolumeOff />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullScreen}
              className="icon-btn"
              title="Toggle Fullscreen"
              style={{
                color: '#CBD5E1',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
            >
              <HiOutlineArrowsExpand />
            </button>

            {/* Direct Download */}
            <button
              onClick={onDownload}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#DE9E36',
                color: '#031533',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              <HiOutlineDownload /> Download PDF
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                marginLeft: '0.4rem',
              }}
            >
              <HiOutlineX />
            </button>
          </div>
        </div>

        {/* ── Main Book Viewer Area ── */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #131E33 0%, #070D18 100%)',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', color: '#94A3B8' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '3px solid rgba(222, 158, 54, 0.2)',
                  borderTopColor: '#DE9E36',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 1.5rem',
                }}
              />
              <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                Preparing Magazine Pages...
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#DE9E36' }}>{loadProgress}% loaded</p>
              <div
                style={{
                  width: '260px',
                  height: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  margin: '1rem auto 0',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${loadProgress}%`,
                    background: '#DE9E36',
                    transition: 'width 0.2s ease',
                  }}
                />
              </div>
            </div>
          ) : fallbackToIframe ? (
            /* Fallback if PDF.js couldn't render */
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              title={title}
              width="100%"
              height="100%"
              style={{ border: 'none', borderRadius: '12px' }}
            />
          ) : (
            /* 3D Realistic FlipBook Arena */
            <div
              style={{
                perspective: '2500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              {/* Previous Nav Button */}
              <button
                onClick={goPrev}
                disabled={!canGoPrev || isFlipping}
                style={{
                  position: 'absolute',
                  left: '1.5rem',
                  zIndex: 20,
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: canGoPrev ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: canGoPrev ? 'white' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  cursor: canGoPrev ? 'pointer' : 'default',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                }}
                title="Previous Page (Left Arrow)"
              >
                <HiOutlineChevronLeft />
              </button>

              {/* Next Nav Button */}
              <button
                onClick={goNext}
                disabled={!canGoNext || isFlipping}
                style={{
                  position: 'absolute',
                  right: '1.5rem',
                  zIndex: 20,
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: canGoNext ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: canGoNext ? 'white' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  cursor: canGoNext ? 'pointer' : 'default',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                }}
                title="Next Page (Right Arrow / Spacebar)"
              >
                <HiOutlineChevronRight />
              </button>

              {/* ── THE BOOK SPREAD CONTAINER ── */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '84%',
                  aspectRatio: isDualPage && currentIndex !== 0 ? '1.42 / 1' : '0.71 / 1',
                  maxHeight: '740px',
                  boxShadow:
                    '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 100px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  transformStyle: 'preserve-3d',
                  userSelect: 'none',
                }}
              >
                {/* ── DUAL PAGE MODE (DESKTOP) ── */}
                {isDualPage && currentIndex !== 0 ? (
                  <>
                    {/* Left Page (Static Base) */}
                    <div
                      style={{
                        flex: 1,
                        height: '100%',
                        position: 'relative',
                        background: '#ffffff',
                        borderTopLeftRadius: '6px',
                        borderBottomLeftRadius: '6px',
                        overflow: 'hidden',
                        boxShadow: 'inset -20px 0 35px rgba(0,0,0,0.12)',
                        cursor: canGoPrev ? 'pointer' : 'default',
                      }}
                      onClick={goPrev}
                      title="Click to turn back"
                    >
                      {leftPageImg && (
                        <img
                          src={leftPageImg}
                          alt={`Page ${leftPageIndex + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                        />
                      )}
                      {/* Spine Crease Shadow (Right side of Left page) */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          right: 0,
                          width: '40px',
                          background: 'linear-gradient(to left, rgba(0,0,0,0.22) 0%, transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '12px',
                          fontSize: '0.75rem',
                          color: '#64748b',
                          fontWeight: 600,
                        }}
                      >
                        {leftPageIndex + 1}
                      </span>
                    </div>

                    {/* Book Center Spine Crease */}
                    <div
                      style={{
                        width: '3px',
                        height: '100%',
                        background: 'linear-gradient(to right, #000, #333, #000)',
                        zIndex: 10,
                        boxShadow: '0 0 8px rgba(0,0,0,0.8)',
                      }}
                    />

                    {/* Right Page (Static Base) */}
                    <div
                      style={{
                        flex: 1,
                        height: '100%',
                        position: 'relative',
                        background: '#ffffff',
                        borderTopRightRadius: '6px',
                        borderBottomRightRadius: '6px',
                        overflow: 'hidden',
                        boxShadow: 'inset 20px 0 35px rgba(0,0,0,0.12)',
                        cursor: canGoNext ? 'pointer' : 'default',
                      }}
                      onClick={goNext}
                      title="Click to turn next"
                    >
                      {rightPageImg && (
                        <img
                          src={rightPageImg}
                          alt={`Page ${rightPageIndex + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                        />
                      )}
                      {/* Spine Crease Shadow (Left side of Right page) */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          width: '40px',
                          background: 'linear-gradient(to right, rgba(0,0,0,0.22) 0%, transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '12px',
                          fontSize: '0.75rem',
                          color: '#64748b',
                          fontWeight: 600,
                        }}
                      >
                        {rightPageIndex + 1}
                      </span>
                    </div>

                    {/* ── 3D TURNING PAGE OVERLAY ANIMATION ── */}
                    {isFlipping && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          width: '50%',
                          right: flipDirection === 'next' ? 0 : 'auto',
                          left: flipDirection === 'prev' ? 0 : 'auto',
                          transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                          transformStyle: 'preserve-3d',
                          animation:
                            flipDirection === 'next'
                              ? 'flipPageForward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards'
                              : 'flipPageBackward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards',
                          zIndex: 15,
                          background: '#fff',
                          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                        }}
                      >
                        {/* Front Face */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={flipDirection === 'next' ? rightPageImg : leftPageImg}
                            alt="Turning Page Front"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                          {/* Moving Shading Effect */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background:
                                flipDirection === 'next'
                                  ? 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 60%)'
                                  : 'linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 60%)',
                              pointerEvents: 'none',
                            }}
                          />
                        </div>

                        {/* Back Face */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            overflow: 'hidden',
                            background: '#f8fafc',
                          }}
                        >
                          {pages[currentIndex + (flipDirection === 'next' ? 2 : -1)] && (
                            <img
                              src={pages[currentIndex + (flipDirection === 'next' ? 2 : -1)]}
                              alt="Turning Page Back"
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          )}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.2))',
                              pointerEvents: 'none',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* ── SINGLE PAGE MODE (MOBILE OR FRONT COVER) ── */
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      background: '#ffffff',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d',
                      animation: isFlipping
                        ? flipDirection === 'next'
                          ? 'singlePageFlipNext 0.55s ease forwards'
                          : 'singlePageFlipPrev 0.55s ease forwards'
                        : 'none',
                    }}
                    onClick={goNext}
                    title="Click to turn to next page"
                  >
                    {pages[currentIndex] && (
                      <img
                        src={pages[currentIndex]}
                        alt={`Page ${currentIndex + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                      />
                    )}

                    {/* Book spine simulation on the left */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: '20px',
                        background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {currentIndex === 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '16px',
                          right: '16px',
                          background: '#DE9E36',
                          color: '#031533',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          padding: '4px 14px',
                          borderRadius: '50px',
                          boxShadow: '0 4px 15px rgba(222, 158, 54, 0.4)',
                        }}
                      >
                        Click to Open Magazine &rarr;
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom Controls & Page Scrubber ── */}
        <div
          style={{
            padding: '0.8rem 1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.02)',
            color: '#94A3B8',
            fontSize: '0.85rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Page Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span style={{ color: '#F1F5F9' }}>
              {isDualPage && currentIndex !== 0
                ? `Pages ${leftPageIndex + 1} - ${Math.min(rightPageIndex + 1, totalPages)} of ${totalPages}`
                : `Page ${currentIndex + 1} of ${totalPages}`}
            </span>
          </div>

          {/* Quick Page Jump Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, maxWidth: '400px' }}>
            <span style={{ fontSize: '0.78rem' }}>1</span>
            <input
              type="range"
              min="0"
              max={Math.max(0, totalPages - 1)}
              value={currentIndex}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setCurrentIndex(isDualPage && val > 0 && val % 2 === 0 ? val - 1 : val);
              }}
              style={{
                width: '100%',
                accentColor: '#DE9E36',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: '0.78rem' }}>{totalPages}</span>
          </div>

          {/* Helper hint */}
          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
            Tip: Use <kbd style={{ background: '#1E293B', padding: '2px 6px', borderRadius: '4px', color: '#DE9E36' }}>&larr;</kbd> <kbd style={{ background: '#1E293B', padding: '2px 6px', borderRadius: '4px', color: '#DE9E36' }}>&rarr;</kbd> or click page edges to turn
          </div>
        </div>
      </div>

      {/* ── Keyframe Animations for 3D Page Turn ── */}
      <style>{`
        @keyframes flipPageForward {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-90deg) scale(1.03);
          }
          100% {
            transform: rotateY(-180deg) scale(1);
          }
        }

        @keyframes flipPageBackward {
          0% {
            transform: rotateY(-180deg);
          }
          50% {
            transform: rotateY(-90deg) scale(1.03);
          }
          100% {
            transform: rotateY(0deg) scale(1);
          }
        }

        @keyframes singlePageFlipNext {
          0% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotateY(-60deg) scale(0.92);
            opacity: 0.6;
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes singlePageFlipPrev {
          0% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotateY(60deg) scale(0.92);
            opacity: 0.6;
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FlipBookModal;
