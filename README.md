# Agency Portfolio Landing Page

A modern, high-converting web development agency landing page built for Upwork portfolio showcases.

## Tech Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + `next/font` (`Plus Jakarta Sans`)
- **Animation:** Framer Motion + Lenis smooth scroll
- **Icons:** `lucide-react`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Editing Content

All copy, links, metrics, and case studies are centralized in two files:

- `data/content.ts` — Agency name, navbar links, hero copy, audience cards, stats, tech stack showcase, testimonials, Upwork badges, CTA/contact copy, and footer links.
- `data/projects.ts` — The 6 portfolio case studies (title, metric, tags, problem, solution, stack, outcome, and thumbnail path).

Project thumbnails and client avatars live in `public/images/projects/` and `public/images/avatars/`.

## Production Build & Verification

```bash
npm run lint
npm run build
npm run start
```

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Keep the default Next.js build settings (`npm run build`) and click **Deploy**.
4. Update `siteConfig.url` in `data/content.ts` to your production domain for accurate Open Graph and `sitemap.xml` URLs.
