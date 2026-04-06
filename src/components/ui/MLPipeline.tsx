'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Cog, Cpu, Brain, Rocket, Activity } from 'lucide-react';

const STAGES = [
  { icon: Database, label: 'Data Collection', color: '#06b6d4', desc: '10TB+ ingestion' },
  { icon: Cog, label: 'Processing', color: '#3b82f6', desc: 'ETL & cleaning' },
  { icon: Cpu, label: 'Feature Eng.', color: '#6366f1', desc: 'Automated pipelines' },
  { icon: Brain, label: 'Model Training', color: '#8b5cf6', desc: 'Deep learning' },
  { icon: Rocket, label: 'Deployment', color: '#a855f7', desc: 'Production APIs' },
  { icon: Activity, label: 'Monitoring', color: '#ec4899', desc: 'Real-time metrics' },
];

export default function MLPipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="w-full overflow-hidden py-4">
      {/* Mobile: vertical layout */}
      <div className="block sm:hidden space-y-3">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${stage.color}15`, border: `1px solid ${stage.color}30` }}
              >
                <Icon className="w-4 h-4" style={{ color: stage.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white">{stage.label}</div>
                <div className="text-[10px] text-gray-500">{stage.desc}</div>
              </div>
              {i < STAGES.length - 1 && (
                <svg className="w-4 h-4 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Desktop: horizontal animated pipeline */}
      <div className="hidden sm:block">
        <svg viewBox="0 0 900 140" className="w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Animated gradient for the flow line */}
            <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="20%" stopColor="#3b82f6" />
              <stop offset="40%" stopColor="#6366f1" />
              <stop offset="60%" stopColor="#8b5cf6" />
              <stop offset="80%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="pipeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Animated dot */}
            <circle id="flowDot" r="3" fill="url(#pipeGradient)" filter="url(#pipeGlow)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
          </defs>

          {/* Background connection line */}
          {isInView && (
            <motion.line
              x1="75" y1="50" x2="825" y2="50"
              stroke="url(#pipeGradient)"
              strokeWidth="1.5"
              strokeOpacity="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          )}

          {/* Flowing dots along the line */}
          {isInView && [0, 1, 2].map((dotIdx) => (
            <circle key={dotIdx} r="2.5" fill="url(#pipeGradient)" filter="url(#pipeGlow)" opacity="0.8">
              <animateMotion
                dur={`${3 + dotIdx * 0.5}s`}
                repeatCount="indefinite"
                begin={`${dotIdx * 1}s`}
                path="M 75,50 L 825,50"
              />
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${3 + dotIdx * 0.5}s`} repeatCount="indefinite" begin={`${dotIdx * 1}s`} />
            </circle>
          ))}

          {/* Stage nodes */}
          {STAGES.map((stage, i) => {
            const x = 75 + i * 150;
            const y = 50;
            return (
              <g key={stage.label}>
                {/* Node background circle */}
                {isInView && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  >
                    {/* Outer glow ring */}
                    <circle cx={x} cy={y} r="26" fill="none" stroke={stage.color} strokeWidth="0.5" opacity="0.2">
                      <animate attributeName="r" values="26;30;26" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                      <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                    </circle>

                    {/* Main circle */}
                    <circle cx={x} cy={y} r="22" fill={`${stage.color}10`} stroke={stage.color} strokeWidth="1" strokeOpacity="0.4" />

                    {/* Inner icon placeholder (small circle) */}
                    <circle cx={x} cy={y} r="4" fill={stage.color} opacity="0.8" />

                    {/* Label */}
                    <text x={x} y={y + 42} textAnchor="middle" className="text-[10px] font-medium" fill="white" opacity="0.9">
                      {stage.label}
                    </text>
                    <text x={x} y={y + 56} textAnchor="middle" className="text-[8px]" fill="#6b7280">
                      {stage.desc}
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
