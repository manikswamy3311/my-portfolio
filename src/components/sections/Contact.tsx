'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { personal } from '@/data/personal';
import { socialLinks } from '@/data/social';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-mono tracking-wider uppercase mb-4 block">
            Let&apos;s Connect
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-400/80 max-w-2xl mx-auto text-lg">
            Open to discussing ML opportunities, collaborations, or consulting projects
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Contact info */}
          <motion.div variants={item} className="space-y-5">
            {/* Info card */}
            <div className="glass rounded-2xl p-7">
              <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>

              <div className="space-y-5">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Email</div>
                    <div className="text-gray-200 group-hover:text-cyan-300 transition-colors text-sm">
                      {personal.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${personal.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Phone</div>
                    <div className="text-gray-200 group-hover:text-purple-300 transition-colors text-sm">
                      {personal.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Location</div>
                    <div className="text-gray-200 text-sm">{personal.location}</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-7 pt-6 border-t border-white/5">
                <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Connect</div>
                <div className="flex gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = ICON_MAP[social.platform];
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl hover:bg-white/[0.06] transition-all duration-300 group"
                      >
                        {Icon && <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />}
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                          {social.platform}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Availability card */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-green-400" />
                <h4 className="font-semibold text-white text-sm">Availability</h4>
              </div>
              <p className="text-gray-400/80 text-sm leading-relaxed">
                {personal.availability}. Typical response time: 24-48 hours.
              </p>
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            variants={item}
            className="glass rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let&apos;s Build Something<br />
                <span className="text-gradient">Extraordinary</span>
              </h3>
              <p className="text-gray-400/80 leading-relaxed mb-8">
                Whether you&apos;re looking to build ML systems, optimize existing pipelines,
                or explore AI opportunities, I&apos;m interested in challenging problems that
                drive real business value.
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${personal.email}?subject=Project Inquiry`}
                  className="group flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl font-medium text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Email</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href={socialLinks.find((s) => s.platform === 'LinkedIn')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full px-6 py-4 glass rounded-xl font-medium hover:bg-white/[0.06] transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Decorative data viz element */}
            <div className="mt-10 relative">
              <div className="flex items-end justify-between gap-1 h-12 px-2">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/20 to-blue-500/10"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${h}%` } : {}}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                ))}
              </div>
              <div className="h-px bg-white/5 mt-1" />
              <p className="text-[10px] text-gray-600 text-center mt-2 font-mono">engagement metrics</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
