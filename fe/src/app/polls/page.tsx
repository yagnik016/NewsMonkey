'use client';
import React, { useState, useEffect } from 'react';

interface Poll {
  _id: string;
  question: string;
  options: string[];
  results: number[];
  totalVotes: number;
  category: string;
  author: string;
  createdAt: string;
}

async function fetchPollsData() {
  try {
    const res = await fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}polls`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch polls data');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching polls data:', error.message);
      return [];
    }
    return [];
  }
}

async function fetchDailyPoll() {
  try {
    const res = await fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}polls/daily`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch daily poll');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching daily poll:', error.message);
      return [];
    }
    return [];
  }
}

export default function PollsPage() {
  const [pollsData, setPollsData] = useState<Poll[]>([]);
  const [dailyPoll, setDailyPoll] = useState<Poll | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number }>({});
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [polls, daily] = await Promise.all([
        fetchPollsData(),
        fetchDailyPoll()
      ]);
      setPollsData(polls);
      setDailyPoll(daily[0] || null);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleVote = async (pollId: string, optionIndex: number) => {
    if (votedPolls.has(pollId)) return;

    try {
      const response = await fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optionIndex,
          userId: 'demo-user-' + Date.now() // Demo user ID
        }),
      });

      if (response.ok) {
        setVotedPolls(prev => new Set([...prev, pollId]));
        setSelectedOptions(prev => ({ ...prev, [pollId]: optionIndex }));
        
        // Update the poll results locally
        setPollsData(prev => prev.map(poll => {
          if (poll._id === pollId) {
            const newResults = [...poll.results];
            newResults[optionIndex]++;
            return { ...poll, results: newResults, totalVotes: poll.totalVotes + 1 };
          }
          return poll;
        }));

        if (dailyPoll && dailyPoll._id === pollId) {
          const newResults = [...dailyPoll.results];
          newResults[optionIndex]++;
          setDailyPoll({ ...dailyPoll, results: newResults, totalVotes: dailyPoll.totalVotes + 1 });
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0;
  };

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading polls...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-yellow-700 dark:text-yellow-300 mb-6">Polls & Quizzes</h1>
      
      {/* Daily Poll */}
      {dailyPoll && (
        <section className="mb-12 bg-yellow-50 dark:bg-yellow-900/40 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-200">Poll of the Day</h2>
          <div className="mb-4 text-lg font-semibold">{dailyPoll.question}</div>
          
          {!votedPolls.has(dailyPoll._id) ? (
            <div className="space-y-3">
              {dailyPoll.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-800 p-2 rounded">
                  <input
                    type="radio"
                    name={`poll-${dailyPoll._id}`}
                    checked={selectedOptions[dailyPoll._id] === index}
                    onChange={() => setSelectedOptions(prev => ({ ...prev, [dailyPoll._id]: index }))}
                    className="text-yellow-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
              <button
                className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-yellow-700 disabled:opacity-50"
                onClick={() => selectedOptions[dailyPoll._id] !== undefined && handleVote(dailyPoll._id, selectedOptions[dailyPoll._id])}
                disabled={selectedOptions[dailyPoll._id] === undefined}
              >
                Vote
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyPoll.options.map((option, index) => {
                const percentage = getPercentage(dailyPoll.results[index] || 0, dailyPoll.totalVotes);
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{option}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {dailyPoll.results[index] || 0} votes ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              <div className="mt-4 text-green-700 dark:text-green-300 font-semibold">
                Thank you for voting! Total votes: {dailyPoll.totalVotes}
              </div>
            </div>
          )}
        </section>
      )}

      {/* All Polls */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-200">All Polls</h2>
        {pollsData.length > 0 ? (
          pollsData.map((poll) => (
            <div key={poll._id} className="bg-pink-50 dark:bg-pink-900/40 rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-pink-700 dark:text-pink-200">{poll.question}</h3>
              
              {!votedPolls.has(poll._id) ? (
                <div className="space-y-3">
                  {poll.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-800 p-2 rounded">
                      <input
                        type="radio"
                        name={`poll-${poll._id}`}
                        checked={selectedOptions[poll._id] === index}
                        onChange={() => setSelectedOptions(prev => ({ ...prev, [poll._id]: index }))}
                        className="text-pink-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                  <button
                    className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-pink-700 disabled:opacity-50"
                    onClick={() => selectedOptions[poll._id] !== undefined && handleVote(poll._id, selectedOptions[poll._id])}
                    disabled={selectedOptions[poll._id] === undefined}
                  >
                    Submit Vote
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {poll.options.map((option, index) => {
                    const percentage = getPercentage(poll.results[index] || 0, poll.totalVotes);
                    return (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{option}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {poll.results[index] || 0} votes ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-pink-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-4 text-green-700 dark:text-green-300 font-semibold">
                    You voted! Total votes: {poll.totalVotes}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No polls available at the moment.</p>
          </div>
        )}
      </section>
    </main>
  );
} 