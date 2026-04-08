import React from 'react';
import { motion } from 'motion/react';

interface RingProps {
  pct: number;          // 0–100+
  size?: number;
  strokeWidth?: number;
  color: string;        // CSS color string or var(--color-x)
  complete?: boolean;   // true → glow effect
  children?: React.ReactNode;
}

export const Ring = ({
  pct,
  size = 140,
  strokeWidth = 11,
  color,
  complete = false,
  children,
}: RingProps) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.min(pct, 100);
  const offset = circ - (clamped / 100) * circ;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Glow backdrop when complete */}
      {complete && (
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{ background: color, opacity: 0.12, filter: 'blur(16px)' }}
        />
      )}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          style={{ stroke: 'rgba(255,255,255,0.07)' }}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.34, 1.2, 0.64, 1] }}
          style={{
            stroke: color,
            filter: complete ? `drop-shadow(0 0 8px ${color})` : undefined,
          }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
