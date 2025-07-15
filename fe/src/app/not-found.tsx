"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[var(--background)] text-[var(--foreground)] px-4">
      {/* Radial gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--primary)]/20 via-[var(--secondary)]/10 to-transparent blur-3xl opacity-80" />
      </div>
      <div className="relative z-10 max-w-lg w-full bg-white/60 dark:bg-[var(--card-bg)]/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-8 border border-[var(--border)]" style={{ boxShadow: '0 8px 40px 0 rgba(30,41,59,0.18), 0 1.5px 8px 0 rgba(30,41,59,0.10)' }}>
        {/* 3D Playful SVG Animation */}
        <div className="w-44 h-44 mb-2 animate-float">
          {/* 3D monkey peeking from a newspaper */}
          <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="110" cy="120" rx="90" ry="80" fill="#ffe0b2" filter="url(#shadow)" />
            <rect x="40" y="120" width="140" height="60" rx="18" fill="#fff" stroke="#e2e8f0" strokeWidth="4" />
            <rect x="60" y="140" width="100" height="10" rx="5" fill="#e2e8f0" />
            <ellipse cx="80" cy="110" rx="18" ry="18" fill="#fff" />
            <ellipse cx="140" cy="110" rx="18" ry="18" fill="#fff" />
            <ellipse cx="80" cy="110" rx="8" ry="8" fill="#222" />
            <ellipse cx="140" cy="110" rx="8" ry="8" fill="#222" />
            <ellipse cx="110" cy="160" rx="18" ry="10" fill="#222" />
            <ellipse cx="110" cy="160" rx="10" ry="5" fill="#fff" />
            <rect x="160" y="170" width="30" height="10" rx="5" fill="#ff7e29" transform="rotate(20 160 170)" />
            <circle cx="190" cy="175" r="8" fill="#2346a0" />
            <defs>
              <filter id="shadow" x="0" y="40" width="220" height="160" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.12" />
              </filter>
            </defs>
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-2 drop-shadow-lg">404: You’ve hit a news blackout!</h1>
        <p className="text-lg text-center text-[var(--muted-foreground)] mb-4">Looks like this page is more lost than yesterday’s headlines.<br/>But don’t worry, our news monkey is on the case!</p>
        <Link href="/" className="inline-block bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--secondary)] hover:to-[var(--primary)] text-white font-bold px-8 py-3 rounded-full shadow-xl transition-all text-lg mt-2 active:scale-95">
          Go Home 🏠
        </Link>
      </div>
      <style jsx>{`
        .animate-float {
          animation: floaty 2.8s ease-in-out infinite alternate;
        }
        @keyframes floaty {
          0% { transform: translateY(0); }
          100% { transform: translateY(-18px) scale(1.04); }
        }
      `}</style>
    </div>
  );
} 