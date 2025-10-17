"use client"
// Bootstrap imports removed - components need rebuilding with Tailwind
import Image from "next/image"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find((i) => i.id === id)
  if (item == null) return null
  return (
    <div className="flex items-center gap-2">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={125}
        height={75}
        style={{ objectFit: "cover" }}
      />
      <div className="flex-1">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-gunmetal-400 text-xs">
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-gunmetal-400 text-sm">
          {formatCurrency(item.price)}
        </div>
      </div>

      <div>{formatCurrency(item.price * quantity)}</div>
      <button
        className="bg-danger hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </button>
    </div>
  )
}
