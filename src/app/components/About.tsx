import { useEffect, useRef, useState } from 'react';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) { setVisible(true); setPlayed(true); }
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [played]);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: '#0A0A0A',
        padding: '120px 0',
        borderTop: '1px solid #1E1E1E',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 600ms ease-out, transform 600ms ease-out',
      }}
    >
      <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-6 mb-16">
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: 11,
            color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            00 / About
          </span>
          <div style={{ flex: 1, height: 1, background: '#222' }} />
        </div>

        {/* Content */}
        <div style={{ maxWidth: 640 }}>
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: '#F0EDE6', letterSpacing: '-0.01em',
            lineHeight: 0.92, margin: '0 0 32px', fontWeight: 400,
          }}>
            MULTI-<br />DISCIPLINARY<br />DESIGNER
          </h2>

          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 17, color: '#666', lineHeight: 1.7,
            margin: '0 0 20px', fontWeight: 400,
          }}>
            I'm Moustafa Abdelmoneim — a designer who moves between disciplines
            the same way a good film moves between acts: with intention, rhythm,
            and a clear point of view.
          </p>

          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 17, color: '#555', lineHeight: 1.7,
            margin: '0 0 40px', fontWeight: 400,
          }}>
            My work spans brand animation, social content, UI design, and film.
            Whether the output is a two-second logo reveal or a full-length
            trailer, the goal is the same — make every frame count.
          </p>

          {/* Available + location */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#FFFFFF', display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'Space Mono, monospace', fontSize: 10,
                color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                Available for work
              </span>
            </div>
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: 10,
              color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Istanbul, Turkey
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
