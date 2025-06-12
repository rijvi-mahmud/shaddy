/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

type UseSessionStorageOptions<T = any> = {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  initializeWithValue?: boolean
}

/**
 * Hook to manage a value in sessionStorage with optional serialization and deserialization.
 *
 * @template T - The type of the value to store.
 * @param {string} key - The key to store the value under in sessionStorage.
 * @param {T | (() => T)} [initialValue] - The initial value or a function to compute it.
 * @param {UseSessionStorageOptions<T>} [options] - Optional configuration for serialization, deserialization, and initialization.
 * @returns {[T, Dispatch<SetStateAction<T>>, () => void]} - The stored value, a setter function, and a remover function.
 */

export function useSessionStorage<T = any>(
  key: string,
  initialValue?: T | (() => T),
  options: UseSessionStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options

  const readValue = useCallback((): T => {
    try {
      const raw = window.sessionStorage.getItem(key)
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
        window.sessionStorage.setItem(key, serializer(newValue))
        setStoredValue(newValue)
      } catch {
        console.warn(`Error setting sessionStorage key “${key}”`)
      }
    },
    [key, storedValue, serializer]
  )

  const removeValue = useCallback(() => {
    window.sessionStorage.removeItem(key)
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
