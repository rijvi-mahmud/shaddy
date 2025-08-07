/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

/**
 * A type alias representing a value that can be of type T, null, or undefined.
 */
type Nullable<T> = T | null | undefined

/**
 * A custom hook that manages a stateful value with a default fallback.
 *
 * @template T - The type of the value being managed.
 * @param {T} initialValue - The initial value of the state.
 * @param {T} defaultValue - The default value to fall back to when the state is null or undefined.
 * @returns {[T, (newValue: Nullable<T>) => void]} - A tuple containing the current value and a setter function.
 */

export const useDefault = <T = any>(
  initialValue: T,
  defaultValue: T
): [T, (newValue: Nullable<T>) => void] => {
  const [value, setValue] = useState<Nullable<T>>(initialValue)

  /**
   * Sets the state to a new value or falls back to the default value if the new value is null or undefined.
   *
   * @param {Nullable<T>} newValue - The new value to set, or null/undefined to reset to the default value.
   */
  const setValueWithDefault = (newValue: Nullable<T>) => {
    setValue(newValue ?? defaultValue)
  }

  return [value, setValueWithDefault] as [T, (newValue: Nullable<T>) => void]
}
