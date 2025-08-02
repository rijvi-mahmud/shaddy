import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { ReactNode } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  type?: 'text' | 'email' | 'number'
  placeholder?: string
  required?: boolean
  action?: () => void
  icon?: ReactNode
  loading?: boolean
  className?: string
  inputClass?: string
  disabled?: boolean
  iconClass?: string
}

/**
 * A text field component.
 * @param name The name of the field.
 * @param label The label of the field.
 * @param type The type of the field.
 * @param placeholder The placeholder of the field.
 * @param required If the field is required.
 * @param action The action to be performed on the field.
 * @param icon The icon of the field.
 * @param loading If the field is loading.
 * @param className The class name of the
 * @param inputClass The class name of the input.
 * @param iconClass The class name of the
 * @param disabled If the field is disabled.
 *
 * @returns The text field component.
 *
 * @example
 * ```tsx
 * <TextField name="name" label="Name" />
 * ```
 */

export const TextField = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder = 'Input',
  required = false,
  action,
  icon,
  loading,
  className,
  inputClass,
  iconClass,
  disabled = false,
}: TextFieldProps<T>) => {
  const { control } = useFormContext<T>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel htmlFor={name}>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex items-center gap-2">
              <Input
                {...field}
                type={type}
                placeholder={placeholder ?? 'Enter a value'}
                className={cn(`w-full ${inputClass}`, action && 'pr-12')}
                id={name}
                disabled={disabled}
              />

              {loading && <LoadingSpinner className="absolute right-4" />}

              {action && (
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  onClick={action}
                  type="button"
                  className={cn('absolute right-0.5 top-0.5', iconClass)}
                >
                  {icon ? icon : <X className="h-4 w-4 text-red-500" />}
                </Button>
              )}

              {!action && icon && (
                <div className={cn('absolute right-2 top-3', iconClass)}>
                  {icon}
                </div>
              )}
            </div>
          </FormControl>

          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  )
}

TextField.displayName = 'TextField'
