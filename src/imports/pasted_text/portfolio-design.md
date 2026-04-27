Build a single-page portfolio website for a graphic designer and motion 
graphic designer. The aesthetic is: dark-mode minimalist with artistic tension — 
high contrast blacks with razor-sharp layout, punctuated by unexpected 
bursts of color (acid yellow #D4FF00 and off-white #F0EDE6 against #0A0A0A).

---

TYPOGRAPHY
- Display font: "Neue Montreal" or "PP Mori" — condensed, editorial weight
- Body/labels: "Söhne Mono" or similar monospaced — cold, technical
- All section headings are split into individual characters via JS, each letter 
  animating in with a stagger (translateY from 60px → 0, opacity 0 → 1, 
  easing: cubic-bezier(0.16, 1, 0.3, 1))
- Navigation items slide in from left on page load with 80ms stagger delay
- A single large ambient text marquee runs horizontally behind the hero 
  section (e.g. "MOTION — DESIGN — BRAND — VISUAL — STORYTELLING —") 
  looping infinitely, very slow, low opacity (8%)

---

LAYOUT
- Full-bleed dark canvas (#0A0A0A)
- Sharp asymmetric grid: some cards bleed edge-to-edge, others are 
  inset with 48px gutters, no two sections use the same column count
- Section dividers are a single 1px line in #D4FF00, full width
- Hero section: oversized name/title split across two lines — left-aligned, 
  massive (clamp 80px–160px), with a blinking cursor character at the end
- Scroll indicator: a vertical line on the right edge of screen that fills 
  from top as user scrolls (scroll progress bar)
- Sticky nav: ultra-minimal — just 4 text links + a small circle logo mark, 
  no background until scroll (then frosted glass blur, 10% white bg)

---

SECTIONS (in order)

1. HERO
   - Full viewport height
   - Designer name in display font, massive, uppercase
   - Subtitle animates character by character on load
   - Small "AVAILABLE FOR WORK" badge with a pulsing green dot (2px, #00FF87)
   - Ambient looping reel thumbnail (muted autoplay video or looping gif) 
     positioned bottom-right, 320×180px, with a grainy film overlay

2. BRAND ANIMATION
   - Section label: "01 / BRAND ANIMATION" in monospace, small caps
   - 3-column grid (desktop) of project cards
   - Cards: 16:9 ratio, dark bg with hover-reveal gif/video playback
   - On hover: card scales 1.02, a thin acid-yellow border traces the card 
     perimeter (SVG stroke-dashoffset animation, draws in 400ms)
   - Card label appears from bottom on hover with slide-up animation
   - FUNNY HOVER: cursor transforms into a tiny clapperboard emoji 🎬 
     with a CSS custom cursor

3. SOCIAL MEDIA POSTS
   - Section label: "02 / SOCIAL MEDIA"
   - Horizontal scroll carousel (snap scrolling, no scrollbar visible)
   - Cards are portrait 9:16 ratio, tightly packed with 12px gap
   - Cards slightly rotated (alternating -1.5deg / +1.5deg) at rest, 
     straighten to 0deg on hover
   - Background of this section: subtle dot-grid pattern in #1A1A1A
   - FUNNY HOVER: tooltip that says "swipe like you mean it 👆" 
     appears on first interaction only

4. UI DESIGN
   - Section label: "03 / UI DESIGN"
   - Full-width feature project: browser mockup frame (custom SVG frame, 
     not generic), project screenshot inside, slight 3D tilt on scroll 
     (CSS perspective transform driven by scroll position)
   - Below: 2-column grid of smaller UI projects
   - Each project has: client name, year, short 1-line description
   - Tags rendered as pill badges with 1px yellow border, no fill
   - FUNNY HOVER: cards wobble briefly (keyframe: rotate -2deg → 2deg → 0) 
     as if surprised to be touched

5. VIDEO EDITING
   - Section label: "04 / VIDEO EDITING"
   - Dark, cinematic layout — full-width project thumbnails stacked vertically
   - Each row: thumbnail left (60% width) + project info right (40%)
   - Alternating layout: odd rows image-left, even rows image-right
   - On hover: thumbnail gets a VHS-style glitch effect (CSS clip-path 
     animation shifting RGB channels slightly)
   - Play icon: minimal hollow circle with triangle, scales up on hover
   - FUNNY HOVER: a tiny "🎞️ don't touch my reels" tooltip appears 
     near cursor

---

ANIMATIONS & MOTION

Global rules:
- Page entry: sections animate in on scroll via IntersectionObserver 
  (translateY 40px → 0, opacity 0 → 1, 600ms, easing ease-out)
- No animation plays twice (use "played" class to prevent re-trigger)
- Reduce motion: all animations respect `prefers-reduced-motion`

Cursor:
- Replace default cursor with a custom 12px circle (border: 1.5px solid 
  #D4FF00), follows mouse with 80ms lag (lerp smoothing)
- Circle expands to 40px on hover over any interactive element
- On hover over project cards, cursor label changes to "VIEW →"

Scrolling:
- Smooth scroll behavior: scroll-behavior: smooth on html
- Horizontal scroll section uses JS wheel hijacking for natural feel

Text animations:
- All H1/H2 headings use the split-character stagger entrance
- Running text clock in footer: shows current time updating live, 
  monospaced, small

---

FOOTER
- Minimal: Name, tagline ("Making things move since 20XX"), 
  social links (Behance / LinkedIn / Instagram) as icon-only links
- Live clock (current local time) bottom-right in monospace
- A single large "LET'S WORK" in display font, oversized, 
  that follows cursor direction slightly (parallax tilt, max ±8px)
- Clicking "LET'S WORK" copies email to clipboard + shows a toast: 
  "copied. now email me 📩"

---

PALETTE
- Background:    #0A0A0A
- Surface cards: #111111
- Borders:       #222222
- Accent:        #D4FF00  (acid yellow — use sparingly)
- Text primary:  #F0EDE6  (warm off-white)
- Text muted:    #555555
- Success/live:  #00FF87

---

RESPONSIVE
- Mobile: single column, marquee still runs, carousels become swipeable, 
  custom cursor disabled, all font sizes scale down via clamp()
- Tablet: 2-column grids
- Desktop: full layout as specified above