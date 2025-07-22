"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LiveScoresPage() {
  interface CricketScore {
    guid?: string;
    title: string;
    contentSnippet?: string;
    content?: string;
    summary?: string;
    link: string;
  }

  const [cricket, setCricket] = useState<CricketScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}live-scores/espn/live`)
      .then((res) => res.json())
      .then((data) => {
        setCricket(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex items-center mb-8">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-500 to-green-400 rounded-full mr-3 animate-pulse"></span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-green-300 tracking-tight">Live Cricket Scores (ESPN)</h1>
        <Link href="/" className="ml-auto text-green-600 dark:text-green-300 hover:underline font-medium text-sm">Home</Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-green-600 dark:text-green-300">Failed to load live cricket scores. Please try again later.</div>
      ) : cricket.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No live cricket matches at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cricket.map((item: CricketScore, idx: number) => (
            <div
              key={item.guid || idx}
              className="bg-gradient-to-br from-pink-500/80 via-purple-700/80 to-indigo-700/80 dark:from-pink-700/80 dark:via-purple-900/80 dark:to-indigo-900/80 rounded-lg shadow-2xl p-6 flex flex-col justify-between border-l-4 border-pink-400 dark:border-pink-300 relative overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-pink-400/40 animate-fadeIn"
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
  );
} 