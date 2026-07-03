---
name: Academic Excellence & Path
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#44474e'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f88'
  primary: '#000a1e'
  on-primary: '#ffffff'
  primary-container: '#002147'
  on-primary-container: '#708ab5'
  inverse-primary: '#aec7f6'
  secondary: '#7f5700'
  on-secondary: '#ffffff'
  secondary-container: '#feb316'
  on-secondary-container: '#6a4800'
  tertiary: '#080b0e'
  on-tertiary: '#ffffff'
  tertiary-container: '#1f2225'
  on-tertiary-container: '#86898d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f6'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#ffdead'
  secondary-fixed-dim: '#ffba3b'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#e0e2e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1f'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 4px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is centered on the journey of academic aspiration. It balances the gravity of a higher education institution with the accessibility required for a modern digital application process. The visual language communicates authority, prestige, and institutional stability, while ensuring that the interface feels supportive and clear to prospective students and their families.

The aesthetic leans into **Corporate / Modern** with a touch of **Minimalism**. It utilizes structured layouts, intentional white space, and a refined color palette to reduce cognitive load during the complex admissions process. The emotional response should be one of confidence ("This is a prestigious institution") and ease ("I can navigate this process successfully").

## Colors
The color strategy employs a high-contrast relationship between deep institutional tones and vibrant accent colors. 

- **Primary (Deep Navy):** Used for global navigation, primary headings, and foundational UI elements to anchor the design in trust and excellence.
- **Secondary (Vibrant Gold):** Reserved for high-impact calls to action (CTAs), success states, and highlighting the "Apply Now" path. It represents the energy of student life and the prestige of the degree.
- **Neutral:** A range of cool grays (from #F9FAFB to #111827) facilitates readability and provides a clean backdrop for academic content.
- **Surface:** The background remains a crisp, off-white to maintain a scholarly, paper-like feel without the harshness of pure white.

## Typography
This design system utilizes a sophisticated pairing of **Source Serif 4** and **Work Sans**. 

**Source Serif 4** is used for headings and display text. Its professional, scholarly proportions provide an authoritative "Editorial" feel that aligns with academic traditions. **Work Sans** is used for all functional UI elements, body copy, and labels. Its optimized legibility and neutral character ensure that instructions and form fields are easy to parse.

Large display headings should use a tight letter-spacing to appear more cohesive, while labels use slightly increased tracking and uppercase styling to differentiate themselves from narrative text.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a structured, controlled reading experience, transitioning to a fluid model on mobile devices.

- **Desktop (1440px+):** 12-column grid, 1280px max-width, 24px gutters. Use generous top/bottom padding (80px+) to separate sections of information.
- **Tablet (768px - 1024px):** 8-column grid with 40px side margins.
- **Mobile (Up to 767px):** 4-column grid with 20px side margins. 

Spacing follows a strict 8px base unit. Vertical rhythm is critical: use larger gaps (stack-lg) between distinct sections of the admission form and smaller gaps (stack-sm) between labels and their corresponding input fields.

## Elevation & Depth
To maintain a professional and trustworthy atmosphere, this design system avoids heavy shadows and floating effects. Instead, it uses **Tonal Layers** and **Low-contrast outlines**.

- **Surface Levels:** The main canvas is the lightest gray. Tertiary containers (used for sidebars or info boxes) use a slightly darker neutral tint to create subtle separation.
- **Borders:** Use 1px solid borders in a light neutral (#E5E7EB) for cards and input fields. 
- **Active States:** Only primary buttons and active "Step" indicators in the admission timeline may use a soft, diffused shadow (12% opacity of the primary color) to indicate interactivity.
- **Depth:** Content is logically stacked. The navigation bar is fixed at the top with a subtle bottom border rather than a shadow.

## Shapes
The shape language is **Soft (Level 1)**. Elements use a 4px (0.25rem) corner radius. This choice avoids the clinical feel of sharp corners while remaining more formal and institutional than fully rounded or "bubbly" designs.

- **Buttons & Inputs:** 4px radius.
- **Cards & Modal Containers:** 8px (0.5rem) radius for a slightly softer presence.
- **Selection Indicators:** Small indicators (like radio buttons) maintain standard circular properties, but checkboxes utilize the system's 4px radius.

## Components
- **Buttons:** The primary button is Navy with white text. The "Apply Now" button is a special variant using the Secondary Gold with Navy text for maximum visibility.
- **Admission Timeline:** A vertical or horizontal "stepper" component is essential. Completed steps are marked in Gold; current steps are Navy; future steps are light Gray.
- **Input Fields:** Use "floating labels" or clearly defined top-aligned labels. Borders turn Navy when focused. Errors are indicated with a deep red and a 2px left-border on the input field.
- **Information Cards:** Used for program descriptions. They feature a 1px neutral border, no shadow, and a subtle background shift on hover.
- **Status Chips:** Small, low-saturation badges used for "Application Status" (e.g., Pending, Verified, Action Required).
- **Document Uploader:** A dashed-border container with a distinct icon and clear "Drag & Drop" instructions, using the system's secondary color for the "Browse" link.