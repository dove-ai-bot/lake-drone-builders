"use client"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "../components/CartItem"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

export default function CartPage() {
  const { cartItems } = useShoppingCart()
  
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id)
    return total + (item?.price || 0) * cartItem.quantity
  }, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold">
              Total: {formatCurrency(totalPrice)}
            </p>
          </div>
        </>
      )}
    </div>
  )
}