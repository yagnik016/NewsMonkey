"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Score } from '@/types';

export default function LiveScoresPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/v1/live-scores")
      .then((res) => res.json())
      .then((data) => {
        setScores(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex items-center mb-8">
        <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-500 to-green-400 rounded-full mr-3 animate-pulse"></span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-green-300 tracking-tight">Live Scores</h1>
        <Link href="/" className="ml-auto text-green-600 dark:text-green-300 hover:underline font-medium text-sm">Home</Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-24 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-green-600 dark:text-green-300">Failed to load live scores. Please try again later.</div>
      ) : scores.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No live matches at the moment.</div>
      ) : scores.filter((s) => s.status === 'live').length === 0 ? (
        <div>
          <div className="text-gray-500 dark:text-gray-400 mb-4">No live matches at the moment.</div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Upcoming Matches</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scores.filter((s) => s.status === 'upcoming').length === 0 ? (
              <div className="text-gray-400 dark:text-gray-500 col-span-full">No upcoming matches scheduled.</div>
            ) : (
              scores.filter((s) => s.status === 'upcoming').map((match) => (
                <div key={match._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-blue-500 dark:border-blue-300 transition-transform hover:scale-105 relative overflow-hidden">
                  <div className="flex items-center mb-2">
                    <span className="w-2 h-2 bg-blue-500 dark:bg-blue-300 rounded-full animate-pulse mr-2"></span>
                    <span className="text-blue-600 dark:text-blue-300 font-semibold text-xs uppercase tracking-wider">UPCOMING</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{match.sport}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{match.teams[0]}</span>
                    <span className="text-xl font-mono text-gray-800 dark:text-blue-200 font-bold">vs</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{match.teams[1]}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>Start Time:</span>
                    <span className="ml-1 font-semibold">{match.lastUpdate ? new Date(match.lastUpdate).toLocaleString() : '-'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scores.map((score) => (
            <div key={score._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-green-500 dark:border-green-300 transition-transform hover:scale-105 relative overflow-hidden">
              <div className="flex items-center mb-2">
                <span className="w-2 h-2 bg-green-500 dark:bg-green-300 rounded-full animate-pulse mr-2"></span>
                <span className="text-green-600 dark:text-green-300 font-semibold text-xs uppercase tracking-wider">{score.status === 'live' ? 'LIVE' : score.status.toUpperCase()}</span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{score.sport}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{score.teams[0]}</span>
                <span className="text-xl font-mono text-gray-800 dark:text-green-200 font-bold">{score.score[score.teams[0]] || '-'}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{score.teams[1]}</span>
                <span className="text-xl font-mono text-gray-800 dark:text-green-200 font-bold">{score.score[score.teams[1]] || '-'}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{score.currentInning}</span>
                <span className="mx-2">•</span>
                <span>Last update: {score.lastUpdate ? new Date(score.lastUpdate).toLocaleTimeString() : '-'}</span>
              </div>
              <Link href={`/live-scores/${score._id}`} className="absolute top-2 right-2 text-green-600 dark:text-green-300 hover:underline text-xs font-medium z-10">Details →</Link>
              {score.status === 'live' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 animate-pulse" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 