import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import logoSrc from '../../imports/logo.png';

interface CaseNavProps {
  title: string;
}

export function CaseNav({ title }: CaseNavProps) {
  const navigate = useNavigate();
  const [logoRotation, setLogoRotation] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLogoRotation(r => r + 360), 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
        height: 64,
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1E1E1E',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
      }}
    >
      {/* Logo — left anchor */}
      <motion.div
        style={{ cursor: 'pointer', width: 24, height: 24, flexShrink: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate('/')}
      >
        <motion.img
          src={logoSrc}
          alt="Mustafa Studio"
          animate={{ rotate: logoRotation }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: 24, height: 24, display: 'block' }}
        />
      </motion.div>

      {/* Centre label — absolutely positioned so it never crowds the logo */}
      <span
        className="hidden md:block"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Space Mono, monospace',
          fontSize: 10,
          color: '#333',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        Case Study — {title}
      </span>

      {/* Right links */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 24 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'color 200ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          Portfolio
        </button>
        <a
          href="mailto:mr.3abkr@gmail.com"
          className="hidden md:inline"
          style={{
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'color 200ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          Email
        </a>
        <a
          href="https://linkedin.com/in/moustafa-abdelmoneim"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline"
          style={{
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'color 200ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
