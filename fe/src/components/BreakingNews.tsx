'use client';

import { useState, useEffect } from 'react';

interface BreakingNewsProps {
  articles: Array<{
    title: string;
    summary?: string;
    publishedAt: string;
  }>;
}

export function BreakingNews({ articles }: BreakingNewsProps) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  
  // Use provided articles or fallback to default breaking news
  const breakingNews = articles.length > 0 
    ? articles.map(article => article.title)
    : [
        "BREAKING: Major tech company announces revolutionary AI breakthrough",
        "LIVE: Global summit begins with world leaders discussing climate action",
        "URGENT: New medical treatment shows 95% success rate in trials",
        "ALERT: Sports championship breaks all previous viewership records"
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-sm">BREAKING NEWS</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div 
              className="whitespace-nowrap animate-marquee"
              style={{
                animation: 'marquee 20s linear infinite',
                transform: `translateX(-${currentNewsIndex * 100}%)`
              }}
            >
              {breakingNews.map((news, index) => (
                <span key={index} className="inline-block mr-8">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
} 