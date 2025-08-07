import { cn } from '@/lib/utils'
import { FC, ReactNode } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'

type SubmitButtonProps = ButtonProps & {
  isLoading?: boolean
  disabled?: boolean
  label?: string
  loadingLabel?: string
  icon?: ReactNode
  loadingIcon?: ReactNode
  className?: string
}

/**
 * Props for the SubmitButton component.
 *
 * @typedef {Object} SubmitButtonProps
 * @property {boolean} [isLoading] - If true, shows loading state and disables the button.
 * @property {boolean} [disabled] - If true, disables the button.
 * @property {string} [label] - The label to display on the button.
 * @property {string} [loadingLabel] - The label to display when loading.
 * @property {ReactNode} [icon] - Icon to display before the label.
 * @property {ReactNode} [loadingIcon] - Icon to display when loading.
 * @property {string} [className] - Additional CSS classes for the button.
 */

/**
 * SubmitButton component for forms, supporting loading and disabled states.
 *
 * @param {SubmitButtonProps} props - The props for the SubmitButton.
 * @returns {JSX.Element} The rendered submit button.
 */

export const SubmitButton: FC<SubmitButtonProps> = ({
  isLoading = false,
  disabled = false,
  label = 'Save Changes',
  loadingLabel = 'Saving...',
  icon,
  loadingIcon,
  className,
  ...props
}) => {
  if (isLoading) {
    return (
      <Button
        className={cn('w-full gap-2', className)}
        type="submit"
        disabled
        {...props}
      >
        <span className="animate-spin">{loadingIcon}</span>
        {loadingLabel}
      </Button>
    )
  }

  return (
    <Button
      className={cn('w-full gap-2', className)}
      type="submit"
      disabled={disabled}
      {...props}
    >
      {icon}
      {label}
    </Button>
  )
}

SubmitButton.displayName = 'SubmitButton'
