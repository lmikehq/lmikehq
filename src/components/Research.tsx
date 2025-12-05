import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RESEARCH_DATA } from "../constants";
import { FileText, ArrowRight, FlaskConical } from "lucide-react";

interface ResearchProps {
  isPreview?: boolean;
  onViewAll?: () => void;
}

const Research: React.FC<ResearchProps> = ({
  isPreview = false,
  onViewAll,
}) => {
  const displayData = isPreview ? RESEARCH_DATA.slice(0, 2) : RESEARCH_DATA;
  const isEmpty = displayData.length === 0;

  return (
    <section className={`bg-white ${isPreview ? "py-20" : "pt-32 pb-20"}`}>
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {isPreview ? "Research & Publications" : "Research Lab"}
            </h2>
            <p className="mt-4 text-slate-600">
              Exploring the frontiers of Medical AI and Generative Models.
            </p>
          </div>
          {isPreview && onViewAll && !isEmpty && (
            <button
              onClick={onViewAll}
              className="group flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 cursor-pointer"
            >
              View Archive
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <FlaskConical className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700">
              Coming Soon
            </h3>
            <p className="mt-2 max-w-md text-slate-500">
              Research papers and publications are currently in the works. Check
              back soon for updates on my latest findings.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {displayData.map((paper, idx) => (
              <Link key={paper.id} href={`/research/${paper.slug}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:bg-white hover:shadow-lg md:flex-row md:items-start cursor-pointer"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <FileText className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="font-semibold text-primary-600">
                        {paper.conference}
                      </span>
                      <span>•</span>
                      <span>{paper.date}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="mt-3 text-slate-600 leading-relaxed">
                      {paper.abstract}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <span className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                      Read Paper
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
            n{" "}
          </div>
        )}
      </div>
    </section>
  );
};

export default Research;
