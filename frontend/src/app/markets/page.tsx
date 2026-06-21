import DashboardLayout from '@/components/layout/DashboardLayout';
import { ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';

const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 1.2, volume: '52M', marketCap: '2.8T' },
  { symbol: 'MSFT', name: 'Microsoft', price: 338.11, change: 0.8, volume: '28M', marketCap: '2.5T' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 875.28, change: -2.4, volume: '65M', marketCap: '2.1T' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 202.64, change: 3.5, volume: '110M', marketCap: '650B' },
  { symbol: 'AMZN', name: 'Amazon', price: 175.35, change: 0.4, volume: '40M', marketCap: '1.8T' },
];

export default function MarketsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Markets</h1>
            <p className="text-muted-foreground mt-1">Explore global market indices, sectors, and top movers.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search markets..." 
                className="pl-10 pr-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary w-full md:w-64"
              />
            </div>
            <button className="p-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg hover:bg-black/10 dark:bg-white/10 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium text-muted-foreground">
                  <th className="p-4">Symbol</th>
                  <th className="p-4">Company</th>
                  <th className="p-4 text-right">Price</th>
                  <th className="p-4 text-right">24h Change</th>
                  <th className="p-4 text-right">Volume</th>
                  <th className="p-4 text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_STOCKS.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-black/5 dark:bg-white/5 transition-colors group cursor-pointer">
                    <td className="p-4 font-semibold text-primary">{stock.symbol}</td>
                    <td className="p-4 text-muted-foreground">{stock.name}</td>
                    <td className="p-4 text-right font-medium">${stock.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <div className={`inline-flex items-center gap-1 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(stock.change)}%
                      </div>
                    </td>
                    <td className="p-4 text-right text-muted-foreground">{stock.volume}</td>
                    <td className="p-4 text-right text-muted-foreground">{stock.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
