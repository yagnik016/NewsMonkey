import React from 'react';

export default function PodcastsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-6">Podcasts</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Listen to the latest news podcasts and featured episodes. Stay informed on the go!</p>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-200">Featured Episodes</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-gray-500 rounded-full flex items-center justify-center text-4xl">🎧</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Morning News Recap</h3>
              <audio controls className="w-full">
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-4xl">🎙️</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Tech Talk Weekly</h3>
              <audio controls className="w-full">
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 