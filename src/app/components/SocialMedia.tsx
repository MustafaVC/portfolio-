import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SplitText } from './SplitText';
import { VimeoThumb } from './VimeoThumb';

/* ── Fallback local images (originally Figma-asset imports) ── */
import post1 from '../../imports/image.png';
import post2 from '../../imports/image-2.png';
import post3 from '../../imports/image-3.png';

/* ── New uploaded posts ── */
import frame247 from '../../imports/Frame_247.png';
import frame204 from '../../imports/Frame_204.png';
import waImg1   from '../../imports/WhatsApp_Image_2026-04-19_at_09.33.09.jpeg';
import waImg2   from '../../imports/WhatsApp_Image_2026-04-19_at_09.34.18.jpeg';
import imagePng from '../../imports/image-1.png';

/* ─────────────────────────── DATA ─────────────────────────── */

const POSTS = [
  { id: 1, img: post1,    client: 'Yomaak', title: 'Search Campaign', platform: 'Instagram' },
  { id: 2, img: post2,    client: 'Yomaak', title: 'Supplier Trust',  platform: 'Instagram' },
  { id: 3, img: post3,    client: 'Yomaak', title: 'Community Build', platform: 'Instagram' },
  { id: 4, img: frame247, client: 'Yomaak', title: 'Campaign Visual', platform: 'Instagram' },
  { id: 5, img: frame204, client: 'Yomaak', title: 'Brand Design',    platform: 'Instagram' },
  { id: 6, img: waImg1,   client: 'Yomaak', title: 'Social Post',     platform: 'Instagram' },
  { id: 7, img: waImg2,   client: 'Yomaak', title: 'Content Design',  platform: 'Instagram' },
  { id: 8, img: imagePng, client: 'Yomaak', title: 'Visual Design',   platform: 'Instagram' },
];

const VIMEO_REELS = [
  { id: 1, videoId: '1184494039', title: 'High Cost Traveling', meta: 'AI Production' },
  { id: 2, videoId: '1184494085', title: 'Client Hunt',         meta: 'AI Production' },
  { id: 3, videoId: '1184488919', title: 'Teaser Camping',      meta: '01' },
  { id: 4, videoId: '1184489028', title: 'Teaser Camping',      meta: '02' },
  { id: 5, videoId: '1184489090', title: 'Teaser Camping',      meta: '03' },
  { id: 6, videoId: '1184489303', title: 'Teaser Camping',      meta: '04' },
  { id: 7, videoId: '1184493480', title: 'Teaser Camping',      meta: '05' },
  { id: 8, videoId: '1184493501', title: 'Teaser Camping',      meta: '06' },
  { id: 9, videoId: '1184494025', title: 'Eid Celebration',     meta: '' },
];

type Post     = typeof POSTS[0];
type VimeoReel = typeof VIMEO_REELS[0];

/* ─────────────────────────── IMAGE MODAL ─────────────────────────── */

function ImageModal({ post, onClose }: { post: Post; onClose: () => void }) {
  /* Close on ESC */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 16, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', maxWidth: 460, width: '88vw', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={post.img}
          alt={post.title}
          style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '90vh', objectFit: 'contain' }}
        />
        {/* Info overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '40px 20px 20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
        }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, color: '#F0EDE6', letterSpacing: '0.04em', lineHeight: 1 }}>
            {post.title}
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#666', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {post.platform} · {post.client}
          </div>
        </div>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 10, right: 10, zIndex: 10,
            background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: 9,
            letterSpacing: '0.1em', padding: '6px 12px', cursor: 'none',
            transition: 'background 200ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
        >
          ✕ close
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── VIMEO REEL CARD ─────────────────────────── */

function VimeoReelCard({ reel }: { reel: VimeoReel }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        position: 'relative', width: 270, height: 480, flexShrink: 0,
        overflow: 'hidden', background: '#0D0D0D', cursor: 'none',
        transform: !playing && hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (!playing) setPlaying(true); }}
    >
      {playing ? (
        /* ── Inline embed ── */
        <div style={{ position: 'absolute', inset: 0 }}>
          <iframe
            src={`https://player.vimeo.com/video/${reel.videoId}?autoplay=1&title=0&byline=0&portrait=0`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={reel.title}
          />
          <button
            onClick={e => { e.stopPropagation(); setPlaying(false); }}
            style={{
              position: 'absolute', top: 8, left: 8, zIndex: 20,
              background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFF', width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Mono, monospace', fontSize: 10,
              backdropFilter: 'blur(6px)', cursor: 'none',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
            title="Stop"
          >
            ✕
          </button>
        </div>
      ) : (
        /* ── Thumbnail ── */
        <>
          <VimeoThumb
            videoId={reel.videoId}
            alt={reel.title}
            imgStyle={{ filter: hovered ? 'brightness(0.45)' : 'brightness(0.3)' }}
          />

          {/* Border */}
          <div style={{
            position: 'absolute', inset: 0,
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
            transition: 'border-color 300ms ease', pointerEvents: 'none',
          }} />

          {/* Corner accents */}
          <div style={{ position: 'absolute', top: 10, left:  10, width: 14, height: 14, borderTop: '1px solid #444', borderLeft:  '1px solid #444' }} />
          <div style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '1px solid #444', borderRight: '1px solid #444' }} />
          <div style={{ position: 'absolute', bottom: 10, left:  10, width: 14, height: 14, borderBottom: '1px solid #444', borderLeft:  '1px solid #444' }} />
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: 14, height: 14, borderBottom: '1px solid #444', borderRight: '1px solid #444' }} />

          {/* Title slides in from top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '20px 16px 32px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, transparent 100%)',
            transform: hovered ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: '#F0EDE6', letterSpacing: '0.04em', lineHeight: 1 }}>
              {reel.title}
            </div>
            {reel.meta && (
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 5 }}>
                {reel.meta}
              </div>
            )}
          </div>

          {/* Play button */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{
              width: hovered ? 72 : 58, height: hovered ? 72 : 58,
              borderRadius: '50%',
              border: `1.5px solid rgba(255,255,255,${hovered ? 0.8 : 0.3})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(4px)',
              transition: 'all 350ms cubic-bezier(0.16,1,0.3,1)',
            }}>
              <svg viewBox="0 0 20 20" width={hovered ? 22 : 17} height={hovered ? 22 : 17} fill="none" style={{ marginLeft: 3 }}>
                <path d="M5 3.5L16.5 10L5 16.5V3.5Z" fill="white" />
              </svg>
            </div>
          </div>

          {/* Vimeo badge */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '28px 14px 14px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            transform: hovered ? 'translateY(0)' : 'translateY(60%)',
            opacity: hovered ? 1 : 0,
            transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1), opacity 350ms ease',
            pointerEvents: 'none',
          }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Vimeo · Click to Play
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────── POST CARD (straight grid) ─────────────────── */

function PostCard({ post, onClick }: { post: Post; onClick: (p: Post) => void }) {
  const [hovered, setHovered] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  return (
    <div
      style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', cursor: 'none', background: '#111' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(post)}
    >
      {/* Skeleton shimmer — visible until image loads */}
      {!loaded && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(90deg, #151515 25%, #222 50%, #151515 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}
        />
      )}

      {/* Image */}
      <img
        src={post.img}
        alt={post.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          opacity: loaded ? 1 : 0,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          filter: hovered ? 'brightness(0.6)' : 'brightness(0.92)',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1), filter 350ms ease, opacity 400ms ease',
        }}
      />
      {/* Index */}
      <div style={{
        position: 'absolute', top: 10, left: 10, zIndex: 2,
        fontFamily: 'Space Mono, monospace', fontSize: 8,
        color: 'rgba(240,237,230,0.3)', letterSpacing: '0.05em',
        opacity: hovered ? 0 : 1, transition: 'opacity 200ms ease',
      }}>
        {String(post.id).padStart(2, '0')}
      </div>
      {/* Hover overlay: gradient + title */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 300ms ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '14px',
        pointerEvents: 'none',
      }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: '#F0EDE6', letterSpacing: '0.04em', lineHeight: 1 }}>
          {post.title}
        </div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#888', marginTop: 4, letterSpacing: '0.08em' }}>
          {post.platform}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN SECTION ─────────────────────────── */

export function SocialMedia() {
  const reelsRef = useRef<HTMLDivElement>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);

  /* Horizontal scroll hijack for reels row */
  useEffect(() => {
    const el = reelsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const atStart = el.scrollLeft === 0 && e.deltaY < 0;
      const atEnd   = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 && e.deltaY > 0;
      if (!atStart && !atEnd) { e.preventDefault(); el.scrollLeft += e.deltaY; }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const openPost = useCallback((p: Post) => setActivePost(p), []);

  return (
    <>
      {/* ── Image modal ── */}
      <AnimatePresence>
        {activePost && <ImageModal post={activePost} onClose={() => setActivePost(null)} />}
      </AnimatePresence>

      <section
        id="social"
        style={{
          background: '#0D0D0D',
          padding: '120px 0',
          backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* ── Header ── */}
        <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              02 / Content
            </span>
            <div style={{ flex: 1, height: 1, background: '#222' }} />
          </div>

          <div className="flex items-end justify-between mb-16 gap-4 flex-wrap">
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 7vw, 96px)', color: '#F0EDE6', letterSpacing: '-0.01em', lineHeight: 0.9, margin: 0, fontWeight: 400 }}>
              <SplitText text="CONTENT THAT" stagger={40} />
              <br />
              <SplitText text="STOPS THE SCROLL" stagger={40} delay={100} />
            </h2>
            <p className="max-w-xs" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 15, color: '#555555', lineHeight: 1.6 }}>
              Social media design, motion reels, and content that connects brands with their audiences.
            </p>
          </div>
        </div>

        {/* ══════════ GRAPHICS ══════════ */}
        <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Graphics
            </span>
            <div style={{ flex: 1, height: 1, background: '#1E1E1E' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#2A2A2A', letterSpacing: '0.1em' }}>
              {POSTS.length} posts
            </span>
          </div>

          {/* Clean straight grid — responsive columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {POSTS.map(post => (
              <PostCard key={post.id} post={post} onClick={openPost} />
            ))}
          </div>
        </div>

        {/* ══════════ REELS ══════════ */}
        <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto mt-14 mb-6">
          <div className="flex items-center gap-4">
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Reels
            </span>
            <div style={{ flex: 1, height: 1, background: '#1E1E1E' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#2A2A2A', letterSpacing: '0.1em' }}>
              {VIMEO_REELS.length} videos
            </span>
          </div>
        </div>

        {/* Reels horizontal scroll */}
        <div
          ref={reelsRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ paddingLeft: '4vw', paddingRight: '4vw', scrollbarWidth: 'none', msOverflowStyle: 'none', alignItems: 'flex-start' }}
        >
          {VIMEO_REELS.map(reel => (
            <VimeoReelCard key={reel.id} reel={reel} />
          ))}
        </div>

      </section>
    </>
  );
}