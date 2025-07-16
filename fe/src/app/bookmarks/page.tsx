"use client";
import { useEffect, useState } from "react";
import { NewsCard } from "@/components/NewsCard";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<{slug: string}[]>([]);

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem("bookmarks") || "[]"));
    const onStorage = () => {
      setBookmarks(JSON.parse(localStorage.getItem("bookmarks") || "[]"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleRemove = (slug: string) => {
    const updated = bookmarks.filter((b) => b.slug !== slug);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-3xl font-extrabold text-[var(--primary)] mb-8">Your Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <div className="text-gray-500 text-lg">No saved articles yet. Bookmark news to see them here!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookmarks.map((item) => (
            <div key={item.slug} className="relative group">
              <NewsCard 
                slug={item.slug}
                title=""
                summary=""
                category=""
                publishedAt=""
                imageUrl=""
              />
              <button
                onClick={() => handleRemove(item.slug)}
                className="absolute top-3 right-3 bg-white/80 dark:bg-gray-900/80 border border-pink-300 dark:border-pink-700 rounded-full p-2 shadow hover:bg-pink-100 dark:hover:bg-pink-900 transition z-10"
                title="Remove bookmark"
                aria-label="Remove bookmark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 