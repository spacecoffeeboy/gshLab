# UI review evidence

Local Chromium validation of the Saved removal and transcript-based typography/spacing revision. These are real browser captures, not generated mockups. They do not establish that the remote Vercel deployment has finished.

- `public-mobile.png`: production build `/discover`, 390px viewport. Zero published contents is intentional. Only By topic / Random navigation remains.
- `editorial-mobile.png`: development-only `/preview`, 390px viewport. The six draft fixtures are still NOT publicly published.
- `landing-web.png`: approved text-led landing in a 1440px viewport. CTA remains centered below the subtitle.
- `metrics.json`: 320/360/390/768/1024/1440px measurements; input/search-button height48px, body15px, metadata12px, chips44px in every run. No browser page errors.

Validation performed:

1. Eleven existing/updated unit and interaction tests passed. Saved removal is tested without working browser storage.
2. Production build and TypeScript checks passed; content validation reports zero published and six unpublished samples.
3. Automated browser flow passed at all six viewport widths: landing CTA, public filtering, topic search via Enter, topic+keyword intersection, explicit Reveal without grading, sources, keyboard result/return focus, Quiz feedback, no-repeat random and completion/restart.
4. Secondary text contrast >=4.5:1 and input-outline contrast >=3:1 checked from computed browser colors.
5. 320px long-title/doubled reading-font stress check passed; reduced-motion disables transitions. These checks are not a substitute for physical-phone or OS accessibility testing.
6. Local production HTTP: `/`, `/discover`, random query and favicon return200; `/preview` returns404. No sample title or Saved UI in the public hub.

Detailed rationale and separation of video quotations from implementation decisions: [DESIGN_PRINCIPLES.md](../DESIGN_PRINCIPLES.md).
