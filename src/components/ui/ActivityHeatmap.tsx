'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const COLORS = [
  'rgba(6, 182, 212, 0.05)',   // level 0 - almost empty
  'rgba(6, 182, 212, 0.15)',   // level 1
  'rgba(6, 182, 212, 0.3)',    // level 2
  'rgba(59, 130, 246, 0.45)',  // level 3
  'rgba(59, 130, 246, 0.65)',  // level 4
  'rgba(139, 92, 246, 0.8)',   // level 5 - most active
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

export default function ActivityHeatmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Generate deterministic "activity" data (seeded pattern for consistency)
  const cells = useMemo(() => {
    const data: number[] = [];
    const seed = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4];
    for (let week = 0; week < 52; week++) {
      for (let day = 0; day < 7; day++) {
        const idx = (week * 7 + day) % seed.length;
        const base = seed[idx];
        // Create a pattern with higher activity in recent months
        const recencyBoost = week > 30 ? 1 : 0;
        const weekendDip = (day === 0 || day === 6) ? -1 : 0;
        const val = Math.max(0, Math.min(5, base % 6 + recencyBoost + weekendDip));
        data.push(val);
      }
    }
    return data;
  }, []);

  const cellSize = 11;
  const gap = 2;
  const totalW = 52 * (cellSize + gap);
  const totalH = 7 * (cellSize + gap);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-medium text-gray-400">Activity Pattern</h4>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-gray-500">Less</span>
          {COLORS.map((color, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ background: color }}
            />
          ))}
          <span className="text-[9px] text-gray-500">More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <svg
          viewBox={`-30 -16 ${totalW + 40} ${totalH + 24}`}
          className="w-full min-w-[600px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Month labels */}
          {MONTHS.map((month, i) => (
            <text
              key={month}
              x={i * (52 / 12) * (cellSize + gap)}
              y={-5}
              className="text-[8px]"
              fill="#6b7280"
            >
              {month}
            </text>
          ))}

          {/* Day labels */}
          {DAYS.map((day, i) => (
            <text
              key={i}
              x={-28}
              y={i * (cellSize + gap) + cellSize - 1}
              className="text-[8px]"
              fill="#6b7280"
            >
              {day}
            </text>
          ))}

          {/* Heatmap cells */}
          {cells.map((level, idx) => {
            const week = Math.floor(idx / 7);
            const day = idx % 7;
            const x = week * (cellSize + gap);
            const y = day * (cellSize + gap);

            return isInView ? (
              <motion.rect
                key={idx}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill={COLORS[level]}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (week * 0.008) + (day * 0.002),
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                style={{ transformOrigin: `${x + cellSize / 2}px ${y + cellSize / 2}px` }}
              />
            ) : (
              <rect
                key={idx}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill="rgba(255,255,255,0.02)"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
