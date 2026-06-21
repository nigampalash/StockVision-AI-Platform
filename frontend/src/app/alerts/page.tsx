import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-1">Configure price thresholds, AI recommendations, and volume alerts.</p>
        </div>
        <div className="glass rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center text-muted-foreground">
          <p className="text-lg font-semibold text-foreground mb-2">Active Alerts</p>
          <p>Notification and alert systems coming soon.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
