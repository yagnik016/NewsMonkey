"use client";
import { useAuthContext } from '@/components/AuthProvider';
import TrendingTags from '@/components/TrendingTags';
import AdBanner from '@/components/AdBanner';
import NewsletterSignup from '@/components/NewsletterSignup';
import { CategoryNav } from '@/components/CategoryNav';
import { CurrentAffairsSection } from '@/components/CurrentAffairsSection';
import { LiveBlogsWidget } from '@/components/LiveBlogsWidget';
import { LiveScoresWidget } from '@/components/LiveScoresWidget';
import { NewsCard } from '@/components/NewsCard';
import LiveMediaWidget from '@/components/LiveMediaWidget';
import StockWeatherWidget from '@/components/StockWeatherWidget';
import Link from 'next/link';
import React from 'react';

// Premium Feature Placeholders
function GamingWidget() {
  return (
    <Link href="/gaming" className="block">
      <section className="my-8 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl shadow-lg p-6 border border-indigo-300 dark:border-indigo-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-200">Gaming Highlights</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow mb-2">
              <h3 className="font-semibold text-lg mb-1">Top Game: Elden Ring</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Elden Ring wins Game of the Year! Explore the open world and epic boss fights.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
              <h3 className="font-semibold text-lg mb-1">Upcoming Release: GTA VI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Rockstar teases new trailer for Grand Theft Auto VI. Hype builds worldwide.</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-lg">🎮</div>
          </div>
        </div>
        {/* TODO: Add live streams, e-sports, and user game reviews */}
      </section>
    </Link>
  );
}

function FinanceWidget() {
  return (
    <Link href="/finance" className="block">
      <section className="my-8 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-2xl shadow-lg p-6 border border-green-300 dark:border-green-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-200">Finance & Crypto</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow mb-2">
              <h3 className="font-semibold text-lg mb-1">Bitcoin</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">BTC: $67,000 <span className="text-green-600">(+2.1%)</span></p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
              <h3 className="font-semibold text-lg mb-1">Ethereum</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">ETH: $3,200 <span className="text-red-500">(-0.8%)</span></p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-lg">💹</div>
          </div>
        </div>
        {/* TODO: Add real-time stock/crypto APIs, finance news, and investment tips */}
      </section>
    </Link>
  );
}

function PollOfTheDay() {
  return (
    <Link href="/polls" className="block">
      <section className="my-8 bg-gradient-to-r from-yellow-100 to-pink-100 dark:from-yellow-900 dark:to-pink-900 rounded-2xl shadow-lg p-6 border border-yellow-300 dark:border-yellow-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-200">Poll of the Day</h2>
        <div className="mb-4 text-lg font-semibold">Which premium feature excites you most?</div>
        <ul className="space-y-2">
          <li><input type="radio" name="poll" id="gaming" /> <label htmlFor="gaming">Gaming</label></li>
          <li><input type="radio" name="poll" id="finance" /> <label htmlFor="finance">Finance & Crypto</label></li>
          <li><input type="radio" name="poll" id="video" /> <label htmlFor="video">Video Highlights</label></li>
          <li><input type="radio" name="poll" id="podcast" /> <label htmlFor="podcast">Podcasts</label></li>
        </ul>
        <button className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-[var(--primary-hover)]">Vote</button>
        {/* TODO: Make poll interactive and show results */}
      </section>
    </Link>
  );
}

function VideoHighlights() {
  return (
    <Link href="/videos" className="block">
      <section className="my-8 bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-900 dark:to-red-900 rounded-2xl shadow-lg p-6 border border-pink-300 dark:border-pink-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-pink-700 dark:text-pink-200">Video Highlights</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow">
              <iframe
                src="https://www.youtube.com/embed/5qap5aO4i9A"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-semibold text-lg mb-2">Top News Video</h3>
            <p className="text-gray-700 dark:text-gray-300">Watch the latest trending news video, handpicked for you. Stay informed with visual stories.</p>
          </div>
        </div>
        {/* TODO: Add more video sources and personalized recommendations */}
      </section>
    </Link>
  );
}

function Podcasts() {
  return (
    <Link href="/podcasts" className="block">
      <section className="my-8 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-900 rounded-2xl shadow-lg p-6 border border-blue-300 dark:border-blue-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-200">Podcasts</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow mb-2">
              <h3 className="font-semibold text-lg mb-1">Morning News Recap</h3>
              <audio controls className="w-full">
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-gray-500 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-lg">🎧</div>
          </div>
        </div>
        {/* TODO: Add podcast list, categories, and personalized recommendations */}
      </section>
    </Link>
  );
}

function Leaderboard() {
  return (
    <Link href="/leaderboard" className="block">
      <section className="my-8 bg-gradient-to-r from-purple-100 to-yellow-100 dark:from-purple-900 dark:to-yellow-900 rounded-2xl shadow-lg p-6 border border-purple-300 dark:border-yellow-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-yellow-200">Leaderboard</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li><span className="font-semibold">Alice</span> - 1200 pts</li>
          <li><span className="font-semibold">Bob</span> - 1100 pts</li>
          <li><span className="font-semibold">Charlie</span> - 950 pts</li>
        </ol>
        {/* TODO: Make leaderboard dynamic and reward active users */}
      </section>
    </Link>
  );
}

export default function HomePageContent({ categoriesData, newsData, newsError }: { categoriesData: unknown, newsData: unknown[], newsError: boolean }) {
  const { user } = useAuthContext();
  const isPremium = user && user.isSubscriber;
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TrendingTags />
      {!isPremium && <AdBanner />}
      <NewsletterSignup />
      <LiveMediaWidget />
      <StockWeatherWidget />
      {/* Premium Features */}
      <GamingWidget />
      <FinanceWidget />
      <PollOfTheDay />
      <VideoHighlights />
      <Podcasts />
      <Leaderboard />
      {/* Category Navigation */}
      <CategoryNav categories={categoriesData as { name: string; slug: string; color?: string }[] | undefined} />
      <CurrentAffairsSection />
      <LiveBlogsWidget />
      <LiveScoresWidget />
      {/* Latest News Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-8 mt-12">Latest News</h2>
        {newsError ? (
          <div className="text-[var(--secondary)] text-center mb-4 font-semibold">Failed to load news. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsData?.length > 0 ? (newsData as Array<{
              url: string;
              title: string; 
              description: string;
              source?: {
                name: string;
              };
              publishedAt: string;
              urlToImage?: string;
            }>).map((item) => (
              <NewsCard
                key={item.url}
                title={item.title}
                summary={item.description}
                category={item.source?.name || 'General'}
                publishedAt={item.publishedAt}
                imageUrl={item.urlToImage || '/api/placeholder/400/250'}
                isBreaking={false}
                slug={encodeURIComponent(item.title)}
                source={'newsapi'}
                externalUrl={item.url}
              />
            )) : <div className="col-span-full text-[var(--muted-foreground)] text-lg">No news found.</div>}
          </div>
        )}
      </section>
    </main>
  );
} 