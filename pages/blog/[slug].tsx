import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getAllSlugs, getBlogPostBySlug, BlogMeta } from "@/lib/content";
import Meta from "@/components/Meta";

interface BlogDetailProps {
  post: {
    meta: BlogMeta;
    contentHtml: string;
  };
}

const BlogDetail = ({ post }: BlogDetailProps) => {
  const { meta, contentHtml } = post;

  return (
    <>
      <Meta
        title={`${meta.title} | Blog | MikeHQ`}
        description={meta.excerpt}
        image={meta.image}
        url={`https://mikehq.tech/blog/${meta.slug}`}
      />
      <article className="pt-32 pb-20 bg-slate-50">
        <div className="container mx-auto max-w-3xl px-6">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
              {meta.category}
            </span>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {meta.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {meta.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(meta.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {meta.readTime}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-10 overflow-hidden rounded-2xl">
            <img
              src={meta.image}
              alt={meta.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Tags */}
          {meta.tags && (
            <div className="mb-8 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="article-content bg-white rounded-2xl p-8 md:p-10 shadow-sm ring-1 ring-slate-100"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Share & Author */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">M</span>
              </div>
              <div>
                <p className="font-bold text-slate-900">{meta.author}</p>
                <p className="text-sm text-slate-500">
                  Machine Learning Engineer & AI Architect
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs("blog");

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default BlogDetail;
