import { useState, useEffect } from 'react';
import './ScrollProgress.css';

/**
 * Reading progress indicator — thin gradient bar at the very top of the page
 * that fills from 0% to 100% as the user scrolls.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;

        if (docHeight <= winHeight) {
          setProgress(0);
          setVisible(false);
          return;
        }

        const pct = Math.min((scrollTop / (docHeight - winHeight)) * 100, 100);
        setProgress(pct);
        setVisible(pct > 0.5);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={`scroll-progress ${visible ? 'sp-visible' : ''}`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
