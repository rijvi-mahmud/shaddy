import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
  /**
   * fade effect on the content left and right
   * @default false
   */
  fade?: boolean
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  fade = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-(--gap)',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        fade && 'relative',
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around gap-(--gap)', {
              'animate-marquee flex-row': !vertical,
              'animate-marquee-vertical flex-col': vertical,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
              '[animation-direction:reverse]': reverse,
            })}
          >
            {children}
          </div>
        ))}
      {fade && (
        <>
          <div
            className={cn('pointer-events-none absolute z-10', {
              'left-0 top-0 h-full w-1/3 bg-linear-to-r from-background to-transparent':
                !vertical,
              'top-0 left-0 w-full h-1/3 bg-linear-to-b from-background to-transparent':
                vertical,
            })}
          />
          <div
            className={cn('pointer-events-none absolute z-10', {
              'right-0 top-0 h-full w-1/3 bg-linear-to-l from-background to-transparent':
                !vertical,
              'bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-background to-transparent':
                vertical,
            })}
          />
        </>
      )}
    </div>
  )
}
