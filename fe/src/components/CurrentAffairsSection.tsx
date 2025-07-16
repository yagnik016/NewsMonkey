"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import type { News } from '@/types';

export function CurrentAffairsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}news?category=current-affairs&limit=8`)
      .then((res) => res.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center mb-4">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-red-500 to-yellow-400 rounded-full mr-3 animate-pulse"></span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-yellow-300 tracking-tight">Current Affairs</h2>
        <Link href="/current-affairs" className="ml-auto text-red-600 dark:text-yellow-400 hover:underline font-medium text-sm">See all</Link>
      </div>
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-80 h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600 dark:text-yellow-400">Failed to load current affairs. Please try again later.</div>
      ) : news.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No current affairs news found.</div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-2 snap-x">
          {news.map((item) => (
            <div key={item._id} className="snap-center min-w-[320px] max-w-xs transition-transform hover:scale-105">
              <NewsCard
                title={item.title}
                summary={item.summary}
                category={item.category?.name || 'Current Affairs'}
                publishedAt={item.publishedAt || item.createdAt || ''}
                imageUrl={item.images?.[0] || '/api/placeholder/400/250'}
                isBreaking={item.isBreaking}
                slug={item._id}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 