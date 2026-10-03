---
name: Asilbek Adhamov — Motion
description: A course landing page built as an After Effects graph editor; molten orange field over warm black ink.
colors:
  orange: "#ff5a00"
  orange-hot: "#ff7a1a"
  orange-deep: "#c63d00"
  on-orange: "#1a0a02"
  on-orange-2: "#4a1a00"
  ink: "#0c0806"
  ink-2: "#16100c"
  ink-3: "#241a14"
  line: "#3a2a20"
  paper: "#fff1e4"
  muted: "#bfa897"
  ae-panel: "#232323"
  ae-plot: "#2b2b2b"
  ae-bar: "#1c1c1c"
  ae-grid: "#353535"
  ae-track: "#3a3a3a"
  ae-button: "#3d3d3d"
  ae-label: "#9a9a9a"
  ae-text: "#d6d6d6"
  ae-title: "#e8e8e8"
  ae-curve: "#e8452c"
  ae-influence: "#e6c619"
  ae-playhead: "#2d8ceb"
  ae-hover: "#1f6cc0"
  ae-work: "#3aa83a"
typography:
  display:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "clamp(3rem, 6.6vw, 6.2rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "clamp(2.3rem, 5.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  numeral:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "clamp(3rem, 6vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.05em"
    fontFeature: "tnum"
  title:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "clamp(1.9rem, 3.4vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  quote:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "clamp(1.6rem, 3.6vw, 3.1rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  lede:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "clamp(1.02rem, 1.3vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Bricolage, Helvetica Neue, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
  timecode:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.02em"
    fontFeature: "tnum"
  ae-ui:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
  ae-axis:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "8px"
    fontWeight: 500
    lineHeight: 1
rounded:
  pill: "999px"
  course: "28px"
  frame: "22px"
  card: "20px"
  track: "16px"
  bar: "10px"
  chip: "8px"
  ae-panel: "10px"
  ae-button: "6px"
  ae-plot: "4px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  max: "1320px"
  grid-gap: "clamp(16px, 2vw, 28px)"
  section-y: "clamp(96px, 12vw, 170px)"
  close-y: "clamp(110px, 14vw, 200px)"
  stack: "22px"
  layer-gap: "7px"
components:
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.95em 1.4em"
  button-paper-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.95em 1.4em"
  button-ink-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.on-orange}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-orange}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.95em 1.4em"
  button-ghost-hover:
    backgroundColor: "{colors.on-orange}"
    textColor: "{colors.orange}"
  button-xl:
    rounded: "{rounded.pill}"
    padding: "1.15em 1.9em"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0.7em 1.1em"
  nav-link:
    textColor: "{colors.on-orange}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  ae-graph-panel:
    backgroundColor: "{colors.ae-panel}"
    textColor: "{colors.ae-text}"
    typography: "{typography.ae-ui}"
    rounded: "{rounded.ae-panel}"
    padding: "12px"
    width: "340px"
  ae-graph-plot:
    backgroundColor: "{colors.ae-plot}"
    textColor: "{colors.ae-label}"
    typography: "{typography.ae-axis}"
    rounded: "{rounded.ae-plot}"
  ae-graph-button:
    backgroundColor: "{colors.ae-button}"
    textColor: "#ececec"
    typography: "{typography.ae-ui}"
    rounded: "{rounded.ae-button}"
    padding: "7px 11px"
  ae-graph-button-hover:
    backgroundColor: "{colors.ae-hover}"
    textColor: "#ffffff"
  ae-graph-track:
    backgroundColor: "{colors.ae-track}"
    rounded: "{rounded.ae-plot}"
    height: "4px"
  ruler-timecode:
    textColor: "{colors.paper}"
    typography: "{typography.timecode}"
    height: "16px"
  keyframe-strip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "18px 0"
  clip-frame:
    backgroundColor: "{colors.ink-2}"
    rounded: "{rounded.frame}"
  clip-timecode:
    backgroundColor: "rgba(12, 8, 6, .7)"
    textColor: "{colors.paper}"
    typography: "{typography.timecode}"
    rounded: "{rounded.chip}"
    padding: "6px 9px"
  course-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.course}"
    padding: "clamp(26px, 3vw, 40px)"
  course-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.on-orange}"
    rounded: "{rounded.course}"
    padding: "clamp(26px, 3vw, 40px)"
  layer-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.bar}"
    padding: "10px 14px"
  review-card:
    backgroundColor: "{colors.ink-3}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "24px 24px 22px"
    width: "min(380px, 78vw)"
  faq-row:
    textColor: "{colors.paper}"
    padding: "26px 0"
  faq-row-open:
    textColor: "{colors.orange}"
  close-band:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.on-orange}"
    padding: "clamp(110px, 14vw, 200px) clamp(16px, 4vw, 56px)"
---

# Design System: Asilbek Adhamov — Motion

## Overview

**Creative North Star: "The Graph Editor"**

The whole surface behaves like After Effects' graph editor. One cubic-bezier is the system's heartbeat. The shipped default is `cubic-bezier(.75, 0, .25, 1)`, which is exactly what After Effects' 75% / 75% influence handles produce. The hero's Speed Graph panel writes that `--ease` value onto the document root when the page loads and again on every handle drag, so every transition on the page (headline, buttons, reveals, timeline bars, FAQ) re-times to whatever influence the visitor sets. The motion designer's tools are the component language: speed curves and influence handles, keyframe diamonds, timecode, a playhead line with a triangular cap, and layer bars on a ruler.

The world is two materials. A molten orange field fills the first viewport and the closing band, and warm black ink carries everything between. Type is a huge, tightly tracked Bricolage Grotesque that jumps from footnote to billboard with no middle sizes to cushion it. JetBrains Mono appears only where a real editor shows numbers: timecode and curve values. Motion is weighted and physical. The default curve is a strong ease-in-out, so things gather speed, cross the middle fast and land softly, and nothing snaps. A smooth-scroll layer (Lenis, 1.15s quartic-out) keeps the page moving under a weighted hand.

One sub-world sits inside the page: the Graph Editor panel is a faithful piece of After Effects UI, with neutral software greys, AE's own accent colours, a system UI face and small square-ish radii. It is embedded app chrome, a screenshot you can operate, and its palette stays inside its own frame.

The world rejects the category default of a headline, badge row and three course cards. Its pricing is two different materials, and its curriculum is a layer timeline, not a bullet list.

**Key Characteristics:**
- One live easing curve (`--ease`, default `cubic-bezier(.75, 0, .25, 1)`) drives every transition. The Speed Graph panel rewrites it.
- Orange field / warm ink alternation; paper is the type color, never a section ground except the beginner course card.
- Keyframe diamonds (squares rotated 45°) as the recurring page mark: nav logo, strip separators, layer-bar ends, the value marker under the graph.
- Playhead = 2px line with a 12×8 downward-triangle cap, used on the hero ruler and both course timelines.
- Display type at weight 800, negative tracking from -0.035em to -0.05em, line-height under 1.
- Fully pill-shaped controls; generously rounded (16–28px) containers.
- One sealed sub-world: the After Effects Speed Graph panel, with its own grey palette, AE accents and Segoe UI, used nowhere else.

## Colors

A two-field palette: one saturated, warm orange family and a warm, brown-black ink family, with a cream paper for type. A separate, sealed AE panel palette exists only inside the Graph Editor.

### Primary
- **Molten Orange** (`orange`): the hero and close-band field, the beginner/SaaS course split (SaaS card), the hover fill that rises inside every button, strip separators, `<em>` emphasis inside section headlines, the open FAQ question, text selection, and the value diamond under the Speed Graph. The hero field itself is a 170° gradient within the family (#ec5200 → #f25800 → #f86000), recorded in the sidecar.
- **Hot Orange** (`orange-hot`): the interactive variant on ink: focus outline, hover color for FAQ questions, footer links and the "more work" link, and the draft-note text.
- **Burnt Orange** (`orange-deep`): low-key orange on ink: the paper course's playhead line, the scrollbar thumb.

### Neutral
- **Warm Black Ink** (`ink`): page ground, layer bars, ink buttons, the scrolled nav (at 78% alpha with blur).
- **Ink Raised** (`ink-2`): the reviews section ground and empty clip frames.
- **Ink Card** (`ink-3`): review cards, the draft-note pill, missing-video fallback.
- **Ember Line** (`line`): every 1px hairline: strip and reviews borders, FAQ dividers.
- **Cream Paper** (`paper`): primary type on ink, the hero headline, the beginner course card ground, paper buttons, playhead caps on dark.
- **Dust** (`muted`): secondary text on ink: ledes, captions, FAQ answers, footer, review attributions (8.8:1 on ink).
- **Char** (`on-orange`): all type and icons that sit on the orange field (6.2:1), the hero headline's accent word, ghost button stroke and fill.
- **Scorched Brown** (`on-orange-2`): secondary paragraph text on orange (4.7:1): the close lead and SaaS course description.

### AE Panel (scoped: valid only inside the Graph Editor)
Neutral, slightly cool software greys and After Effects' own signal colours. Every `ae-*` token is a quotation of the AE interface, not a brand colour.
- **Panel Grey** (`ae-panel`): the panel body; also the 1px stroke around the influence handles.
- **Plot Grey** (`ae-plot`): the graph area behind the curve.
- **Ruler Black** (`ae-bar`): the frame-ruler bar across the top of the plot.
- **Grid Grey** (`ae-grid`): horizontal speed gridlines.
- **Track Grey** (`ae-track`): the value track under the plot and the 1px top highlight of the panel.
- **Button Grey** (`ae-button`): the replay button at rest.
- **Label Grey** (`ae-label`): axis labels, frame numbers, the `%/sec` unit, the influence readout and the hint (5.6:1 on panel grey).
- **Panel Text** (`ae-text`): default panel text. **Title Grey** (`ae-title`): the panel title and the anchor glyph at the curve's centre.
- **Curve Red** (`ae-curve`): the speed curve and the ring of the dot that rides it during playback.
- **Influence Yellow** (`ae-influence`): influence handle lines and their draggable handle dots.
- **Playhead Blue** (`ae-playhead`): the current-time indicator in the plot.
- **Hover Blue** (`ae-hover`): the replay button on hover, with white text (5.4:1).
- **Work-Area Green** (`ae-work`): the 3px work-area bar under the frame ruler.

### Named Rules
**The Two Fields Rule.** A section is either the orange field or ink. Orange is a ground, not a sprinkle: on ink it appears only as curves, keyframes, emphasis words and state changes.

**The Char-On-Orange Rule.** Text on the orange field is `on-orange` (or `on-orange-2` for secondary copy). Cream paper on orange measures 2.8–3.3:1 and is not a reusable text pairing.

**The Hot-For-Interaction Rule.** On ink, `orange-hot` marks interaction (focus ring, hover); base `orange` marks content (curve, emphasis, keys).

**The Sealed Panel Rule.** Every `ae-*` colour, the Segoe UI face and the 10 / 6 / 4px radii exist only inside the Graph Editor panel. They never leak onto the page: no AE red, yellow, blue or green on a page component, no grey panel cards, no Segoe UI outside the panel. The only page token allowed in is the orange value diamond, which is the bridge showing the curve's result on the page.

## Typography

**Display Font:** Bricolage Grotesque, self-hosted as "Bricolage" (variable 200–800, with Helvetica Neue, sans-serif)
**Body Font:** Bricolage (same family, optical sizing on)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)
**AE Panel Font (scoped):** Segoe UI (with system-ui, sans-serif), inside the Graph Editor only

**Character:** One grotesk carries everything from 0.75rem hints to the 6.2rem billboard. The quirky, ink-trapped Bricolage at 800 with tight tracking gives the poster voice, and the same family at 400 stays friendly in body copy. Mono is reserved for machine numbers. Inside the Graph Editor the type switches to the operating system's UI face, because that is what After Effects' own panels use.

### Hierarchy
- **Display** (800, clamp 3–6.2rem, line-height 0.86, -0.045em): the hero headline only, revealed letter by letter on the live curve (see Components → Hero Headline). The close-band title shares the voice at clamp 2.8–6.6rem, line-height 0.9.
- **Headline** (800, clamp 2.3–5rem, 0.95, -0.04em): one per section; one word wrapped in `<em>` is set upright in orange.
- **Numeral** (800, clamp 3–5.4rem, 0.8, -0.05em, tabular): course prices; the currency sign drops to 0.45em, top-aligned.
- **Title** (800, clamp 1.9–3rem, 0.95, -0.035em): course names.
- **Quote** (600, clamp 1.6–3.1rem, 1.12, -0.03em, max 28ch): the featured testimonial.
- **Body** (400, 1.0625rem, 1.55): running text; ledes at clamp 1.02–1.15rem, max 54ch; answers max 60ch.
- **Label** (600, 1rem, line-height 1): buttons and controls; FAQ questions at 600, clamp 1.1–1.35rem.
- **Timecode** (JetBrains Mono 500, 0.6875–0.8125rem, tabular-nums): ruler timecode, clip durations, the influence readout, layer numbers.
- **AE UI** (Segoe UI 600, 0.75rem, line-height 1, scoped): the panel title and replay button.
- **AE Axis** (Segoe UI 500, 8px in SVG units, scoped): frame numbers, speed labels and the `%/sec` unit inside the plot.

### Named Rules
**The Billboard-Or-Footnote Rule.** Scale jumps; it does not step. Pair an 800-weight display size with 1rem-scale text directly, with no intermediate subhead tier.

**The Mono Means Machine Rule.** Monospace is only for values an editor would print: timecode, durations, bezier coordinates, influence percentages, layer indices. Never for prose, labels or headings.

## Layout

Content sits in a max 1320px column with a fluid gutter (clamp 16–56px) on both sides; full-bleed bands (hero, strip, reviews, close) break out of it. Section vertical padding is fluid and generous (roughly clamp 72–200px). Grids are asymmetric on purpose: work is 5fr / 7fr with a tall 9:16 clip spanning two rows beside two 16:9 clips; FAQ is 5fr / 7fr with the headline sticky at 110px; the two course cards sit side by side with the orange card dropped up to 96px for a staggered rhythm. Grid gaps are clamp 16–28px.

The hero is a full-viewport (100svh) field with the portrait masked in from the right, copy on the left (max 780px), the 340px Graph Editor panel floating bottom-right (96px up) and the timecode ruler spanning the bottom.

Responsive: at 1100px the graph narrows to 300px. At 860px everything collapses to one column, nav links hide, the portrait becomes a 4:4.2 block on top with copy overlapping it by -18%, and the graph joins the flow (max 420px). At 520px the hero headline drops to clamp 2.6–3.9rem, hero CTAs go full width and course headers stack.

## Elevation & Depth

Depth comes from tonal ink steps (ink → ink-2 → ink-3) and from frosted overlays on top of motion, not from lifted cards. Shadows are soft, deep, negative-spread ambient drops paired with a 1px inner hairline that defines the edge on dark ground.

### Shadow Vocabulary
- **Button rest** (`box-shadow: 0 1px 0 rgba(255,241,228,.08) inset, 0 8px 24px -10px rgba(0,0,0,.6)`): every pill button.
- **Button lift** (`box-shadow: 0 14px 30px -12px rgba(0,0,0,.7)`): button hover, with a 2px rise.
- **AE panel** (`box-shadow: 0 30px 60px -24px rgba(0,0,0,.6), inset 0 0 0 1px #0f0f0f, inset 0 1px 0 #3a3a3a`): the Graph Editor only. An ambient drop over the orange field, plus a black outline and a 1px top highlight like a desktop app panel.
- **AE button bevel** (`box-shadow: inset 0 1px 0 #4d4d4d, 0 1px 0 #111`): the panel's replay button only.
- **Clip frame** (`box-shadow: 0 30px 60px -30px rgba(0,0,0,.8), inset 0 0 0 1px rgba(255,241,228,.06)`): video frames.
- **Hairline only** (`box-shadow: inset 0 0 0 1px rgba(255,241,228,.06)`): review cards.

### Named Rules
**The Frosted-Over-Motion Rule.** Overlays that sit on moving or photographic content (scrolled nav, clip timecode) are translucent ink with backdrop blur (6–14px); static surfaces stay opaque. The Graph Editor is deliberately opaque software chrome, not a frosted overlay.

## Shapes

Every page control is a full pill (999px): buttons, nav links, the draft note. Containers round by scale: course cards 28px, video frames 22px, review cards 20px, timeline 16px, layer bars 10px, timecode chips 8px. Against these soft corners the editor marks stay sharp: keyframe diamonds are unrounded squares rotated 45°, and the playhead cap is a clipped triangle (`polygon(0 0, 100% 0, 50% 100%)`). The closing band draws a single hairline S-curve (`M0 300C380 300 520 0 1200 0`) that strokes itself in on reveal.

The Graph Editor follows AE's geometry, not the page's: a 10px panel, a 4px plot and track, a 6px replay button, unrotated square keyframes and round influence handles. These radii are scoped to the panel.

## Components

### Buttons
Tactile pills where the orange rises from below like a fill keyframe.
- **Shape:** full pill (999px), label weight 600 at 1rem, 0.6em gap to an optional 2px-stroke SVG arrow or Telegram icon.
- **Paper (default):** cream ground, ink text.
- **Ink:** ink ground, paper text; on hover the text turns char as the orange fills. Inside the scrolled nav and on mobile the ink button swaps to an orange ground with a paper fill.
- **Ghost:** transparent with a 1.5px inset char stroke, for use on the orange field; its fill is char and its hover text turns orange.
- **Hover / Focus:** an orange `::before` slides from translateY(101%) to 0 over 0.55s on `--ease`, the button rises 2px with the deeper shadow, trailing icons nudge 3px right; active scales to 0.98. Focus is the global 2px `orange-hot` outline at 3px offset.
- **Sizes:** sm (0.7em 1.1em, 0.9375rem) for nav, xl (1.15em 1.9em, clamp 1–1.25rem) for the close, block (full width, 1.1em vertical) inside course cards.

### Navigation
Fixed, transparent over the orange hero with char text; once scrolled it turns ink at 78% with `blur(14px) saturate(1.3)` and paper text. The brand mark is a keyframe diamond that rotates 180° on hover. Links are pills with a 12% currentColor wash on hover. Under 860px links hide and a top ink gradient keeps the brand legible over the portrait.

### Hero Headline
The display headline is split into letters by script and revealed on the live `--ease`. Each letter rises from 0.42em below, tilted 6° and blurred 12px, to rest over 1000ms. Letters stagger 22ms apart and each line starts 110ms later. The accent word is set in char and is held back from the rise. It "nails" itself to the screen 520ms after the last letter of the first line: it drops in from the camera at 2.6× scale with an 18px blur, overshoots to 0.92 at 62%, rebounds to 1.03 at 82% and settles over 640ms on `cubic-bezier(.7, 0, .2, 1)`, 18ms between letters. 400ms after the nail lands, the whole headline takes the hit with a 260ms shake of 5px or less. The sequence plays on load and replays whenever the graph is dragged or replayed. Under reduced motion the letters simply appear.

### Graph Editor (signature, sealed AE sub-world)
A faithful After Effects Speed Graph that sets the page's easing. All of its colours, type and radii come from the AE panel tokens and stay inside it (see The Sealed Panel Rule).
- **Panel:** panel grey, 10px radius, 340px wide, 12px padding, AE panel shadow, Segoe UI throughout. The head row has the title in AE UI title grey, and the live readout `Influence 75% · 75%` in label-grey mono, tabular.
- **Plot:** a plot-grey 320×214 SVG with a 4px radius. It contains a ruler-black frame ruler with `00f` / `30f` labels, a 3px work-area green bar, grid-grey speed gridlines with `%/sec` labels on a rounded scale, and the 2px curve-red speed curve. Influence-yellow handle lines run along the baseline from each key, ending in 5px yellow handle dots (grow to 7px on hover or drag, `ew-resize`). There are unrotated 8px square keys at both ends, a title-grey anchor glyph between the handles, and a playhead-blue current-time indicator with a pentagon cap.
- **Interaction:** handles are keyboard sliders (arrows step 2%, Shift steps 10%). Influence `a` / `b` map to `cubic-bezier(a, 0, 1-b, 1)` and are written to `--ease` on the document root. Releasing a handle replays: the playhead sweeps the plot in linear time over 1.2s while a white, red-ringed dot rides the speed curve.
- **Track and foot:** a 4px track-grey value track carries a 12px orange keyframe diamond that travels by the eased value. The foot has a label-grey hint and a 6px button-grey "replay" button with a bevel that turns hover blue with white text. Panel controls time their own state changes on `--ease-io` so the panel does not re-time itself while it is being edited.

### Timecode Ruler
A full-width bottom rail in the hero: mono timecode `00:00:00:00` (tabular, 0.02em) then a 16px tick bed drawn with two repeating gradients (major ticks every 64px at 55% cream, minor every 16px at 28%, half height). A 2px paper playhead with the triangle cap loops across it every 8s.

### Keyframe Strip
A full-bleed ink band between 1px ember hairlines; a row of After Effects vocabulary in 700-weight display (clamp 1.25–2rem, -0.02em) separated by 12px orange diamonds, scrolling linearly (40s loop). Every second word is orange. Stops under reduced motion.

### Course Card + Layer Timeline
Two cards, two materials: the beginner card is cream paper with ink type; the SaaS card is the orange field with char type and scorched-brown description. Each holds a head row (title + course-for line at 80% opacity, numeral price right), a description (max 46ch), a layer timeline, and a full-width ink button.
- **Timeline:** a 12px ruler of ticks every 10% offset 34px from the left, then an ordered list of layers. Each row is a right-aligned mono index (55% opacity) and an ink layer bar (10px radius, 0.9375rem text) whose start and length come from `--s` / `--e`, so bars step diagonally like comp layers. Each bar carries 9px keyframe diamonds at both ends (orange on paper, cream on orange).
- **Motion:** bars scale in from the left, staggered 90ms; on hover a bar slides 6px right and warms. A 2px playhead (burnt orange on paper, cream on orange) with a triangle cap scrubs across with scroll progress.

### Work Clips
Muted, looping reel videos in ink-2 frames (22px radius, clip shadow): one 9:16 tall, two 16:9 wide. Videos settle from scale 1.06 to 1 over 1.4s when revealed. A frosted mono duration chip sits top-left (14px inset). Caption below: 1.125rem strong title, muted 0.9375rem description. If a video fails, a radial ink vignette shows an orange 64px play disc linking to the Telegram post. The section ends in a text link with a 1.5px orange underline whose gap widens on hover.

### Review Rail
One featured quote at the quote size with a 48px orange initial avatar, then a horizontally draggable, scroll-snapping rail of ink-3 cards (20px radius, hairline inset, 18px gap, min(380px, 78vw) wide). Quotes at 1.0625rem / 1.45; attribution muted with the name in paper 600. Scrollbar hidden; grab cursor.

### FAQ
Native `<details>` rows between ember hairlines. Questions in label weight (clamp 1.1–1.35rem, -0.01em) with 26px vertical padding and a drawn plus (two 16×2px bars) that rotates to a minus. Hover turns the question hot orange; open turns it orange. Answers in muted text, max 60ch, expanding with an animated block-size on `--ease`.

### Close Band
The orange field returns: display-voice title (max 14ch), scorched-brown lead (max 44ch), an xl ink button, and an underlined Instagram link. A cream 50%-alpha hairline S-curve fills the bottom-right and draws itself over 2.2s.

## Do's and Don'ts

### Do:
- **Do** route every page transition through `var(--ease)` (default `cubic-bezier(.75, 0, .25, 1)`, the AE 75% / 75% influence) so the Speed Graph can re-time the page; use `--ease-io` (`cubic-bezier(.65, 0, .35, 1)`) only for symmetric loops and the graph panel's own controls.
- **Do** keep durations long and weighted: 0.3–0.6s for state changes, 1–1.4s for reveals (translateY 40px + 8px blur), 1s per headline letter, up to 2.2s for drawn curves and photo settles.
- **Do** use the keyframe diamond, triangle-capped playhead, tick ruler and mono timecode as the vocabulary for new page components.
- **Do** keep every `ae-*` colour, Segoe UI and the 10 / 6 / 4px radii inside the Graph Editor panel.
- **Do** set type on orange in `on-orange` / `on-orange-2`, and secondary type on ink in `muted`.
- **Do** keep one `<em>` orange word per section headline, set upright.
- **Do** collapse every reduced-motion transition to near zero, show the headline letters without motion and stop the strip.

### Don't:
- **Don't** use linear or snap easing on UI state. Linear motion is reserved for clock-like loops (the strip marquee, the running timecode playhead, the graph's time sweep) and the headline's 260ms impact shake.
- **Don't** set paper text on the orange field for new surfaces; it falls below 3.3:1.
- **Don't** use monospace for anything that is not a machine value.
- **Don't** square off page controls; buttons and small interactive chips outside the Graph Editor are full pills.
- **Don't** add a second accent hue to the page; outside the Graph Editor the system is orange plus warm neutrals.
- **Don't** let the AE panel palette, face or radii leak onto page components; grey software chrome belongs only in the Graph Editor.
- **Don't** present courses as a uniform row of identical cards; each course is its own material.
