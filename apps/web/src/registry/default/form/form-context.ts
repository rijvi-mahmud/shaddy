/** eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react'
import { Control, FieldValues } from 'react-hook-form'

export type ShaddyFormContext<TFormValues extends FieldValues = any> = {
  control: Control<TFormValues>
}

export const ShaddyFormContext = createContext<null | ShaddyFormContext>(null)

/**
 * A hook to use the form context.
 * @returns The form context.
 */

export const useShaddyFormContext = <
  TFormValues extends FieldValues = any,
>() => {
  const context = useContext(ShaddyFormContext)
  if (!context) {
    throw new Error('Form fields must be used within a SmartForm.')
  }
  return context as ShaddyFormContext<TFormValues>
}
