# Almeng-E — Rebranding Implementation Handoff for Codex

> Status: **Reference-driven interim implementation**. This document is a working brief, **not** a finalized design system or authorization to redesign the entire product.

## 1. Project context

- Project: **Almeng-E** (알맹이)
- Current portfolio/deployed URL: https://gsh-lab.vercel.app/
- Product concept: A quiz-based experience that helps users rediscover details of Korea's places, culture, language, and everyday life.
- Potential audience: English-speaking women in their 20s–30s. Treat this as a target hypothesis, **not** proof of particular visual preferences.
- Intended emotional responses:
  - People who have visited Korea: “Oh right, I remember that.”
  - People who have not: “Wait, Korea has that?”
- Brand positioning: Discovery of overlooked, everyday Korean details, rather than a collection of generic Korean landmarks or clichés.

## 2. Current operating constraints

- The user is currently working from a PC café and cannot conveniently authenticate to Figma MCP.
- **Do not block implementation on Figma MCP access.**
- The user will supply screenshots/references for the hero section, high-priority visual moments, and individual UI patterns as needed.
- Implement only the approved, specifically requested parts using those references.
- The user plans to reconnect Figma MCP on their own laptop later to formalize the design system, normalize components, and resolve consistency systematically.

## 3. Confirmed direction vs. unresolved decisions

### Confirmed

1. Use a **white-based** overall canvas for the currently explored hero direction.
2. Use bold, heavy, geometric display typography for the headline; retain the prominent stacked treatment of **“HOW WELL DO YOU KNOW KOREA?”**.
3. Use **pastel blue** as the primary brand accent, especially for **“KOREA?”**. Exact hex value is **not finalized**; extract from the user-approved reference or ask before locking a token.
4. Favor **vertical/stacked composition** with floating/overlapping text and characters. The user explicitly dislikes a conventional left-text/right-illustration split hero.
5. Avoid generic Korea signifiers such as N Seoul Tower and formulaic traditional eaves when they are merely decorative clichés.
6. Existing mascot concepts: **Gari** (grey heron / 왜가리) and **Roro** (little egret / 쇠백로). The user has previously developed and approved a specific simple, round-bodied, large-eyed, slightly vacant-expression flat-character direction.
7. If using mascots, **reuse the user's approved character references**, not newly invented animals or unrelated illustration styles. Do not substitute a lion or mouse.
8. Do not introduce the Town Mouse and Country Mouse narrative into the brand. The user rejected it as a non-Korean source concept.
9. Preserve the existing app's behavior, navigation, quiz flows, and content unless separately requested.

### Not finalized

- Whether mascots will ultimately be the primary brand expression or a secondary asset.
- The final hero composition and detailed art direction.
- Exact font family, font licensing, spacing scale, color hex codes, iconography, motion language, and component variants.
- Complete design tokens, responsive specifications, and accessibility decisions.

**Important:** Prior exploratory images (ink brush, cyberpunk, photo-realistic bird, etc.) are ideation, **not automatically approved design-system rules**. The most recent user-approved reference for a given task takes precedence.

## 4. Screenshot-first workflow (now)

For each requested change:

1. **Inspect the repository** to identify the framework, routes, components, existing styles, and relevant state/behavior. Do not assume the stack.
2. **Inspect the actual screenshot** supplied for that task. If the reference is not available in the Codex workspace, request its path or attachment rather than reconstructing it from memory.
3. Identify the target page/section and distinguish:
   - Must match: composition, hierarchy, character identity, visual emphasis.
   - Adaptable: responsive spacing, accessible sizing, implementation details.
   - Unknown: missing assets, exact fonts, exact tokens, interactions not visible in the screenshot.
4. Implement **the smallest scoped change** that achieves the reference. Do not refactor unrelated screens or create a full design system prematurely.
5. Keep provisional visual values centralized in a small set of CSS variables/tokens, clearly labeled as **provisional**; avoid scattering magic numbers.
6. Check desktop and mobile layouts, text wrapping, contrast, CTA visibility, keyboard navigation, and interaction states.
7. Report what changed, which reference was used, what remains uncertain, and any departures from the reference.

### Asset handling

- Prefer existing project assets and user-supplied approved screenshots/illustrations.
- Do not treat an entire screenshot as a production UI component if real text, buttons, and responsive behavior are required; rebuild the UI and use discrete artwork assets where available.
- Do not recreate a mascot from an unrelated stock illustration or generic prompt without user approval.
- Do not embed third-party watermarked imagery or assume usage rights.

## 5. Hero-specific guidance

- Preserve the recognizable copy **HOW WELL DO YOU KNOW KOREA?**, with **KOREA?** visually accented in pastel blue unless the user requests a change.
- The user favors a **stacked central composition**, not a two-column split.
- If Gari and Roro are used, position them **above/below, peeking around, or interacting with the headline** rather than assigning one mascot to each side.
- Keep the visual focus on the headline and make the primary quiz CTA visible and clear, including at practical mobile viewport sizes.
- Brand copy can evoke remembering Korea or discovering it for the first time; do not silently replace approved copy.
- Avoid inserting N Seoul Tower, generic hanok rooftops, cherry blossoms, or other recognizable Korean motifs without a specific storytelling purpose and approval.
- A screenshot is a visual reference, not proof that every decorative element in it is approved.

## 6. UI reference workflow

- The user will provide references for specific UI components/screens when needed.
- Recreate the **underlying interaction and hierarchy**, not just surface decoration.
- Maintain consistency with already implemented provisional tokens where sensible, but **do not override a new explicit reference** in the name of consistency.
- For conflicts between references, flag the conflict and request a decision rather than inventing a unified style.
- Never propagate a one-off experimental visual treatment to all screens without explicit authorization.

## 7. Later phase — Figma MCP on the user's laptop

Once the user reconnects Figma MCP:

1. Audit the interim implementation and all approved references.
2. Establish source-of-truth foundations: brand colors, typography, spacing, radius, elevation, iconography, illustration and mascot rules.
3. Define component variants and states (default, hover, focus, disabled, error, success, loading, etc.).
4. Normalize desktop/mobile responsive rules and accessibility standards.
5. Map implemented UI to Figma components/variables and reconcile deviations.
6. Only then treat the result as a formal design system.

Do **not** claim that Figma MCP has been connected, that Figma assets were imported, or that the design system is complete before those steps actually occur.

## 8. Codex execution guardrails

- Before coding, briefly state: target files/components, supplied reference, intended scope, and unknowns.
- Ask for clarification only if a missing detail materially blocks the implementation; otherwise make a reversible, clearly labeled provisional choice.
- Avoid speculative rebranding, unrelated redesign, invented mascots, and sweeping global CSS changes.
- Do not change product functionality to make a visual mockup easier to reproduce.
- After coding, run available checks and provide a concise change log plus unresolved items.

## 9. Immediate next action

**Wait for the user's next screenshot and target screen/section.** Then inspect the repository, implement that scoped change, and keep the rest intact. No Figma login is required for this interim workflow.
