import DashboardLayout from '@/components/layout/DashboardLayout';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Market Overview</h1>
            <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
          </div>
        </div>

        {/* Market Indices Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <IndexCard name="S&P 500" value="5,234.18" change="+1.2%" isPositive={true} />
          <IndexCard name="NASDAQ" value="16,401.84" change="+1.5%" isPositive={true} />
          <IndexCard name="DOW JONES" value="39,475.90" change="-0.4%" isPositive={false} />
          <IndexCard name="NIFTY 50" value="22,096.75" change="+0.8%" isPositive={true} />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Area */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Portfolio Performance
              </h2>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '1Y', 'ALL'].map((time) => (
                  <button key={time} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${time === '1M' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-black/5 dark:bg-white/5'}`}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
            {/* Placeholder for Chart */}
            <div className="h-[300px] w-full flex items-center justify-center border border-dashed border-black/10 dark:border-white/10 rounded-xl bg-black/5 dark:bg-white/5">
              <span className="text-muted-foreground text-sm">Interactive Chart Component</span>
            </div>
          </div>

          {/* Side Panel (Trending / AI Recommendations) */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gradient">AI Top Picks</h2>
            <div className="space-y-4">
              <StockPick symbol="NVDA" name="NVIDIA Corp" action="STRONG BUY" confidence={94} />
              <StockPick symbol="MSFT" name="Microsoft" action="BUY" confidence={88} />
              <StockPick symbol="TSLA" name="Tesla Inc" action="HOLD" confidence={65} />
              <StockPick symbol="AAPL" name="Apple Inc" action="SELL" confidence={42} />
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

function IndexCard({ name, value, change, isPositive }: { name: string, value: string, change: string, isPositive: boolean }) {
  return (
    <div className="glass p-5 rounded-2xl flex flex-col gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
      <span className="text-muted-foreground text-sm font-medium">{name}</span>
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-chart-1' : 'text-chart-2'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {change}
      </div>
    </div>
  );
}

function StockPick({ symbol, name, action, confidence }: { symbol: string, name: string, action: string, confidence: number }) {
  const getActionColor = (action: string) => {
    if (action.includes('BUY')) return 'text-chart-1 bg-chart-1/10';
    if (action.includes('SELL')) return 'text-chart-2 bg-chart-2/10';
    return 'text-chart-4 bg-chart-4/10';
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-black/5 dark:border-white/5">
      <div>
        <div className="font-bold text-foreground">{symbol}</div>
        <div className="text-xs text-muted-foreground">{name}</div>
      </div>
      <div className="text-right">
        <div className={`text-xs font-bold px-2 py-1 rounded-md inline-block mb-1 ${getActionColor(action)}`}>
          {action}
        </div>
        <div className="text-xs text-muted-foreground">Score: {confidence}/100</div>
      </div>
    </div>
  );
}
