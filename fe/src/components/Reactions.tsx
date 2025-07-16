"use client";
import { useState, useEffect } from "react";

const REACTIONS = [
  { key: "like", emoji: "👍" },
  { key: "love", emoji: "❤️" },
  { key: "wow", emoji: "😮" },
];

export default function Reactions({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<{ [k: string]: number }>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`reactions_${slug}`) || '{}');
    setCounts(stored.counts || {});
    setUserReaction(stored.userReaction || null);
  }, [slug]);

  const handleReact = (key: string) => {
    if (userReaction) return; // Only one reaction per user
    const newCounts = { ...counts, [key]: (counts[key] || 0) + 1 };
    setCounts(newCounts);
    setUserReaction(key);
    localStorage.setItem(`reactions_${slug}`, JSON.stringify({ counts: newCounts, userReaction: key }));
  };

  return (
    <div className="flex gap-4 items-center mt-4">
      {REACTIONS.map((r) => (
        <button
          key={r.key}
          onClick={() => handleReact(r.key)}
          disabled={!!userReaction}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border transition font-semibold text-lg ${userReaction === r.key ? 'bg-pink-100 dark:bg-pink-900 border-pink-400 dark:border-pink-700' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-pink-800'}`}
          aria-label={`React with ${r.emoji}`}
        >
          <span>{r.emoji}</span>
          <span className="text-base">{counts[r.key] || 0}</span>
        </button>
      ))}
      {userReaction && <span className="ml-2 text-xs text-pink-500">Thanks for your reaction!</span>}
    </div>
  );
} 