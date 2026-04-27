Figma Make Prompt
Build me a single-page case study site for a self-initiated design project called Souqly. The page is long-form editorial writing punctuated by a working interactive prototype embedded mid-page. The visual language is minimalist, clinical, and confident — white and blue, like a Stripe doc or a Linear changelog, not a portfolio. Below is the full spec.
Visual identity
Palette — strict, no extra colors:

Background: #FAFBFC (off-white)
Surface: #FFFFFF (pure white, for cards and the prototype window)
Ink primary: #0A1628 (near-black with cool blue undertone)
Ink secondary: #5B6B82 (muted slate)
Ink tertiary: #94A3B8 (light slate, for meta text)
Hairline borders: #E5E9F0
Accent blue: #0A5BFF (the only color that isn't a neutral — used sparingly)
Accent blue subtle: #EBF1FF (for hover states, soft fills)
Success green: #0F9D58 (only inside the prototype, for confirmation states)

Typography:

Display & body: Inter (weights 300, 400, 500, 600). One typeface, full stop. No serif. The serif feeling we had before is gone — this version is clean and engineered.
Mono accents: JetBrains Mono (weight 400, 500). Used for labels, meta text, code recipes, and figure captions.
Headline scale: H1 at clamp(56px, 7vw, 88px), letter-spacing -0.03em, weight 300. H2 at clamp(32px, 4vw, 44px), weight 400, letter-spacing -0.02em. H3 at 24px, weight 500. Body at 17px, line-height 1.65. Labels at 11px, letter-spacing 0.18em, uppercase.
No italics for emphasis. Use weight contrast (400 vs 600) instead.

Spacing & rhythm:

Article column max-width 720px, centered.
Full-bleed prototype section can extend to 1180px.
Section padding: 96px top and bottom.
Generous whitespace. Breathe.

Mood:

Think Stripe documentation, Linear product pages, Vercel changelog posts, Anthropic's research blog. Minimal, technical, premium-feeling without being decorative.
Hairline 1px borders. No shadows except a single very subtle one on the prototype window (0 1px 2px rgba(10, 22, 40, 0.04), 0 24px 48px -16px rgba(10, 22, 40, 0.08)).
No gradients anywhere.
No emoji, no icons except a tiny → arrow on buttons.

Page structure
A sticky top bar, then the article in this order:

Hero
Thesis (text only)
The interactive prototype — full working demo embedded inline
The flow walkthrough (text + small annotated mockups)
The system underneath (primitive recipe + 3-brand comparison)
Principles (numbered list)
Honest closing
Footer

1. Top bar
Sticky, white background with subtle backdrop blur. Left: a 24px circular ink-colored avatar with letter "M", followed by the name "Moustafa Abdelmoneim" in 15px weight 500. Right: three text links in mono — "Portfolio", "Email", "LinkedIn" — separated by hairline dots. 1px bottom border.
2. Hero
Top padding 140px. Above the headline, a meta line in mono uppercase: CASE STUDY · SELF-INITIATED · APRIL 2026 · 3-DAY PROTOTYPE, with each segment separated by a small dot.
Headline: "A B2B marketplace that lives inside Claude." — 88px, weight 300, letter-spacing -0.03em. The word "inside" is weight 600 and accent blue (#0A5BFF). Two lines.
Deck below, 22px Inter weight 400, color #5B6B82, max-width 580px:
"In January 2026, MCP Apps shipped. By April, every major SaaS was inside Claude. Almost all of them looked like dev demos. So I built one that didn't."
Below the deck, a credits strip — a 4-column grid with hairline top and bottom borders, 32px vertical padding. Each cell: a mono label (uppercase 11px, color #94A3B8) above a value (15px Inter weight 500). The four cells: Role / Solo design + prototype · Duration / 3 days, weekend build · Output / Working MCP App + design system · Stack / React, mcp-use, Claude Code.
3. Thesis section
Section label in mono blue: 01 / THESIS. H2: "The medium is new. Nobody knows what good looks like yet." The word "new" is the only one in accent blue weight 600.
Three paragraphs of body copy explaining: MCP launched late 2024, MCP Apps extension landed Jan 2026, by April every major SaaS shipped inside Claude/ChatGPT/Gemini, but most looked like 2008-iPhone-era dev demos because designers hadn't caught up. Then a transition: "I wanted to find out what would happen if a designer started from the constraints and worked backward."
End with a pull quote — left-aligned, 28px Inter weight 300, color near-black, with a 3px solid blue left border and 24px left padding:
"What does it look like when a designer — not an engineer — builds for the inside of a conversation?"
One closing paragraph: "I gave myself a weekend, a fictional brief, and a constraint I knew would force interesting decisions: build it for the Middle East market, in Arabic-first identity. RTL-by-default forces every layout decision to be re-examined."
4. THE INTERACTIVE PROTOTYPE — the centerpiece
This is the most important section. Section label: 02 / THE ARTIFACT. H2: "Souqly. Try it." with "Try it." in accent blue weight 600.
One short paragraph: "Below is the working prototype. The catalog is fictional but the interaction model is real — search, browse a vendor, request a quote, see confirmation. It mirrors how the widget would render inside a real Claude conversation."
Then a full-bleed prototype window, 1180px max-width, centered. The window has:
Frame chrome (top bar of the prototype window):

Background #F4F6FA, 1px bottom border #E5E9F0, padding 12px 18px
Three small grey dots on the left (mac-style)
A monospace label centered: claude.ai · /chat · MCP App: souqly
A small toggle on the right: "EN / AR" pill switch (white background, 1px border, blue active state). This is real — clicking it switches the entire prototype to RTL Arabic mode.

Inside the window — a working chat interface that walks through the full flow:
The user begins with a typed query already shown:

"I'm sourcing wholesale coffee for a roastery launch in Riyadh. Looking for ~500kg of single-origin Yemeni beans, Q2 delivery, FOB Jeddah preferred."

(User message: aligned right, soft #EBF1FF blue-tinted bubble, ink text, max 70% width.)
Claude's reply appears below — with a 24px circular ink avatar, a brief paragraph of text "Let me check the Souqly catalog…", then a small monospace tool-call indicator:
▸ souqly_search_products · "yemeni coffee FOB jeddah" (light blue background pill, mono text, tiny green dot at start).
Then the Souqly search-results widget renders inline. The widget itself is on a #FFFFFF background with a 1px #E5E9F0 border and 8px radius, padding 24px.
Widget structure:

Header row: a small Souqly mark (16px square, accent blue, white "S" inside), wordmark "Souqly" in 15px weight 600, then a tiny mono pill "WHOLESALE · MENA". On the right (in the EN view only), a one-line italic-feeling 13px attribution: "Showing: 500kg Yemeni coffee, FOB Jeddah".
Below header, a count: "3 matching vendors" in 18px weight 500. The "3" is in accent blue. To the right, mono text: SORTED BY RELEVANCE.
Three vendor cards stacked vertically. Each card is white with a 1px border, 6px radius, 16px padding, 14px gap between cards. Hovering raises border opacity and adds a subtle 1px upward translate.

Each card layout (left to right):

A 96×96 square block on the left with a subtle blue gradient (#EBF1FF → #FFFFFF) and the vendor's region name in dark blue weight 500 (e.g. "Haraz", "Bani Matar", "Ismaili"). No photos — keep it minimal and typographic.
The card body on the right has: vendor name in 16px weight 600 ink, location pill in mono SANAA · YEMEN (small, light blue background), a description line in 13px secondary ink, then a 3-column metric strip with hairline top/bottom borders showing MOQ / Lead time / Price per kg. Metric labels in mono uppercase 10px tertiary color, values in 15px weight 500. The price value is in accent blue.
Below the metric strip: two buttons side by side. Primary "Request quote →" (ink background, white text, 6px radius, 13px weight 500). Secondary "Profile" (transparent, 1px border, ink text). On the far right of the actions row, two tiny mono cert chips: HALAL, ORG.

Vendors and data to render:

Bin Hamza Trading Co. — Sanaa, Yemen — Haraz mountain green beans · natural · grade A — MOQ 100kg · Lead 14–21 days · SAR 168/kg — certs Halal, Organic
Al-Matari Coffee Estate — Sanaa, Yemen — Bani Matar single-estate · washed · specialty — MOQ 250kg · Lead 21–28 days · SAR 214/kg — cert SCA 87+
Mokha Heritage Exports — Hodeida, Yemen — Ismaili heirloom · sun-dried natural · grade A+ — MOQ 60kg · Lead 10–14 days · SAR 142/kg — cert FOB Jeddah

After the widget, Claude's final text appears: "Three vendors match. Bin Hamza is the closest fit. Want their full profile?"
Make this prototype actually interactive:

Clicking the "Profile" button on any card transitions the widget to a vendor-detail view (state 2): keeps the same header, replaces the card list with a single panel showing the vendor's name as 28px weight 500, a paragraph of story copy in italic-feeling 15px secondary text styled as a left-bordered quote, a 3-stat row (Annual capacity · Active markets · FOB ports), and a list of 3 product rows with prices. Add a "← Back to results" link in mono at the top.
Clicking "Request quote →" on any card transitions to a quote-form view (state 3): a clean 2-column form with quantity stepper (− / 500 kg / +), delivery week input, FOB port input, incoterms chip group (FOB selected, CIF, EXW), notes textarea full-width, then a "summary" row in light blue background showing "Estimated total: SAR 84,000 + shipping", then a "Send request →" primary button.
Clicking "Send request" transitions to a confirmation state (state 4): a centered success state with a 56px green circle containing a checkmark, a headline "Quote request sent." (the "sent." in accent blue weight 600), a 2-line subtitle explaining the vendor typically responds in 4 hours, and a mono request ID REQ-2026-04-26-A8C2.
The EN/AR toggle in the chrome switches the entire widget to right-to-left, swaps the typography to IBM Plex Sans Arabic (load it from Google Fonts), and translates all UI strings. Keep numerals as Arabic-Indic (٥٠٠ instead of 500). The user's chat bubble and Claude's reply also translate.

This entire section is the page's beating heart. It must work. State transitions should have a 200ms ease-out fade.
Caption below the prototype window in mono uppercase 11px tertiary: FIG. 1 — FULL FOUR-STATE FLOW. SEARCH → PROFILE → QUOTE → CONFIRMATION.
5. The flow walkthrough section
Section label: 03 / THE FLOW. H2: "One conversation. Four states. No tabs." ("Four" in accent blue weight 600.)
A few paragraphs explaining the principle: every state lives inline, no redirects, no second login. The only moment that breaks out is final payment authorization, which is a deliberate trust boundary.
6. The system underneath section
Section label: 04 / THE SYSTEM. H2: "Behind every widget: a small alphabet of primitives." ("alphabet" in accent blue weight 600.)
Two paragraphs explaining that the real architectural work was finding the smallest possible vocabulary — about 20 anatomical primitives like card, list-item-row, metric-strip, title-block, action-group — that compose into anything.
Then a primitive recipe block: a #0A1628 ink-background card, 28px padding, 8px radius. Inside, a label in mono VENDOR CARD · PRIMITIVE RECIPE (light blue), then a recipe shown as monospace text where each primitive name is highlighted as a small accent-blue chip:
[card] → contains [hero-cover] + [title-block] + [metric-strip] (×3) + [action-group] + [status-pill] (×N)
(Each [bracketed] token is a tiny rounded chip with #0A5BFF background, white text, 11px mono.)
Then a paragraph: this same recipe also produces a flight card, a hotel listing, a podcast row, an Airbnb result, a Spotify song row. Same alphabet, different sentences.
Three-brand comparison subsection
H3: "Same component. Three brands."
A 3-column grid of small comparison cards, 1180px max-width:
Each comparison cell is a white card with 1px border. Top: a small brand strip with a colored mark, brand name, and category in mono. Below: a miniature version of a search-result card rendered in that brand's style. Below the card: a mono caption describing the feel.
The three brands:

Turkish Airlines (mark TK in red #E81932, sharp 4px radius, Inter 600). Card shows a flight: Istanbul → Riyadh, Boeing 777, departs 08:45, 3h 50m, SAR 1,840. Buttons "Select flight" / "Details". Caption: SHARP · COMMERCIAL · 4PX RADIUS · RED SIGNATURE.
Souqly (mark S in our accent blue, 9px radius, Inter 500). Show the Bin Hamza vendor card from earlier. Caption: EDITORIAL · REFINED · 9PX RADIUS · OXBLOOD.
Hala (a fictional Saudi food delivery brand, mark H in green #0F9D58, 14px radius, Inter 700). Card shows a restaurant: Najd Village, Saudi traditional, 25–35 min arrives, SAR 50 min order, ★ 4.8. Buttons "Order now" / "Menu". Caption: PLAYFUL · WARM · 14PX RADIUS · GREEN ACCENT.

After the three cards, one paragraph: this is what a design system actually buys you — infinite expressivity from a small alphabet. New clients don't expand the system. They map their identity into existing token slots.
7. Principles section
Section label: 05 / PRINCIPLES. H2: "What doesn't bend across clients." ("doesn't" in accent blue weight 600.)
A numbered list, full-width article column. Each principle is a row: a 60px-wide column with a mono number 01, 02, 03, etc. in tertiary color, then the body. The body has a 22px weight 500 ink heading and a 15px secondary-color paragraph.
The five principles, exactly:

Inline, never modal. Every state lives in the conversation. Auth and payment may pop out to verified surfaces, but anything that could happen in chat does happen in chat.
The trust moment is uncustomizable. Confirmation states, payment summaries, contract previews, consent flows. Brands skin them. They don't redesign them.
RTL is a first-class citizen. Every component ships with mirrored layouts, Arabic-Indic numerals, and bilingual typography mappings.
Three densities, no improvisation. Compact, default, comfortable. Clients pick one. Components handle the rest.
Accessibility is the floor, not a feature. WCAG AA contrast enforced at the token layer. Brands cannot ship a palette that fails.

Each row separated by a 1px hairline border.
8. Honest closing section
A full-width inverted block: #0A1628 ink background, #FAFBFC text, 12px radius, 56px padding. Max-width matches the article column.
Top: small mono label in accent-blue-light: A NOTE ABOUT WHAT THIS IS.
H3 in 32px weight 400: "It's a prototype. That's the whole point." ("the whole point" in accent blue weight 600.)
Three paragraphs in 16px Inter weight 400, color rgba(250, 251, 252, 0.78), line-height 1.65:
Para 1: "Souqly isn't a real product. The vendors don't exist. The catalog is sample data. The quote button doesn't actually email anyone. I built it in three days, alone, on a weekend, because I wanted to think through a problem I find interesting — and the only way I know how to think about design is by building."
Para 2: "What's real: the design language, the system architecture, the primitive vocabulary, the bilingual identity, the four-state conversation flow, and the underlying question — what should AI-native commerce design feel like when a designer starts from the constraints?"
Para 3: "That last question is the one I'd want to spend the next year answering. Souqly is the first sketch of an answer. Everything else — the polished case study, the working demo, the system spec, the principles — is just evidence that I'm already inside the problem."
Below, a small line: "Source code and deployment notes: github.com/moustafa/souqly-mcp" — the GitHub URL is an accent-blue link.
9. Footer
After the closing block, leave 80px of breathing room. Then a 1px top border, padding 56px top.
Two columns:

Built by column: name "Moustafa Abdelmoneim" in 22px weight 500. Tagline below in 14px secondary: "Multidisciplinary designer working across product, brand, and motion. Currently lead designer at a B2B marketplace startup. Based in Istanbul."
Elsewhere column: stacked text links — Portfolio, Email, LinkedIn, GitHub. Each link 14px weight 400, ink color, hairline bottom border, hover state turns accent blue.

Bottom meta strip at 24px above page bottom: a single thin line with mono uppercase text on left "SOUQLY · CASE STUDY · v0.1" and on right "APRIL 2026 · ISTANBUL".
Interactivity requirements
The most important parts of this build are:

The prototype window must work. Clicking buttons transitions through search → profile → quote form → confirmation. Use real state transitions with smooth 200ms fades.
The EN/AR toggle must actually flip the entire prototype to RTL with proper Arabic typography (IBM Plex Sans Arabic for UI, keep numbers as Arabic-Indic numerals).
The page is responsive. On mobile, the 3-brand comparison stacks to a single column, the prototype window remains usable, and the credits strip becomes 2×2.

What this is NOT
Don't add hero photography. Don't add gradients. Don't add multiple accent colors. Don't decorate. Don't add icons beyond the small → arrow on buttons. Don't make it feel like a startup landing page. It should feel like a research paper that happens to have a working app embedded in it.