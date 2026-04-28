import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import logoSrc from '../../imports/logo.png';

const links = ['Work', 'About', 'Contact'];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setLogoRotation(r => r + 360), 10000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (label: string) => {
    const idMap: Record<string, string> = {
      Work:    'work',
      About:   'about',
      Contact: 'contact',
    };
    const id = idMap[label];
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    // getBoundingClientRect gives position relative to viewport.
    // Add window.scrollY for absolute doc position, then subtract navbar height.
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-12"
      style={{
        height: 64,
        background: scrolled ? 'rgba(10,10,10,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 400ms ease, backdrop-filter 400ms ease',
        borderBottom: scrolled ? '1px solid #222222' : 'none',
      }}
    >
      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ cursor: 'pointer', width: 24, height: 24 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <motion.img
          src={logoSrc}
          alt="Mustafa Studio"
          animate={{ rotate: logoRotation }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: 24, height: 24, display: 'block' }}
        />
      </motion.div>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        {links.map((link, i) => (
          <motion.button
            key={link}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollTo(link)}
            className="relative group"
            style={{
              color: '#555555',
              fontFamily: 'Space Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555555')}
          >
            {link}
            <span
              className="absolute -bottom-0.5 left-0 h-px bg-[#FFFFFF] transition-all duration-300"
              style={{ width: 0 }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.width = '100%')}
            />
          </motion.button>
        ))}
      </div>
    </nav>
  );
}