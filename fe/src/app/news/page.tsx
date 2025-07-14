"use client";

import { useEffect, useState, useCallback } from "react";
import { FaRegNewspaper, FaBusinessTime, FaFilm, FaHeartbeat, FaFlask, FaFutbol, FaLaptopCode, FaRegBookmark, FaBookmark, FaShareAlt, FaArrowUp } from "react-icons/fa";
import { IconType } from "react-icons";

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
  const [mounted, setMounted] = useState(false);
  const [bookmarks, setBookmarks] = useState<{[url: string]: boolean}>({});
  const [showShare, setShowShare] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${selectedTopic}&page=${page}&pageSize=${PAGE_SIZE}&country=us&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`
        );
        const data = await res.json();
        if (data.status !== "ok") throw new Error(data.message || "Failed to fetch news");
        setArticles((prev) => (page === 1 ? data.articles : [...prev, ...data.articles]));
        setHasMore(data.articles.length === PAGE_SIZE);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setBookmarks((prev) => ({ ...prev, [url]: !prev[url] }));
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
      <AnimatedBg />
      {/* Vibrant animated navbar */}
      <nav className="sticky top-0 z-20 bg-black/80 backdrop-blur-md rounded-xl mb-8 flex items-center gap-2 py-3 px-2 shadow-lg animate-fade-in overflow-x-auto scrollbar-hide">
        {TOPICS.map((topic) => {
          const Icon = topic.icon as IconType;
          return (
            <button
              key={topic.value}
              onClick={() => setSelectedTopic(topic.value)}
              className={`relative px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-300 focus:outline-none
                bg-gradient-to-r ${topic.color}
                ${selectedTopic === topic.value
                  ? "shadow-xl scale-105 text-white ring-2 ring-white/70"
                  : "opacity-70 hover:opacity-100 text-white/80"}
              `}
              style={{
                boxShadow: selectedTopic === topic.value ? "0 4px 24px 0 rgba(0,0,0,0.25)" : undefined,
              }}
            >
              <Icon className="text-lg animate-bounce-once" />
              {topic.label}
              {selectedTopic === topic.value && (
                <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2/3 h-1 bg-white/80 rounded-full animate-slide-in" />
              )}
            </button>
          );
        })}
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-fuchsia-500 to-yellow-400 bg-clip-text text-transparent animate-fade-in">Latest News</h1>
      {error && <div className="text-red-400 text-center mb-4 animate-fade-in">{error}</div>}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {loading && articles.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : articles.map((article, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl shadow-xl p-0 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-fade-up overflow-hidden"
                style={{ animationDelay: mounted ? `${idx * 60}ms` : "0ms", animationFillMode: "both" }}
              >
                <div className="overflow-hidden rounded-t-xl relative">
                  <img
                    src={article.urlToImage || "/placeholder.jpg"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 bg-neutral-700"
                  />
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
                      className="text-fuchsia-400 hover:text-yellow-300 font-semibold transition-colors duration-300"
                    >
                      Read Original
                    </a>
                    <button
                      className="ml-auto text-xl text-yellow-400 hover:text-pink-400 transition-colors duration-200 focus:outline-none"
                      onClick={() => toggleBookmark(article.url)}
                      aria-label="Bookmark"
                    >
                      {bookmarks[article.url] ? <FaBookmark className="animate-bounce" /> : <FaRegBookmark />}
                    </button>
                    <div className="relative">
                      <button
                        className="text-xl text-blue-400 hover:text-yellow-300 transition-colors duration-200 focus:outline-none"
                        onClick={() => handleShare(article.url)}
                        aria-label="Share"
                      >
                        <FaShareAlt />
                      </button>
                      {showShare === article.url && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded shadow animate-fade-in">
                          Link Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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