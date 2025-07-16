"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [ripple, setRipple] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setTimeout(() => setRipple(null), 400);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative inline-block">
      <button
        aria-label="Toggle Dark Mode"
        className="rounded-full p-2 bg-white dark:bg-gray-800 border border-[var(--border)] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md overflow-hidden focus:outline-none"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === "dark" ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
        {ripple && (
          <span
            className="absolute rounded-full bg-blue-400/30 dark:bg-yellow-300/20 pointer-events-none"
            style={{
              left: ripple.x - 24,
              top: ripple.y - 24,
              width: 48,
              height: 48,
              animation: "ripple 0.4s linear"
            }}
          />
        )}
      </button>
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded bg-gray-900 text-white text-xs shadow z-10 whitespace-nowrap">
          {resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </div>
      )}
      <style jsx>{`
        @keyframes ripple {
          0% { opacity: 0.5; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>
    </div>
  );
} 