"use client"
import React from "react"
import Image from "next/image"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { IndustrialCard } from "./industrial/core/IndustrialCard"
import { IndustrialButton } from "./industrial/core/IndustrialButton"
import { IndustrialBadge } from "./industrial/core/IndustrialBadge"
import { ImageSkeleton } from "./ImageSkeleton"

type StoreItemProps = {
  id: number
  name: string
  partNumber: string
  description: string
  price: number
  imgUrl: string
  specifications: Record<string, string>
  certifications: string[]
  stockStatus: string
}

export function StoreItem({
  id,
  name,
  partNumber,
  description,
  price,
  imgUrl,
  specifications,
  certifications,
  stockStatus,
}: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(id)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  
  const handleAddToRequisition = () => {
    setIsAdding(true)
    increaseCartQuantity(id)
    setTimeout(() => setIsAdding(false), 300)
  }
  
  const badges = certifications.slice(0, 3).map((cert) => ({
    type: 'certification' as const,
    variant: cert.includes('ISO') ? 'iso' as const : 'mil-spec' as const,
    text: cert
  }))

  const preferReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`transition-all ${
        preferReducedMotion ? '' : 'duration-200 transform hover:scale-[1.02]'
      }`}
    >
      <IndustrialCard
        variant="technical"
        hoverable
        className="h-full flex flex-col"
        badges={badges}
        serialNumber={partNumber}
      >
      <div className="relative mb-4 -mx-6 -mt-6 overflow-hidden">
        {!imageLoaded && (
          <ImageSkeleton height="192px" className="absolute inset-0 w-full h-48" />
        )}
        <Image
          src={imgUrl}
          alt={name}
          width={300}
          height={192}
          className={`w-full h-48 object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${
            preferReducedMotion ? '' : 'transition-transform duration-200'
          } ${
            isHovered && !preferReducedMotion ? 'scale-110' : 'scale-100'
          }`}
          style={{ filter: 'brightness(0.9) contrast(1.1)' }}
          onLoad={() => setImageLoaded(true)}
        />
        {quantity > 0 && (
          <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-sm font-mono-tech text-sm font-bold shadow-lg transform rotate-3">
            REQUISITIONED
          </div>
        )}
      </div>
      
      <div className="flex-grow flex flex-col">
        <h3 className="font-industrial text-xl mb-1 tracking-wide">{name.toUpperCase()}</h3>
        <p className="font-mono-tech text-xs mb-2">PART NO: {partNumber}</p>
        
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider">Unit Cost</p>
            <p className="font-mono-tech text-2xl text-amber-400 font-bold">{formatCurrency(price)}</p>
          </div>
          <IndustrialBadge
            type="status"
            variant={stockStatus === "IN STOCK" ? "compliance" : "safety"}
            size="sm"
            pulsing={stockStatus !== "IN STOCK"}
          >
            {stockStatus}
          </IndustrialBadge>
        </div>
        
        <p className="text-sm mb-4 line-clamp-2">{description}</p>
        
        {Object.keys(specifications).length > 0 && isHovered && (
          <div className="border-t border-gunmetal-700 pt-3 mb-4 animate-fade-in">
            <p className="font-mono-tech text-xs uppercase mb-2">Technical Specifications</p>
            <div className="space-y-1">
              {Object.entries(specifications).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-mono text-xs">{key}:</span>
                  <span className="font-mono text-xs text-amber-400">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-auto">
          {quantity === 0 ? (
            <IndustrialButton 
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleAddToRequisition}
              loading={isAdding}
              certifications={certifications.slice(0, 2)}
            >
              ADD TO REQUISITION
            </IndustrialButton>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-3 bg-gunmetal-800 rounded p-2">
                <IndustrialButton 
                  variant="secondary"
                  size="sm"
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </IndustrialButton>
                <div className="font-mono-tech text-lg text-amber-400 min-w-[80px] text-center">
                  <span className="text-2xl font-bold">{quantity}</span>
                  <span className="text-xs block uppercase">Units</span>
                </div>
                <IndustrialButton 
                  variant="secondary"
                  size="sm"
                  onClick={() => increaseCartQuantity(id)}
                >
                  +
                </IndustrialButton>
              </div>
              <IndustrialButton
                onClick={() => removeFromCart(id)}
                variant="warning"
                size="sm"
                className="w-full"
              >
                REMOVE FROM REQUISITION
              </IndustrialButton>
            </div>
          )}
        </div>
      </div>
      </IndustrialCard>
    </div>
  )
}