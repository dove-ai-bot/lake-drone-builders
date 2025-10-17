'use client';

import { IndustrialCard, IndustrialBadge, IndustrialButton } from '../components/industrial/core';
import { BadgeType, BadgeVariant } from '../components/industrial/core';

export default function About() {
  const certifications = [
    { type: 'certification' as BadgeType, variant: 'iso' as BadgeVariant, text: 'ISO 9001:2015', code: 'QMS-2024-LDB' },
    { type: 'certification' as BadgeType, variant: 'mil-spec' as BadgeVariant, text: 'MIL-STD-810H', code: 'ENV-TEST-2024' },
    { type: 'certification' as BadgeType, variant: 'safety' as BadgeVariant, text: 'AS9100D', code: 'AERO-QUAL-2024' },
    { type: 'certification' as BadgeType, variant: 'compliance' as BadgeVariant, text: 'FAA Part 107', code: 'UAS-CERT-2024' },
    { type: 'certification' as BadgeType, variant: 'tech' as BadgeVariant, text: 'IEEE 802.11', code: 'COMM-STD-2024' },
    { type: 'certification' as BadgeType, variant: 'iso' as BadgeVariant, text: 'ITAR Compliant', code: 'EXPORT-CTRL-2024' }
  ];

  const teamMembers = [
    {
      name: 'Dr. Marcus Technician',
      title: 'Chief Technical Architect',
      credentials: 'Ph.D. Transgramatic Engineering, MIT',
      experience: '25+ years in reciprocating dingle arm optimization',
      specialties: 'Hydrocoptic marzlevane alignment, Non-reversible tremie pipe dynamics'
    },
    {
      name: 'Sarah Requisition-Handler',
      title: 'Director of Procurement Excellence',
      credentials: 'M.S. Industrial Supply Chain, Stanford',
      experience: '20+ years managing critical component inventories',
      specialties: 'Pre-famulated amulite sourcing, Spurving bearing certification'
    },
    {
      name: 'Colonel James Compliance',
      title: 'Military Standards Liaison',
      credentials: 'Former USAF Squadron Leader, Top Secret Clearance',
      experience: '30+ years aerospace systems validation',
      specialties: 'MIL-SPEC compliance, Classified component protocols'
    },
    {
      name: 'Dr. Elena Precision',
      title: 'Quality Assurance Director',
      credentials: 'Ph.D. Metrology, Caltech',
      experience: '18+ years precision measurement systems',
      specialties: 'Lotus-O-Delta calibration, Conductors flux analysis'
    }
  ];

  const milestones = [
    { year: '1973', event: 'Lake Drone Builders founded by aerospace engineer Theodore Encabulator' },
    { year: '1978', event: 'First successful test of hydrocoptic marzlevane technology' },
    { year: '1985', event: 'Awarded exclusive military contract for spurving bearing development' },
    { year: '1992', event: 'Breakthrough in pre-famulated amulite substrate manufacturing' },
    { year: '1999', event: 'ISO 9001 certification achieved for quality management systems' },
    { year: '2003', event: 'Partnership established with leading aerospace contractors' },
    { year: '2010', event: 'Advanced R&D facility constructed for transgramatic research' },
    { year: '2015', event: 'MIL-STD-810H environmental testing certification obtained' },
    { year: '2020', event: 'FAA Part 107 compliance for unmanned aircraft systems' },
    { year: '2024', event: 'Next-generation turbo encabulator technology released' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-950 via-steel-900 to-steel-800">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-steel-900 to-steel-800 border-b-2 border-steel-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMzc0MTUxIiBmaWxsLW9wYWNpdHk9IjAuMSI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-steel-100 mb-4 tracking-wide">
              FACILITY INFORMATION
            </h1>
            <p className="text-xl text-steel-300 max-w-4xl mx-auto">
              CLASSIFICATION: UNCLASSIFIED // DISTRIBUTION: UNLIMITED // SECURITY LEVEL: PUBLIC RELEASE
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">
        
        {/* Company History Section */}
        <section>
          <IndustrialCard 
            variant="technical" 
            title="CORPORATE HISTORICAL ARCHIVE"
            className="mb-8"
            serialNumber="HIST-2024-LDB"
          >
            <div className="space-y-6">
              <p className="leading-relaxed">
                Lake Drone Builders was established in 1973 by distinguished aerospace engineer 
                Theodore J. Encabulator, following his groundbreaking work on reciprocating dingle 
                arm technology at the National Institute of Advanced Manufacturing. The company was 
                founded on the principle that critical flight operations require components engineered 
                to the highest standards of precision and reliability.
              </p>
              
              <p className="leading-relaxed">
                Our founding mission focused on addressing the critical shortage of properly 
                calibrated spurving bearings in the emerging unmanned aircraft sector. Through 
                innovative application of transgramatic principles and advanced hydrocoptic 
                marzlevane technology, we established ourselves as the premier supplier of 
                specialized drone components to military and aerospace contractors.
              </p>
              
              <div className="bg-steel-800 border border-steel-600 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-amber-400 mb-6 font-mono">
                  MAJOR TECHNOLOGICAL MILESTONES
                </h3>
                <div className="grid gap-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4 border-l-2 border-amber-500 pl-4">
                      <span className="text-amber-400 font-mono font-bold min-w-[60px]">
                        {milestone.year}
                      </span>
                      <span>
                        {milestone.event}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </IndustrialCard>
        </section>

        {/* Certifications and Awards Section */}
        <section>
          <IndustrialCard 
            variant="specification" 
            title="REGULATORY COMPLIANCE & CERTIFICATIONS"
            className="mb-8"
            serialNumber="CERT-2024-LDB"
          >
            <div className="space-y-6">
              <p className="leading-relaxed">
                Lake Drone Builders maintains the highest levels of regulatory compliance and 
                quality assurance. Our manufacturing processes are certified under multiple 
                international standards, ensuring that every component meets or exceeds the 
                stringent requirements of military and aerospace applications.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex flex-col items-center p-4 bg-steel-800 rounded-lg border border-steel-600">
                    <IndustrialBadge
                      type={cert.type}
                      variant={cert.variant}
                      size="lg"
                      validationCode={cert.code}
                      className="mb-2"
                    >
                      {cert.text}
                    </IndustrialBadge>
                    <span className="text-xs font-mono text-center">
                      {cert.code}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="bg-amber-900/20 border border-amber-500 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-bold text-amber-400 mb-3">
                  🏆 INDUSTRY RECOGNITION
                </h4>
                <ul className="space-y-2">
                  <li>• National Defense Industrial Association Excellence Award (2022)</li>
                  <li>• Precision Manufacturing Leadership Council Recognition (2021)</li>
                  <li>• Advanced Materials Research Consortium Breakthrough Award (2020)</li>
                  <li>• Military Contractor Quality Assurance Certification (2019)</li>
                  <li>• Aerospace Component Innovation Distinguished Service Medal (2018)</li>
                </ul>
              </div>
            </div>
          </IndustrialCard>
        </section>

        {/* Manufacturing Facility Section */}
        <section>
          <IndustrialCard 
            variant="blueprint" 
            title="MANUFACTURING FACILITY SPECIFICATIONS"
            className="mb-8"
            serialNumber="FAC-2024-LDB"
          >
            <div className="space-y-6">
              <p className="leading-relaxed">
                Our state-of-the-art manufacturing facility spans 47,000 square feet of 
                climate-controlled production space, featuring advanced CNC machining centers, 
                precision measurement laboratories, and specialized clean rooms for critical 
                component assembly. The facility operates under strict environmental controls 
                with +/- 0.1°C temperature regulation and class 10,000 particulate filtration.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-steel-800 border border-steel-600 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-tech-blue-400 mb-4 font-mono">
                    PRODUCTION CAPABILITIES
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 15 High-Precision CNC Machining Centers</li>
                    <li>• Coordinate Measuring Machine (CMM) Accuracy: ±0.0001&quot;</li>
                    <li>• Material Processing: Titanium, Inconel, Carbon Fiber</li>
                    <li>• Surface Finish: Ra 8 µin or better</li>
                    <li>• Tolerance Capability: ±0.0002&quot; geometric</li>
                    <li>• Production Capacity: 10,000 units/month</li>
                  </ul>
                </div>
                
                <div className="bg-steel-800 border border-steel-600 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-tech-blue-400 mb-4 font-mono">
                    QUALITY CONTROL SYSTEMS
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 100% Dimensional Inspection Protocol</li>
                    <li>• Real-time Statistical Process Control</li>
                    <li>• Traceability to NIST Standards</li>
                    <li>• Environmental Testing Chamber: -65°F to +350°F</li>
                    <li>• Vibration Testing: 5-2000 Hz at 20G</li>
                    <li>• Salt Spray Corrosion Testing: 168+ hours</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-steel-800 border border-steel-600 rounded-lg p-6 mt-6">
                <h4 className="text-lg font-bold text-amber-400 mb-4 font-mono">
                  SPECIALIZED EQUIPMENT
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-amber-400 font-bold">Hydrocoptic Calibration Station</span>
                    <p>Precision alignment of marzlevane components with 0.001° angular accuracy</p>
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold">Spurving Bearing Test Rig</span>
                    <p>Dynamic load testing up to 50,000 RPM with full telemetry monitoring</p>
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold">Tremie Pipe Analysis Chamber</span>
                    <p>Non-reversible flow verification with pressure differential mapping</p>
                  </div>
                </div>
              </div>
            </div>
          </IndustrialCard>
        </section>

        {/* Technical Leadership Team Section */}
        <section>
          <IndustrialCard 
            variant="technical" 
            title="TECHNICAL LEADERSHIP PERSONNEL"
            className="mb-8"
            serialNumber="TEAM-2024-LDB"
          >
            <div className="space-y-6">
              <p className="leading-relaxed">
                Our technical leadership team represents over 150 years of combined experience 
                in advanced aerospace systems, precision manufacturing, and quality assurance. 
                Each team member holds advanced degrees from prestigious institutions and 
                maintains current certifications in their respective fields of expertise.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {teamMembers.map((member, index) => (
                  <IndustrialCard
                    key={index}
                    variant="standard"
                    className="bg-steel-800 border-steel-600"
                    hoverable
                  >
                    <div className="space-y-4">
                      <div className="border-b border-steel-600 pb-4">
                        <h4 className="text-lg font-bold text-amber-400">
                          {member.name}
                        </h4>
                        <p className="text-tech-blue-400 font-semibold">
                          {member.title}
                        </p>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-mono">CREDENTIALS:</span>
                          <p>{member.credentials}</p>
                        </div>
                        
                        <div>
                          <span className="font-mono">EXPERIENCE:</span>
                          <p>{member.experience}</p>
                        </div>
                        
                        <div>
                          <span className="font-mono">SPECIALTIES:</span>
                          <p>{member.specialties}</p>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-steel-600">
                        <IndustrialBadge
                          type="certification"
                          variant="tech"
                          size="sm"
                        >
                          ACTIVE SECURITY CLEARANCE
                        </IndustrialBadge>
                      </div>
                    </div>
                  </IndustrialCard>
                ))}
              </div>
            </div>
          </IndustrialCard>
        </section>

        {/* Contact and Documentation Section */}
        <section>
          <IndustrialCard 
            variant="warning" 
            title="TECHNICAL DOCUMENTATION & INQUIRIES"
            className="mb-8"
            serialNumber="DOCS-2024-LDB"
          >
            <div className="space-y-6">
              <p className="leading-relaxed">
                Technical documentation, certification reports, and detailed specifications 
                are available for qualified procurement personnel. All requests for sensitive 
                technical data require proper authorization and security clearance validation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-amber-400 font-mono">
                    AVAILABLE DOCUMENTATION
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Product Specification Data Sheets</li>
                    <li>• Military Standard Compliance Reports</li>
                    <li>• Environmental Testing Certification</li>
                    <li>• Quality Assurance Protocols</li>
                    <li>• Installation and Maintenance Manuals</li>
                    <li>• Failure Mode and Effects Analysis (FMEA)</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-amber-400 font-mono">
                    REQUEST PROCESS
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Technical documentation requests must include valid government 
                    or contractor identification, specific part numbers, and intended 
                    application details. Classified specifications require additional 
                    security protocols and non-disclosure agreements.
                  </p>
                  
                  <div className="flex flex-col space-y-3 mt-6">
                    <IndustrialButton
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      REQUEST TECHNICAL DATA PACKAGE
                    </IndustrialButton>
                    
                    <IndustrialButton
                      variant="technical"
                      size="lg"
                      className="w-full"
                    >
                      SUBMIT PROCUREMENT INQUIRY
                    </IndustrialButton>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-900/20 border border-amber-500 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-bold text-amber-400 mb-3 font-mono">
                  ⚠️ SECURITY NOTICE
                </h4>
                <p className="text-steel-200 text-sm leading-relaxed">
                  This facility operates under strict export control regulations (ITAR/EAR). 
                  All technical data and specifications are subject to government security 
                  classification. Unauthorized disclosure of technical information may result 
                  in federal prosecution under applicable statutes.
                </p>
              </div>
            </div>
          </IndustrialCard>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-steel-950 border-t-2 border-steel-600 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-steel-400 text-sm font-mono">
            LAKE DRONE BUILDERS, LLC • ESTABLISHED 1973 • ISO 9001:2015 CERTIFIED
          </p>
          <p className="text-steel-500 text-xs font-mono mt-2">
            DISTRIBUTION: UNLIMITED • CLASSIFICATION: UNCLASSIFIED
          </p>
        </div>
      </footer>
    </div>
  );
}
