# LakeDroneBuilders Frontend Architecture Document

## Section 1: Template and Framework Selection

Based on the brownfield PRD and project analysis, LakeDroneBuilders is an existing Next.js 15.5.5 application that was recently migrated from an older React shopping cart application. The project currently uses:

- **Framework:** Next.js 15.5.5 with App Router
- **UI Library:** React 19.0.0 with React Bootstrap (to be replaced)
- **Language:** TypeScript
- **Styling:** Currently Bootstrap + conflicting Tailwind (to be standardized on Tailwind)
- **State Management:** React Context API
- **Data:** Static JSON files

**Key Constraints from Existing Project:**
- Must maintain Next.js App Router structure
- TypeScript strict mode should be enforced
- Cart persistence using localStorage must be maintained
- All Bootstrap dependencies will be removed in favor of Tailwind CSS
- Console.log statements need to be cleaned up

**No Additional Starter Template Required:** The project is already established with Next.js infrastructure. We'll be enhancing the existing codebase rather than introducing a new starter template.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-16 | 1.0 | Initial frontend architecture for industrial UI modernization | Winston (Architect) |

## Section 2: Frontend Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Framework | Next.js | 15.5.5 | Full-stack React framework with App Router | Already in use, provides SSR/SSG capabilities, excellent DX, built-in optimizations |
| UI Library | React | 19.0.0 | Component-based UI library | Core of Next.js, industry standard, huge ecosystem |
| State Management | React Context API | Built-in | Shopping cart state, UI state management | Sufficient for current needs, already implemented, avoids additional dependencies |
| Routing | Next.js App Router | Built-in | File-based routing with layouts | Modern routing approach, better performance than pages router |
| Build Tool | Turbopack/Webpack | Built-in | Asset bundling and optimization | Comes with Next.js, zero configuration needed |
| Styling | Tailwind CSS | 3.4.x | Utility-first CSS framework | Perfect for industrial theme customization, removes Bootstrap conflicts |
| Testing | Jest + React Testing Library | 29.x + 14.x | Unit and integration testing | Standard React testing stack, good Next.js support |
| Component Library | Custom Industrial Components | N/A | Industrial-themed UI components | Build from scratch for unique industrial aesthetic |
| Form Handling | React Hook Form | 7.x | Form validation and handling | Lightweight, performant, works well with TypeScript |
| Animation | Framer Motion | 11.x | Animation library | Declarative animations for mechanical effects, gesture support |
| Dev Tools | TypeScript + ESLint + Prettier | 5.x + 8.x + 3.x | Type safety and code quality | Already configured, enforce code standards |

### Detailed Technology Decisions

#### Styling Architecture: Tailwind CSS
**Implementation Strategy:**
- Configure Tailwind with custom industrial theme extending the default palette
- Create custom utility classes for industrial effects: `shadow-rivet`, `bg-metal-gradient`, `border-hazard`
- Use CSS custom properties for dynamic theming (dark mode ready)
- PostCSS plugins for advanced effects: `postcss-preset-env` for modern CSS features

**Migration Path from Bootstrap:**
```typescript
// Phase 1: Add Tailwind utilities alongside Bootstrap
// Phase 2: Component-by-component migration
// Phase 3: Remove Bootstrap dependencies
// Phase 4: Optimize Tailwind for production
```

#### State Management Architecture
**Context Structure:**
```typescript
// Existing cart context to be enhanced
- CartContext: Shopping cart state and operations
- ThemeContext: Industrial theme variations and user preferences  
- AnimationContext: User animation preferences (prefers-reduced-motion)
- UIContext: Modal states, navigation drawer, loading states
```

**Why Not Redux/Zustand:**
- Cart operations are synchronous and local
- No complex async flows requiring middleware
- Context API performance is sufficient for ~10 product catalog
- Reduces bundle size by ~25KB

#### Animation Strategy: Framer Motion
**Core Animation Patterns:**
```typescript
// Mechanical button press
const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.15 } },
  pressed: { scale: 0.98, transition: { duration: 0.1 } }
}

// Blast door modal
const modalVariants = {
  hidden: { scaleY: 0, originY: 0.5 },
  visible: { 
    scaleY: 1, 
    transition: { 
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] 
    }
  }
}
```

**Performance Optimizations:**
- Use `motion.div` sparingly - only for animated elements
- Implement `will-change` CSS property for GPU acceleration
- Lazy load Framer Motion for non-critical animations
- Provide CSS-only fallbacks for reduced motion preference

#### Component Library Architecture
**Industrial Component Hierarchy:**
```
/components
  /industrial
    /core
      - Button.tsx (variants: primary, secondary, danger, ghost)
      - Card.tsx (blueprint frame styling)
      - Input.tsx (metal inset fields)
      - Badge.tsx (certification stamps)
    /composite  
      - ProductCard.tsx (uses Card + Badge + Button)
      - NavigationPanel.tsx (control panel design)
      - RequisitionForm.tsx (cart as procurement form)
    /layout
      - MetalContainer.tsx (riveted frames)
      - HazardBorder.tsx (warning stripes)
      - TechnicalGrid.tsx (blueprint grid system)
```

#### Testing Architecture
**Test Structure:**
```
/__tests__
  /unit
    - Industrial components (visual regression + interaction)
    - Cart context operations
    - Utility functions
  /integration  
    - Product browsing flow
    - Cart add/remove operations
    - Theme switching
  /e2e (Playwright)
    - Complete purchase journey
    - Responsive behavior
    - Animation performance
```

**Testing Standards:**
- Every industrial component must have visual regression tests
- Animation tests use fake timers to ensure deterministic results
- Accessibility tests run on every component
- Performance benchmarks for animation-heavy components

#### Form Handling Strategy
**React Hook Form Configuration:**
```typescript
// Checkout form with industrial validation
const checkoutSchema = z.object({
  requisitionNumber: z.string().regex(/^REQ-\d{4}-[A-Z]{3}$/),
  facilityCode: z.string().length(7),
  authorizationLevel: z.enum(['ALPHA', 'BETA', 'GAMMA'])
});

// Industrial error messages
const errorMessages = {
  required: 'FIELD REQUIREMENT: MANDATORY INPUT DETECTED',
  invalid: 'VALIDATION FAILURE: INPUT DOES NOT MEET SPECIFICATIONS'
};
```

#### Development Tools Configuration
**ESLint Rules for Industrial Code:**
```javascript
{
  "rules": {
    "no-console": "error", // Remove all console.logs
    "naming-convention": ["error", {
      "selector": "variable",
      "filter": ".*industrial.*",
      "format": ["UPPER_CASE"]
    }]
  }
}
```

**TypeScript Strict Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## Section 3: Project Structure

```plaintext
/src
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with industrial theme
│   ├── page.tsx                 # Landing page with hero section
│   ├── loading.tsx              # Industrial loading states
│   ├── error.tsx                # Error boundary with industrial styling
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── products/                # Product routes
│   │   ├── layout.tsx           # Products layout
│   │   ├── page.tsx             # Product catalog
│   │   └── [id]/                # Dynamic product pages
│   │       └── page.tsx         # Product detail
│   ├── cart/                    # Cart route
│   │   └── page.tsx             # Cart/Requisition page
│   ├── checkout/                # Checkout flow
│   │   └── page.tsx             # Order form
│   └── about/                   # Company info
│       └── page.tsx             # About/credentials
│
├── components/                   # Component library
│   ├── industrial/              # Industrial design system
│   │   ├── core/                # Base components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Badge/
│   │   │   └── Typography/
│   │   ├── composite/           # Composed components
│   │   │   ├── ProductCard/
│   │   │   ├── NavigationPanel/
│   │   │   ├── RequisitionForm/
│   │   │   └── TechnicalSpecs/
│   │   └── layout/              # Layout components
│   │       ├── MetalContainer/
│   │       ├── HazardBorder/
│   │       └── TechnicalGrid/
│   ├── features/                # Feature-specific components
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── EmptyCart.tsx
│   │   ├── products/
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── CategoryTabs.tsx
│   │   └── checkout/
│   │       ├── OrderForm.tsx
│   │       └── Receipt.tsx
│   └── shared/                  # Shared components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── SEO.tsx
│
├── contexts/                    # React Context providers
│   ├── CartContext.tsx          # Shopping cart state
│   ├── ThemeContext.tsx         # Industrial theme variants
│   ├── AnimationContext.tsx     # Animation preferences
│   └── UIContext.tsx            # UI state (modals, drawers)
│
├── hooks/                       # Custom React hooks
│   ├── useCart.ts              # Cart operations
│   ├── useLocalStorage.ts      # Enhanced localStorage hook
│   ├── useIndustrialSound.ts   # Optional sound effects
│   └── useAnimation.ts         # Animation helpers
│
├── lib/                         # Utility libraries
│   ├── animations/             # Framer Motion variants
│   │   ├── mechanical.ts       # Mechanical animations
│   │   ├── transitions.ts      # Page transitions
│   │   └── industrial.ts       # Industrial effects
│   ├── theme/                  # Theme configuration
│   │   ├── colors.ts          # Industrial color palette
│   │   ├── typography.ts      # Font configurations
│   │   └── industrial.ts      # Custom Tailwind utilities
│   └── utils/                  # General utilities
│       ├── formatCurrency.ts   # Price formatting
│       ├── industrial.ts       # Industrial helpers
│       └── constants.ts        # App constants
│
├── services/                    # API/Data services
│   ├── products.ts             # Product data service
│   ├── cart.ts                 # Cart persistence
│   └── orders.ts               # Order processing
│
├── types/                       # TypeScript types
│   ├── product.ts              # Product interfaces
│   ├── cart.ts                 # Cart types
│   ├── industrial.ts           # Component prop types
│   └── global.d.ts             # Global type declarations
│
├── styles/                      # Additional styles
│   ├── industrial/             # Industrial CSS modules
│   │   ├── textures.css        # Metal textures
│   │   ├── animations.css      # CSS animations
│   │   └── effects.css         # Visual effects
│   └── variables.css           # CSS custom properties
│
└── data/                        # Static data
    ├── items.json              # Product catalog
    ├── certifications.json     # Fake certifications
    └── specifications.json     # Technical specs

/public
├── fonts/                       # Industrial fonts
│   ├── bebas-neue/             # Header font
│   └── roboto-mono/            # Technical font
├── images/
│   ├── products/               # Product images
│   ├── industrial/             # UI textures/patterns
│   └── certifications/         # Badge images
└── sounds/                      # Optional sound effects
    ├── mechanical-click.mp3
    └── hydraulic-open.mp3

/__tests__                       # Test files
├── unit/
├── integration/
└── e2e/

/scripts                         # Build/utility scripts
├── generate-component.js        # Component scaffolding
└── optimize-images.js          # Image optimization
```

## Section 4: Component Standards

### Component Template

```typescript
// components/industrial/core/Button/Button.tsx
'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles - industrial foundation
  'relative inline-flex items-center justify-center font-bebas tracking-wider uppercase transition-all duration-150 select-none',
  {
    variants: {
      variant: {
        primary: [
          'bg-warning-amber text-gunmetal-900',
          'shadow-industrial hover:shadow-industrial-lg',
          'border-2 border-amber-600',
          'before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/10',
          'hover:scale-[1.02] active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
        ],
        secondary: [
          'bg-gradient-to-b from-gray-600 to-gray-700 text-gray-100',
          'border-2 border-gray-800 shadow-rivet',
          'hover:from-gray-500 hover:to-gray-600',
          'active:from-gray-700 active:to-gray-800'
        ],
        danger: [
          'bg-gradient-to-b from-red-600 to-red-700 text-white',
          'border-2 border-red-800 shadow-industrial',
          'before:absolute before:inset-0 before:bg-hazard-stripes before:opacity-20',
          'hover:from-red-500 hover:to-red-600'
        ],
        ghost: [
          'bg-transparent text-gray-300',
          'border-2 border-gray-600 hover:border-amber-500',
          'hover:text-amber-500 hover:bg-gray-800/50'
        ]
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl'
      },
      loading: {
        true: 'cursor-wait'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    Omit<HTMLMotionProps<"button">, keyof ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
  icon?: React.ReactNode;
  soundEnabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading, 
    icon,
    soundEnabled = false,
    children, 
    disabled,
    onClick,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEnabled && typeof window !== 'undefined') {
        // Play mechanical click sound
        const audio = new Audio('/sounds/mechanical-click.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore errors
      }
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, loading, className }))}
        disabled={disabled || loading}
        onClick={handleClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.1 }}
        {...props}
      >
        {loading ? (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            </span>
            <span className="invisible">{children}</span>
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
        
        {/* Industrial detail overlays */}
        <span className="absolute top-0 left-0 w-2 h-2">
          <span className="absolute w-1 h-1 bg-current opacity-20 rounded-full" />
        </span>
        <span className="absolute top-0 right-0 w-2 h-2">
          <span className="absolute right-0 w-1 h-1 bg-current opacity-20 rounded-full" />
        </span>
        <span className="absolute bottom-0 left-0 w-2 h-2">
          <span className="absolute bottom-0 w-1 h-1 bg-current opacity-20 rounded-full" />
        </span>
        <span className="absolute bottom-0 right-0 w-2 h-2">
          <span className="absolute bottom-0 right-0 w-1 h-1 bg-current opacity-20 rounded-full" />
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
```

### Naming Conventions

**File Naming:**
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`, `NavigationPanel.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useCart.ts`, `useIndustrialTheme.ts`)
- Utilities: `camelCase.ts` (e.g., `formatCurrency.ts`, `industrialHelpers.ts`)
- Types: `camelCase.ts` (e.g., `product.ts`, `cart.ts`)
- Constants: `UPPER_SNAKE_CASE` in files (e.g., `MAX_CART_ITEMS`, `INDUSTRIAL_BREAKPOINTS`)

**Component Naming:**
- Industrial components: Prefix with component type (e.g., `IndustrialButton`, `IndustrialCard`)
- Feature components: Domain-specific names (e.g., `ProductCard`, `CartSummary`)
- Layout components: Descriptive names (e.g., `MetalContainer`, `HazardBorder`)

**CSS Class Naming (Tailwind utilities):**
- Custom utilities: `industrial-` prefix (e.g., `shadow-industrial`, `bg-metal-texture`)
- Animation classes: `animate-` prefix (e.g., `animate-mechanical-press`)
- State modifiers: Standard Tailwind patterns (e.g., `hover:`, `active:`, `disabled:`)

**Props Naming:**
- Boolean props: `is`/`has` prefix (e.g., `isLoading`, `hasError`)
- Event handlers: `on` prefix (e.g., `onClick`, `onAddToCart`)
- Render props: `render` prefix (e.g., `renderIcon`, `renderBadge`)

**Type Naming:**
- Interfaces: `I` prefix optional, descriptive names preferred (e.g., `Product`, `CartItem`)
- Type aliases: Descriptive names (e.g., `CartState`, `IndustrialTheme`)
- Enums: Singular PascalCase (e.g., `ProductCategory`, `ButtonVariant`)

**Hook Naming:**
- State hooks: `use[Domain][State]` (e.g., `useCartState`, `useProductFilters`)
- Effect hooks: `use[Action]` (e.g., `useMechanicalSound`, `useLocalStorage`)
- Context hooks: `use[Context]` (e.g., `useCart`, `useTheme`)

**Service/API Naming:**
- Service classes: `[Domain]Service` (e.g., `ProductService`, `CartService`)
- API functions: verb-first (e.g., `fetchProducts`, `saveCart`, `processOrder`)

**Test File Naming:**
- Unit tests: `[Component].test.tsx` (co-located)
- Integration tests: `[Feature].integration.test.ts`
- E2E tests: `[UserFlow].e2e.test.ts`

## Section 5: State Management

### Store Structure

```plaintext
/src/contexts/
├── CartContext.tsx              # Shopping cart state and operations
├── ThemeContext.tsx             # Industrial theme variations
├── AnimationContext.tsx         # User animation preferences  
├── UIContext.tsx                # UI state (modals, loading, alerts)
├── providers/
│   └── RootProvider.tsx         # Combines all providers
├── hooks/
│   ├── useCart.ts              # Cart operations hook
│   ├── useTheme.ts             # Theme operations hook
│   ├── useAnimation.ts         # Animation preferences hook
│   └── useUI.ts                # UI state hook
└── __tests__/
    ├── CartContext.test.tsx
    └── ThemeContext.test.tsx
```

### State Management Template

```typescript
// contexts/CartContext.tsx
'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartItem, CartAction } from '@/types/cart';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
  isLoading: false,
  error: null,
  metadata: {
    lastUpdated: null,
    requisitionNumber: null,
  }
};

// Action types
enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  TOGGLE_CART = 'TOGGLE_CART',
  LOAD_CART = 'LOAD_CART',
  GENERATE_REQUISITION = 'GENERATE_REQUISITION',
}

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
          addedAt: new Date().toISOString(),
        };
        return {
          ...state,
          items: updatedItems,
          metadata: { ...state.metadata, lastUpdated: new Date().toISOString() }
        };
      }

      // Add new item
      return {
        ...state,
        items: [...state.items, { 
          ...action.payload, 
          addedAt: new Date().toISOString(),
          requisitionStatus: 'PENDING' 
        }],
        metadata: { ...state.metadata, lastUpdated: new Date().toISOString() }
      };
    }

    case CartActionType.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        metadata: { ...state.metadata, lastUpdated: new Date().toISOString() }
      };

    case CartActionType.UPDATE_QUANTITY: {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems.filter(item => item.quantity > 0),
        metadata: { ...state.metadata, lastUpdated: new Date().toISOString() }
      };
    }

    case CartActionType.CLEAR_CART:
      return {
        ...initialState,
        metadata: { 
          lastUpdated: new Date().toISOString(),
          requisitionNumber: null 
        }
      };

    case CartActionType.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case CartActionType.SET_ERROR:
      return { ...state, error: action.payload };

    case CartActionType.TOGGLE_CART:
      return { ...state, isOpen: !state.isOpen };

    case CartActionType.LOAD_CART:
      return { ...state, ...action.payload };

    case CartActionType.GENERATE_REQUISITION:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          requisitionNumber: `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        }
      };

    default:
      return state;
  }
};

// Context
interface CartContextValue {
  state: CartState;
  addItem: (item: Omit<CartItem, 'addedAt' | 'requisitionStatus'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  generateRequisition: () => string;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Provider component
interface CartProviderProps {
  children: ReactNode;
  storageKey?: string;
}

export const CartProvider = ({ 
  children, 
  storageKey = 'industrial-cart' 
}: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [storedCart, setStoredCart] = useLocalStorage<CartState>(storageKey, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (storedCart && storedCart.items.length > 0) {
      dispatch({ type: CartActionType.LOAD_CART, payload: storedCart });
    }
  }, []);

  // Persist cart to localStorage on changes
  useEffect(() => {
    if (state.metadata.lastUpdated) {
      setStoredCart(state);
    }
  }, [state, setStoredCart]);

  // Industrial operations
  const addItem = (item: Omit<CartItem, 'addedAt' | 'requisitionStatus'>) => {
    dispatch({ 
      type: CartActionType.ADD_ITEM, 
      payload: { ...item, quantity: item.quantity || 1 } 
    });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: CartActionType.REMOVE_ITEM, payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ 
      type: CartActionType.UPDATE_QUANTITY, 
      payload: { id: itemId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionType.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CartActionType.TOGGLE_CART });
  };

  const generateRequisition = (): string => {
    dispatch({ type: CartActionType.GENERATE_REQUISITION });
    return state.metadata.requisitionNumber || 'REQ-ERROR';
  };

  const getTotalItems = (): number => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextValue = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    generateRequisition,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook for consuming cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Additional hooks for specific cart operations
export const useCartState = () => {
  const { state } = useCart();
  return state;
};

export const useCartActions = () => {
  const { addItem, removeItem, updateQuantity, clearCart, toggleCart, generateRequisition } = useCart();
  return { addItem, removeItem, updateQuantity, clearCart, toggleCart, generateRequisition };
};

export const useCartMetrics = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  return { totalItems: getTotalItems(), totalPrice: getTotalPrice() };
};
```

## Section 6: API Integration

### Service Template

```typescript
// services/products.ts
import { Product, ProductCategory, ProductFilter } from '@/types/product';
import { ApiResponse, ApiError } from '@/types/api';

// Base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const STATIC_DATA_PATH = '/data/items.json';

// Service class for product operations
export class ProductService {
  private static instance: ProductService;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  /**
   * Fetch all products with industrial error handling
   */
  async fetchProducts(filter?: ProductFilter): Promise<ApiResponse<Product[]>> {
    try {
      // Check cache first
      const cacheKey = `products_${JSON.stringify(filter || {})}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return { success: true, data: cached };
      }

      // For now, fetch from static JSON
      const response = await fetch(STATIC_DATA_PATH);
      
      if (!response.ok) {
        throw new ApiError(
          'INVENTORY_SYSTEM_FAILURE',
          `Unable to access inventory database. Error code: ${response.status}`,
          response.status
        );
      }

      let products: Product[] = await response.json();

      // Apply industrial-themed filtering
      if (filter) {
        products = this.applyFilters(products, filter);
      }

      // Transform products with industrial enhancements
      products = products.map(product => ({
        ...product,
        partNumber: `LDB-${product.id.toUpperCase()}-X`,
        certifications: this.generateCertifications(),
        specifications: this.generateSpecifications(product),
        stockStatus: this.calculateStockStatus(product),
      }));

      // Cache the results
      this.setCache(cacheKey, products);

      return { 
        success: true, 
        data: products,
        metadata: {
          timestamp: new Date().toISOString(),
          totalItems: products.length,
          cacheStatus: 'MISS'
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Fetch single product by ID
   */
  async fetchProduct(id: string): Promise<ApiResponse<Product>> {
    try {
      const cacheKey = `product_${id}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return { success: true, data: cached };
      }

      // Fetch all products and find the specific one
      const allProducts = await this.fetchProducts();
      
      if (!allProducts.success) {
        throw new ApiError(
          'PRODUCT_FETCH_FAILED',
          'Failed to retrieve product catalog',
          500
        );
      }

      const product = allProducts.data.find(p => p.id === id);
      
      if (!product) {
        throw new ApiError(
          'PRODUCT_NOT_FOUND',
          `Part number ${id} not found in inventory system`,
          404
        );
      }

      this.setCache(cacheKey, product);

      return { 
        success: true, 
        data: product,
        metadata: {
          timestamp: new Date().toISOString(),
          cacheStatus: 'MISS'
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Search products with industrial query processing
   */
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    try {
      const normalizedQuery = query.toLowerCase();
      const allProducts = await this.fetchProducts();

      if (!allProducts.success) {
        return allProducts;
      }

      const results = allProducts.data.filter(product => 
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description?.toLowerCase().includes(normalizedQuery) ||
        product.partNumber?.toLowerCase().includes(normalizedQuery)
      );

      return {
        success: true,
        data: results,
        metadata: {
          searchQuery: query,
          resultCount: results.length,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Private helper methods
  private applyFilters(products: Product[], filter: ProductFilter): Product[] {
    let filtered = [...products];

    if (filter.category) {
      filtered = filtered.filter(p => p.category === filter.category);
    }

    if (filter.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filter.maxPrice!);
    }

    if (filter.inStock !== undefined) {
      filtered = filtered.filter(p => p.stockStatus !== 'OUT_OF_STOCK');
    }

    // Industrial sorting
    if (filter.sortBy) {
      filtered.sort((a, b) => {
        switch (filter.sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'part_number':
            return (a.partNumber || '').localeCompare(b.partNumber || '');
          default:
            return 0;
        }
      });
    }

    return filtered;
  }

  private generateCertifications(): string[] {
    return [
      'ISO 9001:2015',
      'MIL-SPEC-45662A',
      'AS9100D',
      'ITAR Compliant',
      'CE Marked'
    ];
  }

  private generateSpecifications(product: Product): Record<string, string> {
    return {
      'Operating Temperature': '-40°C to +85°C',
      'Humidity Resistance': '95% RH non-condensing',
      'Vibration Tolerance': '20G @ 10-2000Hz',
      'MTBF': '100,000 hours',
      'Warranty': '10 years limited',
      'Compliance': 'RoHS, REACH, Conflict-Free'
    };
  }

  private calculateStockStatus(product: Product): 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'BACKORDERED' {
    // Simulate stock levels
    const stockLevel = Math.floor(Math.random() * 100);
    
    if (stockLevel === 0) return 'OUT_OF_STOCK';
    if (stockLevel < 10) return 'LOW_STOCK';
    if (Math.random() < 0.1) return 'BACKORDERED';
    return 'IN_STOCK';
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private handleError(error: unknown): ApiResponse<any> {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          status: error.status
        }
      };
    }

    console.error('Unexpected error in ProductService:', error);
    
    return {
      success: false,
      error: {
        code: 'SYSTEM_MALFUNCTION',
        message: 'Critical system error. Contact facility maintenance.',
        status: 500
      }
    };
  }
}

// Export singleton instance
export const productService = ProductService.getInstance();

// Custom error class
export class ApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

### API Client Configuration

```typescript
// lib/api/client.ts
import { ApiError } from '@/services/products';

interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Industrial-grade HTTP client with retry logic and timeout handling
 */
export class IndustrialHttpClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private defaultTimeout: number = 30000; // 30 seconds

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Client-Type': 'Industrial-Frontend',
      'X-Client-Version': process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    };
  }

  /**
   * Execute HTTP request with industrial-grade error handling
   */
  async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = 3,
      retryDelay = 1000,
      headers = {},
      ...fetchConfig
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const executeRequest = async (attempt: number): Promise<T> => {
      try {
        const response = await fetch(url, {
          ...fetchConfig,
          headers: {
            ...this.defaultHeaders,
            ...headers,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Handle industrial-themed error responses
        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new ApiError(
            errorBody.code || 'REQUEST_FAILED',
            errorBody.message || `System error: HTTP ${response.status}`,
            response.status
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        clearTimeout(timeoutId);

        // Handle timeout
        if (error instanceof Error && error.name === 'AbortError') {
          throw new ApiError(
            'TIMEOUT_ERROR',
            'Operation timeout. Check system connectivity.',
            408
          );
        }

        // Retry logic
        if (attempt < retries && this.shouldRetry(error)) {
          await this.delay(retryDelay * attempt);
          return executeRequest(attempt + 1);
        }

        throw error;
      }
    };

    return executeRequest(1);
  }

  /**
   * GET request with industrial logging
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'GET',
    });
  }

  /**
   * POST request with payload validation
   */
  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request for updates
   */
  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request with confirmation
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'DELETE',
    });
  }

  // Helper methods
  private shouldRetry(error: any): boolean {
    if (error instanceof ApiError) {
      // Retry on specific error codes
      return [408, 429, 502, 503, 504].includes(error.status);
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export configured client instance
export const apiClient = new IndustrialHttpClient(
  process.env.NEXT_PUBLIC_API_URL || ''
);

// Type definitions for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    status: number;
  };
  metadata?: Record<string, any>;
}

// Industrial-themed request interceptor for auth
export function withAuth(client: IndustrialHttpClient): IndustrialHttpClient {
  // Add authorization header if token exists
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('facility_access_token') 
    : null;
    
  if (token) {
    Object.assign(client['defaultHeaders'], {
      'Authorization': `Bearer ${token}`,
      'X-Facility-ID': 'LAKE-DRONE-FAC-001'
    });
  }
  
  return client;
}
```

## Section 7: Routing

### Route Configuration

```typescript
// app/layout.tsx - Root Layout with Industrial Theme
import { Inter, Bebas_Neue, Roboto_Mono } from 'next/font/google';
import { Metadata } from 'next';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AnimationProvider } from '@/contexts/AnimationContext';
import { UIProvider } from '@/contexts/UIContext';
import { NavigationPanel } from '@/components/industrial/composite/NavigationPanel';
import { IndustrialFooter } from '@/components/shared/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Lake Drone Builders - Military-Grade Drone Components',
    template: '%s | Lake Drone Builders'
  },
  description: 'Professional supplier of military-grade drone components and assemblies. ISO 9001:2015 certified. ITAR compliant.',
  keywords: ['drone components', 'military grade', 'UAV parts', 'industrial drone'],
  openGraph: {
    title: 'Lake Drone Builders - Military-Grade Drone Components',
    description: 'Professional supplier of military-grade drone components',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lake Drone Builders',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${robotoMono.variable}`}>
      <body className="bg-gray-900 text-gray-100 font-sans min-h-screen flex flex-col">
        <ThemeProvider>
          <AnimationProvider>
            <UIProvider>
              <CartProvider>
                <NavigationPanel />
                <main className="flex-1 relative">
                  {/* Industrial background pattern */}
                  <div className="fixed inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-industrial-grid" />
                  </div>
                  {children}
                </main>
                <IndustrialFooter />
              </CartProvider>
            </UIProvider>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// app/page.tsx - Landing Page
import { HeroSection } from '@/components/features/landing/HeroSection';
import { FeaturedProducts } from '@/components/features/landing/FeaturedProducts';
import { CompanyCredentials } from '@/components/features/landing/CompanyCredentials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CompanyCredentials />
    </>
  );
}

// app/products/page.tsx - Product Catalog
import { Suspense } from 'react';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { ProductFilters } from '@/components/features/products/ProductFilters';
import { CategoryTabs } from '@/components/features/products/CategoryTabs';
import { IndustrialLoadingGrid } from '@/components/industrial/composite/LoadingStates';

export const metadata: Metadata = {
  title: 'Product Inventory',
  description: 'Browse our complete inventory of military-grade drone components',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="font-bebas text-5xl text-amber-500 mb-2">
          COMPONENT INVENTORY DATABASE
        </h1>
        <p className="text-gray-400 font-mono">
          ACCESS LEVEL: PUBLIC | CLASSIFICATION: UNCLASSIFIED
        </p>
      </header>
      
      <CategoryTabs />
      <ProductFilters />
      
      <Suspense fallback={<IndustrialLoadingGrid />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}

// app/products/[id]/page.tsx - Product Detail
import { notFound } from 'next/navigation';
import { productService } from '@/services/products';
import { ProductDetail } from '@/components/features/products/ProductDetail';
import { TechnicalSpecs } from '@/components/industrial/composite/TechnicalSpecs';
import { RelatedProducts } from '@/components/features/products/RelatedProducts';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const response = await productService.fetchProducts();
  
  if (!response.success) {
    return [];
  }
  
  return response.data.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const response = await productService.fetchProduct(params.id);
  
  if (!response.success || !response.data) {
    return {
      title: 'Product Not Found',
    };
  }
  
  const product = response.data;
  
  return {
    title: `${product.partNumber} - ${product.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const response = await productService.fetchProduct(params.id);
  
  if (!response.success || !response.data) {
    notFound();
  }
  
  const product = response.data;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
      <TechnicalSpecs specifications={product.specifications} />
      <RelatedProducts 
        currentProductId={product.id} 
        category={product.category} 
      />
    </div>
  );
}

// app/cart/page.tsx - Shopping Cart
'use client';

import { useCart } from '@/contexts/CartContext';
import { RequisitionForm } from '@/components/industrial/composite/RequisitionForm';
import { EmptyCart } from '@/components/features/cart/EmptyCart';

export default function CartPage() {
  const { state } = useCart();
  
  if (state.items.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="font-bebas text-5xl text-amber-500 mb-2">
          PROCUREMENT REQUISITION FORM
        </h1>
        <p className="text-gray-400 font-mono">
          FORM PRF-2024 | REV. 3.1 | APPROVAL REQUIRED
        </p>
      </header>
      
      <RequisitionForm />
    </div>
  );
}

// app/checkout/page.tsx - Checkout Flow
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { OrderForm } from '@/components/features/checkout/OrderForm';
import { OrderSummary } from '@/components/features/checkout/OrderSummary';

export default function CheckoutPage() {
  const router = useRouter();
  const { state } = useCart();
  
  useEffect(() => {
    // Redirect to cart if empty
    if (state.items.length === 0) {
      router.push('/cart');
    }
  }, [state.items, router]);
  
  if (state.items.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="font-bebas text-5xl text-amber-500 mb-2">
          PURCHASE ORDER PROCESSING
        </h1>
        <p className="text-gray-400 font-mono">
          SECURE TRANSACTION | SSL ENCRYPTED | PCI COMPLIANT
        </p>
      </header>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

// app/about/page.tsx - About Page
import { Metadata } from 'next';
import { CompanyHistory } from '@/components/features/about/CompanyHistory';
import { LeadershipTeam } from '@/components/features/about/LeadershipTeam';
import { Certifications } from '@/components/features/about/Certifications';
import { ManufacturingCapabilities } from '@/components/features/about/ManufacturingCapabilities';

export const metadata: Metadata = {
  title: 'About Lake Drone Builders',
  description: 'Established 1987. Leading supplier of military-grade drone components.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="font-bebas text-5xl text-amber-500 mb-2">
          FACILITY INFORMATION
        </h1>
        <p className="text-gray-400 font-mono">
          LAKE DRONE BUILDERS CORPORATION | EST. 1987
        </p>
      </header>
      
      <CompanyHistory />
      <Certifications />
      <ManufacturingCapabilities />
      <LeadershipTeam />
    </div>
  );
}

// middleware.ts - Route Protection and Analytics
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Industrial-themed route logging
  const timestamp = new Date().toISOString();
  const facilityId = request.cookies.get('facility_id')?.value || 'GUEST';
  
  console.log(`[${timestamp}] ROUTE ACCESS: ${request.nextUrl.pathname} | FACILITY: ${facilityId}`);
  
  // Add industrial headers to response
  const response = NextResponse.next();
  response.headers.set('X-Industrial-Site', 'Lake-Drone-Builders');
  response.headers.set('X-Security-Level', 'UNCLASSIFIED');
  response.headers.set('X-Facility-Status', 'OPERATIONAL');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## Section 8: Styling Guidelines

### Styling Approach

The LakeDroneBuilders frontend uses Tailwind CSS as the primary styling solution, enhanced with custom utilities and CSS variables for the industrial theme. This approach provides:

- **Utility-first styling** for rapid development and consistency
- **Custom industrial utilities** for unique design elements
- **CSS custom properties** for dynamic theming and animations
- **PostCSS plugins** for advanced CSS features
- **Component-scoped styles** when needed for complex animations

### Global Theme Variables

```css
/* app/globals.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  :root {
    /* Industrial Color Palette */
    --color-primary: 245 158 11; /* Amber 500 */
    --color-secondary: 55 65 81; /* Gray 700 */
    --color-accent: 16 185 129; /* Emerald 500 */
    --color-danger: 239 68 68; /* Red 500 */
    --color-warning: 245 158 11; /* Amber 500 */
    --color-success: 16 185 129; /* Emerald 500 */
    
    /* Gunmetal Grays */
    --color-gunmetal-50: 249 250 251;
    --color-gunmetal-100: 243 244 246;
    --color-gunmetal-200: 229 231 235;
    --color-gunmetal-300: 209 213 219;
    --color-gunmetal-400: 156 163 175;
    --color-gunmetal-500: 107 114 128;
    --color-gunmetal-600: 75 85 99;
    --color-gunmetal-700: 55 65 81;
    --color-gunmetal-800: 31 41 55;
    --color-gunmetal-900: 17 24 39;
    
    /* Industrial Spacing */
    --spacing-unit: 0.25rem;
    --spacing-xs: calc(var(--spacing-unit) * 2); /* 0.5rem */
    --spacing-sm: calc(var(--spacing-unit) * 4); /* 1rem */
    --spacing-md: calc(var(--spacing-unit) * 6); /* 1.5rem */
    --spacing-lg: calc(var(--spacing-unit) * 8); /* 2rem */
    --spacing-xl: calc(var(--spacing-unit) * 12); /* 3rem */
    --spacing-2xl: calc(var(--spacing-unit) * 16); /* 4rem */
    
    /* Typography Scale */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    --font-size-5xl: 3rem;
    --font-size-6xl: 3.75rem;
    
    /* Industrial Shadows */
    --shadow-rivet: inset 0 2px 4px 0 rgb(0 0 0 / 0.2);
    --shadow-industrial: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -1px rgb(0 0 0 / 0.2);
    --shadow-industrial-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -2px rgb(0 0 0 / 0.2);
    --shadow-metal: 0 0 0 1px rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.1);
    
    /* Animation Timings */
    --duration-instant: 75ms;
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --duration-slower: 700ms;
    
    /* Industrial Easings */
    --ease-mechanical: cubic-bezier(0.4, 0, 0.6, 1);
    --ease-hydraulic: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-pneumatic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --ease-industrial: cubic-bezier(0.77, 0, 0.175, 1);
  }
  
  /* Dark mode (always on for industrial theme) */
  html {
    @apply bg-gunmetal-900 text-gunmetal-100;
  }
  
  /* Font families */
  .font-bebas {
    font-family: var(--font-bebas), sans-serif;
  }
  
  .font-mono {
    font-family: var(--font-mono), monospace;
  }
}

@layer components {
  /* Industrial button base */
  .btn-industrial {
    @apply relative inline-flex items-center justify-center;
    @apply font-bebas tracking-wider uppercase;
    @apply transition-all duration-150 select-none;
    @apply border-2 shadow-industrial;
    @apply hover:scale-[1.02] active:scale-[0.98];
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100;
  }
  
  /* Metal container */
  .container-metal {
    @apply relative overflow-hidden;
    @apply bg-gradient-to-b from-gunmetal-700 to-gunmetal-800;
    @apply border-2 border-gunmetal-600;
    @apply shadow-industrial rounded-sm;
    
    /* Rivet corners */
    &::before,
    &::after {
      @apply absolute w-2 h-2 bg-gunmetal-500 rounded-full;
      content: '';
    }
    
    &::before {
      @apply top-2 left-2;
      box-shadow: var(--shadow-rivet);
    }
    
    &::after {
      @apply top-2 right-2;
      box-shadow: var(--shadow-rivet);
    }
  }
  
  /* Hazard stripes */
  .bg-hazard-stripes {
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgb(245 158 11 / 0.1) 10px,
      rgb(245 158 11 / 0.1) 20px
    );
  }
  
  /* Industrial grid pattern */
  .bg-industrial-grid {
    background-image: 
      linear-gradient(rgba(75, 85, 99, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(75, 85, 99, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  /* Technical readout text */
  .text-readout {
    @apply font-mono text-sm uppercase tracking-wider;
    @apply text-amber-500;
    text-shadow: 0 0 10px rgb(245 158 11 / 0.5);
  }
}

@layer utilities {
  /* Industrial animations */
  @keyframes mechanical-press {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(0.98); }
  }
  
  @keyframes hydraulic-open {
    0% { transform: scaleY(0); transform-origin: center; }
    100% { transform: scaleY(1); }
  }
  
  @keyframes warning-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes industrial-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-mechanical-press {
    animation: mechanical-press var(--duration-fast) var(--ease-mechanical);
  }
  
  .animate-hydraulic-open {
    animation: hydraulic-open var(--duration-normal) var(--ease-hydraulic);
  }
  
  .animate-warning-pulse {
    animation: warning-pulse 2s var(--ease-industrial) infinite;
  }
  
  .animate-industrial-spin {
    animation: industrial-spin 1s linear infinite;
  }
  
  /* Metal gradients */
  .bg-metal-gradient {
    @apply bg-gradient-to-b from-gunmetal-600 via-gunmetal-700 to-gunmetal-800;
  }
  
  .bg-steel-gradient {
    background: linear-gradient(
      135deg,
      #8b8c8e 0%,
      #656668 25%,
      #8b8c8e 50%,
      #656668 75%,
      #8b8c8e 100%
    );
  }
  
  /* Industrial borders */
  .border-industrial {
    @apply border-2 border-gunmetal-600;
    box-shadow: inset 0 1px 0 0 rgb(156 163 175 / 0.1);
  }
  
  /* Custom focus states */
  .focus-industrial {
    @apply focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2;
    @apply focus:ring-offset-gunmetal-800;
  }
  
  /* Loading states */
  .skeleton-industrial {
    @apply animate-pulse bg-gradient-to-r from-gunmetal-700 via-gunmetal-600 to-gunmetal-700;
    background-size: 200% 100%;
    animation: skeleton-industrial 1.5s ease-in-out infinite;
  }
  
  @keyframes skeleton-industrial {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  @apply bg-gunmetal-800;
  border: 1px solid theme('colors.gunmetal.700');
}

::-webkit-scrollbar-thumb {
  @apply bg-gunmetal-600;
  border: 1px solid theme('colors.gunmetal.500');
  
  &:hover {
    @apply bg-gunmetal-500;
  }
}

/* Industrial form inputs */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
textarea,
select {
  @apply bg-gunmetal-800 border-industrial;
  @apply text-gunmetal-100 placeholder-gunmetal-400;
  @apply focus-industrial;
  @apply px-4 py-2 rounded-sm;
  
  &:disabled {
    @apply bg-gunmetal-900 cursor-not-allowed opacity-50;
  }
}

/* Tailwind Config Extension */
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        gunmetal: {
          50: 'rgb(var(--color-gunmetal-50) / <alpha-value>)',
          100: 'rgb(var(--color-gunmetal-100) / <alpha-value>)',
          200: 'rgb(var(--color-gunmetal-200) / <alpha-value>)',
          300: 'rgb(var(--color-gunmetal-300) / <alpha-value>)',
          400: 'rgb(var(--color-gunmetal-400) / <alpha-value>)',
          500: 'rgb(var(--color-gunmetal-500) / <alpha-value>)',
          600: 'rgb(var(--color-gunmetal-600) / <alpha-value>)',
          700: 'rgb(var(--color-gunmetal-700) / <alpha-value>)',
          800: 'rgb(var(--color-gunmetal-800) / <alpha-value>)',
          900: 'rgb(var(--color-gunmetal-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        rivet: 'var(--shadow-rivet)',
        industrial: 'var(--shadow-industrial)',
        'industrial-lg': 'var(--shadow-industrial-lg)',
        metal: 'var(--shadow-metal)',
      },
      animation: {
        'mechanical-press': 'mechanical-press var(--duration-fast) var(--ease-mechanical)',
        'hydraulic-open': 'hydraulic-open var(--duration-normal) var(--ease-hydraulic)',
        'warning-pulse': 'warning-pulse 2s var(--ease-industrial) infinite',
        'industrial-spin': 'industrial-spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

## Section 9: Testing Requirements

### Component Test Template

```typescript
// components/industrial/core/Button/Button.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock Framer Motion for consistent testing
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Industrial Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Test Button</Button>);
      
      const button = screen.getByRole('button', { name: /test button/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-warning-amber');
    });

    it('renders all variants correctly', () => {
      const variants = ['primary', 'secondary', 'danger', 'ghost'] as const;
      
      variants.forEach(variant => {
        const { rerender } = render(
          <Button variant={variant}>{variant} Button</Button>
        );
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        
        // Clean up for next iteration
        rerender(<></>);
      });
    });

    it('renders with icon', () => {
      const TestIcon = () => <span data-testid="test-icon">⚙️</span>;
      
      render(
        <Button icon={<TestIcon />}>Button with Icon</Button>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('shows loading state', () => {
      render(<Button loading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('cursor-wait');
      
      // Check for spinner
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents clicks when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('plays sound when soundEnabled', async () => {
      const mockPlay = jest.fn().mockResolvedValue(undefined);
      const mockAudio = jest.fn().mockImplementation(() => ({
        play: mockPlay,
        volume: 0,
      }));
      
      global.Audio = mockAudio as any;
      
      const user = userEvent.setup();
      render(<Button soundEnabled>Sound Button</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(mockAudio).toHaveBeenCalledWith('/sounds/mechanical-click.mp3');
      expect(mockPlay).toHaveBeenCalled();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = render(
        <Button variant="primary">Accessible Button</Button>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard Button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('has proper ARIA attributes when loading', () => {
      render(<Button loading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Visual regression tests (with jest-image-snapshot)
  describe('Visual Regression', () => {
    it('matches visual snapshot for all variants', async () => {
      const { container } = render(
        <div className="p-4 space-y-4 bg-gray-900">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      );
      
      // Wait for animations to settle
      await waitFor(() => {
        expect(container).toMatchImageSnapshot({
          customSnapshotIdentifier: 'button-variants',
          threshold: 0.01,
        });
      });
    });
  });

  // Performance tests
  describe('Performance', () => {
    it('renders within performance budget', () => {
      const startTime = performance.now();
      
      render(<Button>Performance Test</Button>);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render in under 16ms (one frame at 60fps)
      expect(renderTime).toBeLessThan(16);
    });

    it('handles rapid clicks without memory leaks', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      const { unmount } = render(
        <Button onClick={handleClick}>Rapid Click Test</Button>
      );
      
      const button = screen.getByRole('button');
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        await user.click(button);
      }
      
      expect(handleClick).toHaveBeenCalledTimes(10);
      
      // Clean up and ensure no memory leaks
      unmount();
    });
  });
});

// Test utilities for industrial components
export const industrialTestUtils = {
  // Helper to test industrial animations
  async testMechanicalAnimation(element: HTMLElement) {
    const initialTransform = getComputedStyle(element).transform;
    
    fireEvent.mouseEnter(element);
    await waitFor(() => {
      const currentTransform = getComputedStyle(element).transform;
      expect(currentTransform).not.toBe(initialTransform);
    });
    
    fireEvent.mouseLeave(element);
  },
  
  // Helper to test industrial themes
  testIndustrialStyling(element: HTMLElement, expectedClasses: string[]) {
    expectedClasses.forEach(className => {
      expect(element).toHaveClass(className);
    });
  },
  
  // Mock industrial context providers
  wrapWithProviders(component: React.ReactElement) {
    return (
      <ThemeProvider>
        <AnimationProvider>
          {component}
        </AnimationProvider>
      </ThemeProvider>
    );
  },
};
```

### Testing Best Practices

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test critical user flows (using Cypress/Playwright)
4. **Coverage Goals**: Aim for 80% code coverage
5. **Test Structure**: Arrange-Act-Assert pattern
6. **Mock External Dependencies**: API calls, routing, state management

### Additional Testing Configurations

```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/test/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { jest } from '@jest/globals';

// Cleanup after each test
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/test-path',
}));

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// E2E Test Example with Playwright
// e2e/shopping-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Industrial Shopping Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete purchase flow', async ({ page }) => {
    // Navigate to products
    await page.click('text=BROWSE INVENTORY');
    await expect(page).toHaveURL('/products');
    
    // Add product to cart
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.locator('button:has-text("ADD TO REQUISITION")').click();
    
    // Verify cart notification
    await expect(page.locator('[data-testid="cart-badge"]')).toContainText('1');
    
    // Go to cart
    await page.click('[data-testid="cart-link"]');
    await expect(page).toHaveURL('/cart');
    
    // Verify requisition form
    await expect(page.locator('h1')).toContainText('PROCUREMENT REQUISITION FORM');
    
    // Proceed to checkout
    await page.click('text=PROCESS PURCHASE ORDER');
    await expect(page).toHaveURL('/checkout');
    
    // Fill out order form
    await page.fill('[name="facilityCode"]', 'FAC-001');
    await page.fill('[name="authorizationLevel"]', 'ALPHA');
    
    // Submit order
    await page.click('text=SUBMIT REQUISITION');
    
    // Verify confirmation
    await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible();
  });

  test('industrial theme renders correctly', async ({ page }) => {
    // Check for industrial styling
    const header = page.locator('header');
    await expect(header).toHaveCSS('background-color', 'rgb(31, 41, 55)');
    
    // Verify industrial fonts
    const heading = page.locator('h1').first();
    await expect(heading).toHaveCSS('font-family', /Bebas/);
    
    // Test mechanical animations
    const button = page.locator('button').first();
    await button.hover();
    
    // Screenshot for visual regression
    await expect(page).toHaveScreenshot('industrial-homepage.png', {
      maxDiffPixels: 100,
    });
  });

  test('accessibility compliance', async ({ page }) => {
    // Run axe accessibility tests
    await page.addScriptTag({
      path: require.resolve('axe-core/axe.min.js'),
    });
    
    const violations = await page.evaluate(async () => {
      const results = await (window as any).axe.run();
      return results.violations;
    });
    
    expect(violations).toHaveLength(0);
  });
});
```

## Section 10: Environment Configuration

### Environment Variables

```bash
# .env.local (for local development)
# Next.js public variables (exposed to browser)
NEXT_PUBLIC_APP_NAME="Lake Drone Builders"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_FACILITY_ID="LAKE-DRONE-FAC-001"
NEXT_PUBLIC_SECURITY_LEVEL="UNCLASSIFIED"

# API Configuration (when backend is implemented)
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
NEXT_PUBLIC_API_TIMEOUT="30000"

# Industrial Theme Configuration
NEXT_PUBLIC_ENABLE_SOUNDS="false"
NEXT_PUBLIC_ANIMATION_LEVEL="full" # full | reduced | none
NEXT_PUBLIC_DEBUG_MODE="false"

# Feature Flags
NEXT_PUBLIC_FEATURE_CHECKOUT="false"
NEXT_PUBLIC_FEATURE_USER_ACCOUNTS="false"
NEXT_PUBLIC_FEATURE_INVENTORY_TRACKING="true"
NEXT_PUBLIC_FEATURE_CERTIFICATIONS="true"

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=""
NEXT_PUBLIC_ENABLE_ANALYTICS="false"

# .env.production (for production)
NEXT_PUBLIC_APP_NAME="Lake Drone Builders"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_FACILITY_ID="LAKE-DRONE-FAC-001"
NEXT_PUBLIC_SECURITY_LEVEL="UNCLASSIFIED"

NEXT_PUBLIC_API_URL="https://api.lakedronebuilders.com"
NEXT_PUBLIC_API_TIMEOUT="30000"

NEXT_PUBLIC_ENABLE_SOUNDS="true"
NEXT_PUBLIC_ANIMATION_LEVEL="full"
NEXT_PUBLIC_DEBUG_MODE="false"

NEXT_PUBLIC_FEATURE_CHECKOUT="true"
NEXT_PUBLIC_FEATURE_USER_ACCOUNTS="false"
NEXT_PUBLIC_FEATURE_INVENTORY_TRACKING="true"
NEXT_PUBLIC_FEATURE_CERTIFICATIONS="true"

NEXT_PUBLIC_ANALYTICS_ID="GA-XXXXXXXXX"
NEXT_PUBLIC_ENABLE_ANALYTICS="true"

# Server-side only variables (not exposed to browser)
# Database (future implementation)
DATABASE_URL=""
DATABASE_SSL="true"

# Authentication (future implementation)
AUTH_SECRET=""
AUTH_PROVIDER="custom"

# External Services
INVENTORY_API_KEY=""
CERTIFICATION_SERVICE_URL=""
SHIPPING_CALCULATOR_API=""

# Error Tracking
SENTRY_DSN=""
SENTRY_ENVIRONMENT="production"

# Build Configuration
ANALYZE_BUNDLE="false"
DISABLE_TELEMETRY="true"
```

### Environment Variable Usage

```typescript
// lib/config/environment.ts
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Lake Drone Builders',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    facilityId: process.env.NEXT_PUBLIC_FACILITY_ID || 'UNKNOWN',
    securityLevel: process.env.NEXT_PUBLIC_SECURITY_LEVEL || 'UNCLASSIFIED',
  },
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),
  },
  theme: {
    enableSounds: process.env.NEXT_PUBLIC_ENABLE_SOUNDS === 'true',
    animationLevel: process.env.NEXT_PUBLIC_ANIMATION_LEVEL as 'full' | 'reduced' | 'none' || 'full',
    debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  },
  features: {
    checkout: process.env.NEXT_PUBLIC_FEATURE_CHECKOUT === 'true',
    userAccounts: process.env.NEXT_PUBLIC_FEATURE_USER_ACCOUNTS === 'true',
    inventoryTracking: process.env.NEXT_PUBLIC_FEATURE_INVENTORY_TRACKING === 'true',
    certifications: process.env.NEXT_PUBLIC_FEATURE_CERTIFICATIONS === 'true',
  },
  analytics: {
    id: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  // Server-side only
  server: {
    databaseUrl: process.env.DATABASE_URL || '',
    authSecret: process.env.AUTH_SECRET || '',
    sentryDsn: process.env.SENTRY_DSN || '',
  },
} as const;

// Type-safe config access
export type AppConfig = typeof config;

// Validation function
export function validateConfig(): void {
  const errors: string[] = [];

  // Required in production
  if (process.env.NODE_ENV === 'production') {
    if (!config.api.url) {
      errors.push('NEXT_PUBLIC_API_URL is required in production');
    }
    if (!config.server.authSecret && config.features.userAccounts) {
      errors.push('AUTH_SECRET is required when user accounts are enabled');
    }
  }

  // Validate animation level
  const validAnimationLevels = ['full', 'reduced', 'none'];
  if (!validAnimationLevels.includes(config.theme.animationLevel)) {
    errors.push(`Invalid NEXT_PUBLIC_ANIMATION_LEVEL: ${config.theme.animationLevel}`);
  }

  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join('\n')}`);
  }
}

// Usage example in components
// components/industrial/core/Button/Button.tsx
import { config } from '@/lib/config/environment';

const Button = ({ soundEnabled = config.theme.enableSounds, ...props }) => {
  // Component implementation
};

// Usage in API client
// services/api/client.ts
import { config } from '@/lib/config/environment';

const apiClient = new IndustrialHttpClient(config.api.url);
```

### Environment-Specific Configurations

```typescript
// next.config.ts
import { config } from './src/lib/config/environment';

const nextConfig = {
  env: {
    // Expose build-time constants
    BUILD_TIME: new Date().toISOString(),
    BUILD_VERSION: process.env.npm_package_version || '0.0.0',
  },
  
  // Industrial theme optimizations
  images: {
    domains: ['lakedronebuilders.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Industrial-Facility',
          value: config.app.facilityId,
        },
      ],
    },
  ],
  
  // Conditional features based on environment
  experimental: {
    optimizeCss: process.env.NODE_ENV === 'production',
  },
  
  // Bundle analyzer
  webpack: (webpackConfig, { isServer }) => {
    if (process.env.ANALYZE_BUNDLE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      webpackConfig.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : '../analyze/client.html',
        })
      );
    }
    return webpackConfig;
  },
};

export default nextConfig;
```

### Development vs Production Configurations

```typescript
// lib/config/development.ts
export const developmentConfig = {
  // Development-only features
  showDebugInfo: true,
  mockApiDelay: 500, // Simulate network latency
  verboseLogging: true,
  showPerformanceMetrics: true,
  
  // Development shortcuts
  skipAuth: true,
  useLocalAssets: true,
  enableHotReload: true,
  
  // Testing helpers
  exposedTestUtils: true,
  seedDataEnabled: true,
};

// lib/config/production.ts  
export const productionConfig = {
  // Production optimizations
  showDebugInfo: false,
  mockApiDelay: 0,
  verboseLogging: false,
  showPerformanceMetrics: false,
  
  // Security
  skipAuth: false,
  useLocalAssets: false,
  enableHotReload: false,
  
  // Production only
  enableCaching: true,
  compressionLevel: 9,
  useCloudinaryImages: true,
};

// Merged config based on environment
export const runtimeConfig = 
  process.env.NODE_ENV === 'production' 
    ? productionConfig 
    : developmentConfig;
```

## Section 11: Frontend Developer Standards

### Critical Coding Rules

1. **NEVER use console.log in production code**
   - Use the debug utility from `lib/utils/debug.ts` instead
   - All console statements will cause build failures

2. **ALWAYS use absolute imports**
   ```typescript
   // ❌ Wrong
   import { Button } from '../../../components/Button';
   
   // ✅ Correct
   import { Button } from '@/components/industrial/core/Button';
   ```

3. **NEVER modify global CSS without team approval**
   - All styling should use Tailwind utilities or component-scoped styles
   - Global changes affect the entire industrial theme

4. **ALWAYS handle loading and error states**
   ```typescript
   // ❌ Wrong
   const { data } = await fetchProducts();
   
   // ✅ Correct
   const { data, error, isLoading } = await fetchProducts();
   if (isLoading) return <IndustrialLoader />;
   if (error) return <ErrorState error={error} />;
   ```

5. **NEVER skip accessibility attributes**
   - All interactive elements need proper ARIA labels
   - All images need alt text (even if decorative: alt="")
   - All form inputs need associated labels

6. **ALWAYS use TypeScript strict mode**
   - No `any` types without explicit justification
   - All props must be typed with interfaces
   - Use `unknown` instead of `any` when type is truly unknown

7. **NEVER commit without running tests**
   ```bash
   npm run test
   npm run type-check
   npm run lint
   ```

8. **ALWAYS follow the industrial naming convention**
   - Components: `Industrial[ComponentName]` for design system components
   - Pages: Descriptive names matching the route
   - Utilities: Verb-first naming (e.g., `formatCurrency`, `validateInput`)

9. **NEVER hardcode industrial theme values**
   ```typescript
   // ❌ Wrong
   <div className="text-amber-500">
   
   // ✅ Correct
   <div className="text-warning">
   ```

10. **ALWAYS use feature flags for new features**
    ```typescript
    if (config.features.checkout) {
      return <CheckoutFlow />;
    }
    ```

### Quick Reference

#### Common Commands
```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # Run TypeScript compiler
npm run test            # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
npm run analyze         # Analyze bundle size

# Component generation
npm run generate:component [name]  # Create new industrial component
npm run generate:page [name]      # Create new page with layout

# Maintenance
npm run clean           # Clean build artifacts
npm run update:deps     # Check for dependency updates
```

#### Key Import Patterns
```typescript
// Components
import { Button, Card, Input } from '@/components/industrial/core';
import { ProductCard, NavigationPanel } from '@/components/industrial/composite';
import { MetalContainer, HazardBorder } from '@/components/industrial/layout';

// Hooks
import { useCart, useTheme, useAnimation } from '@/hooks';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Utils
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/app/utilities/formatCurrency';
import { industrialAnimations } from '@/lib/animations/mechanical';

// Types
import type { Product, CartItem } from '@/types';
import type { ButtonProps } from '@/components/industrial/core/Button';

// Services
import { productService } from '@/services/products';
import { apiClient } from '@/lib/api/client';

// Contexts
import { CartProvider, useCart } from '@/contexts/CartContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
```

#### File Naming Conventions
```
components/
  Button.tsx          # Component file
  Button.test.tsx     # Test file
  Button.stories.tsx  # Storybook file (if used)
  index.ts           # Re-export file

pages/
  page.tsx           # Page component
  layout.tsx         # Layout component
  loading.tsx        # Loading state
  error.tsx          # Error boundary

styles/
  globals.css        # Global styles only
  [component].module.css  # Component styles (rare)
```

#### Project-Specific Patterns and Utilities

```typescript
// Industrial theme utilities
import { 
  applyIndustrialTheme,
  generatePartNumber,
  formatRequisitionNumber 
} from '@/lib/theme/industrial';

// Animation presets
import { 
  mechanicalPress,
  hydraulicOpen,
  warningPulse 
} from '@/lib/animations/presets';

// Common patterns
// 1. Industrial wrapper component
<MetalContainer rivetCorners>
  <YourContent />
</MetalContainer>

// 2. Loading state with industrial theme
<div className="animate-pulse bg-gradient-industrial">
  <div className="h-4 bg-gunmetal-700 rounded w-3/4" />
</div>

// 3. Error state with industrial styling
<div className="border-2 border-red-500 bg-red-900/20 p-4">
  <h3 className="text-red-500 font-bebas">SYSTEM ERROR</h3>
  <p className="text-sm font-mono">{error.message}</p>
</div>

// 4. Industrial form pattern
<form className="space-y-4 bg-gunmetal-800 p-6 border-industrial">
  <Input
    label="Facility Code"
    name="facilityCode"
    pattern="[A-Z]{3}-[0-9]{3}"
    required
  />
</form>

// 5. Feature flag usage
{config.features.certifications && (
  <CertificationBadges certifications={product.certifications} />
)}
```

#### Debugging Helpers

```typescript
// Debug mode only logging
import { debug } from '@/lib/utils/debug';
debug.log('Component rendered', { props });
debug.warn('Deprecated feature used');
debug.table(data);

// Performance monitoring
import { measurePerformance } from '@/lib/utils/performance';
const stop = measurePerformance('ProductGrid');
// ... component logic
stop(); // Logs timing in development

// Industrial theme validation
import { validateIndustrialTheme } from '@/lib/theme/validate';
validateIndustrialTheme(); // Throws if theme is misconfigured
```

#### Common Gotchas

1. **Tailwind CSS purging**: Always use complete class names, never construct dynamically
   ```typescript
   // ❌ Wrong - will be purged
   const color = 'amber';
   <div className={`text-${color}-500`} />
   
   // ✅ Correct
   const colorClass = status === 'warning' ? 'text-amber-500' : 'text-gray-500';
   <div className={colorClass} />
   ```

2. **Next.js App Router**: Remember pages are server components by default
   ```typescript
   // Add 'use client' for interactive components
   'use client';
   ```

3. **Industrial animations**: Always check for reduced motion preference
   ```typescript
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   ```

4. **Cart persistence**: Handle localStorage errors gracefully
   ```typescript
   try {
     localStorage.setItem('cart', JSON.stringify(cartData));
   } catch (e) {
     console.error('Failed to save cart:', e);
   }
   ```

### AI Agent Integration Notes

When AI agents work with this codebase:

1. **Always check `docs/` directory first** for architecture and patterns
2. **Use the component template** from Section 4 when creating new components
3. **Follow the exact import patterns** shown in Quick Reference
4. **Respect the industrial theme** - don't add whimsical or playful elements
5. **Test with feature flags** - ensure new features work when flags are off
6. **Maintain type safety** - no `as any` casts without justification
7. **Keep animations performant** - use transform and opacity only
8. **Document industrial terminology** - add comments explaining domain terms

### Performance Budget

- **Initial JS Bundle**: < 200KB gzipped
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Component Render**: < 16ms (60fps)

Monitor with:
```bash
npm run lighthouse
npm run analyze
```