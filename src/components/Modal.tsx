import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps { open: boolean; onClose: () => void; title: string; children: React.ReactNode; }

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
            className="relative bg-surface-container rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant/20 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/10">
              <h3 className="font-headline font-bold text-xl">{title}</h3>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-bright transition-colors text-on-surface-variant hover:text-on-surface">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
