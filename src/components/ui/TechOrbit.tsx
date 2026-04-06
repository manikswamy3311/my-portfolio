'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface OrbitRing {
  radius: number;
  duration: number;
  direction: 1 | -1;
  items: { label: string; color: string }[];
}

const RINGS: OrbitRing[] = [
  {
    radius: 70,
    duration: 25,
    direction: 1,
    items: [
      { label: 'Python', color: '#06b6d4' },
      { label: 'SQL', color: '#3b82f6' },
      { label: 'R', color: '#8b5cf6' },
    ],
  },
  {
    radius: 120,
    duration: 35,
    direction: -1,
    items: [
      { label: 'TensorFlow', color: '#f97316' },
      { label: 'PyTorch', color: '#ef4444' },
      { label: 'Spark', color: '#22c55e' },
      { label: 'Kafka', color: '#06b6d4' },
      { label: 'Scikit', color: '#3b82f6' },
    ],
  },
  {
    radius: 170,
    duration: 45,
    direction: 1,
    items: [
      { label: 'AWS', color: '#f59e0b' },
      { label: 'Docker', color: '#3b82f6' },
      { label: 'K8s', color: '#6366f1' },
      { label: 'Tableau', color: '#06b6d4' },
      { label: 'Airflow', color: '#22c55e' },
      { label: 'MLflow', color: '#ec4899' },
      { label: 'GCP', color: '#ef4444' },
    ],
  },
];

export default function TechOrbit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const size = 400;
  const center = size / 2;

  return (
    <div ref={ref} className="flex justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[400px]">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <filter id="orbitGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center glow */}
        {isInView && (
          <motion.circle
            cx={center} cy={center} r="50"
            fill="url(#centerGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <animate attributeName="r" values="45;55;45" dur="4s" repeatCount="indefinite" />
          </motion.circle>
        )}

        {/* Center label */}
        {isInView && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          >
            <circle cx={center} cy={center} r="28" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
            <text x={center} y={center - 4} textAnchor="middle" className="text-[11px] font-bold" fill="#06b6d4">ML</text>
            <text x={center} y={center + 9} textAnchor="middle" className="text-[7px]" fill="#06b6d4" opacity="0.7">STACK</text>
          </motion.g>
        )}

        {/* Orbit rings */}
        {RINGS.map((ring, ringIdx) => (
          <g key={ringIdx}>
            {/* Ring path */}
            {isInView && (
              <motion.circle
                cx={center} cy={center} r={ring.radius}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + ringIdx * 0.2, duration: 0.6 }}
                style={{ transformOrigin: `${center}px ${center}px` }}
              />
            )}

            {/* Orbiting items */}
            {isInView && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + ringIdx * 0.2 }}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${center} ${center}`}
                  to={`${ring.direction * 360} ${center} ${center}`}
                  dur={`${ring.duration}s`}
                  repeatCount="indefinite"
                />
                {ring.items.map((item, itemIdx) => {
                  const angle = (360 / ring.items.length) * itemIdx;
                  const rad = (angle * Math.PI) / 180;
                  const x = center + ring.radius * Math.cos(rad);
                  const y = center + ring.radius * Math.sin(rad);

                  return (
                    <g key={item.label}>
                      {/* Item dot */}
                      <circle
                        cx={x} cy={y} r="4"
                        fill={item.color}
                        opacity="0.8"
                        filter="url(#orbitGlow)"
                      />
                      {/* Item label - counter-rotate to keep text readable */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from={`0 ${x} ${y}`}
                          to={`${-ring.direction * 360} ${x} ${y}`}
                          dur={`${ring.duration}s`}
                          repeatCount="indefinite"
                        />
                        <text
                          x={x}
                          y={y - 9}
                          textAnchor="middle"
                          className="text-[7px] font-medium"
                          fill={item.color}
                          opacity="0.9"
                        >
                          {item.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </motion.g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
