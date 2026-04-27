import { useEffect, useRef, useState } from 'react';

/**
 * Lazily fetches a Vimeo video thumbnail via the public oEmbed API.
 * The fetch is deferred until the element scrolls into view (rootMargin 400px).
 * Falls back to a dark dot-grid skeleton while loading.
 */
export function VimeoThumb({
  videoId,
  alt = 'video thumbnail',
  imgStyle,
  onLoaded,
}: {
  videoId: string;
  alt?: string;
  imgStyle?: React.CSSProperties;
  onLoaded?: (src: string) => void;
}) {
  const [src, setSrc]  = useState<string | null>(null);
  const wrapRef        = useRef<HTMLDivElement>(null);
  const fetched        = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetched.current) {
          fetched.current = true;
          io.disconnect();
          fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`)
            .then(r => r.json())
            .then(d => {
              if (d.thumbnail_url) {
                setSrc(d.thumbnail_url);
                onLoaded?.(d.thumbnail_url);
              }
            })
            .catch(() => {/* silently fail — skeleton stays */});
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoId, onLoaded]);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transition: 'filter 300ms ease',
            ...imgStyle,
          }}
        />
      ) : (
        /* Dark skeleton while thumbnail is loading */
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1C1C1C 0%, #080808 100%)' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, #282828 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }} />
        </div>
      )}
    </div>
  );
}