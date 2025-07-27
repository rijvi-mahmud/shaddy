/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { useEventListener } from '@/registry/hooks/use-event-listener'

/**
 * Configuration options for the useLocalStorage hook.
 * @template T - The type of the value to store.
 */
type UseLocalStorageOptions<T> = {
  /** Custom serializer function to convert value to string. Defaults to JSON.stringify. */
  serializer?: (value: T) => string
  /** Custom deserializer function to convert string to value. Defaults to JSON.parse. */
  deserializer?: (value: string) => T
  /** Whether to initialize with value from localStorage on mount. Defaults to true. */
  initializeWithValue?: boolean
  /** Error handler function called when localStorage operations fail. */
  onError?: (error: Error, key: string) => void
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
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T) = undefined as T,
  options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError = (error, key) =>
      console.warn(`Error with localStorage key "${key}": ${error.message}`),
  } = options

  const isLocalStorageAvailable = useCallback((): boolean => {
    return typeof window !== 'undefined' && !!window.localStorage
  }, [])

  const getInitialValue = useCallback((): T => {
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    }
    return initialValue
  }, [initialValue])

  const readValueFromStorage = useCallback((): T => {
    if (!isLocalStorageAvailable()) {
      return getInitialValue()
    }

    try {
      const storedItem = window.localStorage.getItem(key)

      if (storedItem === null) {
        return getInitialValue()
      }

      return deserializer(storedItem)
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error('Unknown error')
      onError(errorObj, key)
      return getInitialValue()
    }
  }, [key, deserializer, onError, isLocalStorageAvailable, getInitialValue])

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValueFromStorage()
    }
    return getInitialValue()
  })

  /** Function to update localStorage and state with error handling. */
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      if (!isLocalStorageAvailable()) {
        onError(new Error('localStorage not available'), key)
        return
      }

      try {
        const newValue =
          typeof value === 'function'
            ? (value as (prev: T) => T)(storedValue)
            : value

        window.localStorage.setItem(key, serializer(newValue))
        setStoredValue(newValue)
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error('Unknown error')
        onError(errorObj, key)
      }
    },
    [key, storedValue, serializer, onError, isLocalStorageAvailable]
  )

  /** Function to remove value from localStorage and reset state to initial value. */
  const removeValue = useCallback(() => {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key)
    }

    setStoredValue(getInitialValue())
  }, [key, isLocalStorageAvailable, getInitialValue])

  /** Handle storage events from other tabs/windows when our key changes. */
  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValueFromStorage())
      }
    },
    [key, readValueFromStorage]
  )

  /** Listen for storage changes from other tabs/windows using the custom hook. */
  useEventListener(
    'storage',
    handleStorageChange,
    typeof window !== 'undefined' ? window : null
  )

  return [storedValue, setValue, removeValue]
}
