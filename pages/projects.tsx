import { GetStaticProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects, ProjectMeta } from "@/lib/content";
import Meta from "@/components/Meta";

interface ProjectsPageProps {
  projects: { meta: ProjectMeta }[];
}

const ProjectsPage = ({ projects }: ProjectsPageProps) => {
  return (
    <>
      <Meta
        title="Projects | MikeHQ"
        description="Explore my portfolio of AI, machine learning, and software engineering projects."
        url="https://mikehq.tech/projects"
      />
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-left">
            <h1 className="text-4xl font-bold text-slate-900">All Projects</h1>
            <p className="mt-4 text-slate-600">
              A comprehensive list of my engineering endeavors in AI, NLP, and
              Predictive Analytics.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.div
                key={project.meta.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl"
              >
                <Link href={`/projects/${project.meta.slug}`}>
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <div className="absolute inset-0 bg-primary-900/10 transition-opacity group-hover:opacity-0" />
                    <img
                      src={project.meta.image}
                      alt={project.meta.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-600">
                      {project.meta.category}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {project.meta.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-slate-600">
                      {project.meta.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.meta.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = getAllProjects();

  return {
    props: {
      projects,
    },
  };
};

export default ProjectsPage;
