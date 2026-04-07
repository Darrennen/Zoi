import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  TrendingUp, 
  BookOpen, 
  UserCircle, 
  Menu,
  Plus,
  ChevronRight,
  History,
  Edit3,
  PersonStanding,
  Activity,
  Zap,
  Moon,
  Target,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Filter,
  Search,
  Layout
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <span className={cn(
        "flex flex-col items-center justify-center p-2 transition-all duration-200",
        isActive ? "bg-primary text-on-primary rounded-xl px-3 py-1.5 active:scale-90" : "text-on-surface-variant hover:text-white"
      )}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="font-label text-[10px] uppercase tracking-widest font-bold mt-1">{label}</span>
      </span>
    )}
  </NavLink>
);

const SidebarItem = ({ to, icon: Icon, label }: NavItemProps) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <span className={cn(
        "mx-2 rounded-lg flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 hover:translate-x-1",
        isActive
          ? "bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20"
          : "text-on-surface-variant hover:bg-surface-container"
      )}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="font-headline text-lg font-bold">{label}</span>
      </span>
    )}
  </NavLink>
);

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl flex items-center justify-between px-6 py-8 shadow-[0_20px_40px_rgba(6,14,32,0.4)]">
        <div className="flex items-center gap-4">
          <button className="text-primary hover:bg-surface-bright/40 transition-colors p-2 rounded-lg active:scale-95 duration-200">
            <Menu size={24} />
          </button>
          <h1 className="font-headline font-extrabold tracking-tighter text-4xl text-primary">Darren's HQ</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8">
            <NavLink to="/" className={({ isActive }) => cn("font-label font-bold uppercase tracking-widest text-[10px] transition-colors", isActive ? "text-primary" : "text-on-surface-variant hover:text-white")}>Students</NavLink>
            <NavLink to="/activity" className={({ isActive }) => cn("font-label font-bold uppercase tracking-widest text-[10px] transition-colors", isActive ? "text-primary" : "text-on-surface-variant hover:text-white")}>Life</NavLink>
            <NavLink to="/market" className={({ isActive }) => cn("font-label font-bold uppercase tracking-widest text-[10px] transition-colors", isActive ? "text-primary" : "text-on-surface-variant hover:text-white")}>Growth</NavLink>
            <NavLink to="/journal" className={({ isActive }) => cn("font-label font-bold uppercase tracking-widest text-[10px] transition-colors", isActive ? "text-primary" : "text-on-surface-variant hover:text-white")}>Journal</NavLink>
            <NavLink to="/daily" className={({ isActive }) => cn("font-label font-bold uppercase tracking-widest text-[10px] transition-colors", isActive ? "text-primary" : "text-on-surface-variant hover:text-white")}>Daily</NavLink>
          </nav>
          <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaO3iilhK_TsRQ7QZzFntGL_ZVzdkFrdKLXiPbhrA15s09B3YnsclIhG5vGlLLrExQ2zvPRS0G6HCfvV7eBaKQRsKaE1O5prMt0Vyrg64iDRHyvI50T_hn6t6ksHtZ5EVqzvWbHrB1sYEVxad5JNjDMDqpc4Kc8Eo5Llh4w9bKlzUVn2WoswnhVfttjHlLoF5Un1HRpB8WVk12vX6tNVA1OkOKTXcWAcmg5sKmUjk7gdJNxXQ0DUDToaupZ_sj05i1gsywtom5QrtD" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-[60] flex flex-col py-8 h-full w-80 bg-background rounded-r-3xl shadow-2xl shadow-black transition-transform duration-300">
        <div className="px-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-container p-0.5 flex items-center justify-center">
               <Layout className="text-on-primary" />
            </div>
            <div>
              <h2 className="font-manrope text-xl font-bold text-primary tracking-widest uppercase">Darren's HQ</h2>
              <p className="text-xs text-on-surface-variant">Nocturnal Architect</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <SidebarItem to="/" icon={Users} label="Badminton Students" />
          <SidebarItem to="/activity" icon={Activity} label="Active Life" />
          <SidebarItem to="/market" icon={TrendingUp} label="Work & Growth" />
          <SidebarItem to="/journal" icon={BookOpen} label="Deep Work Journal" />
          <SidebarItem to="/daily" icon={PersonStanding} label="Daily Reflection" />
        </nav>
        <div className="px-8 mt-auto">
          <div className="bg-surface-container-high p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Session in Progress</span>
            </div>
            <p className="text-xs text-on-surface-variant">Training: Alex Chen<br/>32:14 elapsed</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-80 pt-32 pb-32 lg:pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-surface-container/80 backdrop-blur-md rounded-t-2xl z-50 shadow-[0_-10px_30px_rgba(6,14,32,0.3)]">
        <NavItem to="/" icon={Users} label="Students" />
        <NavItem to="/activity" icon={Heart} label="Life" />
        <NavItem to="/market" icon={TrendingUp} label="Growth" />
        <NavItem to="/journal" icon={BookOpen} label="Journal" />
        <NavItem to="/daily" icon={PersonStanding} label="Daily" />
      </nav>
    </div>
  );
};
