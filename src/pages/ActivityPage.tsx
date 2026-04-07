import React, { useState, useMemo } from 'react';
import { Timer, TrendingUp, Clock, Plus, Dumbbell, Zap, Activity, ChevronRight, Beef } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  Sedentary: 0.8,
  Moderate: 1.3,
  Active: 1.7,
  Athlete: 2.1,
};

const GOAL_MULTIPLIERS: Record<string, number> = {
  'Fat Loss': 1.1,
  Maintenance: 1.0,
  'Muscle Gain': 1.25,
};

const FOOD_SOURCES = [
  { name: 'Chicken Breast', per100g: 31 },
  { name: 'Greek Yogurt', per100g: 10 },
  { name: 'Eggs (1 large)', per100g: 13 },
  { name: 'Tuna (canned)', per100g: 26 },
  { name: 'Whey Protein', per100g: 80 },
];

export const ActivityPage = () => {
  const { toast } = useToast();

  // Log Session modal
  const [logOpen, setLogOpen] = useState(false);
  const [logActivity, setLogActivity] = useState('Badminton');
  const [logDuration, setLogDuration] = useState('');
  const [logNotes, setLogNotes] = useState('');

  // Training plan modal
  const [planOpen, setPlanOpen] = useState(false);

  // Activity detail modal
  const [detailModal, setDetailModal] = useState<null | { name: string; desc: string; duration: string; date: string }>(null);

  // Protein calculator
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState('Active');
  const [goal, setGoal] = useState('Muscle Gain');

  const proteinResult = useMemo(() => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return null;
    const kg = unit === 'lbs' ? w / 2.205 : w;
    const grams = Math.round(kg * ACTIVITY_MULTIPLIERS[activityLevel] * GOAL_MULTIPLIERS[goal]);
    return { grams, perMeal: Math.round(grams / 3), perMeal4: Math.round(grams / 4) };
  }, [weight, unit, activityLevel, goal]);

  const handleLogSubmit = () => {
    toast('Session logged successfully!');
    setLogOpen(false);
    setLogActivity('Badminton');
    setLogDuration('');
    setLogNotes('');
  };

  const activities = [
    { name: 'Badminton Students', desc: 'Intensive coaching session • High intensity', duration: '120 MIN', date: 'Oct 12, 2024', icon: Activity, iconClass: 'bg-secondary-container/30 text-secondary' },
    { name: 'Morning Strength', desc: 'Deadlifts and overhead press focus', duration: '75 MIN', date: 'Oct 11, 2024', icon: Dumbbell, iconClass: 'bg-tertiary-container/30 text-tertiary' },
    { name: 'Hyrox Prep Run', desc: '5km Interval sprints • HR Zone 4', duration: '45 MIN', date: 'Oct 10, 2024', icon: Zap, iconClass: 'bg-primary-container/30 text-primary' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Log Session Modal */}
      <Modal open={logOpen} onClose={() => setLogOpen(false)} title="Log Session">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Activity</label>
            <select
              className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
              value={logActivity}
              onChange={e => setLogActivity(e.target.value)}
            >
              <option>Badminton</option>
              <option>Gym</option>
              <option>Running</option>
              <option>Hyrox Prep</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Duration (minutes)</label>
            <input
              className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
              type="number"
              placeholder="e.g. 60"
              value={logDuration}
              onChange={e => setLogDuration(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Notes</label>
            <textarea
              className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all resize-none"
              placeholder="Session notes..."
              rows={3}
              value={logNotes}
              onChange={e => setLogNotes(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogSubmit}
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20"
          >
            Log Session
          </button>
        </div>
      </Modal>

      {/* Training Plan Modal */}
      <Modal open={planOpen} onClose={() => setPlanOpen(false)} title="Weekly Training Plan">
        <div className="space-y-4">
          {[
            { day: 'Monday', focus: 'Strength', details: 'Deadlifts 4x5 · Overhead Press 3x8 · Pull-ups 3x10' },
            { day: 'Tuesday', focus: 'Badminton Coaching', details: 'Students session 2h · Footwork drills · Smash technique' },
            { day: 'Wednesday', focus: 'Hyrox Prep', details: '5km run + 1km row + Wall Balls 100 reps' },
            { day: 'Thursday', focus: 'Active Recovery', details: 'Yoga 30min · Mobility work · Ice bath' },
            { day: 'Friday', focus: 'Hyrox Simulation', details: 'Full Hyrox simulation run — race pace effort' },
            { day: 'Saturday', focus: 'Long Run', details: '10km easy pace · HR Zone 2 · Focus on breathing' },
            { day: 'Sunday', focus: 'Rest', details: 'Complete rest or light walk only' },
          ].map(item => (
            <div key={item.day} className="bg-surface-container-low p-4 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-on-surface">{item.day}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">{item.focus}</span>
              </div>
              <p className="text-sm text-on-surface-variant">{item.details}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Activity Detail Modal */}
      <Modal open={detailModal !== null} onClose={() => setDetailModal(null)} title="Activity Details">
        {detailModal && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-bold text-xl text-white">{detailModal.name}</h4>
              <span className="font-headline font-black text-primary text-2xl">{detailModal.duration}</span>
            </div>
            <p className="text-on-surface-variant">{detailModal.desc}</p>
            <div className="bg-surface-container-low p-4 rounded-xl">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest block mb-1">Date</span>
              <span className="font-bold">{detailModal.date}</span>
            </div>
          </div>
        )}
      </Modal>

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
          <button
            onClick={() => setPlanOpen(true)}
            className="relative z-10 w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20"
          >
            VIEW TRAINING PLAN
          </button>
        </section>

        {/* Recent Activities List */}
        <section className="md:col-span-8 bg-surface-container rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold tracking-tight">Recent Activity Log</h3>
            <button
              onClick={() => setLogOpen(true)}
              className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} />
              Log Session
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setDetailModal(act)}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-bright/40 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", act.iconClass)}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg">{act.name}</h4>
                      <p className="text-sm text-on-surface-variant">{act.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-headline font-bold text-primary">{act.duration}</div>
                    <div className="text-xs text-outline font-bold uppercase tracking-tighter">{act.date}</div>
                  </div>
                </div>
              );
            })}
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

      {/* Protein Calculator */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-5 bg-surface-container rounded-xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center">
              <Beef size={20} className="text-tertiary" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl">Protein Calculator</h3>
              <p className="text-on-surface-variant text-xs">Daily intake target</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Weight + unit toggle */}
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Body Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={unit === 'kg' ? 'e.g. 75' : 'e.g. 165'}
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className="flex-1 bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
                />
                <div className="flex bg-surface-container-lowest rounded-xl overflow-hidden">
                  {(['kg', 'lbs'] as const).map(u => (
                    <button key={u} onClick={() => setUnit(u)}
                      className={cn("px-4 font-bold text-sm transition-colors", unit === u ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface')}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity level */}
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Activity Level</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(ACTIVITY_MULTIPLIERS).map(level => (
                  <button key={level} onClick={() => setActivityLevel(level)}
                    className={cn("py-3 rounded-xl text-sm font-bold transition-colors", activityLevel === level ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-bright')}>
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(GOAL_MULTIPLIERS).map(g => (
                  <button key={g} onClick={() => setGoal(g)}
                    className={cn("py-3 rounded-xl text-xs font-bold transition-colors", goal === g ? 'bg-secondary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-bright')}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="lg:col-span-7 grid grid-rows-2 gap-6">
          {/* Main result */}
          <div className={cn("rounded-xl p-8 flex items-center justify-between transition-all", proteinResult ? 'bg-gradient-to-br from-tertiary/20 to-surface-container border border-tertiary/20' : 'bg-surface-container-low border border-outline-variant/5')}>
            {proteinResult ? (
              <>
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold block mb-2">Daily Target</span>
                  <div className="font-headline font-black text-7xl text-on-surface">{proteinResult.grams}<span className="text-2xl font-normal text-on-surface-variant ml-2">g</span></div>
                  <p className="text-on-surface-variant text-sm mt-2">{activityLevel} · {goal}</p>
                </div>
                <div className="space-y-4 text-right">
                  <div className="bg-surface-container-high px-5 py-3 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block">Per Meal (3x)</span>
                    <span className="font-headline font-black text-2xl text-primary">{proteinResult.perMeal}g</span>
                  </div>
                  <div className="bg-surface-container-high px-5 py-3 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block">Per Meal (4x)</span>
                    <span className="font-headline font-black text-2xl text-secondary">{proteinResult.perMeal4}g</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-3 py-4 text-center">
                <Beef size={36} className="text-on-surface-variant/30" />
                <p className="text-on-surface-variant font-medium">Enter your weight to calculate your daily protein target</p>
              </div>
            )}
          </div>

          {/* Food sources */}
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/5">
            <span className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block mb-4">Protein Sources (per 100g)</span>
            <div className="flex flex-wrap gap-3">
              {FOOD_SOURCES.map(food => (
                <div key={food.name} className="bg-surface-container px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="text-sm font-medium">{food.name}</span>
                  <span className="text-xs font-black text-tertiary">{food.per100g}g</span>
                  {proteinResult && (
                    <span className="text-[10px] text-on-surface-variant">
                      (~{Math.round(proteinResult.grams / (food.per100g / 100))}g needed)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setLogOpen(true)}
        className="fixed right-6 bottom-24 md:bottom-12 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-2xl flex items-center justify-center z-40 active:scale-95 transition-transform cursor-pointer"
      >
        <Plus size={28} />
      </div>
    </motion.div>
  );
};
