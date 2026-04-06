'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import { experience } from '@/data/experience';

function TimelineCard({ exp, index }: { exp: typeof experience[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8">
      {/* Left content */}
      <div className={`${isLeft ? '' : 'md:order-3'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="glass rounded-2xl p-6 card-hover group"
        >
          {/* Current badge */}
          {exp.type === 'current' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-medium text-green-400">Current</span>
            </div>
          )}

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {exp.role}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-400 font-medium text-sm">{exp.company}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </span>
          </div>

          {/* Impact items */}
          <div className="mt-4 space-y-2.5">
            {exp.impact.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                className="flex items-start gap-2.5"
              >
                <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-gray-300/80 text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {exp.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline center */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative w-4 h-4 rounded-full ${
            exp.type === 'current'
              ? 'bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.4)]'
              : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
          }`}
        >
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-400" />
        </motion.div>
        {index < experience.length - 1 && (
          <div className="w-px flex-1 timeline-line opacity-40" />
        )}
      </div>

      {/* Right side (empty for alternating) */}
      <div className={`hidden md:block ${isLeft ? '' : 'md:order-1'}`} />
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-mono tracking-wider uppercase mb-4 block">
            Career Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-400/80 max-w-2xl mx-auto text-lg">
            Building ML systems that drive measurable business outcomes
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8 md:space-y-0">
          {experience.map((exp, index) => (
            <TimelineCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
