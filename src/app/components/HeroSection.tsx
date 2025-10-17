"use client"

import Link from 'next/link'
import { IndustrialButton } from './industrial/core/IndustrialButton'

export function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-steel-900 to-steel-800 relative overflow-hidden">
      {/* Background industrial pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22/%3E%3Cpath%20d%3D%22M20%200v40M0%2020h40%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Classification banner */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-amber-600/20 border border-amber-600/50 px-6 py-2 rounded">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-amber-400 text-sm tracking-wider">
              CLASSIFIED: DEFENSE CONTRACTOR ACCESS ONLY
            </span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="font-industrial text-5xl md:text-7xl lg:text-8xl font-bold text-steel-100 mb-6 tracking-wider">
          MILITARY-GRADE
          <br />
          <span className="text-amber-500">DRONE COMPONENTS</span>
        </h1>

        {/* Subheading */}
        <p className="font-technical text-xl md:text-2xl text-steel-300 mb-4 max-w-3xl leading-relaxed">
          Precision-engineered solutions for critical flight operations
        </p>
        
        <p className="font-technical text-lg text-steel-400 mb-12 max-w-2xl">
          Trusted by aerospace professionals for mission-critical applications since 1973
        </p>

        {/* Company certifications */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2 bg-steel-800/50 border border-steel-600 px-4 py-2 rounded">
            <span className="font-mono text-emerald-400 text-xs">●</span>
            <span className="font-mono text-steel-300 text-sm">ISO 9001:2015</span>
          </div>
          <div className="flex items-center space-x-2 bg-steel-800/50 border border-steel-600 px-4 py-2 rounded">
            <span className="font-mono text-emerald-400 text-xs">●</span>
            <span className="font-mono text-steel-300 text-sm">ITAR REGISTERED</span>
          </div>
          <div className="flex items-center space-x-2 bg-steel-800/50 border border-steel-600 px-4 py-2 rounded">
            <span className="font-mono text-emerald-400 text-xs">●</span>
            <span className="font-mono text-steel-300 text-sm">AS9100D</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products">
            <IndustrialButton 
              variant="primary" 
              size="lg" 
              className="text-lg px-8 py-4 font-bold tracking-wider"
            >
              BROWSE INVENTORY
            </IndustrialButton>
          </Link>
          <Link href="/about">
            <IndustrialButton 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-4"
            >
              TECHNICAL SPECIFICATIONS
            </IndustrialButton>
          </Link>
        </div>

        {/* Security notice */}
        <div className="mt-16 text-center">
          <p className="font-mono text-xs text-steel-500 tracking-wider">
            WARNING: EXPORT CONTROLLED TECHNOLOGY - DISTRIBUTION LIMITED TO U.S. PERSONS
          </p>
          <p className="font-mono text-xs text-steel-600 mt-1">
            LAKE DRONE BUILDERS LLC. • FACILITY: SECTOR 7G • CLEARANCE: UNCLASSIFIED
          </p>
        </div>
      </div>
    </section>
  )
}