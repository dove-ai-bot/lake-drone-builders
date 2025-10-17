"use client";

import React, { forwardRef, useState } from 'react';
import { IndustrialInputProps, INDUSTRIAL_TIMINGS, INDUSTRIAL_EASING } from '../types';

/**
 * IndustrialInput - Metal inset input fields with technical styling
 * 
 * Features:
 * - Metal inset field appearance with industrial labels
 * - Support for various input types (text, number, email, etc.)
 * - Technical specification units (PSI, RPM, V, etc.)
 * - Focus states with warning orange circuit illumination
 * - Error handling with technical alert messaging
 * - Helper text styling as technical readouts
 * - Size variants and accessibility support
 */
export const IndustrialInput = forwardRef<HTMLInputElement, IndustrialInputProps>(
  ({
    type = 'text',
    value,
    defaultValue,
    placeholder,
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    readOnly = false,
    size = 'md',
    unit,
    pattern,
    min,
    max,
    step,
    className = '',
    animated = true,
    classification,
    onChange,
    onFocus,
    onBlur,
    onInput,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...props
  }, ref) => {
    
    const [isFocused, setIsFocused] = useState(false);

    // Base styles for input container
    const containerBaseStyles = [
      'relative',
      'w-full',
      'transition-all',
      'duration-200',
      'ease-out',
    ];

    // Base styles for input field
    const inputBaseStyles = [
      'w-full',
      'font-technical',
      'bg-gunmetal-50',
      'border-2',
      'transition-all',
      'duration-200',
      'ease-out',
      'focus:outline-none',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'read-only:bg-gunmetal-100',
      'read-only:cursor-default',
      // Metal inset appearance
      'shadow-inner',
      'shadow-gunmetal-300/50',
      // Industrial styling
      'text-gunmetal-900',
      'placeholder:text-gunmetal-400',
      'placeholder:font-normal',
    ];

    // Size-specific styles
    const sizeStyles = {
      sm: [
        'px-3',
        'py-2',
        'text-sm',
        'rounded',
      ],
      md: [
        'px-4',
        'py-2.5',
        'text-base',
        'rounded-md',
      ],
      lg: [
        'px-5',
        'py-3',
        'text-lg',
        'rounded-lg',
      ],
      xl: [
        'px-6',
        'py-4',
        'text-xl',
        'rounded-xl',
      ],
    };

    // State-based styles
    const getStateStyles = () => {
      if (error) {
        return [
          'border-red-500',
          'bg-red-50/30',
          'focus:border-red-600',
          'focus:ring-2',
          'focus:ring-red-500/20',
          'shadow-red-200/50',
        ];
      }
      
      if (isFocused) {
        return [
          'border-primary-500',
          'bg-primary-50/20',
          'ring-2',
          'ring-primary-500/30',
          'shadow-primary-200/50',
          // Circuit illumination effect
          'shadow-lg',
          'shadow-primary-500/25',
        ];
      }
      
      return [
        'border-gunmetal-300',
        'hover:border-gunmetal-400',
        'focus:border-primary-500',
        'focus:ring-2',
        'focus:ring-primary-500/20',
      ];
    };

    // Classification styles
    const classificationStyles = classification ? {
      'unclassified': 'border-l-4 border-l-green-500',
      'confidential': 'border-l-4 border-l-yellow-500',
      'secret': 'border-l-4 border-l-orange-500',
      'top-secret': 'border-l-4 border-l-red-500',
    }[classification] : '';

    // Combine input styles
    const inputClasses = [
      ...inputBaseStyles,
      ...sizeStyles[size],
      ...getStateStyles(),
      classificationStyles,
      unit ? 'pr-12' : '', // Space for unit display
      className,
    ].filter(Boolean).join(' ');

    // Label component
    const InputLabel = () => {
      if (!label) return null;
      
      return (
        <label
          className={`
            block mb-2 font-industrial font-medium text-gunmetal-700 uppercase tracking-wide
            ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : size === 'xl' ? 'text-lg' : 'text-sm'}
            ${error ? 'text-red-700' : ''}
            ${isFocused ? 'text-primary-700' : ''}
          `}
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-label="required">
              *
            </span>
          )}
        </label>
      );
    };

    // Unit display component
    const UnitDisplay = () => {
      if (!unit) return null;
      
      return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className={`
            font-technical font-medium text-gunmetal-600
            ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : size === 'xl' ? 'text-lg' : 'text-sm'}
          `}>
            {unit}
          </span>
        </div>
      );
    };

    // Helper text component
    const HelperText = () => {
      if (!helperText && !error) return null;
      
      const text = error || helperText;
      const isError = Boolean(error);
      
      return (
        <div className={`
          mt-2 flex items-start gap-2
          ${size === 'sm' ? 'text-xs' : 'text-sm'}
          ${isError ? 'text-red-600' : 'text-gunmetal-600'}
        `}>
          {isError && (
            <span className="flex-shrink-0 mt-0.5 w-4 h-4 text-red-500" aria-hidden="true">
              ⚠
            </span>
          )}
          <span className="font-technical">
            {isError && (
              <span className="font-bold mr-1 tracking-wider">
                ALERT:
              </span>
            )}
            {text}
          </span>
        </div>
      );
    };

    // Technical readout border for focused state
    const TechnicalBorder = () => {
      if (!isFocused) return null;
      
      return (
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner indicators */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary-500" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary-500" />
        </div>
      );
    };

    // Classification indicator
    const ClassificationIndicator = () => {
      if (!classification) return null;
      
      const classificationConfig = {
        'unclassified': { color: 'green', label: 'U' },
        'confidential': { color: 'yellow', label: 'C' },
        'secret': { color: 'orange', label: 'S' },
        'top-secret': { color: 'red', label: 'TS' },
      }[classification];

      return (
        <div className={`
          absolute top-0 right-0 -mt-2 -mr-2 w-6 h-6 
          bg-${classificationConfig.color}-500 text-white 
          rounded-full flex items-center justify-center
          text-xs font-bold shadow-sm
        `}>
          {classificationConfig.label}
        </div>
      );
    };

    // Handle focus events
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    // Handle value changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      onInput?.(event);
    };

    return (
      <div className={containerBaseStyles.join(' ')}>
        <InputLabel />
        
        <div className="relative">
          <input
            ref={ref}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            pattern={pattern}
            min={min}
            max={max}
            step={step}
            className={inputClasses}
            aria-label={ariaLabel}
            aria-invalid={Boolean(error)}
            aria-describedby={
              helperText || error ? `${testId || 'input'}-help` : undefined
            }
            data-testid={testId}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onInput={handleInput}
            style={{
              ...(animated && {
                transition: `all ${INDUSTRIAL_TIMINGS.focus}ms ${INDUSTRIAL_EASING.smooth}`,
              }),
            }}
            {...props}
          />
          
          {/* Unit display */}
          <UnitDisplay />
          
          {/* Technical border effect */}
          <TechnicalBorder />
          
          {/* Classification indicator */}
          <ClassificationIndicator />
        </div>
        
        {/* Helper text and errors */}
        <div id={`${testId || 'input'}-help`}>
          <HelperText />
        </div>
      </div>
    );
  }
);

IndustrialInput.displayName = 'IndustrialInput';