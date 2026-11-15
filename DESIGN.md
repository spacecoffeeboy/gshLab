# Almeng-E — active white / black / lime UI contract

Rationale and source video timestamps: [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md). Current implementation: `app/globals.css`.

## Active journey

Landing `/` → bridge `/start` → questions `/test` → report `/report`. No topic/card-feed step or bottom feed navigation in this journey. `/discover` redirects to `/start`.

- Landing headline: **How well do / you know Korea?** Lime emphasis on Korea. CTA **Take the Korea test** and **Find my starting point** lead to the bridge.
- Bridge: select one level, question language (English default, Korean available), Standard or TIME ATTACK. Selected level alone determines question pool; no adaptive difficulty or sublevels.
- Beginner/intermediate:15 questions; advanced:7 available questions, clearly stated before starting and in the report. Do not duplicate items to reach15.
- Question selection immediately checks the answer. Correct choices receive a short tick pop; incorrect choices show the correct option with a static tick. First answer is locked. Explanations expand below; they do not navigate or force-scroll.
- TIME ATTACK:180 seconds total, including explanations. Timer changes by actual elapsed time and auto-submits; unanswered questions remain visible in the report. Standard is untimed.
- Report: selected level + raw score/actual denominator first, then interpretation, correct/incorrect/unanswered/time, category counts and expandable review. No invented participant averages, rank, demographic statistics or cross-level ability equivalence.
- React memory only. No DB or personal profile collection. Refresh or tab closure resets. Empty report guides the user back to the bridge.

## Brand and type

- White #FFFFFF, text/primary action #111111, secondary #666666, neutral #F6F6F6. One accent lime #D8F36A; no lavender, gradients, glass or dark theme.
- Rounded lime AL on black square; Almeng-E with left-aligned A little more Korea below. Keep the existing favicon. Compact10px logo tagline is the sole small-branding exception.
- Space Grotesk headings, Inter body, JetBrains Mono indexes/timer; local fonts with system fallback for Korean. Mark Korean question content with `lang=ko` and English UI/questions with `lang=en`.
- Body/choices/explanations15px /1.6. App main headings28px desktop,24px mobile /1.4. Group headings18px, subheadings24px. Secondary controls14px; metadata/tags12px minimum.
- Marketing display48–88px desktop /28–40px mobile. Report score numeral80px desktop /64px mobile is a numeric data-display exception, not body copy.
- Text contrast4.5:1+, control outlines3:1+. Focus2px black with4px offset. Preserve keyboard skip link and useful question/report heading focus.

## Layout and interaction

- Spacing4/8/12/16/20/24/32/48/64. Outer gutter24px desktop,20px mobile,16px at320px. Main reading area around700px; bridge960px; report800px outer width.
- Controls48px+, options60px+ with12px gaps, radius10px. Display cards radius16px. Related text12–16px apart; sections24–48px apart. No typography shrinking to force a fit.
- Bridge level choices: three columns on desktop, one column on mobile. Two mode cards collapse on mobile. Report stats four columns desktop/two mobile; category rows two/one. Long labels and explanations wrap.
- Shared icons20px /1.75 stroke. Do not add unrelated decorative backgrounds. Meter colors are decorative; numeric values remain readable.
- Tick32px lime circle,360ms pop and420ms four-ray burst once. Reduced motion removes animation and sparks. No confetti overlay, looping celebration or flashing timer.
- Result actions and review summaries keep48px targets. Inline explanations do not replace the question.

## Legacy content

Existing Explorer/Feed and development-only previews remain for editorial work, with their saved-free two-tab behavior. They are not the main test journey. No Saved controls or browser-storage dependency is reintroduced.

## English-first content and time meter
- English questions, options and explanations cover the full70-item reviewed bank. Preserve native Korean source and answer IDs; do not add a translation that gives away a word-question answer.
- Use readable romanization with Hangul for unfamiliar Korean terms, e.g. `sonjeol (손절)`. Add pronunciation hints where romanization may be misleading. Keep the voice conversational and respectful; do not stereotype the target audience.
- Time Attack shows a separate sticky remaining-time section: numeric countdown plus8px shrinking meter. Question progress stays distinct as the4px growing answered meter. Time display uses14px label and18px mono digits; neutral/lime only, no flashing.
