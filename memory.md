# MEMORY — naturhansyn.se Project

## Sprint 0 — Discovery (2026-02-20)

### What Was Done
- Audited all 6 pages of the live site via browser
- Discovered the site runs on Sitejet (NOT WordPress as ChatGPT assumed)
- Downloaded full public_html (605 files, 23MB) to `live-site/`
- Initialized git with baseline commit `ca3fa10`
- Updated all project docs to reflect reality
- Decided on Grav CMS as the platform (replaces both Sitejet and the custom admin panel idea)

### Key Decisions
1. **No WordPress.** User explicitly doesn't want it. Site was never on WP.
2. **No custom admin panel.** Reinventing the wheel for a small non-profit is bad practice.
3. **Use Grav CMS** — flat-file PHP CMS with proven admin panel.
   Board members log in at /admin/ to edit news, events, board members.
   We build a fully custom theme with Three.js on top of Grav.
4. **Same content, modern look** — no content changes, just visual modernization.
5. **All development local first** — deploy via rsync, never edit live directly.
6. **Sitejet site must be restorable at any point** — live-site/ in git is the snapshot.

### Revert Strategy (CRITICAL)
The user stressed that we must be able to revert to current Sitejet state at any time.
Three methods documented in spec.md:
1. rsync `live-site/` back to server (from local git)
2. Extract server backup `backup_before_changes_2026-02-20.tar.gz`
3. Republish from Sitejet CMS (cms.sitehub.io/626980)
Rules: NEVER delete live-site/, NEVER delete server backup, NEVER deploy untested.

### Technical Constraints
- Server: Apache + PHP 8.1 + MySQL on Hostup cPanel
- Grav requires PHP 7.3.6+ (server has 8.1, confirmed)
- Current site uses Sitejet's `api.php` for forms — Grav's form+email plugins replace this
- When deploying, must disable Sitejet in cPanel to prevent it overwriting our site

### Architecture Notes
- Sitejet element IDs: `#ed-XXXXXX`, preset classes: `preset-*-landscaper`
- Current fonts: Urbanist (body) + Kaushan Script (accent) — keep these
- Primary color: #344642 (dark teal/green) — keep palette, modernize
- Current site is entirely static HTML with a PHP form proxy
- Grav stores content as markdown in `user/pages/`, renders via Twig templates

### Admin/User Context
- Small Swedish nature conservation association (Föreningen NaturHänsyn)
- Björn is helping his friend (likely Emma Sewell, Ordförande) modernize the site
- Board members (6 people) need to be able to update content
- They currently use Sitejet's visual editor through cPanel
- With Grav they get a form-based editor at /admin/ — simpler, focused on content
- Content that actually changes: news (few/year), events (few/year), board (yearly)
- Membership payments via Swish (123-2485159)
- Contact email: naturhansyn@gmail.com

### Open Issues
- Need to decide on Three.js scene concept (forest/nature theme?)
- Need to confirm visual design direction with the friend
- Need to decide: do we keep current images as-is or re-optimize?
- Check if PHP built-in server is available locally for testing
- Sitejet may need to be explicitly disconnected in cPanel after deploy

## Sprint 1 — Grav Setup & Design System (2026-02-20)

### What Was Done
- Installed Grav CMS 1.7.49.5 in `site/` with admin, form, email, login plugins
- Created custom `naturhansyn` Grav theme with full design system
- Built 7 Twig templates: home, default, about, membership, contact, blog, item
- Migrated all content from live-site/ HTML into Grav markdown pages
- Copied all images (hero, board members, content) into theme
- Self-hosted Urbanist and Kaushan Script fonts (no CDN calls)
- Built responsive layout with desktop nav + mobile hamburger menu
- Swedish date formatting via custom Twig macro
- Created admin user for local testing (admin / Natur2026!Hansyn)
- All 6 pages render at localhost:8000

### Technical Notes
- Grav language config (`languages.supported`) adds `/sv/` prefix to URLs — DON'T use it for single-language sites
- `backdrop-filter` on parent creates containing block for `position: fixed` children — mobile-nav must be outside the header element
- Twig `truncate` filter outputs `&hellip;` entity — use `slice(0, N)` + literal `…` instead
- PHP dev server: `cd site && php -S localhost:8000 system/router.php`
- Cache clearing: `rm -rf cache/* tmp/*` (Grav CLI `cache --purge` only removes old items)

### Theme Structure
```
site/user/themes/naturhansyn/
├── blueprints.yaml + naturhansyn.yaml
├── templates/ (home, default, about, membership, contact, blog, item)
│   └── partials/ (base, header, footer, macros)
├── css/ (fonts.css, main.css)
├── js/ (main.js)
├── images/ (hero/, board/, content/)
└── fonts/ (urbanist/, kaushanscript/)
```

### Page Structure
```
site/user/pages/
├── 01.home/home.md
├── 02.om-foereningen/about.md
├── 03.nyheter/blog.md + 4 news items
├── 04.medlemskap/membership.md
├── 05.event/blog.md + 2 events
└── 06.kontakta-oss/contact.md
```

### Design System
- Primary: #344642, Accent: #6b9e3a, Background: #fafaf7
- Fonts: Urbanist (body), Kaushan Script (accent)
- Components: hero, pillars grid, board-grid, cards, CTA boxes, payment cards
- Responsive breakpoints: 768px (desktop nav), 480px (single column)

### Next Sprint Context
**Sprint 2** — Visual Polish & CTA Optimization:
1. Refine hero section, typography, whitespace
2. Improve card components, hover effects
3. Image optimization (srcset, compression, lazy loading)
4. CSS animations (fade-in on scroll)
5. Get friend's feedback on visual direction

## Sprint 2 — Visual Polish & CTA Optimization (2026-02-20)

### What Was Done
- Complete CSS overhaul: refined typography scale (bigger --text-6xl, tighter leading)
- Hero: full 100vh viewport, entrance animation, scroll indicator, better gradient overlay
- CTA: new .btn--cta class with green glow shadow, prominent sizing
- Cards: staggered fade-in animation, green uppercase date labels, "Läs mer" arrow links
- Board members: green uppercase roles, improved hover (shadow + scale), larger grid gap
- Scroll animations: IntersectionObserver-based .fade-in and .fade-in-up classes
- Stagger effect: .stagger-children applies progressive transition-delay to children
- Image lazy fade-in: images with loading="lazy" fade in on load via JS
- Header: .is-scrolled class via JS (darker bg + shadow on scroll)
- Swish section: .swish-number badge for the number, .payment-card__amount for pricing
- Form: modern inputs with green focus ring (box-shadow glow), .form-row grid layout
- Page headers: radial gradient glow effect via ::before pseudo-element
- prefers-reduced-motion: disables all animations and transitions
- Added utility classes: .mb-3xl, .mb-md, .sr-only, .section-label

### CSS Architecture Changes
- Added variables: --text-6xl, --leading-snug, --tracking-tight/wide, --color-accent-dark,
  --color-swish, --shadow-glow, --transition-spring, --radius-2xl, --space-6xl, --header-height
- Increased spacing: sections use --space-5xl (8rem) instead of --space-4xl (6rem)
- Typography: headings now font-weight: 700 (was 600), letter-spacing: --tracking-tight
- Buttons: larger padding (14px), btn--cta is 18px padding with green glow shadow
- Cards: rounded to --radius-xl (was --radius-lg), flexbox column layout for equal heights
- Board member roles: green accent color, uppercase, letter-spacing

### JS Changes
- Replaced inline header scroll with .is-scrolled class toggle
- Added IntersectionObserver for .fade-in / .fade-in-up elements
- Added img[loading="lazy"] load event listener for .is-loaded fade-in
- All observers use { passive: true } and unobserve after triggering

### Template Changes
- home.html.twig: .hero__actions wrapper div, .hero__scroll indicator, fade-in classes
- blog.html.twig: .card__link "Läs mer" with arrow, stagger-children on grid
- membership.html.twig: .swish-number badge, .payment-card__amount prices
- All templates: fade-in and stagger-children classes on sections/elements
- about.html.twig: stagger-children on board-grid

### Next Sprint Context
**Sprint 3** — Three.js Progressive Enhancement

## Sprint 3 — Three.js Progressive Enhancement (2026-02-20)

### What Was Done
- Self-hosted Three.js v0.170 (ES module, 676KB minified) in `js/three.min.js`
- Designed aurora borealis (norrsken) scene — flowing ribbons + sparkle particles
- **Key decision:** Three.js lives in the CTA banner section, NOT the hero
  - Hero stays clean with the forest photo (the image is strong on its own)
  - CTA "Vill du göra skillnad?" section gets the aurora as living background
  - Dark green bg + additive-blended aurora ribbons = great contrast + readability
- WebGL detection with graceful fallback (canvas removed if no WebGL)
- prefers-reduced-motion: JS aborts early + CSS hides canvas
- IntersectionObserver pauses animation when section is off-screen
- Fixed hero subtitle color to white (was accent green, poor readability)

### Technical Notes
- Three.js v0.170 is ES module only — loaded via `<script type="module">`
  - This IS the graceful degradation: browsers without module support = no Three.js = fine
- Aurora uses 5 ribbon meshes (PlaneGeometry) with custom ShaderMaterial
  - Vertex shader: multi-layer sine waves + simplex noise displacement
  - Fragment shader: vertical gradient, bright core line, color mixing, shimmer
  - Additive blending on dark background creates the glowing aurora effect
- Sparkle particles: 40 points with twinkle (pow(sin, 4)) and slow upward drift
- GLSL simplex noise function embedded in shader strings (no external dependency)
- Mouse tracking on the CTA section: ribbons shift + camera sways gently
- Canvas uses `pointer-events: none` so CTA button remains clickable
- `powerPreference: 'low-power'` on WebGL context

### Scene Architecture
```
scene.js (ES module)
├── Aurora ribbons (5x PlaneGeometry + ShaderMaterial)
│   ├── Vertex: sine waves + noise → organic flowing motion
│   └── Fragment: color gradients + core glow + shimmer
├── Sparkle particles (40x Points + ShaderMaterial)
│   ├── Twinkle via sin+pow in vertex shader
│   └── Soft glow circle in fragment shader
├── Mouse tracking (smooth interpolation)
├── IntersectionObserver (pause when off-screen)
└── Resize handler (responsive canvas)
```

### Files Changed
- `js/three.min.js` — Three.js v0.170 module (new)
- `js/scene.js` — Aurora scene (new)
- `css/main.css` — CTA banner canvas styles, reduced-motion rule, subtitle color fix
- `templates/home.html.twig` — Canvas element in CTA section, script module tag

### Next Sprint Context
**Sprint 4** — Admin Panel Configuration & User Setup:
1. Configure Grav admin panel (Swedish language, simple dashboard)
2. Create content blueprints (news item, event, board member)
3. Create admin accounts for board members
4. Configure image uploads and email plugin
5. Test full admin workflow
6. Write board member guide (Swedish)
