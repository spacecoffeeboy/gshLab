# Landing color system

Scope: `/` only. Tokens live in `app/landing.module.css`, inherited by hero and character introduction. No root variables, shared layout, quiz, bridge or report palette changes.

| Role | Hex | Usage | Contrast |
| --- | --- | --- | --- |
| Canvas | #E3E6EA | Cool grey supporting Roro's white silhouette; matched to production artwork | — |
| Primary text | #343B45 | Large headlines and character headings; charcoal replaces pure black | 9.03:1 on canvas |
| Secondary text | #505A67 | Supporting copy and character descriptions | 5.59:1 on canvas |
| Accent | #3659C9 | Korea / Ready / AlmengE emphasis, small labels, focus indicator | 4.89:1 on canvas |
| Action | #343B45 | One primary START QUIZ control | 11.31:1 with white |
| Action hover | #414B59 | Pointer hover; keep geometry unchanged | >7:1 with white |
| On action | #FFFFFF | CTA label and SVG arrow | — |
| Divider | #CBD0D7 | Decorative section boundary; never a required control boundary | — |

All text pairings meet WCAG AA 4.5:1 for normal text. Softer charcoal reduces the starkness of pure black while retaining readable contrast; perceived comfort varies by screen and brightness and is not guaranteed by a contrast ratio.

Rules: no pure-black landing text; use two text levels rather than arbitrary greys or opacity. Accent is reserved for emphasis, not all copy. Never encode feedback solely with color. Focus has a 3px outline with 5px offset. Existing reduced-motion and low-height fallbacks remain.

## Artwork

`public/illustrations/hero/graphic-mascots.png` is generated from the latest user-reviewed outline-free cartoon direction. CSS viewports isolate each character; no raster headline or button is used. Gari retains blue-grey/navy/yellow. Roro retains a closed charcoal beak, charcoal pupils/legs, warm offwhite eye whites, white body, yellow feet and stepping stones. Generated raster colors have small variations and are not claimed to be exact production vector fills.

The hero remains tightly stacked with fixed characters and three scroll-driven headlines. Character descriptions alternate left/right on desktop and stack on mobile. This is a scoped landing system, not completion of the future app-wide design system.

## Checks

Build, content validation, unit suite; browser sweeps at 320/390/768/1440 for hero, characters, scrolling, CTA and reduced motion; check /start returns original white background and #111 foreground. Existing quiz browser suite covers six widths and reports/timer/English/Korean modes.
