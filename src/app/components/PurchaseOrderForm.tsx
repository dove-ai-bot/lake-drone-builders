'use client';

import React, { useState } from 'react';
import { IndustrialButton, IndustrialCard, IndustrialInput, IndustrialBadge } from './industrial/core';
import { formatCurrency } from '../utilities/formatCurrency';
import storeItems from '../data/items.json';

interface CartItem {
  id: number;
  quantity: number;
  addedAt?: string;
  selectedCertifications?: string[];
  notes?: string;
}

interface CheckoutData {
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

interface PurchaseOrderFormProps {
  cartItems: CartItem[];
  onSubmit: (data: CheckoutData) => void;
  onReturnToCart: () => void;
}

export default function PurchaseOrderForm({ cartItems, onSubmit, onReturnToCart }: PurchaseOrderFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    organization: '',
    clearanceLevel: 'UNCLASSIFIED',
    shippingAddress: '',
    shippingMethod: 'SECURE_TRANSPORT',
    specialInstructions: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const hazmatFee = cartItems.some(cartItem => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return item?.certifications.some(cert => cert.includes('HAZMAT'));
  }) ? 25.00 : 0;

  const certificationSurcharge = cartItems.length > 0 ? 15.50 : 0;
  const total = subtotal + hazmatFee + certificationSurcharge;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'AUTHORIZED REQUESTOR NAME REQUIRED';
    }
    if (!formData.organization.trim()) {
      newErrors.organization = 'ORGANIZATIONAL UNIT REQUIRED';
    }
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'DELIVERY COORDINATES REQUIRED';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (formData.shippingMethod === 'SECURE_TRANSPORT' ? 7 : 14));

    const checkoutData: CheckoutData = {
      customer: {
        name: formData.customerName,
        organization: formData.organization,
        clearanceLevel: formData.clearanceLevel,
      },
      shipping: {
        address: formData.shippingAddress,
        method: formData.shippingMethod,
        estimatedDelivery: deliveryDate.toISOString().split('T')[0],
      },
      totals: {
        subtotal,
        hazmatFee,
        certificationSurcharge,
        total,
      }
    };

    onSubmit(checkoutData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Purchase Order Form */}
      <div className="space-y-6">
        <IndustrialCard variant="technical" className="!bg-steel-800">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-steel-100 font-mono mb-2">
              PURCHASE ORDER FORM
            </h2>
            <div className="flex flex-wrap gap-2">
              <IndustrialBadge type="classification" variant="compliance">UNCLASSIFIED</IndustrialBadge>
              <IndustrialBadge type="warning" variant="safety">FOR OFFICIAL USE ONLY</IndustrialBadge>
              <IndustrialBadge type="status" variant="tech">PROCUREMENT AUTHORIZED</IndustrialBadge>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Details Section */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-bold text-steel-200 mb-4 font-mono">
                REQUESTOR IDENTIFICATION
              </h3>
              <div className="space-y-4">
                <IndustrialInput
                  label="AUTHORIZED REQUESTOR NAME"
                  placeholder="Enter full name as it appears on clearance documentation"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  error={errors.customerName}
                  required
                />
                <IndustrialInput
                  label="ORGANIZATIONAL UNIT"
                  placeholder="Department/Division/Agency designation"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  error={errors.organization}
                  required
                />
                <div>
                  <label className="block text-sm font-bold text-steel-300 mb-2 font-mono">
                    SECURITY CLEARANCE LEVEL
                  </label>
                  <select
                    value={formData.clearanceLevel}
                    onChange={(e) => handleInputChange('clearanceLevel', e.target.value)}
                    className="w-full px-4 py-3 bg-steel-900 border border-steel-600 rounded text-steel-100 focus:border-orange-500 focus:outline-none font-mono"
                  >
                    <option value="UNCLASSIFIED">UNCLASSIFIED</option>
                    <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                    <option value="SECRET">SECRET</option>
                    <option value="TOP_SECRET">TOP SECRET</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shipping Details Section */}
            <div className="border-l-4 border-tech-blue pl-4">
              <h3 className="text-lg font-bold text-steel-200 mb-4 font-mono">
                DELIVERY SPECIFICATIONS
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-steel-300 mb-2 font-mono">
                    DELIVERY COORDINATES {errors.shippingAddress && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    placeholder="Complete address including facility designation and access codes"
                    value={formData.shippingAddress}
                    onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 bg-steel-900 border ${errors.shippingAddress ? 'border-red-500' : 'border-steel-600'} rounded text-steel-100 focus:border-orange-500 focus:outline-none font-mono resize-none`}
                    required
                  />
                  {errors.shippingAddress && (
                    <div className="text-red-400 text-sm mt-1 font-mono">
                      {errors.shippingAddress}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-steel-300 mb-2 font-mono">
                    TRANSPORT METHOD
                  </label>
                  <select
                    value={formData.shippingMethod}
                    onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
                    className="w-full px-4 py-3 bg-steel-900 border border-steel-600 rounded text-steel-100 focus:border-tech-blue focus:outline-none font-mono"
                  >
                    <option value="SECURE_TRANSPORT">SECURE TRANSPORT (7-10 BUSINESS DAYS)</option>
                    <option value="CLASSIFIED_COURIER">CLASSIFIED COURIER (14-21 BUSINESS DAYS)</option>
                    <option value="STANDARD_LOGISTICS">STANDARD LOGISTICS (10-14 BUSINESS DAYS)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-steel-300 mb-2 font-mono">
                    SPECIAL HANDLING INSTRUCTIONS
                  </label>
                  <textarea
                    placeholder="Additional requirements, certifications, or security protocols"
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-steel-900 border border-steel-600 rounded text-steel-100 focus:border-tech-blue focus:outline-none font-mono resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-steel-600">
              <IndustrialButton
                variant="secondary"
                onClick={onReturnToCart}
                type="button"
                className="flex-1"
              >
                ← RETURN TO CART
              </IndustrialButton>
              <IndustrialButton
                variant="primary"
                type="submit"
                className="flex-1"
              >
                AUTHORIZE PROCUREMENT →
              </IndustrialButton>
            </div>
          </form>
        </IndustrialCard>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <IndustrialCard variant="specification" className="!bg-steel-800">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-steel-100 font-mono mb-2">
              REQUISITION SUMMARY
            </h2>
            <div className="text-sm text-steel-400 font-mono">
              REQ ID: PO-{Date.now().toString().slice(-8)} | {new Date().toISOString().split('T')[0]}
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-steel-200 font-mono border-b border-steel-600 pb-2">
              REQUISITIONED COMPONENTS
            </h3>
            {cartItems.map((cartItem) => {
              const item = storeItems.find((i) => i.id === cartItem.id);
              if (!item) return null;

              return (
                <div key={cartItem.id} className="bg-steel-900 p-4 rounded border border-steel-600">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-steel-100 text-sm">{item.name}</h4>
                      <div className="text-xs text-steel-400 font-mono">
                        PART #{item.id.toString().padStart(6, '0')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-steel-100 font-bold">
                        {formatCurrency(item.price)} × {cartItem.quantity}
                      </div>
                      <div className="text-orange-400 font-bold">
                        {formatCurrency(item.price * cartItem.quantity)}
                      </div>
                    </div>
                  </div>
                  
                  {item.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.certifications.slice(0, 2).map((cert, idx) => (
                        <IndustrialBadge key={idx} type="certification" variant="iso" size="sm">
                          {cert}
                        </IndustrialBadge>
                      ))}
                      {item.certifications.length > 2 && (
                        <IndustrialBadge type="status" variant="tech" size="sm">
                          +{item.certifications.length - 2} MORE
                        </IndustrialBadge>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cost Breakdown */}
          <div className="border-t border-steel-600 pt-4 space-y-3">
            <div className="flex justify-between text-steel-300">
              <span className="font-mono">PROCUREMENT SUBTOTAL</span>
              <span className="font-bold">{formatCurrency(subtotal)}</span>
            </div>
            
            {hazmatFee > 0 && (
              <div className="flex justify-between text-yellow-400 text-sm">
                <span className="font-mono">HAZMAT HANDLING FEE</span>
                <span>{formatCurrency(hazmatFee)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-tech-blue text-sm">
              <span className="font-mono">CERTIFICATION SURCHARGE</span>
              <span>{formatCurrency(certificationSurcharge)}</span>
            </div>
            
            <div className="border-t border-steel-600 pt-3">
              <div className="flex justify-between text-orange-400 text-lg font-bold">
                <span className="font-mono">TOTAL PROCUREMENT COST</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Authorization Notice */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500 rounded">
            <div className="text-yellow-400 text-xs font-mono font-bold">
              ⚠️ PROCUREMENT AUTHORIZATION NOTICE
            </div>
            <div className="text-yellow-300 text-xs mt-1">
              By submitting this form, you acknowledge that you are authorized to requisition 
              these materials on behalf of your organizational unit and accept responsibility 
              for proper handling and security of all classified components.
            </div>
          </div>
        </IndustrialCard>
      </div>
    </div>
  );
}