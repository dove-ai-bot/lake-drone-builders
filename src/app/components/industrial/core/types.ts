/**
 * Industrial Component Library Type Definitions
 * Core interfaces for the industrial design system components
 */

import { ReactNode, MouseEvent, FocusEvent, ChangeEvent } from 'react';

// Base industrial component sizes
export type IndustrialSize = 'sm' | 'md' | 'lg' | 'xl';

// Industrial color variants
export type IndustrialVariant = 'primary' | 'secondary' | 'technical' | 'warning';

// Classification levels for security/technical components
export type ClassificationLevel = 'unclassified' | 'confidential' | 'secret' | 'top-secret';

// Badge types for different industrial contexts
export type BadgeType = 'certification' | 'warning' | 'status' | 'classification';

// Badge variants with specific industrial styling
export type BadgeVariant = 'iso' | 'mil-spec' | 'safety' | 'tech' | 'compliance';

// Card variants for different technical contexts
export type CardVariant = 'standard' | 'technical' | 'specification' | 'warning' | 'blueprint';

// Input types for form components
export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';

// Base props shared across all industrial components
export interface BaseIndustrialProps {
  /** Additional CSS classes for customization */
  className?: string;
  /** Component test identifier */
  'data-testid'?: string;
  /** Accessibility label for screen readers */
  'aria-label'?: string;
  /** Classification level for security contexts */
  classification?: ClassificationLevel;
  /** Enable/disable animations (respects prefers-reduced-motion) */
  animated?: boolean;
}

/**
 * IndustrialButton Component Props
 * Metallic button with mechanical interactions and industrial styling
 */
export interface IndustrialButtonProps extends BaseIndustrialProps {
  /** Visual style variant */
  variant?: IndustrialVariant;
  /** Size of the button */
  size?: IndustrialSize;
  /** Button content */
  children: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state with industrial spinner */
  loading?: boolean;
  /** Icon to display alongside text */
  icon?: ReactNode;
  /** Enable mechanical sound effects */
  soundEnabled?: boolean;
  /** Technical certifications to display */
  certifications?: string[];
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
  /** Click event handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Focus event handler */
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  /** Blur event handler */
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
}

/**
 * IndustrialCard Component Props
 * Blueprint-style container with technical grid backgrounds and rivet details
 */
export interface IndustrialCardProps extends BaseIndustrialProps {
  /** Visual style variant */
  variant?: CardVariant;
  /** Card title/header */
  title?: string;
  /** Card content */
  children: ReactNode;
  /** Technical specifications object */
  specifications?: Record<string, string | number>;
  /** Compliance badges to display */
  badges?: Array<{
    type: BadgeType;
    variant: BadgeVariant;
    text: string;
  }>;
  /** Enable hover illumination effects */
  hoverable?: boolean;
  /** Security classification border */
  securityBorder?: boolean;
  /** Technical serial number */
  serialNumber?: string;
  /** Click handler for interactive cards */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * IndustrialBadge Component Props
 * Certification stamps and warning indicators with raised borders
 */
export interface IndustrialBadgeProps extends BaseIndustrialProps {
  /** Badge content type */
  type: BadgeType;
  /** Visual style variant */
  variant: BadgeVariant;
  /** Badge text content */
  children: ReactNode;
  /** Size of the badge */
  size?: IndustrialSize;
  /** Enable pulsing animation for warnings */
  pulsing?: boolean;
  /** Technical validation code */
  validationCode?: string;
  /** Certification expiry date */
  expiryDate?: string;
  /** Badge status (for LED-style indicators) */
  status?: 'active' | 'inactive' | 'warning' | 'error';
}

/**
 * IndustrialInput Component Props
 * Metal inset input fields with industrial labels and technical styling
 */
export interface IndustrialInputProps extends BaseIndustrialProps {
  /** Input type */
  type?: InputType;
  /** Input value */
  value?: string;
  /** Default value for uncontrolled inputs */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input label */
  label?: string;
  /** Helper text with technical context */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Required field indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Size variant */
  size?: IndustrialSize;
  /** Technical specification unit (e.g., "PSI", "RPM", "V") */
  unit?: string;
  /** Input validation pattern */
  pattern?: string;
  /** Minimum value for numeric inputs */
  min?: number;
  /** Maximum value for numeric inputs */
  max?: number;
  /** Step value for numeric inputs */
  step?: number;
  /** Change event handler */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Focus event handler */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Input event handler */
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Animation timing constants for industrial components
 */
export const INDUSTRIAL_TIMINGS = {
  /** Fast mechanical button response */
  buttonPress: 150,
  /** Subtle system hover response */
  hover: 200,
  /** Circuit activation focus */
  focus: 200,
  /** Steady warning pulse */
  warning: 2000,
  /** Urgent system alert */
  error: 500,
  /** Panel hydraulic opening */
  panelOpen: 300,
} as const;

/**
 * Industrial animation easing functions
 */
export const INDUSTRIAL_EASING = {
  /** Mechanical precision */
  mechanical: 'cubic-bezier(0.4, 0, 0.6, 1)',
  /** Smooth system response */
  smooth: 'ease-out',
  /** Bouncy button press */
  press: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;