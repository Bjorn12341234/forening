# NATURHANSYN.SE — MODERNIZATION PLAN

## Project Overview

Modernize naturhansyn.se from a Sitejet-built site to a custom modern site with
Three.js effects. Keep all existing content. Make it look professional and modern.
Provide a simple admin panel so board members can update content.

Website content: Swedish.
Development docs: English.

## Architecture

- **CMS:** Grav (flat-file PHP CMS, no database)
- **Frontend:** Custom Grav theme with Three.js (progressive enhancement)
- **Content:** Markdown files managed via Grav admin panel
- **Admin:** Grav's admin plugin — board members log in at /admin/ to edit content
- **Forms:** Grav form + email plugins (replaces Sitejet proxy)
- **Hosting:** Same server (Hostup cPanel, Apache, PHP 8.1)
- **Deploy:** Local dev -> git commit -> rsync to server
- **Revert:** live-site/ in git always has the original Sitejet snapshot

## Sprint Roadmap

### Sprint 0 — Discovery & Baseline (COMPLETED)

- [x] Audit live site structure and technology
- [x] Discover site is Sitejet, NOT WordPress
- [x] Download full site locally (live-site/)
- [x] Initialize git with baseline commit
- [x] Document actual architecture in spec.md
- [x] Create project documentation

### Sprint 1 — Grav Setup & Design System

**Objective:** Install Grav, create custom theme skeleton with design system,
navigation, and layout. Migrate all existing content into Grav pages.
No Three.js yet — just clean, modern HTML/CSS via Grav templates.

**Tasks:**
1. Install Grav CMS locally in `site/` directory
2. Install admin, form, and email plugins
3. Create custom `naturhansyn` theme
4. Design system: CSS custom properties (colors, typography, spacing)
   - Keep nature green palette but modernize it
   - Use Urbanist font (already in use, good choice)
   - Define spacing scale, border-radius, shadows
5. Build Twig template partials:
   - Header with proper desktop nav + mobile hamburger
   - Footer with social links + email + copyright
   - Base page layout template
6. Build page templates and migrate content from live-site/:
   - Homepage (default.html.twig): hero, mission, 4 pillars
   - About (default.html.twig): board members grid
   - News (blog.html.twig + item.html.twig): article cards
   - Membership (default.html.twig): CTA + payment info
   - Events (blog.html.twig + item.html.twig): event cards
   - Contact (form.html.twig): contact form
7. Migrate all images from live-site/images/
8. Responsive design (mobile-first)
9. Proper heading hierarchy (h1 per page, semantic HTML)
10. Meta tags, Open Graph, canonical URLs via Grav config
11. Test locally with `php -S localhost:8000`

**Files:** `site/` directory (Grav installation + custom theme)
**Acceptance:** All 6 pages render via Grav, admin panel works, responsive, semantic HTML
**Risks:** Design direction — need agreement on visual style before going deep

### Sprint 2 — Visual Polish & CTA Optimization

**Objective:** Make it look great. Strong visual hierarchy, modern feel, clear CTAs.

**Tasks:**
1. Hero section design — large, impactful (prepares space for Three.js later)
2. Typography refinement — proper scale, line heights, text contrast
3. Whitespace and spacing — generous, modern feel
4. CTA buttons — "Bli medlem" prominent on homepage and nav
5. Card components for news and events
6. Board member grid with proper photos and roles
7. Image optimization — compress, proper srcset, lazy loading
8. Subtle CSS animations (fade-in on scroll, hover states)
9. Form styling for contact page
10. Swish payment section — clear, trustworthy design

**Files:** `site/assets/css/main.css`, all page HTML files
**Acceptance:** Visually modern, clear CTAs, Lighthouse accessibility > 90
**Risks:** Subjective design choices — get friend's feedback after this sprint

### Sprint 3 — Three.js Progressive Enhancement

**Objective:** Add Three.js hero effect. Must degrade gracefully.

**Tasks:**
1. Self-host Three.js (minified, deferred loading)
2. Design hero scene concept (nature/forest themed, subtle, not distracting)
3. Implement WebGL detection
4. Build Three.js scene with:
   - Gentle particle system or organic shapes
   - Nature-inspired colors matching site palette
   - Responsive (adapts to viewport)
   - Low performance impact (no heavy loops)
5. Static fallback hero image when WebGL unavailable
6. Performance testing — ensure no render blocking
7. Reduce motion support (prefers-reduced-motion)

**Files:** `site/assets/js/three.min.js`, `site/assets/js/scene.js`, hero section HTML/CSS
**Acceptance:** Three.js runs smoothly, graceful fallback, Lighthouse >= 90 on mobile
**Risks:** Performance on low-end devices — keep effects subtle

### Sprint 4 — Admin Panel Configuration & User Setup

**Objective:** Configure Grav admin panel for board members. Set up user accounts,
customize the editing experience, and test the content workflow.

**Tasks:**
1. Configure Grav admin panel:
   - Set Swedish language for admin UI
   - Customize dashboard for simplicity
   - Set up content blueprints (define what fields admins see per page type)
2. Create admin user accounts for board members
3. Define page blueprints:
   - News item blueprint (title, date, body text, featured image)
   - Event blueprint (title, date, location, description, image)
   - Board member blueprint (name, role, photo)
4. Configure image upload settings (max size, allowed types, auto-resize)
5. Set up Grav email plugin for contact form delivery
6. Test full admin workflow:
   - Admin logs in
   - Creates a news item with image
   - Edits an event
   - Changes appear on the site
7. Write a simple guide for board members (Swedish)

**Files:** `site/user/config/`, `site/user/blueprints/`, `site/user/accounts/`
**Acceptance:** Board member can log in, add news/events, changes appear on site
**Risks:** Grav admin learning curve — keep blueprints simple, write clear guide

### Sprint 5 — Forms, SEO & Contact

**Objective:** Working contact form via Grav plugins, SEO optimization.

**Tasks:**
1. Configure Grav form plugin for contact page:
   - Form definition in contact page frontmatter
   - Email delivery via Grav email plugin
   - Honeypot anti-spam field
   - Success/error messages in Swedish
2. SEO improvements:
   - Schema.org markup (Organization, Event, ContactPage)
   - Proper meta descriptions per page
   - Structured data for board members (Person schema)
   - Internal linking between pages
   - XML sitemap generation
   - robots.txt
3. Open Graph tags for social sharing
4. Canonical URLs
5. 404 page

**Files:** `site/api.php`, all HTML pages (meta/schema), `site/sitemap.xml`
**Acceptance:** Form sends email, Google Rich Results Test passes, proper meta on all pages
**Risks:** Email deliverability from shared hosting — test thoroughly

### Sprint 6 — Performance, QA & Deploy

**Objective:** Final polish, performance tuning, deploy to production.

**Tasks:**
1. Lighthouse audit — target >= 90 on all metrics (mobile)
2. Core Web Vitals check (LCP, FID, CLS)
3. CSS/JS minification
4. Image final optimization pass
5. Cross-browser testing (Chrome, Firefox, Safari, mobile)
6. Test admin panel with a board member
7. Test form submission
8. Test Three.js on multiple devices
9. Create deploy script (`deploy.sh`)
10. Deploy to staging first (optional: staging subdomain)
11. Deploy to production (replace Sitejet content)
12. Verify everything works live
13. Update DNS/redirects if needed

**Files:** All files, `deploy.sh`
**Acceptance:** Live site passes Lighthouse >= 90, all features work, admin works
**Risks:** Sitejet remnants causing conflicts — clean deploy, verify .htaccess

## How to Start a New Sprint Session

Each sprint session should:

1. Read these files first: `plan.md`, `spec.md`, `tasks.md`, `memory.md`
2. Check `git log` for latest state
3. Review the sprint's tasks in `tasks.md`
4. Execute the sprint
5. Commit changes with descriptive message
6. Update `tasks.md` (mark done, add new items if discovered)
7. Update `memory.md` (decisions, issues, context for next sprint)
8. End with clear status message

## Current Status

**Sprint 0: COMPLETED**
**Sprint 1: COMPLETED**
**Sprint 2: COMPLETED**
**Sprint 3: COMPLETED**
**Sprint 4: COMPLETED**
**Next: Sprint 5 — Forms, SEO & Contact**
