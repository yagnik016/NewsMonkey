import Link from 'next/link';
import { FeaturedNews } from '@/components/FeaturedNews';
import { fetchNewsApi } from '@/utils/fetchNewsApi';
import ParallaxBg from '@/components/ParallaxBg';
import HomePageContent from './HomePageContent';
import NavbarClientWrapper from '@/components/NavbarClientWrapper';

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
    <div className="min-h-screen relative transition-colors duration-500 bg-[var(--background)] overflow-x-hidden">
      <ParallaxBg />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[120vw] h-[120vw] left-1/2 top-0 -translate-x-1/2 bg-gradient-to-br from-fuchsia-700 via-indigo-900 to-yellow-500 opacity-30 blur-3xl animate-gradient-move" />
      </div>
      {/* Header */}
      <NavbarClientWrapper />

      {/* Hero/Featured Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] leading-tight mb-2">Stay Ahead with the Latest News</h2>
          <p className="text-lg text-[var(--muted-foreground)] mb-4 max-w-xl">Get real-time updates, in-depth analysis, and breaking stories from around the world. Your trusted source for news, delivered with clarity and speed.</p>
          <Link href="/news" className="inline-block bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all text-lg">Explore News →</Link>
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
