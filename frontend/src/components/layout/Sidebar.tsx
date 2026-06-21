import Link from 'next/link';
import { Home, LineChart, PieChart, Bell, Settings, Search, Menu } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 flex-col hidden md:flex h-full border-r border-white/5 glass-panel">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
          <LineChart className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold text-gradient">StockVision</h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavItem href="/" icon={<Home className="w-5 h-5" />} label="Dashboard" active />
        <NavItem href="/markets" icon={<LineChart className="w-5 h-5" />} label="Markets" />
        <NavItem href="/portfolio" icon={<PieChart className="w-5 h-5" />} label="Portfolio" />
        <NavItem href="/alerts" icon={<Bell className="w-5 h-5" />} label="Alerts" />
        <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass p-4 rounded-xl text-sm">
          <p className="text-muted-foreground text-xs mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-foreground font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
