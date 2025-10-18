"use client"

import { useShoppingCart } from "../context/ShoppingCartContext"
import { IndustrialButton } from "./industrial/core"

type IndustrialQuantityControlProps = {
  id: number
  quantity: number
}

export function IndustrialQuantityControl({ id, quantity }: IndustrialQuantityControlProps) {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-full border border-steel-600 bg-steel-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <IndustrialButton
        variant="secondary"
        size="sm"
        onClick={() => decreaseCartQuantity(id)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="!rounded-none !border-0 !px-4 !py-2 bg-transparent hover:bg-steel-700 disabled:opacity-40"
      >
        <span className="text-base leading-none font-mono">−</span>
      </IndustrialButton>

      <div className="flex min-w-[3.25rem] flex-col items-center justify-center border-x border-steel-600 bg-steel-900/70 px-3 py-1">
        <span className="text-xs font-mono text-steel-400">QTY</span>
        <span className="text-sm font-mono font-bold text-steel-100" aria-live="polite">
          {quantity}
        </span>
      </div>
      
      <IndustrialButton
        variant="secondary"
        size="sm"
        onClick={() => increaseCartQuantity(id)}
        aria-label="Increase quantity"
        className="!rounded-none !border-0 !px-4 !py-2 bg-transparent hover:bg-steel-700"
      >
        <span className="text-base leading-none font-mono">+</span>
      </IndustrialButton>
    </div> 
  )
}
