import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

type UniqueTextFieldProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  type?: 'text' | 'email'
  checkFunction: (value: string) => Promise<boolean>
  debounceMs?: number
}

/**
 * Unique text field component
 *
 * @param name - The name of the field
 * @param label - The label of the field
 * @param placeholder - The placeholder of the field
 * @param required - The required status of the field
 * @param className - The class name of the field
 * @param type - The type of the field
 * @param checkFunction - The check function of the field
 * @param debounceMs - The debounce milliseconds of the field
 *
 * @returns {JSX.Element} - The unique text field component
 */

export const UniqueTextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  className,
  type = 'text',
  checkFunction,
  debounceMs = 1000,
}: UniqueTextFieldProps<T>) => {
  const { control, watch } = useFormContext<T>()
  const value = watch(name)

  const { isChecking, isAvailable } = useUniqueTextField({
    value,
    debounceMs,
    checkFunction,
  })

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
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
                type={type}
                placeholder={placeholder}
                className={cn(
                  'pr-10',
                  isAvailable &&
                    'border-green-500 focus-visible:ring-green-500',
                  isAvailable === false &&
                    'border-red-500 focus-visible:ring-red-500'
                )}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isChecking && (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                )}
                {!isChecking && isAvailable && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

UniqueTextField.displayName = 'UniqueTextField'

/**
 * Use unique text field hook
 *
 * @param value - The value of the field
 * @param debounceMs - The debounce milliseconds of the field
 * @param checkFunction - The check function of the field
 *
 * @returns {Object} - The unique text field hook
 */

const useUniqueTextField = ({
  value,
  debounceMs,
  checkFunction,
}: {
  value: string
  debounceMs: number
  checkFunction: (value: string) => Promise<boolean>
}) => {
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const debouncedValue = useDebounce(value, debounceMs)

  useEffect(() => {
    const checkAvailability = async () => {
      if (!debouncedValue) {
        setIsAvailable(null)
        return
      }

      setIsChecking(true)
      try {
        const available = await checkFunction(debouncedValue)
        setIsAvailable(available)
      } catch (error) {
        console.error('Availability check failed:', error)
        setIsAvailable(null)
      } finally {
        setIsChecking(false)
      }
    }

    checkAvailability()
  }, [debouncedValue, checkFunction])

  return {
    isChecking,
    isAvailable,
  }
}
