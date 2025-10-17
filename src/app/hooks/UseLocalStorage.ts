"use client"
import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)
    }

    if (typeof initialValue === "function") {
      return (initialValue as () => T)()
    }
    return initialValue
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue] as [T, typeof setValue]
}

// "use client"
// import { useEffect, useState } from "react"

// export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
//   const [value, setValue] = useState<T>(() => {
//     const jsonValue = localStorage.getItem(key)
//     if (jsonValue != null) return JSON.parse(jsonValue)
//     if (typeof initialValue === "function") {
//       return (initialValue as () => T)()
//     } else {
//       return initialValue
//     }
//   })

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value))
//   }, [key, value])

//   return [value, setValue] as [typeof value, typeof setValue]
// }
