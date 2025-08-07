/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from 'react'

/**
 * Options for configuring the debounced callback behavior
 */
type DebounceOptions = {
  /**
   * Execute on the leading edge (immediately on first call)
   * - When true: The function executes immediately on the first call
   * - When false: The function waits for the full delay before executing
   * - Example: Set to true for immediate feedback on first interaction
   */
  leading?: boolean

  /**
   * Execute on the trailing edge (after delay when input stops)
   * - When true: The function executes after waiting for the delay when input stops
   * - When false: The function won't execute after the delay
   * - Default is true - this is the standard debounce behavior most people expect
   */
  trailing?: boolean

  /**
   * Maximum wait time before forcing execution
   * - Forces the function to execute after this time even if input continues
   * - Measured in milliseconds
   * - Example: Set to 2000 to ensure execution happens at least every 2 seconds
   *   during continuous input
   */
  maxWait?: number // Maximum time to wait before forcing execution
}

/**
 * Control functions for managing the debounced callback
 */
type ControlFunctions = {
  cancel: () => void // Cancel any pending executions
  flush: () => void // Immediately execute any pending callback
  isPending: () => boolean // Check if a callback execution is pending
}

/**
 * Combined type for the debounced function with attached control methods
 */
export type DebouncedFunction<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) &
  ControlFunctions

/**
 * Custom hook to debounce a callback function with enhanced control functions.
 *
 * @template T - The type of the callback function.
 * @param {T} callback - The callback function to debounce.
 * @param {number} delay - The delay in milliseconds before executing the callback.
 * @param {DebounceOptions} options - Additional debounce configuration options.
 * @returns {DebouncedFunction<T>} - The debounced callback function with control methods.
 *
 * @example
 * const handleSearch = (query: string) => {
 *   // search logic here
 *   return searchResults;
 * };
 * const debouncedSearch = useDebouncedCallback(handleSearch, 500);
 *
 * // Usage
 * debouncedSearch("search term"); // Will execute after 500ms of inactivity
 * debouncedSearch.cancel();       // Cancels any pending execution
 * debouncedSearch.flush();        // Immediately executes any pending callback
 * if (debouncedSearch.isPending()) { showLoadingIndicator(); }
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300,
  options?: DebounceOptions
): DebouncedFunction<T> => {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)
  const lastArgsRef = useRef<Parameters<T>>(undefined)
  const lastCallTimeRef = useRef<number>(0)

  /** Update callback ref when callback changes */
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  /** Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debounced = useMemo(() => {
    /**
     * Executes the callback with the most recent arguments.
     * Clears argument references and timeout after execution.
     * @returns The result of the callback function or undefined
     */
    const invokeFunc = () => {
      if (lastArgsRef.current) {
        const result = callbackRef.current(...lastArgsRef.current)
        lastArgsRef.current = undefined
        timeoutRef.current = undefined
        return result
      }
    }

    /**
     * Core debounce implementation that manages the timing of callback execution.
     * Handles both immediate (leading edge) and delayed (trailing edge) invocation.
     * @param args - Arguments to pass to the callback function
     * @returns Result from immediate execution or undefined for delayed execution
     */
    const debouncedFn = (...args: Parameters<T>): ReturnType<T> | undefined => {
      const currentTime = Date.now()
      const isInvoking = shouldInvoke(currentTime)

      // Store arguments for later execution
      lastArgsRef.current = args
      lastCallTimeRef.current = currentTime

      // Handle leading edge execution (immediate)
      if (isInvoking && options?.leading) {
        return invokeFunc()
      }

      // Reset existing timer if present
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Schedule delayed execution (trailing edge)
      timeoutRef.current = setTimeout(
        () => {
          // Execute callback if trailing edge is enabled (default behavior)
          const shouldTrail = options?.trailing !== false
          if (shouldTrail) {
            invokeFunc()
          }

          // Reset call time to prepare for next debounce cycle
          lastCallTimeRef.current = 0

          // Clear the timeout reference to indicate no pending execution
          timeoutRef.current = undefined
        },
        Math.max(0, delay)
      )
    }

    function shouldInvoke(time: number): boolean {
      const timeSinceLastCall = time - lastCallTimeRef.current

      return (
        lastCallTimeRef.current === 0 || // First call (leading edge)
        timeSinceLastCall >= delay || // Standard debounce period elapsed (trailing edge)
        (options?.maxWait !== undefined && timeSinceLastCall >= options.maxWait) // Force execution after maxWait
      )
    }

    // Attach control methods
    const controlledFn = debouncedFn as DebouncedFunction<T>

    controlledFn.cancel = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        lastArgsRef.current = undefined
        timeoutRef.current = undefined
      }
    }

    controlledFn.flush = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)

        return invokeFunc()
      }
    }

    controlledFn.isPending = () => {
      return !!timeoutRef.current
    }

    return controlledFn
  }, [delay, options?.leading, options?.trailing, options?.maxWait])

  return debounced
}
