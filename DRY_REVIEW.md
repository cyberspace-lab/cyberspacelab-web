# Astro/Vue DRY Review

Review date: 2026-05-15

Scope: Astro pages and Vue components in `src/pages`, `src/layouts`, and `src/components`.

No code was changed during this review.

## Findings

### High: Draft detail pages can still be generated

The list pages filter drafts, but dynamic detail routes do not.

- `src/pages/news/index.astro` filters `!data.draft`
- `src/pages/news/[slug].astro` loads all news in `getStaticPaths`
- `src/pages/project/index.astro` filters `!data.draft`
- `src/pages/project/[slug].astro` loads all projects in `getStaticPaths`

This means draft content can still be reachable by direct URL even when hidden from listing pages.

### High: News detail expects `featuredWideImage`, but schema/content use `featuredImage`

`src/pages/news/[slug].astro` passes and checks `newsData.featuredWideImage`, but the news schema defines only `featuredImage`.

Result: news items with `featuredImage` never get the image hero on the detail page.

Relevant files:

- `src/pages/news/[slug].astro`
- `src/content/config.ts`
- `src/content/news/*.md`

### High: Optional news authors can crash the page

The news schema makes `authors` optional, but the news detail page calls:

```ts
newsData.authors.includes(member.data.slug)
```

If a news item has no authors, this will throw.

Relevant files:

- `src/pages/news/[slug].astro`
- `src/content/config.ts`

### Medium: Page hero markup is duplicated across pages

The same `csl-page-hero`, background image style, overlay, container, eyebrow, and inline H1 styling appear in many places:

- `src/pages/about.astro`
- `src/pages/team/index.astro`
- `src/pages/project/index.astro`
- `src/pages/publication/index.astro`
- `src/pages/contact.astro`
- `src/pages/project/[slug].astro`
- `src/pages/news/[slug].astro`

Suggested cleanup: extract a `PageHero.astro` component with props for eyebrow, title, background image, overlay style, and optional slot/meta content.

### Medium: Section heading markup repeats heavily

The `csl-section-head` structure repeats across pages and components:

```astro
<div class="csl-section-head">
  <div class="csl-eyebrow">...</div>
  <div class="csl-section-title">
    <h2>...</h2>
    <div class="csl-bar"></div>
  </div>
</div>
```

Relevant files:

- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/team/index.astro`
- `src/pages/project/index.astro`
- `src/components/TeamListHome.vue`

Suggested cleanup: extract a `SectionHeading` component.

### Medium: Member/avatar mini-card logic is duplicated

Initials, image fallback, name, and role rendering appear in several places:

- `src/components/MemberCard.vue`
- `src/pages/project/[slug].astro`
- `src/pages/news/[slug].astro`

Suggested cleanup: extract a reusable `MemberAvatar` or `MemberMiniCard` component/helper.

### Medium: Footer ignores its `data` prop and duplicates config

`src/components/Footer.vue` declares a `data` prop, and `Layout.astro` passes `siteConfig.meta`, but footer values are hardcoded.

Duplicated data includes:

- Twitter / X URL
- Instagram URL
- LinkedIn URL
- contact email
- address

Suggested cleanup: either use the passed `data` prop consistently or import/use `siteConfig` directly in one place.

### Low/Medium: Several Vue components look unused or legacy

These components are not imported by current pages in the active routing path:

- `src/components/TeamList.vue`
- `src/components/SidebarMemberCard.vue`
- `src/components/BulletPointBox.vue`
- `src/components/Publication.vue`

`SidebarMemberCard.vue` also uses React-style `className` on an image, which is not idiomatic Vue.

Before deletion, confirm whether any external scripts, future routes, or pending work still rely on these components.

### Low: Static cards are hydrated unnecessarily

Several Vue card components are static render-only components but are hydrated on the client:

- `MemberCard`
- `ProjectCard`
- `NewsCard`
- `TeamListHome`

Examples:

- `client:visible` on member/project cards
- `client:load` on news cards

Only these clearly need client-side interactivity right now:

- `Header.vue`
- `FaqAccordeon.vue`
- `PublicationsFilter.vue`

Suggested cleanup: either convert static cards to Astro components or render Vue cards without client hydration where possible.

## Suggested Cleanup Order

1. Fix draft filtering and news schema/page mismatches.
2. Add `PageHero.astro`.
3. Add `SectionHeading` component.
4. Extract member avatar/mini-card rendering.
5. Remove or quarantine unused legacy components after confirming they are truly unused.
6. Reduce unnecessary client hydration for static cards.

