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
- [ ] Self-host Three.js (minified, deferred)
- [ ] Design hero scene concept
- [ ] WebGL detection + fallback
- [ ] Implement Three.js scene
- [ ] prefers-reduced-motion support
- [ ] Performance testing

## Sprint 4 — Admin Panel Configuration & User Setup
- [ ] Configure Grav admin (Swedish language, simple dashboard)
- [ ] Create content blueprints (news item, event, board member)
- [ ] Create admin user accounts for board members
- [ ] Configure image upload settings
- [ ] Configure email plugin for contact form
- [ ] Test full admin workflow end-to-end
- [ ] Write board member guide (Swedish)

## Sprint 5 — Forms, SEO & Contact
- [ ] Configure Grav form plugin for contact page
- [ ] Schema.org markup (Organization, Event, ContactPage)
- [ ] Meta descriptions per page
- [ ] Internal linking
- [ ] XML sitemap + robots.txt
- [ ] 404 page

## Sprint 6 — Performance, QA & Deploy
- [ ] Lighthouse audit (target >= 90 mobile)
- [ ] Cross-browser testing
- [ ] CSS/JS minification
- [ ] Deploy script
- [ ] Deploy to production (replace Sitejet)
- [ ] Disable Sitejet in cPanel (prevent overwrite)
- [ ] Post-deploy verification
- [ ] Verify revert strategy works
