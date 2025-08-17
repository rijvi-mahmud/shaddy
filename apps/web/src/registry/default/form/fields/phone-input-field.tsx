import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { PhoneInput } from '@/registry/default/ui/phone-input'

type Props<T extends FieldValues> = {
  name: Path<T>
  label?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

/**
 * DateField component
 *
 * @param name - The name of the field.
 * @param label - The label for the field.
 * @param required - Whether the field is required.
 * @param disabled - Whether the field is disabled.
 * @param className - The class name for the field.
 * @returns The DateField component.
 */

export const PhoneInputField = <T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  className,
}: Props<T>) => {
  const { control, formState } = useFormContext<T>()
  console.log({ formState })
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel htmlFor={name}>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <PhoneInput
              value={field.value}
              name={name}
              disabled={disabled}
              onPhoneChange={(phone) => {
                field.onChange(phone)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

PhoneInputField.displayName = 'PhoneInputField'
