import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const [expanded, setExpanded] = useState(false);
  const [label, setLabel] = useState('');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest('.project-card')) {
        setExpanded(true);
        setLabel('VIEW →');
      } else if (t.closest('a, button, [role="button"], input, textarea')) {
        setExpanded(true);
        setLabel('');
      }
    };

    const onOut = () => {
      setExpanded(false);
      setLabel('');
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Lagging circle */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          width: expanded ? 44 : 12,
          height: expanded ? 44 : 12,
          border: '1.5px solid #000000',
          borderRadius: '50%',
          transition: 'width 200ms cubic-bezier(0.16,1,0.3,1), height 200ms cubic-bezier(0.16,1,0.3,1)',
          top: 0,
          left: 0,
        }}
      >
        {label && (
          <span
            className="text-center leading-none"
            style={{
              color: '#000000',
              fontSize: 7,
              fontFamily: 'Space Mono, monospace',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        )}
      </div>
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 4,
          height: 4,
          background: '#000000',
          borderRadius: '50%',
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}