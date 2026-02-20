You are Claude Code running inside my repository.

GOAL
Create a structured, sprint-based modernization and SEO optimization plan for the website https://naturhansyn.se

The website content must remain in Swedish.
All development instructions, planning, and documentation must be in English.

This is NOT an implementation request yet.
Your task in this session is ONLY to:

1. Analyze the live website structure and pages.
2. Produce a detailed execution plan.
3. Create structured sprint tasks.
4. Prepare the repo documentation for iterative execution.

CRITICAL WORKFLOW REQUIREMENTS

- You MUST read these files first if they exist:
  - Context.md
  - Plan.md
  - Specs.md
  - Tasks.md
  - Memory.md

- If they do not exist, create them.

- All work must be broken into clearly defined SPRINTS.
- Each sprint must be independently executable in a new session with fresh tokens.
- After each sprint, Tasks.md must be updated.
- After each sprint, Memory.md must be updated with:
  - What was done
  - Decisions made
  - Technical constraints discovered
  - Open issues
  - Next sprint context

- Each sprint must end with:
  - Updated Tasks.md
  - Updated Memory.md
  - Clear next-sprint entry point

NO hand-waving.
Every improvement must map to:
- Concrete files
- Concrete implementation approach
- Measurable outcome

PROJECT SCOPE

Website:
- https://naturhansyn.se/
- /om-foereningen/
- /nyheter/
- /medlemskap/
- /event/
- /kontakta-oss/

OBJECTIVES

1) Modernize visual structure
- Improve layout hierarchy
- Introduce modern design system
- Improve whitespace and typography
- Add subtle Three.js effects (only as progressive enhancement)
- Must degrade gracefully if WebGL disabled

2) Improve UX & conversion
- Strong CTA placement
- Clear navigation structure
- Better membership flow
- Event clarity
- Structured content blocks

3) Technical SEO (aligned with latest Google core update principles)
- E-E-A-T strengthening
- On-page optimization
- Schema markup strategy
- Internal linking structure
- Page speed optimization
- Mobile-first performance
- Core Web Vitals targets

4) Performance constraints
- WebGL must not block rendering
- JS must be deferred
- Lighthouse mobile score target ≥ 90
- No heavy animation loops

5) WordPress integration strategy
- Theme modification approach
- Gutenberg or custom block strategy
- Asset bundling strategy
- Caching compatibility
- Plugin recommendations (only if necessary)

OUTPUT STRUCTURE FOR THIS SESSION

You must produce:

1. High-level architecture plan
2. Detailed sprint roadmap (Sprint 0, Sprint 1, Sprint 2, etc.)
3. For each sprint:
   - Objective
   - Technical tasks
   - Files impacted
   - Acceptance criteria
   - Risks
4. Initial Tasks.md
5. Initial Memory.md
6. Updated Plan.md
7. Clear instruction on how next sprint session should start

SPRINT STRUCTURE RULES

Sprint 0:
- Discovery and audit
- Technical SEO audit
- Theme analysis
- Performance baseline
- Content gap analysis

Sprint 1:
- Structural improvements
- Navigation improvements
- Heading hierarchy fixes
- Metadata structure

Sprint 2:
- Design system implementation
- Typography and spacing
- CTA blocks
- Swedish content refinement

Sprint 3:
- Three.js progressive enhancement hero
- Performance testing
- WebGL fallback logic

Sprint 4:
- Schema implementation
- Advanced SEO improvements
- Internal linking optimization

Sprint 5:
- Performance optimization
- Lighthouse tuning
- Final QA

Each sprint must be atomic.

IMPORTANT

- Do NOT write final Swedish copy yet.
- Do NOT implement code.
- Do NOT over-design.
- Build a professional execution blueprint.

After generating the sprint roadmap and documentation,
update Tasks.md and Memory.md accordingly.

End this session with:
"SPRINT 0 READY FOR EXECUTION"
