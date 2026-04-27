import { useEffect, useRef, useState } from 'react';
import { SplitText } from './SplitText';
import { VimeoThumb } from './VimeoThumb';

/* ─────────────────────────── DATA ─────────────────────────── */

type Platform = 'youtube' | 'vimeo';

interface Film {
  id: number;
  platform: Platform;
  videoId: string;
  title: string;
  client: string;
  year: string;
  tag: string;
  desc: string;
}

const FILMS: Film[] = [
  {
    id: 1,
    platform: 'youtube',
    videoId: 'BvapBAq720k',
    title: 'Borderlands 3 — Fan Trailer',
    client: 'Personal Project',
    year: '2021',
    tag: 'Trailer Edit',
    desc: 'A fan-made trailer for Borderlands 3 crafted as a passion project — cinematic editing pushed to match the raw energy of the game\'s visual identity.',
  },
  {
    id: 2,
    platform: 'youtube',
    videoId: 'bgcNMPj29Ic',
    title: 'Joker — Sound Redesign',
    client: 'Personal Project',
    year: '2020',
    tag: 'Audio-Visual',
    desc: 'An audio-visual project where I recreated all the sound design of this iconic scene from scratch — every footstep, ambient texture, musical cue, and foley layer rebuilt frame by frame without using any of the original audio.',
  },
  {
    id: 3,
    platform: 'vimeo',
    videoId: '1184496530',
    title: 'Yomaak — Platform Launch Teaser',
    client: 'Yomaak',
    year: '2024',
    tag: 'Brand Film',
    desc: 'A teaser short ad for the Yomaak platform launch — capturing the energy and promise of the brand in under sixty seconds. Directed and edited for maximum impact.',
  },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

function getEmbedSrc(platform: Platform, videoId: string): string {
  if (platform === 'youtube') {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white&iv_load_policy=3&fs=1&playsinline=0`;
  }
  return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
}

function PlatformBadge({ platform }: { platform: Platform }) {
  if (platform === 'youtube') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(0,0,0,0.55)', padding: '3px 8px',
        backdropFilter: 'blur(4px)',
      }}>
        <svg width="12" height="10" viewBox="0 0 20 14" fill="none">
          <path d="M19.6 2.2C19.4 1.4 18.8.8 18 .6 16.4.2 10 .2 10 .2S3.6.2 2 .6C1.2.8.6 1.4.4 2.2 0 3.8 0 7 0 7S0 10.2.4 11.8C.6 12.6 1.2 13.2 2 13.4 3.6 13.8 10 13.8 10 13.8S16.4 13.8 18 13.4C18.8 13.2 19.4 12.6 19.6 11.8 20 10.2 20 7 20 7S20 3.8 19.6 2.2Z" fill="#FF0000"/>
          <path d="M8 10L13.2 7 8 4V10Z" fill="white"/>
        </svg>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#ccc', letterSpacing: '0.05em' }}>YouTube</span>
      </div>
    );
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5,
      background: 'rgba(0,0,0,0.55)', padding: '3px 8px',
      backdropFilter: 'blur(4px)',
    }}>
      <svg viewBox="0 0 24 24" width="10" height="10" fill="#1AB7EA">
        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z"/>
      </svg>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#ccc', letterSpacing: '0.05em' }}>Vimeo</span>
    </div>
  );
}

/* ─────────────────────────── FILM CARD ─────────────────────────── */

function FilmCard({ film, index }: { film: Film; index: number }) {
  const [playing,      setPlaying]      = useState(false);
  const [hovered,      setHovered]      = useState(false);
  const [thumbHovered, setThumbHovered] = useState(false);
  const [imgError,     setImgError]     = useState(false);
  const [vimeoThumb,   setVimeoThumb]   = useState<string | null>(null);

  const isEven = index % 2 === 1;

  /* YouTube thumbnail — Vimeo has no reliable public thumbnail URL */
  const ytThumb = imgError
    ? `https://img.youtube.com/vi/${film.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${film.videoId}/maxresdefault.jpg`;

  const embedSrc = getEmbedSrc(film.platform, film.videoId);

  /* ── Thumbnail panel ── */
  const thumbnail = (
    <div
      className="relative overflow-hidden"
      style={{
        flex: '0 0 60%',
        aspectRatio: '16/9',
        cursor: playing ? 'default' : 'none',
      }}
      onMouseEnter={() => { setHovered(true); setThumbHovered(true); }}
      onMouseLeave={() => { setHovered(false); setThumbHovered(false); }}
      onClick={() => { if (!playing) setPlaying(true); }}
    >
      {playing ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          <iframe
            src={embedSrc}
            title={film.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
          <button
            onClick={e => { e.stopPropagation(); setPlaying(false); }}
            style={{
              position: 'absolute', top: 10, left: 10, zIndex: 20,
              background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFFFFF', width: 30, height: 30, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)', cursor: 'pointer',
              fontFamily: 'Space Mono, monospace', fontSize: 12,
              transition: 'background 200ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
            title="Stop video"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          {/* Background — real thumbnail for YouTube, dark gradient for Vimeo */}
          {film.platform === 'youtube' ? (
            <img
              src={ytThumb}
              alt={film.title}
              onError={() => setImgError(true)}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                filter: thumbHovered ? 'brightness(0.6)' : 'brightness(0.28) grayscale(20%)',
                transition: 'filter 300ms ease',
              }}
            />
          ) : (
            /* Vimeo: lazy-fetched real thumbnail via oEmbed */
            <VimeoThumb
              videoId={film.videoId}
              alt={film.title}
              imgStyle={{
                filter: thumbHovered
                  ? 'brightness(0.6)'
                  : 'brightness(0.28) grayscale(20%)',
              }}
              onLoaded={setVimeoThumb}
            />
          )}

          {/* VHS glitch layers on hover — YouTube uses ytThumb, Vimeo uses vimeoThumb */}
          {thumbHovered && (film.platform === 'youtube' || (film.platform === 'vimeo' && vimeoThumb)) && (
            <>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${film.platform === 'youtube' ? ytThumb : vimeoThumb})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6)', mixBlendMode: 'screen', opacity: 0.35, animation: 'glitch-r 0.3s steps(2) infinite', transform: 'translateX(3px)' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${film.platform === 'youtube' ? ytThumb : vimeoThumb})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6) hue-rotate(120deg)', mixBlendMode: 'screen', opacity: 0.25, animation: 'glitch-g 0.4s steps(3) infinite', transform: 'translateX(-3px)' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)', pointerEvents: 'none' }} />
            </>
          )}

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
            <div style={{
              width: thumbHovered ? 72 : 56,
              height: thumbHovered ? 72 : 56,
              borderRadius: '50%',
              border: `1.5px solid ${thumbHovered ? '#FFFFFF' : 'rgba(240,237,230,0.6)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'width 300ms ease, height 300ms ease, border-color 300ms ease',
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: '9px solid transparent',
                borderBottom: '9px solid transparent',
                borderLeft: `16px solid ${thumbHovered ? '#FFFFFF' : 'rgba(240,237,230,0.8)'}`,
                marginLeft: 4,
                transition: 'border-left-color 300ms ease',
              }} />
            </div>
          </div>

          {/* Tag badge */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: 'Space Mono, monospace', fontSize: 8,
            color: thumbHovered ? '#888' : '#333',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            transition: 'color 200ms ease',
          }}>
            {film.tag}
          </div>

          {/* Platform badge */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            opacity: thumbHovered ? 1 : 0.45,
            transition: 'opacity 300ms ease',
          }}>
            <PlatformBadge platform={film.platform} />
          </div>
        </>
      )}
    </div>
  );

  /* ── Info panel ── */
  const info = (
    <div
      className="flex flex-col justify-center"
      style={{ flex: '0 0 40%', padding: isEven ? '0' : '0 48px 0 0' }}
    >
      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#888888',
        letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12,
      }}>
        {film.client} · {film.year}
      </div>

      <h3 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 'clamp(28px, 3vw, 44px)',
        color: '#F0EDE6', letterSpacing: '-0.01em',
        lineHeight: 1, margin: '0 0 16px', fontWeight: 400,
      }}>
        {film.title}
      </h3>

      <p style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontSize: 15, color: '#555', lineHeight: 1.65,
        margin: '0 0 28px', fontWeight: 400,
      }}>
        {film.desc}
      </p>

      {/* Tag pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        border: '1px solid #2A2A2A', padding: '4px 12px',
        fontFamily: 'Space Mono, monospace', fontSize: 9,
        color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase',
        alignSelf: 'flex-start', marginBottom: 20,
      }}>
        {film.tag}
      </div>

      <button
        style={{
          background: 'none', border: '1px solid #333',
          color: '#555', fontFamily: 'Space Mono, monospace',
          fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '10px 20px', cursor: 'none', alignSelf: 'flex-start',
          transition: 'border-color 200ms ease, color 200ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFFFFF'; e.currentTarget.style.color = '#FFFFFF'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#333';    e.currentTarget.style.color = '#555'; }}
        onClick={() => setPlaying(true)}
      >
        Watch Project →
      </button>
    </div>
  );

  return (
    <div style={{ marginBottom: 80 }}>
      {/* Desktop: alternate layout */}
      <div className="hidden md:flex items-center w-full" style={{ gap: 48 }}>
        {isEven ? <>{info}{thumbnail}</> : <>{thumbnail}{info}</>}
      </div>
      {/* Mobile: always stacked */}
      <div className="flex md:hidden flex-col w-full" style={{ gap: 24 }}>
        {thumbnail}
        {info}
      </div>
    </div>
  );
}

/* ─────────────────────────── SECTION ─────────────────────────── */

export function VideoEditing() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Animate in on mount — component only renders when accordion is open,
  // so IntersectionObserver would race against the height:0 start state.
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={ref}
      id="video"
      style={{
        background: '#080808',
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
            04 / Film
          </span>
          <div style={{ flex: 1, height: 1, background: '#222' }} />
        </div>

        {/* Heading */}
        <div className="mb-16">
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: '#F0EDE6', letterSpacing: '-0.01em',
            lineHeight: 0.9, margin: 0, fontWeight: 400,
          }}>
            <SplitText text="FRAMES THAT" stagger={40} />
            <br />
            <SplitText text="TELL YOUR STORY" stagger={40} delay={100} />
          </h2>
          <p className="mt-6 max-w-md" style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 16, color: '#555555', lineHeight: 1.6, fontWeight: 400,
          }}>
            Editing, sound design, and motion — every frame crafted with intention.
          </p>
        </div>

        {/* Film rows */}
        <div>
          {FILMS.map((film, i) => (
            <FilmCard key={film.id} film={film} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}