import React from 'react';

export default function VideosPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-pink-700 dark:text-pink-300 mb-6">Video Highlights</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Watch trending news, entertainment, and sports videos. Stay informed and entertained!</p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow">
          <iframe
            src="https://www.youtube.com/embed/5qap5aO4i9A"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow">
          <iframe
            src="https://www.youtube.com/embed/3fumBcKC6RE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow">
          <iframe
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>
    </main>
  );
} 