import { Link, Outlet, useLocation } from 'react-router';
import { Home, LayoutDashboard, AlertTriangle, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/incidents', label: 'Previous Incidents', icon: AlertTriangle },
    { path: '/events', label: 'New Events', icon: Zap },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-lg"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Side Navigation */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-slate-900 border-r border-slate-800 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-semibold text-cyan-400">RCA Bot</h1>
          <p className="text-xs text-slate-400 mt-1">DevOps & SRE Assistant</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">System Status</span>
            </div>
            <p className="text-xs text-slate-300">All systems operational</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden w-full">
        <Outlet />
      </main>
    </div>
  );
}