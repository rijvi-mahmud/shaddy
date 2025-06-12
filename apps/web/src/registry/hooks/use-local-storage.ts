/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

type UseLocalStorageOptions<T = any> = {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  initializeWithValue?: boolean
}

/**
 * Hook to manage a value in localStorage with optional serialization and deserialization.
 *
 * @template T - The type of the value to store.
 * @param {string} key - The key to store the value under in localStorage.
 * @param {T | (() => T)} [initialValue] - The initial value or a function to compute it.
 * @param {UseLocalStorageOptions<T>} [options] - Optional configuration for serialization, deserialization, and initialization.
 * @returns {[T, Dispatch<SetStateAction<T>>, () => void]} - The stored value, a setter function, and a remover function.
 */

export function useLocalStorage<T = any>(
  key: string,
  initialValue?: T | (() => T),
  options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options

  const readValue = useCallback((): T => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw
        ? deserializer(raw)
        : initialValue instanceof Function
          ? initialValue()
          : (initialValue as T)
    } catch {
      return initialValue instanceof Function
        ? initialValue()
        : (initialValue as T)
    }
  }, [key, initialValue, deserializer])

  const [storedValue, setStoredValue] = useState(() =>
    initializeWithValue ? readValue() : initialValue
  )

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        const newValue =
          typeof value === 'function'
            ? (value as (prevState: T) => T)(storedValue as T)
            : value
        window.localStorage.setItem(key, serializer(newValue))
        setStoredValue(newValue)
      } catch {
        console.warn(`Error setting localStorage key “${key}”`)
      }
    },
    [key, storedValue, serializer]
  )

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key)
    setStoredValue(
      initialValue instanceof Function ? initialValue() : initialValue
    )
  }, [key, initialValue])

  useEffect(() => {
    const handleStorageChange = () => setStoredValue(readValue())
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [readValue])

  // if initial value not given that means user is looking for retrieving the value
  if (initialValue === undefined || initialValue === null) {
    return [storedValue as T, setValue, removeValue]
  }

  return [storedValue as T, setValue, removeValue]
}
