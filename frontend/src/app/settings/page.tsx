import DashboardLayout from '@/components/layout/DashboardLayout';
import { User, Lock, Bell, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account, preferences, and API integrations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-2">
            <TabButton icon={<User />} label="Profile" active={true} />
            <TabButton icon={<Lock />} label="Security" active={false} />
            <TabButton icon={<Bell />} label="Notifications" active={false} />
            <TabButton icon={<Palette />} label="Appearance" active={false} />
          </div>

          <div className="md:col-span-3 glass rounded-2xl p-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold mb-4">Trading Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Auto-Trading</h3>
                    <p className="text-sm text-muted-foreground">Allow AI to execute trades automatically based on recommendations.</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-muted-foreground rounded-full absolute top-1 left-1 border border-white/20"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Risk Tolerance</h3>
                    <p className="text-sm text-muted-foreground">Set your investment risk profile for tailored recommendations.</p>
                  </div>
                  <select className="bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-primary">
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option selected>Aggressive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
              <button className="px-6 py-2 rounded-lg font-medium border border-white/10 hover:bg-white/5 transition-colors">Cancel</button>
              <button className="px-6 py-2 rounded-lg font-medium bg-primary text-white hover:bg-primary/90 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function TabButton({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-left ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}>
      <div className="w-5 h-5">{icon}</div>
      {label}
    </button>
  );
}
