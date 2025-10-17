'use client';

import React from 'react';
import { IndustrialButton, IndustrialCard } from './industrial/core';
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

interface OrderConfirmationProps {
  checkoutData: CheckoutData;
  cartItems: CartItem[];
}

export default function OrderConfirmation({ checkoutData, cartItems }: OrderConfirmationProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  // Generate tracking number
  const trackingNumber = `TRACK-${checkoutData.orderId.split('-')[1]}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  // Generate reference numbers
  const contractNumber = `CNT-${Date.now().toString().slice(-6)}`;
  const requisitionNumber = `REQ-${checkoutData.orderId.split('-')[2]}`;

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleNewOrder = () => {
    window.location.href = '/products';
  };

  const handleReturnToCart = () => {
    window.location.href = '/cart';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">
          PROCUREMENT AUTHORIZED
        </h1>
        <p className="text-steel-300 text-lg">
          Your purchase order has been successfully processed and approved
        </p>
      </div>

      {/* Official Receipt Document */}
      <IndustrialCard variant="blueprint" className="!bg-white !text-black print:shadow-none">
        {/* Document Header */}
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold font-mono">
                OFFICIAL PROCUREMENT RECEIPT
              </h2>
              <div className="text-sm font-mono mt-1">
                DEPARTMENT OF INDUSTRIAL OPERATIONS
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg font-mono">
                UNCLASSIFIED
              </div>
              <div className="text-sm font-mono">
                FOR OFFICIAL USE ONLY
              </div>
            </div>
          </div>
          
          {/* Classification Stamps */}
          <div className="flex justify-between items-center mt-4">
            <div className="border-2 border-black px-3 py-1">
              <div className="text-xs font-bold font-mono">CLASSIFICATION</div>
              <div className="text-sm font-mono">UNCLASSIFIED</div>
            </div>
            <div className="border-2 border-black px-3 py-1">
              <div className="text-xs font-bold font-mono">AUTHORIZATION</div>
              <div className="text-sm font-mono">APPROVED</div>
            </div>
            <div className="border-2 border-black px-3 py-1">
              <div className="text-xs font-bold font-mono">STATUS</div>
              <div className="text-sm font-mono">PROCESSED</div>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-lg font-mono border-b border-black pb-1 mb-3">
              ORDER DETAILS
            </h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>ORDER ID:</span>
                <span className="font-bold">{checkoutData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>DATE PROCESSED:</span>
                <span className="font-bold">{currentDate}</span>
              </div>
              <div className="flex justify-between">
                <span>TIME:</span>
                <span className="font-bold">{currentTime} UTC</span>
              </div>
              <div className="flex justify-between">
                <span>CONTRACT NO:</span>
                <span className="font-bold">{contractNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>REQ NO:</span>
                <span className="font-bold">{requisitionNumber}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg font-mono border-b border-black pb-1 mb-3">
              REQUESTOR INFO
            </h3>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <span className="block">AUTHORIZED REQUESTOR:</span>
                <span className="font-bold">{checkoutData.customer.name}</span>
              </div>
              <div>
                <span className="block">ORGANIZATION:</span>
                <span className="font-bold">{checkoutData.customer.organization}</span>
              </div>
              <div>
                <span className="block">CLEARANCE LEVEL:</span>
                <span className="font-bold">{checkoutData.customer.clearanceLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Requisitioned Components */}
        <div className="mb-6">
          <h3 className="font-bold text-lg font-mono border-b border-black pb-1 mb-3">
            REQUISITIONED COMPONENTS
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b border-black">
                  <th className="text-left py-2 pr-4">PART NO.</th>
                  <th className="text-left py-2 pr-4">DESCRIPTION</th>
                  <th className="text-right py-2 pr-4">QTY</th>
                  <th className="text-right py-2 pr-4">UNIT PRICE</th>
                  <th className="text-right py-2">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  if (!item) return null;

                  return (
                    <tr key={cartItem.id} className="border-b border-gray-300">
                      <td className="py-2 pr-4 font-bold">
                        {item.id.toString().padStart(6, '0')}
                      </td>
                      <td className="py-2 pr-4">
                        {item.name}
                        {item.certifications.length > 0 && (
                          <div className="text-xs text-gray-600 mt-1">
                            CERT: {item.certifications.slice(0, 2).join(', ')}
                            {item.certifications.length > 2 && ` +${item.certifications.length - 2} more`}
                          </div>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-right font-bold">
                        {cartItem.quantity}
                      </td>
                      <td className="py-2 pr-4 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="py-2 text-right font-bold">
                        {formatCurrency(item.price * cartItem.quantity)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-lg font-mono border-b border-black pb-1 mb-3">
              SHIPPING DETAILS
            </h3>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <span className="block">DELIVERY METHOD:</span>
                <span className="font-bold">{checkoutData.shipping.method.replace(/_/g, ' ')}</span>
              </div>
              <div>
                <span className="block">TRACKING NUMBER:</span>
                <span className="font-bold">{trackingNumber}</span>
              </div>
              <div>
                <span className="block">EST. DELIVERY:</span>
                <span className="font-bold">{checkoutData.shipping.estimatedDelivery}</span>
              </div>
              <div>
                <span className="block">DELIVERY ADDRESS:</span>
                <span className="font-bold whitespace-pre-line">{checkoutData.shipping.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg font-mono border-b border-black pb-1 mb-3">
              FINANCIAL SUMMARY
            </h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span className="font-bold">{formatCurrency(checkoutData.totals.subtotal)}</span>
              </div>
              {checkoutData.totals.hazmatFee > 0 && (
                <div className="flex justify-between">
                  <span>HAZMAT FEE:</span>
                  <span className="font-bold">{formatCurrency(checkoutData.totals.hazmatFee)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>CERT. SURCHARGE:</span>
                <span className="font-bold">{formatCurrency(checkoutData.totals.certificationSurcharge)}</span>
              </div>
              <div className="border-t border-black pt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">TOTAL:</span>
                  <span className="font-bold">{formatCurrency(checkoutData.totals.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="border-t-2 border-black pt-4">
          <div className="grid md:grid-cols-2 gap-6 text-xs font-mono">
            <div>
              <h4 className="font-bold mb-2">HANDLING INSTRUCTIONS:</h4>
              <ul className="space-y-1">
                <li>• All components require secure storage per MIL-STD protocols</li>
                <li>• HAZMAT items must be handled by certified personnel only</li>
                <li>• Maintain chain of custody documentation at all times</li>
                <li>• Report any discrepancies to procurement office immediately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">COMPLIANCE STATEMENTS:</h4>
              <ul className="space-y-1">
                <li>• This procurement complies with Federal Acquisition Regulations</li>
                <li>• All items have been verified against export control lists</li>
                <li>• Payment processed through authorized government systems</li>
                <li>• Audit trail maintained per security protocols</li>
              </ul>
            </div>
          </div>
          
          {/* Barcode Area */}
          <div className="flex justify-center mt-6 mb-4">
            <div className="border border-black px-4 py-2">
              <div className="text-xs font-mono text-center mb-1">VERIFICATION CODE</div>
              <div className="flex space-x-1">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className={`w-1 ${i % 2 === 0 ? 'h-8' : 'h-6'} bg-black`} />
                ))}
              </div>
              <div className="text-xs font-mono text-center mt-1">{checkoutData.orderId}</div>
            </div>
          </div>
        </div>
      </IndustrialCard>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
        <IndustrialButton
          variant="secondary"
          onClick={handleReturnToCart}
          className="flex-1"
        >
          RETURN TO CART
        </IndustrialButton>
        <IndustrialButton
          variant="technical"
          onClick={handlePrintReceipt}
          className="flex-1"
        >
          🖨️ PRINT RECEIPT
        </IndustrialButton>
        <IndustrialButton
          variant="primary"
          onClick={handleNewOrder}
          className="flex-1"
        >
          NEW PROCUREMENT
        </IndustrialButton>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500 rounded print:hidden">
        <div className="text-yellow-400 text-sm font-mono font-bold mb-2">
          ⚠️ UI DEMONSTRATION NOTICE
        </div>
        <div className="text-yellow-300 text-sm">
          This is a user interface demonstration only. No actual payment has been processed, 
          no goods will be shipped, and no real procurement has occurred. This checkout flow 
          is designed to showcase the complete industrial-themed shopping experience.
        </div>
      </div>
    </div>
  );
}