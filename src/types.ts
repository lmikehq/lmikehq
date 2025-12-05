import { ReactNode } from 'react';

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface ResearchItem {
  id: number;
  title: string;
  slug: string;
  conference: string;
  date: string;
  abstract: string;
  link: string;
  tags: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}