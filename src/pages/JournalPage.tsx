import React, { useState } from 'react';
import { Edit3, BookOpen, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

const LOG_ENTRIES = [
  {
    date: 'October 24, 2023',
    title: 'Editorial UI Framework',
    tags: ['Architecture', '12h Deep'],
    skill: 'Advanced Tailwind Layouts',
    contribution: 'Reviewed PR #442',
    task: 'System Architecture Design',
    insight: 'Realized that component composition beats inheritance every time. The key is designing the right abstractions up front — it saves 10x the time downstream.',
  },
  {
    date: 'October 23, 2023',
    title: 'Market Sentiment Analysis Engine',
    tags: ['Python', 'Refactored'],
    skill: 'Python data pipelines',
    contribution: 'Refactored sentiment module',
    task: 'Sentiment Engine Refactor',
    insight: 'Vectorized operations in pandas cut processing time by 40%. Premature optimization is a trap, but knowing when to optimize is a skill.',
  },
];

export const JournalPage = () => {
  const { toast } = useToast();

  // Form state
  const [formDate, setFormDate] = useState('');
  const [formTask, setFormTask] = useState('');
  const [formSkill, setFormSkill] = useState('');
  const [formContribution, setFormContribution] = useState('');
  const [formInsight, setFormInsight] = useState('');

  // Log detail modal
  const [logModal, setLogModal] = useState<typeof LOG_ENTRIES[0] | null>(null);

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTask && !formSkill && !formContribution && !formInsight) {
      toast('Please fill in at least one field.', 'error');
      return;
    }
    toast('Journal entry committed!');
    setFormDate('');
    setFormTask('');
    setFormSkill('');
    setFormContribution('');
    setFormInsight('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Log detail modal */}
      <Modal open={logModal !== null} onClose={() => setLogModal(null)} title={logModal?.title ?? ''}>
        {logModal && (
          <div className="space-y-4">
            <p className="text-xs text-on-surface-variant font-medium">{logModal.date}</p>
            <div className="flex gap-2 flex-wrap">
              {logModal.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-surface-container-highest text-secondary text-[10px] uppercase tracking-widest font-bold">{tag}</span>
              ))}
            </div>
            <div className="space-y-3">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">Key Task</span>
                <p className="text-sm font-medium">{logModal.task}</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-[10px] text-secondary uppercase font-bold tracking-widest block mb-1">Skill Practiced</span>
                <p className="text-sm font-medium">{logModal.skill}</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-[10px] text-tertiary uppercase font-bold tracking-widest block mb-1">Contribution</span>
                <p className="text-sm font-medium">{logModal.contribution}</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest block mb-1">Insight</span>
                <p className="text-sm text-on-surface-variant leading-relaxed">{logModal.insight}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

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
            <form className="space-y-8" onSubmit={handleCommit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Journal Entry Date</label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
                    type="date"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Key Task Completed</label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="e.g. System Architecture Design"
                    type="text"
                    value={formTask}
                    onChange={e => setFormTask(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Skill Practiced</label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="e.g. Advanced Tailwind Layouts"
                    type="text"
                    value={formSkill}
                    onChange={e => setFormSkill(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Contribution Made</label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="e.g. Reviewed PR #442"
                    type="text"
                    value={formContribution}
                    onChange={e => setFormContribution(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant ml-1">Insight or Learning</label>
                <textarea
                  className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="What became clear today?"
                  rows={3}
                  value={formInsight}
                  onChange={e => setFormInsight(e.target.value)}
                ></textarea>
              </div>
              <button
                className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary font-bold rounded-xl active:scale-95 duration-200 shadow-lg shadow-primary/20"
                type="submit"
              >
                Commit Entry
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <h3 className="font-headline font-bold text-2xl text-on-surface">Recent Logs</h3>
            <div className="space-y-4">
              {LOG_ENTRIES.map((entry, idx) => (
                <div
                  key={idx}
                  onClick={() => setLogModal(entry)}
                  className="group bg-surface-container-low hover:bg-surface-container-high transition-colors p-6 rounded-2xl border border-outline-variant/5 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-surface-container-highest p-3 rounded-xl text-primary group-hover:scale-110 transition-transform">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <span className="text-xs text-on-surface-variant font-medium">{entry.date}</span>
                        <h4 className="font-headline font-bold text-lg">{entry.title}</h4>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {entry.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-surface-container-highest text-secondary text-[10px] uppercase tracking-widest font-bold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
