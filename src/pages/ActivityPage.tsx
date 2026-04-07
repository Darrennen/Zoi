import React from 'react';
import { Timer, TrendingUp, Clock, Plus, Dumbbell, Zap, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const ActivityPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Hero Stats: Weekly Summary */}
        <section className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-surface-container-high p-8 rounded-xl flex flex-col justify-between h-48 shadow-lg">
            <div>
              <span className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Weekly Activities</span>
              <div className="font-headline text-5xl font-black text-primary mt-2">12</div>
            </div>
            <div className="flex items-center gap-2 text-tertiary text-sm font-semibold">
              <TrendingUp size={16} />
              <span>+15% from last week</span>
            </div>
          </div>
          <div className="bg-surface-container-high p-8 rounded-xl flex flex-col justify-between h-48 shadow-lg">
            <div>
              <span className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Total Duration</span>
              <div className="font-headline text-5xl font-black text-primary mt-2">18.5 <span className="text-xl font-normal opacity-60">HRS</span></div>
            </div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold">
              <Clock size={16} />
              <span>Daily Avg: 2.6 hrs</span>
            </div>
          </div>
        </section>

        {/* Hyrox Countdown Card */}
        <section className="md:col-span-4 row-span-2 relative overflow-hidden bg-surface-container-highest p-8 rounded-xl flex flex-col justify-between shadow-2xl">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbfgtX0pc8mbEzBsQlaThIqkGx9wND1Jn4XkhLoQ7niMTZQT_QtakKFxneI_xwgH1grCP7kfPVh1L-XwqVlvJNjgG1PCwsoDgypUyBjhexXS99jZxv6WpBCqaYZk_Qcv_RK3JE1h94ZchJuQvQP7KfQfEjuKx3c-n1btjxm6mQomTys-avFiyQS60ri2Uyhk37OeLxR6HI2t2T5sZ4PYa6BpbmxiE122t6B31KaHkxPfMxMKXLM1lMkJIbO-wqGhFkHPNZWSBzJCV2" 
              alt="Hyrox Arena"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Timer size={32} className="text-on-primary" />
              </div>
              <h2 className="font-headline text-2xl font-bold">HYROX LONDON</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Target Date</p>
                <p className="font-headline text-xl font-bold">November 24, 2024</p>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="bg-background/40 backdrop-blur-md p-3 rounded-lg border border-outline-variant/15">
                  <span className="block text-2xl font-black text-secondary">42</span>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Days Left</span>
                </div>
                <div className="bg-background/40 backdrop-blur-md p-3 rounded-lg border border-outline-variant/15">
                  <span className="block text-2xl font-black text-tertiary">84%</span>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Readiness</span>
                </div>
              </div>
            </div>
          </div>
          <button className="relative z-10 w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20">
            VIEW TRAINING PLAN
          </button>
        </section>

        {/* Recent Activities List */}
        <section className="md:col-span-8 bg-surface-container rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold tracking-tight">Recent Activity Log</h3>
            <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors">
              <Plus size={18} />
              Log Session
            </button>
          </div>
          <div className="space-y-4">
            {/* Activity Entry: Badminton */}
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-bright/40 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg">Badminton Students</h4>
                  <p className="text-sm text-on-surface-variant">Intensive coaching session • High intensity</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-headline font-bold text-primary">120 MIN</div>
                <div className="text-xs text-outline font-bold uppercase tracking-tighter">Oct 12, 2024</div>
              </div>
            </div>
            {/* Activity Entry: Gym */}
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-bright/40 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                  <Dumbbell size={24} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg">Morning Strength</h4>
                  <p className="text-sm text-on-surface-variant">Deadlifts and overhead press focus</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-headline font-bold text-primary">75 MIN</div>
                <div className="text-xs text-outline font-bold uppercase tracking-tighter">Oct 11, 2024</div>
              </div>
            </div>
            {/* Activity Entry: Jogging */}
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-bright/40 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container/30 flex items-center justify-center text-primary">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg">Hyrox Prep Run</h4>
                  <p className="text-sm text-on-surface-variant">5km Interval sprints • HR Zone 4</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-headline font-bold text-primary">45 MIN</div>
                <div className="text-xs text-outline font-bold uppercase tracking-tighter">Oct 10, 2024</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Weekly Visualizer (Bento Bottom Row) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-surface-container-low p-6 rounded-xl border border-outline-variant/5 shadow-sm">
          <span className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block mb-4">Activity Types</span>
          <div className="space-y-4">
            {[
              { label: 'Jogging', value: 40, color: 'bg-primary' },
              { label: 'Gym', value: 25, color: 'bg-secondary' },
              { label: 'Badminton', value: 35, color: 'bg-tertiary' }
            ].map((type) => (
              <div key={type.label} className="flex items-center justify-between">
                <span className="text-sm font-semibold">{type.label}</span>
                <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", type.color)} style={{ width: `${type.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-3 bg-surface-container p-8 rounded-xl flex items-center gap-8 shadow-inner overflow-hidden relative">
          <div className="flex-1 z-10">
            <h4 className="font-headline text-xl font-bold mb-2">Architect's Flow State</h4>
            <p className="text-on-surface-variant text-sm max-w-md">Your highest activity volume occurs between 10 PM and 1 AM. Training during these "Nocturnal Architect" hours shows a 12% better recovery rate.</p>
          </div>
          <div className="hidden lg:block w-48 h-32 opacity-30">
            <img 
              className="w-full h-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmtyBBC50Hdtqb0zByQA6UEtVqXN0V9mGU900VF7HviLUqYjX70kvvN7LnEg_h6uusuuDSs74JO0vThDcM3f9oWNee2inMmcuXFs_akQpMKb7hXb4msjY1fVSaUHJP35Ss1D88VT_C6Ezvj0Lt9Xg92r-BGm84ygIGtzgClBqnZzJ5BWWO3Wzo4Cp9yCsL4lbm-cn7idkfkU7aN67_QHtez2fYufMpY8-ibZNYOsYy1PXtxFFf5YfvjW2eBBaKcR8SK3E_NxxSmeq1" 
              alt="Data Viz"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <div className="fixed right-6 bottom-24 md:bottom-12 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-2xl flex items-center justify-center z-40 active:scale-95 transition-transform">
        <Plus size={28} />
      </div>
    </motion.div>
  );
};
