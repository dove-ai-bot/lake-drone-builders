# Tailwind Component Structure

## Overview
Comprehensive Tailwind CSS configuration and component library structure for the industrial theme, designed to replace Bootstrap with deadpan technical seriousness.

## Custom Tailwind Configuration

### Extended Color Palette
```javascript
// tailwind.config.ts extension
module.exports = {
  theme: {
    extend: {
      colors: {
        // Steel grays
        steel: {
          50: '#f5f6f7',
          100: '#e8eaed', 
          200: '#c1c8d1',
          300: '#9ca4b0',
          400: '#7a8491',
          500: '#656d78',
          600: '#51575f',
          700: '#3f444a',
          800: '#2d3136',
          900: '#1a1d21',
        },
        // Safety orange
        safety: {
          100: '#ffe0cc',
          200: '#ffbf9f',
          300: '#ff9e73',
          400: '#ff7d47',
          500: '#ff5c1a',
          600: '#ff4000',
          700: '#e63900',
          800: '#cc2900',
          900: '#991f00',
        },
        // Industrial yellow
        caution: {
          200: '#fff4cc',
          300: '#ffe499',
          400: '#ffd466',
          500: '#ffc433',
          600: '#ffb400',
          700: '#cc9200',
          800: '#996f00',
          900: '#664d00',
        },
        // Technical blue
        tech: {
          200: '#cce6ff',
          300: '#99ccff',
          400: '#66b3ff',
          500: '#3399ff',
          600: '#007fff',
          700: '#0066cc',
          800: '#004d99',
          900: '#003366',
        }
      }
    }
  }
}
```

### Custom Typography
```javascript
fontFamily: {
  'industrial': ['Roboto Condensed', 'Arial Narrow', 'sans-serif'],
  'technical': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
  'mono-tech': ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
},
fontSize: {
  'technical-xs': ['0.75rem', { lineHeight: '1.2' }],
  'technical-sm': ['0.875rem', { lineHeight: '1.3' }],
  'technical-base': ['1rem', { lineHeight: '1.4' }],
  'technical-lg': ['1.125rem', { lineHeight: '1.4' }],
  'industrial-xl': ['1.25rem', { lineHeight: '1.2', fontWeight: '600' }],
  'industrial-2xl': ['1.5rem', { lineHeight: '1.2', fontWeight: '700' }],
  'industrial-3xl': ['1.875rem', { lineHeight: '1.1', fontWeight: '700' }],
}
```

### Custom Spacing (Technical Precision)
```javascript
spacing: {
  'rivet': '3px',     // Rivet spacing
  'panel': '12px',    // Panel margins
  'control': '8px',   // Control spacing
  'technical': '16px', // Standard technical spacing
}
```

### Custom Shadows
```javascript
boxShadow: {
  'rivet': 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.1)',
  'panel': '0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)',
  'control': '0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
  'display': 'inset 0 2px 4px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
  'pressed': 'inset 0 2px 4px rgba(0,0,0,0.6)',
}
```

### Custom Gradients
```javascript
backgroundImage: {
  'metal-steel': 'linear-gradient(145deg, #3f444a 0%, #2d3136 50%, #1a1d21 100%)',
  'metal-panel': 'linear-gradient(180deg, #51575f 0%, #3f444a 100%)',
  'button-safety': 'linear-gradient(145deg, #ff4000 0%, #cc2900 100%)',
  'button-pressed': 'linear-gradient(145deg, #cc2900 0%, #991f00 100%)',
}
```

## Component Library Structure

### Directory Organization
```
src/app/components/industrial/
├── layout/
│   ├── IndustrialNavbar.tsx
│   ├── TechnicalFooter.tsx
│   └── ControlPanel.tsx
├── ui/
│   ├── IndustrialButton.tsx
│   ├── TechnicalCard.tsx
│   ├── SpecificationTable.tsx
│   ├── CertificationBadge.tsx
│   └── WarningLabel.tsx
├── commerce/
│   ├── TechnicalCart.tsx
│   ├── ProductSpecGrid.tsx
│   ├── IndustrialCheckout.tsx
│   └── ComplianceCartItem.tsx
├── forms/
│   ├── TechnicalInput.tsx
│   ├── SpecificationSelect.tsx
│   └── IndustrialForm.tsx
└── indicators/
    ├── StatusLED.tsx
    ├── ProgressGauge.tsx
    └── TechnicalReadout.tsx
```

## Custom Utility Classes

### Industrial Effects
```css
@layer utilities {
  /* Rivet effects */
  .rivet-corner {
    position: relative;
  }
  .rivet-corner::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #656d78 30%, #3f444a 70%);
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
  }
  
  /* Metal texture */
  .metal-texture {
    background-image: 
      linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.05) 51%, rgba(255,255,255,0.05) 52%, transparent 53%),
      linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.1) 51%, rgba(0,0,0,0.1) 52%, transparent 53%);
    background-size: 4px 4px;
  }
  
  /* Hazard stripes */
  .hazard-stripes {
    background-image: repeating-linear-gradient(
      45deg,
      #ffb400,
      #ffb400 10px,
      #1a1d21 10px,
      #1a1d21 20px
    );
  }
  
  /* Technical grid */
  .technical-grid {
    background-image: 
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
    background-size: 20px 20px;
  }
  
  /* Control panel styling */
  .control-panel {
    @apply bg-steel-800 border-steel-600 border-2 shadow-panel relative;
  }
  .control-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
}
```

### Typography Utilities
```css
@layer utilities {
  .text-technical {
    @apply font-technical text-steel-100 leading-tight tracking-wide;
  }
  
  .text-specification {
    @apply font-mono-tech text-technical-sm text-steel-300 uppercase tracking-wider;
  }
  
  .text-warning {
    @apply font-industrial text-caution-600 font-bold uppercase tracking-widest;
  }
  
  .text-classified {
    @apply font-mono-tech text-safety-600 font-bold tracking-wider;
  }
  
  .text-industrial-heading {
    @apply font-industrial text-industrial-2xl text-steel-100 font-bold uppercase tracking-wide;
  }
}
```

### Button Variants
```css
@layer components {
  .btn-industrial {
    @apply px-6 py-3 font-technical font-semibold uppercase tracking-wide transition-all duration-200;
    @apply border-2 shadow-control hover:shadow-pressed active:shadow-pressed;
  }
  
  .btn-primary {
    @apply btn-industrial bg-button-safety border-safety-700 text-white;
    @apply hover:bg-button-pressed hover:border-safety-800;
  }
  
  .btn-secondary {
    @apply btn-industrial bg-steel-700 border-steel-600 text-steel-100;
    @apply hover:bg-steel-600 hover:border-steel-500;
  }
  
  .btn-technical {
    @apply btn-industrial bg-tech-700 border-tech-600 text-white;
    @apply hover:bg-tech-800 hover:border-tech-700;
  }
  
  .btn-warning {
    @apply btn-industrial bg-caution-600 border-caution-700 text-caution-900;
    @apply hover:bg-caution-700 hover:border-caution-800;
  }
}
```

### Card Components
```css
@layer components {
  .card-industrial {
    @apply bg-steel-700 border-steel-600 border-2 shadow-panel;
    @apply rivet-corner metal-texture;
  }
  
  .card-technical {
    @apply card-industrial bg-steel-800;
    @apply technical-grid;
  }
  
  .card-specification {
    @apply card-technical p-technical;
    @apply border-l-4 border-l-tech-600;
  }
  
  .card-warning {
    @apply bg-caution-100 border-caution-600 border-2 border-dashed;
    @apply p-4 shadow-control;
  }
}
```

## Component Naming Conventions

### Prefix System
- `Industrial*` - Main UI components (buttons, cards, forms)
- `Technical*` - Data display components (specs, readouts)
- `Compliance*` - Certification and warning components
- `Control*` - Interactive interface elements

### File Naming
```typescript
// Primary components
IndustrialButton.tsx
TechnicalCard.tsx
ComplianceBadge.tsx

// Specialized variants  
IndustrialButtonPrimary.tsx
TechnicalCardSpecification.tsx
ComplianceBadgeISO.tsx

// Composite components
IndustrialProductGrid.tsx
TechnicalSpecificationPanel.tsx
ComplianceWarningSystem.tsx
```

### Props Interface Naming
```typescript
interface IndustrialButtonProps {
  variant: 'primary' | 'secondary' | 'technical' | 'warning';
  size: 'sm' | 'md' | 'lg';
  classification?: 'unclassified' | 'confidential' | 'secret';
  certifications?: string[];
}

interface TechnicalCardProps {
  title: string;
  specification: string;
  compliance: string[];
  securityLevel?: number;
}
```

## Component Hierarchy

### Base Components (Building Blocks)
1. `IndustrialButton` - All button variants
2. `TechnicalCard` - Base card component
3. `ComplianceBadge` - Certification displays
4. `WarningLabel` - Alert components
5. `StatusIndicator` - LED/gauge components

### Composite Components (Feature-Specific)
1. `ProductSpecificationGrid` - Product displays
2. `TechnicalCartInterface` - Shopping cart
3. `IndustrialCheckoutFlow` - Purchase process
4. `ComplianceDocumentPanel` - Certification displays
5. `ControlPanelNavigation` - Site navigation

### Layout Components (Page Structure)
1. `IndustrialPageLayout` - Main page wrapper
2. `TechnicalHeader` - Site header with controls
3. `ControlPanelSidebar` - Navigation sidebar
4. `IndustrialFooter` - Site footer with compliance

## Migration Strategy from Bootstrap

### Phase 1: Core Components
- Replace Bootstrap buttons with IndustrialButton
- Replace Bootstrap cards with TechnicalCard
- Replace Bootstrap navbar with TechnicalHeader

### Phase 2: Layout System
- Replace Bootstrap grid with Tailwind grid
- Replace Bootstrap containers with custom layout
- Replace Bootstrap utilities with custom utilities

### Phase 3: Complex Components
- Replace Bootstrap carousel with TechnicalSlider
- Replace Bootstrap modal with IndustrialDialog
- Replace Bootstrap forms with TechnicalFormComponents

### Compatibility Period
- Maintain Bootstrap alongside Tailwind during transition
- Use CSS isolation to prevent conflicts
- Gradual component replacement without breaking functionality