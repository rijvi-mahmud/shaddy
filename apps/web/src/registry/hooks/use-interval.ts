import { useEffect, useRef } from 'react'
import { useIsomorphicEffect } from './use-isomorphic-effect'

/**
 * A custom hook that sets up an interval and executes a callback function at the specified delay.
 * It also provides a function to manually stop the interval.
 *
 * @param callback - The function to be executed at each interval.
 * @param delay - The delay in milliseconds for the interval. If `null`, the interval is paused and cleared.
 * @returns An object containing a `stop` function to manually stop the interval.
 *
 * @example
 * const { stop } = useInterval(() => {
 *   console.log("This will run every second");
 * }, 1000);
 *
 * // To pause the interval:
 * const { stop } = useInterval(() => {
 *   console.log("This will not run");
 * }, null);
 *
 * // To stop the interval manually:
 * stop();
 */

type Callback = () => void
type Delay = number | null
type UseInterval = (callback: Callback, delay: Delay) => { stop: () => void }

export const useInterval: UseInterval = (callback, delay) => {
  const savedCallback = useRef<Callback>(callback)
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  // Remember the latest callback.
  useIsomorphicEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      intervalId.current = setInterval(tick, delay)
      return () => {
        if (intervalId.current) {
          clearInterval(intervalId.current)
          intervalId.current = null
        }
      }
    }
  }, [delay])

  // Function to stop the interval manually.
  const stop = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current)
      intervalId.current = null
    }
  }

  return { stop }
}
