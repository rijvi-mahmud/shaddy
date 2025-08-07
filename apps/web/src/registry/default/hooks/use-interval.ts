import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * A custom hook that sets up an interval and executes a callback function at the specified delay.
 * It also provides functions to manually start/stop the interval and check if it's running.
 *
 * @param callback - The function to be executed at each interval.
 * @param delay - The delay in milliseconds for the interval. If `null`, the interval is paused and cleared.
 * @returns An object containing `stop`, `start` functions and `isRunning` state.
 *
 * @example
 * const { stop, start, isRunning } = useInterval(() => {
 *   console.log("This will run every second");
 * }, 1000);
 *
 * To pause the interval:
 * const { stop, start, isRunning } = useInterval(() => {
 *   console.log("This will not run");
 * }, null);
 *
 * To stop/start the interval manually:
 * stop(); // stops the interval
 * start(); // starts the interval again
 */

type Callback = () => void
type Delay = number | null
type UseInterval = (
  callback: Callback,
  delay: Delay,
  options?: { autoStart?: boolean }
) => {
  stop: () => void
  start: () => void
  reset: () => void
  isRunning: boolean
}

export const useInterval: UseInterval = (callback, delay, options = {}) => {
  const { autoStart = true } = options
  const savedCallback = useRef<Callback>(callback)
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  /** Reusable function to clear interval */
  const clearCurrentInterval = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current)
      intervalId.current = null
      setIsRunning(false)
    }
  }, [])

  /** Reusable function to start interval */
  const startInterval = useCallback(() => {
    if (!intervalId.current && delay !== null) {
      intervalId.current = setInterval(() => {
        savedCallback.current()
      }, delay)
      setIsRunning(true)
    }
  }, [delay])

  useEffect(() => {
    /**
     * Don't schedule if no delay is specified.
     * Note: 0 is a valid value for delay.
     */
    if (delay === null) {
      clearCurrentInterval()
      return
    }

    if (autoStart) {
      startInterval()
    }

    return clearCurrentInterval
  }, [delay, autoStart])

  /** Function to stop the interval manually. */
  const stop = clearCurrentInterval

  /** Function to start the interval manually. */
  const start = startInterval

  const reset = useCallback(() => {
    clearCurrentInterval()
    if (autoStart && delay !== null) {
      startInterval()
    }
  }, [clearCurrentInterval, startInterval, autoStart, delay])

  return {
    stop,
    start,
    reset,
    isRunning,
  }
}
