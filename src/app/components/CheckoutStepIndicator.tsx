'use client';

import React from 'react';

type CheckoutStep = 'order-form' | 'payment' | 'confirmation';

interface CheckoutStepIndicatorProps {
  currentStep: CheckoutStep;
}

const steps = [
  { id: 'order-form', label: 'REQUISITION FORM', number: '01' },
  { id: 'payment', label: 'AUTHORIZATION', number: '02' },
  { id: 'confirmation', label: 'CONFIRMATION', number: '03' }
] as const;

export default function CheckoutStepIndicator({ currentStep }: CheckoutStepIndicatorProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="mb-12">
      <div className="flex justify-center">
        <div className="flex items-center space-x-4 md:space-x-8">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = index < currentIndex;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`
                      relative w-12 h-12 rounded-full border-2 flex items-center justify-center
                      font-mono font-bold text-sm transition-all duration-300
                      ${isActive
                        ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : isCompleted
                        ? 'border-tech-blue bg-tech-blue text-white'
                        : 'border-steel-600 bg-steel-800 text-steel-400'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                    
                    {/* Active pulse effect */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-30" />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <div
                      className={`
                        text-xs font-bold tracking-wider transition-colors duration-300
                        ${isActive
                          ? 'text-orange-400'
                          : isCompleted
                          ? 'text-tech-blue'
                          : 'text-steel-500'
                        }
                      `}
                    >
                      {step.label}
                    </div>
                    <div
                      className={`
                        text-xs mt-1 transition-colors duration-300
                        ${isActive
                          ? 'text-steel-300'
                          : isCompleted
                          ? 'text-steel-400'
                          : 'text-steel-600'
                        }
                      `}
                    >
                      STEP {step.number}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block">
                    <div
                      className={`
                        h-0.5 w-16 lg:w-24 transition-colors duration-300
                        ${index < currentIndex
                          ? 'bg-tech-blue'
                          : 'bg-steel-700'
                        }
                      `}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Progress Bar (Mobile) */}
      <div className="md:hidden mt-6">
        <div className="bg-steel-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-tech-blue to-orange-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-xs text-steel-400 font-mono">
          PROGRESS: {Math.round(((currentIndex + 1) / steps.length) * 100)}% COMPLETE
        </div>
      </div>

      {/* Classification Bar */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-yellow-500 text-black px-4 py-1 text-xs font-bold tracking-wider">
          ⚠️ PROCUREMENT AUTHORIZATION REQUIRED ⚠️
        </div>
      </div>
    </div>
  );
}