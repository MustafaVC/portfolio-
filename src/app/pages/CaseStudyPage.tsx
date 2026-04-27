import { useParams, useNavigate } from 'react-router';
import { GourmetGuideCase } from './GourmetGuideCase';
import { YomaakCase } from './YomaakCase';

function ComingSoon({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: '#0A0A0A', color: '#F0EDE6',
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 24,
        padding: '0 24px',
      }}
    >
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Case Study
      </span>
      <h1 style={{
        fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)',
        color: '#F0EDE6', textAlign: 'center', margin: 0, fontWeight: 400,
      }}>
        {title}
      </h1>
      <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 18, color: '#444', textAlign: 'center' }}>
        This case study is being prepared. Check back soon.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#555',
          letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none',
          border: '1px solid #333', cursor: 'none', padding: '12px 28px',
          transition: 'border-color 200ms ease, color 200ms ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#FFFFFF';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#333';
          e.currentTarget.style.color = '#555';
        }}
      >
        ← Back to Portfolio
      </button>
    </div>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();

  switch (slug) {
    case 'yomaak':
      return <YomaakCase />;
    case 'gourmetguide':
      return <GourmetGuideCase />;
    default:
      return <ComingSoon title={slug?.replace(/-/g, ' ').toUpperCase() ?? 'Project'} />;
  }
}
