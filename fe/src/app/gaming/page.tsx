import React from 'react';
import { API_BASE_URL } from '@/utils/apiConfig';

async function fetchGamingData() {
  try {
    const res = await fetch(`${API_BASE_URL}gaming`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch gaming data');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching gaming data:', error.message);
      return [];
    }
    return [];
  }
}

async function fetchFeaturedGaming() {
  try {
    const res = await fetch(`${API_BASE_URL}gaming/featured`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch featured gaming data');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching featured gaming data:', error.message);
      return [];
    }
    return [];
  }
}

export default async function GamingPage() {
  const gamingData = await fetchGamingData();
  const featuredGaming = await fetchFeaturedGaming();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-6">Gaming Zone</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Latest gaming news, trending games, and e-sports highlights. Join the community and level up your experience!</p>
      
      {/* Featured Gaming News */}
      {featuredGaming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-200">Featured Gaming News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGaming.map((game: {
              _id: string;
              imageUrl?: string;
              title: string;
              category: string;
              rating?: number;
              content: string;
              author: string;
              createdAt: string;
            }) => (
              <div key={game._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {game.imageUrl && (
                  <div className="h-48 bg-gray-200 dark:bg-gray-700">
                    <img src={game.imageUrl} alt={game.title} width={400} height={192} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{game.category}</span>
                    {game.rating && (
                      <span className="text-sm text-yellow-600 dark:text-yellow-400">★ {game.rating}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{game.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{game.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>By {game.author}</span>
                    <span>{new Date(game.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Gaming News */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-200">Latest Gaming News</h2>
        {gamingData.length > 0 ? (
          <div className="space-y-4">
            {gamingData.map((game: {
              _id: string;
              title: string;
              content: string;
              category: string;
              gameTitle?: string;
              author: string;
              views: number;
              likes: number;
            }) => (
              <div key={game._id} className="bg-indigo-50 dark:bg-indigo-900/40 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{game.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{game.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Category: {game.category}</span>
                      {game.gameTitle && <span>Game: {game.gameTitle}</span>}
                      <span>By {game.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>👁️ {game.views}</span>
                    <span>❤️ {game.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No gaming news available at the moment.</p>
          </div>
        )}
      </section>

      <div className="text-center mt-12">
        <a href="#" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all">Join the Gaming Community</a>
      </div>
    </main>
  );
} 