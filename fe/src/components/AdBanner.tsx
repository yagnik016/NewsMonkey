"use client";
export default function AdBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-8 border border-amber-300/20 hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm mr-4">📢</div>
          <h3 className="text-2xl font-bold text-white">Advertisement</h3>
        </div>
        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
          Your ad could be here! Reach thousands of engaged readers on NewsMonkey and boost your brand visibility.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
            <span className="text-white font-semibold">Premium Placement</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
            <span className="text-white font-semibold">High Engagement</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
            <span className="text-white font-semibold">Targeted Audience</span>
          </div>
        </div>
        <button className="mt-6 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-all border border-white/20">
          Get Started Today
        </button>
      </div>
    </div>
  );
} 