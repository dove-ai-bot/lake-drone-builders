"use client"

import { useShoppingCart } from "../context/ShoppingCartContext"
import { IndustrialButton } from "./industrial/core"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

export function ProcurementSummary() {
  const { cartItems } = useShoppingCart()

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id)
    return total + (item?.price || 0) * cartItem.quantity
  }, 0)

  // Calculate fake industrial fees
  const hazmatFee = cartItems.some(cartItem => {
    const item = storeItems.find((i) => i.id === cartItem.id)
    return item?.certifications.some(cert => cert.includes('HAZMAT'))
  }) ? 25.00 : 0

  const certificationSurcharge = cartItems.length > 0 ? 15.50 : 0
  
  const total = subtotal + hazmatFee + certificationSurcharge

  const handleProcessOrder = () => {
    window.location.href = '/checkout';
  }

  return (
    <div className="border-t-2 border-steel-600 bg-steel-900/80 p-4 space-y-4">
      {/* Procurement Summary Header */}
      <div className="border-b border-steel-600 pb-2">
        <h3 className="text-sm font-bold text-steel-200 font-mono uppercase tracking-wide">
          PROCUREMENT SUMMARY
        </h3>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-steel-400 font-mono">PROCUREMENT SUBTOTAL</span>
          <span className="text-steel-100 font-bold">{formatCurrency(subtotal)}</span>
        </div>
        
        {hazmatFee > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-steel-400 font-mono text-xs">HAZMAT HANDLING FEE</span>
            <span className="text-yellow-400 text-xs">{formatCurrency(hazmatFee)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-steel-400 font-mono text-xs">CERTIFICATION SURCHARGE</span>
          <span className="text-blue-400 text-xs">{formatCurrency(certificationSurcharge)}</span>
        </div>
        
        <div className="border-t border-steel-600 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-steel-200 font-mono font-bold">TOTAL PROCUREMENT COST</span>
            <span className="text-primary-400 font-bold text-lg">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Process Order Button */}
      <div className="pt-2">
        <IndustrialButton
          variant="primary"
          size="lg"
          onClick={handleProcessOrder}
          className="w-full !bg-primary-600 hover:!bg-primary-700 active:!bg-primary-800"
        >
          <span className="font-bold tracking-wide">PROCESS PURCHASE ORDER</span>
        </IndustrialButton>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-steel-500 font-mono space-y-1">
        <div>REQ ID: {Date.now().toString().slice(-8)}</div>
        <div>APPROVAL PENDING: PROCUREMENT DEPT</div>
      </div>
    </div>
  )
}