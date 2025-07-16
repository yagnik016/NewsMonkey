"use client";
export default function AdBanner() {
  return (
    <div className="my-8 w-full flex justify-center">
      <div className="bg-gradient-to-r from-yellow-200 to-pink-100 dark:from-yellow-900 dark:to-pink-900 border border-yellow-300 dark:border-yellow-700 rounded-xl shadow p-6 text-center max-w-xl w-full">
        <span className="text-lg font-bold text-yellow-700 dark:text-yellow-200">Advertisement</span>
        <div className="mt-2 text-gray-700 dark:text-gray-200 text-sm">Your ad could be here! Reach thousands of readers on NewsMonkey.</div>
      </div>
    </div>
  );
} 