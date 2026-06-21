import DashboardLayout from '@/components/layout/DashboardLayout';

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Manage your holdings, analyze performance, and track your history.</p>
        </div>
        <div className="glass rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center text-muted-foreground">
          <p className="text-lg font-semibold text-foreground mb-2">My Portfolio</p>
          <p>Portfolio management integration coming soon.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
