# 알맹이 · Almengi

An English-language, mobile-first Korea discovery web app built with Next.js App Router and TypeScript. No external APIs, database, accounts or secrets are required.

## Develop

Use Node.js 24 (Vercel: select Node.js 24.x).

```sh
npm ci
npm run dev
```

`/` is the public feed. `/preview` is a development-only editorial preview of the two **unverified** handoff examples. Production requests to `/preview` return 404. No preview switch or credentials can expose these fixtures in production. The public collection starts empty until an editor checks and publishes real content.

```sh
npm run validate:content
npm test
npm run typecheck
npm run build
npm start
```

## Content workflow

- Edit structured files under `content/`; schema and publication rules live in `lib/content.ts`.
- Keep examples in `samples.json` as `needs_verification`. Never publish them automatically.
- Collect original URLs and metadata, draft content, verify against originals, then manually mark `approved`. Approval does not publish.
- To publish, add the reviewed item to `published.json`, set `status` to `published`, and record `verification.reviewedBy`, `verification.reviewedAt` (YYYY-MM-DD), source `url` and `accessedAt`. Official-statistics quizzes also need period, population, unit and `verification.answerEvidence`.
- Verification fields record human review; schema validation cannot verify that a URL supports a claim. The operator must do this before publication.
- IDs/slugs must be unique across both collections. Options: 2–4 unique IDs. Quiz needs one correct ID and feedback for every option. Reveal has no correct answer or score.
- Run content validation, tests and build; review and deploy. Archive errors or outdated sources. Editorial notes and review records are excluded from public feed props.

## Vercel

Import this repository into Vercel, select **Next.js**, use repository root as Root Directory, and select **Node.js 24.x**. Default commands (`npm ci`, `npm run build`) work. No environment variables are required. Review a Vercel preview deployment before promoting production. The in-app editorial `/preview` remains blocked on all production builds, including Vercel preview deployments.

An empty public feed is intentional until verified content is provided. Initial content count is not fixed. Public release still requires verified/approved content, a Vercel project connection and real mobile/browser QA.

Source structure: `app/` routes and styles; `components/feed.tsx` interaction; `lib/` schema/validation; `content/` local editorial data; `tests/` publication and interaction checks. Existing `Act/` files are historical and unused by the web app.

## Discovery journey

The landing page `/` has a CTA into `/discover`. The hub has By topic, Random, and Saved views. Topic filters are generated from the `content/topics.json` registry. Cards open a focused Quiz/Reveal player with Back to feed, Save/Remove, result feedback, sources and next navigation. Random uses a shuffled copy of the available collection and never repeats within a run; finishing offers an explicit restart. No timers or automatic advancement.

Saves use this browser's localStorage, with a separate namespace for editorial preview. They survive reloads but do not sync across devices or browsers. Storage failures fall back to this visit and show a notice. Deleted/unpublished items do not appear in Saved. Login remains undecided and is not required by this prototype.

Use development-only `/preview` to inspect the new hub and player with the two unverified fixtures. These fixtures remain excluded from public `/discover`. Mobile uses one card column and horizontally scrolling topic chips; desktop uses two card columns. Both layouts keep the same journey and keyboard-operable controls.

## Kindness Reveal fixtures

`content/kindness.json` contains four independent operator-provided drafts, loaded only in development `/preview`, before legacy fixtures. No hosted database is needed. Each record preserves its own source, two choices and needs_verification status; source URLs and dates remain null.

Reveal supports `revealMode: prediction | reflection`, optional `observedOptionId`, and `revealHeadline`. Observed option IDs must exist and are forbidden on reflection cards. They never award correctness or scores. Choose an option, optionally change it, then press Reveal to see the account and takeaway. Quiz behavior is unchanged. Mobile widths up to 640px use fixed bottom navigation with safe-area spacing; desktop keeps top navigation.

## Design system

`DESIGN.md` describes White & Playful: white canvas, black text and primary buttons, lime and lavender accents restricted to small labels and selection states. Locally bundled Space Grotesk, Inter and JetBrains Mono are retained. No dark mode, gradients or glass effects are used in the current interface. Content rules and responsive bottom navigation remain unchanged.

## Landing / feed separation

`/` has three concise sections: introduction and Start discovering CTA, Quiz/Reveal explanation, and a random-feed CTA. The main `/discover` topic view starts directly with topic filters and content. `/discover?feed=random` opens the random tab; it does not automatically start a session. Development `/preview` uses the same compact hub with unpublished fixtures. Landing and hub are responsive and retain mobile bottom navigation in the hub.

## Topics and keyword search

Add broad topics to `content/topics.json` with a stable `id` and English `label`; array order is chip order. Existing initial topics are Travel, Daily life, Food, Language, Work and Society. Topics are visible even before they contain published items. Never add narrow keywords as navigation topics.

Each content record uses `topicIds` (one or more registry IDs) and `tags` (fine-grained keywords, e.g. kindness, rain, generosity). Former mixed `topicTags` were migrated to these two fields. Kindness accounts use Travel or Daily life according to context; audience relevance does not establish residency.

By topic search submits with Search or Enter, combines with the selected topic, ignores letter case and treats hyphens as spaces. It matches title, context, question, broad topic labels and tags; it never searches hidden answers, reveals, source notes or editorial notes. Clear search preserves the topic; Clear filters resets both. Saved and Random remain independent of topic search. Tags are shown in small type below each card and at the bottom of the player. No external search service is needed.
