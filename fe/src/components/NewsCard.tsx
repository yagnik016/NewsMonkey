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
    <div
      className="rounded-2xl shadow-xl overflow-hidden bg-[var(--card-bg)] hover:shadow-2xl transition-all duration-300 group border border-[var(--border)]"
      style={{ boxShadow: 'var(--card-shadow)', borderRadius: 'var(--radius)' }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        {isBreaking && (
          <div className="absolute top-3 left-3 bg-[var(--secondary)] text-white px-3 py-1 rounded-full text-xs font-bold shadow">
            BREAKING
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {category}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center text-xs text-[var(--muted-foreground)] font-medium gap-2">
          <span>{new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
        <h3 className="text-xl font-extrabold text-[var(--foreground)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2">
          <Link href={`/news/${slug}`}>{title}</Link>
        </h3>
        <p className="text-[var(--muted-foreground)] text-base line-clamp-3">
          {summary}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <Link
            href={`/news/${slug}`}
            className="font-semibold text-[var(--secondary)] hover:text-[var(--secondary-hover)] transition-colors text-sm"
          >
            Read More →
          </Link>
          {source === 'newsapi' && externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors text-sm"
            >
              Read Original →
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 