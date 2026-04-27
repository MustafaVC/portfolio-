import { createBrowserRouter, Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { ScrollProgress } from './components/ScrollProgress';
import { SmoothScroll } from './components/SmoothScroll';
import { Home } from './pages/Home';
import { CaseStudyPage } from './pages/CaseStudyPage';

const GLOBAL_STYLES = `
  ::-webkit-scrollbar { display: none; }
  * { scrollbar-width: none; }

  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.6); opacity: 0.5; }
  }

  @keyframes wobble {
    0%, 100% { transform: rotate(0deg) scale(1.02); }
    25%       { transform: rotate(-2deg) scale(1.02); }
    75%       { transform: rotate(2deg) scale(1.02); }
  }

  @keyframes scroll-line {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
    50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    51%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes glitch-r {
    0%   { clip-path: inset(0 0 95% 0); transform: translateX(3px); }
    20%  { clip-path: inset(30% 0 50% 0); transform: translateX(-3px); }
    40%  { clip-path: inset(70% 0 10% 0); transform: translateX(3px); }
    60%  { clip-path: inset(10% 0 80% 0); transform: translateX(-2px); }
    80%  { clip-path: inset(50% 0 30% 0); transform: translateX(2px); }
    100% { clip-path: inset(0 0 95% 0); transform: translateX(3px); }
  }

  @keyframes glitch-g {
    0%   { clip-path: inset(50% 0 10% 0); transform: translateX(-3px); }
    25%  { clip-path: inset(5% 0 70% 0);  transform: translateX(2px); }
    50%  { clip-path: inset(80% 0 5% 0);  transform: translateX(-2px); }
    75%  { clip-path: inset(20% 0 60% 0); transform: translateX(3px); }
    100% { clip-path: inset(50% 0 10% 0); transform: translateX(-3px); }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

function RootLayout() {
  return (
    <div style={{ background: '#0A0A0A', color: '#F0EDE6', minHeight: '100vh' }}>
      <style>{GLOBAL_STYLES}</style>
      <SmoothScroll />
      <ScrollProgress />
      <Outlet />
      <Toaster position="bottom-center" />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'case-study/:slug', Component: CaseStudyPage },
    ],
  },
]);