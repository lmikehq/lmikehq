import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const siteUrl = "https://mikehq.tech";

const Meta: React.FC<MetaProps> = ({
  title = "MikeHQ | Machine Learning Engineer & AI Architect",
  description = "Michael Adebisi (MikeHQ) - Machine Learning Engineer & AI Architect specializing in NLP, Computer Vision, and MLOps. Building scalable AI solutions.",
  keywords = "machine learning engineer, AI architect, MLOps, deep learning, NLP, computer vision, Python, TensorFlow, PyTorch, AWS SageMaker",
  image = `${siteUrl}/og-image.png`,
  url = siteUrl,
}) => {
  const fullTitle = title.includes("MikeHQ") ? title : `${title} | MikeHQ`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MikeHQ" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MikeHQ" />
      <meta name="twitter:creator" content="@MikeHQ" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Michael E. Adebisi",
            alternateName: "MikeHQ",
            url: siteUrl,
            image: `${siteUrl}/og-image.png`,
            jobTitle: "Machine Learning Engineer & AI Architect",
            worksFor: {
              "@type": "Organization",
              name: "Thrillers Travels Ltd",
            },
            sameAs: [
              "https://github.com/r33ldev",
              "https://linkedin.com/in/mikeadebisi",
              "https://twitter.com/MikeHQ",
            ],
            knowsAbout: [
              "Machine Learning",
              "Artificial Intelligence",
              "Deep Learning",
              "Natural Language Processing",
              "Computer Vision",
              "MLOps",
            ],
          }),
        }}
      />
    </Head>
  );
};

export default Meta;
