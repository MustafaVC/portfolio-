import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import yomaakThumbnail from '../../imports/image-2.png';

/* ─────────────────────────── DATA ─────────────────────────── */

interface Website {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  tags: string[];
  year: string;
}

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  tags: string[];
  desc: string;
  img: string;
}

const WEBSITES: Website[] = [
  {
    id: 'palette',
    title: 'Palette Animation Studio',
    subtitle: 'Website Design',
    url: 'https://www.palette.studio/',
    displayUrl: 'palette.studio',
    tags: ['Web Design', 'Branding', 'Figma'],
    year: '2024',
  },
  {
    id: 'tark',
    title: 'TARK Engineering Agency',
    subtitle: 'Website Design',
    url: 'https://agate-impact-58975071.figma.site/',
    displayUrl: 'tark-engineering.figma.site',
    tags: ['Web Design', 'UI/UX', 'Figma'],
    year: '2024',
  },
];

const PROJECTS: Project[] = [
  {
    slug: 'yomaak',
    title: 'Yomaak',
    subtitle: 'B2B Marketplace MCP App — Case Study',
    client: 'Self-Initiated',
    year: '2026',
    tags: ['Product Design', 'MCP App', 'React', 'Arabic-First'],
    desc: 'A B2B marketplace that lives inside Claude. Built to explore what AI-native commerce design looks like when a designer starts from the constraints.',
    img: yomaakThumbnail,
  },
  {
    slug: 'gourmetguide',
    title: 'GourmetGuide',
    subtitle: 'Culinary Discovery App — Case Study',
    client: 'Personal Project',
    year: '2024',
    tags: ['UX Research', 'UI Design', 'Figma', 'Prototyping'],
    desc: 'A culinary app redesign focused on personalized recipe discovery, smart ingredient search, and community-driven cooking experiences.',
    img: 'https://images.unsplash.com/photo-1482148829819-e32810d7e13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80',
  },
];

/* ─────────────────────────── SHARED UI ─────────────────────────── */

function TagBadge({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span style={{
      display: 'inline-block',
      border: `1px solid ${muted ? '#2A2A2A' : '#FFFFFF'}`,
      color: muted ? '#3A3A3A' : '#FFFFFF',
      fontFamily: 'Space Mono, monospace',
      fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: '4px 10px',
    }}>
      {label}
    </span>
  );
}

/* ─────────────────────────── WEBSITE CARD ─────────────────────────── */

function WebsiteCard({ site }: { site: Website }) {
  const [hovered,    setHovered]    = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.42);

  /* Only load the iframe once the card enters the viewport */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); io.disconnect(); } },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Keep iframe scale in sync with card width */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{
        background: '#0D0D0D',
        border: '1px solid #1E1E1E',
        overflow: 'hidden',
        transition: 'border-color 300ms ease',
        borderColor: hovered ? '#333' : '#1E1E1E',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Browser chrome */}
      <div style={{
        height: 36, background: '#161616', borderBottom: '1px solid #222',
        display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 5 }}>
          {['#333', '#333', '#333'].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        {/* URL bar */}
        <div style={{
          flex: 1, background: '#1E1E1E', height: 22, borderRadius: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 10px', margin: '0 6px',
        }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.03em' }}>
            {site.displayUrl}
          </span>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ color: '#555', textDecoration: 'none', fontSize: 11, lineHeight: 1, cursor: 'pointer', transition: 'color 200ms ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
            title={`Open ${site.title}`}
          >
            ↗
          </a>
        </div>
      </div>

      {/* Live iframe preview */}
      <div
        ref={containerRef}
        style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}
      >
        {shouldLoad && (
          <iframe
            src={site.url}
            title={`${site.title} preview`}
            style={{
              width: 1440,
              height: 810,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              border: 'none',
              display: 'block',
              pointerEvents: 'none',
            }}
            tabIndex={-1}
            aria-hidden="true"
          />
        )}
        {/* Overlay: dark by default, fades on hover to reveal live preview */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(10,10,10,0.08)' : 'rgba(10,10,10,0.62)',
          transition: 'background 450ms ease',
          pointerEvents: 'none',
        }} />
        {/* Hover label */}
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          fontFamily: 'Space Mono, monospace', fontSize: 8,
          color: hovered ? '#555' : 'transparent',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          transition: 'color 300ms ease',
        }}>
          Live Preview
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '22px 24px' }}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace', fontSize: 9,
              color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5,
            }}>
              {site.subtitle} · {site.year}
            </div>
            <h3 style={{
              fontFamily: 'Bebas Neue, sans-serif', fontSize: 26,
              color: '#F0EDE6', margin: 0, fontWeight: 400, letterSpacing: '0.04em',
              transition: 'color 200ms ease',
            }}>
              {site.title}
            </h3>
          </div>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontFamily: 'Space Mono, monospace', fontSize: 9,
              color: hovered ? '#FFFFFF' : '#333',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none', cursor: 'pointer', flexShrink: 0, marginTop: 4,
              transition: 'color 250ms ease',
              border: `1px solid ${hovered ? '#FFFFFF' : '#2A2A2A'}`,
              padding: '6px 12px',
            }}
          >
            Open Site →
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {site.tags.map(t => <TagBadge key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── PROJECT CARD ─────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/case-study/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0D0D0D',
        border: `1px solid ${hovered ? '#333' : '#1E1E1E'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 300ms ease',
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '21/7', overflow: 'hidden', position: 'relative' }}>
        <ImageWithFallback
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{
            filter: hovered ? 'brightness(0.45) grayscale(10%)' : 'brightness(0.28) grayscale(20%)',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'filter 500ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Hover CTA */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 300ms ease',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase',
            border: '1px solid #FFFFFF', padding: '10px 24px',
            background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(4px)',
          }}>
            View Case Study →
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '28px 32px' }}>
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace', fontSize: 10,
              color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6,
            }}>
              {project.client} · {project.year}
            </div>
            <h3 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(28px, 3vw, 40px)',
              color: '#F0EDE6', letterSpacing: '0.04em',
              margin: 0, fontWeight: 400,
            }}>
              {project.title}
              <span style={{
                fontFamily: 'Space Mono, monospace', fontSize: 9,
                color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase',
                border: '1px solid #FFFFFF', padding: '3px 8px',
                marginLeft: 14, verticalAlign: 'middle', position: 'relative', top: -2,
              }}>
                Featured
              </span>
            </h3>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 15, color: '#444', marginTop: 4 }}>
              {project.subtitle}
            </div>
          </div>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: 18,
            color: hovered ? '#FFFFFF' : '#2A2A2A',
            transition: 'color 250ms ease, transform 250ms ease',
            transform: hovered ? 'translateX(4px)' : 'none',
            display: 'inline-block', marginTop: 4,
          }}>
            →
          </span>
        </div>

        <p style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontSize: 15,
          color: '#444', lineHeight: 1.6, margin: '0 0 16px', maxWidth: 640,
        }}>
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map(t => <TagBadge key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── SECTION ─────────────────────────── */

export function UIDesign() {
  return (
    <section style={{ background: '#0A0A0A', padding: '80px 0 100px' }}>
      <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-6 mb-10">
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: 11,
            color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            01 / Products
          </span>
          <div style={{ flex: 1, height: 1, background: '#222' }} />
        </div>

        {/* Heading */}
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(40px, 6vw, 80px)',
            color: '#F0EDE6', letterSpacing: '-0.01em',
            lineHeight: 0.9, margin: 0, fontWeight: 400,
          }}>
            RESEARCH.<br />DESIGN.<br />DELIVER.
          </h2>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: 16,
            color: '#444', lineHeight: 1.6, maxWidth: 360, margin: 0,
          }}>
            End-to-end product design — from discovery and research to high-fidelity interfaces and tested prototypes.
          </p>
        </div>

        {/* ── Live Websites ── */}
        <div className="flex items-center gap-4 mb-5">
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Live Websites
          </span>
          <div style={{ flex: 1, height: 1, background: '#1E1E1E' }} />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 mb-2"
          style={{ gap: 2 }}
        >
          {WEBSITES.map(site => (
            <WebsiteCard key={site.id} site={site} />
          ))}
        </div>

        {/* ── Case Studies ── */}
        <div className="flex items-center gap-4 mb-5 mt-10">
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Case Studies
          </span>
          <div style={{ flex: 1, height: 1, background: '#1E1E1E' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {PROJECTS.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}