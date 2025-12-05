import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { getAllSlugs, getProjectBySlug, ProjectMeta } from "@/lib/content";
import Meta from "@/components/Meta";
import CodeBlockEnhancer from "@/components/ui/CodeBlockEnhancer";

interface ProjectDetailProps {
  project: {
    meta: ProjectMeta;
    contentHtml: string;
  };
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const { meta, contentHtml } = project;

  return (
    <>
      <CodeBlockEnhancer />
      <Meta
        title={`${meta.title} | Projects | MikeHQ`}
        description={meta.description}
        image={meta.image}
        url={`https://mikehq.tech/projects/${meta.slug}`}
      />
      <article className="pt-32 pb-20 bg-slate-50">
        <div className="container mx-auto max-w-4xl px-6">
          {/* Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          {/* Header */}
          <header className="mb-8">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
              {meta.category}
            </span>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {meta.title}
            </h1>
            <p className="text-xl text-slate-600">{meta.description}</p>
          </header>

          {/* Featured Image */}
          <div className="mb-8 overflow-hidden rounded-2xl">
            <img
              src={meta.image}
              alt={meta.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Stats & Links */}
          <div className="mb-8 flex flex-wrap gap-4">
            {meta.stats?.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-primary-600">
                  {stat.value}
                </p>
              </div>
            ))}

            {meta.github && (
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-white hover:bg-slate-800 transition-colors"
              >
                <Github className="h-5 w-5" />
                View Code
              </a>
            )}

            {meta.demo && (
              <a
                href={meta.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-4 text-white hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                Live Demo
              </a>
            )}
          </div>

          {/* Technologies */}
          {meta.technologies && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {meta.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className="article-content bg-white rounded-2xl p-8 md:p-10 shadow-sm ring-1 ring-slate-100"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </article>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs("projects");

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
};

export default ProjectDetail;
