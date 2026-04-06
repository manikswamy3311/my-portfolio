export interface Personal {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  headline: {
    prefix: string;
    rotating: string[];
    suffix: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  type: 'current' | 'past';
  impact: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string[];
  technologies: string[];
  highlights: string[];
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate';
  years?: number;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  highlights?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type Theme = 'light' | 'dark';

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}
