"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { Blog } from '@/types';
import { API_BASE_URL } from '@/utils/apiConfig';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export function LiveBlogsWidget() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}live-blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Check scroll position for arrow visibility
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [blogs, loading]);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="mb-12 relative">
      <div className="flex items-center mb-4">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full mr-3 animate-pulse"></span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-pink-300 tracking-tight">Live Blogs</h2>
        <Link href="/live-blogs" className="ml-auto text-pink-600 dark:text-pink-300 hover:underline font-medium text-sm">See all</Link>
      </div>
      <div className="relative">
        {/* Modern scroll arrows */}
        {canScrollLeft && (
          <button
            aria-label="Scroll left"
            className={`group absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 hover:scale-110 hover:shadow-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 flex items-center justify-center`}
            onClick={() => scrollBy(-320)}
            tabIndex={0}
            style={{ boxShadow: '0 2px 12px 0 rgba(236,72,153,0.15)' }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="none" />
              <path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
              <defs>
                <filter id="glow" x="-5" y="-5" width="34" height="34" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            aria-label="Scroll right"
            className={`group absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 hover:scale-110 hover:shadow-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 flex items-center justify-center`}
            onClick={() => scrollBy(320)}
            tabIndex={0}
            style={{ boxShadow: '0 2px 12px 0 rgba(236,72,153,0.15)' }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="none" />
              <path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
              <defs>
                <filter id="glow" x="-5" y="-5" width="34" height="34" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </button>
        )}
        {loading ? (
          <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-80 h-32 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-2xl animate-pulse shadow-2xl"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-pink-600 dark:text-pink-300">Failed to load live blogs. Please try again later.</div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No live blogs at the moment.</div>
        ) : (
          <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-4 snap-x no-scrollbar scroll-smooth">
            {blogs.slice(0, 6).map((blog, idx) => (
              <Tilt key={blog._id || idx}
                glareEnable={true}
                glareMaxOpacity={0.35}
                glareColor="#ec4899"
                glarePosition="all"
                tiltMaxAngleX={18}
                tiltMaxAngleY={18}
                scale={1.04}
                transitionSpeed={1800}
                className="neon-tilt"
              >
                <motion.div
                  key={blog._id}
                  className="snap-center min-w-[320px] max-w-xs bg-white dark:bg-slate-900/30 border border-gray-200 dark:border-cyan-300 rounded-3xl shadow p-6 flex flex-col justify-between relative overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-md dark:hover:shadow-cyan-400/40 animate-fadeIn"
                  style={{ animationDelay: `${idx * 80}ms` }}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 2px 8px 0 #e5e7eb' }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18, delay: idx * 0.08 }}
                >
                  <div className="flex items-center mb-2">
                    <span className="mr-2 flex items-center justify-center" style={{ width: 24, height: 24, position: 'relative' }}>
                      <span
                        className="block w-6 h-6 rounded-full bg-cyan-400 border-2 border-blue-500 shadow-lg"
                        style={{
                          boxShadow: '0 0 16px 6px #38bdf8, 0 0 32px 12px #2563eb99',
                          animation: 'spin-slow 2.5s linear infinite, pulse-glow-blue 1.2s infinite'
                        }}
                      />
                      <span className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" />
                    </span>
                    <span
                      className="text-black dark:text-cyan-300 font-semibold text-xs uppercase tracking-wider ml-1"
                      style={{ border: 'none', outline: 'none', boxShadow: 'none', background: 'none' }}
                    >
                      LIVE
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:underline transition-all duration-200 drop-shadow-lg neon-text">{blog.title}</h3>
                  <p className="text-white/80 text-sm truncate mb-2">{blog.description}</p>
                  <Link href={`/live-blogs/${blog._id}`} className="relative bg-black text-white dark:bg-gradient-to-r dark:from-blue-600 dark:via-cyan-400 dark:to-blue-600 dark:hover:from-blue-700 dark:hover:to-blue-700 rounded-full font-semibold shadow transition-all text-xs font-medium text-center shimmer-btn-glass px-4 py-2 mt-2">Follow Updates →</Link>
                  <div className="absolute top-0 right-0 m-3 w-8 h-8 bg-gray-200 dark:bg-gradient-to-br dark:from-blue-400/60 dark:to-cyan-400/40 rounded-full blur-2xl animate-pulse-glow" />
                  <div className="absolute inset-0 pointer-events-none z-0 bg-transparent dark:animated-gradient-bg-blue" />
                </motion.div>
              </Tilt>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236,72,153,0.4); }
          50% { box-shadow: 0 0 16px 6px rgba(236,72,153,0.7); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.2s infinite;
        }
        .shimmer-btn-glass::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          opacity: 0.7;
          transform: translateX(-100%);
          transition: none;
          pointer-events: none;
        }
        .shimmer-btn-glass:hover::after {
          animation: shimmer 1.2s linear forwards;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .neon-tilt {
          filter: drop-shadow(0 0 16px #ec4899cc) drop-shadow(0 0 32px #a21caf99);
        }
        .neon-border {
          border-image: linear-gradient(120deg, #ec4899 0%, #a21caf 100%) 1;
          box-shadow: 0 0 24px 2px #ec4899cc, 0 0 48px 8px #a21caf55;
        }
        .neon-text {
          text-shadow: 0 0 8px #ec4899cc, 0 0 16px #a21caf99;
        }
        .animated-gradient-bg {
          background: linear-gradient(120deg, #ec4899 0%, #a21caf 100%);
          opacity: 0.13;
          animation: gradientMove 4s linear infinite alternate;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .neon-border-blue {
          border-image: linear-gradient(120deg, #bae6fd 0%, #38bdf8 100%) 1;
          box-shadow: 0 0 24px 2px #bae6fdcc, 0 0 48px 8px #38bdf855;
        }
        .animated-gradient-bg-blue {
          background: linear-gradient(120deg, #bae6fd 0%, #a5f3fc 100%);
          opacity: 0.13;
          animation: gradientMove 4s linear infinite alternate;
        }
        @keyframes pulse-glow-blue {
          0%, 100% { box-shadow: 0 0 0 0 #38bdf8; }
          50% { box-shadow: 0 0 16px 6px #38bdf8, 0 0 32px 12px #2563eb99; }
        }
      `}</style>
    </section>
  );
} 