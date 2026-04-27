import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = '', style = {}, delay = 0, stagger = 50 }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger animation on mount instead of via IntersectionObserver.
  // IntersectionObserver fires while the element is inside a height:0 accordion
  // and sees it as non-intersecting, leaving text permanently hidden.
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const chars = text.split('');

  return (
    <span ref={ref} className={className} style={{ ...style, display: 'inline-block' }}>
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: visible ? 'translateY(0)' : 'translateY(60px)',
            opacity: visible ? 1 : 0,
            transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, opacity 700ms ease ${delay + i * stagger}ms`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}