"use client"

import { useShoppingCart } from "../context/ShoppingCartContext"
import { ComplianceCartItem } from "./ComplianceCartItem"
import { ProcurementSummary } from "./ProcurementSummary"
import { IndustrialButton } from "./industrial/core"

type TechnicalCartProps = { 
  isOpen: boolean 
}

export function TechnicalCart({ isOpen }: TechnicalCartProps) {
  const { closeCart, cartItems } = useShoppingCart()
  
  if (!isOpen) return null

  const hasItems = cartItems.length > 0

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Backdrop with industrial overlay effect */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" 
        onClick={closeCart}
        aria-hidden="true"
      />
      
      {/* Cart Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md md:max-w-lg bg-gradient-to-b from-steel-900 to-steel-800 shadow-2xl border-l-2 border-steel-600 transform transition-transform duration-300 ease-out">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-steel-600 bg-steel-800/50">
          <h2 
            id="cart-title"
            className="text-lg font-bold text-steel-100 font-mono uppercase tracking-wider"
          >
            PROCUREMENT REQUISITION FORM
          </h2>
          <IndustrialButton
            variant="secondary"
            size="sm"
            onClick={closeCart}
            aria-label="Close cart"
            className="!px-3 !py-2 hover:bg-steel-700 active:bg-steel-600"
          >
            <span className="text-lg leading-none">&times;</span>
          </IndustrialButton>
        </div>

        {/* Content Area */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            {hasItems ? (
              <div className="space-y-4">
                {/* Requisition Status Bar */}
                <div className="bg-steel-800/80 border border-steel-600 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-steel-300 font-mono">REQUISITION STATUS</span>
                    <span className="text-primary-400 font-semibold">PENDING APPROVAL</span>
                  </div>
                </div>

                {/* Items Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-steel-200 font-mono uppercase tracking-wide border-b border-steel-600 pb-1">
                    REQUISITION LINE ITEMS
                  </h3>
                  {cartItems.map((item) => (
                    <ComplianceCartItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-steel-700 flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-steel-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-steel-200 font-mono uppercase">
                    NO ACTIVE REQUISITIONS
                  </h3>
                  <p className="text-steel-400 text-sm">
                    No items in procurement queue
                  </p>
                </div>
                <IndustrialButton
                  variant="primary"
                  size="md"
                  onClick={closeCart}
                  className="mt-4"
                >
                  BROWSE INVENTORY
                </IndustrialButton>
              </div>
            )}
          </div>

          {/* Footer with totals */}
          {hasItems && <ProcurementSummary />}
        </div>
      </div>
    </div>
  )
}