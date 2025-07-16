"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NewsCard } from "@/components/NewsCard";
import Link from "next/link";
import type { News } from '@/types';

export default function CategoryPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}news/category/${slug}?page=${page}&limit=9`)
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
  }, [slug, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex items-center mb-8">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-500 to-green-400 rounded-full mr-3 animate-pulse"></span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-green-300 tracking-tight capitalize">{slug?.toString().replace(/-/g, ' ')}</h1>
        <Link href="/" className="ml-auto text-green-600 dark:text-green-300 hover:underline font-medium text-sm">Home</Link>
      </div>
      {loading && page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-green-600 dark:text-green-300">Failed to load news. Please try again later.</div>
      ) : news.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No news found in this category.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard
                key={item._id}
                title={item.title || ''}
                summary={item.summary || ''}
                category={item.category?.name || slug?.toString() || ''}
                publishedAt={item.publishedAt || item.createdAt || ''}
                imageUrl={item.images?.[0] || '/api/placeholder/400/250'}
                isBreaking={item.isBreaking || false}
                slug={item._id || ''}
                source={item.source}
                externalUrl={item.externalUrl}
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-400 dark:from-green-500 dark:to-blue-600 text-white dark:text-gray-900 font-semibold shadow-lg hover:scale-105 transition-transform"
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