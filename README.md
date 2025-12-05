# MikeHQ Portfolio

A modern, SEO-optimized portfolio website built with Next.js 16, featuring a markdown-based content management system for blog posts, projects, and research publications.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

- **⚡ Next.js 16** - Latest React framework with Turbopack for blazing fast builds
- **📝 Markdown Content** - Write blog posts, projects, and research papers in markdown
- **🎨 Tailwind CSS 4** - Modern utility-first styling with custom theme
- **🔍 SEO Optimized** - Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **🌍 GEO Optimized** - Location-aware meta tags for better local search visibility
- **📱 Fully Responsive** - Mobile-first design that looks great on all devices
- **🎭 Framer Motion** - Smooth animations and page transitions
- **📊 Static Generation** - Pre-rendered pages for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lmikehq/lmikehq.git
cd lmikehq

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
lmikehq/
├── content/                 # Markdown content files
│   ├── blog/               # Blog posts
│   ├── projects/           # Project showcases
│   └── research/           # Research publications
├── pages/                   # Next.js pages (routes)
│   ├── blog/
│   │   └── [slug].tsx      # Dynamic blog post pages
│   ├── projects/
│   │   └── [slug].tsx      # Dynamic project pages
│   ├── research/
│   │   └── [slug].tsx      # Dynamic research pages
│   ├── _app.tsx            # App wrapper
│   ├── _document.tsx       # Document head
│   ├── index.tsx           # Homepage
│   └── contact.tsx         # Contact page
├── public/                  # Static assets
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Layout.tsx     # Page layout wrapper
│   │   ├── Meta.tsx       # SEO meta component
│   │   └── ...
│   └── lib/
│       └── content.ts      # Markdown processing utilities
├── styles/
│   └── globals.css         # Global styles & article typography
├── next.config.mjs         # Next.js configuration
├── tailwind.config.cjs     # Tailwind CSS configuration
├── postcss.config.cjs      # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 📝 Adding Content

### Blog Posts

Create a new markdown file in `content/blog/`:

```markdown
---
id: 4
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
excerpt: "A brief description of your post"
date: "2025-01-01"
readTime: "5 min read"
category: "Technology"
image: "https://example.com/image.jpg"
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your markdown content here...
```

### Projects

Create a new markdown file in `content/projects/`:

```markdown
---
id: 6
title: "Project Name"
slug: "project-slug"
category: "Web Development"
description: "Project description"
image: "https://example.com/image.jpg"
stats:
  - label: "Users"
    value: "10K+"
technologies: ["React", "Node.js"]
github: "https://github.com/..."
demo: "https://demo.example.com"
featured: true
date: "2025-01-01"
---

Detailed project description...
```

### Research Papers

Create a new markdown file in `content/research/`:

```markdown
---
id: 5
title: "Research Paper Title"
slug: "paper-slug"
conference: "Conference Name 2025"
date: "2025"
abstract: "Paper abstract..."
link: "https://arxiv.org/..."
tags: ["AI", "Machine Learning"]
authors: ["Author 1", "Author 2"]
institution: "University Name"
---

Additional content about the research...
```

## 🎨 Customization

### Theme Colors

Edit the CSS custom properties in `styles/globals.css`:

```css
@theme {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  /* ... */
}
```

### Site Metadata

Update the `Meta` component props in pages or modify defaults in `src/components/Meta.tsx`.

## 🔧 Tech Stack

| Technology                                                  | Purpose                      |
| ----------------------------------------------------------- | ---------------------------- |
| [Next.js 16](https://nextjs.org/)                           | React framework with SSG/SSR |
| [React 19](https://react.dev/)                              | UI library                   |
| [TypeScript](https://www.typescriptlang.org/)               | Type safety                  |
| [Tailwind CSS 4](https://tailwindcss.com/)                  | Utility-first CSS            |
| [Framer Motion](https://www.framer.com/motion/)             | Animations                   |
| [Lucide React](https://lucide.dev/)                         | Icons                        |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Markdown frontmatter parsing |
| [remark](https://remark.js.org/)                            | Markdown processing          |
| [remark-gfm](https://github.com/remarkjs/remark-gfm)        | GitHub Flavored Markdown     |

## 📈 SEO Features

- **Meta Tags**: Title, description, keywords, author
- **Open Graph**: Facebook/LinkedIn sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **JSON-LD**: Structured data for rich search results
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling rules
- **Canonical URLs**: Prevent duplicate content issues

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📜 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Michael E. Adebisi**

- Website: [mikehq.tech](https://mikehq.tech)
- GitHub: [@lmikehq](https://github.com/lmikehq)

---

Built with ❤️ using Next.js
