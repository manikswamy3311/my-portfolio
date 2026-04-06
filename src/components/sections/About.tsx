'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Brain, TrendingUp, Layers } from 'lucide-react';
import { personal } from '@/data/personal';
import { education } from '@/data/education';
import MLPipeline from '@/components/ui/MLPipeline';
import ActivityHeatmap from '@/components/ui/ActivityHeatmap';

function AnimatedCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-wider uppercase mb-4 block">
            Who I Am
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-gray-400/80 max-w-2xl mx-auto text-lg">
            Transforming data into strategic insights across healthcare, finance, and enterprise systems
          </p>
        </motion.div>

        {/* ML Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass rounded-2xl p-6 sm:p-8 mb-8"
        >
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
            End-to-End ML Pipeline
          </h3>
          <MLPipeline />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Background card - spans 2 cols */}
          <motion.div
            variants={item}
            className="lg:col-span-2 glass rounded-2xl p-8 card-hover group"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Background</h3>
            </div>
            <p className="text-gray-300/80 leading-relaxed text-[15px]">
              Data scientist with 5+ years building production ML systems that solve real business problems.
              Started in financial analytics, expanded into healthcare AI, and now specialize in end-to-end
              ML pipelines from data engineering to deployment. I focus on business impact first — whether
              it&apos;s predicting patient outcomes, optimizing pricing strategies, or detecting fraud, the
              goal is always measurable results.
            </p>
          </motion.div>

          {/* Approach card */}
          <motion.div
            variants={item}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Approach</h3>
            </div>
            <p className="text-gray-300/80 leading-relaxed text-[15px]">
              Technical excellence is a means to business outcomes, not the end itself.
              Every model I build starts with a clear business question and ends with measurable impact.
            </p>
          </motion.div>

          {/* Education cards */}
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={item}
              className="glass rounded-2xl p-7 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{edu.degree}</h4>
                  <p className="text-cyan-400 text-xs">{edu.field}</p>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{edu.institution}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>
              </div>
              {edu.highlights && (
                <div className="flex flex-wrap gap-1.5">
                  {edu.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Core focus card */}
          <motion.div
            variants={item}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Core Focus</h3>
            </div>
            <div className="space-y-3">
              {['End-to-End ML Pipelines', 'Predictive Analytics', 'Production Deployment', 'Data Architecture'].map((focus, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  <span className="text-gray-300/80 text-sm">{focus}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 glass rounded-2xl p-8 sm:p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter value={5} suffix="+" label="Years Experience" />
            <AnimatedCounter value={10} suffix="+" label="ML Projects" />
            <AnimatedCounter value={3} suffix="" label="Industries" />
            <AnimatedCounter value={10} suffix="TB+" label="Data Processed" />
          </div>
        </motion.div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 glass rounded-2xl p-6 sm:p-8"
        >
          <ActivityHeatmap />
        </motion.div>
      </div>
    </section>
  );
}
