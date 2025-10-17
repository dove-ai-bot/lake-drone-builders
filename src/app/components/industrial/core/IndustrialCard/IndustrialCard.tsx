"use client";

import React, { forwardRef } from 'react';
import { IndustrialCardProps, INDUSTRIAL_TIMINGS, INDUSTRIAL_EASING } from '../types';

/**
 * IndustrialCard - Blueprint-style container with technical styling
 * 
 * Features:
 * - Blueprint-style borders with technical grid background
 * - Rivet corner details and metal gradient backgrounds
 * - Multiple variants (standard, technical, specification, warning, blueprint)
 * - Hover illumination effects
 * - Support for specifications and compliance badges
 * - Security classification indicators
 */
export const IndustrialCard = forwardRef<HTMLDivElement, IndustrialCardProps>(
  ({
    variant = 'standard',
    title,
    children,
    specifications,
    badges = [],
    hoverable = false,
    securityBorder = false,
    serialNumber,
    className = '',
    animated = true,
    classification,
    onClick,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...props
  }, ref) => {
    
    // Base styles for all cards
    const baseStyles = [
      'relative',
      'overflow-hidden',
      'border',
      'transition-all',
      'duration-200',
      'ease-out',
      // Metallic base styling
      'bg-gunmetal-50',
      'shadow-industrial',
      // Technical grid pattern
      'bg-gradient-to-br',
      'from-gunmetal-50',
      'to-gunmetal-100',
    ];

    // Variant-specific styles
    const variantStyles = {
      standard: [
        'border-gunmetal-300',
        'rounded-lg',
        'p-6',
      ],
      technical: [
        'border-blue-300',
        'rounded-md',
        'p-4',
        'bg-blue-50/30',
        'shadow-blue-200/50',
        // Technical grid overlay
        'before:absolute',
        'before:inset-0',
        'before:bg-grid-pattern',
        'before:opacity-10',
        'before:pointer-events-none',
      ],
      specification: [
        'border-primary-300',
        'rounded-sm',
        'p-5',
        'bg-primary-50/20',
        'font-technical',
        // Specification lines
        'after:absolute',
        'after:top-4',
        'after:left-4',
        'after:right-4',
        'after:h-px',
        'after:bg-primary-300',
        'after:opacity-50',
      ],
      warning: [
        'border-yellow-400',
        'rounded-lg',
        'p-6',
        'bg-yellow-50/40',
        'shadow-yellow-200/50',
        'ring-2',
        'ring-yellow-300/30',
        'animate-warning-pulse',
      ],
      blueprint: [
        'border-blue-400',
        'rounded-none',
        'p-6',
        'bg-blue-900/5',
        'shadow-blue-300/30',
        // Blueprint grid
        'bg-grid-technical',
        'bg-opacity-30',
        // Corner markers
        'before:absolute',
        'before:top-0',
        'before:left-0',
        'before:w-4',
        'before:h-4',
        'before:border-t-2',
        'before:border-l-2',
        'before:border-blue-500',
        'after:absolute',
        'after:bottom-0',
        'after:right-0',
        'after:w-4',
        'after:h-4',
        'after:border-b-2',
        'after:border-r-2',
        'after:border-blue-500',
      ],
    };

    // Hover styles for interactive cards
    const hoverStyles = hoverable ? [
      'cursor-pointer',
      'hover:shadow-rivet',
      'hover:scale-[1.02]',
      'hover:bg-gunmetal-100',
      'hover:border-primary-400',
      // Hover illumination
      'hover:after:absolute',
      'hover:after:inset-0',
      'hover:after:bg-primary-500/5',
      'hover:after:rounded-inherit',
      'hover:after:pointer-events-none',
    ] : [];

    // Security border styles
    const securityStyles = securityBorder ? [
      'border-double',
      'border-4',
      'border-red-500',
      'shadow-red-200/50',
    ] : [];

    // Classification styles
    const classificationStyles = classification ? {
      'unclassified': 'border-l-4 border-l-green-500',
      'confidential': 'border-l-4 border-l-yellow-500',
      'secret': 'border-l-4 border-l-orange-500',
      'top-secret': 'border-l-4 border-l-red-500',
    }[classification] : '';

    // Variant-specific text color schemes
    const textColorSchemes = {
      standard: {
        primary: 'text-gunmetal-800',
        secondary: 'text-gunmetal-600',
        accent: 'text-primary-600',
        muted: 'text-gunmetal-500',
        title: 'text-gunmetal-900',
        serialNumber: 'text-gunmetal-600'
      },
      technical: {
        primary: 'text-steel-800',
        secondary: 'text-steel-600',
        accent: 'text-tech-blue-600',
        muted: 'text-steel-500',
        title: 'text-steel-900',
        serialNumber: 'text-steel-600'
      },
      specification: {
        primary: 'text-gunmetal-800',
        secondary: 'text-gunmetal-600',
        accent: 'text-primary-600',
        muted: 'text-gunmetal-500',
        title: 'text-gunmetal-900',
        serialNumber: 'text-primary-600'
      },
      warning: {
        primary: 'text-amber-900',
        secondary: 'text-amber-700',
        accent: 'text-amber-600',
        muted: 'text-amber-600',
        title: 'text-amber-900',
        serialNumber: 'text-amber-700'
      },
      blueprint: {
        primary: 'text-blue-800',
        secondary: 'text-blue-600',
        accent: 'text-tech-blue-500',
        muted: 'text-blue-500',
        title: 'text-blue-900',
        serialNumber: 'text-tech-blue-600'
      },
    };

    // Get current variant's text colors
    const textColors = textColorSchemes[variant];

    // Combine all styles
    const cardClasses = [
      ...baseStyles,
      ...variantStyles[variant],
      ...hoverStyles,
      ...securityStyles,
      classificationStyles,
      className,
    ].filter(Boolean).join(' ');

    // Rivet corners component
    const RivetCorners = () => (
      <>
        {/* Top-left rivet */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-gunmetal-400 rounded-full shadow-rivet" />
        {/* Top-right rivet */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-gunmetal-400 rounded-full shadow-rivet" />
        {/* Bottom-left rivet */}
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-gunmetal-400 rounded-full shadow-rivet" />
        {/* Bottom-right rivet */}
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gunmetal-400 rounded-full shadow-rivet" />
      </>
    );

    // Title component
    const CardTitle = () => {
      if (!title) return null;
      
      return (
        <div className="mb-4 pb-2 border-b border-gunmetal-300/50">
          <h3 className={`text-lg font-industrial font-semibold ${textColors.title} tracking-wide uppercase`}>
            {title}
          </h3>
          {serialNumber && (
            <p className={`text-xs font-technical ${textColors.serialNumber} mt-1`}>
              S/N: {serialNumber}
            </p>
          )}
        </div>
      );
    };

    // Specifications component
    const SpecificationsList = () => {
      if (!specifications || Object.keys(specifications).length === 0) return null;
      
      return (
        <div className="mt-4 pt-4 border-t border-gunmetal-300/50">
          <h4 className={`text-sm font-industrial font-medium ${textColors.secondary} mb-2 uppercase tracking-wider`}>
            Technical Specifications
          </h4>
          <dl className="grid grid-cols-1 gap-1 text-sm">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <dt className={`font-technical ${textColors.muted} uppercase`}>{key}:</dt>
                <dd className={`font-technical ${textColors.primary} font-medium`}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    };

    // Compliance badges component
    const ComplianceBadges = () => {
      if (badges.length === 0) return null;
      
      return (
        <div className="absolute top-2 right-8 flex gap-1">
          {badges.map((badge, index) => (
            <span
              key={index}
              className={`
                px-2 py-1 text-xs font-bold rounded-sm border shadow-sm
                ${badge.type === 'certification' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                ${badge.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                ${badge.type === 'status' ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}
                ${badge.type === 'classification' ? 'bg-red-100 text-red-800 border-red-300' : ''}
              `}
              title={`${badge.type}: ${badge.text}`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      );
    };

    // Classification indicator
    const ClassificationIndicator = () => {
      if (!classification) return null;
      
      const classificationConfig = {
        'unclassified': { color: 'green', label: 'UNCLASSIFIED' },
        'confidential': { color: 'yellow', label: 'CONFIDENTIAL' },
        'secret': { color: 'orange', label: 'SECRET' },
        'top-secret': { color: 'red', label: 'TOP SECRET' },
      }[classification];

      return (
        <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center bg-black/80">
          <span className={`text-xs font-bold text-${classificationConfig.color}-400 tracking-widest`}>
            {classificationConfig.label}
          </span>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cardClasses}
        aria-label={ariaLabel}
        data-testid={testId}
        onClick={onClick}
        style={{
          ...(animated && {
            transition: `all ${INDUSTRIAL_TIMINGS.hover}ms ${INDUSTRIAL_EASING.smooth}`,
          }),
        }}
        {...props}
      >
        {/* Rivet corners for industrial look */}
        <RivetCorners />
        
        {/* Compliance badges */}
        <ComplianceBadges />
        
        {/* Card content */}
        <div className="relative z-10">
          <CardTitle />
          
          {/* Main content with variant-specific text colors */}
          <div className={`${textColors.primary} [&_p]:${textColors.primary} [&_span]:${textColors.secondary} [&_li]:${textColors.primary} [&_div>span.text-steel-200]:${textColors.primary} [&_.text-steel-200]:${textColors.primary} [&_.text-steel-300]:${textColors.secondary} [&_.text-steel-400]:${textColors.muted}`}>
            {children}
          </div>
          
          {/* Technical specifications */}
          <SpecificationsList />
        </div>
        
        {/* Classification indicator */}
        <ClassificationIndicator />
      </div>
    );
  }
);

IndustrialCard.displayName = 'IndustrialCard';