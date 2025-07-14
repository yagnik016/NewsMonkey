import Link from 'next/link';

interface CategoryNavProps {
  categories?: Array<{ name: string; slug: string; color?: string }>;
}

const defaultCategories = [
  { name: 'Politics', slug: 'politics', color: 'bg-blue-500 dark:bg-blue-700' },
  { name: 'Technology', slug: 'technology', color: 'bg-green-500 dark:bg-green-700' },
  { name: 'Sports', slug: 'sports', color: 'bg-orange-500 dark:bg-orange-700' },
  { name: 'Entertainment', slug: 'entertainment', color: 'bg-purple-500 dark:bg-purple-700' },
  { name: 'Health', slug: 'health', color: 'bg-red-500 dark:bg-red-700' },
  { name: 'Science', slug: 'science', color: 'bg-indigo-500 dark:bg-indigo-700' },
  { name: 'Business', slug: 'business', color: 'bg-yellow-500 dark:bg-yellow-700 text-gray-900 dark:text-gray-100' },
  { name: 'World', slug: 'world', color: 'bg-gray-500 dark:bg-gray-700' },
];

export function CategoryNav({ categories }: CategoryNavProps) {
  const cats = categories && categories.length > 0 ? categories : defaultCategories;
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {cats.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`${category.color || 'bg-gray-500 dark:bg-gray-700'} text-white dark:text-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
} 