import React, { useState } from 'react';
import { TrendingUp, Bitcoin, Coins, Lightbulb, AlertTriangle, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

export const MarketPage = () => {
  const { toast } = useToast();

  // New Entry modal
  const [entryOpen, setEntryOpen] = useState(false);
  const [asset, setAsset] = useState('BTC');
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [tradeNotes, setTradeNotes] = useState('');

  // Filter state
  const [allAssetsActive, setAllAssetsActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  // Expanded trade rows
  const [expandedTrade, setExpandedTrade] = useState<number | null>(null);

  const handleEntrySubmit = () => {
    toast('Trade entry logged successfully!');
    setEntryOpen(false);
    setAsset('BTC');
    setDirection('LONG');
    setEntryPrice('');
    setExitPrice('');
    setTradeNotes('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* New Entry Modal */}
      <Modal open={entryOpen} onClose={() => setEntryOpen(false)} title="New Trade Entry">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Asset</label>
            <select
              className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
              value={asset}
              onChange={e => setAsset(e.target.value)}
            >
              <option>BTC</option>
              <option>ETH</option>
              <option>SOL</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Direction</label>
            <div className="flex gap-3">
              <button
                onClick={() => setDirection('LONG')}
                className={cn(
                  "flex-1 py-3 rounded-xl font-bold transition-colors",
                  direction === 'LONG' ? 'bg-tertiary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-bright'
                )}
              >
                LONG
              </button>
              <button
                onClick={() => setDirection('SHORT')}
                className={cn(
                  "flex-1 py-3 rounded-xl font-bold transition-colors",
                  direction === 'SHORT' ? 'bg-error text-white' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-bright'
                )}
              >
                SHORT
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Entry Price</label>
            <input
              className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
              type="number"
              placeholder="e.g. 29450"
              value={entryPrice}
              onChange={e => setEntryPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Exit Price</label>
            <input
              className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all"
              type="number"
              placeholder="e.g. 31920"
              value={exitPrice}
              onChange={e => setExitPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Notes</label>
            <textarea
              className="w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all resize-none"
              placeholder="Trade thesis, lessons learned..."
              rows={3}
              value={tradeNotes}
              onChange={e => setTradeNotes(e.target.value)}
            />
          </div>
          <button
            onClick={handleEntrySubmit}
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20"
          >
            Log Trade Entry
          </button>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-8 flex flex-col justify-end">
          <p className="text-primary font-label text-sm uppercase tracking-widest mb-2">Portfolio Overview</p>
          <h2 className="font-headline font-extrabold text-5xl md:text-7xl tracking-tighter text-on-surface">Market Journal</h2>
        </div>
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          <div className="bg-surface-container rounded-xl p-6 flex flex-col justify-between shadow-2xl">
            <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-bold">Running PnL</span>
            <div>
              <div className="text-3xl font-headline font-black text-primary">+$12,482</div>
              <div className="flex items-center gap-1 text-xs text-secondary mt-1">
                <TrendingUp size={14} />
                <span>14.2% this month</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container rounded-xl p-6 flex flex-col justify-between shadow-2xl">
            <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-bold">Win Rate</span>
            <div>
              <div className="text-3xl font-headline font-black text-tertiary">68.4%</div>
              <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-1">
                <span>26 Wins / 12 Losses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline text-xl font-bold">Recent Entries</h3>
            <div className="flex gap-2">
              <span
                onClick={() => setAllAssetsActive(prev => !prev)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors",
                  allAssetsActive ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
                )}
              >
                All Assets
              </span>
              <span
                onClick={() => setFilterActive(prev => !prev)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors",
                  filterActive ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
                )}
              >
                Filter
              </span>
            </div>
          </div>

          {/* Entry 1 */}
          <div
            className="bg-surface-container rounded-2xl overflow-hidden shadow-xl border border-outline-variant/5 cursor-pointer"
            onClick={() => setExpandedTrade(expandedTrade === 0 ? null : 0)}
          >
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center">
                    <Bitcoin className="text-primary" size={32} />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-lg">BTC/USDT <span className="text-on-surface-variant text-sm font-normal ml-2">Oct 24, 2023</span></div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-bold uppercase tracking-tighter">PERP</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-tertiary/20 text-tertiary font-bold uppercase tracking-tighter">LONG</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-headline font-black text-primary">+$4,230.00</div>
                  <div className="text-xs text-on-surface-variant">ROI: +8.4%</div>
                </div>
              </div>
              {expandedTrade === 0 && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-outline-variant/10">
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Entry Price</div>
                      <div className="font-bold text-on-surface">$29,450.00</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Exit Price</div>
                      <div className="font-bold text-on-surface">$31,920.00</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Thesis</div>
                      <div className="text-sm text-on-surface-variant italic">HTF support retest with bullish divergence on 4H RSI. Clean break of local trendline.</div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl flex gap-3 items-start">
                    <Lightbulb size={16} className="text-secondary mt-0.5" />
                    <div className="text-sm">
                      <span className="font-bold text-secondary">Lesson Learned:</span> Patience paid off. Waiting for the daily close before scaling in reduced drawdown volatility.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Entry 2 */}
          <div
            className="bg-surface-container rounded-2xl overflow-hidden shadow-xl border border-outline-variant/5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => setExpandedTrade(expandedTrade === 1 ? null : 1)}
          >
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center">
                    <Coins className="text-tertiary" size={32} />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-lg">SOL/USDT <span className="text-on-surface-variant text-sm font-normal ml-2">Oct 22, 2023</span></div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-bold uppercase tracking-tighter">SPOT</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-error/20 text-error font-bold uppercase tracking-tighter">SHORT</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-headline font-black text-error">-$850.00</div>
                  <div className="text-xs text-on-surface-variant">ROI: -1.2%</div>
                </div>
              </div>
              {expandedTrade === 1 && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-outline-variant/10">
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Entry Price</div>
                      <div className="font-bold text-on-surface">$32.10</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Exit Price</div>
                      <div className="font-bold text-on-surface">$32.55</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Thesis</div>
                      <div className="text-sm text-on-surface-variant italic">Attempted to fade the blow-off top on low timeframes. Liquidity grab at range high.</div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl flex gap-3 items-start">
                    <AlertTriangle size={16} className="text-error mt-0.5" />
                    <div className="text-sm">
                      <span className="font-bold text-error">Lesson Learned:</span> Don't short a god candle without a confirmed market structure break on the 1H. Over-leveraged on a revenge trade.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-surface-container-high rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={96} />
            </div>
            <h3 className="font-headline text-2xl font-black mb-6">Trade Journaling</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">Systematic logging is the difference between gambling and professional trading. Record every thought, every emotion.</p>
            <button
              onClick={() => setEntryOpen(true)}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 duration-200 shadow-lg shadow-primary/20"
            >
              NEW ENTRY
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant">Allocation by Asset</h4>
            <div className="bg-surface-container p-6 rounded-2xl space-y-6 shadow-sm">
              {[
                { label: 'Bitcoin', value: 45, color: 'bg-primary' },
                { label: 'Ethereum', value: 30, color: 'bg-secondary' },
                { label: 'Solana', value: 15, color: 'bg-tertiary' },
                { label: 'Others', value: 10, color: 'bg-on-surface-variant' }
              ].map((asset) => (
                <div key={asset.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                    <span>{asset.label}</span>
                    <span className={asset.color.replace('bg-', 'text-')}>{asset.value}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", asset.color)} style={{ width: `${asset.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(208,188,255,0.8)]"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Active Session</span>
            </div>
            <div className="text-sm text-on-surface-variant mb-4 font-body">Focusing on London open liquidity. No active positions. Waiting for confirmation.</div>
            <div className="flex justify-between items-center text-[10px] text-outline font-bold uppercase">
              <span>Started 2h 14m ago</span>
              <span
                onClick={() => toast('Checklist: No active positions. Waiting for confirmation.', 'info')}
                className="text-primary cursor-pointer hover:underline"
              >
                View Checklist
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 right-8 z-40 lg:bottom-12">
        <button
          onClick={() => setEntryOpen(true)}
          className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xl active:scale-90 duration-150"
        >
          <Plus size={28} />
        </button>
      </div>
    </motion.div>
  );
};
