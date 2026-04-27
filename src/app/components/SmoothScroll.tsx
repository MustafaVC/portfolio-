import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,           // frame-by-frame interpolation — responds instantly to direction changes
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Recalculate scroll height whenever the page content changes (e.g. accordion opens)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    // Also recalculate when an accordion finishes its open/close animation
    // (ResizeObserver alone can miss the final settled height)
    const onAccordionResize = () => {
      lenis.resize();
      // Belt-and-suspenders: call again on the next two frames to catch any layout flush
      requestAnimationFrame(() => lenis.resize());
      requestAnimationFrame(() => requestAnimationFrame(() => lenis.resize()));
    };
    window.addEventListener('accordion:resize', onAccordionResize);

    // Wire Lenis into anchor hash links so navbar smooth-scroll still works
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.6 });
    };
    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
      document.removeEventListener('click', handleClick);
      window.removeEventListener('accordion:resize', onAccordionResize);
    };
  }, []);

  return null;
}