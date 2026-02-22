import React, { useState } from 'react';
import TemplateManager from './components/TemplateManager';
import { LayoutDashboard, FileText, Activity, Settings, Bell, ShieldCheck } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1e293b] border-r border-slate-800 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/30">
            <Bell size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Accelerator
          </h1>
        </div>

        <nav className="flex flex-col gap-1.5">
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarLink
            icon={<FileText size={20} />}
            label="Templates"
            active={activeTab === 'templates'}
            onClick={() => setActiveTab('templates')}
          />
          <SidebarLink
            icon={<Activity size={20} />}
            label="Audit Logs"
            active={activeTab === 'logs'}
            onClick={() => setActiveTab('logs')}
          />
          <SidebarLink
            icon={<Settings size={20} />}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="mt-auto bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck size={16} className="text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Status</span>
          </div>
          <p className="text-xs text-slate-300">All systems operational</p>
          <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-full animate-pulse opacity-75"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 px-10 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-slate-800"></div>
          </div>
        </header>

        <section className="p-10 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Sent" value="12,450" change="+12%" color="text-blue-500" />
                <StatCard label="Success Rate" value="99.2%" change="+0.4%" color="text-emerald-500" />
                <StatCard label="Queue Lag" value="4ms" change="-1ms" color="text-amber-500" />
              </div>
              <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 p-8 h-80 flex items-center justify-center">
                <p className="text-slate-500 italic">Delivery analytics chart module coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="animate-in fade-in duration-500">
              <TemplateManager />
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'templates' && (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="bg-slate-800/50 p-6 rounded-full">
                <Settings size={48} className="animate-spin-slow" />
              </div>
              <p className="text-lg font-medium">Developing module: {activeTab}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-200 group ${active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
        }`}
    >
      <span className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatCard({ label, value, change, color }) {
  return (
    <div className="bg-[#1e293b] p-7 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
          {change}
        </span>
      </div>
      <p className={`text-4xl font-bold tracking-tight ${color} group-hover:scale-105 transition-transform duration-300`}>{value}</p>
    </div>
  );
}

export default App;

