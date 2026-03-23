# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CyberspaceLab Website - A research group portfolio site built with Astro, showcasing team members, research projects, publications, and news articles.

**Live Site**: https://cyberspacelab.cz
**Tech Stack**: Astro 5.5.5, Vue 3.5, Tailwind CSS, TypeScript
**Deployment**: Netlify (automatic on push to main)

## Development Commands

```bash
# Development
npm run dev          # Start dev server (port 4321)
npm start            # Alias for dev

# Production
npm run build        # Build static site to /dist
npm run preview      # Preview production build locally

# Astro CLI
npm run astro        # Access Astro commands

# Notion Sync (requires .env with NOTION_API_KEY)
npm run sync                  # Sync all collections from Notion
npm run sync:team             # Sync only team members
npm run sync:projects         # Sync only projects
npm run sync:publications     # Sync only publications
```

## Notion Content Sync

Content for team, projects, and publications is managed in Notion and synced to markdown files via `npm run sync`. The sync script fetches from three Notion databases under the "Web information" page, downloads images, and generates `.md` files matching the Astro Content Collections schemas.

**Setup**: Copy `.env.example` to `.env` and add your `NOTION_API_KEY`. The Notion integration must have access to the three databases.

**Workflow**: Edit content in Notion → run `npm run sync` → review git diff → commit → deploy.

**Notion databases**:
- Team DB: `2a460768e59080b48a5fec76d9714e56`
- Projects DB: `32c60768e59080f2a214c93dcfb9f190`
- Publications DB: `2d9897a7996a44d494bfbc52b042d7df`

News articles remain as hand-written markdown in `src/content/news/`.

## Architecture

### Content Collections System

The site uses **Astro Content Collections** with Zod schemas for type-safe content management. All content is in `/src/content/` with schemas defined in [config.ts](src/content/config.ts).

**Four Content Types**:
1. **Team** (`/src/content/team/`) - Member profiles with education, expertise, projects, social links
2. **Projects** (`/src/content/projects/`) - Research projects with members, dates, featured images
3. **Publications** (`/src/content/publications/`) - Academic papers with authors, journals, abstracts
4. **News** (`/src/content/news/`) - Blog articles with dates and tags

**Important**: All content must validate against schemas in [src/content/config.ts](src/content/config.ts:1-73). When adding content, match the exact field structure.

### Astro Islands Pattern

This site combines:
- **Static Generation**: All pages pre-rendered at build time
- **Vue Islands**: Interactive components hydrated on client with `client:visible` directive
- **File-based Routing**: Pages in `/src/pages/` automatically become routes

**Example**: `/src/pages/team/[slug].astro` generates `/team/lukas-hejtmanek` from content collection.

### Component Organization

- **`.astro` files**: Server-rendered pages and layouts (static HTML)
- **`.vue` files**: Client-side interactive components in `/src/components/`
- **`.md` files**: Content with frontmatter, validated by Zod schemas

**Key Components**:
- [Header.vue](src/components/Header.vue) - Main navigation
- [Footer.vue](src/components/Footer.vue) - Site footer
- [MemberCard.vue](src/components/MemberCard.vue) - Team member display
- [ProjectCard.vue](src/components/ProjectCard.vue) - Project previews
- [PublicationCard.vue](src/components/PublicationCard.vue) - Publication listings
- [NewsCard.vue](src/components/NewsCard.vue) - News article cards

### Layout System

Single base layout at [src/layouts/Layout.astro](src/layouts/Layout.astro) provides:
- SEO meta tags (Open Graph, Twitter Cards)
- Canonical URLs
- Header/Footer components
- Global CSS/JS imports

All pages use this layout via `<Layout>` wrapper.

## Adding New Content

### Team Member

Create `.md` file in `/src/content/team/`:

```markdown
---
title: "John Doe"
order: 5
slug: "john-doe"
role: "Research Assistant"
education:
  - "MSc Computer Science, University X"
  - "BSc Computer Science, University Y"
expertise: ["Machine Learning", "Data Science"]
hobbies: ["Reading", "Gaming"]
favoriteGames: ["Portal 2"]
projectSlugs: ["project-slug"]
featuredImage: "/assets/images/team/john-doe.jpg"
description: "Brief bio"
social:
  linkedin: "https://linkedin.com/in/johndoe"
  twitter: "https://twitter.com/johndoe"
---

Full biography in markdown...
```

### Project

Create `.md` file in `/src/content/projects/`:

```markdown
---
title: "Full Project Title"
shortname: "Display Name"
draft: false
slug: "project-slug"
date: "2024-01-01"
memberSlugs: ["member-slug-1", "member-slug-2"]
description: "Brief description"
featuredImage: "/assets/images/projects/thumb.jpg"
featuredWideImage: "/assets/images/projects/banner.jpg"
isActive: true
---

Project details in markdown...
```

### Publication

Create `.md` file in `/src/content/publications/`:

```markdown
---
title: "Paper Title"
type: "Journal Article"
slug: "paper-slug"
date: "2024-01-01"
authors: "Author 1, Author 2"
authorsSlug: ["author-1-slug", "author-2-slug"]
category: "Research Category"
journal: "Journal Name"
url: "https://doi.org/..."
abstrakt: "Brief abstract"
---

Optional extended content...
```

### News Article

Create `.md` file in `/src/content/news/`:

```markdown
---
title: "News Title"
slug: "news-slug"
date: 2024-01-01
description: "Brief summary"
featuredImage: "/assets/images/news/image.jpg"
authors: ["author-slug"]
tags: ["tag1", "tag2"]
---

Article content in markdown...
```

## Project Structure

```
src/
├── content/              # Content collections (markdown)
│   ├── config.ts        # Zod schemas - REVIEW WHEN ADDING CONTENT
│   ├── team/            # Member profiles
│   ├── projects/        # Research projects
│   ├── publications/    # Academic papers
│   └── news/            # News articles
│
├── pages/               # File-based routing
│   ├── index.astro      # Homepage
│   ├── team/
│   │   ├── index.astro  # Team listing
│   │   └── [slug].astro # Dynamic member pages
│   ├── project/         # Same pattern for projects
│   ├── publication/     # Same pattern for publications
│   └── news/            # Same pattern for news
│
├── components/          # Vue components (14 files)
├── layouts/             # Base layout with SEO
├── assets/              # Processed assets (images, CSS, JS)
└── config.ts            # Site config (SEO, social, contact)

public/
└── assets/              # Static files (served as-is)
    ├── images/          # Static images
    ├── js/              # Static JavaScript
    └── pdfs/            # PDF documents
```

## Dynamic Routes Pattern

All dynamic pages use `getStaticPaths()` to generate routes from content collections:

```typescript
// Example: src/pages/team/[slug].astro
export async function getStaticPaths() {
  const members = await getCollection('team');
  return members.map(member => ({
    params: { slug: member.data.slug },
    props: { member }
  }));
}
```

This pattern is used in:
- [src/pages/team/\[slug\].astro](src/pages/team/[slug].astro)
- [src/pages/project/\[slug\].astro](src/pages/project/[slug].astro)
- [src/pages/news/\[slug\].astro](src/pages/news/[slug].astro)

## Styling

**Tailwind CSS**: Primary styling framework with custom configuration in [tailwind.config.mjs](tailwind.config.mjs)
- Custom colors: `primary`, `secondary`
- Typography plugin enabled
- Dark mode: class-based

**Legacy CSS**: Bootstrap and custom CSS in `/src/assets/css/` for compatibility with older template components.

**Approach**: Prefer Tailwind utilities in new components. Legacy CSS exists for backward compatibility.

## Image Handling

- **Static images**: Place in `/public/assets/images/` for direct serving
- **Processed images**: Place in `/src/assets/images/` for build-time optimization
- **Content images**: Reference with paths like `/assets/images/team/photo.jpg`

Astro automatically optimizes images when using the `<Image>` component.

## Site Configuration

Edit [src/config.ts](src/config.ts) for:
- Meta information (title, description, Open Graph images)
- Social media links
- Contact information
- Analytics settings

## Build Output

`npm run build` generates static site to `/dist/`:
- All pages pre-rendered as HTML
- Assets optimized and fingerprinted
- Ready for static hosting

## Deployment

**Netlify Configuration**: [netlify.toml](netlify.toml)
- Build command: `npm run build`
- Publish directory: `dist`
- Auto-deploys on push to `main` branch

## Technology Decisions

**Why Astro**: Zero-JS by default, perfect for content-heavy static sites with optional interactivity
**Why Vue**: Provides reactive components for interactive UI elements (accordions, cards, navigation)
**Why Content Collections**: Type-safe content with schemas prevents errors at build time
**Why Tailwind**: Utility-first CSS reduces custom CSS and improves maintainability

## Working with Content Collections

**Querying Content**:
```typescript
import { getCollection } from 'astro:content';

// Get all team members
const team = await getCollection('team');

// Filter active projects
const activeProjects = await getCollection('projects',
  ({ data }) => data.isActive
);

// Sort by date
const sortedNews = await getCollection('news');
sortedNews.sort((a, b) => b.data.date - a.data.date);
```

**Type Safety**: Content collections provide full TypeScript types. Use `member.data.title`, `project.data.memberSlugs`, etc.

## Common Issues

**Build fails with schema validation error**: Check that content frontmatter matches [src/content/config.ts](src/content/config.ts) exactly. All required fields must be present.

**Images not loading**: Verify image paths start with `/` and file exists in `/public/assets/images/` or `/src/assets/images/`.

**Vue component not hydrating**: Add `client:visible` (or `client:load`) directive to `<Component>` tag in `.astro` file.

**Changes not showing**: Hard refresh browser (Cmd+Shift+R) or restart dev server.
