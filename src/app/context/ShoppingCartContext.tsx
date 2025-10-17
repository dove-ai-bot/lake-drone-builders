"use client"
import { createContext, ReactNode, useContext, useState } from "react"
import { TechnicalCart } from "../components/TechnicalCart"
import { useLocalStorage } from "../hooks/UseLocalStorage"
import storeItems from "../data/items.json"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  getTotalCost: () => { subtotal: number, hazmatFee: number, certificationSurcharge: number, total: number }
  cartQuantity: number
  cartItems: CartItem[]
}

// Enhanced cart item structure with backward compatibility
type CartItem = {
  id: number
  quantity: number
  addedAt?: string // ISO timestamp
  selectedCertifications?: string[] // From product certifications
  notes?: string // For future "special instructions"
}

// Enhanced cart data structure 
type CartData = {
  version: number // For future migrations
  items: CartItem[]
  lastUpdated: string
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Enhanced cart storage with backward compatibility
  const [cartData, setCartData] = useLocalStorage<CartData | CartItem[]>(
    "shopping-cart",
    []
  )

  // Handle backward compatibility and migration
  const cartItems: CartItem[] = Array.isArray(cartData) 
    ? cartData // Legacy format
    : cartData.items // New format

  const setCartItems = (items: CartItem[] | ((current: CartItem[]) => CartItem[])) => {
    const newItems = typeof items === 'function' ? items(cartItems) : items
    const enhancedData: CartData = {
      version: 1,
      items: newItems.map(item => ({
        ...item,
        addedAt: item.addedAt || new Date().toISOString()
      })),
      lastUpdated: new Date().toISOString()
    }
    setCartData(enhancedData)
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { 
          id, 
          quantity: 1,
          addedAt: new Date().toISOString()
        }]
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id)
    })
  }

  function getTotalCost() {
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

    return { subtotal, hazmatFee, certificationSurcharge, total }
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getTotalCost,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <TechnicalCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
