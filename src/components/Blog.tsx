import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_DATA } from "../constants";
import { Calendar, Clock, ArrowRight, PenLine } from "lucide-react";

interface BlogProps {
  isPreview?: boolean;
  onViewAll?: () => void;
}

const Blog: React.FC<BlogProps> = ({ isPreview = false, onViewAll }) => {
  const displayPosts = isPreview ? BLOG_DATA.slice(0, 2) : BLOG_DATA;
  const isEmpty = displayPosts.length === 0;

  return (
    <section className={`bg-slate-50 ${isPreview ? "py-20" : "pt-32 pb-20"}`}>
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {isPreview ? "Latest Articles" : "The MikeHQ Blog"}
            </h2>
            <p className="mt-4 text-slate-600">
              Thoughts on AI architecture, system design, and the future of
              tech.
            </p>
          </div>
          {isPreview && onViewAll && !isEmpty && (
            <button
              onClick={onViewAll}
              className="group flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 cursor-pointer"
            >
              Read All Articles
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
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <PenLine className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700">
              Coming Soon
            </h3>
            <p className="mt-2 max-w-md text-slate-500">
              Blog articles are on the way. Stay tuned for insights on AI, ML
              engineering, and tech architecture.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl"
              >
                <Link href={`/blog/${post.slug}`} className="cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rounded-md bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-600 backdrop-blur">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm text-slate-600 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <span className="flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
