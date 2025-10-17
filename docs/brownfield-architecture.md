# LakeDroneBuilders Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the LakeDroneBuilders codebase, including technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on the UI/UX modernization enhancement.

### Document Scope

Focused on areas relevant to: Complete UI/UX modernization with industrial theme, Tailwind CSS migration, and shopping cart enhancement

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-16 | 1.0 | Initial brownfield analysis | Winston (Architect) |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry**: `src/app/page.tsx` (renders Store component at root)
- **Configuration**: `next.config.ts` (empty), `tailwind.config.ts`, `tsconfig.json`
- **Core Business Logic**: `src/app/context/ShoppingCartContext.tsx`
- **API Definitions**: None - static data in `src/app/data/items.json`
- **Database Models**: None - JSON file based
- **Key Algorithms**: Cart calculations in `ShoppingCartContext.tsx`

### Enhancement Impact Areas

For the UI/UX modernization, these files/modules will be affected:
- All components in `src/app/components/` - Complete rebuild with Tailwind
- `src/app/globals.css` - Remove Bootstrap, enhance Tailwind
- `src/app/layout.tsx` - Optimize for server components where possible
- All page routes - Restructure and enhance
- `ShoppingCartContext.tsx` - Modernize state management

## High Level Architecture

### Technical Summary

The application is a client-side rendered Next.js e-commerce site using React Bootstrap for UI components and localStorage for cart persistence. Despite being built with Next.js 15.5, it operates primarily as a single-page application without leveraging server-side capabilities.

### Actual Tech Stack

| Category | Technology | Version | Notes |
|----------|------------|---------|-------|
| Runtime | Node.js | 18+ | Next.js requirement |
| Framework | Next.js | 15.5.5 | App Router, but used as SPA |
| UI Library | React | 19.0.0 | Latest version |
| CSS Framework | Bootstrap | 5.3.3 | To be removed |
| CSS Framework | Tailwind CSS | 3.4.1 | Installed but unused |
| Component Library | React Bootstrap | 2.10.8 | To be removed |
| Language | TypeScript | 5.x | Loose type checking |
| State Management | React Context | Built-in | With localStorage |
| Routing | Next.js App Router | Built-in | react-router-dom installed but unused |
| Package Manager | npm | - | Based on package-lock.json |

### Repository Structure Reality Check

- Type: Monorepo (single Next.js app)
- Package Manager: npm
- Notable: Migration residue from older React app visible

## Source Tree and Module Organization

### Project Structure (Actual)

```text
lake-drone-builders/
├── src/app/
│   ├── components/          # UI components (Bootstrap-based)
│   │   ├── CartItem.tsx     # Individual cart item display
│   │   ├── Navbar.tsx       # Navigation with cart icon
│   │   ├── ShoppingCart.tsx # Offcanvas cart drawer
│   │   ├── Store.tsx        # Product grid display
│   │   └── StoreItem.tsx    # Individual product card
│   ├── context/             # State management
│   │   └── ShoppingCartContext.tsx  # Global cart state (NOTE: recreated on each render)
│   ├── data/               
│   │   └── items.json       # Static product catalog (8 items)
│   ├── hooks/              
│   │   └── UseLocalStorage.ts  # Custom hook (has commented code)
│   ├── utilities/          
│   │   └── formatCurrency.ts   # USD formatting helper
│   ├── about/page.tsx      # Minimal about page
│   ├── home/page.tsx       # Broken home page (just shows "Home")
│   ├── store/page.tsx      # Duplicate store implementation
│   ├── page.tsx            # Root page (renders Store)
│   ├── layout.tsx          # Root layout ("use client" everywhere)
│   ├── layout2.tsx         # Backup file - DO NOT USE
│   ├── loading.tsx         # Loading state (only file using Tailwind)
│   └── globals.css         # Mixed Bootstrap + Tailwind imports
├── public/                 
│   └── imgs/               # Product images (poor naming: A.png, B.png, etc.)
└── [config files]          
```

### Key Modules and Their Purpose

- **Shopping Cart System**: `src/app/context/ShoppingCartContext.tsx` - Manages all cart operations, tightly coupled to components
- **Product Display**: `src/app/components/Store.tsx` + `StoreItem.tsx` - Bootstrap card-based catalog
- **Cart UI**: `src/app/components/ShoppingCart.tsx` - Bootstrap Offcanvas implementation
- **Navigation**: `src/app/components/Navbar.tsx` - Bootstrap navbar with cart button
- **Data Persistence**: `src/app/hooks/UseLocalStorage.ts` - Saves cart to browser storage

## Data Models and APIs

### Data Models

Instead of duplicating, reference actual model files:

- **Product Model**: See `src/app/data/items.json` structure:
  ```typescript
  {
    id: number,
    name: string,
    description: string,
    price: number,
    imgUrl: string  // Points to /imgs/{letter}.png
  }
  ```
- **Cart Item Type**: Defined inline in `ShoppingCartContext.tsx`
- **No TypeScript interfaces defined** - types are implicit

### API Specifications

- **No APIs** - All data is static JSON
- **No backend** - Pure frontend application
- **Cart Operations** - All client-side in context

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Bootstrap/Tailwind Conflict**: Both CSS frameworks loaded, creating style conflicts and bloated bundle
2. **Client-Side Everything**: Root layout marked as "use client", losing all SSR benefits
3. **Console.log Pollution**: Every component has debug logs, including "Bye" text in UI
4. **No Error Handling**: Cart operations assume success, no validation
5. **Duplicate Code**: Two Store implementations, multiple layout files
6. **React Router Installed but Unused**: Dead dependency from old migration
7. **Type Safety Issues**: Using `==` instead of `===`, loose typing throughout

### Workarounds and Gotchas

- **SSR Hydration**: `useLocalStorage` checks for window object to avoid SSR errors
- **Metadata Commented Out**: Instead of proper client/server split, metadata is just commented
- **Cart Button Positioning**: Complex inline styles due to Bootstrap limitations
- **Image Naming**: Products use generic letter names (A.png, B.png) instead of descriptive names
- **Unused Props**: StoreItem receives description but never uses it
- **Debug Text in UI**: "Bye" hardcoded in StoreItem component output

## Integration Points and External Dependencies

### External Services

None - This is a fully static application

### Internal Integration Points

- **localStorage**: Only external system interaction for cart persistence
- **Static Assets**: Images served from /public/imgs/
- **No Analytics**: No tracking or monitoring
- **No Error Reporting**: No crash reporting or logging service

## Development and Deployment

### Local Development Setup

1. Actual steps that work:
   ```bash
   npm install
   npm run dev
   ```
2. Known issues:
   - First load may show hydration warnings
   - Console will be flooded with debug logs
   - Bootstrap and Tailwind may conflict

3. Required environment variables: None

### Build and Deployment Process

- **Build Command**: `npm run build`
- **Development**: `npm run dev`
- **Start Production**: `npm start`
- **Linting**: `npm run lint` (basic ESLint)
- **Deployment**: Vercel auto-deployment (implied by Next.js)
- **No CI/CD Pipeline**: Direct deployment from main branch

## Testing Reality

### Current Test Coverage

- Unit Tests: 0% coverage (no test files)
- Integration Tests: None
- E2E Tests: None
- Manual Testing: Primary QA method

### Running Tests

No tests configured. Testing infrastructure needs to be added from scratch.

## Enhancement Impact Analysis

Based on the UI/UX modernization requirements, these areas need attention:

### Files That Will Need Modification

1. **Complete Rewrites**:
   - All files in `src/app/components/` - Switch to Tailwind + industrial theme
   - `src/app/globals.css` - Remove Bootstrap, configure Tailwind
   - All page routes - New structure and content

2. **Major Updates**:
   - `src/app/layout.tsx` - Remove "use client", optimize for SSR
   - `src/app/context/ShoppingCartContext.tsx` - Modernize patterns

3. **Minor Updates**:
   - `src/app/data/items.json` - Update image paths after renaming
   - Image files - Rename from letters to descriptive names

### New Files/Modules Needed

- `src/app/components/industrial/` - New component library
- `/docs/design-system/` - Design documentation
- `src/app/page.tsx` - New hero landing page
- `/cart` route - Dedicated cart page
- Test files - Jest + React Testing Library setup

### Integration Considerations

- Must maintain cart functionality during transition
- Need strategy for gradual component replacement
- Bootstrap removal must be atomic to avoid broken styles
- Consider feature flags for A/B testing new components

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
npm run dev         # Start development server on port 3000
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
```

### Debugging and Troubleshooting

- **Console Logs**: Check browser console for extensive debug output
- **Cart Issues**: Check localStorage for "shopping-cart" key
- **Style Conflicts**: Bootstrap classes may override Tailwind
- **Hydration Errors**: Usually from localStorage access during SSR

### Common Issues

1. **"ReferenceError: window is not defined"** - Code trying to access browser APIs during SSR
2. **Styles not applying** - Bootstrap overriding Tailwind utilities
3. **Cart not persisting** - localStorage blocked or cleared
4. **Images not loading** - Check /public/imgs/ folder

### Migration Notes

This project shows clear signs of being migrated from an older Create React App to Next.js:
- React Router DOM still installed
- All components client-side
- No server component usage
- Bootstrap-heavy implementation
- Console.log debugging approach