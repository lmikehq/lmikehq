## Project Structure

```
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.tsx        # App wrapper with layout
│   ├── _document.tsx   # Custom document (SEO, meta tags)
│   ├── index.tsx       # Home page
│   ├── projects.tsx    # Projects page
│   ├── research.tsx    # Research page
│   ├── blog.tsx        # Blog page
│   └── contact.tsx     # Contact page
├── public/             # Static assets
│   ├── robots.txt      # Search engine instructions
│   └── sitemap.xml     # XML sitemap for SEO
├── src/
│   ├── components/     # React components
│   │   ├── ui/         # UI components (Modal, ChatWidget, etc.)
│   │   ├── Layout.tsx  # Main layout wrapper
│   │   ├── Meta.tsx    # SEO meta tags component
│   │   └── ...         # Other components
│   ├── constants.tsx   # Site data and content
│   └── types.ts        # TypeScript type definitions
├── styles/
│   └── globals.css     # Global styles with Tailwind
└── next.config.mjs     # Next.js configuration
```

## SEO Features

- Server-side rendering for better SEO
- Dynamic meta tags with Open Graph and Twitter Cards
- Schema.org structured data (JSON-LD)
- XML sitemap
- robots.txt configuration
- Canonical URLs
- GEO targeting meta tags

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
