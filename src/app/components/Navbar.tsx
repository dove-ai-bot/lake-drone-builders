"use client"
// Bootstrap imports removed - components need rebuilding with Tailwind
import Link from "next/link"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart()
  return (
    <nav className="sticky top-0 bg-white shadow-sm mb-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <Link href={"/"} className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
            <Link href={"/store"} className="text-blue-600 hover:text-blue-800">
              Store
            </Link>
            <Link href={"/about"} className="text-blue-600 hover:text-blue-800">
              About
            </Link>
          </div>
          {cartQuantity > 0 && (
            <button
              onClick={openCart}
              className="relative w-12 h-12 border border-primary-500 text-primary-500 rounded-full hover:bg-primary-50"
            >
              <svg
                fill="currentColor"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 902.86 902.86"
                className="w-6 h-6 mx-auto"
              >
                <path
                  d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                              M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                />
                <path
                  d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                              c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                              c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                              C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                              c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                              M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                              S619.162,694.432,619.162,716.897z"
                />
              </svg>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-danger text-white text-xs rounded-full flex items-center justify-center"
              >
                {cartQuantity}
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
