"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      setName("");
    }, 1200);
  };

  return (
    <section className="my-12 flex flex-col items-center">
      <div className="bg-gradient-to-r from-blue-50 to-pink-50 dark:from-blue-900 dark:to-pink-900 border border-blue-200 dark:border-pink-700 rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-2 text-[var(--primary)]">Subscribe to our Newsletter</h3>
        <div className="mb-4 text-gray-700 dark:text-gray-200 text-sm text-center">Get exclusive updates, breaking news, and a chance to win a <span className="font-semibold text-pink-600 dark:text-pink-300">free premium subscription!</span></div>
        {success ? (
          <div className="text-green-600 font-semibold text-center">Thank you for subscribing! Check your inbox for a welcome gift 🎁</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full items-center">
            <input
              type="text"
              placeholder="Your Name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition w-full"
              required
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe & Get Reward"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
} 