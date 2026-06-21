import { Search, Bell, User } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-16 border-b border-white/5 glass-panel flex items-center justify-between px-6">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search stocks, symbols, or companies..." 
            className="w-full bg-background/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border border-background"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
}
