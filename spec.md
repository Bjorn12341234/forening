# NATURHANSYN.SE — TECHNICAL SPECIFICATION

## Server & Hosting

- **Hosting:** Hostup (cPanel Jupiter)
- **cPanel URL:** https://xi.hostup.se:2083
- **User:** sxesv
- **Home:** /home/sxesv
- **Webroot:** /home/sxesv/public_html
- **Server IP:** 185.113.11.31
- **Stack:** Apache + PHP 8.1 + MySQL
- **SSH:** `ssh sxesv@185.113.11.31`
- **Server backup exists:** `backup_before_changes_2026-02-20.tar.gz` in home dir

## Current Platform: Sitejet (NOT WordPress)

The live site is built with **Sitejet**, a website builder integrated into Hostup's cPanel.
There is NO WordPress installation. The ChatGPT spec was wrong about this.

Sitejet works by:
1. Admins edit pages via the Sitejet visual builder (accessed through cPanel)
2. Sitejet exports/deploys static HTML to `public_html/`
3. A PHP proxy (`api.php`) handles form submissions via Sitejet's API (`api.sitehub.io`)

### Current Site Structure on Server

```
public_html/
├── index.html                 # Homepage
├── om-foereningen/index.html  # About the association
├── nyheter/index.html         # News
├── medlemskap/index.html      # Membership
├── event/index.html           # Events
├── kontakta-oss/index.html    # Contact
├── api.php                    # Sitejet form proxy + CDN image rewriter
├── sitemap.xml                # XML sitemap
├── .htaccess                  # Apache config (PHP 8.1)
├── css/
│   └── custom.250908185212.css   # Site-specific styles (239KB)
├── js/
│   └── custom.240419144240.js    # Menu + preset JS (8KB)
├── g/
│   ├── fonts.css                 # Google Fonts config
│   └── static/                   # Font files (woff2)
├── images/                       # Responsive images (43 subdirs, multiple sizes)
├── bundles/
│   └── flag-icon-css/            # Country flag icons
└── webcard/                      # Sitejet rendering engine
    ├── static/
    │   ├── app.min.1757408874.css    # Sitejet framework CSS
    │   ├── app.bundle.1757408891.js  # Sitejet framework JS
    │   └── [code-split chunks].js
    └── vendor/
        └── slick/                    # Carousel library
```

### Current Design Details

- **Primary color:** #344642 (dark teal/green)
- **Background:** Light mint/off-white on content pages, dark green on hero/header/footer
- **Fonts:** Urbanist (body, 300-700 weights) + Kaushan Script (accent/decorative)
- **Responsive breakpoints:** 975px, 575px
- **Layout:** Flexbox-based, Sitejet preset components
- **Navigation:** Hamburger menu only (no visible desktop nav bar)
- **Footer:** Facebook link + email (naturhansyn@gmail.com)

### Sitejet Internal IDs

- Website/webcard ID: `626980`
- API host: `api.sitehub.io`
- CDN: `inter-cdn.com` (multiple hosts)

## Content Inventory

### Homepage (/)
- Hero: Forest landscape photo (by Myrra Romberg), tagline "Naturhänsyn - för allas vår skull!"
- Mission statement text
- "Vad gör vi?" section — 4 pillars with icons:
  - Bevakar (monitors forestry reports)
  - Bestrider (contests logging in protected areas)
  - Folkbildar (educates members and public)
  - Påverkar (advocates to landowners, companies, authorities)
- Footer: Facebook + email + copyright

### About (/om-foereningen/)
- Photo of logged trees (by Emma Sewell)
- Description of the association's mission
- Note about being a new association
- **Board members (Styrelsen 2024):** 6 people with photos and roles
  - Emma Sewell (Ordförande), Myrra Romberg (Sekreterare),
    Miguel Silveira Freitas (Kassör), Anton Lunberg (Ledamot),
    Meandra Sewell (Ledamot), Sarah Svensson (Suppleant)

### News (/nyheter/)
- "Vad händer just nu?" heading
- Gotland meetup announcement (Oct 3-9)
- Swish QR code for payments

### Membership (/medlemskap/)
- "Bli medlem!" heading with heart stone photo
- Membership fee: 100kr/year, 50kr/year for family members
- Payment via Swish to 123-2485159
- GDPR notice about data handling
- Donation option

### Events (/event/)
- Annual meeting (Årsmöte) 2025 — March 26, 19:00, digital
- Event poster image

### Contact (/kontakta-oss/)
- "Vi blir jätteglada om du vill höra av dig!" heading
- Email keyboard photo
- Contact info

## Local Development Setup

- **Local project:** `/home/bjorn/projects/forening/`
- **Live site snapshot:** `live-site/` (downloaded 2026-02-20, 605 files, 23MB)
- **Git:** Initialized with baseline commit `ca3fa10`
- **Sensitive files:** `password.md` excluded via `.gitignore`

## Architecture Decision: What Replaces Sitejet

### The Problem

Other admins (board members) currently edit the site through Sitejet's visual builder
in cPanel. If we replace Sitejet with a custom-built site, they need a way to update
content (news, events, board members) without touching code.

### The Solution: Grav CMS + Custom Theme with Three.js

Use **Grav CMS** (https://getgrav.org) — a free, open-source, flat-file PHP CMS.
We build a fully custom Grav theme with Three.js. Board members use Grav's admin panel.

Why Grav:
- Free, open source, PHP-based — runs on existing server (no new software)
- Flat-file: content stored as markdown files (no database, git-friendly)
- Proven admin panel plugin (secure, multi-user, tested by community)
- Full theme freedom — we control all HTML/CSS/JS including Three.js
- Handles image uploads, user management, content versioning
- Active community, regular security updates
- We don't build/maintain admin infrastructure — just the theme

What board members get:
- Login at `naturhansyn.se/admin/`
- Simple form-based editor: write text, upload images, hit save
- Add/edit news, events, board members
- No complex drag-and-drop they don't need

What we control:
- The entire visual design (custom Grav theme)
- Three.js integration
- Layout, typography, responsiveness
- SEO, performance, everything

### New Site Structure (Target)

```
public_html/                          # Grav CMS root
├── index.php                         # Grav entry point
├── .htaccess                         # Apache rewrite rules
├── system/                           # Grav core (don't touch)
├── vendor/                           # PHP dependencies
├── bin/                              # Grav CLI tools
├── user/
│   ├── config/                       # Site configuration
│   │   └── site.yaml                 # Site name, metadata, etc.
│   ├── pages/                        # Content (markdown files)
│   │   ├── 01.home/
│   │   │   └── default.md            # Homepage content
│   │   ├── 02.om-foereningen/
│   │   │   └── default.md            # About page content
│   │   ├── 03.nyheter/
│   │   │   ├── blog.md               # News listing page
│   │   │   └── gotland-traff/
│   │   │       └── item.md           # Individual news item
│   │   ├── 04.medlemskap/
│   │   │   └── default.md            # Membership page
│   │   ├── 05.event/
│   │   │   ├── blog.md               # Events listing page
│   │   │   └── arsmote-2025/
│   │   │       └── item.md           # Individual event
│   │   └── 06.kontakta-oss/
│   │       └── default.md            # Contact page
│   ├── themes/
│   │   └── naturhansyn/              # OUR CUSTOM THEME
│   │       ├── naturhansyn.yaml      # Theme config
│   │       ├── templates/            # Twig templates
│   │       │   ├── default.html.twig
│   │       │   ├── blog.html.twig
│   │       │   ├── item.html.twig
│   │       │   └── partials/
│   │       │       ├── header.html.twig
│   │       │       └── footer.html.twig
│   │       ├── css/
│   │       │   └── main.css          # Modern custom stylesheet
│   │       ├── js/
│   │       │   ├── three.min.js      # Three.js (deferred)
│   │       │   ├── scene.js          # Three.js hero scene
│   │       │   └── main.js           # Site interactions
│   │       ├── images/               # Theme images
│   │       └── fonts/                # Self-hosted fonts
│   ├── plugins/
│   │   ├── admin/                    # Admin panel plugin
│   │   ├── email/                    # Email plugin (for contact form)
│   │   └── form/                     # Form handling plugin
│   └── data/                         # User uploads, logs
├── images/                           # Uploaded content images
├── backup/                           # Grav backups
└── cache/                            # Grav cache (auto-generated)
```

## Deploy Workflow

1. Develop locally in `/home/bjorn/projects/forening/site/`
2. Test locally with PHP built-in server: `php -S localhost:8000`
3. Commit to git
4. Deploy to server: `rsync -avz --exclude='.git' --exclude='cache/*' site/ sxesv@185.113.11.31:public_html/`
5. Rollback if needed: see Revert Strategy below

## Revert Strategy (CRITICAL)

At any point we can restore the site to its current Sitejet state:

### Method 1 — From local git (fastest)
```bash
# The live-site/ directory contains the exact Sitejet snapshot
rsync -avz --delete live-site/ sxesv@185.113.11.31:public_html/
```

### Method 2 — From server backup
```bash
# Server has a full backup at /home/sxesv/backup_before_changes_2026-02-20.tar.gz
ssh sxesv@185.113.11.31
cd ~
rm -rf public_html/*
tar -xzf backup_before_changes_2026-02-20.tar.gz
```

### Method 3 — Sitejet republish
If Sitejet CMS is still connected, admins can republish from cms.sitehub.io/626980
which regenerates the original site.

### Rules
- NEVER delete `live-site/` from the local repo
- NEVER delete the server backup tar.gz
- NEVER deploy to production until fully tested
- The baseline git commit `ca3fa10` always has the original Sitejet site

## Performance Targets

- Lighthouse mobile score >= 90
- Three.js must not block initial render (deferred, progressive enhancement)
- WebGL fallback: static hero image if WebGL unavailable
- No heavy animation loops
- All JS deferred
- Images optimized and lazy-loaded
- Self-hosted fonts (no Google Fonts CDN calls)

## What NOT To Do

- Do NOT use WordPress
- Do NOT use Sitejet going forward
- Do NOT use heavy frameworks (React, Vue, etc.) — this is a 6-page site
- Do NOT install visual page builders
- Do NOT deploy without backup + git commit
- Do NOT develop directly on the live server
