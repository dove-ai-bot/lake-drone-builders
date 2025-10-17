"use client"
import storeItems from "../data/items.json"
import { StoreItem } from "../components/StoreItem"

export function Store() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gunmetal-900 via-steel-800 to-gunmetal-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="font-industrial text-5xl text-amber-400 tracking-wider mb-2">
            INDUSTRIAL COMPONENTS CATALOG
          </h1>
          <div className="flex items-center gap-4 text-gunmetal-400">
            <span className="font-mono-tech text-sm">CLEARANCE LEVEL: PUBLIC</span>
            <span className="text-amber-500">●</span>
            <span className="font-mono-tech text-sm">REVISION: 2025.10.16</span>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {storeItems.map((item) => (
            <div key={item.id} className="min-h-[600px]">
              <StoreItem {...item} specifications={item.specifications as unknown as Record<string, string>} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gunmetal-900 to-transparent pointer-events-none"></div>
    </div>
  )
}