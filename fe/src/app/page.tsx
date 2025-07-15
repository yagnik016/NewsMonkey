import Link from 'next/link';
import { NewsCard } from '@/components/NewsCard';
import { BreakingNews } from '@/components/BreakingNews';
import { CategoryNav } from '@/components/CategoryNav';
import { FeaturedNews } from '@/components/FeaturedNews';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CurrentAffairsSection } from '@/components/CurrentAffairsSection';
import { LiveBlogsWidget } from '@/components/LiveBlogsWidget';
import { LiveScoresWidget } from '@/components/LiveScoresWidget';
import { fetchNewsApi } from '@/utils/fetchNewsApi';
import ParallaxBg from '@/components/ParallaxBg';

async function fetchCategories() {
  try {
    const res = await fetch('http://localhost:3001/api/v1/news/categories', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching categories:', error.message);
      return { error: true };
    }
    return { error: true };
  }
}

export default async function HomePage() {
  let newsData: {
    url: string;
    title: string;
    description: string;
    source?: {
      name: string;
    };
    publishedAt: string;
    urlToImage?: string;
  }[] = [];
  let newsError = false;
  try {
    newsData = await fetchNewsApi({ country: 'us', page: 1, pageSize: 6 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching news:', error.message);
      newsError = true;
    }
  }
  const categoriesData = await fetchCategories();

  return (
    <div className="min-h-screen relative transition-colors duration-500" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <ParallaxBg />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[120vw] h-[120vw] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-br from-fuchsia-700 via-indigo-900 to-yellow-500 opacity-30 blur-3xl animate-gradient-move" />
      </div>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 shadow-sm border-b backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600 dark:text-yellow-400 drop-shadow-lg tracking-tight">NewsMonkey</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-yellow-400 font-medium transition-colors">Home</Link>
              <Link href="/news" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-yellow-400 font-medium transition-colors">News</Link>
              <Link href="/live-blogs" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-yellow-400 font-medium transition-colors">Live Blogs</Link>
              <Link href="/live-scores" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-yellow-400 font-medium transition-colors">Live Scores</Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-yellow-400 font-medium transition-colors">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="bg-gradient-to-r from-red-500 to-yellow-400 dark:from-yellow-500 dark:to-red-600 text-white dark:text-gray-900 px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-transform font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breaking News Banner */}
      <BreakingNews />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation */}
        <CategoryNav categories={categoriesData?.error ? [] : categoriesData} />
        <CurrentAffairsSection />
        <LiveBlogsWidget />
        <LiveScoresWidget />

        {/* Featured News Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Featured News</h2>
          {/* You can fetch and map featured news here if you have a featured endpoint */}
          <FeaturedNews />
        </section>

        {/* Latest News Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Latest News</h2>
          {newsError ? (
            <div className="text-red-600 dark:text-yellow-400">Failed to load news. Please try again later.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData?.length > 0 ? newsData.map((item: {
                url: string;
                title: string;
                description: string;
                source?: {
                  name: string;
                };
                publishedAt: string;
                urlToImage?: string;
              }) => (
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
              )) : <div className="col-span-full text-gray-500 dark:text-gray-400">No news found.</div>}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/90 dark:bg-black/80 text-white py-12 mt-16 shadow-inner backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NewsMonkey</h3>
              <p className="text-gray-400">Your trusted source for breaking news, live updates, and comprehensive coverage.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/category/politics" className="hover:text-white">Politics</Link></li>
                <li><Link href="/category/technology" className="hover:text-white">Technology</Link></li>
                <li><Link href="/category/sports" className="hover:text-white">Sports</Link></li>
                <li><Link href="/category/entertainment" className="hover:text-white">Entertainment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/live-blogs" className="hover:text-white">Live Blogs</Link></li>
                <li><Link href="/live-scores" className="hover:text-white">Live Scores</Link></li>
                <li><Link href="/breaking-news" className="hover:text-white">Breaking News</Link></li>
                <li><Link href="/search" className="hover:text-white">Search</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NewsMonkey. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
