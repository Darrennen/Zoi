import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastItem { id: number; message: string; type: 'success' | 'error' | 'info'; }
const ToastContext = createContext<{ toast: (msg: string, type?: ToastItem['type']) => void }>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = useCallback((message: string, type: ToastItem['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-6 right-6 z-[300] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div key={t.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
              className={`px-5 py-3 rounded-xl shadow-2xl text-sm font-bold pointer-events-auto border ${
                t.type === 'error' ? 'bg-error text-white border-error' : t.type === 'info' ? 'bg-surface-container-highest text-on-surface border-outline-variant/20' : 'bg-primary text-on-primary border-primary/20'
              }`}>
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
