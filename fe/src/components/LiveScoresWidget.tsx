"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { API_BASE_URL } from '@/utils/apiConfig';

// Local type for ESPN cricket scores
interface CricketScore {
  guid?: string;
  title: string;
  contentSnippet?: string;
  content?: string;
  summary?: string;
  link: string;
}

export function LiveScoresWidget() {
  const [cricket, setCricket] = useState<CricketScore[]>([]);
  const [cricketLoading, setCricketLoading] = useState(true);
  const [tab, setTab] = useState<'all' | 'cricket'>('all');
  const cricketScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeftCricket, setCanScrollLeftCricket] = useState(false);
  const [canScrollRightCricket, setCanScrollRightCricket] = useState(false);

  useEffect(() => {
    setCricketLoading(true);
    fetch(`${API_BASE_URL}live-scores/espn/live`)
      .then((res) => res.json())
      .then((data) => {
        setCricket(Array.isArray(data) ? data : []);
        setCricketLoading(false);
      })
      .catch(() => {
        setCricket([]);
        setCricketLoading(false);
      });
  }, []);

  // Scroll logic for ESPN data (used for both tabs)
  const checkScrollCricket = () => {
    const el = cricketScrollRef.current;
    if (!el) return;
    setCanScrollLeftCricket(el.scrollLeft > 0);
    setCanScrollRightCricket(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };
  useEffect(() => {
    checkScrollCricket();
    const el = cricketScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollCricket);
    window.addEventListener('resize', checkScrollCricket);
    return () => {
      el.removeEventListener('scroll', checkScrollCricket);
      window.removeEventListener('resize', checkScrollCricket);
    };
  }, [cricket, cricketLoading]);
  const scrollByCricket = (amount: number) => {
    cricketScrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="mb-12 relative">
      <div className="flex items-center mb-4">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-500 to-green-400 rounded-full mr-3 animate-pulse"></span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-green-300 tracking-tight">Live Scores</h2>
        <Link href="/live-scores" className="ml-auto text-green-600 dark:text-green-300 hover:underline font-medium text-sm">See all</Link>
      </div>
      {/* Tab Bar */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${tab === 'all' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
          onClick={() => setTab('all')}
        >
          All Sports
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${tab === 'cricket' ? 'bg-pink-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
          onClick={() => setTab('cricket')}
        >
          🏏 Cricket
        </button>
      </div>
      {/* Both tabs show ESPN data */}
      <div className="relative">
        {/* Fade gradients for scroll hint */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 z-10" style={{background: 'linear-gradient(to right, rgba(24,24,27,0.85) 70%, transparent)'}} />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 z-10" style={{background: 'linear-gradient(to left, rgba(24,24,27,0.85) 70%, transparent)'}} />
        {/* Modern scroll arrows */}
        {canScrollLeftCricket && (
          <button
            aria-label="Scroll left"
            className={`group absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 hover:scale-110 hover:shadow-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 flex items-center justify-center`}
            onClick={() => scrollByCricket(-360)}
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
        {canScrollRightCricket && (
          <button
            aria-label="Scroll right"
            className={`group absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 hover:scale-110 hover:shadow-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 flex items-center justify-center`}
            onClick={() => scrollByCricket(360)}
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
        {/* SVG background pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10 z-0" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="#ec4899" fillOpacity="0.2" />
          <circle cx="340" cy="60" r="70" fill="#a21caf" fillOpacity="0.15" />
          <rect x="120" y="20" width="160" height="80" rx="40" fill="#f472b6" fillOpacity="0.08" />
        </svg>
        {cricketLoading ? (
          <div className="flex gap-8 overflow-x-auto pb-2 no-scrollbar">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-96 h-24 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-2xl animate-pulse shadow-2xl"></div>
            ))}
          </div>
        ) : cricket.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No live cricket matches at the moment.</div>
        ) : (
          <div ref={cricketScrollRef} className="flex gap-8 overflow-x-auto pb-4 snap-x no-scrollbar scroll-smooth relative z-10">
            {cricket.map((item: CricketScore, idx: number) => (
              <div
                key={item.guid || idx}
                className="snap-center min-w-[320px] sm:min-w-[360px] max-w-lg bg-gradient-to-br from-pink-500/80 via-purple-700/80 to-indigo-700/80 dark:from-pink-700/80 dark:via-purple-900/80 dark:to-indigo-900/80 rounded-3xl shadow-2xl p-6 flex flex-col justify-between border-l-4 border-pink-400 dark:border-pink-300 relative overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-pink-400/40 animate-fadeIn"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-center mb-2">
                  {/* Animated cricket ball */}
                  <span className="relative w-6 h-6 mr-2 flex items-center justify-center">
                    <span className="absolute w-6 h-6 bg-pink-300 rounded-full animate-spin-slow border-2 border-pink-500 shadow-lg"></span>
                    <span className="absolute w-2 h-2 bg-white rounded-full left-1 top-1"></span>
                  </span>
                  <span className="text-pink-100 dark:text-pink-200 font-semibold text-xs uppercase tracking-wider">CRICKET</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:underline transition-all duration-200 drop-shadow-lg">{item.title}</h3>
                <p className="text-white/80 text-sm truncate mb-2">{item.contentSnippet || item.content || item.summary || ''}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-600 via-pink-400 to-pink-600 hover:from-pink-700 hover:to-pink-700 text-white rounded-full font-semibold shadow transition-all text-center relative shimmer-btn"
                >
                  View on ESPN CricInfo
                </a>
                <div className="absolute top-0 right-0 m-3 w-8 h-8 bg-pink-400/20 rounded-full blur-2xl animate-pulse" />
              </div>
            ))}
          </div>
        )}
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
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 2.5s linear infinite;
          }
          /* Shimmer effect for ESPN button */
          .shimmer-btn::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
            opacity: 0.7;
            transform: translateX(-100%);
            transition: none;
            pointer-events: none;
          }
          .shimmer-btn:hover::after {
            animation: shimmer 1.2s linear forwards;
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </section>
  );
} 