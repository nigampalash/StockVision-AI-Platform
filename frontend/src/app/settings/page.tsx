"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { User, Lock, Bell, Palette } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [autoTrading, setAutoTrading] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account, preferences, and API integrations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-2">
            <TabButton icon={<User />} label="Profile" active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} />
            <TabButton icon={<Lock />} label="Security" active={activeTab === 'Security'} onClick={() => setActiveTab('Security')} />
            <TabButton icon={<Bell />} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
            <TabButton icon={<Palette />} label="Appearance" active={activeTab === 'Appearance'} onClick={() => setActiveTab('Appearance')} />
          </div>

          <div className="md:col-span-3 glass rounded-2xl p-8 space-y-8">
            {activeTab === 'Profile' && (
              <>
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
                      <div 
                        onClick={() => setAutoTrading(!autoTrading)}
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${autoTrading ? 'bg-primary' : 'bg-white/10'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${autoTrading ? 'translate-x-7' : 'translate-x-1 border border-white/20'}`}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Risk Tolerance</h3>
                        <p className="text-sm text-muted-foreground">Set your investment risk profile for tailored recommendations.</p>
                      </div>
                      <select defaultValue="Aggressive" className="bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-primary">
                        <option value="Conservative">Conservative</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Aggressive">Aggressive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Security' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <p className="text-muted-foreground">Change your password and enable two-factor authentication.</p>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                <p className="text-muted-foreground">Choose how and when you want to be notified.</p>
                <div className="mt-6 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                    <span>Email me when AI predicts a STRONG BUY</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                    <span>Daily portfolio performance summary</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'Appearance' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
                <p className="text-muted-foreground">Customize the look and feel of your dashboard.</p>
                <div className="mt-6 flex gap-4">
                   <div 
                     onClick={() => setTheme('dark')}
                     className={`p-4 border rounded-lg cursor-pointer text-center w-32 transition-colors ${theme === 'dark' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                   >
                     <div className="w-10 h-10 bg-[#0a0f1c] rounded-full mx-auto mb-2 border border-white/20"></div>
                     <span className="text-sm font-medium">Dark Mode</span>
                   </div>
                   <div 
                     onClick={() => setTheme('light')}
                     className={`p-4 border rounded-lg cursor-pointer text-center w-32 transition-colors ${theme === 'light' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                   >
                     <div className="w-10 h-10 bg-white rounded-full mx-auto mb-2 border border-gray-300"></div>
                     <span className="text-sm font-medium">Light Mode</span>
                   </div>
                </div>
                {theme === 'light' && (
                  <p className="text-sm text-yellow-500 mt-4">Note: Light mode is currently in beta. Full implementation coming soon.</p>
                )}
              </div>
            )}

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

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-left ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
    >
      <div className="w-5 h-5">{icon}</div>
      {label}
    </button>
  );
}
