import { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from './use-debounced-callback'
import { useEventListener } from './use-event-listener'

/**
 * Custom React hook to get the current window size.
 *
 * @example
 * const Component = () => {
 *   const { width = 0, height = 0 } = useWindowResize();
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

  const debouncedSetWindowSize = useDebouncedCallback((newSize: WindowSize) => {
    setWindowSize(newSize)
  }, 200)

  const handleResize = useCallback(() => {
    const newSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    debouncedSetWindowSize(newSize)
  }, [debouncedSetWindowSize])

  /** Set initial size */
  useEffect(() => {
    if (!isServer) {
      handleResize()
    }
  }, [handleResize, isServer])

  /** Use the event listener hook to handle resize events */
  useEventListener('resize', handleResize)

  return windowSize
}
