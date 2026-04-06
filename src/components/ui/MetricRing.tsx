'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricRingProps {
  value: number;
  max?: number;
  label: string;
  suffix?: string;
  color?: string;
  size?: number;
  delay?: number;
}

export default function MetricRing({
  value,
  max = 100,
  label,
  suffix = '%',
  color = '#06b6d4',
  size = 100,
  delay = 0,
}: MetricRingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  const strokeWidth = 5;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={strokeWidth}
          />
          {/* Progress ring */}
          {isInView && (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 1.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
              opacity="0.85"
              filter="url(#ringGlow)"
            />
          )}
          <defs>
            <filter id="ringGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">
            {value}{suffix}
          </span>
        </div>
      </div>
      <span className="text-[11px] text-gray-400 text-center leading-tight max-w-[80px]">{label}</span>
    </div>
  );
}
