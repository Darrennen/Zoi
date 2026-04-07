import React from 'react';
import { Plus, Edit3, ChevronRight, History, User } from 'lucide-react';
import { motion } from 'motion/react';

export const StudentsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dashboard Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold bg-secondary-container/20 px-3 py-1 rounded-full">Roster Management</span>
          <h2 className="font-headline font-black text-5xl mt-4 tracking-tight">Badminton Students</h2>
          <p className="text-on-surface-variant mt-2 max-w-md">Orchestrate the development of your high-performance athletes through precision tracking and data-driven session notes.</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:translate-y-[-2px] transition-all active:scale-95 shadow-lg shadow-primary/20">
          <Plus size={20} />
          Enroll New Student
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Student Card 1: Advanced */}
        <div className="md:col-span-8 bg-surface-container rounded-xl overflow-hidden shadow-2xl relative group">
          <div className="absolute top-0 right-0 p-6 z-10">
            <span className="bg-tertiary-container/20 text-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Advanced Elite</span>
          </div>
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1QojyEg_xusaiSYgDz499sRa78vk58j1lr5RRNbegupRX-N1eSB701mURC477Nc_mRLH-z0UNs5L1MuGyqZEwKsrW-MDu1hp2g2fIfUoNJN3sMYFtKxnTirQZhJHo2i_eP1V8U5subwxGTU13J-0-iExpW5fteTWAWvK_xMPzrQoW1AbnCYinKI7wvA_BbB6OgfJzZi0A62RtbeDXzkiKw0JSCasvBQmTc9iS0iM3a5QALIEryYHZ3ZkttMyunVW6ebp-xxxVCDGc" 
                alt="Alex Chen"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 flex flex-col justify-between md:w-2/3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-headline font-extrabold text-white">Alex Chen</h3>
                  <span className="text-on-surface-variant font-label text-sm">Age: 19</span>
                </div>
                <p className="text-on-surface-variant font-body mb-6">Mastery of explosive backhand clears and cross-court netting. Currently refining stamina for championship play.</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <span className="text-primary font-label text-[10px] uppercase tracking-widest font-bold block mb-1">Strengths</span>
                    <p className="text-sm font-medium">Vertical Leap, Net Accuracy</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <span className="text-error font-label text-[10px] uppercase tracking-widest font-bold block mb-1">Weaknesses</span>
                    <p className="text-sm font-medium">Footwork Under Pressure</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-surface-container-high py-3 rounded-lg text-sm font-bold border border-outline-variant/15 hover:bg-surface-bright transition-colors">View Profile</button>
                <button className="px-4 bg-primary/10 text-primary py-3 rounded-lg hover:bg-primary/20 transition-colors">
                  <Edit3 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Card 2: Small/Intermediate */}
        <div className="md:col-span-4 bg-surface-container rounded-xl p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-2xl bg-secondary-container/30 flex items-center justify-center">
                <User size={32} className="text-secondary" />
              </div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Intermediate</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-white mb-1">Sarah Jenkins</h3>
            <p className="text-sm text-on-surface-variant mb-6">Transitioning from recreational to competitive club level.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">Training Focus</span>
                <span className="font-bold">Smash Power</span>
              </div>
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[65%]"></div>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full bg-surface-container-high py-3 rounded-lg text-sm font-bold border border-outline-variant/15 hover:bg-surface-bright transition-colors">Open Journal</button>
        </div>

        {/* Student Card 3: Session Notes Section */}
        <div className="md:col-span-12 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter">Recent Session Log</h3>
            <button className="text-primary text-sm font-bold flex items-center gap-2">
              <History size={16} />
              View All History
            </button>
          </div>
          <div className="space-y-4">
            {/* Note Row 1 */}
            <div className="bg-surface-container p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:translate-x-1 transition-transform cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="text-center min-w-[60px]">
                  <span className="block text-primary font-bold text-lg leading-tight">OCT</span>
                  <span className="block text-2xl font-black">24</span>
                </div>
                <div className="h-10 w-[1px] bg-outline-variant/20 hidden md:block"></div>
                <div>
                  <h4 className="font-bold text-white">Alex Chen - Strategic Footwork</h4>
                  <p className="text-on-surface-variant text-sm">Focus on lateral recovery and lunging depth. Showing 15% faster return time.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <span className="text-xs bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant uppercase tracking-tighter">60 Mins</span>
                <ChevronRight size={20} className="text-on-surface-variant" />
              </div>
            </div>
            {/* Note Row 2 */}
            <div className="bg-surface-container p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:translate-x-1 transition-transform cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="text-center min-w-[60px]">
                  <span className="block text-primary font-bold text-lg leading-tight">OCT</span>
                  <span className="block text-2xl font-black">22</span>
                </div>
                <div className="h-10 w-[1px] bg-outline-variant/20 hidden md:block"></div>
                <div>
                  <h4 className="font-bold text-white">Sarah Jenkins - Service Consistency</h4>
                  <p className="text-on-surface-variant text-sm">Worked on high serve placement. Accuracy is stabilizing at the baseline.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <span className="text-xs bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant uppercase tracking-tighter">45 Mins</span>
                <ChevronRight size={20} className="text-on-surface-variant" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
