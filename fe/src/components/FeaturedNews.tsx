import Link from 'next/link';
import Image from 'next/image';

export function FeaturedNews() {
  const featuredNews = [
    {
      id: 1,
      title: "Revolutionary AI Technology Transforms Healthcare Industry",
      summary: "A breakthrough in artificial intelligence has led to unprecedented advances in medical diagnosis and treatment planning.",
      imageUrl: "/api/placeholder/600/400",
      category: "Technology",
      publishedAt: "2024-01-15",
      slug: "ai-healthcare-breakthrough"
    },
    {
      id: 2,
      title: "Global Leaders Unite for Climate Action Summit",
      summary: "World leaders gather in unprecedented numbers to address the urgent climate crisis and commit to ambitious targets.",
      imageUrl: "/api/placeholder/600/400",
      category: "Politics",
      publishedAt: "2024-01-15",
      slug: "climate-summit-2024"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {featuredNews.map((news) => (
        <div key={news.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <Image
              src={news.imageUrl}
              alt={news.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover bg-gray-100 dark:bg-gray-800"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold shadow dark:shadow-yellow-400">
              FEATURED
            </div>
            <div className="absolute top-4 right-4 bg-black bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-80 text-white px-3 py-1 rounded text-sm">
              {news.category}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{news.category}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              <Link href={`/news/${news.slug}`} className="hover:text-red-600 dark:hover:text-yellow-400">
                {news.title}
              </Link>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {news.summary}
            </p>
            <Link 
              href={`/news/${news.slug}`}
              className="inline-flex items-center text-red-600 dark:text-yellow-400 hover:text-red-700 dark:hover:text-yellow-300 font-semibold"
            >
              Read Full Article
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 