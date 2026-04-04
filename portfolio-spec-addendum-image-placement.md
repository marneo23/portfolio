# Portfolio Spec — ADDENDUM: Image Placement ("Wheat-Pasted Wall")

> Strategy for integrating atmospheric imagery into the portfolio as environmental backdrop. These images are NOT content — they are texture, mood, and depth. They live behind or beside content like posters layered on a wall.

---

## The Principle

Imagine a concrete wall in an alley. Someone wheat-pasted a poster of the skull illustration months ago. It's faded, partially torn, partially covered by newer flyers. Then someone slapped a high-contrast cat sticker next to it. Then it rained. Then someone stapled a show flyer (your actual content) on top of all of it.

That's the visual hierarchy:

```
FRONT:   Your name, your text, your project cards — crisp, readable, dominant
MIDDLE:  Grain overlay, decorative marks
BACK:    The atmospheric images — faded, cropped, partially hidden, bleeding off edges
```

The images should feel **discovered**, not presented. A visitor should notice them after a second or two, not immediately. They reward attention without demanding it.

---

## Placement Map

```
┌──────────────────────────────────────────────────────┐
│  HERO SECTION                                        │
│                                                      │
│  ┌─────────────────┐                                 │
│  │ Cats collage     │ ← bleeds off left edge,        │
│  │ (Reference C)    │   HIGHER opacity than others,   │
│  │ bold shapes      │   covers left 40% of viewport   │
│  └─────────────────┘                                 │
│              YOUR NAME ← stamped on top, right-heavy  │
│              Full-Stack Developer                     │
│                                                      │
├──────────────────────────────────────────────────────┤
│  ABOUT SECTION                                       │
│                                                      │
│  (no atmospheric image — keep clean for readability)  │
│                                                      │
├──────────────────────────────────────────────────────┤
│  PROJECTS SECTION                                    │
│                                                      │
│                        ┌──────────────┐              │
│  [card] [card]         │ Halftone      │ ← right      │
│  [card] [card]         │ abstract      │   margin,     │
│  [card] [card]         │ (Reference B) │   bleeds off  │
│                        │ very faded    │   right edge  │
│                        └──────────────┘              │
│                                                      │
├──────────────────────────────────────────────────────┤
│  CONTACT SECTION                                     │
│                                                      │
│  ┌────────────────────────────────────┐              │
│  │ Skull/Hands (Reference A)           │ ← centered   │
│  │ crosshatch texture, faded behind   │   behind the  │
│  │ the contact form, slow reveal       │   form area   │
│  └────────────────────────────────────┘              │
│         [ form fields on top ]                       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Image-by-Image Implementation

### Image 1: Cats Collage (Posterized) → Hero Background

This is the image with the most immediate visual punch — pure black and white, bold stencil-cut shapes, multiple subjects creating visual density. It belongs in the hero because you want **impact on arrival**.

**Positioning:** Left-aligned, bleeding off the left edge of the viewport. Cropped so roughly 60–70% of the image is visible. Vertically centered in the hero section.

**Treatment:**
```css
.hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.hero-backdrop {
  position: absolute;
  top: 50%;
  left: -5%;                 /* bleeds off left edge */
  transform: translateY(-50%);
  width: 55%;                /* covers left portion of viewport */
  max-width: 750px;
  height: auto;
  opacity: 0.12;             /* HIGHER than other placements — this one should hit */
  mix-blend-mode: lighten;   /* white shapes glow on dark bg, black disappears */
  pointer-events: none;
  user-select: none;
}
```

**Why `opacity: 0.12` (not the `0.04–0.07` used elsewhere):** You said you want impact. The cats image is pure black and white with no fine detail to get muddy — it stays readable at higher opacity. The bold shapes (cat silhouettes, faces) are immediately recognizable even at low contrast. Start at `0.12`, and if you want more punch go up to `0.18`. The image should be **the first thing visitors notice** alongside your name — not a subtle discovery.

**This changes the "discovered not presented" rule for this one placement only.** The hero is the one section where the atmospheric image earns co-star billing with your content. The other two images (projects, contact) stay ghosted and subtle.

**Content layout adjustment:** Push your name and tagline toward the right 60% of the hero so the cats have room on the left. The composition becomes: graphic art on the left, your identity on the right.

```css
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin-left: auto;         /* pushes content right */
  margin-right: 10%;
}
```

**Scroll behavior — fade out as you leave the hero:**
```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

function HeroBackdrop() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '-15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.12, 0]);

  return (
    <motion.img
      src="/images/atmosphere/cats-posterized.png"
      alt=""
      role="presentation"
      className="hero-backdrop"
      style={{ y, opacity }}
    />
  );
}
```

The cats fade out as you scroll past the hero — they don't follow you. This keeps the About section clean and makes the hero feel like a distinct, punchy opening moment.

**Optional enhancement — staggered reveal on page load:**

Instead of the cats being visible immediately, have them "stamp in" 300ms after the page loads, slightly after your name appears:

```jsx
function HeroBackdrop() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '-15%']);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <motion.img
      src="/images/atmosphere/cats-posterized.png"
      alt=""
      role="presentation"
      className="hero-backdrop"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 0.12, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      style={{ y, opacity: scrollOpacity }}
    />
  );
}
```

The slight scale-down (1.05 → 1.0) mimics a poster being slapped onto the wall.

---

### Image 2: Halftone Abstract → Projects Section Margin

This image is softer and more abstract (dot pattern, no hard subject). It works as ambient fill beside the project grid.

**Positioning:** Right side, bleeding off the right edge. Sits alongside the project cards but behind them. Vertically spans most of the projects section.

**Treatment:**
```css
.projects-section {
  position: relative;
  overflow: hidden;
}

.projects-backdrop {
  position: absolute;
  top: 10%;
  right: -15%;              /* bleeds significantly off right edge */
  width: 45%;
  max-width: 550px;
  height: auto;
  opacity: 0.04;            /* very faint — this is the most subtle placement */
  mix-blend-mode: lighten;
  pointer-events: none;
  user-select: none;
  transform: rotate(3deg);  /* slight tilt, like a poster pasted at an angle */
}
```

**Why so faint (`0.04`):** The projects section has the most content density — cards, thumbnails, tags, descriptions. The backdrop image must not compete. It's there for people who scroll slowly and notice it. Think of it as the oldest, most faded poster on the wall, half-covered by newer ones (your project cards).

**Alternative position if right-bleed feels crowded:**
Place it between the last row of project cards and the next section — partially overlapping both, like a poster that spans two layers of the wall.

---

### Image 3: Skull/Hands (Crosshatch) → Contact Section Background

The skull/hands image is dense with fine crosshatch detail — the opposite of the bold cats. It works as a slow-burn discovery: the intricate linework rewards close looking, which is exactly what someone does when they pause to fill out a contact form.

**Positioning:** Centered behind the contact form area. Full width of the form container, not full viewport width.

**Treatment:**
```css
.contact-section {
  position: relative;
  overflow: hidden;
}

.contact-backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 650px;
  height: auto;
  opacity: 0.06;
  mix-blend-mode: lighten;
  pointer-events: none;
  user-select: none;
}
```

**Why the skull works here:** The crosshatch texture is almost abstract at low opacity — it reads as atmosphere, not as a specific image. Someone filling out your form will gradually notice the linework emerging behind the fields. It creates an intimate, detailed moment at the end of the page that contrasts with the bold, immediate cats at the top. The journey goes: loud → functional → quiet → textured.

**Enhancement — reveal on scroll:**

Start the image invisible and fade it in as the user scrolls to the contact section.

```jsx
import { useInView, motion } from 'framer-motion';

function ContactBackdrop() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <motion.img
      ref={ref}
      src="/images/atmosphere/skull-crosshatch.png"
      alt=""
      role="presentation"
      className="contact-backdrop"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 0.06 } : {}}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    />
  );
}
```

The slow fade-in (1.5s) feels like the linework materializing out of the dark paper — like your eyes adjusting to see marks on a wall you initially walked past.

---

## Image Preparation

Before placing these images, process them to work as backdrops:

```bash
# All images should be white-on-transparent or white-on-black
# so mix-blend-mode: lighten works correctly

# For the cats (hero — high impact, needs clean edges):
# Already high-contrast b&w. Ensure a hard threshold for maximum punch:
convert cats.jpg -colorspace Gray -threshold 45% cats-clean.png

# For the halftone abstract (projects — may be black dots on white):
# INVERT it — you want white dots on black/transparent
convert halftone-abstract.jpg -negate -colorspace Gray halftone-abstract-inverted.png

# For the skull/hands (contact — already white linework on black):
# Just ensure it's high-res enough. Minimum 1200px wide.

# OPTIONAL: Convert black backgrounds to transparent
# This lets mix-blend-mode work more cleanly
convert cats-clean.png -fuzz 15% -transparent black cats-alpha.png
convert skull-crosshatch.png -fuzz 15% -transparent black skull-crosshatch-alpha.png
```

**File format:** Use PNG with transparency if possible (better blend mode results). WebP for smaller file size if transparency isn't needed. Never JPEG for these — compression artifacts ruin the crisp linework.

**File sizes to target:** Keep each image under 200KB. These are decorative, they don't need to be ultra-sharp. Slight softness from compression actually helps the "faded poster" feel.

---

## Opacity Tuning Guide

The hero image (cats) is intentionally louder than the other two. Here's the hierarchy:

| Placement | Starting Opacity | Range | Intent |
|-----------|-----------------|-------|--------|
| Hero (cats) | `0.12` | `0.10 – 0.20` | **Impact.** Noticed immediately. Co-stars with your name. |
| Projects (halftone) | `0.04` | `0.03 – 0.07` | **Ambient.** Noticed on second pass, doesn't compete with cards. |
| Contact (skull) | `0.06` | `0.04 – 0.09` | **Discovery.** Emerges while filling out the form. Rewards attention. |

**Test method:** Open the site, look at each section for 3 seconds. The hero backdrop should be immediately visible. The projects backdrop should be barely there. The contact backdrop should feel like it appeared while you were reading. If the hero image doesn't register within the first second, increase opacity. If the projects image pulls your eye away from the cards, decrease it.

---

## Do NOT

- **Don't put atmospheric images in every section.** About section stays clean. Having one section without backdrop imagery creates breathing room and makes the other placements more impactful.
- **Don't tile or repeat these images.** One placement each, one time. Tiling destroys the "found art" quality.
- **Don't match image placement symmetrically.** Hero = left bleed, Projects = right bleed, Contact = centered. The asymmetry across sections mimics how real posters accumulate on walls — randomly, not in a grid.
- **Don't animate the images continuously.** No rotation, no pulsing, no floating. They are *stuck to the wall*. The only motion should be parallax drift and fade-in on scroll entry. The wall doesn't move — you move past it.
- **Don't add more images later without removing one.** Three is the ceiling. If you find a fourth image you love, it replaces one of these — it doesn't join them. More than three backdrops and the wall becomes noisy.

---

*Three images. Three sections. Each one faded, cropped, bleeding off an edge. Discovered, not presented. The wall was here before the content — the content was pinned on top.*
