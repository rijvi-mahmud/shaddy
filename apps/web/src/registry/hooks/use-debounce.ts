/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

/**
 * Custom hook to debounce a value. This is useful for delaying updates to a value until after a specified delay.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds before updating the debounced value.
 * @returns {T} - The debounced value.
 *
 * @example
 * const debouncedValue = useDebounce(value, 500);
 * // This will delay the update of `debouncedValue` by 500ms after `value` changes.
 */

export const useDebounce = <T = any>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const t = setTimeout(
      () => {
        setDebouncedValue(value)
      },
      Math.max(0, delay)
    )

    return () => {
      clearTimeout(t)
    }
  }, [value, delay])

  return debouncedValue
}
