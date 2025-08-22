'use client'

import { ReactNode } from 'react'
import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from 'react-hook-form'

type FieldArrayProps<T extends FieldValues> = {
  children: (field: UseFieldArrayReturn<T, ArrayPath<T>>) => ReactNode
  name: ArrayPath<T>
}

/**
 * A field array component.
 * @param children The children of the field array.
 * @param name The name of the field array.
 *
 * @returns The field array component.
 *
 * @example
 * ```tsx
 * <FieldArray name="items">
 * 	{({ fields }) =>
 * 		fields.map((field, index) => (
 * 			<TextField key={field.id} name={`items.${index}.name`} />
 * 		))
 * 	}
 * </FieldArray>
 * ```
 */

export const FieldArray = <T extends FieldValues>({
  children,
  name,
}: FieldArrayProps<T>) => {
  const { control } = useFormContext<T>()
  const fieldArray = useFieldArray({ control, name })

  return children(fieldArray)
}

FieldArray.displayName = 'FieldArray'
