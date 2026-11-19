# Work hero: scroll typography

Scope: landing hero only; no main merge or deployment. Uses the latest three-state approved storyboard. Its original artwork is retained without alteration; CSS viewports isolate Gari and Roro, and all text/CTA are native HTML.

## Typeface decision

Inter Black 900 headline; Inter Medium 500 support; Inter Semi Bold 600 CTA. Self-hosted via the existing Fontsource package, no external font request. Commercial web embedding is allowed under SIL OFL 1.1; package retains the license.

Official sources checked:
- https://github.com/rsms/inter — project README documents use by Figma, GitLab, Mozilla and others, screen readability and display suitability.
- https://github.com/rsms/inter/blob/master/LICENSE.txt — SIL OFL terms; local copy: node_modules/@fontsource/inter/LICENSE.

Inter is the neutral, familiar choice for this experiment rather than the previous cartoon serif. No assertion that every named site uses it in its hero. Hero-only blue #4565c7 is provisional.

## Interaction

Native scrolling, no wheel/touch interception. Hero section is 230svh; panel stays sticky while phrases roll vertically through one clipped window. Phases switch at 27% and 60% of sticky travel; final phrase holds until sticky naturally releases. Reverse scrolling reverses phases. Birds, subtitles and CTA stay fixed relative to the panel.

1. HOW WELL DO YOU KNOW KOREA?
2. ARE YOU READY?
3. LET’S GET ALMENGE!

No Korean wordmark inside hero; one START QUIZ CTA to /start. Existing global masthead and following landing sections remain.

Reduced motion, screens <=660px high, and no JavaScript use a normal-flow first phrase without a prolonged scroll region. One stable accessible H1 avoids repeated announcements of decorative scroll text. Browser checks: 320/390/768/1440 widths, all states, stationary birds, release, CTA navigation, reduced motion and low-height fallback.

Preview: npm run dev; open /. Existing quiz browser suite updated only for the renamed entry CTA.

## Character introduction iteration

Hero emphasis updated to vivid blue #3155E7; pastel #EAF0FF is reserved for character artwork surfaces. Calm alternative considered: #4263D9. These are scoped, reversible landing values. Headline increased to 92px maximum, with two-line stages scaled 1.48x to occupy the same fixed window as the three-line opening.

Below the hero, the former feature cards and final CTA section are replaced with one character introduction section: Gari artwork left/copy right; Roro copy left/artwork right. Mobile stacks artwork then copy for each. Copy frames patience and exploration as character traits inspired by hunting styles, rather than categorical biological claims. Original approved artwork is reused. Future third section remains deferred.

## Production landing iteration

Superseded color and artwork values above: see LANDING_COLOR_SYSTEM.md. The landing now uses a generated standalone graphic character sheet, not the original line-art storyboard. Main publication is authorized for this landing iteration; subroute UI remains unchanged.
