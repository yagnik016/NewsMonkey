"use client";

export default function LiveMediaWidget() {
  return (
    <section className="my-12 flex flex-col md:flex-row gap-8 items-center justify-center">
      {/* Live Video */}
      <div className="flex-1 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 border border-blue-200 dark:border-blue-800 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">Live News Stream</h3>
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow">
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA&autoplay=1"
            title="Live News Stream"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
      {/* Podcast/Audio */}
      <div className="flex-1 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 border border-pink-200 dark:border-pink-800 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-2 text-pink-700 dark:text-pink-300">Latest Podcast</h3>
        <audio controls className="w-full mt-2 rounded-lg">
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">Stay tuned for daily news podcasts and live discussions!</div>
      </div>
    </section>
  );
} 