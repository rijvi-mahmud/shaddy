import { useState, useEffect } from 'react'
import { useDebounce } from './use-debounce' // Adjust the path to your useDebounce hook

/**
 * Custom React hook to get the current window size.
 *
 * @example
 * const Component = () => {
 *   const { width, height } = useWindowResize();
 *   return (
 *     <div>
 *       <p>Width: {width}</p>
 *       <p>Height: {height}</p>
 *     </div>
 *   );
 * };
 *
 * @returns {{ width: number | undefined, height: number | undefined }}
 * An object containing the width and height of the window.
 */

type WindowSize = {
  width: number | undefined
  height: number | undefined
}

type UseWindowResize = () => WindowSize

export const useWindowResize: UseWindowResize = () => {
  const isServer = typeof window === 'undefined'

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isServer ? undefined : window.innerWidth,
    height: isServer ? undefined : window.innerHeight,
  })

  const debouncedSetWindowSize = useDebounce((newSize: WindowSize) => {
    setWindowSize(newSize)
  }, 200) // Debounce delay (200ms)

  useEffect(() => {
    if (isServer) {
      return // Exit early if running on the server
    }

    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      debouncedSetWindowSize(newSize)
    }

    window.addEventListener('resize', handleResize)

    // Initial call to set the size
    handleResize()

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [debouncedSetWindowSize, isServer])

  return windowSize
}
