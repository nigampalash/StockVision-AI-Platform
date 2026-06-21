import DashboardLayout from '@/components/layout/DashboardLayout';
import { Briefcase, TrendingUp, DollarSign, PieChart } from 'lucide-react';

const MOCK_HOLDINGS = [
  { symbol: 'AAPL', shares: 50, avgPrice: 150.00, currentPrice: 173.50, totalValue: 8675.00, return: 15.6 },
  { symbol: 'MSFT', shares: 20, avgPrice: 300.00, currentPrice: 338.11, totalValue: 6762.20, return: 12.7 },
  { symbol: 'NVDA', shares: 10, avgPrice: 500.00, currentPrice: 875.28, totalValue: 8752.80, return: 75.0 },
];

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
            <p className="text-muted-foreground mt-1">Manage your holdings and track performance.</p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Deposit Funds
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Briefcase />} label="Total Balance" value="$24,190.00" change="+12.4%" positive={true} />
          <StatCard icon={<TrendingUp />} label="Total Return" value="+$3,540.00" change="+8.2%" positive={true} />
          <StatCard icon={<DollarSign />} label="Available Cash" value="$5,810.00" change="Ready to trade" positive={true} />
        </div>

        <div className="glass rounded-2xl overflow-hidden mt-8">
          <div className="p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2"><PieChart className="w-5 h-5 text-primary" /> Current Holdings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 text-sm font-medium text-muted-foreground border-b border-black/10 dark:border-white/10">
                  <th className="p-4">Asset</th>
                  <th className="p-4 text-right">Shares</th>
                  <th className="p-4 text-right">Avg. Price</th>
                  <th className="p-4 text-right">Current Price</th>
                  <th className="p-4 text-right">Total Value</th>
                  <th className="p-4 text-right">Total Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_HOLDINGS.map((holding) => (
                  <tr key={holding.symbol} className="hover:bg-black/5 dark:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold">{holding.symbol}</td>
                    <td className="p-4 text-right">{holding.shares}</td>
                    <td className="p-4 text-right text-muted-foreground">${holding.avgPrice.toFixed(2)}</td>
                    <td className="p-4 text-right font-medium">${holding.currentPrice.toFixed(2)}</td>
                    <td className="p-4 text-right font-medium">${holding.totalValue.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${holding.return >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {holding.return >= 0 ? '+' : ''}{holding.return}%
                      </span>
                    </td>
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

function StatCard({ icon, label, value, change, positive }: { icon: any, label: string, value: string, change: string, positive: boolean }) {
  return (
    <div className="glass p-6 rounded-2xl flex flex-col gap-4">
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg text-primary">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
      <div>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className={`text-sm mt-2 font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {change} <span className="text-muted-foreground font-normal">vs last month</span>
        </p>
      </div>
    </div>
  );
}
