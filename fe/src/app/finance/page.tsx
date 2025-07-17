import React from 'react';

async function fetchFinanceData() {
  try {
    const res = await fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}finance`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch finance data');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching finance data:', error.message);
      return [];
    }
    return [];
  }
}

async function fetchMarketSummary() {
  try {
    const res = await fetch(`${process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/'}finance/market-summary`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch market summary');
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching market summary:', error.message);
      return null;
    }
    return null;
  }
}

export default async function FinancePage() {
  const financeData = await fetchFinanceData();
  const marketSummary = await fetchMarketSummary();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-300 mb-6">Finance & Crypto Dashboard</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Track the latest in stocks, crypto, and financial news. Stay ahead with real-time insights!</p>
      
      {/* Market Summary */}
      {marketSummary && (
        <section className="mb-8 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-2xl p-6 border border-green-300 dark:border-green-700">
          <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-200">Market Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-300">{marketSummary.totalAssets}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Assets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{marketSummary.cryptoCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Crypto</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">{marketSummary.stockCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Stocks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{marketSummary.topUser?.username || 'N/A'}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Top Performer</div>
            </div>
          </div>
        </section>
      )}

      {/* Market Tickers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-200">Market Tickers</h2>
        {financeData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeData.map((item: {
              _id: string;
              type: 'crypto' | 'stock';
              name: string;
              price: number;
              changePercent: number;
            }) => (
              <div key={item._id} className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
                <div className={`w-24 h-24 bg-gradient-to-br from-${item.type === 'crypto' ? 'green' : 'blue'}-400 to-${item.type === 'crypto' ? 'blue' : 'gray'}-500 rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-lg mb-3`}>
                  {item.type === 'crypto' ? '₿' : '$'}
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  ${item.price.toLocaleString()}
                </p>
                <span className={`text-sm font-bold ${
                  item.changePercent > 0 ? 'text-green-600 dark:text-green-400' : 
                  item.changePercent < 0 ? 'text-red-500 dark:text-red-400' : 
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {item.type === 'crypto' ? 'Crypto' : 'Stock'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No market data available at the moment.</p>
          </div>
        )}
      </section>

      {/* Top Performers */}
      {marketSummary?.topGainers && marketSummary.topGainers.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-200">Top Gainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketSummary.topGainers.map((item: {
              _id: string;
              symbol: string;
              changePercent: number;
              price: number;
            }) => (
              <div key={item._id} className="bg-green-50 dark:bg-green-900/40 rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.symbol}</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">+{item.changePercent.toFixed(2)}%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">${item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="text-center mt-12">
        <a href="#" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all">Explore Investment Tips</a>
      </div>
    </main>
  );
} 