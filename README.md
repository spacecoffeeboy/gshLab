# Almeng-E — a little more Korea

Node.js / Next.js. Vercel production follows GitHub main.

## Current journey

`/` landing → `/start` bridge → `/test` questions → `/report` personal results. `/discover` redirects to the bridge. Production `/preview` stays blocked.

- Choose **beginner / intermediate / advanced**, English (default) or Korean question language, and Standard or **TIME ATTACK**.
- All70 reviewed questions have authored English questions, options and explanations in `content/quiz-bank-en.json`. Korean source copy remains intact. English UI is the default; Korean terms include romanization and Hangul where helpful. Korean question mode remains available.
- Only questions from the selected level. Beginner28 / intermediate35 / advanced7 in the current bank. Draw15 for beginner/intermediate and all7 for advanced, without repeating a question inside the test.
- Standard has no timer. TIME ATTACK has180 seconds for the whole test, including explanation reading, with automatic timeout submission. Missing responses remain unanswered and count against the actual question denominator.
- Select once for an immediate answer check and a small success tick. Open the explanation below the question. Results show the selected level, raw score/actual total, category results, response counts, elapsed time and answer review. Different levels are not treated as the same ability scale.
- No DB, account, external API, demographics collection, cookies for quiz state, localStorage or sessionStorage. Attempt data exists only in React memory; refresh/tab closure clears it. Direct result access shows an empty-state prompt.

## Content workflow

The reviewed source is `content/editorial/quiz-review-v2.csv` (82 rows). User-approved source copy is retained. Run:

```sh
npm run import:quiz
```

This produces `content/quiz-bank.json` and `content/quiz-bank-manifest.json`, selecting only70 reviewed rows. The9 unconfirmed and3 held entries stay excluded. Type/placeholder normalization does not rewrite questions or distractors. Add/edit the reviewed source and import again to extend the bank. Difficulty/interpretation is editorial, not a statistically calibrated certification.

English translations carry the Korean bank version and are validated for all question IDs and option keys. After updating the Korean source, review/update `content/quiz-bank-en.json` to match; the build rejects missing or stale English rather than silently falling back to Korean. Both languages share the same answer keys and level labels.

The former15 Reveal/statistical stories and old sample components are preserved, but are not part of the test bank or linked from this journey.

## Run and verify

```sh
npm ci
npm run dev -- --port 3002
npm test
npm run build
BROWSER_BASE_URL=http://localhost:3002 npm run test:browser
```

The browser suite is `tests/browser/level-test.mjs`. Override `CHROMIUM_PATH` if Chromium is elsewhere. It covers six widths, all three selected-level pools, immediate checks/inline explanations, result interpretation, 3-minute time expiry and shrinking remaining-time bar, restart, empty reports, keyboard navigation and storage-free operation. Screenshots go to ignored `test-results/`.

`DESIGN.md` is the active white/black/lime and numerical UI contract; `docs/DESIGN_PRINCIPLES.md` retains the video-based rationale.

## Future DB preparation only

`db/schema-draft.sql` is an unexecuted PostgreSQL design, not a deployed database. There is no DB SDK, connection string or setup hook. See `docs/data/STATIC_BANK_AND_FUTURE_DB.md` for data/score invariants and migration work still required. `docs/data/OPTIONAL_DEMOGRAPHICS_PLAN.md` describes optional consent after the report, without collecting anything now.

The static quiz bundle contains answer keys, so it is suitable for a casual portfolio quiz, not a tamper-resistant official exam. No real participant averages or percentiles are shown.
