import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account, preferences, and API integrations.</p>
        </div>
        <div className="glass rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center text-muted-foreground">
          <p className="text-lg font-semibold text-foreground mb-2">Account Settings</p>
          <p>User profile and platform settings coming soon.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
