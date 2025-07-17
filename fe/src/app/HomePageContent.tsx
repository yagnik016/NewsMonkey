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

// Premium Feature Placeholders with Enhanced Design
function GamingWidget() {
  return (
    <Link href="/gaming" className="block group">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 border border-indigo-300/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Gaming Zone</h2>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">🎮</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-semibold text-white text-lg mb-2">Elden Ring DLC</h3>
                <p className="text-white/80 text-sm">New adventures await in the Lands Between!</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-semibold text-white text-lg mb-2">GTA VI Trailer</h3>
                <p className="text-white/80 text-sm">Rockstars biggest release yet!</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-6xl animate-pulse">⚔️</div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

function FinanceWidget() {
  return (
    <Link href="/finance" className="block group">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-8 border border-emerald-300/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Finance Hub</h2>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">💹</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-semibold text-white text-lg mb-2">Bitcoin</h3>
                <p className="text-green-300 text-sm">$67,000 <span className="text-green-400">+2.1%</span></p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-semibold text-white text-lg mb-2">Ethereum</h3>
                <p className="text-red-300 text-sm">$3,200 <span className="text-red-400">-0.8%</span></p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-6xl animate-bounce">📈</div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

function PollOfTheDay() {
  return (
    <Link href="/polls" className="block group">
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-3xl shadow-2xl p-8 border border-amber-300/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Daily Poll</h2>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">🗳️</div>
          </div>
          <div className="text-center">
            <p className="text-white/90 text-lg mb-6">Which premium feature excites you most?</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <span className="text-white font-medium">Gaming</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <span className="text-white font-medium">Finance</span>
              </div>
            </div>
            <button className="mt-6 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all">
              Vote Now
            </button>
          </div>
        </div>
      </section>
    </Link>
  );
}

function VideoHighlights() {
  return (
    <Link href="/videos" className="block group">
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-600 to-purple-600 rounded-3xl shadow-2xl p-8 border border-pink-300/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Video Hub</h2>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">🎬</div>
          </div>
          <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">▶️</div>
              <p className="text-white/80">Trending Videos</p>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

function Podcasts() {
  return (
    <Link href="/podcasts" className="block group">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 border border-blue-300/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Podcasts</h2>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">🎧</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-white text-lg mb-4">Morning News Recap</h3>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">▶️</span>
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-1/3"></div>
                </div>
              </div>
              <span className="text-white/80 text-sm">2:15 / 6:30</span>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

function Leaderboard() {
  return (
    <Link href="/leaderboard" className="block group">
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl p-8 border border-violet-300/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">🏆</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥇</span>
                <span className="text-white font-semibold">Alice</span>
              </div>
              <span className="text-white font-bold">1200 pts</span>
            </div>
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥈</span>
                <span className="text-white font-semibold">Bob</span>
              </div>
              <span className="text-white font-bold">1100 pts</span>
            </div>
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥉</span>
                <span className="text-white font-semibold">Charlie</span>
              </div>
              <span className="text-white font-bold">950 pts</span>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default function HomePageContent({ categoriesData, newsData, newsError }: { categoriesData: unknown, newsData: unknown[], newsError: boolean }) {
  const { user } = useAuthContext();
  const isPremium = user && user.isSubscriber;
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with Trending Tags */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 shadow-2xl border border-purple-500/20">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NewsMonkey</span>
          </h1>
          <p className="text-white/80 text-center text-lg mb-8 max-w-3xl mx-auto">
            Your ultimate destination for breaking news, live updates, and premium content
          </p>
          <TrendingTags />
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Premium Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GamingWidget />
          <FinanceWidget />
          <PollOfTheDay />
          <VideoHighlights />
          <Podcasts />
          <Leaderboard />
        </div>
      </section>

      {/* Newsletter & Live Widgets Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {!isPremium && <AdBanner />}
            <NewsletterSignup />
          </div>
          <div className="space-y-8">
            <LiveMediaWidget />
            <StockWeatherWidget />
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="mb-16">
        <CategoryNav categories={categoriesData as { name: string; slug: string; color?: string }[] | undefined} />
      </section>

      {/* Current Affairs & Live Content */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CurrentAffairsSection />
          <div className="space-y-8">
            <LiveBlogsWidget />
            <LiveScoresWidget />
          </div>
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Latest News</span>
        </h2>
        {newsError ? (
          <div className="text-center py-12">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-red-400 text-lg font-semibold">Failed to load news</p>
              <p className="text-red-300 mt-2">Please try again later</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            )) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-500/10 border border-gray-500/20 rounded-2xl p-8">
                  <div className="text-6xl mb-4">📰</div>
                  <p className="text-gray-400 text-lg">No news found</p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
} 