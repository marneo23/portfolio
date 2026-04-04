# Portfolio Spec — PATCH: Texture Fixes

> The previous addendum introduced texture layers but had implementation issues. This patch fixes them. Apply these changes to the current codebase.

---

## What's Wrong Right Now

1. **The grain/noise is invisible.** Opacity values were way too low (`0.035`, `0.04`) and there are two overlapping grain layers (`body::before` AND `.grain-overlay`) fighting each other. The result: muddy, imperceptible noise that adds nothing.
2. **The crosshatch background pattern is invisible.** `rgba(255,255,255,0.008)` is functionally zero on a dark background. Wasted code.
3. **The CSS halftone doesn't produce halftone.** A uniform dot grid overlaid on an image creates a screen-door effect, not variable-size halftone dots. It looks like a mesh filter, not a zine print.
4. **SVG `feTurbulence` filters on tags are a performance problem.** Displacement maps trigger software rendering. With 30+ tags on screen, this tanks scroll performance, especially mobile.
5. **No rules for how texture interacts with text readability.**
6. **No guidance on interactive/scroll texture behavior.** The site feels like a flat image with buttons on top.
7. **Torn-edge divider SVG was never provided.** Agent likely skipped it or made something too clean.

---

## Fix 1: Single Grain Overlay (Replace Both Existing Ones)

**Remove:** `body::before` noise overlay AND the `.grain-overlay` element. Replace with ONE layer.

The key problem was opacity. The references have texture you can see from across the room. Start aggressive, dial back only if readability suffers.

```css
/* DELETE any existing body::before noise and .grain-overlay rules */

/* ONE grain layer — this is the only noise overlay on the page */
.grain {
  position: fixed;
  inset: -15%;
  z-index: 9999;
  pointer-events: none;
  background-image: url('/textures/noise-512.png');
  background-repeat: repeat;
  background-size: 180px 180px;
  mix-blend-mode: overlay; /* NOT screen — overlay adds texture to midtones without washing out light text */
  opacity: 0.12; /* START HERE. This should be clearly visible. Adjust down only if body text becomes hard to read. */
  animation: grain-shift 0.8s steps(2) infinite;
  will-change: transform;
}

@keyframes grain-shift {
  0%   { transform: translate(0, 0); }
  50%  { transform: translate(-3%, -2%); }
  100% { transform: translate(0, 0); }
}
```

**Why these changes:**
- `mix-blend-mode: overlay` instead of `screen` — overlay darkens darks and lightens lights, adding visible grit to the dark background without fogging up light-colored text
- `opacity: 0.12` instead of `0.04` — three times more visible. This is the single biggest fix. If it still looks too subtle, go to `0.18`.
- `0.8s steps(2)` instead of `8s steps(4)` — faster, more aggressive flicker. Feels like a projector or photocopier pulse, not a slow ambient drift.
- Smaller `background-size: 180px` — makes the grain finer / denser, more like actual paper tooth

**Mobile:**
```css
@media (prefers-reduced-motion: reduce) {
  .grain { animation: none; }
}

@media (max-width: 768px) {
  .grain {
    opacity: 0.08;
    animation-duration: 1.2s;
  }
}
```

---

## Fix 2: Visible Crosshatch Background

The previous crosshatch at `0.008` opacity was invisible. Replace:

```css
/* On sections that need a paper-stock feel (About, Contact, etc.) */
.surface-crosshatch {
  background-color: var(--bg-primary);
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 3px,
      rgba(255, 255, 255, 0.03) 3px,
      rgba(255, 255, 255, 0.03) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 3px,
      rgba(255, 255, 255, 0.03) 3px,
      rgba(255, 255, 255, 0.03) 4px
    );
}
```

`0.03` is almost 4x the previous value. It should be *barely* visible — like you're noticing the weave of the paper if you look, but it's not distracting. If it's still invisible on your monitor, go to `0.05`.

---

## Fix 3: Real Halftone Image Processing

**Remove** any CSS-only halftone approach (the `radial-gradient` dot overlay). It doesn't work for this aesthetic.

**Implement a build-time halftone script.** This is a complete, working implementation — not pseudocode:

```js
// scripts/halftone.js
// Usage: node scripts/halftone.js input.jpg output.png [dotSize] [contrast]
// Example: node scripts/halftone.js hero.jpg hero-halftone.png 5 1.4

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const [,, inputPath, outputPath, dotSizeArg, contrastArg] = process.argv;
const DOT_SIZE = parseInt(dotSizeArg) || 5;    // px — grid cell size. Smaller = finer detail.
const CONTRAST = parseFloat(contrastArg) || 1.4; // boost before halftoning

async function halftone() {
  const img = await loadImage(inputPath);
  const { width, height } = img;

  // Step 1: Draw source image, desaturate, boost contrast
  const srcCanvas = createCanvas(width, height);
  const srcCtx = srcCanvas.getContext('2d');
  srcCtx.filter = `grayscale(1) contrast(${CONTRAST})`;
  srcCtx.drawImage(img, 0, 0);
  const srcData = srcCtx.getImageData(0, 0, width, height);

  // Step 2: Draw halftone dots on black canvas
  const outCanvas = createCanvas(width, height);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#000000';
  outCtx.fillRect(0, 0, width, height);
  outCtx.fillStyle = '#FFFFFF';

  const cols = Math.ceil(width / DOT_SIZE);
  const rows = Math.ceil(height / DOT_SIZE);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * DOT_SIZE + DOT_SIZE / 2;
      const cy = row * DOT_SIZE + DOT_SIZE / 2;

      // Sample average brightness in this cell
      let total = 0;
      let count = 0;
      for (let dy = 0; dy < DOT_SIZE && (row * DOT_SIZE + dy) < height; dy++) {
        for (let dx = 0; dx < DOT_SIZE && (col * DOT_SIZE + dx) < width; dx++) {
          const px = ((row * DOT_SIZE + dy) * width + (col * DOT_SIZE + dx)) * 4;
          total += srcData.data[px]; // R channel (already grayscale)
          count++;
        }
      }

      const brightness = total / count / 255; // 0 = black, 1 = white
      const radius = ((1 - brightness) * DOT_SIZE) / 2; // darker = bigger dot

      if (radius > 0.3) {
        outCtx.beginPath();
        outCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        outCtx.fill();
      }
    }
  }

  // Step 3: Write output
  const buffer = outCanvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Halftoned: ${outputPath} (${cols}x${rows} dots, size ${DOT_SIZE}px)`);
}

halftone().catch(console.error);
```

**Install dependency:** `npm install canvas`

**Run for each project thumbnail:**
```bash
node scripts/halftone.js public/images/projects/project1.jpg public/images/projects/project1-halftone.png 5
node scripts/halftone.js public/images/projects/project2.jpg public/images/projects/project2-halftone.png 5
# ... etc
```

**Dot size guide:**
- `3` — fine halftone, subtle, newspaper-like
- `5` — classic zine / screenprint feel (start here)
- `8` — bold, pop-art, dots clearly visible from distance (like Reference B)

**For the posterized/stencil look** (project thumbnails that should look like Reference C instead of halftone):
```bash
# Using ImageMagick (simpler for one-off processing)
convert input.jpg -colorspace Gray -threshold 50% output.png
```

Or with Sharp in Node:
```js
const sharp = require('sharp');
sharp('input.jpg')
  .greyscale()
  .threshold(128)
  .toFile('output.png');
```

**Use both techniques across the site** — some project images get halftone (Reference B), others get posterized (Reference C). Mixing them creates visual variety while staying in the same world.

---

## Fix 4: Remove SVG Filters from Tags (Performance)

**Remove** any `filter: url(#roughen)` from `.tech-tag` and from any element that appears more than 3 times on screen.

**Keep the `feTurbulence` roughen filter ONLY on:**
- Section titles (2–4 elements total)
- The hero name

**For tags, replace with rotation-only roughness:**
```css
.tech-tag {
  border: 1.5px solid currentColor;
  border-radius: 0;
  padding: 2px 8px;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  /* Randomized rotation via inline --r custom property */
  transform: rotate(calc(var(--r, 0) * 1deg));
  transition: transform 0.15s ease;
}

.tech-tag:hover {
  transform: rotate(calc(var(--r, 0) * 1deg + 1.5deg)) scale(1.05);
  color: var(--accent-hot);
  border-color: var(--accent-hot);
}
```

**In JSX, assign random rotation per tag:**
```jsx
{techs.map((tech, i) => (
  <span
    key={tech}
    className="tech-tag"
    style={{ '--r': (Math.sin(i * 7.3) * 2.5).toFixed(2) }}
    // Deterministic pseudo-random: same rotation on every render
    // Range: roughly -2.5 to +2.5 degrees
  >
    {tech}
  </span>
))}
```

This gives the hand-placed feel without any SVG filter cost. The `Math.sin(i * 7.3)` trick produces a repeatable pseudo-random sequence so tags don't jump on re-render.

---

## Fix 5: Text Readability Through Texture

**Problem:** Grain overlay at higher opacity could interfere with body text.

**Solution — z-index stacking that protects text:**

```
z-index: 9999  — grain overlay (pointer-events: none)
z-index: 10    — navigation bar (if sticky)
z-index: 1     — content (text, cards, etc.)
z-index: 0     — background textures (crosshatch, imagery)
```

The grain sits on top of everything — this is intentional, it should affect text *slightly* (that's the printed feel). But because we're using `mix-blend-mode: overlay` instead of `screen`, light text on dark backgrounds stays crisp. The grain mainly affects mid-tones and the dark background itself.

**Test this:** Render a paragraph of body text and zoom to 100%. If individual characters are hard to distinguish, reduce grain opacity by 0.02 increments. The floor is `0.06` — below that it's invisible again.

**Additional safety: exempt the contact form.**
```css
.contact-form {
  position: relative;
  z-index: 10000; /* sits above grain */
  /* Form inputs must be perfectly readable — no grain interference */
}
```

Wait — this won't work because the grain has `pointer-events: none` but stacking context might clip. Instead, ensure input text has strong contrast:
```css
.contact-form input,
.contact-form textarea {
  color: var(--text-primary);
  background: var(--bg-secondary);
  /* Strong explicit colors that hold up under grain overlay */
  text-shadow: 0 0 1px rgba(0,0,0,0.5); /* very subtle shadow to anchor text */
}
```

---

## Fix 6: Interactive Texture Behavior

Static texture = wallpaper. The textures need to *respond* to make the site feel alive.

**6a. Project card hover — halftone density shift:**
```css
.project-card img {
  filter: contrast(1.2) brightness(0.9);
  transition: filter 0.3s ease;
}

.project-card:hover img {
  filter: contrast(1.6) brightness(1.1);
  /* On hover, the halftoned image gets punchier — dots become more defined */
}
```

**6b. Scroll-driven parallax on background textures:**

If using Framer Motion:
```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

function CrosshatchBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <motion.div
      className="surface-crosshatch"
      style={{
        position: 'fixed',
        inset: '-10%',
        zIndex: 0,
        backgroundPosition: y, // crosshatch pattern drifts slightly on scroll
      }}
    />
  );
}
```

This makes the crosshatch underlay move at a different rate than content — like the paper stock is a separate physical layer from the ink printed on it.

**6c. Section entry — grain burst:**

When a new section scrolls into view, briefly pulse the grain opacity up then back down:
```jsx
// In each section component
import { useInView } from 'framer-motion';

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      // Pulse grain overlay opacity: 0.12 → 0.22 → 0.12 over 400ms
      const grain = document.querySelector('.grain');
      if (grain) {
        grain.style.transition = 'opacity 0.2s ease';
        grain.style.opacity = '0.22';
        setTimeout(() => {
          grain.style.opacity = '0.12';
        }, 200);
      }
    }
  }, [isInView]);

  return <section ref={ref}>{children}</section>;
}
```

This creates a brief "ink flash" — like a printing press stamping — each time you scroll to a new section. Subtle but it makes the texture feel alive rather than wallpaper.

---

## Fix 7: Actual Torn-Edge Divider

The previous addendum referenced a `torn-edge.svg` that was never provided. Here's actual path data the agent can use:

```html
<!-- torn-edge-divider.svg — save to public/textures/ -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 50" preserveAspectRatio="none">
  <path d="M0,25 Q15,8 30,22 Q50,38 75,18 Q95,5 120,28 Q140,42 165,15
    Q185,3 210,30 Q230,45 255,20 Q275,8 300,32 Q320,40 345,12
    Q365,2 390,26 Q415,42 440,18 Q460,6 485,28 Q510,44 535,14
    Q555,4 580,30 Q600,38 625,22 Q645,10 670,34 Q690,46 715,16
    Q735,2 760,24 Q780,40 805,20 Q825,8 850,32 Q870,44 895,14
    Q920,2 945,28 Q965,42 990,18 Q1010,6 1035,30 Q1055,40 1080,22
    Q1100,10 1125,34 Q1145,46 1170,16 Q1190,8 1200,25
    L1200,50 L0,50 Z"
    fill="currentColor"
  />
</svg>
```

**Usage as section divider:**
```css
.section-divider-torn {
  width: 100%;
  height: 30px;
  color: var(--bg-primary); /* fill color matches next section background */
  overflow: hidden;
}

.section-divider-torn svg {
  width: 100%;
  height: 100%;
}
```

Or as a CSS mask on the section itself:
```css
.section-with-torn-top {
  mask-image: url('/textures/torn-edge-divider.svg');
  mask-position: top;
  mask-size: 100% 30px;
  mask-repeat: no-repeat;
  mask-composite: exclude;
  /* Caution: mask-composite support varies — test in target browsers */
}
```

**Simpler alternative** — inline SVG `clip-path` that doesn't require an external file:
```css
.section-divider-torn {
  height: 30px;
  background: var(--bg-secondary);
  clip-path: polygon(
    0% 60%, 2% 30%, 5% 70%, 8% 25%, 11% 55%, 14% 20%,
    17% 65%, 20% 35%, 23% 75%, 26% 15%, 29% 50%, 32% 30%,
    35% 70%, 38% 20%, 41% 60%, 44% 35%, 47% 80%, 50% 25%,
    53% 55%, 56% 15%, 59% 65%, 62% 40%, 65% 75%, 68% 20%,
    71% 50%, 74% 30%, 77% 70%, 80% 25%, 83% 55%, 86% 15%,
    89% 60%, 92% 35%, 95% 75%, 98% 20%, 100% 50%,
    100% 100%, 0% 100%
  );
}
```

This is fully self-contained CSS — no external assets, no SVG files to manage. Recommended as the default approach.

---

## Summary: What to Do

| # | Action | Priority |
|---|--------|----------|
| 1 | Delete both existing grain layers, add the single `.grain` from Fix 1 | **Critical** — this is why the texture is invisible |
| 2 | Bump crosshatch opacity from `0.008` to `0.03` (Fix 2) | High |
| 3 | Remove CSS dot-grid halftone, run `halftone.js` on all project images (Fix 3) | High |
| 4 | Remove `feTurbulence` filter from tags, keep only on section titles. Use rotation-only tags (Fix 4) | Medium |
| 5 | Add `text-shadow` anchor on form inputs (Fix 5) | Medium |
| 6 | Add hover contrast shift on cards, scroll parallax on crosshatch, grain burst on section entry (Fix 6) | Medium |
| 7 | Add torn-edge divider using `clip-path` approach (Fix 7) | Low — try generous spacing first |

**Test checklist after applying:**
- [ ] Grain is clearly visible on a standard laptop screen at normal brightness
- [ ] Body text is still crisp and readable through the grain
- [ ] Project images look like they were printed in a zine, not like screenshots with a filter
- [ ] Tags don't cause scroll jank on mobile
- [ ] Hovering a project card produces a visible change in the halftoned image
- [ ] Scrolling between sections feels layered, not flat

---

*Apply in order. Test after each fix. The grain opacity (Fix 1) will make the biggest immediate difference — if only one thing gets done, make it that.*
