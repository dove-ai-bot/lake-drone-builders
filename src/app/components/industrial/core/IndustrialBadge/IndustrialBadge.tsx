"use client";

import React, { forwardRef } from 'react';
import { IndustrialBadgeProps, INDUSTRIAL_TIMINGS, INDUSTRIAL_EASING } from '../types';

/**
 * IndustrialBadge - Certification stamps and warning indicators
 * 
 * Features:
 * - Certification stamp appearance with raised borders
 * - Multiple types (certification, warning, status, classification)
 * - Various industrial variants (iso, mil-spec, safety, tech, compliance)
 * - Pulsing animations for warnings and alerts
 * - Technical validation codes and expiry dates
 * - LED-style status indicators
 */
export const IndustrialBadge = forwardRef<HTMLSpanElement, IndustrialBadgeProps>(
  ({
    type,
    variant,
    children,
    size = 'md',
    pulsing = false,
    validationCode,
    expiryDate,
    status,
    className = '',
    animated = true,
    classification,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...props
  }, ref) => {
    
    // Base styles for all badges
    const baseStyles = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-bold',
      'text-center',
      'border-2',
      'transition-all',
      'duration-200',
      'ease-out',
      'select-none',
      // Raised appearance
      'shadow-rivet',
      'relative',
      // Badge stamp effect
      'before:absolute',
      'before:inset-0',
      'before:rounded-inherit',
      'before:shadow-inner',
      'before:pointer-events-none',
    ];

    // Size-specific styles
    const sizeStyles = {
      sm: [
        'px-2',
        'py-1',
        'text-xs',
        'rounded-sm',
        'gap-1',
      ],
      md: [
        'px-3',
        'py-1.5',
        'text-sm',
        'rounded',
        'gap-1.5',
      ],
      lg: [
        'px-4',
        'py-2',
        'text-base',
        'rounded-md',
        'gap-2',
      ],
      xl: [
        'px-5',
        'py-2.5',
        'text-lg',
        'rounded-lg',
        'gap-2.5',
      ],
    };

    // Type and variant specific styles
    const getTypeVariantStyles = () => {
      const styles: string[] = [];
      
      switch (type) {
        case 'certification':
          switch (variant) {
            case 'iso':
              styles.push(
                'bg-green-500',
                'text-white',
                'border-green-700',
                'shadow-green-800/25',
                'hover:bg-green-600'
              );
              break;
            case 'mil-spec':
              styles.push(
                'bg-blue-600',
                'text-white',
                'border-blue-800',
                'shadow-blue-900/25',
                'hover:bg-blue-700',
                'font-technical'
              );
              break;
            case 'safety':
              styles.push(
                'bg-primary-500',
                'text-white',
                'border-primary-700',
                'shadow-primary-800/25',
                'hover:bg-primary-600'
              );
              break;
            case 'compliance':
              styles.push(
                'bg-purple-600',
                'text-white',
                'border-purple-800',
                'shadow-purple-900/25',
                'hover:bg-purple-700'
              );
              break;
            default:
              styles.push(
                'bg-gray-500',
                'text-white',
                'border-gray-700',
                'shadow-gray-800/25'
              );
          }
          break;

        case 'warning':
          styles.push(
            'bg-yellow-500',
            'text-yellow-900',
            'border-yellow-700',
            'shadow-yellow-800/25',
            'hover:bg-yellow-600',
            'ring-2',
            'ring-yellow-300/50'
          );
          if (pulsing) {
            styles.push('animate-warning-pulse');
          }
          break;

        case 'status':
          const statusColors = {
            active: 'green',
            inactive: 'gray',
            warning: 'yellow',
            error: 'red',
          };
          const color = statusColors[status || 'inactive'];
          styles.push(
            `bg-${color}-500`,
            `text-${color}-50`,
            `border-${color}-700`,
            `shadow-${color}-800/25`,
            'relative'
          );
          // LED indicator
          if (status === 'active') {
            styles.push(
              'before:absolute',
              'before:-top-1',
              'before:-right-1',
              'before:w-2',
              'before:h-2',
              'before:bg-green-400',
              'before:rounded-full',
              'before:animate-pulse',
              'before:shadow-green-400/50',
              'before:shadow-lg'
            );
          }
          break;

        case 'classification':
          const classificationColors = {
            'unclassified': 'green',
            'confidential': 'yellow',
            'secret': 'orange',
            'top-secret': 'red',
          };
          const classColor = classificationColors[classification || 'unclassified'];
          styles.push(
            `bg-${classColor}-600`,
            `text-white`,
            `border-${classColor}-800`,
            `shadow-${classColor}-900/25`,
            'font-technical',
            'uppercase',
            'tracking-wider'
          );
          break;
      }
      
      return styles;
    };

    // Animation styles
    const animationStyles = animated ? [
      pulsing ? 'animate-pulse' : '',
      status === 'warning' ? 'animate-warning-pulse' : '',
    ].filter(Boolean) : [];

    // Combine all styles
    const badgeClasses = [
      ...baseStyles,
      ...sizeStyles[size],
      ...getTypeVariantStyles(),
      ...animationStyles,
      className,
    ].filter(Boolean).join(' ');

    // Validation indicator
    const ValidationIndicator = () => {
      if (!validationCode) return null;
      
      return (
        <span
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
          title={`Validation: ${validationCode}`}
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>
      );
    };

    // Expiry warning
    const ExpiryWarning = () => {
      if (!expiryDate) return null;
      
      const expiry = new Date(expiryDate);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry > 30) return null; // Only show if expiring soon
      
      return (
        <span
          className={`
            absolute -top-1 -left-1 w-3 h-3 rounded-full border border-white shadow-sm
            ${daysUntilExpiry <= 7 ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}
          `}
          title={`Expires: ${expiryDate} (${daysUntilExpiry} days)`}
        />
      );
    };

    // Status LED for status badges
    const StatusLED = () => {
      if (type !== 'status' || !status) return null;
      
      const ledColors = {
        active: 'bg-green-400 shadow-green-400/50',
        inactive: 'bg-gray-400 shadow-gray-400/50',
        warning: 'bg-yellow-400 shadow-yellow-400/50 animate-pulse',
        error: 'bg-red-400 shadow-red-400/50 animate-pulse',
      };
      
      return (
        <span
          className={`
            w-2 h-2 rounded-full mr-1 shadow-lg
            ${ledColors[status]}
          `}
        />
      );
    };

    return (
      <span
        ref={ref}
        className={badgeClasses}
        aria-label={ariaLabel || `${type} badge: ${children}`}
        data-testid={testId}
        style={{
          ...(animated && {
            transition: `all ${INDUSTRIAL_TIMINGS.hover}ms ${INDUSTRIAL_EASING.smooth}`,
          }),
        }}
        {...props}
      >
        {/* Status LED */}
        <StatusLED />
        
        {/* Badge content */}
        <span className="relative z-10 flex items-center gap-inherit">
          {children}
        </span>
        
        {/* Validation indicator */}
        <ValidationIndicator />
        
        {/* Expiry warning */}
        <ExpiryWarning />
        
        {/* Technical details for screen readers */}
        {validationCode && (
          <span className="sr-only">
            Validation code: {validationCode}
          </span>
        )}
        
        {expiryDate && (
          <span className="sr-only">
            Expires: {expiryDate}
          </span>
        )}
      </span>
    );
  }
);

IndustrialBadge.displayName = 'IndustrialBadge';