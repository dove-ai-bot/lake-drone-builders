export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-steel-900">
      {/* Industrial loading skeleton */}
      <div className="text-center space-y-6">
        {/* Mechanical spinner */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-steel-600 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-2 border-steel-500 border-r-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
        </div>
        
        {/* Technical readout */}
        <div className="space-y-2">
          <div className="font-mono text-cyan-400 text-sm tracking-wider animate-pulse">
            INITIALIZING SYSTEMS...
          </div>
          <div className="font-technical text-steel-400 text-xs">
            Loading mission-critical components
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="w-64 h-1 bg-steel-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
