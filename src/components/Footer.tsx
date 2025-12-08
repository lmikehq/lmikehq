import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-12">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <img src="logo_no_bg.png" alt="logo image" className="h-8 w-auto" />
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Building the future with intelligent systems.
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href={`https://${PERSONAL_INFO.socials.github}`}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-primary-400 transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
          <a
            href={`https://${PERSONAL_INFO.socials.linkedin}`}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-primary-400 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`https://${PERSONAL_INFO.socials.twitter}`}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-primary-400 transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        <p className="text-sm text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} MikeHQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;