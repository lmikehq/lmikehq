import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Modal from './ui/Modal';
import { ProjectItem } from '../types';

interface ProjectsProps {
  isPreview?: boolean;
  onViewAll?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ isPreview = false, onViewAll }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Show only first 3 if in preview mode
  const displayProjects = isPreview ? PROJECTS_DATA.slice(0, 3) : PROJECTS_DATA;

  return (
    <section id="projects" className={`bg-slate-50 ${isPreview ? 'py-20' : 'pt-32 pb-20'}`}>
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-slate-900">{isPreview ? "Featured Projects" : "All Projects"}</h2>
            <p className="mt-4 text-slate-600">
              {isPreview ? "Selected works in AI, NLP, and Predictive Analytics" : "A comprehensive list of my engineering endeavors."}
            </p>
          </div>
          {isPreview && onViewAll && (
            <button 
              onClick={onViewAll}
              className="group flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <div className="absolute inset-0 bg-primary-900/10 transition-opacity group-hover:opacity-0" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div className="p-6">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-600">
                  {project.category}
                </span>
                <h3 className="mb-2 text-xl font-bold text-slate-900">{project.title}</h3>
                <p className="line-clamp-2 text-sm text-slate-600">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-6">
             <div className="overflow-hidden rounded-xl border border-slate-100">
               <img src={selectedProject.image} alt={selectedProject.title} className="h-56 w-full object-cover" />
             </div>
             
             <div>
               <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Overview</h4>
               <p className="mt-2 text-slate-700 leading-relaxed">
                 {selectedProject.description}
               </p>
             </div>

             <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
               {selectedProject.stats.map(stat => (
                 <div key={stat.label}>
                   <p className="text-xs text-slate-500">{stat.label}</p>
                   <p className="text-xl font-bold text-primary-600">{stat.value}</p>
                 </div>
               ))}
             </div>

             <div className="flex gap-3">
               <button className="flex-1 rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700">
                 View Code
               </button>
               <button className="flex-1 rounded-lg border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                 Case Study
               </button>
             </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects;