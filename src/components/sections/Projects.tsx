'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Zap, Target, ArrowUpRight } from 'lucide-react';
import { projects, projectCategories } from '@/data/projects';
import MetricRing from '@/components/ui/MetricRing';

const CATEGORY_COLORS: Record<string, string> = {
  'Healthcare AI': 'from-cyan-400 to-blue-500',
  'Business Intelligence': 'from-blue-400 to-purple-500',
  'Financial Analytics': 'from-purple-400 to-pink-500',
  'Marketing Analytics': 'from-pink-400 to-orange-400',
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Healthcare AI': Target,
  'Business Intelligence': Layers,
  'Financial Analytics': Zap,
  'Marketing Analytics': ExternalLink,
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  const gradientColor = CATEGORY_COLORS[project.category] || 'from-blue-400 to-purple-500';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-2xl p-7 group cursor-default transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.08)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4" style={{ transform: 'translateZ(20px)' }}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientColor} bg-opacity-10`}
            style={{ background: `linear-gradient(135deg, rgba(var(--tw-gradient-stops)))` }}
          >
            <span className={`text-xs font-medium bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
              {project.category}
            </span>
          </div>
          {project.featured && (
            <span className="flex items-center gap-1 text-xs text-yellow-400/80">
              <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400/80 text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Challenge & Solution */}
        <div className="mt-5 space-y-3" style={{ transform: 'translateZ(15px)' }}>
          <div className="glass rounded-xl p-4">
            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5">Challenge</h4>
            <p className="text-sm text-gray-300/70 leading-relaxed">{project.challenge}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">Solution</h4>
            <p className="text-sm text-gray-300/70 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Impact with metric rings */}
        <div className="mt-5" style={{ transform: 'translateZ(25px)' }}>
          <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-4">Impact</h4>

          {/* Metric rings row */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-5">
            {project.impact.slice(0, 3).map((impactItem, idx) => {
              // Extract number from impact string
              const match = impactItem.match(/(\d+)/);
              const num = match ? parseInt(match[1]) : 0;
              const colors = ['#06b6d4', '#8b5cf6', '#22c55e'];
              // Create short label from impact text
              const shortLabel = impactItem
                .replace(/\d+%?\s*/, '')
                .replace(/improvement in |reduction in |increase in |through |by /gi, '')
                .slice(0, 30);
              return (
                <MetricRing
                  key={idx}
                  value={num}
                  label={shortLabel}
                  suffix="%"
                  color={colors[idx % colors.length]}
                  size={80}
                  delay={idx * 0.15}
                />
              );
            })}
          </div>

          <div className="space-y-2">
            {project.impact.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="mt-1.5 w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-5 flex flex-wrap gap-1.5" style={{ transform: 'translateZ(20px)' }}>
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400/80 max-w-2xl mx-auto text-lg">
            End-to-end ML systems delivering measurable business impact
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
