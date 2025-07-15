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
    <div className="min-h-screen relative transition-colors duration-500 bg-[var(--background)]">
      <ParallaxBg />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[120vw] h-[120vw] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-br from-fuchsia-700 via-indigo-900 to-yellow-500 opacity-30 blur-3xl animate-gradient-move" />
      </div>
      {/* Header */}
      <header className="bg-[var(--card-bg)]/90 shadow-sm border-b border-[var(--border)] backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-extrabold text-[var(--primary)] tracking-tight">NewsMonkey</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">Home</Link>
              <Link href="/news" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">News</Link>
              <Link href="/live-blogs" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">Live Blogs</Link>
              <Link href="/live-scores" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">Live Scores</Link>
              <Link href="/about" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero/Featured Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] leading-tight mb-2">Stay Ahead with the Latest News</h2>
          <p className="text-lg text-[var(--muted-foreground)] mb-4 max-w-xl">Get real-time updates, in-depth analysis, and breaking stories from around the world. Your trusted source for news, delivered with clarity and speed.</p>
          <Link href="/news" className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all text-lg">Explore News →</Link>
        </div>
        <div className="flex-1 w-full max-w-lg">
          <FeaturedNews />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation */}
        <CategoryNav categories={categoriesData?.error ? [] : categoriesData} />
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
              )) : <div className="col-span-full text-[var(--muted-foreground)] text-lg">No news found.</div>}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--card-bg)]/95 text-[var(--muted-foreground)] py-12 mt-16 shadow-inner backdrop-blur-md border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-4">NewsMonkey</h3>
              <p>Your trusted source for breaking news, live updates, and comprehensive coverage.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[var(--foreground)]">Categories</h4>
              <ul className="space-y-2">
                <li><Link href="/category/politics" className="hover:text-[var(--primary)]">Politics</Link></li>
                <li><Link href="/category/technology" className="hover:text-[var(--primary)]">Technology</Link></li>
                <li><Link href="/category/sports" className="hover:text-[var(--primary)]">Sports</Link></li>
                <li><Link href="/category/entertainment" className="hover:text-[var(--primary)]">Entertainment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[var(--foreground)]">Features</h4>
              <ul className="space-y-2">
                <li><Link href="/live-blogs" className="hover:text-[var(--primary)]">Live Blogs</Link></li>
                <li><Link href="/live-scores" className="hover:text-[var(--primary)]">Live Scores</Link></li>
                <li><Link href="/breaking-news" className="hover:text-[var(--primary)]">Breaking News</Link></li>
                <li><Link href="/search" className="hover:text-[var(--primary)]">Search</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[var(--foreground)]">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-[var(--primary)]">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--primary)]">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-[var(--primary)]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[var(--primary)]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 text-center">
            <p>&copy; 2024 NewsMonkey. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
