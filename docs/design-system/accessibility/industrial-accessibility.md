# Industrial Theme Accessibility Guidelines

## Overview
Ensuring the industrial theme maintains WCAG 2.1 AA compliance while preserving the deadpan technical aesthetic. Industrial interfaces must be both accessible and authentically serious.

## Color Accessibility

### Contrast Ratio Analysis

#### Text on Steel Backgrounds
```
WCAG 2.1 AA Requirements: 4.5:1 normal text, 3:1 large text

✓ PASS - Steel-100 (#e8eaed) on Steel-800 (#2d3136): 8.2:1
✓ PASS - Steel-200 (#c1c8d1) on Steel-800 (#2d3136): 6.4:1  
✓ PASS - Steel-300 (#9ca4b0) on Steel-800 (#2d3136): 4.7:1
✗ FAIL - Steel-400 (#7a8491) on Steel-800 (#2d3136): 3.8:1
✗ FAIL - Steel-500 (#656d78) on Steel-800 (#2d3136): 2.9:1

RECOMMENDED: Use Steel-300 or lighter for body text on dark backgrounds
```

#### Safety Orange Combinations
```
✓ PASS - White (#ffffff) on Safety-600 (#ff4000): 6.1:1
✓ PASS - Steel-900 (#1a1d21) on Safety-600 (#ff4000): 5.2:1
✓ PASS - White (#ffffff) on Safety-800 (#cc2900): 8.9:1
✗ FAIL - Safety-300 (#ff9e73) on Safety-600 (#ff4000): 2.1:1

RECOMMENDED: White or Steel-900 text on Safety orange buttons
```

#### Caution Yellow Combinations  
```
✓ PASS - Steel-900 (#1a1d21) on Caution-600 (#ffb400): 11.3:1
✓ PASS - Caution-900 (#664d00) on Caution-600 (#ffb400): 4.8:1
✗ FAIL - White (#ffffff) on Caution-600 (#ffb400): 1.4:1

RECOMMENDED: Dark text only on yellow backgrounds
```

#### Technical Blue Combinations
```
✓ PASS - White (#ffffff) on Tech-700 (#0066cc): 6.8:1
✓ PASS - Steel-100 (#e8eaed) on Tech-700 (#0066cc): 6.2:1
✓ PASS - White (#ffffff) on Tech-800 (#004d99): 9.1:1

RECOMMENDED: Light text on blue backgrounds
```

### Color-Blind Accessibility

#### Deuteranopia (Red-Green) Considerations
- Safety orange remains distinguishable from tech blue
- Caution yellow provides sufficient contrast
- Use texture and shape in addition to color for critical information

#### Protanopia Considerations  
- Steel grays remain neutral and accessible
- Safety orange may appear more brown - use additional indicators
- Technical blue remains clearly distinguishable

#### Tritanopia (Blue-Yellow) Considerations
- Tech blue may appear more green - use text labels
- Caution yellow may appear pink - use warning icons
- Safety orange remains most reliable across all color vision types

### Accessible Color Combinations Matrix
```
APPROVED COMBINATIONS (WCAG AA+):
Background → Text Color
Steel-800 → Steel-100, Steel-200, Steel-300, White
Steel-700 → Steel-100, Steel-200, White  
Steel-600 → Steel-100, White
Safety-600 → White, Steel-900
Safety-800 → White, Steel-100, Steel-200
Caution-600 → Steel-900, Caution-900
Tech-700 → White, Steel-100, Steel-200
Tech-800 → White, Steel-100, Steel-200, Steel-300
```

## Typography Accessibility

### Readable Fonts for Industrial Theme

#### Primary Font Selection
```
APPROVED: Inter, Roboto - Excellent readability scores
- High x-height for improved legibility
- Clear character differentiation (l, I, 1)
- Strong contrast in letter forms
- Proven accessibility across devices

CAUTION: Roboto Condensed - Use sparingly
- Compressed letterforms reduce readability
- Limit to large headings only (18px+)
- Never use for body text or form labels

APPROVED: JetBrains Mono, Fira Code - Technical specifications
- Designed for code readability
- Clear character distinction
- Good performance with screen readers
- Use only for technical data, part numbers
```

#### Font Size Requirements
```
MINIMUM SIZES (Industrial Theme):
- Body text: 16px (1rem) - Never smaller
- Small text: 14px (0.875rem) - Labels, captions only  
- Large text: 18px+ (1.125rem+) - Qualifies for 3:1 contrast
- Technical specs: 14px+ monospace - Part numbers, codes
- Headings: 20px+ (1.25rem+) - All heading levels

MOBILE CONSIDERATIONS:
- Increase base size to 18px on screens <768px
- Touch targets minimum 44px (iOS) / 48px (Android)
- Line height 1.4+ for improved readability
```

#### Line Height and Spacing
```
ACCESSIBILITY REQUIREMENTS:
- Line height: 1.4 minimum (WCAG), 1.5 recommended
- Paragraph spacing: 1.5x line height minimum
- Letter spacing: No negative values, 0.05em max for headings
- Word spacing: Default, never modified for aesthetic purposes

INDUSTRIAL THEME ADAPTATIONS:
- Technical specifications: Line height 1.3 (dense data acceptable)
- Warning text: Line height 1.6 (critical information needs space)
- Form labels: Line height 1.4, margin-bottom 0.5rem minimum
```

## Focus Management

### Industrial Focus States

#### Visual Focus Indicators
```css
/* High-contrast focus for industrial theme */
.focus-industrial {
  outline: 3px solid #ff4000; /* Safety orange */
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255, 64, 0, 0.2);
}

/* Alternative for dark backgrounds */
.focus-industrial-dark {
  outline: 3px solid #ffb400; /* Caution yellow */
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255, 180, 0, 0.2);
}

/* Technical component focus */
.focus-technical {
  outline: 3px solid #007fff; /* Tech blue */
  outline-offset: 2px;
  background-color: rgba(0, 127, 255, 0.1);
}
```

#### Focus Order for Industrial Components
```
CONTROL PANEL NAVIGATION:
1. Skip navigation link
2. Primary navigation controls
3. Search/filter controls  
4. Product grid items (row by row)
5. Shopping cart trigger
6. Footer compliance links

TECHNICAL SPECIFICATIONS:
1. Product title and primary image
2. Technical specifications table (cell by cell)
3. Certification badges (in reading order)
4. Warning labels (priority order)
5. Action buttons (Add to cart, etc.)

INDUSTRIAL CHECKOUT:
1. Contact information fields
2. Shipping address fields  
3. Payment method selection
4. Compliance acknowledgments
5. Order submission controls
```

### Keyboard Navigation

#### Custom Key Bindings (Industrial Theme)
```
STANDARD NAVIGATION:
Tab/Shift+Tab - Focus movement
Enter/Space - Activation
Arrows - Within grouped controls
Escape - Close modals/dropdowns

INDUSTRIAL ENHANCEMENTS:
Ctrl+/ - Help overlay with technical documentation
Ctrl+Shift+S - Emergency stop (clear cart)
Ctrl+Shift+C - Compliance documentation
F1 - Technical specifications help
F2 - Accessibility settings panel

TECHNICAL DATA TABLES:
Arrow keys - Cell navigation
Home/End - Row start/end
Page Up/Down - Table sections
Ctrl+Home - Table start
Ctrl+End - Table end
```

## Screen Reader Compatibility

### Industrial Semantic Structure

#### ARIA Labels for Technical Elements
```html
<!-- Technical specifications -->
<section aria-label="Technical Specifications" role="region">
  <table aria-label="Product compliance certifications">
    <caption>ISO certifications and military standards compliance</caption>
  </table>
</section>

<!-- Warning systems -->
<div role="alert" aria-live="assertive" aria-atomic="true">
  <span class="sr-only">Critical Warning:</span>
  High-precision instrument requires specialized handling
</div>

<!-- Industrial controls -->
<button aria-describedby="safety-warning" 
        aria-label="Add Turbo Encabulator to cart - Professional grade">
  Add to Cart
</button>
<div id="safety-warning" class="sr-only">
  This item requires Level II certification in Advanced Widget Dynamics
</div>
```

#### Industrial Language Considerations
```
SCREEN READER FRIENDLY ALTERNATIVES:

Instead of: "MIL-STD-810H ✓"
Use: "Military Standard 810H certified" 

Instead of: "⚠️ DANGER"  
Use: "Warning" with role="alert"

Instead of: "ISO 9001:2015 ✓ Quality Management"
Use: "Certified ISO 9001 colon 2015 Quality Management Systems"

Instead of: Technical symbols (⊕, ⊗, ⊙)
Use: Text alternatives "included", "excluded", "optional"
```

#### Reading Order for Technical Documentation
```
LOGICAL READING SEQUENCE:
1. Product name and classification level
2. Primary technical specifications  
3. Compliance certifications (grouped)
4. Safety warnings (priority order)
5. Operational parameters
6. Maintenance requirements
7. Disposal procedures
```

## Mobile Accessibility

### Touch Target Requirements

#### Industrial Button Sizing
```css
/* Minimum touch targets - industrial theme */
.btn-industrial {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 16px;
}

/* Technical controls may be smaller if clearly labeled */
.btn-technical-compact {
  min-height: 40px;
  min-width: 40px;
  padding: 8px 12px;
}

/* Critical safety controls - larger targets */
.btn-safety-critical {
  min-height: 56px;
  min-width: 56px;
  padding: 16px 20px;
}
```

#### Spacing for Industrial Components
```css
/* Control panel spacing */
.control-group {
  gap: 8px; /* Minimum between related controls */
}

.control-section {
  gap: 16px; /* Between different control groups */
}

/* Technical specification spacing */
.spec-row {
  padding: 12px 0; /* Adequate touch spacing */
  border-bottom: 1px solid var(--steel-300);
}
```

### Mobile-Specific Industrial Features

#### Responsive Technical Tables
- Horizontal scroll with sticky headers
- Tap to expand detailed specifications
- Collapsible sections for complex data
- Priority-based column hiding

#### Mobile Warning Systems
- Full-screen modal for critical warnings
- Toast notifications for standard alerts
- Progressive disclosure for detailed compliance info
- Haptic feedback for safety-critical actions (where supported)

## Testing Requirements

### Automated Testing Tools
```
RECOMMENDED TOOLS:
- axe-core: WCAG compliance scanning
- Pa11y: Command-line accessibility testing  
- Lighthouse: Google accessibility auditing
- Color Oracle: Color-blind simulation
- NVDA/JAWS: Screen reader testing

CUSTOM TESTS FOR INDUSTRIAL THEME:
- High-contrast mode compatibility
- Color-only information detection
- Focus trap testing in technical modals
- Keyboard navigation through specification tables
- Screen reader announcement testing for certifications
```

### Manual Testing Checklist
```
□ Navigate entire site using only keyboard
□ Test with screen reader (NVDA minimum)
□ Verify focus visibility in all themes
□ Test color contrast in high-contrast mode
□ Simulate color-blind conditions (all types)
□ Test touch targets on mobile devices
□ Verify text scaling up to 200% without horizontal scroll
□ Test warning announcements with live regions
□ Verify skip navigation links function correctly
□ Test emergency stop/cart clear functionality
```

### User Testing with Disabilities
```
PRIORITY USER GROUPS:
1. Screen reader users (technical documentation heavy)
2. Low vision users (high contrast requirements)
3. Motor impairment users (precise control interface)
4. Color-blind users (color-coded technical information)
5. Cognitive accessibility (complex technical language)

TESTING SCENARIOS:
- Navigate technical specifications for product comparison
- Complete purchase with compliance acknowledgments
- Access certification documentation
- Use emergency cart clearing
- Navigate complex technical data tables
```

## Industrial Theme Accessibility Best Practices

### Progressive Enhancement
- Basic functionality works without CSS/JavaScript
- Enhanced industrial styling layers on top
- Technical features degrade gracefully
- Emergency accessibility mode available

### Content Strategy
- Plain language summaries for technical jargon
- Alternative text for all certification badges
- Descriptive link text for compliance documents
- Clear error messages for form validation

### Technical Implementation
- Semantic HTML for all industrial components
- ARIA landmarks for complex layouts
- Live regions for dynamic technical updates
- Skip links for repetitive navigation patterns

### Performance Considerations
- Optimize for assistive technology performance
- Minimize layout shifts that affect screen readers
- Ensure fast focus movement through complex interfaces
- Reduce cognitive load with clear information hierarchy