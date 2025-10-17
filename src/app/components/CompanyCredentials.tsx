"use client"

import { IndustrialBadge } from './industrial/core/IndustrialBadge'

export function CompanyCredentials() {
  const achievements = [
    {
      title: "50+ Years of Uncompromising Excellence",
      subtitle: "Industry Leadership Since 1973",
      description: "Pioneering advanced transgramatic technologies with zero tolerance for inferior components",
      metrics: "99.97% mission success rate"
    },
    {
      title: "ISO-Certified Manufacturing Facilities",
      subtitle: "Sector 7G Production Complex",
      description: "State-of-the-art fabrication capabilities with environmental controls rated for Class 10,000 cleanroom standards",
      metrics: "14 international certifications"
    },
    {
      title: "Military Contract Compliance",
      subtitle: "Trusted Defense Contractor",
      description: "Primary supplier for classified aerospace programs requiring the highest security clearances and technical specifications",
      metrics: "ITAR registered facility"
    }
  ]

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "AS9100D Aerospace Quality",
    "ISO 14001:2015 Environmental",
    "ISO 45001:2018 Safety Management",
    "ITAR Defense Trade Regulations",
    "MIL-STD-810G Environmental Testing",
    "FAA TSO Authorization",
    "NIST Cybersecurity Framework"
  ]

  const partnerships = [
    "Lockheed Martin Advanced Programs",
    "Boeing Phantom Works Division",
    "Northrop Grumman Skunk Works",
    "NASA Goddard Space Flight Center",
    "DARPA Tactical Technology Office",
    "MIT Lincoln Laboratory"
  ]

  return (
    <section className="bg-gradient-to-b from-steel-800 to-steel-900 py-16 relative">
      {/* Technical grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%220.5%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22/%3E%3Cpath%20d%3D%22M30%200v60M0%2030h60%22/%3E%3Cpath%20d%3D%22M15%200v60M45%200v60M0%2015h60M0%2045h60%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-mono text-emerald-400 text-sm tracking-wider">
              CORPORATE CREDENTIALS
            </span>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="font-industrial text-4xl md:text-5xl font-bold text-steel-100 mb-4 tracking-wider">
            TECHNICAL LEADERSHIP
            <br />
            <span className="text-emerald-400">& INNOVATION</span>
          </h2>
          
          <p className="font-technical text-lg text-steel-400 max-w-3xl mx-auto">
            Lake Drone Builders maintains the highest standards of engineering excellence through rigorous quality control processes and cutting-edge research initiatives
          </p>
        </div>

        {/* Key achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-steel-800/50 border border-steel-600 rounded-lg p-6 hover:bg-steel-800/70 transition-colors duration-200">
              <div className="mb-4">
                <h3 className="font-industrial text-xl font-bold text-steel-100 mb-2">
                  {achievement.title}
                </h3>
                <div className="font-mono text-amber-400 text-sm tracking-wider mb-3">
                  {achievement.subtitle}
                </div>
              </div>
              
              <p className="font-technical text-steel-300 text-sm mb-4 leading-relaxed">
                {achievement.description}
              </p>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="font-mono text-emerald-400 text-xs tracking-wider">
                  {achievement.metrics}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications and partnerships grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Certifications */}
          <div>
            <h3 className="font-industrial text-2xl font-bold text-steel-100 mb-6 tracking-wider">
              QUALITY CERTIFICATIONS
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3 bg-steel-800/30 border border-steel-700 rounded p-3">
                  <IndustrialBadge type="certification" variant="iso" size="sm">
                    ✓
                  </IndustrialBadge>
                  <span className="font-mono text-steel-300 text-sm">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic partnerships */}
          <div>
            <h3 className="font-industrial text-2xl font-bold text-steel-100 mb-6 tracking-wider">
              STRATEGIC PARTNERSHIPS
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {partnerships.map((partner, index) => (
                <div key={index} className="flex items-center space-x-3 bg-steel-800/30 border border-steel-700 rounded p-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="font-mono text-steel-300 text-sm">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research & Development */}
        <div className="bg-gradient-to-r from-steel-800/60 to-steel-700/60 border border-steel-600 rounded-lg p-8 text-center">
          <h3 className="font-industrial text-3xl font-bold text-steel-100 mb-4 tracking-wider">
            ADVANCED R&D INITIATIVES
          </h3>
          <p className="font-technical text-lg text-steel-300 mb-6 max-w-4xl mx-auto">
            Our team of 200+ engineers continuously pushes the boundaries of transgramatic technology, 
            developing next-generation solutions for tomorrow&apos;s aerospace challenges
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-amber-500 mb-2">127</div>
              <div className="font-mono text-xs text-steel-400 tracking-wider">ACTIVE PATENTS</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-emerald-400 mb-2">$47M</div>
              <div className="font-mono text-xs text-steel-400 tracking-wider">R&D INVESTMENT</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-cyan-400 mb-2">23</div>
              <div className="font-mono text-xs text-steel-400 tracking-wider">CLASSIFIED PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-purple-400 mb-2">∞</div>
              <div className="font-mono text-xs text-steel-400 tracking-wider">INNOVATION POTENTIAL</div>
            </div>
          </div>
        </div>

        {/* Footer notice */}
        <div className="text-center mt-12">
          <p className="font-mono text-xs text-steel-500 tracking-wider">
            All performance metrics independently verified by third-party auditing firms
          </p>
          <p className="font-mono text-xs text-steel-600 mt-1">
            LAKE DRONE BUILDERS LLC • EST. 1973 • FACILITY SECURITY CLEARANCE: SECRET
          </p>
        </div>
      </div>
    </section>
  )
}