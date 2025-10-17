"use client"

interface ImageSkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
}

export function ImageSkeleton({ 
  width = "100%", 
  height = "192px", 
  className = "" 
}: ImageSkeletonProps) {
  return (
    <div 
      className={`bg-steel-700 animate-pulse rounded border border-steel-600 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-steel-500 font-mono text-xs tracking-wider">
        LOADING...
      </div>
    </div>
  )
}