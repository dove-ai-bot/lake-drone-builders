'use client';

import React, { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import PurchaseOrderForm from '../components/PurchaseOrderForm';
import PaymentProcessor from '../components/PaymentProcessor';
import OrderConfirmation from '../components/OrderConfirmation';
import CheckoutStepIndicator from '../components/CheckoutStepIndicator';

type CheckoutStep = 'order-form' | 'payment' | 'confirmation';

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

export default function CheckoutPage() {
  const { cartItems } = useShoppingCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('order-form');
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  const handleFormSubmit = (formData: Omit<CheckoutData, 'orderId' | 'timestamp'>) => {
    const orderId = `PO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    
    const completeCheckoutData: CheckoutData = {
      ...formData,
      orderId,
      timestamp,
    };
    
    setCheckoutData(completeCheckoutData);
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentStep('confirmation');
  };

  const handleReturnToCart = () => {
    window.location.href = '/cart';
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="text-center text-steel-100">
          <h1 className="text-2xl font-bold mb-4">NO ITEMS REQUISITIONED</h1>
          <p className="mb-8">Your procurement cart is empty. Return to the catalog to requisition components.</p>
          <button
            onClick={() => window.location.href = '/products'}
            className="px-6 py-3 bg-orange-600 text-white font-bold rounded hover:bg-orange-700 transition-colors"
          >
            RETURN TO CATALOG
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-steel-900">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-steel-100 mb-2 font-mono">
            PURCHASE ORDER PROCESSING
          </h1>
          <p className="text-steel-400 text-sm md:text-lg">
            CLASSIFICATION: UNCLASSIFIED // FOR OFFICIAL USE ONLY
          </p>
        </div>

        {/* Step Indicator */}
        <CheckoutStepIndicator currentStep={currentStep} />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-2 md:px-0">
          {currentStep === 'order-form' && (
            <PurchaseOrderForm
              cartItems={cartItems}
              onSubmit={handleFormSubmit}
              onReturnToCart={handleReturnToCart}
            />
          )}
          
          {currentStep === 'payment' && checkoutData && (
            <PaymentProcessor
              checkoutData={checkoutData}
              onPaymentComplete={handlePaymentComplete}
              onReturnToForm={() => setCurrentStep('order-form')}
            />
          )}
          
          {currentStep === 'confirmation' && checkoutData && (
            <OrderConfirmation
              checkoutData={checkoutData}
              cartItems={cartItems}
            />
          )}
        </div>
      </div>
    </div>
  );
}