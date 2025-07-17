"use client";
import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Newsletter signup:', { email, name });
    setIsSubscribed(true);
    setEmail('');
    setName('');
  };

  if (isSubscribed) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-8 border border-green-300/20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm mr-4">✅</div>
            <h3 className="text-2xl font-bold text-white">Thank You!</h3>
          </div>
          <p className="text-white/90 text-lg">
            You've been successfully subscribed to our newsletter. Check your email for exclusive updates!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 border border-blue-300/20 hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm mr-4">📧</div>
          <h3 className="text-2xl font-bold text-white">Subscribe to our Newsletter</h3>
        </div>
        <p className="text-white/90 text-center text-lg mb-8 max-w-2xl mx-auto">
          Get exclusive updates, breaking news, and a chance to win a <span className="text-pink-300 font-semibold">free premium subscription!</span>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Subscribe & Get Reward
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            Join <span className="text-yellow-300 font-semibold">10,000+</span> subscribers and never miss the latest news!
          </p>
        </div>
      </div>
    </div>
  );
} 