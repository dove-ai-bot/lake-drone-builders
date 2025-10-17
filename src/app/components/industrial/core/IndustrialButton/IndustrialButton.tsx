"use client";

import React, { forwardRef } from 'react';
import { IndustrialButtonProps, INDUSTRIAL_TIMINGS, INDUSTRIAL_EASING } from '../types';

/**
 * IndustrialButton - Metallic button with mechanical interactions
 * 
 * Features:
 * - Metallic styling with rivet corners
 * - Mechanical press animations
 * - Industrial variants (primary, secondary, technical, warning)
 * - Size variants (sm, md, lg, xl)
 * - Loading state with industrial spinner
 * - Accessibility compliant
 */
export const IndustrialButton = forwardRef<HTMLButtonElement, IndustrialButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    children,
    disabled = false,
    loading = false,
    icon,
    soundEnabled = false,
    certifications = [],
    type = 'button',
    className = '',
    animated = true,
    classification,
    onClick,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...props
  }, ref) => {
    
    // Base styles for all buttons
    const baseStyles = [
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'font-semibold',
      'text-center',
      'border',
      'transition-all',
      'duration-150',
      'ease-out',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-primary-500',
      'focus:ring-offset-2',
      'active:scale-95',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'disabled:transform-none',
      // Metallic base
      'bg-metal-gradient',
      'shadow-metal',
      // Rivet corners
      'before:absolute',
      'before:inset-0',
      'before:rounded-sm',
      'before:shadow-rivet',
      'before:pointer-events-none',
      // Industrial texture
      'after:absolute',
      'after:inset-0',
      'after:rounded-sm',
      'after:bg-gradient-to-br',
      'after:from-transparent',
      'after:via-white/5',
      'after:to-transparent',
      'after:pointer-events-none',
    ];

    // Variant-specific styles
    const variantStyles = {
      primary: [
        'bg-primary-600',
        'text-white',
        'border-primary-700',
        'shadow-primary-900/25',
        'hover:bg-primary-700',
        'hover:border-primary-800',
        'hover:shadow-primary-900/40',
        'active:bg-primary-800',
      ],
      secondary: [
        'bg-gunmetal-600',
        'text-gunmetal-50',
        'border-gunmetal-700',
        'shadow-gunmetal-900/25',
        'hover:bg-gunmetal-700',
        'hover:border-gunmetal-800',
        'hover:shadow-gunmetal-900/40',
        'active:bg-gunmetal-800',
      ],
      technical: [
        'bg-blue-600',
        'text-white',
        'border-blue-700',
        'shadow-blue-900/25',
        'hover:bg-blue-700',
        'hover:border-blue-800',
        'hover:shadow-blue-900/40',
        'active:bg-blue-800',
      ],
      warning: [
        'bg-yellow-500',
        'text-yellow-900',
        'border-yellow-600',
        'shadow-yellow-700/25',
        'hover:bg-yellow-600',
        'hover:border-yellow-700',
        'hover:shadow-yellow-800/40',
        'active:bg-yellow-700',
        'animate-warning-pulse',
      ],
    };

    // Size-specific styles
    const sizeStyles = {
      sm: [
        'px-3',
        'py-2',
        'text-sm',
        'rounded',
        'gap-1.5',
      ],
      md: [
        'px-4',
        'py-2.5',
        'text-base',
        'rounded-md',
        'gap-2',
      ],
      lg: [
        'px-6',
        'py-3',
        'text-lg',
        'rounded-lg',
        'gap-2.5',
      ],
      xl: [
        'px-8',
        'py-4',
        'text-xl',
        'rounded-xl',
        'gap-3',
      ],
    };

    // Classification border styles
    const classificationStyles = classification ? {
      'unclassified': 'ring-2 ring-green-500',
      'confidential': 'ring-2 ring-yellow-500',
      'secret': 'ring-2 ring-orange-500',
      'top-secret': 'ring-2 ring-red-500',
    }[classification] : '';

    // Combine all styles
    const buttonClasses = [
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      classificationStyles,
      className,
    ].filter(Boolean).join(' ');

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className={`animate-spin ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'}`}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Handle click with optional sound
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      
      // Play mechanical sound if enabled
      if (soundEnabled && typeof window !== 'undefined') {
        // Placeholder for future sound implementation
        // TODO: Implement mechanical button press sound
      }
      
      onClick?.(event);
    };

    // Certification display
    const CertificationBadges = () => {
      if (certifications.length === 0) return null;
      
      return (
        <div className="absolute -top-1 -right-1 flex gap-0.5">
          {certifications.slice(0, 2).map((cert, index) => (
            <span
              key={index}
              className="w-2 h-2 bg-green-500 rounded-full border border-green-600 shadow-sm"
              title={`Certified: ${cert}`}
            />
          ))}
        </div>
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        data-testid={testId}
        onClick={handleClick}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          transformStyle: 'preserve-3d',
          ...(animated && {
            transition: `all ${INDUSTRIAL_TIMINGS.buttonPress}ms ${INDUSTRIAL_EASING.mechanical}`,
          }),
        }}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </span>
        )}
        
        {/* Button content */}
        <span className={`flex items-center gap-inherit ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </span>
        
        {/* Certification badges */}
        <CertificationBadges />
        
        {/* Classification indicator */}
        {classification && (
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 opacity-75"
            style={{
              background: {
                'unclassified': '#10b981',
                'confidential': '#f59e0b',
                'secret': '#f97316',
                'top-secret': '#ef4444',
              }[classification],
            }}
          />
        )}
      </button>
    );
  }
);

IndustrialButton.displayName = 'IndustrialButton';