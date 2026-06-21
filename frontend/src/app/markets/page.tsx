import DashboardLayout from '@/components/layout/DashboardLayout';

export default function MarketsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Markets</h1>
          <p className="text-muted-foreground mt-1">Explore global market indices, sectors, and top movers.</p>
        </div>
        <div className="glass rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center text-muted-foreground">
          <p className="text-lg font-semibold text-foreground mb-2">Markets Overview</p>
          <p>Detailed market analysis and heatmaps coming soon.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
