import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Users,
  Building,
  ExternalLink,
} from "lucide-react";
import { getAllSlugs, getResearchBySlug, ResearchMeta } from "@/lib/content";
import Meta from "@/components/Meta";
import CodeBlockEnhancer from "@/components/ui/CodeBlockEnhancer";

interface ResearchDetailProps {
  paper: {
    meta: ResearchMeta;
    contentHtml: string;
  };
}

const ResearchDetail = ({ paper }: ResearchDetailProps) => {
  const { meta, contentHtml } = paper;

  return (
    <>
      <CodeBlockEnhancer />
      <Meta
        title={`${meta.title} | Research | MikeHQ`}
        description={meta.abstract}
        url={`https://mikehq.tech/research/${meta.slug}`}
      />
      <article className="pt-32 pb-20 bg-slate-50">
        <div className="container mx-auto max-w-4xl px-6">
          {/* Back Link */}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {meta.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-primary-600" />
                {meta.conference}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary-600" />
                {meta.date}
              </div>
              {meta.institution && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-600" />
                  {meta.institution}
                </div>
              )}
            </div>
          </header>

          {/* Authors */}
          {meta.authors && (
            <div className="mb-8 p-4 rounded-xl bg-white ring-1 ring-slate-100">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Authors
              </h3>
              <p className="text-slate-700">{meta.authors.join(", ")}</p>
            </div>
          )}

          {/* Abstract */}
          <div className="mb-8 p-6 rounded-xl bg-primary-50 border-l-4 border-primary-500">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-700 mb-2">
              Abstract
            </h3>
            <p className="text-slate-700 leading-relaxed">{meta.abstract}</p>
          </div>

          {/* External Link */}
          {meta.link && meta.link !== "#" && (
            <div className="mb-8">
              <a
                href={meta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                Read Full Paper
              </a>
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
  const slugs = getAllSlugs("research");

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const paper = await getResearchBySlug(slug);

  if (!paper) {
    return { notFound: true };
  }

  return {
    props: {
      paper,
    },
  };
};

export default ResearchDetail;
