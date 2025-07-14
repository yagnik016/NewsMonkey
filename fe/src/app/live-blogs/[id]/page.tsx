"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Blog, BlogEntry } from '@/types';
import Image from 'next/image';

export default function LiveBlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/v1/live-blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Link href="/live-blogs" className="text-pink-600 dark:text-pink-300 hover:underline font-medium text-sm mb-4 inline-block">← All Live Blogs</Link>
      {loading ? (
        <div className="h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
      ) : error || !blog ? (
        <div className="text-pink-600 dark:text-pink-300">Failed to load live blog. Please try again later.</div>
      ) : (
        <article className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-pink-300 mb-4">{blog.title}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>{blog.eventSlug}</span>
            <span className="mx-2">•</span>
            <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</span>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">{blog.description}</p>
          <div className="space-y-6">
            {Array.isArray(blog.entries) && blog.entries.length > 0 ? blog.entries.map((entry: BlogEntry, i: number) => (
              <div key={i} className="bg-gradient-to-r from-pink-100/60 to-yellow-100/60 dark:from-pink-900/40 dark:to-yellow-900/40 rounded-lg p-4 shadow flex flex-col animate-fade-in-entry">
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-pink-500 dark:bg-pink-300 rounded-full animate-pulse mr-2"></span>
                  <span className="text-pink-600 dark:text-pink-300 font-semibold text-xs uppercase tracking-wider">LIVE ENTRY</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : ''}</span>
                </div>
                <div className="text-gray-900 dark:text-gray-100 text-base mb-1">{entry.content}</div>
                {entry.image && <Image src={entry.image} alt="entry" width={800} height={200} className="w-full h-48 object-cover rounded mt-2" />}
                {entry.author && <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">By {entry.author}</div>}
              </div>
            )) : <div className="text-gray-500 dark:text-gray-400">No entries yet.</div>}
          </div>
        </article>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        .animate-fade-in-entry {
          animation: fadeInEntry 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInEntry {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
} 