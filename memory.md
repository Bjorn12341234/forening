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

### Next Sprint Context
**Sprint 1** starts with:
1. Read `plan.md`, `spec.md`, `tasks.md`, `memory.md`
2. Install Grav CMS in `site/` directory
3. Install admin, form, email plugins
4. Create `naturhansyn` custom theme
5. Build all templates, migrate content from `live-site/`
6. Reference `live-site/*.html` files for current content (copy text, images)
7. Focus: clean Twig templates, modern CSS, responsive, semantic structure
8. No Three.js yet — just solid foundations
