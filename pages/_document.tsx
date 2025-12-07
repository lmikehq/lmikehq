import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Character encoding */}
        <meta charSet="utf-8" />

        {/* SEO */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="Michael E. Adebisi (MikeHQ)" />

        {/* GEO targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />

        {/* Language alternates for international SEO */}
        <link rel="alternate" href="https://mikehq.tech" hrefLang="en" />
        <link rel="alternate" href="https://mikehq.tech" hrefLang="x-default" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </Head>
      <body className="antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
