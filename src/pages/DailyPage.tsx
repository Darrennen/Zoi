import React from 'react';
import { Target, Zap, Moon, ArrowRight, ArrowLeft, Filter, Search, Plus, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const DailyPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dashboard Header */}
      <div className="mb-16">
        <span className="font-label text-xs uppercase tracking-widest text-primary font-bold block mb-4">Midnight Reflection</span>
        <h2 className="font-headline text-5xl font-extrabold tracking-tight mb-4 text-on-surface">Daily Journal</h2>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">The architecture of a day is built in the quiet moments of reflection. Document your progress, learn from the friction, and architect your tomorrow.</p>
      </div>

      {/* Bento Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        {/* Main Prompts Column */}
        <div className="md:col-span-8 space-y-6">
          <div className="glass-card rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={20} className="text-primary" />
              <label className="font-headline font-bold text-xl">What did I do well today?</label>
            </div>
            <textarea className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary min-h-[120px] transition-all" placeholder="Celebrate a win, however small..."></textarea>
          </div>
          <div className="glass-card rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={20} className="text-tertiary" />
              <label className="font-headline font-bold text-xl">What could I improve?</label>
            </div>
            <textarea className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary min-h-[120px] transition-all" placeholder="Identify the friction points..."></textarea>
          </div>
          <div className="glass-card rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <Target size={20} className="text-secondary" />
              <label className="font-headline font-bold text-xl">What's my focus for tomorrow?</label>
            </div>
            <textarea className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary min-h-[120px] transition-all" placeholder="Define the primary objective..."></textarea>
          </div>
          <div className="flex justify-end pt-4">
            <button className="bg-primary text-on-primary font-bold px-10 py-4 rounded-xl hover:translate-y-[-2px] transition-all active:scale-95 shadow-[0_10px_20px_rgba(192,193,255,0.2)]">
              Commit Entry
            </button>
          </div>
        </div>

        {/* Stats/Mood Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/10">
            <h3 className="font-headline font-bold text-lg mb-6">Session Context</h3>
            <div className="space-y-6">
              <div>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Current Mood</span>
                <div className="flex gap-2">
                  {[
                    { icon: '😊', active: false },
                    { icon: <Zap size={16} />, active: true },
                    { icon: '🧘', active: false },
                    { icon: <Moon size={16} />, active: false }
                  ].map((mood, i) => (
                    <button 
                      key={i} 
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        mood.active ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-primary/20"
                      )}
                    >
                      {mood.icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-outline-variant/10">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Streak</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-manrope font-black text-primary">12</span>
                  <span className="text-on-surface-variant">Days of reflection</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden group">
            <img 
              alt="Inspiration" 
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAce9Nx5b06qp79MI6HQi--yGBSx8t8WIkSQWBJpRpXMww9ukQzFhudErkD-CoIeKDE27L7m3a2siLZO-Z6uII3gh7FttpAkf6ldapkBd1lwdiZ9lfYgRyk4ZSI-D6PzjYlfq6Hd08aHcchsfmQxu0kyHXLIy0pBv9nfHk5FFwcZmLP9hqJFxgRRCnmdV-6li6Yk6xhgYAF78GrvnSLWxNtirmAY4StFz_SMUoFtIYv9Umm_gezCKHPZIG2HOV60UeSWizI4nclhpAs" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-headline font-medium text-sm italic text-on-surface">"Precision is the foundation of excellence."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Timeline View */}
      <section className="mt-32">
        <div className="flex items-center justify-between mb-12">
          <h3 className="font-headline text-3xl font-bold tracking-tight">Timeline</h3>
          <div className="flex gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Filter size={20} />
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
        <div className="relative ml-4 md:ml-0">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-surface-container-high to-transparent md:-translate-x-1/2 hidden md:block"></div>
          
          {/* Timeline Entry 1 */}
          <div className="relative grid md:grid-cols-2 gap-12 mb-20 group">
            <div className="md:text-right">
              <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">Oct 24, 2023</span>
              <h4 className="font-headline text-2xl font-bold mt-2 text-on-surface">Deep Focus Achieved</h4>
            </div>
            <div className="absolute left-[-20px] md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 top-2 shadow-[0_0_15px_rgba(192,193,255,0.6)]"></div>
            <div className="bg-surface-container p-6 rounded-xl border-l-2 border-primary/20 hover:border-primary/60 transition-all">
              <p className="text-on-surface-variant line-clamp-3 leading-relaxed">Completed the core architecture for the new Design System. Managed to stay focused for 4 hours straight without digital distractions. Tomorrow, I need to refine the token mapping...</p>
              <button className="mt-4 text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Full Entry <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Timeline Entry 2 */}
          <div className="relative grid md:grid-cols-2 gap-12 mb-20 group">
            <div className="md:order-2">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Oct 23, 2023</span>
              <h4 className="font-headline text-2xl font-bold mt-2 text-on-surface">Friction and Growth</h4>
            </div>
            <div className="absolute left-[-20px] md:left-1/2 w-3 h-3 bg-surface-container-high rounded-full md:-translate-x-1/2 top-2"></div>
            <div className="md:order-1 bg-surface-container p-6 rounded-xl border-r-2 border-transparent hover:border-tertiary/60 transition-all text-right">
              <p className="text-on-surface-variant line-clamp-3 leading-relaxed">Struggled with the layout logic on mobile. Realized I was over-complicating the grid structure. Improvement: Start with simple sketches next time before coding...</p>
              <button className="mt-4 text-on-surface-variant font-bold text-sm flex items-center justify-end gap-1 group-hover:-translate-x-1 transition-transform">
                <ArrowLeft size={14} /> View Full Entry
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
