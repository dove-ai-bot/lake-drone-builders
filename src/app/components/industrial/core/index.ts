/**
 * Industrial Component Library - Core Components
 * Barrel exports for clean imports throughout the application
 */

// Component exports
export { IndustrialButton } from './IndustrialButton';
export { IndustrialCard } from './IndustrialCard';
export { IndustrialBadge } from './IndustrialBadge';
export { IndustrialInput } from './IndustrialInput';

// Type exports
export type {
  // Base types
  IndustrialSize,
  IndustrialVariant,
  ClassificationLevel,
  BadgeType,
  BadgeVariant,
  CardVariant,
  InputType,
  BaseIndustrialProps,
  
  // Component-specific types
  IndustrialButtonProps,
  IndustrialCardProps,
  IndustrialBadgeProps,
  IndustrialInputProps,
} from './types';

// Constants exports
export { INDUSTRIAL_TIMINGS, INDUSTRIAL_EASING } from './types';