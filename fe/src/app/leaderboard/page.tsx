import React from 'react';
import { API_BASE_URL } from '@/utils/apiConfig';

async function fetchLeaderboardData() {
  try {
    const res = await fetch(`${API_BASE_URL}leaderboard`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch leaderboard data');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching leaderboard data:', error.message);
      return [];
    }
    return [];
  }
}

async function fetchLeaderboardStats() {
  try {
    const res = await fetch(`${API_BASE_URL}leaderboard/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch leaderboard stats');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching leaderboard stats:', error.message);
      return null;
    }
    return null;
  }
}

export default async function LeaderboardPage() {
  const leaderboardData = await fetchLeaderboardData();
  const stats = await fetchLeaderboardStats();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-purple-700 dark:text-yellow-300 mb-6">Leaderboard</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">See the top contributors and most active users on NewsMonkey!</p>
      
      {/* Leaderboard Stats */}
      {stats && (
        <section className="mb-8 bg-gradient-to-r from-purple-100 to-yellow-100 dark:from-purple-900 dark:to-yellow-900 rounded-2xl p-6 border border-purple-300 dark:border-yellow-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-yellow-200">Community Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-yellow-300">{stats.totalUsers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{Math.round(stats.averagePoints)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{stats.topUser?.username || 'N/A'}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Top User</div>
            </div>
          </div>
        </section>
      )}

      {/* Leaderboard */}
      <section className="bg-gradient-to-r from-purple-100 to-yellow-100 dark:from-purple-900 dark:to-yellow-900 rounded-2xl shadow-lg p-8 border border-purple-300 dark:border-yellow-700">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-yellow-200">Top Contributors</h2>
        
        {leaderboardData.length > 0 ? (
          <div className="space-y-4">
            {leaderboardData.map((user: {
              _id: string;
              username: string;
              level: number;
              daysActive: number;
              points: number;
              articlesRead: number;
              commentsPosted: number;
              pollsVoted: number;
              badges: string[];
            }, index: number) => (
              <div key={user._id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                    </span>
                    <div>
                      <div className="font-semibold text-lg">{user.username}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Level {user.level} • {user.daysActive} days active
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold text-xl text-purple-700 dark:text-yellow-200">{user.points} pts</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {user.articlesRead} articles • {user.commentsPosted} comments • {user.pollsVoted} polls
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {user.badges.map((badge: string, badgeIndex: number) => (
                      <span key={badgeIndex} className="text-xl">{badge}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No leaderboard data available at the moment.</p>
          </div>
        )}
      </section>

      {/* Achievement System Info */}
      <section className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-yellow-200">How to Earn Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/40 rounded-lg">
            <div className="text-2xl mb-2">📖</div>
            <div className="font-semibold">Read Articles</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">+5 points per article</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/40 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <div className="font-semibold">Comment</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">+10 points per comment</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/40 rounded-lg">
            <div className="text-2xl mb-2">🗳️</div>
            <div className="font-semibold">Vote in Polls</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">+15 points per vote</div>
          </div>
        </div>
      </section>
    </main>
  );
} 