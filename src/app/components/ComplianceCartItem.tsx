"use client"

import { useState } from "react"
import Image from "next/image"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { IndustrialQuantityControl } from "./IndustrialQuantityControl"
import { IndustrialButton, IndustrialBadge } from "./industrial/core"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type ComplianceCartItemProps = {
  id: number
  quantity: number
}

export function ComplianceCartItem({ id, quantity }: ComplianceCartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
  
  const item = storeItems.find((i) => i.id === id)
  if (item == null) return null

  const handleRemoveClick = () => {
    setShowRemoveConfirm(true)
  }

  const confirmRemove = () => {
    removeFromCart(item.id)
    setShowRemoveConfirm(false)
  }

  const cancelRemove = () => {
    setShowRemoveConfirm(false)
  }

  return (
    <div className="bg-steel-800/50 border border-steel-600 rounded-lg p-4 hover:bg-steel-800/70 transition-colors duration-200">
      <div className="flex items-start gap-3 sm:gap-6">
        {/* Item Details - Layout Fixed */}
        <div className="flex-1 min-w-0 space-y-2 overflow-hidden">
          {/* Part Number & Name */}
          <div className="space-y-1">
            <div className="text-xs font-mono text-steel-400 uppercase tracking-wider">
              PART #{item.partNumber}
            </div>
            <h4 className="text-sm font-semibold text-steel-100 leading-tight break-words">
              {item.name}
            </h4>
          </div>

          {/* Specifications */}
          <div className="space-y-1">
            <div className="text-xs text-steel-400">
              <span className="font-mono">STATUS:</span>{" "}
              <span className={`font-semibold ${
                item.stockStatus === 'IN STOCK' ? 'text-green-400' :
                item.stockStatus === 'LIMITED SUPPLY' ? 'text-yellow-400' :
                item.stockStatus === 'SPECIAL ORDER' ? 'text-blue-400' :
                'text-red-400'
              }`}>
                {item.stockStatus}
              </span>
            </div>
            
            {/* Key Specifications */}
            {item.specifications && Object.entries(item.specifications).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-xs text-steel-400">
                <span className="font-mono">{key.toUpperCase()}:</span>{" "}
                <span className="text-steel-300">{value}</span>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-1">
            {item.certifications.slice(0, 3).map((cert) => (
              <IndustrialBadge
                key={cert}
                type="certification"
                variant="compliance"
                size="sm"
                className="text-xs"
              >
                {cert}
              </IndustrialBadge>
            ))}
          </div>

          {/* Price & Quantity Controls */}
          <div className="flex flex-col gap-3 pt-3 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-start sm:gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <div className="text-xs text-steel-400 font-mono">UNIT PRICE</div>
              <div className="text-sm font-bold text-steel-100">
                {formatCurrency(item.price)}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:justify-self-end lg:flex-row lg:items-center lg:gap-4">
              <IndustrialQuantityControl id={id} quantity={quantity} />
              
              <div className="text-right space-y-1">
                <div className="text-xs text-steel-400 font-mono">LINE TOTAL</div>
                <div className="text-sm font-bold text-primary-400">
                  {formatCurrency(item.price * quantity)}
                </div>
              </div>
            </div>
          </div>

          {/* Remove Action */}
          <div className="pt-2 border-t border-steel-600">
            {!showRemoveConfirm ? (
              <IndustrialButton
                variant="warning"
                size="sm"
                onClick={handleRemoveClick}
                className="text-xs !py-1"
              >
                REMOVE FROM REQUISITION
              </IndustrialButton>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-yellow-400 font-mono">CONFIRM REMOVAL?</span>
                <IndustrialButton
                  variant="warning"
                  size="sm"
                  onClick={confirmRemove}
                  className="text-xs !py-1 !px-2"
                >
                  YES
                </IndustrialButton>
                <IndustrialButton
                  variant="secondary"
                  size="sm"
                  onClick={cancelRemove}
                  className="text-xs !py-1 !px-2"
                >
                  NO
                </IndustrialButton>
              </div>
            )}
          </div>
        </div>

        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={item.imgUrl}
            alt={item.name}
            width={104}
            height={78}
            className="h-auto max-h-24 w-[6.5rem] rounded border border-steel-500 bg-steel-700 object-cover"
          />
        </div>
      </div>
    </div>
  )
}
