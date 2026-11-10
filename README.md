# Almeng-E — Korea test first look

Node.js / Next.js. Deploy target: Vercel. Current user-approved scope: landing → one sample question → explanation and completion.

## Run and verify

```sh
npm ci
npm run dev -- --port 3002
npm test
npm run build
npm run test:browser
```

`test:browser` checks the active first-look journey in Chromium at `http://localhost:3002`. Override `BROWSER_BASE_URL` and `CHROMIUM_PATH` as needed. Screenshots are saved in ignored `test-results/`.

## Routes and copy

- `/`: **How well do you know Korea?** CTA **Take the Korea test** → `/test`.
- `/test`: one English ramyeon/kimchi/danmuji dummy. Choose once to immediately check the answer. Then **View explanation** expands the explanation below the question without navigation.
- Inline explanation: kimchi pairing, an alternative danmuji pairing, completion, **Back to home** and **Try this question again**.
- `/discover`: redirects to `/test` for existing bookmarks.
- `/preview`: development-only legacy editorial collections. All production preview requests remain blocked.

The sample presents an editorial classic pairing, not a measured popularity ranking. It does not award a level or generate population statistics. The larger placement-test concept is a future product step.

## Files and retained content

`components/korea-test.tsx` owns in-memory answer/reveal state. `lib/korea-test.ts` is the sample copy. No login, browser storage or external API is required. Refresh resets the sample.

`content/published.json` retains the prior 8 Reveal and 7 statistical Quiz records. These and the previous feed components are preserved for the user's later decision about Believe it or not. They are not linked from the current user journey. Internal evidence stripping and publication checks remain in place.

`DESIGN.md` is the active white/black/lime design contract. `docs/DESIGN_PRINCIPLES.md` records the numerical rules and their basis. The unboxed question keeps28px/24px headings,15px body,12px minimum metadata,60px options and48px actions. The previous feed browser scripts are historical checks; the active browser check is `tests/browser/first-look.mjs`.

## Deployment

GitHub main is connected to Vercel. Commit/push to work for review; push to main only when authorized. This iteration was explicitly authorized for main by the user. Do not claim a remote deployment is ready unless the live deployment has been checked.
