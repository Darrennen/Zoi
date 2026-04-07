import React from 'react';
import { Edit3, BookOpen, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export const JournalPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#d0bcff]"></span>
          <span className="text-secondary font-label text-xs uppercase tracking-widest font-bold">Live Session</span>
        </div>
        <h2 className="font-headline font-black text-5xl tracking-tight text-on-surface mb-4">Deep Work Journal</h2>
        <p className="text-on-surface-variant max-w-xl text-lg">Capturing the evolution of projects and personal mastery, one midnight session at a time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <section className="md:col-span-8 space-y-12">
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 shadow-2xl">
            <h3 className="font-headline font-bold text-2xl text-primary mb-8 flex items-center gap-3">
              <Edit3 size={24} />
              Log Daily Reflection
            </h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Journal Entry Date</label>
                  <input className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all" type="date" />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Key Task Completed</label>
                  <input className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. System Architecture Design" type="text" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Skill Practiced</label>
                  <input className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. Advanced Tailwind Layouts" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Contribution Made</label>
                  <input className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. Reviewed PR #442" type="text" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Insight or Learning</label>
                <textarea className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all resize-none" placeholder="What became clear today?" rows={3}></textarea>
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary font-bold rounded-xl active:scale-95 duration-200 shadow-lg shadow-primary/20" type="submit">
                Commit Entry
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <h3 className="font-headline font-bold text-2xl text-on-surface">Recent Logs</h3>
            <div className="space-y-4">
              <div className="group bg-surface-container-low hover:bg-surface-container-high transition-colors p-6 rounded-2xl border border-outline-variant/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container-highest p-3 rounded-xl text-primary group-hover:scale-110 transition-transform">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant font-medium">October 24, 2023</span>
                      <h4 className="font-headline font-bold text-lg">Editorial UI Framework</h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-surface-container-highest text-secondary text-[10px] uppercase tracking-widest font-bold">Architecture</span>
                    <span className="px-3 py-1 rounded-full bg-surface-container-highest text-tertiary text-[10px] uppercase tracking-widest font-bold">12h Deep</span>
                  </div>
                </div>
              </div>
              <div className="group bg-surface-container-low hover:bg-surface-container-high transition-colors p-6 rounded-2xl border border-outline-variant/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container-highest p-3 rounded-xl text-primary group-hover:scale-110 transition-transform">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant font-medium">October 23, 2023</span>
                      <h4 className="font-headline font-bold text-lg">Market Sentiment Analysis Engine</h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-surface-container-highest text-secondary text-[10px] uppercase tracking-widest font-bold">Python</span>
                    <span className="px-3 py-1 rounded-full bg-surface-container-highest text-tertiary text-[10px] uppercase tracking-widest font-bold">Refactored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="md:col-span-4 space-y-8 md:sticky md:top-32">
          <div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-on-primary font-label text-xs uppercase tracking-widest font-black opacity-80">Continuity</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-7xl font-headline font-black text-on-primary">12</span>
                <span className="text-xl font-bold text-on-primary/70">Days</span>
              </div>
              <p className="mt-4 text-on-primary/80 font-medium leading-snug">Your streak is heating up. Consistency is the architect's greatest tool.</p>
              <div className="mt-8 flex gap-1">
                {[1, 1, 1, 1, 0.5, 0, 0].map((w, i) => (
                  <div key={i} className="h-1 flex-1 bg-on-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-on-primary rounded-full transition-all" style={{ width: `${w * 100}%` }}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
              <TrendingUp size={180} strokeWidth={3} />
            </div>
          </div>

          <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/10">
            <h4 className="font-label text-xs uppercase tracking-widest font-black text-on-surface-variant mb-6">Growth Radar</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-on-surface font-bold">Contribution</p>
                  <p className="text-xs text-on-surface-variant">Team Impact</p>
                </div>
                <p className="text-primary font-black text-xl">+85%</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-on-surface font-bold">Skill Acquisition</p>
                  <p className="text-xs text-on-surface-variant">Learning velocity</p>
                </div>
                <p className="text-secondary font-black text-xl">+42%</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
            <img 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbEW9wMGItooscdZwVbRS9r4I9ldOKKj1YSx7x8ibhySebpJTARvzQDHw0rp3FFE3NjCBJphvFx-1mBljm2fpSV4iw1dfPF5KEaf162TeHOgUvyOo5_htFQ2QtddW4JUfv5zQEuVktqRXjJeo1GaTbavTG7cyoRUKiyjTfWbHrPdzuDrxlho6gWkIQ1gtk6-TAVMUHak_Twk7WTrtRj_wdbRCab4lr31FygwkhcXExQ7w1kK9mgWvBzjl9n1D-oTf6-42GoVePm7K3" 
              alt="Architecture Studio"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs uppercase tracking-widest font-bold text-primary mb-1">Architecture Studio</p>
              <h4 className="font-headline font-bold text-xl text-white">Focus Session Active</h4>
            </div>
          </div>
        </aside>
      </div>
      
      <div className="fixed bottom-24 right-8 z-40 lg:bottom-12">
        <button className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 duration-200">
          <Plus size={32} />
        </button>
      </div>
    </motion.div>
  );
};
