"use client";

import { useEffect, useState, useCallback } from "react";
import { FaRegNewspaper, FaBusinessTime, FaFilm, FaHeartbeat, FaFlask, FaFutbol, FaLaptopCode, FaRegBookmark, FaBookmark, FaShareAlt, FaArrowUp } from "react-icons/fa";
import { IconType } from "react-icons";
import Image from "next/image";
import ParallaxBg from '@/components/ParallaxBg';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNewsApi } from "@/utils/fetchNewsApi";

const TOPICS = [
  { label: "General", value: "general", color: "from-pink-500 to-yellow-500", icon: FaRegNewspaper },
  { label: "Business", value: "business", color: "from-blue-500 to-green-400", icon: FaBusinessTime },
  { label: "Entertainment", value: "entertainment", color: "from-purple-500 to-pink-400", icon: FaFilm },
  { label: "Health", value: "health", color: "from-green-500 to-teal-400", icon: FaHeartbeat },
  { label: "Science", value: "science", color: "from-cyan-500 to-blue-400", icon: FaFlask },
  { label: "Sports", value: "sports", color: "from-orange-500 to-red-400", icon: FaFutbol },
  { label: "Technology", value: "technology", color: "from-indigo-500 to-blue-500", icon: FaLaptopCode },
];

const PAGE_SIZE = 12;

// NewsAPI article type
type NewsArticle = {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

function isNewArticle(publishedAt: string) {
  return (Date.now() - new Date(publishedAt).getTime()) < 24 * 60 * 60 * 1000;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("general");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [bookmarks, setBookmarks] = useState<{[url: string]: boolean}>({});
  const [showShare, setShowShare] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Load bookmarks from localStorage
    const stored = localStorage.getItem('newsmonkey_bookmarks');
    if (stored) setBookmarks(JSON.parse(stored));
  }, []);

  // Reset articles when topic changes
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setError("");
  }, [selectedTopic]);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");
      try {
        const articles = await fetchNewsApi({ country: 'us', category: selectedTopic, page, pageSize: PAGE_SIZE });
        setArticles((prev) => (page === 1 ? articles : [...prev, ...articles]));
        setHasMore(articles.length === PAGE_SIZE);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page, selectedTopic]);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
    setShowTop(window.scrollY > 400);
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl shadow-lg animate-pulse h-[350px] flex flex-col">
      <div className="h-48 bg-neutral-700 rounded-t-xl mb-4" />
      <div className="flex-1 px-4 py-2">
        <div className="h-5 bg-neutral-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-neutral-700 rounded w-1/2 mb-2" />
        <div className="h-4 bg-neutral-700 rounded w-2/3" />
      </div>
    </div>
  );

  // Bookmark logic
  const toggleBookmark = (url: string) => {
    setBookmarks((prev) => {
      const updated = { ...prev, [url]: !prev[url] };
      localStorage.setItem('newsmonkey_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Share logic
  const handleShare = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShowShare(url);
      setTimeout(() => setShowShare(null), 1200);
    }
  };

  // Back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Card overlay
  const CardOverlay = ({ source, publishedAt }: { source: string; publishedAt: string }) => (
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-xl pointer-events-none">
      <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
        <span className="font-bold">{source}</span>
        <span>•</span>
        <span>{new Date(publishedAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
      </div>
    </div>
  );

  // Animated gradient background
  const AnimatedBg = () => (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute w-[120vw] h-[120vw] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-br from-fuchsia-700 via-indigo-900 to-yellow-500 opacity-30 blur-3xl animate-gradient-move" />
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-sans min-h-screen relative">
      <ParallaxBg />
      <AnimatedBg />
      {/* Vibrant animated navbar */}
      <nav className="sticky top-0 z-20 bg-black/80 backdrop-blur-md rounded-xl mb-8 flex items-center gap-2 py-3 px-2 shadow-lg animate-fade-in overflow-x-auto scrollbar-hide">
        {TOPICS.map((topic) => {
          const Icon = topic.icon as IconType;
          const isSelected = selectedTopic === topic.value;
          return (
            <motion.button
              key={topic.value}
              onClick={() => setSelectedTopic(topic.value)}
              className={`relative px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-2 focus:outline-none bg-gradient-to-r ${topic.color}`}
              style={{
                boxShadow: isSelected ? "0 4px 24px 0 rgba(0,0,0,0.25)" : undefined,
                opacity: isSelected ? 1 : 0.7,
                color: isSelected ? '#fff' : 'rgba(255,255,255,0.8)',
                transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                zIndex: isSelected ? 2 : 1,
              }}
              whileHover={{ scale: 1.12, opacity: 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Icon className="text-lg animate-bounce-once" />
              {topic.label}
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    layoutId="category-highlight"
                    className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2/3 h-1 bg-white/80 rounded-full"
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-fuchsia-500 to-yellow-400 bg-clip-text text-transparent animate-fade-in">Latest News</h1>
      {error && <div className="text-red-400 text-center mb-4 animate-fade-in">{error}</div>}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {loading && articles.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : articles.map((article, idx) => (
              <motion.div
                key={idx}
                className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/70 rounded-xl shadow-xl p-0 flex flex-col h-full group overflow-hidden backdrop-blur-md bg-white/10 border border-white/10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.5, type: 'spring', stiffness: 60 }}
                whileHover={{ scale: 1.045, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.35)', rotateZ: 1.5 }}
                whileTap={{ scale: 0.98, rotateZ: -1 }}
                tabIndex={0}
                aria-label={`News card: ${article.title}`}
              >
                <div className="overflow-hidden rounded-t-xl relative">
                  <Image
                    src={article.urlToImage || "/placeholder.jpg"}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover bg-gray-100 dark:bg-gray-800"
                    unoptimized
                    loading="lazy"
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none rounded-t-xl" />
                  {isNewArticle(article.publishedAt) && (
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-xs font-bold px-3 py-1 rounded-full text-white shadow animate-pulse">NEW</span>
                  )}
                  <CardOverlay source={article.source.name} publishedAt={article.publishedAt} />
                </div>
                <div className="flex-1 flex flex-col px-5 py-4">
                  <h2 className="font-bold text-lg mb-2 line-clamp-2 text-white/90 group-hover:text-yellow-300 transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="text-neutral-300 text-sm mb-3 line-clamp-3">{article.description}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-yellow-300 font-semibold text-sm transition-colors"
                      tabIndex={0}
                      aria-label="Read original article"
                    >
                      Read Original
                    </a>
                    <button
                      className="ml-auto text-xl text-yellow-400 hover:text-yellow-300 transition-colors duration-200 focus:outline-none"
                      onClick={() => toggleBookmark(article.url)}
                      aria-label={bookmarks[article.url] ? "Remove bookmark" : "Add bookmark"}
                      tabIndex={0}
                    >
                      <motion.span whileTap={{ scale: 1.3, rotate: -20 }} whileHover={{ scale: 1.15 }}>
                        {bookmarks[article.url] ? <FaBookmark /> : <FaRegBookmark />}
                      </motion.span>
                    </button>
                    <div className="relative">
                        <button
                          onClick={() => handleShare(article.url)}
                          className="ml-2 text-blue-400 hover:text-blue-600 transition-colors"
                          aria-label="Share article"
                          tabIndex={0}
                        >
                          <motion.span whileTap={{ scale: 1.3, rotate: 20 }} whileHover={{ scale: 1.15 }}>
                            <FaShareAlt />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {showShare === article.url && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg z-10"
                            >
                              Link Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
      {loading && articles.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-4 animate-fade-in">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}
      {!hasMore && !loading && articles.length > 0 && (
        <div className="text-center py-6 text-neutral-400 animate-fade-in">No more news to load.</div>
      )}
      {/* Back to Top Button */}
      {showTop && (
        <button
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-fuchsia-500 to-yellow-400 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-fade-in"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      )}
    </main>
  );
}

// Animations (add to your global CSS or Tailwind config if not present):
// .animate-fade-in { animation: fadeIn 0.7s both; }
// .animate-fade-up { animation: fadeUp 0.7s both; }
// .animate-slide-in { animation: slideIn 0.4s both; }
// .animate-bounce-once { animation: bounceOnce 0.7s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes fadeUp { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
// @keyframes slideIn { from { width: 0; opacity: 0; } to { width: 66%; opacity: 1; } }
// @keyframes bounceOnce { 0% { transform: translateY(0); } 30% { transform: translateY(-8px); } 60% { transform: translateY(0); } 100% { transform: none; } } 