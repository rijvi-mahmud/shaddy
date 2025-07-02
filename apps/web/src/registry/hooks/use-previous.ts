import { useEffect, useRef } from 'react'

/**
 * Custom React hook to get the previous value of a state or prop.
 *
 * @template T - The type of the value to track.
 * @param {T} value - The current value to track.
 * @returns {T | undefined} - The previous value of the tracked state or prop.
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * useEffect(() => {
 *   console.log("Current count:", count);
 *   console.log("Previous count:", prevCount);
 * }, [count]);
 */

export const usePrevious = <T = any>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
