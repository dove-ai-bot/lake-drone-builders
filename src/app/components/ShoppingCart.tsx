"use client"
// Bootstrap imports removed - components need rebuilding with Tailwind
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"

type ShoppingCartProps = { isOpen: boolean }

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart}></div>
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}

            <div className="ml-auto font-bold text-lg">
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id)
                  return total + (item?.price || 0) * cartItem.quantity
                }, 0)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
