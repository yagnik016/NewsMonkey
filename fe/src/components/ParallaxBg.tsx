"use client";

import { useEffect, useRef } from 'react';

export default function ParallaxBg() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        // Move background at 1/4th the scroll speed for parallax effect
        bgRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-20 pointer-events-none transition-transform duration-300"
      aria-hidden="true"
    >
      {/* You can swap this SVG or use a background image for a different effect */}
      <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="parallaxGradient" cx="50%" cy="40%" r="80%" fx="50%" fy="40%" gradientTransform="rotate(20)">
            <stop offset="0%" stopColor="#f0c27b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4b1248" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#parallaxGradient)" />
        <ellipse cx="1200" cy="200" rx="300" ry="120" fill="#f0c27b" fillOpacity="0.12" />
        <ellipse cx="400" cy="700" rx="350" ry="140" fill="#4b1248" fillOpacity="0.10" />
      </svg>
    </div>
  );
} 