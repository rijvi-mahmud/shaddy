import { cn } from '@/lib/utils'
import { FC } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'

type SubmitButtonProps = ButtonProps & {
  isLoading?: boolean
  disabled?: boolean
  label?: string
  loadingLabel?: string
  width?: 'full' | 'auto'
  loadingIconClass?: string
}

/**
 * SubmitButton component
 *
 * @param {boolean} isLoading - Whether the button is loading
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} label - The label of the button
 * @param {string} loadingLabel - The loading label of the button
 * @param {'full' | 'auto'} width - The width of the button
 * @param {string} loadingIconClass - The loading icon class of the button
 *
 * @returns {ReactElement} - The submit button component
 */

export const SubmitButton: FC<SubmitButtonProps> = ({
  isLoading = false,
  disabled = false,
  label = 'Save Changes',
  loadingLabel = 'Saving...',
  width = 'full',
  ...props
}) => {
  return (
    <Button
      className={cn('w-full', width === 'auto' && 'w-auto')}
      type="submit"
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <>{loadingLabel}</> : <>{label}</>}
    </Button>
  )
}

SubmitButton.displayName = 'SubmitButton'
