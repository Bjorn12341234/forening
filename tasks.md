# TASKS — naturhansyn.se Modernization

## Sprint 0 — Discovery & Baseline
- [x] Audit live site (all 6 pages)
- [x] Identify actual platform (Sitejet, not WordPress)
- [x] Download full site to local (`live-site/`)
- [x] Initialize git repo with baseline commit
- [x] Update spec.md with real architecture
- [x] Update plan.md with realistic sprint roadmap
- [x] Create tasks.md
- [x] Create memory.md

## Sprint 1 — Grav Setup & Design System
- [x] Install Grav CMS locally in `site/`
- [x] Install plugins: admin, form, email
- [x] Create custom `naturhansyn` Grav theme
- [x] Design system: CSS custom properties (colors, fonts, spacing)
- [x] Build header template (desktop nav + mobile hamburger)
- [x] Build footer template
- [x] Build homepage template + migrate content
- [x] Build about page template + migrate content (board members grid)
- [x] Build news page templates (listing + item) + migrate content
- [x] Build membership page template + migrate content
- [x] Build events page templates (listing + item) + migrate content
- [x] Build contact page template + migrate content
- [x] Migrate images from live-site/images/
- [x] Responsive design pass (mobile-first)
- [x] Semantic HTML audit (headings, landmarks, alt text)
- [x] Meta tags and Open Graph via Grav config
- [x] Test locally with PHP built-in server

## Sprint 2 — Visual Polish & CTA Optimization
- [x] Hero section visual design (full viewport, entrance animation, scroll indicator)
- [x] Typography scale refinement (bigger scale, tighter headings, better contrast)
- [x] Whitespace and spacing pass (generous section padding, modern feel)
- [x] CTA buttons ("Bli medlem" prominent with glow, btn--cta class)
- [x] News/event card components (staggered fade-in, "Läs mer" links, green date labels)
- [x] Board member photo grid (green uppercase roles, hover shadow, larger spacing)
- [x] Image optimization (lazy loading with fade-in, IntersectionObserver)
- [x] CSS scroll animations (fade-in, fade-in-up, stagger-children, prefers-reduced-motion)
- [x] Form styling (modern inputs, focus ring with green glow, form-row grid)
- [x] Swish payment section design (highlighted number badge, pricing in cards, radial glow)

## Sprint 3 — Three.js Progressive Enhancement
- [x] Self-host Three.js (minified, deferred) — three.module.min.js v0.170
- [x] Design scene concept — aurora borealis in CTA banner (not hero)
- [x] WebGL detection + graceful fallback (canvas removed if no WebGL)
- [x] Implement Three.js aurora scene (5 ribbons + sparkle particles)
- [x] prefers-reduced-motion support (JS check + CSS display:none)
- [x] Performance: IntersectionObserver pauses when off-screen, low-power GPU
- [x] Hero subtitle color fix (white for readability)

## Sprint 4 — Admin Panel Configuration & User Setup
- [x] Configure Grav admin (Swedish UI via user lang, simplified dashboard widgets)
- [x] Create content blueprints (home, about, blog, item, membership, contact)
- [x] Create admin user accounts (emma=admin, myrra=editor, miguel=editor)
- [x] Configure image upload settings (5MB limit, image/* + PDF)
- [x] Configure email plugin (from/to naturhansyn@gmail.com, sendmail)
- [x] Test full admin workflow end-to-end (login, pages, blueprints, frontend)
- [x] Write board member guide in Swedish (admin-guide.md)

## Sprint 5 — Forms, SEO & Contact
- [x] Configure Grav form plugin for contact page (form in frontmatter, honeypot, Swedish labels)
- [x] Schema.org markup (NGO site-wide, AboutPage+Person, ContactPage, Event)
- [x] Meta descriptions per page (explicit metadata.description in all page frontmatter)
- [x] Internal cross-links (membership↔contact, about→all, blog→membership, items→membership)
- [x] XML sitemap + robots.txt (Grav sitemap plugin, robots.txt with sitemap reference)
- [x] 404 page (error.html.twig with Swedish text, links to home + contact)
- [x] Canonical URLs and og:url on all pages
- [x] og:site_name added to Open Graph tags

## Sprint 6 — Performance, QA & Deploy

### Prep (done locally, no server changes)
- [x] Deploy script (`deploy.sh` with --dry and --revert)
- [x] Board member guide in Swedish (`guide.md`)
- [x] Admin accounts: unified password (same as server login)
- [x] All 6 pages verified locally (200 OK)
- [x] Admin panel verified locally (200 OK)
- [x] 404 page verified locally (404 status)
- [x] CSS/JS minification (main.min.css, main.min.js, scene.min.js)
- [x] Lighthouse mobile: Performance 100, Accessibility 96, Best Practices 100, SEO 100
- [x] Cross-browser audit (backdrop-filter prefixed, IntersectionObserver fallback, graceful degradation)
- [x] Three.js lazy-loaded via IntersectionObserver (defers 676KB until CTA visible)
- [x] Hero image preload + fetchpriority, fonts inlined, font preloaded
- [x] Image optimization: hero JFIF already optimal (93KB), lazy loading on all other images

### Pre-deploy checklist (before touching server)
- [x] SSH into server: `ssh sxesv@185.113.11.31` — confirm access works
- [ ] Verify server backup exists: `ls ~/backup_before_changes_2026-02-20.tar.gz`
- [ ] Dry-run deploy: `./deploy.sh --dry` — review output
- [ ] Disable Sitejet publishing in cPanel (so it doesn't overwrite us)
  - cPanel → Sitejet → disconnect/disable auto-publish
  - Do NOT delete the Sitejet project (keep as revert option)

### Deploy
- [ ] Deploy to production: `./deploy.sh`
- [ ] Post-deploy verification:
  - [ ] Homepage loads with aurora Three.js
  - [ ] All 6 pages accessible
  - [ ] Admin panel login works at /admin/
  - [ ] Contact form sends email
  - [ ] Mobile looks correct
  - [ ] HTTPS works (no mixed content)
- [ ] Test revert: confirm `./deploy.sh --revert` works (or just verify live-site/ is intact)

### Post-deploy
- [ ] Send guide.md to board members
- [ ] Walk Emma through admin panel (screen share)
- [ ] Board members change passwords on first login
