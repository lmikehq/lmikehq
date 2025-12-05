import { GetStaticProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, PenLine } from "lucide-react";
import { getAllBlogPosts, BlogMeta } from "@/lib/content";
import Meta from "@/components/Meta";

interface BlogPageProps {
  posts: { meta: BlogMeta }[];
}

const BlogPage = ({ posts }: BlogPageProps) => {
  const isEmpty = posts.length === 0;

  return (
    <>
      <Meta
        title="Blog | MikeHQ"
        description="Thoughts on AI architecture, system design, MLOps, and the future of tech."
        url="https://mikehq.tech/blog"
      />
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900">
              The MikeHQ Blog
            </h1>
            <p className="mt-4 text-slate-600">
              Thoughts on AI architecture, system design, and the future of
              tech.
            </p>
          </div>

          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                <PenLine className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-700">Coming Soon</h2>
              <p className="mt-3 max-w-md text-slate-500">
                Blog articles are on the way. Stay tuned for insights on AI, ML engineering, and tech architecture.
              </p>
            </motion.div>
          ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <motion.article
                key={post.meta.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl"
              >
                <Link
                  href={`/blog/${post.meta.slug}`}
                  className="flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.meta.image}
                      alt={post.meta.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rounded-md bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-600 backdrop-blur">
                      {post.meta.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.meta.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.meta.readTime}
                      </div>
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {post.meta.title}
                    </h2>
                    <p className="mb-6 flex-1 text-sm text-slate-600 leading-relaxed">
                      {post.meta.excerpt}
                    </p>

                    <span className="flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}n          </div>
          )}
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
