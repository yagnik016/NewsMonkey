import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  imageUrl: string;
  isBreaking?: boolean;
  slug?: string;
  source?: string;
  externalUrl?: string;
}

export function NewsCard({ 
  title, 
  summary, 
  category, 
  publishedAt, 
  imageUrl, 
  isBreaking = false,
  slug = '#',
  source,
  externalUrl
}: NewsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover bg-gray-100 dark:bg-gray-800"
        />
        {isBreaking && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold shadow dark:shadow-yellow-400">
            BREAKING
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-80 text-white px-2 py-1 rounded text-xs">
          {category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{category}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          <Link href={`/news/${slug}`} className="hover:text-red-600 dark:hover:text-yellow-400">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
          {summary}
        </p>
        <div className="flex items-center">
          <Link 
            href={`/news/${slug}`}
            className="text-red-600 dark:text-yellow-400 hover:text-red-700 dark:hover:text-yellow-300 font-medium text-sm"
          >
            Read More →
          </Link>
          {source === 'newsapi' && externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-blue-600 dark:text-blue-300 hover:underline text-sm font-medium"
            >
              Read Original →
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 