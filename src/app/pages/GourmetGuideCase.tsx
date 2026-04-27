import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG_HERO   = 'https://images.unsplash.com/photo-1482148829819-e32810d7e13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600&q=80';
const IMG_FOOD   = 'https://images.unsplash.com/photo-1768051313568-b35886b9a093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80';
const IMG_KITCHEN = 'https://images.unsplash.com/photo-1744104135578-6768f2061be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80';

const TAGS = ['UX Research', 'UI Design', 'Figma', 'Prototyping & Testing', 'Interaction Design'];

const PROBLEMS = [
  {
    icon: '🎯',
    title: 'Lack of Personalization',
    desc: 'Users receive generic recipe suggestions that don\'t align with their dietary preferences, cooking skills, or available ingredients.',
  },
  {
    icon: '🤔',
    title: 'Overwhelming Interface',
    desc: 'Cluttered layouts and inefficient search functions make it difficult for users to explore and save recipes effortlessly.',
  },
  {
    icon: '🔄',
    title: 'Inconsistent User Flow',
    desc: 'Disjointed navigation and unclear pathways cause users to drop off before finding what they need.',
  },
];

const STATS = [
  { value: '74%', label: 'of users found it frustrating when recipes had missing or unclear steps.' },
  { value: '68%', label: 'of users wanted an ingredient-based search to match what they already had at home.' },
  { value: '85%', label: 'mentioned issues with outdated tracking methods, causing overstocking or stockouts.' },
];

const PERSONAS = [
  {
    emoji: '🏙️',
    name: 'Emma',
    subtitle: 'The Busy Professional',
    age: '28 · Marketing Manager',
    challenges: [
      'Limited time to cook, often looking for quick and easy meal ideas.',
      'Struggles with meal planning and often resorts to takeout.',
      'Finds recipe apps overwhelming due to cluttered interfaces.',
    ],
    needs: [
      'A streamlined way to find quick and simple recipes.',
      'Personalized suggestions based on available ingredients.',
      'A minimalist and easy-to-navigate interface.',
    ],
  },
  {
    emoji: '🥗',
    name: 'Liam',
    subtitle: 'The Health-Conscious Foodie',
    age: '34 · Fitness Trainer',
    challenges: [
      'Difficulty finding recipes that align with specific diet plans.',
      'Frustrated by the lack of nutritional insights in most recipe apps.',
      'Wants customized filtering for macros, calories, and meal types.',
    ],
    needs: [
      'A nutrition-focused recipe database.',
      'Smart filters to refine searches based on dietary preferences.',
      'Clear caloric and macronutrient breakdowns for every recipe.',
    ],
  },
  {
    emoji: '🍳',
    name: 'Sophia',
    subtitle: 'The Home Chef',
    age: '42 · Stay-at-Home Parent',
    challenges: [
      'Loves experimenting but struggles to organize saved recipes.',
      'Needs better ways to categorize and retrieve favorite meals.',
      'Prefers a community-driven experience with user reviews and tips.',
    ],
    needs: [
      'A bookmarking system with folders and tags.',
      'A space for user-generated content like cooking tips and ratings.',
      'An interactive community to exchange recipes and ideas.',
    ],
  },
];

const OUTCOMES = [
  'Enhanced discovery through smart filtering and recommendations.',
  'Intuitive navigation that improves user engagement.',
  'A community-driven experience to foster interaction and sharing.',
  'Tailored recipe discovery that respects dietary needs and skill levels.',
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !played) { setVisible(true); setPlayed(true); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [played]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-6 mb-12">
      <span style={{
        fontFamily: 'Space Mono, monospace', fontSize: 10,
        color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>
        {number} / {text}
      </span>
      <div style={{ flex: 1, height: 1, background: '#222' }} />
    </div>
  );
}

export function GourmetGuideCase() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#0A0A0A', color: '#F0EDE6' }}>

      {/* ── Sticky case-study nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-12"
        style={{
          height: 64,
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #222',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'none', border: 'none', cursor: 'none',
            color: '#555', fontFamily: 'Space Mono, monospace',
            fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            transition: 'color 200ms ease', padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <span style={{
          fontFamily: 'Space Mono, monospace', fontSize: 10,
          color: '#333', letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          Case Study — GourmetGuide
        </span>

        <div
          onClick={() => navigate('/')}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1.5px solid #FFFFFF', color: '#FFFFFF',
            fontFamily: 'Space Mono, monospace', fontSize: 13,
            letterSpacing: '-0.02em', cursor: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          MA
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={{ paddingTop: 64, position: 'relative', overflow: 'hidden' }}>
        <div style={{ aspectRatio: '21/9', position: 'relative' }}>
          <ImageWithFallback
            src={IMG_HERO}
            alt="GourmetGuide hero"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, #0A0A0A 100%)',
            }}
          />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 px-8 md:px-12 lg:px-16"
          style={{ paddingBottom: 60 }}
        >
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div className="flex flex-wrap gap-2 mb-6">
              {TAGS.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'Space Mono, monospace', fontSize: 9,
                    color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)',
                    padding: '4px 12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(60px, 9vw, 130px)',
              color: '#F0EDE6', lineHeight: 0.9,
              margin: '0 0 24px', fontWeight: 400, letterSpacing: '-0.01em',
            }}>
              GOURMET<br />GUIDE
            </h1>
            <div className="flex flex-wrap gap-10">
              {[
                { label: 'Role', value: 'Product Designer' },
                { label: 'Scope', value: 'Research · Interaction · Visual · Testing' },
                { label: 'Year', value: 'July 2024' },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 16, color: '#888', fontWeight: 400 }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto" style={{ paddingTop: 100, paddingBottom: 140 }}>

        {/* Overview */}
        <section style={{ marginBottom: 120 }}>
          <FadeIn>
            <SectionLabel number="01" text="Overview" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20,
                  color: '#888', lineHeight: 1.65, margin: '0 0 20px',
                }}>
                  GourmetGuide is a culinary app designed to help food enthusiasts discover new recipes,
                  plan meals, and connect with fellow food lovers.
                </p>
                <p style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: 17,
                  color: '#555', lineHeight: 1.65, margin: 0,
                }}>
                  The goal was to enhance user engagement and learning outcomes by redesigning the app's
                  interface and introducing features that foster personalized learning and collaboration.
                  The app targets home cooks looking for inspiration, community, and clarity.
                </p>
              </div>
              <div style={{ borderLeft: '1px solid #1E1E1E', paddingLeft: 40 }}>
                <div style={{
                  fontFamily: 'Space Mono, monospace', fontSize: 9,
                  color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20,
                }}>
                  Design Focus
                </div>
                {[
                  'Personalized recipe discovery',
                  'Ingredient-based smart search',
                  'Nutritional transparency',
                  'Community-driven content',
                  'Clean, minimal navigation',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                    style={{ marginBottom: 14 }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 16, color: '#666' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Hero image */}
        <FadeIn>
          <div style={{ marginBottom: 120, borderRadius: 2, overflow: 'hidden' }}>
            <ImageWithFallback
              src={IMG_FOOD}
              alt="GourmetGuide visual"
              className="w-full object-cover"
              style={{ filter: 'brightness(0.7) grayscale(15%)', maxHeight: 520 }}
            />
          </div>
        </FadeIn>

        {/* The Problem */}
        <section style={{ marginBottom: 120 }}>
          <FadeIn>
            <SectionLabel number="02" text="The Problem" />
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20,
              color: '#888', lineHeight: 1.65, maxWidth: 680, marginBottom: 60,
            }}>
              Many users struggle with finding recipes that align with their dietary needs, cooking skills,
              and available ingredients. Existing apps often lack personalization, easy navigation, and
              clear organization — leading to frustration and abandoned searches.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#1E1E1E' }}>
            {PROBLEMS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 80}>
                <div style={{ background: '#0A0A0A', padding: '40px 36px' }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{p.icon}</div>
                  <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20,
                    color: '#F0EDE6', fontWeight: 600, marginBottom: 12,
                  }}>
                    {p.title}
                  </div>
                  <p style={{
                    fontFamily: 'Barlow Condensed, sans-serif', fontSize: 15,
                    color: '#555', lineHeight: 1.6, margin: 0,
                  }}>
                    {p.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Research & Discovery */}
        <section style={{ marginBottom: 120 }}>
          <FadeIn>
            <SectionLabel number="03" text="Research & Discovery" />
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20,
              color: '#888', lineHeight: 1.65, maxWidth: 680, marginBottom: 60,
            }}>
              To better understand user behavior, we conducted user interviews, surveys, and competitive
              analysis — identifying pain points and opportunities for improvement.
            </p>
          </FadeIn>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ borderTop: '2px solid #FFFFFF', paddingTop: 24 }}>
                  <div style={{
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: 72,
                    color: '#F0EDE6', lineHeight: 1, marginBottom: 12,
                  }}>
                    {s.value}
                  </div>
                  <p style={{
                    fontFamily: 'Barlow Condensed, sans-serif', fontSize: 15,
                    color: '#555', lineHeight: 1.6, margin: 0,
                  }}>
                    {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ borderRadius: 2, overflow: 'hidden' }}>
              <ImageWithFallback
                src={IMG_KITCHEN}
                alt="Research visual"
                className="w-full object-cover"
                style={{ filter: 'brightness(0.55) grayscale(20%)', maxHeight: 420 }}
              />
            </div>
          </FadeIn>
        </section>

        {/* User Personas */}
        <section style={{ marginBottom: 120 }}>
          <FadeIn>
            <SectionLabel number="04" text="User Personas" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#1E1E1E' }}>
            {PERSONAS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 80}>
                <div style={{ background: '#0A0A0A', padding: '40px 32px', height: '100%' }}>
                  {/* Header */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{p.emoji}</div>
                    <div style={{
                      fontFamily: 'Bebas Neue, sans-serif', fontSize: 28,
                      color: '#F0EDE6', letterSpacing: '0.04em', marginBottom: 4,
                    }}>
                      {p.name}
                    </div>
                    <div style={{
                      fontFamily: 'Barlow Condensed, sans-serif', fontSize: 14,
                      color: '#888', fontWeight: 500, marginBottom: 2,
                    }}>
                      {p.subtitle}
                    </div>
                    <div style={{
                      fontFamily: 'Space Mono, monospace', fontSize: 9,
                      color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      {p.age}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 20, marginBottom: 20 }}>
                    <div style={{
                      fontFamily: 'Space Mono, monospace', fontSize: 9,
                      color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
                    }}>
                      Challenges
                    </div>
                    {p.challenges.map((c, ci) => (
                      <div key={ci} className="flex gap-2" style={{ marginBottom: 8 }}>
                        <span style={{ color: '#444', flexShrink: 0, marginTop: 2 }}>›</span>
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 14, color: '#555', lineHeight: 1.5 }}>{c}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{
                      fontFamily: 'Space Mono, monospace', fontSize: 9,
                      color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
                    }}>
                      Needs
                    </div>
                    {p.needs.map((n, ni) => (
                      <div key={ni} className="flex gap-2" style={{ marginBottom: 8 }}>
                        <span style={{ color: '#FFFFFF', flexShrink: 0, marginTop: 2 }}>✓</span>
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 14, color: '#666', lineHeight: 1.5 }}>{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Visual Design */}
        <section style={{ marginBottom: 120 }}>
          <FadeIn>
            <SectionLabel number="05" text="Branding & Visual Design" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <p style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20,
                  color: '#888', lineHeight: 1.65, marginBottom: 32,
                }}>
                  We established a modern and warm visual identity to create an inviting experience
                  that reflects the joy of cooking.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid #1E1E1E' }}>
                  {[
                    { label: 'Color Palette', desc: 'Earthy tones with vibrant accents to highlight call-to-actions.' },
                    { label: 'Typography', desc: 'Clean, readable sans-serif fonts for clarity and warmth.' },
                    { label: 'Iconography', desc: 'Custom illustrations for a friendly and engaging feel.' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{ borderBottom: '1px solid #1E1E1E', padding: '20px 0' }}
                    >
                      <div style={{
                        fontFamily: 'Barlow Condensed, sans-serif', fontSize: 17,
                        color: '#F0EDE6', fontWeight: 600, marginBottom: 4,
                      }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 15, color: '#555' }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Color swatches */}
              <div>
                <div style={{ marginBottom: 16, fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Palette
                </div>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {['#F5A623', '#E07B39', '#2D6A4F', '#1B3A2D', '#FFF8F0', '#3D2B1F'].map(c => (
                    <div key={c}>
                      <div style={{ height: 64, background: c, marginBottom: 6 }} />
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, color: '#444', letterSpacing: '0.05em' }}>{c}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 12, fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Type scale
                </div>
                {[
                  { size: '48px', label: 'Display', sample: 'GourmetGuide' },
                  { size: '24px', label: 'Heading', sample: 'Discover recipes' },
                  { size: '16px', label: 'Body', sample: 'Find what to cook tonight' },
                  { size: '12px', label: 'Caption', sample: 'Updated · 15 min ago' },
                ].map(t => (
                  <div key={t.label} className="flex items-baseline justify-between" style={{ borderBottom: '1px solid #1A1A1A', padding: '10px 0' }}>
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: t.size, color: '#F0EDE6', lineHeight: 1 }}>{t.sample}</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#333' }}>{t.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Results */}
        <section style={{ marginBottom: 0 }}>
          <FadeIn>
            <SectionLabel number="06" text="Results & Takeaways" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <p style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20,
                  color: '#888', lineHeight: 1.65, marginBottom: 40,
                }}>
                  Through in-depth research and iterative design, GourmetGuide was developed to address
                  real user pain points. The final design stands out by combining functionality,
                  personalization, and aesthetics.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {OUTCOMES.map((o, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span style={{
                        width: 24, height: 24, border: '1px solid #FFFFFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#FFFFFF',
                      }}>
                        ✓
                      </span>
                      <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 17, color: '#666', lineHeight: 1.5 }}>
                        {o}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                border: '1px solid #1E1E1E', padding: '40px 36px',
                background: '#0D0D0D',
              }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
                  Key Learnings
                </div>
                {[
                  'Personalization doesn\'t mean complexity — smart defaults remove friction.',
                  'Community features drive return usage more than feature quantity.',
                  'Clear visual hierarchy reduces cognitive load significantly.',
                  'Ingredient-first search solves the real "what do I cook?" problem.',
                ].map((l, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #1A1A1A', padding: '14px 0', display: 'flex', gap: 12 }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#333', flexShrink: 0, marginTop: 3 }}>0{i + 1}</span>
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 15, color: '#666', lineHeight: 1.5 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: '1px solid #1E1E1E', padding: '48px 0' }}>
        <div className="px-8 md:px-12 flex items-center justify-between flex-wrap gap-4">
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            GourmetGuide · 2024
          </span>
          <button
            onClick={() => navigate('/')}
            style={{
              fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#555',
              letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none',
              border: 'none', cursor: 'none', transition: 'color 200ms ease', padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>

    </div>
  );
}
