import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SectionAccordionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SectionAccordion({ number, title, children, defaultOpen = false }: SectionAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        borderTop: '1px solid #1E1E1E',
      }}
    >
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full flex items-center justify-between"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '28px 64px',
          transition: 'background 250ms ease',
          backgroundColor: hovered ? 'rgba(255,255,255,0.02)' : 'transparent',
        }}
      >
        {/* Left: number + title */}
        <div className="flex items-center gap-8">
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              color: '#333333',
              letterSpacing: '0.15em',
            }}
          >
            {number}
          </span>
          <span
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(22px, 3vw, 32px)',
              color: open ? '#888888' : '#555555',
              letterSpacing: '0.08em',
              transition: 'color 300ms ease',
            }}
          >
            {title}
          </span>
        </div>

        {/* Right: open/close indicator */}
        <div
          style={{
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'block',
              fontFamily: 'Space Mono, monospace',
              fontSize: 20,
              color: '#444444',
              lineHeight: 1,
              transformOrigin: 'center',
              userSelect: 'none',
            }}
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
            onAnimationComplete={() => {
              window.dispatchEvent(new CustomEvent('accordion:resize'));
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}