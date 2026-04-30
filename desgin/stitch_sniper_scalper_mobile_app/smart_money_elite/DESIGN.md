# Design System: High-End Trading Editorial

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Institutional Archive**. In the world of Smart Money Concepts (SMC), clarity, precision, and authority are paramount. We are moving away from the cluttered, neon-drenched aesthetic of "retail trading" apps and toward a sophisticated, editorial experience that mirrors the tools used by high-frequency institutional desks.

This system breaks the traditional "box-and-grid" template through **intentional asymmetry** and **tonal depth**. We use high-contrast typography scales—pairing the geometric authority of `Space Grotesk` with the clinical readability of `Inter`—to create a sense of hierarchy that feels curated rather than generated. By overlapping glassmorphic layers and utilizing deep charcoal washes, the UI feels like a physical instrument of precision.

## 2. Colors & Surface Philosophy
The palette is rooted in a "Deep Space" environment. We use `surface` (#131313) as our canvas, allowing high-chroma signals to emerge with maximum visual impact.

### Surface Hierarchy & Nesting
To achieve a premium feel, we prohibit a flat UI. We treat the interface as a series of nested physical layers:
*   **The Canvas:** `surface` (#131313).
*   **The Primary Container:** `surface_container_low` (#1B1B1B) for large content blocks.
*   **The Inset/Action Area:** `surface_container_high` (#2A2A2A) for interactive cards or data modules.
*   **Floating Elements:** `surface_bright` (#393939) with 60% opacity and a 20px backdrop blur to create glassmorphism.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off the UI. Separation must be achieved through:
1.  **Background Shifts:** Placing a `surface_container_lowest` (#0E0E0E) card on a `surface_container` (#1F1F1F) background.
2.  **Shadow Depth:** Using ambient, low-opacity glows.
3.  **Vertical Rhythm:** Generous use of white space to define boundaries.

### Signature Textures
Main Call-to-Actions (CTAs) and success signals should utilize the **"Signal Gradient"**:
*   **Bullish/Primary:** A linear gradient from `primary` (#FFB77D) to `primary_container` (#FF8C00).
*   **Bearish/Error:** A linear gradient from `tertiary` (#FFB1C4) to `tertiary_container` (#FF82A7).

## 3. Typography
Our typography is an exercise in "Editorial Authority." We mix weights and scales to guide the eye through complex trading data.

*   **Display & Headline (Space Grotesk):** These are the "Anchor Points." Use `display-lg` for market totals or signal titles. The wide tracking and geometric forms convey modern sophistication.
*   **Title & Body (Inter):** These are the "Operational Layers." Use `title-sm` for data labels and `body-md` for technical descriptions.
*   **Hierarchy Note:** Always lead with the "Gold" (`primary_fixed`) for top-level headings to establish the premium brand identity, while using `on_surface_variant` (#DDC1AE) for secondary technical data to reduce visual fatigue.

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than traditional structural lines.

*   **The Layering Principle:** To "lift" a component, move up the surface-container scale. A `surface_container_highest` (#353535) element will naturally appear closer to the user than the `surface` (#131313) background.
*   **Ambient Shadows:** For floating signal alerts, use a shadow with a 40px blur, 0px offset, and 6% opacity of the `on_surface` color. It should feel like a soft glow, not a drop shadow.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use `outline_variant` (#564334) at **15% opacity**. This creates a "barely-there" guide that maintains the sleek aesthetic.
*   **Glassmorphism:** Use `surface_variant` with 40% opacity and `backdrop-filter: blur(12px)` for navigation bars and modal overlays. This ensures the chart data "bleeds" through the UI, maintaining context.

## 5. Components

### Buttons
*   **Primary (Bullish Focus):** Solid `primary_container` (#FF8C00) with `on_primary_container` text. 0.375rem (`md`) corner radius.
*   **Secondary (Ghost):** `outline` (#A48C7A) ghost border at 20% opacity. Text in `primary_fixed`.
*   **Tertiary (Bearish Focus):** Solid `tertiary_container` (#FF82A7) for "Sell" or "Stop" actions.

### Data Chips (Signals)
*   **Market Status:** Use `secondary_container` (#045DD0) with `on_secondary_container` (#D5E0FF) text.
*   **Signal Indicators:** Small, pill-shaped (`full` roundedness) with a 2px "Soft Pulse" animation using the accent color.

### Input Fields
*   **Form Factor:** `surface_container_lowest` background with a `Ghost Border`.
*   **Focus State:** The border transitions to 100% opacity `primary` (#FFB77D). No "glow" or "outer shadow."

### Trading Cards
*   **Style:** No borders. Use `surface_container_low` background. 
*   **Header:** Use a `primary` (Gold) accent line (2px wide, vertical) to the left of the title to denote "Institutional Importance."

### Chart Indicators
*   **Fair Value Gaps (FVG):** Use `secondary` (#AFC6FF) with 10% opacity for the box fill, and a 1px dashed `secondary` line for the boundaries.

## 6. Do's and Don'ts

### Do
*   **Do** use extreme contrast in typography sizes to create an editorial feel.
*   **Do** lean into "Deep Charcoal" (#131313) as the dominant color to make the Gold and Neon Green accents pop.
*   **Do** use asymmetrical layouts (e.g., left-aligned headers with right-aligned data points) to break the "standard app" feel.
*   **Do** ensure all "Bullish" signals use `secondary` or `primary` tones and "Bearish" signals use `tertiary` tones.

### Don't
*   **Don't** use pure white (#FFFFFF) for text. Use `on_surface` (#E2E2E2) to prevent eye strain in dark mode.
*   **Don't** use standard Material Design "Card" shadows. Use Tonal Layering.
*   **Don't** use 1px solid borders to separate list items; use a 16px vertical gap (`spacing-md`) instead.
*   **Don't** use generic system icons. Use thin-stroke (1pt or 1.5pt) linear icons to match the modern `Inter` typography.