# Almeng-E — White & Playful / Active UI Contract

Current implementation: `app/globals.css`. Rationale, timestamped references to four operator-provided video transcripts, and separation of quoted numerical advice from product-specific decisions: [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md).

## Brand
- White #FFFFFF; text/primary action #111111; secondary text #666666; neutral fill #F6F6F6.
- One accent: lime #D8F36A. Use it in AL, hero emphasis and subtle selected options; no lavender/glass/dark/gradient theme.
- Rounded AL vector on a black square. Wordmark `Almeng-E`; `A little more Korea` left-aligned below with natural word spacing. Compact 10px tagline is the only small-type branding exception.
- Rounded AL favicon: SVG + multi-size ICO. Master: `public/brand/almengi-al.svg`.

## Type and hierarchy
- Space Grotesk 500/600 headings, Inter 400/500/600 body, JetBrains Mono 400/500 indexes; fonts locally bundled.
- Body/choices/feedback: 15px, line-height1.6. Questions:18px/1.4/600.
- Main mobile/card/result titles24px/1.2/600; desktop page/player28px/1.2.
- Secondary controls14px. Tags, source metadata, navigation captions and previews12px minimum. Essential instructions are not caption-sized.
- White text on black actions; secondary text at least4.5:1 contrast. Focus2px black with4px offset.

## Layout and controls
- 4/8/12/16/20/24/32/48/64 spacing scale. Container1160px, hub1120px, player700px.
- Outer gutter24px desktop,20px mobile,16px at320px. Card padding20px top,24px sides/bottom; card gap24px.
- Buttons/inputs48px high, 10px corner radius; topic chips44px; choices60px minimum,12px apart. Card radius16px.
- Mobile two-item bottom nav (By topic / Random),56px targets and safe-area clearance. Saved, save buttons and storage persistence are removed.
- Keep related text12–16px apart and separate groups24–32px. Expanded sources start near their title and end with24px space.
- Shared SVG icons20px/1.75px. Do not add decorative icon backgrounds or repeated dividers without a grouping purpose.

## Approved hero
- Three-section landing. First section is image-free: large text above the description and a separate centered CTA row.
- Main: `Korea, here and there` / `A little deeper and closer`.
- Sub: `Get to know Korea. Have a little fun. Take a little with you.`
- Outline `here`, lime `deeper`, underline `closer`; 48–88px desktop display,28–40px mobile. This is a marketing exception to app title sizes.
- CTA `Start discovering` → `/discover`. Bottom landing CTA → `/discover?feed=random`.

## Behavior
- Topic registry and fine-grained searchable tags stay separate. Search uses public pre-answer copy only.
- Quiz: one correct answer and per-option feedback. Reveal: prediction/reflection, select then explicitly reveal, never scored.
- No forced timers, automatic advancement, login or localStorage dependency. Random does not repeat until the collection ends.
- Publication filtering is mandatory. Do not publish fixtures to make the interface look full.
- Keep full reading copy in the player; do not shrink fonts to fit. Allow multiline labels and long source links to wrap.
- Respect reduced motion. Result and return navigation restore useful keyboard focus.

## Published content explanations
- Quiz result order: outcome → correct-answer block → evidence explanation → takeaway → collapsed data scope → Next discovery. Answer block uses 16px/20px padding, 10px radius, 15px body and a lime edge; metadata remains at least12px.
- Supplied-excerpt publications explicitly disclose their basis; never fabricate report URLs, survey dates or independent verification. Internal evidence and editorial notes are stripped from public content. Existing six fixtures remain unpublished.
