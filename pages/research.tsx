import { GetStaticProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ExternalLink, ArrowRight } from "lucide-react";
import { getAllResearch, ResearchMeta } from "@/lib/content";
import Meta from "@/components/Meta";

interface ResearchPageProps {
  papers: { meta: ResearchMeta }[];
}

const ResearchPage = ({ papers }: ResearchPageProps) => {
  return (
    <>
      <Meta
        title="Research | MikeHQ"
        description="Exploring the frontiers of Medical AI, Generative Models, and Computer Vision."
        url="https://mikehq.tech/research"
      />
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900">Research Lab</h1>
            <p className="mt-4 text-slate-600">
              Exploring the frontiers of Medical AI and Generative Models.
            </p>
          </div>

          <div className="space-y-6">
            {papers.map((paper, idx) => (
              <motion.div
                key={paper.meta.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group relative flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:bg-white hover:shadow-lg md:flex-row md:items-start"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <FileText className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="font-semibold text-primary-600">
                      {paper.meta.conference}
                    </span>
                    <span>•</span>
                    <span>{paper.meta.date}</span>
                  </div>
                  <Link href={`/research/${paper.meta.slug}`}>
                    <h2 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors cursor-pointer">
                      {paper.meta.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {paper.meta.abstract}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {paper.meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <Link
                    href={`/research/${paper.meta.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {paper.meta.link && paper.meta.link !== "#" && (
                    <a
                      href={paper.meta.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                    >
                      Paper
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const papers = getAllResearch();

  return {
    props: {
      papers,
    },
  };
};

export default ResearchPage;
