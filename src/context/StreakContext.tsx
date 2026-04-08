import React, { createContext, useContext, useState, useCallback } from 'react';

interface StreakCtx {
  streak: number;
  xp: number;
  level: number;
  xpProgress: number; // 0-100 within current level
  addXP: (amount: number) => void;
}

const Ctx = createContext<StreakCtx>({ streak: 0, xp: 0, level: 1, xpProgress: 0, addXP: () => {} });

const XP_PER_LEVEL = 200;

function load() {
  try { return JSON.parse(localStorage.getItem('zoi_progress') || '{}'); } catch { return {}; }
}
function save(s: object) {
  try { localStorage.setItem('zoi_progress', JSON.stringify(s)); } catch {}
}
const todayStr = () => new Date().toISOString().slice(0, 10);
const yesterdayStr = () => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); };

export const StreakProvider = ({ children }: { children: React.ReactNode }) => {
  const [s, setS] = useState(() => {
    const d = load();
    return { streak: d.streak ?? 0, xp: d.xp ?? 0, lastDate: d.lastDate ?? '' };
  });

  const addXP = useCallback((amount: number) => {
    setS(prev => {
      const today = todayStr();
      let { streak, xp, lastDate } = prev;
      if (lastDate !== today) {
        if (lastDate === yesterdayStr()) {
          streak += 1;
        } else if (lastDate === '') {
          streak = 1;
        } else {
          streak = 1; // streak broken
        }
        lastDate = today;
      }
      xp += amount;
      const next = { streak, xp, lastDate };
      save(next);
      return next;
    });
  }, []);

  const level = Math.floor(s.xp / XP_PER_LEVEL) + 1;
  const xpProgress = Math.round((s.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100);

  return (
    <Ctx.Provider value={{ streak: s.streak, xp: s.xp, level, xpProgress, addXP }}>
      {children}
    </Ctx.Provider>
  );
};

export const useStreak = () => useContext(Ctx);
