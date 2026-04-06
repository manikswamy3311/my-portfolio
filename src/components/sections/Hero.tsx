'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, ArrowRight } from 'lucide-react';
import { personal } from '@/data/personal';
import { socialLinks } from '@/data/social';
import NeuralNetwork from '@/components/ui/NeuralNetwork';
import FloatingCode from '@/components/ui/FloatingCode';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const words = personal.headline.rotating;

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(word.substring(0, displayText.length + 1));
          if (displayText === word) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(word.substring(0, displayText.length - 1));
          if (displayText === '') {
            setIsDeleting(false);
            setCurrentWord((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord, words]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Neural network background */}
      <div className="absolute inset-0">
        <NeuralNetwork />
        <FloatingCode />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/30 via-[#030014]/50 to-[#030014]" />
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-purple-500/8 rounded-full blur-[140px] animate-float-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-green-300/90">{personal.availability}</span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
          >
            <span className="block text-white/95">{personal.name.split(' ')[0]}</span>
            <span className="block text-gradient mt-2">{personal.name.split(' ')[1]}</span>
          </motion.h1>

          {/* Typewriter headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light"
          >
            <span>{personal.headline.prefix} </span>
            <span className="text-cyan-400 font-medium">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'steps(2)' }}
                className="text-cyan-400 ml-0.5"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-gray-400/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            {personal.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full font-medium text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.35)] flex items-center gap-2.5"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full font-medium glass hover:bg-white/[0.08] transition-all duration-300 text-gray-300 hover:text-white"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex items-center justify-center gap-3 pt-6"
          >
            {socialLinks.map((social, i) => {
              const Icon = ICON_MAP[social.platform];
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="p-3 rounded-xl glass hover:bg-white/[0.08] transition-all duration-300 text-gray-400 hover:text-white hover:scale-110"
                  aria-label={social.platform}
                >
                  {Icon ? <Icon className="w-5 h-5" /> : <span className="text-sm">{social.platform}</span>}
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
