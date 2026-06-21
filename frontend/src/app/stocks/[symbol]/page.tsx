import DashboardLayout from '@/components/layout/DashboardLayout';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Activity, DollarSign, BarChart3, Clock } from 'lucide-react';

const TradingViewChart = dynamic(
  () => import('@/components/charts/TradingViewChart').then((mod) => mod.TradingViewChart),
  { ssr: false, loading: () => <div className="h-[400px] w-full animate-pulse bg-black/5 dark:bg-white/5 rounded-xl"></div> }
);

// In Next.js 15 app router, params for dynamic routes are a Promise.
// But for server components you can still type it as `Promise<{ symbol: string }>` and `await` it.
// Or just treat it synchronously if it hasn't changed. Actually Next 15 requires awaiting `params`.
export default async function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const decodedSymbol = decodeURIComponent(symbol).toUpperCase();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{decodedSymbol}</h1>
              <span className="px-2 py-1 rounded-md text-xs font-semibold bg-primary/20 text-primary">
                Technology
              </span>
            </div>
            <p className="text-muted-foreground mt-1">Tech Corporation Inc.</p>
          </div>
          
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-3xl font-bold text-foreground">$159.20</div>
              <div className="flex items-center justify-end text-chart-1 font-medium text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +2.4% Today
              </div>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20">
              Trade
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Price Chart</h2>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '1Y', 'ALL'].map((time) => (
                  <button key={time} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${time === '1M' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-black/5 dark:bg-white/5'}`}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <TradingViewChart symbol={decodedSymbol} />
          </div>

          {/* AI Analysis Panel */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gradient">AI Prediction</h2>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-muted-foreground">30-Day Forecast</div>
                  <div className="text-2xl font-bold">$168.45</div>
                </div>
                <div className="w-16 h-16 rounded-full bg-chart-1/10 flex items-center justify-center border-4 border-chart-1/20 text-chart-1 font-bold">
                  BUY
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confidence Score</span>
                  <span className="font-semibold text-chart-1">88%</span>
                </div>
                <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-muted-foreground">Expected Return</span>
                  <span className="font-semibold text-chart-1">+5.8%</span>
                </div>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Key Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <StatBox icon={<DollarSign className="w-4 h-4" />} label="Market Cap" value="2.8T" />
                <StatBox icon={<Activity className="w-4 h-4" />} label="P/E Ratio" value="32.4" />
                <StatBox icon={<BarChart3 className="w-4 h-4" />} label="Volume" value="45.2M" />
                <StatBox icon={<Clock className="w-4 h-4" />} label="52W High" value="$165.00" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="font-semibold text-foreground">{value}</div>
    </div>
  );
}
