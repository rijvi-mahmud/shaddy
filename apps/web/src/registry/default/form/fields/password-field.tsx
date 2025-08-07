import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type PasswordFieldProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  icon?: boolean
  showIcon?: React.ReactNode
  hideIcon?: React.ReactNode
}

/**
 * Generic password field component.
 * Validation is handled externally (e.g., with Zod).
 */
export const PasswordField = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter password',
  required = false,
  className,
  icon = true,
  showIcon = <Eye size={18} />,
  hideIcon = <EyeOff size={18} />,
}: PasswordFieldProps<T>) => {
  const { control } = useFormContext<T>()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="pr-10"
              />
              {icon && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? hideIcon : showIcon}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

PasswordField.displayName = 'PasswordField'
