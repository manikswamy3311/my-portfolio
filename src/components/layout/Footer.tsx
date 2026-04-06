'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { personal } from '@/data/personal';
import { socialLinks } from '@/data/social';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-3">
              {personal.name.split(' ')[0]}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {personal.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-widest">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-300 py-1"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => {
                const Icon = ICON_MAP[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300 text-gray-500 hover:text-white"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {currentYear} {personal.name}. Crafted with Next.js & Tailwind CSS.
          </p>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300 text-gray-500 hover:text-white group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
