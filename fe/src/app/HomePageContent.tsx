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