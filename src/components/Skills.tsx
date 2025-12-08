import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 dark:text-white"
          >
            The Tech Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            A curated arsenal of tools and frameworks I leverage to build scalable, high-performance AI solutions.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {SKILLS_DATA.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl bg-slate-50 dark:bg-slate-900 p-8 ring-1 ring-slate-100 dark:ring-slate-800 transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:ring-primary-500/20"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                {category.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{category.name}</h3>
              <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>

              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center rounded-md bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 transition-colors group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-700 dark:group-hover:text-primary-300 group-hover:ring-primary-200 dark:group-hover:ring-primary-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;