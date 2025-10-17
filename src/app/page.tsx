"use client"

import { HeroSection } from "./components/HeroSection"
import { FeaturedProducts } from "./components/FeaturedProducts"
import { CompanyCredentials } from "./components/CompanyCredentials"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CompanyCredentials />
    </main>
  )
}