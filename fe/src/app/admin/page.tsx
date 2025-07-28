import { AdminPanel } from '@/components/AdminPanel';
import NavbarClientWrapper from '@/components/NavbarClientWrapper';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarClientWrapper />
      
      <main className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🛠️ Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Manage news imports and monitor RSS feed updates
            </p>
          </div>
          
          <div className="grid gap-8">
            <AdminPanel />
            
            {/* Additional Admin Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                📊 System Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">RSS Feeds</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">6 Active</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">BBC, Reuters, CNN, etc.</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Auto Import</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">Every 2h</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">+ Daily at 6 AM</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cost</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$0/month</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completely free</p>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ⚡ Quick Actions
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="/news" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white p-4 rounded-lg text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  📰 View News
                </a>
                
                <a 
                  href="/news?category=technology" 
                  className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white p-4 rounded-lg text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  💻 Tech News
                </a>
                
                <a 
                  href="/news?category=business" 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white p-4 rounded-lg text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  💼 Business News
                </a>
                
                <a 
                  href="/news?category=sports" 
                  className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white p-4 rounded-lg text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  ⚽ Sports News
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 