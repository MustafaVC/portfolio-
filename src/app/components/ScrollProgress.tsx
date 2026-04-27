import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed right-0 top-0 z-50 pointer-events-none"
      style={{ width: 2, height: '100vh', background: '#1A1A1A' }}
    >
      <div
        style={{
          width: '100%',
          height: `${progress * 100}%`,
          background: '#FFFFFF',
          transition: 'height 0.1s linear',
        }}
      />
    </div>
  );
}