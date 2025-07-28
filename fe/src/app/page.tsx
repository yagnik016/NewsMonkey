import Link from 'next/link';
import Image from 'next/image';
import { FeaturedNews } from '@/components/FeaturedNews';
import { fetchNewsApi, fetchBreakingNews, fetchFeaturedNews, NewsArticle } from '@/utils/fetchNewsApi';
import ParallaxBg from '@/components/ParallaxBg';
import HomePageContent from './HomePageContent';
import NavbarClientWrapper from '@/components/NavbarClientWrapper';
import { BreakingNews } from '@/components/BreakingNews';

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
  
  // Fetch latest news from RSS feeds
  let newsData: NewsArticle[] = [];
  let breakingNews: NewsArticle[] = [];
  let featuredNews: NewsArticle[] = [];
  let newsError = false;
  
  try {
    // Fetch different types of news
    const [latestNews, breaking, featured] = await Promise.all([
      fetchNewsApi({ page: 1, pageSize: 6 }),
      fetchBreakingNews(),
      fetchFeaturedNews()
    ]);
    
    newsData = latestNews;
    breakingNews = breaking;
    featuredNews = featured;
  } catch (error: unknown) {
    console.error('Error fetching news:', error);
    newsError = true;
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <NavbarClientWrapper />
      
      {/* Breaking News Banner */}
      {breakingNews.length > 0 && (
        <BreakingNews articles={breakingNews} />
      )}
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <ParallaxBg />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="text-white drop-shadow-lg">Stay </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg">Informed</span>
              </h1>
              <p className="text-xl md:text-2xl text-white drop-shadow-lg mb-8 max-w-3xl mx-auto font-medium">
                Get the latest news from trusted sources like BBC, Reuters, CNN, and more. 
                Updated every 2 hours, completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/news" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  📰 Read Latest News
                </Link>
                <Link 
                  href="/admin" 
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 shadow-lg"
                >
                  🛠️ Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured News Section */}
        {featuredNews.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Stories
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Top stories from BBC, Reuters, CNN, and other trusted sources
                </p>
              </div>
              <FeaturedNews />
            </div>
          </section>
        )}

        {/* Latest News Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Latest News
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Fresh updates from RSS feeds, updated every 2 hours
                </p>
              </div>
              <Link 
                href="/news" 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All News
              </Link>
            </div>
            
            {newsError ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  News Loading...
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fetching latest news from RSS feeds. This may take a moment.
                </p>
                <Link 
                  href="/admin" 
                  className="inline-block mt-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🚀 Import News Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.map((article: NewsArticle) => (
                  <div key={article._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {article.images && article.images[0] && (
                      <div className="relative h-48 overflow-hidden">
                        <Image 
                          src={article.images[0]} 
                          alt={article.title}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                        {article.isBreaking && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            BREAKING
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-600 dark:text-gray-300 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                          {article.category?.name || 'General'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          By {article.author}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Source: {article.source}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Home Page Content */}
        <HomePageContent categoriesData={categoriesData} />
      </main>
    </div>
  );
}
