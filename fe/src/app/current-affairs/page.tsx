"use client";
import { useEffect, useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import Link from "next/link";

export default function CurrentAffairsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/v1/news?category=current-affairs&page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        setNews(page === 1 ? data : (prev) => [...prev, ...data]);
        setHasMore(data.length === 9);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex items-center mb-8">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-red-500 to-yellow-400 rounded-full mr-3 animate-pulse"></span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-yellow-300 tracking-tight">Current Affairs</h1>
        <Link href="/" className="ml-auto text-red-600 dark:text-yellow-400 hover:underline font-medium text-sm">Home</Link>
      </div>
      {loading && page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600 dark:text-yellow-400">Failed to load current affairs. Please try again later.</div>
      ) : news.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No current affairs news found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard
                key={item._id}
                title={item.title}
                summary={item.summary}
                category={item.category?.name || 'Current Affairs'}
                publishedAt={item.publishedAt || item.createdAt}
                imageUrl={item.images?.[0] || '/api/placeholder/400/250'}
                isBreaking={item.isBreaking}
                slug={item._id}
                source={item.source}
                externalUrl={item.externalUrl}
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 dark:from-yellow-500 dark:to-red-600 text-white dark:text-gray-900 font-semibold shadow-lg hover:scale-105 transition-transform"
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 