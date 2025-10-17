"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useShoppingCart } from '../context/ShoppingCartContext'

interface NavItem {
  href: string
  label: string
  path: string
}

export function IndustrialNavigation() {
  const { openCart, cartQuantity } = useShoppingCart()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

  const navItems: NavItem[] = [
    { href: '/', label: '[HOME BASE]', path: '/' },
    { href: '/products', label: '[INVENTORY]', path: '/products' },
    { href: '/about', label: '[FACILITY INFO]', path: '/about' },
  ]

  const isActive = (path: string): boolean => pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-gunmetal-900 via-gunmetal-800 to-gunmetal-900 shadow-industrial border-b-2 border-gunmetal-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-primary-500 font-industrial-header text-2xl tracking-wider">
                LAKE DRONE BUILDERS
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.href}
                className={`
                  relative px-4 py-2 text-sm font-bold tracking-wider uppercase
                  transition-all duration-200 ease-out
                  ${isActive(item.path)
                    ? 'text-primary-500 bg-gunmetal-700/50 shadow-rivet'
                    : 'text-gunmetal-300 hover:text-gunmetal-100 hover:bg-gunmetal-700/30'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gunmetal-900
                  before:absolute before:inset-0 before:bg-metal-gradient before:opacity-0 before:transition-opacity
                  hover:before:opacity-10
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-500
                  after:transform after:scale-x-0 after:transition-transform
                  ${isActive(item.path) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-2 px-4 py-2 bg-gunmetal-700 hover:bg-gunmetal-600 text-gunmetal-100 
                         transition-all duration-200 ease-out shadow-rivet hover:shadow-industrial
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gunmetal-900"
              aria-label={`Shopping cart with ${cartQuantity} items`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 18c-1.11 0-2 .89-2 2a2 2 0 1 0 4 0 2 2 0 0 0-2-2zM1 2v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm6 16c-1.11 0-2 .89-2 2a2 2 0 1 0 4 0 2 2 0 0 0-2-2z"/>
              </svg>
              <span className="text-sm font-bold uppercase tracking-wider">[REQUISITION CART]</span>
              {cartQuantity > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary-500 text-gunmetal-900 w-6 h-6 
                              rounded-full flex items-center justify-center text-xs font-bold
                              shadow-lg animate-pulse border-2 border-primary-600">
                  {cartQuantity}
                </div>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2 text-gunmetal-300 hover:text-gunmetal-100 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gunmetal-900"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span className={`block w-full h-0.5 bg-current transition-transform duration-300 ease-out ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition-opacity duration-300 ease-out ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition-transform duration-300 ease-out ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
          style={{
            animation: mobileMenuOpen ? 'hydraulicOpen 0.5s ease-out' : '',
          }}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block px-4 py-3 text-sm font-bold tracking-wider uppercase
                  transition-all duration-200 ease-out
                  ${isActive(item.path)
                    ? 'text-primary-500 bg-gunmetal-700/50 shadow-rivet'
                    : 'text-gunmetal-300 hover:text-gunmetal-100 hover:bg-gunmetal-700/30'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gunmetal-900
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Cart Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openCart()
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-gunmetal-700 hover:bg-gunmetal-600 
                         text-gunmetal-100 transition-all duration-200 ease-out
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gunmetal-900"
            >
              <span className="text-sm font-bold uppercase tracking-wider">[REQUISITION CART]</span>
              {cartQuantity > 0 && (
                <div className="bg-primary-500 text-gunmetal-900 w-6 h-6 rounded-full 
                              flex items-center justify-center text-xs font-bold
                              shadow-lg animate-pulse border-2 border-primary-600">
                  {cartQuantity}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[-1] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}