# Industrial Design System

## Design Philosophy
**Deadpan Industrial Seriousness**: Every product is presented with the gravitas of critical infrastructure components. This creates humor through contrast—treating everyday items like they could power a nuclear submarine.

## Color Palette

### Primary Industrial Colors
```css
/* Gunmetal Grays */
--steel-900: #1a1d21;    /* Deep gunmetal - primary backgrounds */
--steel-800: #2d3136;    /* Dark panels - secondary backgrounds */
--steel-700: #3f444a;    /* Medium panels - card backgrounds */
--steel-600: #51575f;    /* Text on light backgrounds */
--steel-500: #656d78;    /* Disabled states */
--steel-400: #7a8491;    /* Subtle text */
--steel-300: #9ca4b0;    /* Borders, dividers */
--steel-200: #c1c8d1;    /* Light borders */
--steel-100: #e8eaed;    /* Very light backgrounds */
--steel-50: #f5f6f7;     /* Off-white */

/* Safety Orange */
--safety-900: #991f00;   /* Dark orange - danger states */
--safety-800: #cc2900;   /* Primary orange - CTAs */
--safety-700: #e63900;   /* Hover states */
--safety-600: #ff4000;   /* Primary buttons */
--safety-500: #ff5c1a;   /* Active states */
--safety-400: #ff7d47;   /* Disabled buttons */
--safety-300: #ff9e73;   /* Light accents */
--safety-200: #ffbf9f;   /* Very light accents */
--safety-100: #ffe0cc;   /* Background tints */

/* Industrial Yellow */
--caution-900: #664d00;  /* Dark yellow - warning backgrounds */
--caution-800: #996f00;  /* Medium yellow */
--caution-700: #cc9200;  /* Standard warning */
--caution-600: #ffb400;  /* Primary yellow */
--caution-500: #ffc433;  /* Bright yellow */
--caution-400: #ffd466;  /* Light yellow */
--caution-300: #ffe499;  /* Very light yellow */
--caution-200: #fff4cc;  /* Background tints */

/* Steel Blue */
--tech-900: #003366;     /* Deep blue - technical elements */
--tech-800: #004d99;     /* Primary blue */
--tech-700: #0066cc;     /* Links, accents */
--tech-600: #007fff;     /* Bright blue */
--tech-500: #3399ff;     /* Light blue */
--tech-400: #66b3ff;     /* Very light blue */
--tech-300: #99ccff;     /* Background tints */
--tech-200: #cce6ff;     /* Very light backgrounds */
```

### Usage Guidelines
- **Steel grays**: Primary interface, text, backgrounds
- **Safety orange**: Primary CTAs, important actions, alerts
- **Caution yellow**: Warnings, badges, highlights
- **Tech blue**: Links, secondary actions, technical indicators

## Typography

### Primary Font Stack
```css
/* Technical Sans-Serif - Headings and UI */
font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace - Technical specifications, codes */
font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;

/* Industrial Display - Large headings only */
font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif;
```

### Typography Scale
```css
/* Display - Major headings */
--text-5xl: 3rem;     /* 48px - Hero headings */
--text-4xl: 2.25rem;  /* 36px - Page titles */
--text-3xl: 1.875rem; /* 30px - Section headers */

/* Headings */
--text-2xl: 1.5rem;   /* 24px - Component headers */
--text-xl: 1.25rem;   /* 20px - Card titles */
--text-lg: 1.125rem;  /* 18px - Subheadings */

/* Body */
--text-base: 1rem;    /* 16px - Body text */
--text-sm: 0.875rem;  /* 14px - Small text */
--text-xs: 0.75rem;   /* 12px - Labels, captions */

/* Technical */
--text-mono-lg: 1.125rem; /* 18px - Large code */
--text-mono: 1rem;        /* 16px - Standard code */
--text-mono-sm: 0.875rem; /* 14px - Small code */
```

### Font Weight Guidelines
```css
--font-light: 300;     /* Subtle text, disclaimers */
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Subheadings, emphasized text */
--font-semibold: 600;  /* Card titles, form labels */
--font-bold: 700;      /* Headings, important text */
--font-black: 900;     /* Display headings only */
```

## Spacing System

### Industrial Grid
```css
/* Base unit: 4px for technical precision */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## Visual Effects

### Shadows and Depth
```css
/* Industrial shadows - flat, mechanical */
--shadow-rivet: 
  inset 2px 2px 4px rgba(0,0,0,0.3),
  inset -2px -2px 4px rgba(255,255,255,0.1);

--shadow-panel:
  0 2px 8px rgba(0,0,0,0.15),
  0 1px 3px rgba(0,0,0,0.3);

--shadow-control:
  0 1px 3px rgba(0,0,0,0.3),
  inset 0 1px 0 rgba(255,255,255,0.1);

--shadow-display:
  inset 0 2px 4px rgba(0,0,0,0.4),
  0 0 0 1px rgba(255,255,255,0.1);
```

### Gradients
```css
/* Metal gradients */
--gradient-steel:
  linear-gradient(145deg, #3f444a 0%, #2d3136 50%, #1a1d21 100%);

--gradient-panel:
  linear-gradient(180deg, #51575f 0%, #3f444a 100%);

--gradient-button:
  linear-gradient(145deg, #ff4000 0%, #cc2900 100%);
```

### Borders and Lines
```css
/* Industrial borders */
--border-metal: 1px solid #656d78;
--border-panel: 2px solid #3f444a;
--border-rivet: 3px solid #2d3136;
--border-hazard: 3px dashed #ffb400;
```

## Component Patterns

### Industrial Cards
- Flat, technical appearance
- Rivet-style corner details
- Metal gradient backgrounds
- Technical specification typography

### Technical Buttons
- Heavy, mechanical appearance
- Safety orange for primary actions
- Pressed/unpressed states with depth
- Monospace labels for technical actions

### Control Panels
- Dark backgrounds with light text
- Grouped controls with dividers
- Status indicators with LED-style dots
- Technical readouts with monospace fonts

### Industrial Forms
- Technical field labels
- Specification-style inputs
- Warning states with caution colors
- Multi-column layouts for technical data

## Texture References

### Visual Textures (for CSS backgrounds)
- **Brushed Metal**: Subtle linear gradients with noise
- **Riveted Panels**: Border details with circular elements
- **Hazard Stripes**: Diagonal warning patterns
- **Technical Grid**: Subtle dot or line patterns
- **Control Panel**: Dark backgrounds with light details

### Implementation Notes
- Use CSS gradients and box-shadows for metal effects
- Implement textures as subtle background patterns
- Ensure all textures are performance-optimized
- Maintain accessibility with sufficient contrast

## Mood Board References

### Industrial UI Inspiration
1. **Aircraft Cockpit Interfaces**: Complex technical layouts
2. **Industrial Control Panels**: Button groupings and status displays
3. **Military Equipment**: Serious, functional aesthetics
4. **Laboratory Equipment**: Clean, technical interfaces
5. **Automotive Dashboards**: Information hierarchy
6. **Manufacturing Controls**: Safety colors and warnings

### Design Principles Applied
- **Functional over Beautiful**: Every element serves a purpose
- **Technical Precision**: Exact measurements and specifications
- **Safety First**: Clear warnings and status indicators
- **Industrial Heritage**: References to manufacturing and engineering
- **Deadpan Humor**: Serious treatment of mundane products