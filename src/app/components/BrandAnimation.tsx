import { useEffect, useRef, useState } from 'react';
import { SplitText } from './SplitText';

const VIDEOS = [
  {
    id: 1,
    videoId: 'KRivdH_SyL0',
    title: 'Yomaak Brand Identity',
    client: 'Yomaak',
    year: '2024',
    category: 'Brand Animation',
  },
  {
    id: 2,
    videoId: 'hgKjbosMPaU',
    title: 'Logo Motion Reveal',
    client: 'Moustafa',
    year: '2024',
    category: 'Motion Graphics',
  },
];

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ marginLeft: 3, flexShrink: 0 }}>
      <path d="M5 3.5L16.5 10L5 16.5V3.5Z" fill="white" />
    </svg>
  );
}

function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const [playing, setPlaying]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [imgError, setImgError] = useState(false);

  const thumb    = imgError
    ? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

  // fs=1 enables the fullscreen button; playsinline=0 allows native OS fullscreen
  const embedSrc = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&color=white&iv_load_policy=3&fs=1&playsinline=0`;

  const svgRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    try {
      const bbox = svgRef.current.getBBox();
      const p = 2 * (bbox.width + bbox.height);
      svgRef.current.style.strokeDasharray  = `${p}`;
      svgRef.current.style.strokeDashoffset = hovered && !playing ? '0' : `${p}`;
      svgRef.current.style.transition = hovered
        ? 'stroke-dashoffset 450ms cubic-bezier(0.16,1,0.3,1)'
        : 'stroke-dashoffset 300ms ease';
    } catch {}
  }, [hovered, playing]);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: '#0D0D0D',
        aspectRatio: '16/9',
        cursor: playing ? 'default' : 'none',
        transform: hovered && !playing ? 'scale(1.015)' : 'scale(1)',
        transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (!playing) setPlaying(true); }}
    >
      {playing ? (
        /* ── Active embed ──
           No overlay div here. The transparent pointer-events overlay was removed
           because iframes capture mouse events from the parent document — as soon
           as the cursor moves into the iframe (e.g. toward the fullscreen button),
           the parent fires onMouseLeave, the overlay re-enabled itself with
           pointer-events:all, and ate the click.
           YouTube's player already auto-hides its own controls after ~3 s of
           inactivity, which is exactly what happens when the cursor leaves the card.
        */
        <iframe
          src={embedSrc}
          title={video.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
          // "fullscreen" in the Permissions Policy allow-list is required by
          // Chromium 94+ — allowFullScreen alone is not sufficient.
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      ) : (
        /* ── Thumbnail / pre-play state ── */
        <>
          {/* Thumbnail */}
          <img
            src={thumb}
            alt={video.title}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: hovered
                ? 'brightness(0.55) grayscale(10%)'
                : 'brightness(0.35) grayscale(30%)',
              transition: 'filter 400ms ease',
            }}
          />

          {/* SVG border trace */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
            <rect
              ref={svgRef}
              x="1.5" y="1.5"
              fill="none" stroke="#FFFFFF" strokeWidth="1.5"
              style={{ width: 'calc(100% - 3px)', height: 'calc(100% - 3px)' }}
            />
          </svg>

          {/* Centred play button */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div
              style={{
                width: hovered ? 76 : 60,
                height: hovered ? 76 : 60,
                borderRadius: '50%',
                border: `1.5px solid rgba(255,255,255,${hovered ? 0.9 : 0.4})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(6px)',
                transition: 'all 350ms cubic-bezier(0.16,1,0.3,1)',
                boxShadow: hovered ? '0 0 32px rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <PlayIcon size={hovered ? 22 : 18} />
            </div>
          </div>

          {/* YouTube badge */}
          <div
            style={{
              position: 'absolute', top: 12, right: 12,
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(0,0,0,0.6)',
              padding: '3px 8px',
              backdropFilter: 'blur(4px)',
              opacity: hovered ? 1 : 0.5,
              transition: 'opacity 300ms ease',
            }}
          >
            <svg width="12" height="10" viewBox="0 0 20 14" fill="none">
              <path d="M19.6 2.2C19.4 1.4 18.8 0.8 18 0.6 16.4 0.2 10 0.2 10 0.2S3.6 0.2 2 0.6C1.2 0.8 0.6 1.4 0.4 2.2 0 3.8 0 7 0 7S0 10.2 0.4 11.8C0.6 12.6 1.2 13.2 2 13.4 3.6 13.8 10 13.8 10 13.8S16.4 13.8 18 13.4C18.8 13.2 19.4 12.6 19.6 11.8 20 10.2 20 7 20 7S20 3.8 19.6 2.2Z" fill="#FF0000"/>
              <path d="M8 10L13.2 7L8 4V10Z" fill="white"/>
            </svg>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#ccc', letterSpacing: '0.05em' }}>YouTube</span>
          </div>

          {/* Bottom label slide-up */}
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px 16px 16px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)',
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
              {video.category}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 18, color: '#F0EDE6', fontWeight: 600, letterSpacing: '0.02em' }}>
              {video.title}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#555', marginTop: 2 }}>
              {video.client} · {video.year}
            </div>
          </div>

          {/* Top-left category marker */}
          <div
            style={{
              position: 'absolute', top: 12, left: 12,
              fontFamily: 'Space Mono, monospace', fontSize: 9,
              color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase',
              opacity: hovered ? 0 : 1,
              transition: 'opacity 200ms ease',
            }}
          >
            {video.category}
          </div>
        </>
      )}
    </div>
  );
}

export function BrandAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Component only mounts when the accordion is opened, so animate in on mount.
  // Using IntersectionObserver caused a race: the observer fired while the
  // parent accordion was still at height:0, saw the element as non-intersecting,
  // and never fired again — leaving the section invisible.
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: '#0A0A0A',
        padding: '120px 0',
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 600ms ease-out, opacity 600ms ease-out',
      }}
    >
      <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-12">
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            01 / Animation
          </span>
          <div style={{ flex: 1, height: 1, background: '#222' }} />
        </div>

        {/* Heading */}
        <div className="mb-16">
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 7vw, 96px)', color: '#F0EDE6', letterSpacing: '-0.01em', lineHeight: 0.9, margin: 0, fontWeight: 400 }}>
            <SplitText text="BRANDS THAT" stagger={40} />
            <br />
            <SplitText text="MOVE PEOPLE" stagger={40} delay={100} />
          </h2>
          <p className="mt-6 max-w-md" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 16, color: '#555555', lineHeight: 1.6, fontWeight: 400 }}>
            Crafting motion identities that live and breathe across every touchpoint — from logo reveals to full brand campaigns.
          </p>
        </div>

        {/* 2-column video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VIDEOS.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-end">
          <button
            className="group flex items-center gap-3"
            style={{ background: 'none', border: 'none', fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'none', transition: 'color 200ms ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            View all projects
            <span className="group-hover:translate-x-2 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}