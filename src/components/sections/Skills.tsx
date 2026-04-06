'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Brain, Database, Cloud, BarChart3, Target } from 'lucide-react';
import { skills } from '@/data/skills';
import TechOrbit from '@/components/ui/TechOrbit';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Machine Learning & AI': Brain,
  'Data Engineering & Processing': Database,
  'Cloud & DevOps': Cloud,
  'Analytics & Visualization': BarChart3,
  'Domain Expertise': Target,
};

const CATEGORY_COLORS: Record<string, { gradient: string; bg: string; text: string; bar: string }> = {
  'Machine Learning & AI': {
    gradient: 'from-cyan-400 to-blue-500',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    bar: 'from-cyan-400 to-blue-500',
  },
  'Data Engineering & Processing': {
    gradient: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    bar: 'from-blue-400 to-indigo-500',
  },
  'Cloud & DevOps': {
    gradient: 'from-purple-400 to-violet-500',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    bar: 'from-purple-400 to-violet-500',
  },
  'Analytics & Visualization': {
    gradient: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    bar: 'from-pink-400 to-rose-500',
  },
  'Domain Expertise': {
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    bar: 'from-amber-400 to-orange-500',
  },
};

function getLevelPercent(level: string) {
  switch (level) {
    case 'expert': return 95;
    case 'advanced': return 78;
    case 'intermediate': return 60;
    default: return 40;
  }
}

/* ─── Radar Chart ─── */
function RadarChart({ activeCategory }: { activeCategory: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const categories = skills.map((s) => s.category.split(' ')[0]); // Short names
  const values = useMemo(() => skills.map((cat) => {
    const avg = cat.skills.reduce((sum, s) => sum + getLevelPercent(s.level), 0) / cat.skills.length;
    return avg / 100;
  }), []);

  const size = 300;
  const center = size / 2;
  const radius = 110;
  const levels = 3;
  const n = categories.length;
  const angleStep = (Math.PI * 2) / n;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = value * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  // Grid polygons
  const gridPolygons = Array.from({ length: levels }, (_, l) => {
    const val = (l + 1) / levels;
    const points = Array.from({ length: n }, (_, i) => getPoint(i, val));
    return points.map((p) => `${p.x},${p.y}`).join(' ');
  });

  // Data polygon
  const dataPoints = values.map((v, i) => getPoint(i, v));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Axis lines
  const axes = Array.from({ length: n }, (_, i) => {
    const end = getPoint(i, 1);
    return { x1: center, y1: center, x2: end.x, y2: end.y };
  });

  // Labels
  const labels = categories.map((cat, i) => {
    const pt = getPoint(i, 1.25);
    return { text: cat, x: pt.x, y: pt.y };
  });

  return (
    <div ref={ref} className="flex justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px]">
        <defs>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        ))}

        {/* Axes */}
        {axes.map((axis, i) => (
          <line
            key={i}
            {...axis}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        ))}

        {/* Data polygon */}
        {isInView && (
          <motion.polygon
            points={dataPolygon}
            fill="url(#radarFill)"
            stroke="url(#radarStroke)"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        )}

        {/* Data points */}
        {isInView && dataPoints.map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={i === activeCategory ? 5 : 3.5}
            fill={i === activeCategory ? '#22d3ee' : '#3b82f6'}
            stroke="#030014"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
            className="transition-all duration-300"
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-[10px] font-medium transition-all duration-300 ${
              i === activeCategory ? 'fill-cyan-300' : 'fill-gray-500'
            }`}
          >
            {label.text}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ─── Skill Bar ─── */
function SkillBar({ skill, color, delay, isVisible }: {
  skill: { name: string; level: string; years?: number };
  color: { bar: string };
  delay: number;
  isVisible: boolean;
}) {
  const percent = getLevelPercent(skill.level);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-gray-300/80 group-hover:text-white transition-colors truncate pr-2">
          {skill.name}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {skill.years && (
            <span className="text-[10px] text-gray-500 font-mono">{skill.years}y</span>
          )}
          <span className="text-[10px] text-gray-500 font-mono w-8 text-right capitalize">
            {skill.level.slice(0, 3)}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color.bar}`}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </div>
  );
}

/* ─── Main Skills Component ─── */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const currentCategory = skills[activeCategory];
  const colors = CATEGORY_COLORS[currentCategory.category] || CATEGORY_COLORS['Machine Learning & AI'];

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-mono tracking-wider uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-400/80 max-w-2xl mx-auto text-lg">
            Expertise across the full ML stack, from data engineering to production deployment
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
          {/* Left: Radar + Category tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Radar Chart */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
                Skill Overview
              </h3>
              <RadarChart activeCategory={activeCategory} />
            </div>

            {/* Tech Orbit */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">
                Technology Ecosystem
              </h3>
              <TechOrbit />
            </div>

            {/* Category tabs */}
            <div className="space-y-2">
              {skills.map((cat, i) => {
                const Icon = CATEGORY_ICONS[cat.category];
                const catColors = CATEGORY_COLORS[cat.category];
                const isActive = i === activeCategory;

                return (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? 'glass border-white/10 shadow-lg'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? catColors.bg : 'bg-white/[0.04]'}`}>
                      {Icon && <Icon className={`w-4 h-4 ${isActive ? catColors.text : 'text-gray-500'}`} />}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {cat.category}
                    </span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-500 font-mono">
                        {cat.skills.length}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-5 px-4 py-3 glass rounded-xl">
              {[
                { label: 'Expert', color: 'bg-green-400' },
                { label: 'Advanced', color: 'bg-blue-400' },
                { label: 'Intermediate', color: 'bg-purple-400' },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-[11px] text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  {(() => {
                    const Icon = CATEGORY_ICONS[currentCategory.category];
                    return Icon ? (
                      <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                    ) : null;
                  })()}
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentCategory.category}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{currentCategory.skills.length} skills</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {currentCategory.skills.map((skill, idx) => (
                    <SkillBar
                      key={`${activeCategory}-${idx}`}
                      skill={skill}
                      color={colors}
                      delay={idx * 0.08}
                      isVisible={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
