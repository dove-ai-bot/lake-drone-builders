'use client';

import React, { useState } from 'react';
import { IndustrialButton, IndustrialCard, IndustrialBadge } from './industrial/core';
import { formatCurrency } from '../utilities/formatCurrency';

interface CheckoutData {
  orderId: string;
  timestamp: string;
  customer: {
    name: string;
    organization: string;
    clearanceLevel: string;
  };
  shipping: {
    address: string;
    method: string;
    estimatedDelivery: string;
  };
  totals: {
    subtotal: number;
    hazmatFee: number;
    certificationSurcharge: number;
    total: number;
  };
}

interface PaymentProcessorProps {
  checkoutData: CheckoutData;
  onPaymentComplete: () => void;
  onReturnToForm: () => void;
}

export default function PaymentProcessor({ checkoutData, onPaymentComplete, onReturnToForm }: PaymentProcessorProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [authorizationCode, setAuthorizationCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods = [
    {
      id: 'SECURE_PROCUREMENT_AUTH',
      name: 'SECURE PROCUREMENT AUTHORIZATION',
      description: 'Government purchasing card with dual-key encryption',
      icon: '🔐',
      requiredClearance: 'UNCLASSIFIED',
      processingTime: '2-4 minutes'
    },
    {
      id: 'CLASSIFIED_FUNDING_SOURCE',
      name: 'CLASSIFIED FUNDING SOURCE',
      description: 'Black budget allocation with compartmentalized access',
      icon: '🛡️',
      requiredClearance: 'SECRET',
      processingTime: '5-10 minutes'
    },
    {
      id: 'EMERGENCY_REQUISITION',
      name: 'EMERGENCY REQUISITION PROTOCOL',
      description: 'Rapid deployment authorization for urgent operations',
      icon: '⚡',
      requiredClearance: 'CONFIDENTIAL',
      processingTime: '30 seconds'
    },
    {
      id: 'CONTRACTOR_BILLING',
      name: 'CONTRACTOR BILLING SYSTEM',
      description: 'Standard procurement through approved vendor network',
      icon: '💼',
      requiredClearance: 'UNCLASSIFIED',
      processingTime: '1-2 minutes'
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setErrors({});
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'AUTHORIZATION METHOD REQUIRED';
    }

    if (!authorizationCode.trim()) {
      newErrors.authorizationCode = 'SECURITY AUTHORIZATION CODE REQUIRED';
    } else if (authorizationCode.length < 8) {
      newErrors.authorizationCode = 'AUTHORIZATION CODE MUST BE AT LEAST 8 CHARACTERS';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProcessPayment = async () => {
    if (!validatePayment()) {
      return;
    }

    setIsProcessing(true);

    // Simulate processing time based on payment method
    const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);
    const processingDelay = selectedMethod?.id === 'EMERGENCY_REQUISITION' ? 1000 : 3000;

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, processingDelay);
  };

  const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Payment Authorization */}
      <div className="space-y-6">
        <IndustrialCard variant="warning" className="!bg-steel-800">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-steel-100 font-mono mb-2">
              PAYMENT AUTHORIZATION
            </h2>
            <div className="flex flex-wrap gap-2">
              <IndustrialBadge type="warning" variant="safety">SECURE TRANSACTION</IndustrialBadge>
              <IndustrialBadge type="classification" variant="compliance">FINANCIAL CLEARANCE</IndustrialBadge>
              <IndustrialBadge type="status" variant="tech">ENCRYPTION ACTIVE</IndustrialBadge>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-steel-200 font-mono border-b border-steel-600 pb-2">
              AUTHORIZATION PROTOCOL SELECTION
            </h3>
            
            {paymentMethods.map((method) => {
              const isSelected = selectedPaymentMethod === method.id;
              const hasRequiredClearance = true; // For demo purposes, always allow

              return (
                <div
                  key={method.id}
                  className={`
                    border-2 rounded p-4 cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20' 
                      : hasRequiredClearance
                      ? 'border-steel-600 bg-steel-900 hover:border-steel-500'
                      : 'border-red-500 bg-red-500/10 cursor-not-allowed opacity-60'
                    }
                  `}
                  onClick={() => hasRequiredClearance && handlePaymentMethodSelect(method.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-steel-100 text-sm font-mono">
                          {method.name}
                        </h4>
                        {isSelected && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-steel-400 mb-2">
                        {method.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <IndustrialBadge 
                          type="classification" 
                          variant="compliance"
                          size="sm"
                        >
                          CLEARANCE: {method.requiredClearance}
                        </IndustrialBadge>
                        <IndustrialBadge 
                          type="status" 
                          variant="tech"
                          size="sm"
                        >
                          {method.processingTime}
                        </IndustrialBadge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Authorization Code Input */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-steel-200 font-mono border-b border-steel-600 pb-2">
              SECURITY VERIFICATION
            </h3>
            
            <div>
              <label className="block text-sm font-bold text-steel-300 mb-2 font-mono">
                AUTHORIZATION CODE
              </label>
              <input
                type="password"
                placeholder="Enter 8-digit security authorization code"
                value={authorizationCode}
                onChange={(e) => setAuthorizationCode(e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 bg-steel-900 border ${errors.authorizationCode ? 'border-red-500' : 'border-steel-600'} rounded text-steel-100 focus:border-orange-500 focus:outline-none font-mono tracking-widest`}
                maxLength={12}
              />
              {errors.authorizationCode && (
                <div className="text-red-400 text-sm mt-1 font-mono">
                  ⚠️ {errors.authorizationCode}
                </div>
              )}
            </div>

            {selectedMethod && (
              <div className="bg-steel-900 p-4 rounded border border-steel-600">
                <div className="text-sm text-steel-300 font-mono">
                  <div className="mb-2 font-bold">SELECTED PROTOCOL:</div>
                  <div>{selectedMethod.name}</div>
                  <div className="text-steel-400 mt-1">
                    Processing Time: {selectedMethod.processingTime}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Processing State */}
          {isProcessing && (
            <div className="bg-orange-500/10 border border-orange-500 rounded p-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                <div className="text-orange-400 font-mono font-bold">
                  PROCESSING AUTHORIZATION...
                </div>
              </div>
              <div className="text-orange-300 text-sm mt-2 font-mono">
                Validating security credentials and fund availability
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-steel-600 mt-6">
            <IndustrialButton
              variant="secondary"
              onClick={onReturnToForm}
              disabled={isProcessing}
              className="flex-1"
            >
              ← MODIFY ORDER
            </IndustrialButton>
            <IndustrialButton
              variant="primary"
              onClick={handleProcessPayment}
              disabled={isProcessing || !selectedPaymentMethod || !authorizationCode}
              className="flex-1"
            >
              {isProcessing ? 'PROCESSING...' : 'AUTHORIZE PAYMENT →'}
            </IndustrialButton>
          </div>
        </IndustrialCard>
      </div>

      {/* Order Summary & Security Info */}
      <div className="space-y-6">
        {/* Order Summary */}
        <IndustrialCard variant="specification" className="!bg-steel-800">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-steel-100 font-mono mb-2">
              TRANSACTION SUMMARY
            </h2>
            <div className="text-sm text-steel-400 font-mono">
              ORDER ID: {checkoutData.orderId}
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-steel-400 font-mono">SUBTOTAL</span>
              <span className="text-steel-100 font-bold">{formatCurrency(checkoutData.totals.subtotal)}</span>
            </div>
            
            {checkoutData.totals.hazmatFee > 0 && (
              <div className="flex justify-between">
                <span className="text-steel-400 font-mono">HAZMAT FEE</span>
                <span className="text-yellow-400">{formatCurrency(checkoutData.totals.hazmatFee)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-steel-400 font-mono">CERT. SURCHARGE</span>
              <span className="text-tech-blue-400">{formatCurrency(checkoutData.totals.certificationSurcharge)}</span>
            </div>
            
            <div className="border-t border-steel-600 pt-3">
              <div className="flex justify-between text-lg">
                <span className="text-steel-200 font-mono font-bold">TOTAL AUTHORIZATION</span>
                <span className="text-orange-400 font-bold">{formatCurrency(checkoutData.totals.total)}</span>
              </div>
            </div>
          </div>
        </IndustrialCard>

        {/* Security Information */}
        <IndustrialCard variant="warning" className="!bg-steel-800">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-steel-100 font-mono mb-2">
              SECURITY PROTOCOL
            </h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-steel-300 font-mono">TLS 1.3 ENCRYPTION ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-steel-300 font-mono">PAYMENT GATEWAY SECURED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-steel-300 font-mono">FRAUD DETECTION ENABLED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-steel-300 font-mono">AUDIT TRAIL RECORDED</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500 rounded">
            <div className="text-yellow-400 text-xs font-mono font-bold mb-1">
              ⚠️ COMPLIANCE NOTICE
            </div>
            <div className="text-yellow-300 text-xs">
              This transaction is subject to federal procurement regulations. 
              All payments are processed through approved government contractors 
              with appropriate security clearance levels.
            </div>
          </div>
        </IndustrialCard>
      </div>
    </div>
  );
}