import resumePdf from '../../imports/Moustafa_Abdelmoneim_Resume-1.pdf';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import profileImg from '../../imports/freepik_a-midsize-young-man-have-_2818010721.jpeg';
import { SplitText } from './SplitText';

const MARQUEE_TEXT = 'MOTION\u2003—\u2003DESIGN\u2003—\u2003BRAND\u2003—\u2003VISUAL\u2003—\u2003STORYTELLING\u2003—\u2003';

const subtitleChars = 'Multi-disciplinary Designer'.split('');

const PROFILE_IMG_STYLES = `
  .hero-profile-img {
    width: 100%;
    max-width: 420px;
    aspect-ratio: 3 / 4;
    background: #111;
    position: relative;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 768px) {
    .hero-profile-img {
      width: 300px;
      max-width: 300px;
      aspect-ratio: auto;
      height: 380px;
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

export function Hero() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 600);
    return () => {
      clearInterval(blinkInterval);
      clearTimeout(subtitleTimer);
    };
  }, []);

  return (
    <>
      <style>{PROFILE_IMG_STYLES}</style>

      <section
        className="relative flex flex-col overflow-hidden"
        style={{ background: '#0A0A0A', paddingTop: 100, paddingBottom: 56 }}
      >
        {/* Ambient marquee background */}
        <div
          className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
          style={{ opacity: 0.06 }}
        >
          <div
            className="flex whitespace-nowrap"
            style={{
              animation: 'marquee 40s linear infinite',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(60px, 10vw, 120px)',
              color: '#F0EDE6',
              letterSpacing: '0.05em',
            }}
          >
            <span>{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
            <span aria-hidden>{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto w-full">

          {/* Two-column layout: text left, image right */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">

            {/* Left column */}
            <div className="flex-1 min-w-0">
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 mb-8"
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'inline-block',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 11,
                    color: '#FFFFFF',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Available for Work
                </span>
              </motion.div>

              {/* Name */}
              <div style={{ overflow: 'hidden', lineHeight: 0.9 }}>
                <h1
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: 'clamp(72px, 13vw, 160px)',
                    color: '#F0EDE6',
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    lineHeight: 0.9,
                    margin: 0,
                    padding: 0,
                    fontWeight: 400,
                  }}
                >
                  <SplitText text="MOUSTAFA" delay={300} stagger={60} />
                  <br />
                  <SplitText text="ABDELMONEIM" delay={400} stagger={60} />
                  <span
                    style={{
                      display: 'inline-block',
                      color: '#FFFFFF',
                      opacity: cursorVisible ? 1 : 0,
                      marginLeft: 4,
                    }}
                  >
                    _
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="mt-6" style={{ overflow: 'hidden', height: 32 }}>
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 'clamp(13px, 1.5vw, 16px)',
                    color: '#555555',
                    letterSpacing: '0.08em',
                    margin: 0,
                    textTransform: 'uppercase',
                  }}
                >
                  {subtitleChars.map((char, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-block',
                        transform: subtitleVisible ? 'translateY(0)' : 'translateY(30px)',
                        opacity: subtitleVisible ? 1 : 0,
                        transition: `transform 600ms cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, opacity 500ms ease ${i * 30}ms`,
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </p>
              </div>

              {/* Resume Download button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                <a
                  href={resumePdf}
                  download="Moustafa_Abdelmoneim_Resume_2026.pdf"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    border: '1px solid #FFFFFF',
                    color: '#FFFFFF',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    padding: '12px 28px',
                    background: 'transparent',
                    cursor: 'none',
                    transition: 'background 250ms ease, color 250ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                    (e.currentTarget as HTMLElement).style.color = '#0A0A0A';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M6 1v7M3 6l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Resume
                </a>
              </motion.div>
            </div>

            {/* Right column — profile image, visible on both mobile and desktop */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0"
            >
              <div className="hero-profile-img">
                <img
                  src={profileImg}
                  alt="Designer profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 18%',
                    transform: 'scale(1.2)',
                    transformOrigin: 'center 22%',
                    filter: 'grayscale(80%) contrast(1.1)',
                    opacity: 0.7,
                    display: 'block',
                  }}
                />
                {/* Film grain overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                    opacity: 0.5,
                  }}
                />
                {/* Corner accents */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '1.5px solid #FFFFFF', borderLeft: '1.5px solid #FFFFFF' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: '1.5px solid #FFFFFF', borderRight: '1.5px solid #FFFFFF' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: '1.5px solid #FFFFFF', borderLeft: '1.5px solid #FFFFFF' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '1.5px solid #FFFFFF', borderRight: '1.5px solid #FFFFFF' }} />
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: '#2A2A2A',
              marginTop: 32,
              transformOrigin: 'left',
            }}
          />

          {/* Scroll hint — right-aligned */}
          <div className="flex justify-end mt-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col items-center gap-1"
              style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#333', letterSpacing: '0.1em' }}
            >
              <span>SCROLL</span>
              <div style={{ width: 1, height: 40, background: '#333', animation: 'scroll-line 2s ease-in-out infinite' }} />
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}