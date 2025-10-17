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
    <div className="flex items-center gap-1 bg-steel-700/50 rounded border border-steel-600">
      <IndustrialButton
        variant="secondary"
        size="sm"
        onClick={() => decreaseCartQuantity(id)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="!px-2 !py-1 !rounded-none !border-0 bg-transparent hover:bg-steel-600 disabled:opacity-30"
      >
        <span className="text-sm leading-none font-mono">−</span>
      </IndustrialButton>
      
      <div className="px-3 py-1 min-w-[3rem] text-center">
        <span className="text-sm font-mono text-steel-100 font-bold">
          {quantity}
        </span>
      </div>
      
      <IndustrialButton
        variant="secondary"
        size="sm"
        onClick={() => increaseCartQuantity(id)}
        aria-label="Increase quantity"
        className="!px-2 !py-1 !rounded-none !border-0 bg-transparent hover:bg-steel-600"
      >
        <span className="text-sm leading-none font-mono">+</span>
      </IndustrialButton>
    </div>
  )
}