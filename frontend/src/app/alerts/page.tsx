import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell, BellRing, Settings2, Trash2 } from 'lucide-react';

const MOCK_ALERTS = [
  { id: 1, symbol: 'AAPL', condition: 'Price rises above', value: '$180.00', status: 'Active' },
  { id: 2, symbol: 'TSLA', condition: 'Price drops below', value: '$190.00', status: 'Active' },
  { id: 3, symbol: 'NVDA', condition: 'AI Recommends', value: 'STRONG BUY', status: 'Triggered' },
];

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
            <p className="text-muted-foreground mt-1">Configure price thresholds and AI recommendations.</p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Create Alert
          </button>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2"><BellRing className="w-5 h-5 text-primary" /> Active Alerts</h2>
          </div>
          <div className="divide-y divide-white/5">
            {MOCK_ALERTS.map((alert) => (
              <div key={alert.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${alert.status === 'Active' ? 'bg-primary/20 text-primary' : 'bg-chart-4/20 text-chart-4'}`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{alert.symbol}</h3>
                    <p className="text-muted-foreground text-sm">
                      {alert.condition} <strong className="text-foreground">{alert.value}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${alert.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {alert.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-md transition-colors">
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
