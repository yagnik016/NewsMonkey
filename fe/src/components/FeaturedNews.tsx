"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function FeaturedNews() {
  const featuredNews = [
    {
      id: 1,
      title: "Revolutionary AI Technology Transforms Healthcare Industry",
      summary: "A breakthrough in artificial intelligence has led to unprecedented advances in medical diagnosis and treatment planning.",
      imageUrl: "https://bsmedia.business-standard.com/_media/bs/img/article/2024-08/22/full/1724299850-5807.png?im=FitAndFill=(826,465)",
      category: "Technology",
      publishedAt: "2024-01-15",
      slug: "ai-healthcare-breakthrough"
    },
    {
      id: 2,
      title: "Global Leaders Unite for Climate Action Summit",
      summary: "World leaders gather in unprecedented numbers to address the urgent climate crisis and commit to ambitious targets.",
      imageUrl: "https://media.vanityfair.com/photos/5dd5a1b940391c0009573a8f/1:1/w_1600%2Cc_limit/donaldtrumpsondland.jpg",
      category: "Politics",
      publishedAt: "2024-01-15",
      slug: "climate-summit-2024"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {featuredNews.map((news, idx) => (
        <motion.div
          key={news.id}
          className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/70 rounded-xl shadow-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, duration: 0.5, type: 'spring', stiffness: 60 }}
          whileHover={{ scale: 1.035, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.35)', rotateZ: 1.5 }}
          whileTap={{ scale: 0.98, rotateZ: -1 }}
          tabIndex={0}
          aria-label={`Featured news card: ${news.title}`}
        >
          <div className="relative">
            <Image
              src={news.imageUrl}
              alt={news.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover bg-gray-100 dark:bg-gray-800"
              unoptimized
              loading="lazy"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none rounded-t-xl" />
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold shadow dark:shadow-yellow-400">
              FEATURED
            </div>
            <div className="absolute top-4 right-4 bg-black bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-80 text-white px-3 py-1 rounded text-sm">
              {news.category}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-400 mb-3">
              <span>{new Date(news.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span className="mx-2">•</span>
              <span>{news.category}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 !opacity-100">
              <Link href={`/news/${news.slug}`} className="hover:text-red-600 dark:hover:text-yellow-400 !opacity-100">
                {news.title}
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 !opacity-100">
              {news.summary}
            </p>
            <Link 
              href={`/news/${news.slug}`}
              className="inline-flex items-center text-red-600 dark:text-yellow-400 hover:text-red-700 dark:hover:text-yellow-300 font-semibold"
              tabIndex={0}
              aria-label="Read full featured article"
            >
              Read Full Article
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 