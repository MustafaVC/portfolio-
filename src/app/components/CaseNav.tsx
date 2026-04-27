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
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-12"
      style={{
        height: 64,
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1E1E1E',
      }}
    >
      {/* Logo */}
      <motion.div
        style={{ cursor: 'pointer', width: 36, height: 36 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate('/')}
      >
        <motion.img
          src={logoSrc}
          alt="Mustafa Studio"
          animate={{ rotate: logoRotation }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: 36, height: 36, display: 'block' }}
        />
      </motion.div>

      {/* Centre label */}
      <span style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: 10,
        color: '#333',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        Case Study — {title}
      </span>

      {/* Right links */}
      <div className="flex items-center gap-6">
        {[
          { label: 'Portfolio', action: () => navigate('/') },
          { label: 'Email', href: 'mailto:mr.3abkr@gmail.com' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/moustafa-abdelmoneim' },
        ].map(({ label, action, href }) =>
          action ? (
            <button
              key={label}
              onClick={action}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontFamily: 'Space Mono, monospace', fontSize: 10,
                color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'color 200ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}
            >
              {label}
            </button>
          ) : (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Space Mono, monospace', fontSize: 10,
                color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'color 200ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}
            >
              {label}
            </a>
          )
        )}
      </div>
    </nav>
  );
}
