"use client"

import { useState } from 'react'
import Image from 'next/image'
import { IndustrialCard } from './industrial/core/IndustrialCard'
import { IndustrialButton } from './industrial/core/IndustrialButton'
import { IndustrialBadge } from './industrial/core/IndustrialBadge'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import { ImageSkeleton } from './ImageSkeleton'

const featuredProducts = [
  {
    id: 2,
    name: "Turbo Encabulator",
    partNumber: "LDB-2-X",
    description: "The BRAND Turbo Encabulator is mounted transgramatically to offload unilateral phase distortions while still maintaining the flexibility to counter the modial interaction of magneto-reluctance.",
    price: 1199,
    imgUrl: "/imgs/turbo-encabulator.png",
    specifications: {
      "Phase Distortion": "Unilateral",
      "Mounting": "Transgramatic",
      "Magneto-Reluctance": "Countered",
      "Power Rating": "2.21 GW"
    },
    certifications: ["ISO 14001:2015", "CE Mark", "FCC Part 15", "UL Listed"],
    stockStatus: "LIMITED SUPPLY"
  },
  {
    id: 4,
    name: "Main winding, lotus-o-delta type",
    partNumber: "LDB-4-X",
    description: "Main windings of semi-permeable MonoPlexity(TM) lotus-o-delta type sterlings allow a carefree automated landing pattern, without the usual horizontal diametric fluctuations.",
    price: 14000,
    imgUrl: "/imgs/main-winding-lotus-o-delta-type.png",
    specifications: {
      "Winding Type": "Lotus-O-Delta",
      "Permeability": "Semi",
      "MonoPlexity™": "Sterling Grade",
      "Fluctuation Control": "±0.001mm"
    },
    certifications: ["AS9100D", "ITAR Compliant", "ISO 45001:2018"],
    stockStatus: "SPECIAL ORDER"
  },
  {
    id: 8,
    name: "Conductors and Fluxes (Aeon)",
    partNumber: "LDB-8-X",
    description: "Conductors and fluxes are always ready to perform. We offer both Aeon and capacitance types.",
    price: 14000,
    imgUrl: "/imgs/conductors-and-fluxes-aeon.png",
    specifications: {
      "Type": "Aeon Series",
      "Conductivity": "Superlative",
      "Flux Capacity": "∞",
      "Temperature Range": "-273°C to 5778K"
    },
    certifications: ["ISO/IEC 17025", "NIST Traceable", "Q-Level Clearance Required"],
    stockStatus: "RESTRICTED ACCESS"
  },
  {
    id: 6,
    name: "Non-reversible Tremie pipe",
    partNumber: "LDB-6-X",
    description: "The BRAND non-reversible Tremie pipe is the classic answer to check-valve reluctance in open-air, free-landing without biometric linear soft substitutions.",
    price: 1199,
    imgUrl: "/imgs/non-reversible-tremie-pipe.png",
    specifications: {
      "Flow Direction": "Non-Reversible",
      "Valve Reluctance": "Zero",
      "Operating Pressure": "3000 PSI",
      "Biometric Compliance": "N/A"
    },
    certifications: ["ASME B31.3", "API 6D", "NSF-61"],
    stockStatus: "IN STOCK"
  }
]

export function FeaturedProducts() {
  const { increaseCartQuantity, getItemQuantity } = useShoppingCart()
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  return (
    <section className="bg-steel-900 py-16 relative">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%2300ffff%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M0%200h100v100H0z%22/%3E%3Cpath%20d%3D%22M50%200v100M0%2050h100%22/%3E%3Cpath%20d%3D%22M25%200v100M75%200v100M0%2025h100M0%2075h100%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="font-mono text-cyan-400 text-sm tracking-wider">
              FEATURED INVENTORY
            </span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          </div>
          
          <h2 className="font-industrial text-4xl md:text-5xl font-bold text-steel-100 mb-4 tracking-wider">
            MISSION-CRITICAL
            <br />
            <span className="text-amber-500">COMPONENTS</span>
          </h2>
          
          <p className="font-technical text-lg text-steel-400 max-w-2xl mx-auto">
            Premium-grade components for specialized applications requiring the highest levels of reliability and performance
          </p>
        </div>

        {/* Featured products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const itemQuantity = getItemQuantity(product.id)
            const isRequisitioned = itemQuantity > 0
            const imageLoaded = loadedImages.has(product.id)

            return (
              <div key={product.id} className="group">
                <IndustrialCard variant="technical" className="h-full">
                  {/* Product image */}
                  <div className="relative mb-4 bg-steel-800 rounded p-4 border border-steel-600">
                    {!imageLoaded && (
                      <ImageSkeleton height="192px" className="absolute inset-4 rounded" />
                    )}
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      width={200}
                      height={200}
                      className={`w-full h-48 object-contain transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setLoadedImages(prev => new Set(prev).add(product.id))}
                    />
                    
                    {/* Requisitioned overlay */}
                    {isRequisitioned && (
                      <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center rounded">
                        <div className="bg-amber-500 text-steel-900 px-4 py-2 rounded font-mono font-bold text-sm transform rotate-12">
                          REQUISITIONED
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="space-y-4">
                    {/* Part number */}
                    <div className="font-mono text-cyan-400 text-sm tracking-wider">
                      {product.partNumber}
                    </div>

                    {/* Product name */}
                    <h3 className="font-industrial text-lg font-bold uppercase">
                      {product.name}
                    </h3>

                    {/* Key specifications */}
                    <div className="space-y-1">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="font-mono">{key}:</span>
                          <span className="font-mono">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1">
                      {product.certifications.slice(0, 2).map((cert) => (
                        <IndustrialBadge
                          key={cert}
                          type="certification"
                          variant="iso"
                          size="sm"
                        >
                          {cert}
                        </IndustrialBadge>
                      ))}
                    </div>

                    {/* Stock status */}
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        product.stockStatus === 'IN STOCK' ? 'bg-emerald-400' :
                        product.stockStatus === 'LIMITED SUPPLY' ? 'bg-amber-400' :
                        product.stockStatus === 'SPECIAL ORDER' ? 'bg-blue-400' :
                        'bg-red-400'
                      }`}></div>
                      <span className="font-mono text-xs tracking-wider">
                        {product.stockStatus}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="border-t border-steel-600 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-sm">UNIT COST:</span>
                        <span className="font-mono text-xl font-bold text-amber-500">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      {/* Requisition button */}
                      <IndustrialButton
                        variant={isRequisitioned ? "secondary" : "primary"}
                        size="md"
                        className="w-full"
                        onClick={() => increaseCartQuantity(product.id)}
                        disabled={product.stockStatus === 'RESTRICTED ACCESS'}
                      >
                        {product.stockStatus === 'RESTRICTED ACCESS' ? 
                          'CLEARANCE REQUIRED' :
                          isRequisitioned ? 
                            `REQUISITIONED (${itemQuantity})` : 
                            'ADD TO REQUISITION'
                        }
                      </IndustrialButton>
                    </div>
                  </div>
                </IndustrialCard>
              </div>
            )
          })}
        </div>

        {/* View all products link */}
        <div className="text-center mt-12">
          <p className="font-mono text-steel-400 text-sm mb-4">
            NEED ADDITIONAL COMPONENTS? VIEW COMPLETE CATALOG
          </p>
          <IndustrialButton variant="secondary" size="lg">
            <a href="/products" className="flex items-center space-x-2">
              <span>FULL INVENTORY ACCESS</span>
              <span className="font-mono">→</span>
            </a>
          </IndustrialButton>
        </div>
      </div>
    </section>
  )
}