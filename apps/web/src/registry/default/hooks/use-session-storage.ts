/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { useEventListener } from '@/registry/default/hooks/use-event-listener'

type UseSessionStorageOptions<T> = {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  initializeWithValue?: boolean
  onError?: (error: Error, key: string) => void
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
export function useSessionStorage<T>(
  key: string,
  initialValue: T | (() => T) = undefined as T,
  options: UseSessionStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError = (error, key) =>
      console.warn(`Error with sessionStorage key "${key}": ${error.message}`),
  } = options

  const isSessionStorageAvailable = useCallback((): boolean => {
    return typeof window !== 'undefined' && !!window.sessionStorage
  }, [])

  const getInitialValue = useCallback((): T => {
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    }
    return initialValue
  }, [initialValue])

  const readValueFromStorage = useCallback((): T => {
    if (!isSessionStorageAvailable()) {
      return getInitialValue()
    }
    try {
      const storedItem = window.sessionStorage.getItem(key)
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
  }, [key, deserializer, onError, isSessionStorageAvailable, getInitialValue])

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValueFromStorage()
    }
    return getInitialValue()
  })

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      if (!isSessionStorageAvailable()) {
        onError(new Error('sessionStorage not available'), key)
        return
      }
      try {
        const newValue =
          typeof value === 'function'
            ? (value as (prev: T) => T)(storedValue)
            : value
        window.sessionStorage.setItem(key, serializer(newValue))
        setStoredValue(newValue)
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error('Unknown error')
        onError(errorObj, key)
      }
    },
    [key, storedValue, serializer, onError, isSessionStorageAvailable]
  )

  const removeValue = useCallback(() => {
    if (isSessionStorageAvailable()) {
      window.sessionStorage.removeItem(key)
    }
    setStoredValue(getInitialValue())
  }, [key, isSessionStorageAvailable, getInitialValue])

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValueFromStorage())
      }
    },
    [key, readValueFromStorage]
  )

  useEventListener(
    'storage',
    handleStorageChange,
    typeof window !== 'undefined' ? window : null
  )

  return [storedValue, setValue, removeValue]
}
