import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const EMAIL = 'moustafa_ab@outlook.com';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/moustafaabdelmoneim/' },
];

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: 11,
        color: '#777777',
        letterSpacing: '0.1em',
      }}
    >
      {time}
    </span>
  );
}

const linkStyle = {
  fontFamily: 'Space Mono, monospace',
  fontSize: 10,
  color: '#888888' as string,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  transition: 'color 200ms ease',
  cursor: 'none',
};

export function Footer() {
  const copyEmail = () => {
    const showToast = () =>
      toast('copied. now email me 📩', {
        style: {
          background: '#FFFFFF',
          color: '#0A0A0A',
          fontFamily: 'Space Mono, monospace',
          fontSize: 12,
          border: 'none',
          letterSpacing: '0.05em',
        },
      });

    // Try the modern Clipboard API first; fall back to execCommand for
    // sandboxed environments where clipboard-write is policy-blocked.
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(showToast).catch(() => {
        legacyCopy(EMAIL);
        showToast();
      });
    } else {
      legacyCopy(EMAIL);
      showToast();
    }
  };

  return (
    <footer
      id="contact"
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid #222222',
        paddingTop: 56,
        paddingBottom: 40,
      }}
    >
      <div className="px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto">

        {/* ── DESKTOP layout (md+) ── */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* Left: name + tagline */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: '#F0EDE6', letterSpacing: '0.05em', fontWeight: 400 }}>
              MOUSTAFA ABDELMONEIM
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#666666', letterSpacing: '0.1em', marginTop: 4 }}>
              Making things move since 2019
            </div>
          </div>

          {/* Center: social links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={linkStyle}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#FFFFFF')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#888888')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: clock + email + location */}
          <div className="flex flex-col items-end gap-2">
            <LiveClock />
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#888888', letterSpacing: '0.1em' }}>
              {EMAIL}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#777777', letterSpacing: '0.05em' }}>
              Istanbul, TR · UTC+3
            </div>
          </div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex md:hidden flex-col">

          {/* Row 1: name (left) + clock/location (right) */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: '#F0EDE6', letterSpacing: '0.05em', fontWeight: 400 }}>
                MOUSTAFA ABDELMONEIM
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#666666', letterSpacing: '0.1em', marginTop: 4 }}>
                Making things move since 2019
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <LiveClock />
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#777777', letterSpacing: '0.05em' }}>
                Istanbul, TR
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#1A1A1A', margin: '20px 0' }} />

          {/* Row 2: email */}
          <div
            style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#888888', letterSpacing: '0.1em', cursor: 'pointer' }}
            onClick={copyEmail}
          >
            {EMAIL}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#1A1A1A', margin: '20px 0' }} />

          {/* Row 3: social links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{ ...linkStyle, cursor: 'auto' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright — both layouts */}
        <div style={{ height: 1, background: '#1A1A1A', marginTop: 40, marginBottom: 24 }} />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#666666', letterSpacing: '0.1em' }}>
            © 2024 MOUSTAFA ABDELMONEIM. ALL RIGHTS RESERVED.
          </span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#666666', letterSpacing: '0.1em' }}>
            DESIGN & MOTION
          </span>
        </div>
      </div>
    </footer>
  );
}

function legacyCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}