"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Blog } from '@/types';

export function LiveBlogsWidget() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}live-blogs`)
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

  return (
    <section className="mb-12">
      <div className="flex items-center mb-4">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full mr-3 animate-pulse"></span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-pink-300 tracking-tight">Live Blogs</h2>
        <Link href="/live-blogs" className="ml-auto text-pink-600 dark:text-pink-300 hover:underline font-medium text-sm">See all</Link>
      </div>
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-72 h-24 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-pink-600 dark:text-pink-300">Failed to load live blogs. Please try again later.</div>
      ) : blogs.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No live blogs at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div key={blog._id} className="min-w-[280px] max-w-xs bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col justify-between border-l-4 border-pink-500 dark:border-pink-300 transition-transform hover:scale-105">
              <div className="flex items-center mb-2">
                <span className="w-2 h-2 bg-pink-500 dark:bg-pink-300 rounded-full animate-pulse mr-2"></span>
                <span className="text-pink-600 dark:text-pink-300 font-semibold text-xs uppercase tracking-wider">LIVE</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 truncate">{blog.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm truncate mb-2">{blog.description}</p>
              <Link href={`/live-blogs/${blog._id}`} className="text-pink-600 dark:text-pink-300 hover:underline text-xs font-medium">Follow Updates →</Link>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-30%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
} 