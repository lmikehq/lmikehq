import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PROJECTS_DATA } from "../constants";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface ProjectsProps {
  isPreview?: boolean;
  onViewAll?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({
  isPreview = false,
  onViewAll,
}) => {
  const displayProjects = isPreview ? PROJECTS_DATA.slice(0, 3) : PROJECTS_DATA;

  return (
    <section
      id="projects"
      className={`bg-slate-50 ${isPreview ? "py-20" : "pt-32 pb-20"}`}
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-slate-900">
              {isPreview ? "Featured Projects" : "All Projects"}
            </h2>
            <p className="mt-4 text-slate-600">
              {isPreview
                ? "Selected works in AI, NLP, and Predictive Analytics"
                : "A comprehensive list of my engineering endeavors."}
            </p>
          </div>
          {isPreview && onViewAll && (
            <button
              onClick={onViewAll}
              className="group flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 cursor-pointer"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, idx) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl h-full"
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
                  <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
