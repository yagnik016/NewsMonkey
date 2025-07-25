import Link from 'next/link';
import { FeaturedNews } from '@/components/FeaturedNews';
import { ThemeToggle } from '@/components/ThemeToggle';
import { fetchNewsApi } from '@/utils/fetchNewsApi';
import ParallaxBg from '@/components/ParallaxBg';
import UserMenu from '@/components/UserMenu';
import HomePageContent from './HomePageContent';

async function fetchCategories() {
  try {
    const res = await fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}news/categories`, { cache: 'no-store' });
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
  const categoriesData = await fetchCategories();
  let newsData: never[] = [];
  let newsError = false;
  try {
    newsData = await fetchNewsApi({ country: 'us', page: 1, pageSize: 6 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching news:', error.message);
      newsError = true;
    }
  }
  return (
    <div className="min-h-screen relative transition-colors duration-500 bg-[var(--background)]">
      <ParallaxBg />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[120vw] h-[120vw] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-br from-fuchsia-700 via-indigo-900 to-yellow-500 opacity-30 blur-3xl animate-gradient-move" />
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[var(--card-bg)]/90 backdrop-blur-lg shadow-lg rounded-b-2xl border-b border-gray-200 dark:border-[var(--border)] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo/Brand */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">NewsMonkey</h1>
            </div>
            {/* Centered Nav Links (hidden on mobile) */}
            <nav className="hidden md:flex flex-1 justify-center gap-4 overflow-x-auto scrollbar-none">
              {[
                { href: '/', label: 'Home' },
                { href: '/news', label: 'News' },
                { href: '/gaming', label: 'Gaming' },
                { href: '/finance', label: 'Finance' },
                { href: '/polls', label: 'Polls' },
                { href: '/videos', label: 'Videos' },
                { href: '/podcasts', label: 'Podcasts' },
                { href: '/leaderboard', label: 'Leaderboard' },
                { href: '/live-blogs', label: 'Live Blogs' },
                { href: '/live-scores', label: 'Live Scores' },
                { href: '/about', label: 'About' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1 font-medium text-gray-700 dark:text-[var(--foreground)] transition-colors duration-200 hover:text-blue-600 dark:hover:text-cyan-400 group whitespace-nowrap"
                >
                  <span className="pb-0.5 border-b-2 border-transparent group-hover:border-blue-600 dark:group-hover:border-cyan-400 transition-all duration-200">
                    {link.label}
                  </span>
                  {/* Active link indicator (for demo, Home is active) */}
                  {link.href === '/' && (
                    <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
            {/* Actions (right) */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />
              <UserMenu />
              <button className="hidden md:inline-block bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform font-semibold ml-2">
                Subscribe
              </button>
              {/* Hamburger for mobile */}
              <div className="md:hidden flex items-center">
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
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

      <HomePageContent categoriesData={categoriesData} newsData={newsData} newsError={newsError} />

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
                <li><Link href="/gaming" className="hover:text-[var(--primary)]">Gaming</Link></li>
                <li><Link href="/finance" className="hover:text-[var(--primary)]">Finance</Link></li>
                <li><Link href="/polls" className="hover:text-[var(--primary)]">Polls</Link></li>
                <li><Link href="/videos" className="hover:text-[var(--primary)]">Videos</Link></li>
                <li><Link href="/podcasts" className="hover:text-[var(--primary)]">Podcasts</Link></li>
                <li><Link href="/leaderboard" className="hover:text-[var(--primary)]">Leaderboard</Link></li>
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
            <p>&copy; 2025 Yagnik Vadaliya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
