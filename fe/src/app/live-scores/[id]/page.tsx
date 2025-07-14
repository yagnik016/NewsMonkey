"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function LiveScoreDetailPage() {
  const { id } = useParams();
  const [score, setScore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/v1/live-scores/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setScore(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Link href="/live-scores" className="text-green-600 dark:text-green-300 hover:underline font-medium text-sm mb-4 inline-block">← All Live Scores</Link>
      {loading ? (
        <div className="h-32 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-lg animate-pulse shadow-lg"></div>
      ) : error || !score ? (
        <div className="text-green-600 dark:text-green-300">Failed to load live score. Please try again later.</div>
      ) : (
        <article className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-green-300 mb-4">{score.teams?.join(" vs ")}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>{score.sport}</span>
            <span className="mx-2">•</span>
            <span>{score.status === 'live' ? 'LIVE' : score.status?.toUpperCase()}</span>
            <span className="mx-2">•</span>
            <span>{score.lastUpdate ? new Date(score.lastUpdate).toLocaleString() : ''}</span>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            {score.teams?.map((team: string, i: number) => (
              <div key={i} className="flex items-center justify-between bg-gradient-to-r from-green-100/60 to-blue-100/60 dark:from-green-900/40 dark:to-blue-900/40 rounded px-4 py-2">
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{team}</span>
                <span className="text-xl font-mono text-gray-800 dark:text-green-200 font-bold">{score.score?.[team] || '-'}</span>
              </div>
            ))}
          </div>
          <div className="text-gray-700 dark:text-gray-200 mb-4">{score.currentInning}</div>
          <div className="space-y-4">
            {score.events?.length > 0 ? score.events.map((event: any, i: number) => (
              <div key={i} className="bg-gradient-to-r from-green-100/60 to-blue-100/60 dark:from-green-900/40 dark:to-blue-900/40 rounded-lg p-4 shadow animate-fade-in-entry">
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-green-500 dark:bg-green-300 rounded-full animate-pulse mr-2"></span>
                  <span className="text-green-600 dark:text-green-300 font-semibold text-xs uppercase tracking-wider">EVENT</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{event.over ? `Over ${event.over}` : ''}</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : ''}</span>
                </div>
                <div className="text-gray-900 dark:text-gray-100 text-base mb-1">{event.desc}</div>
              </div>
            )) : <div className="text-gray-500 dark:text-gray-400">No events yet.</div>}
          </div>
        </article>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        .animate-fade-in-entry {
          animation: fadeInEntry 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInEntry {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
} 