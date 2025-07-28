'use client';
import { useState } from 'react';
import { API_BASE_URL } from '@/utils/apiConfig';

interface ImportStatus {
  message: string;
  imported: number;
  category?: string;
}

export function AdminPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ImportStatus | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'science', label: 'Science' },
  ];

  const triggerImport = async (category?: string) => {
    setIsLoading(true);
    setStatus(null);

    try {
      // Try the simple endpoint first
      let url = category 
        ? `${API_BASE_URL}news/import/rss/simple?category=${category}`
        : `${API_BASE_URL}news/import/rss/simple`;

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If simple endpoint fails, try the original endpoint
      if (!response.ok) {
        url = category 
          ? `${API_BASE_URL}news/import/rss/now?category=${category}`
          : `${API_BASE_URL}news/import/rss/now`;

        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setStatus(result);
    } catch (error) {
      console.error('Error triggering import:', error);
      setStatus({
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        imported: 0,
        category: category || 'all categories'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testBackend = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}news/test`);
      const result = await response.json();
      setStatus({
        message: `Backend test: ${result.message}`,
        imported: 0,
        category: 'test'
      });
    } catch (error) {
      setStatus({
        message: `Backend test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        imported: 0,
        category: 'test'
      });
    }
  };

  const importAll = () => triggerImport();
  const importCategory = () => triggerImport(selectedCategory);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        📰 News Import Admin
      </h2>
      
      <div className="space-y-6">
        {/* Import All Categories */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Import All Categories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Import latest news from all RSS feeds (BBC, Reuters, CNN, etc.)
          </p>
          <div className="flex gap-2">
            <button
              onClick={importAll}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '🔄 Importing...' : '🚀 Import All News'}
            </button>
            <button
              onClick={testBackend}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🧪 Test Backend
            </button>
          </div>
        </div>

        {/* Import Specific Category */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Import Specific Category
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <button
              onClick={importCategory}
              disabled={isLoading || !selectedCategory}
              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '🔄 Importing...' : '📰 Import Category'}
            </button>
          </div>
        </div>

        {/* Status Display */}
        {status && (
          <div className={`rounded-lg p-4 border ${
            status.message.includes('Error') 
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
              : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                status.message.includes('Error') ? 'bg-red-500' : 'bg-green-500'
              }`}></div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {status.message}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {status.imported} articles imported from {status.category}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            ℹ️ How It Works
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li>• <strong>RSS Feeds:</strong> BBC, Reuters, CNN, The Guardian</li>
            <li>• <strong>Categories:</strong> General, Technology, Business, Sports, Entertainment, Science</li>
            <li>• <strong>Auto Import:</strong> Every 2 hours + daily at 6 AM</li>
            <li>• <strong>No Limits:</strong> Completely free, no API costs</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 