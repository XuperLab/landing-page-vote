import { useState, useEffect, useRef } from 'react';

/**
 * Animated counter that counts from 0 to `end` over 2 seconds
 * when the element scrolls into view. Respects prefers-reduced-motion.
 *
 * @param {number} end — the target number to count up to
 * @param {number} [decimals=0] — number of decimal places
 */
export default function AnimatedCounter({ end, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (prefersReduced) {
            setCount(end);
            return;
          }

          const duration = 2000; // ms
          const startTime = performance.now();
          const from = 0;
          const to = end;

          const easeOut = (t) => {
            // cubic-bezier(0.22, 1, 0.36, 1)
            return t < 0.5
              ? 4 * t * t * t
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
          };

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = easeOut(t);
            setCount(from + (to - from) * eased);

            if (t < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(to);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
