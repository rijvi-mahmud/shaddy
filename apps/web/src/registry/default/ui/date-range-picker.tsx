import { CalendarIcon } from '@radix-ui/react-icons'
import {
  addDays,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from 'date-fns'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'

import { Button, type ButtonProps } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'

// Predefined ranges
const today = new Date()
const PRESET_RANGES = [
  { label: 'Today', value: [today, today] },
  { label: 'Yesterday', value: [subDays(today, 1), subDays(today, 1)] },
  {
    label: 'This Week',
    value: [
      startOfWeek(today, { weekStartsOn: 1 }),
      endOfWeek(today, { weekStartsOn: 1 }),
    ],
  },
  {
    label: 'Last Week',
    value: [
      subDays(startOfWeek(today, { weekStartsOn: 1 }), 7),
      subDays(endOfWeek(today, { weekStartsOn: 1 }), 7),
    ],
  },
  { label: 'Last 7 Days', value: [subDays(today, 6), today] },
  {
    label: 'This Month',
    value: [startOfMonth(today), endOfMonth(today)],
  },
  {
    label: 'Last Month',
    value: [
      startOfMonth(subDays(today, today.getDate())),
      endOfMonth(subDays(today, today.getDate())),
    ],
  },
  { label: 'This Year', value: [startOfYear(today), endOfYear(today)] },
  {
    label: 'Last Year',
    value: [startOfYear(subDays(today, 365)), endOfYear(subDays(today, 365))],
  },
]

// Interface for the props
interface DateRangePickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof PopoverContent>,
    'onChange'
  > {
  /**
   * The selected date range.
   * @default undefined
   * @type DateRange
   * @example { from: new Date(), to: new Date() }
   */
  dateRange?: DateRange

  /**
   * The number of days to display in the date range picker.
   * @default undefined
   * @type number
   * @example 7
   */
  dayCount?: number

  /**
   * The placeholder text of the calendar trigger button.
   * @default "Pick a date"
   * @type string | undefined
   */
  placeholder?: string

  /**
   * The variant of the calendar trigger button.
   * @default "outline"
   * @type "default" | "outline" | "secondary" | "ghost"
   */
  triggerVariant?: Exclude<ButtonProps['variant'], 'destructive' | 'link'>

  /**
   * The size of the calendar trigger button.
   * @default "default"
   * @type "default" | "sm" | "lg"
   */
  triggerSize?: Exclude<ButtonProps['size'], 'icon'>

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  triggerClassName?: string

  /**
   * Callback when a date range is selected.
   * @default undefined
   * @type (date: { from: Date; to?: Date }) => void
   */
  onChange?: (date: { from?: Date; to?: Date }) => void

  /**
   * Whether to show internal date range presets.
   * @default true
   * @type boolean
   */
  showInternalPresets?: boolean
}

function DateRangePicker({
  dateRange,
  dayCount,
  placeholder = 'Pick a date',
  triggerVariant = 'outline',
  triggerSize = 'default',
  triggerClassName,
  onChange,
  className,
  showInternalPresets = true,
  ...props
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    let fromDay: Date | undefined
    let toDay: Date | undefined

    if (dateRange) {
      fromDay = dateRange.from
      toDay = dateRange.to
    } else if (dayCount) {
      toDay = new Date()
      fromDay = addDays(toDay, -dayCount)
    }

    return { from: fromDay, to: toDay }
  })

  // Control Popover open/close state
  const [open, setOpen] = React.useState(false)

  // Handle preset range click
  const handlePresetClick = (preset: { label: string; value: Date[] }) => {
    setDate({ from: preset.value[0], to: preset.value[1] })
    setOpen(false) // Close popover after preset selection
  }

  // Handle OK button click
  const handleOkClick = () => {
    if (date?.from && date?.to && onChange) {
      onChange({ from: date.from, to: date.to })
    }
    setOpen(false) // Close popover after selecting date range
  }

  // Handle clear date
  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.({ from: undefined, to: undefined })
    setDate(undefined) // Clear the selected date
    setOpen(true) // Ensure popover stays open to select new date
  }

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              'w-full justify-start truncate text-left font-normal relative',
              !date && 'text-muted-foreground',
              triggerClassName
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                  <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-0"
                    onClick={handleClearDate}
                  >
                    <XIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Clear date</span>
                  </div>
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', className)} {...props}>
          {showInternalPresets ? (
            <>
              <div className="flex">
                <div className="p-2">
                  <ul className="space-y-1">
                    {PRESET_RANGES.map((preset) => (
                      <li
                        key={preset.label}
                        role="button"
                        className="cursor-pointer rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handlePresetClick(preset)}
                      >
                        {preset.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  captionLayout="dropdown"
                />
              </div>
            </>
          ) : (
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              captionLayout="dropdown"
            />
          )}

          {/* OK Button: Disabled if no date range is selected */}
          <div className="flex justify-end p-2">
            <Button
              size="sm"
              onClick={handleOkClick}
              className="mt-2 w-[100px]"
              disabled={!date?.from || !date?.to}
            >
              OK
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangePicker
