# Lake Drone Builders - E-Commerce Platform

A specialized e-commerce platform for drone components and technical parts, featuring an industrial design system and comprehensive shopping cart functionality.

## 🚀 Project Status

**Current Version**: 1.10 - Final Polish & Optimization  
**Build Status**: ✅ Passing  
**TypeScript**: ✅ Strict mode enabled  
**Accessibility**: ✅ WCAG compliant  
**Performance**: ✅ Optimized  

### Recent Optimizations ✨
- **Image Optimization**: Implemented Next.js Image components with loading states
- **Console Cleanup**: Removed all development logs from production code
- **TypeScript Validation**: Full strict mode compliance
- **Loading States**: Industrial-themed loading components and image skeletons
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint coverage
- **Cart Persistence**: Enhanced localStorage with backward compatibility
- **Technical Documentation**: Complete technical debt and enhancement roadmap

## 🛠 Tech Stack

- **Framework**: Next.js 15.5+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom industrial theme
- **State Management**: React Context + localStorage
- **Build**: Next.js optimized production builds
- **Testing**: Cart persistence validation

## 🎨 Design System

### Industrial Component Library
- **IndustrialButton**: Metallic buttons with loading states and certifications
- **IndustrialCard**: Blueprint-style containers with technical specifications
- **IndustrialBadge**: Certification stamps and status indicators
- **IndustrialInput**: Technical form components (future use)

### Theme Colors
- **Steel Grays**: Primary UI background and structure
- **Amber Orange**: Action buttons and highlights
- **Cyan Blue**: Technical readouts and status indicators
- **Gunmetal**: Navigation and industrial elements

## 🏗 Architecture

### Directory Structure
```
src/app/
├── components/          # React components
│   ├── industrial/      # Industrial design system
│   │   └── core/       # Core industrial components
│   └── __tests__/      # Component tests
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── utilities/          # Helper functions
├── data/               # Static data files
└── [pages]/            # Next.js App Router pages
```

### Key Features
- **Shopping Cart**: Persistent cart with enhanced data structure
- **Product Catalog**: Technical components with detailed specifications
- **Checkout Flow**: 3-step procurement process
- **Responsive Design**: Mobile-first with industrial aesthetics
- **Image Optimization**: Next.js Image with loading states
- **Type Safety**: Comprehensive TypeScript interfaces

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd lake-drone-builders

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint (deprecated, migrate to CLI)
```

### Access Points
- **Development**: http://localhost:3000 (or 3003 if 3000 is in use)
- **Pages**: `/`, `/products`, `/about`, `/cart`, `/checkout`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (2-column grids)
- **Desktop**: > 1024px (3-4 column grids)

## 🧪 Testing

### Cart Persistence Testing
Automated tests available in `src/app/components/__tests__/cart-persistence-test.ts`

### Manual Testing Checklist
- [ ] Cart items persist across page refresh
- [ ] Cart data survives browser restart
- [ ] Responsive design on all breakpoints
- [ ] Image loading states work correctly
- [ ] Checkout flow completes successfully

## 📋 Build Information

**Current Bundle Sizes**:
- Shared chunks: 102 kB
- Page-specific: 1-7 kB per route
- Build time: ~1.8 seconds

**Performance Metrics**:
- TypeScript compilation: Clean
- ESLint: No errors (migration to CLI needed)
- Next.js build: Optimized production ready

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
