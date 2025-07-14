"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Blog } from '@/types';

export default function LiveBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/v1/live-blogs")
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex items-center mb-8">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full mr-3 animate-pulse"></span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-pink-300 tracking-tight">Live Blogs</h1>
        <Link href="/" className="ml-auto text-pink-600 dark:text-pink-300 hover:underline font-medium text-sm">Home</Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-pink-600 dark:text-pink-300">Failed to load live blogs. Please try again later.</div>
      ) : blogs.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No live blogs at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-pink-500 dark:border-pink-300 transition-transform hover:scale-105">
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
    </div>
  );
} 