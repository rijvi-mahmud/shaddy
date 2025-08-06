import { useCallback, useState } from 'react'

type BooleanHookReturnProps = {
  setValue: (value: boolean) => void
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
  reset: () => void
  getValue: () => boolean
}

/**
 * A custom hook that manages a boolean state.
 * @param initialValue - The initial value of the boolean state.
 * @returns An object containing:
 * - `value`: The current boolean state.
 * - `setValue`: A function to set the state to a specific value.
 * - `toggle`: A function to toggle the state between true and false.
 * - `setTrue`: A function to set the state to true.
 * - `setFalse`: A function to set the state to false.
 * - `reset`: A function to reset the state to its initial value.
 * - `getValue`: A function to retrieve the current state value.
 *
 * @example
 * const [value, { toggle, setTrue, setFalse, reset, getValue }] = useBoolean(false);
 *
 * // Usage examples:
 * toggle(); // Toggles the state
 * setTrue(); // Sets the state to true
 * setFalse(); // Sets the state to false
 * reset(); // Resets the state to the initial value
 * const currentValue = getValue(); // Retrieves the current state value
 */

type useBooleanReturnType = [boolean, BooleanHookReturnProps]
type UseBoolean = (initialValue: boolean) => useBooleanReturnType

export const useBoolean: UseBoolean = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const toggle = () => setValue((prev) => !prev)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const getValue = useCallback(() => value, [value])

  const reset = () => setValue(initialValue)

  return [value, { toggle, setTrue, setFalse, reset, getValue, setValue }]
}
