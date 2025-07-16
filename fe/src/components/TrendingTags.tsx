"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrendingTags() {
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}news/trending-tags?limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load trending tags");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="mb-8">Loading trending topics...</div>;
  if (error) return <div className="mb-8 text-red-500">{error}</div>;
  if (!tags.length) return <div className="mb-8 text-gray-500">No trending topics found.</div>;

  return (
    <section className="mb-8">
      <h3 className="text-xl font-bold mb-3 text-[var(--primary)]">Trending Topics</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t.tag}
            href={`/news?tag=${encodeURIComponent(t.tag)}`}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-pink-100 dark:from-blue-900 dark:to-pink-900 text-blue-700 dark:text-pink-200 font-semibold text-sm hover:scale-105 transition-transform border border-blue-200 dark:border-pink-700"
          >
            #{t.tag}
          </Link>
        ))}
      </div>
    </section>
  );
} 