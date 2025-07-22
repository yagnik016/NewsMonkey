"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { Blog } from '@/types';
import { API_BASE_URL } from '@/utils/apiConfig';

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
        {/* Fade gradients for scroll hint */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 z-10" style={{background: 'linear-gradient(to right, rgba(236,72,153,0.85) 70%, transparent)'}} />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 z-10" style={{background: 'linear-gradient(to left, rgba(236,72,153,0.85) 70%, transparent)'}} />
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
              <div
                key={blog._id}
                className="snap-center min-w-[320px] max-w-xs bg-gradient-to-br from-pink-500/80 via-purple-700/80 to-indigo-700/80 dark:from-pink-700/80 dark:via-purple-900/80 dark:to-indigo-900/80 rounded-3xl shadow-2xl p-6 flex flex-col justify-between border-l-4 border-pink-400 dark:border-pink-300 relative overflow-hidden group transition-transform duration-300 hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-pink-300 dark:bg-pink-200 rounded-full animate-pulse mr-2"></span>
                  <span className="text-pink-100 dark:text-pink-200 font-semibold text-xs uppercase tracking-wider">LIVE</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:underline transition-all duration-200">{blog.title}</h3>
                <p className="text-white/80 text-sm truncate mb-2">{blog.description}</p>
                <Link href={`/live-blogs/${blog._id}`} className="text-pink-200 hover:text-white hover:underline text-xs font-medium transition-all duration-200">Follow Updates →</Link>
                <div className="absolute top-0 right-0 m-3 w-8 h-8 bg-pink-400/20 rounded-full blur-2xl animate-pulse" />
              </div>
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
      `}</style>
    </section>
  );
} 