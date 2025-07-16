"use client";

export default function StockWeatherWidget() {
  // Demo data
  const stocks = [
    { symbol: "S&P 500", value: 5230.77, change: +0.45 },
    { symbol: "NASDAQ", value: 16251.84, change: -0.12 },
    { symbol: "DOW J.", value: 38712.21, change: +0.22 },
  ];
  const weather = {
    city: "New York",
    temp: 22,
    desc: "Partly Cloudy",
    icon: "☁️"
  };
  return (
    <section className="my-8 flex flex-col md:flex-row gap-8 items-center justify-center">
      {/* Stock Widget */}
      <div className="flex-1 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 border border-green-200 dark:border-green-800 flex flex-col items-center">
        <h3 className="text-lg font-bold mb-2 text-green-700 dark:text-green-300">Stock Market</h3>
        <div className="flex flex-col gap-2 w-full">
          {stocks.map((s) => (
            <div key={s.symbol} className="flex justify-between items-center px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/40">
              <span className="font-semibold">{s.symbol}</span>
              <span className="font-mono">{s.value.toFixed(2)}</span>
              <span className={
                "text-sm font-bold " +
                (s.change > 0 ? "text-green-600" : s.change < 0 ? "text-red-500" : "text-gray-500")
              }>
                {s.change > 0 ? "+" : ""}{s.change}%
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Weather Widget */}
      <div className="flex-1 w-full max-w-xs bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 border border-blue-200 dark:border-blue-800 flex flex-col items-center">
        <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">Weather</h3>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-1">{weather.icon}</span>
          <span className="text-3xl font-bold">{weather.temp}&deg;C</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">{weather.city}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{weather.desc}</span>
        </div>
      </div>
    </section>
  );
} 