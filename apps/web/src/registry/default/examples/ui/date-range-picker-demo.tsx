import React, { useState } from 'react'
import DateRangePicker  from '@/registry/default/ui/date-range-picker'
import { DateRange } from 'react-day-picker'

const DateRangePickerDemo = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: new Date(), to: new Date() })

  return (
    <DateRangePicker
      dateRange={dateRange}
      onChange={(range) => setDateRange({
        from: range.from || new Date(),
        to: range.to || new Date(),
      })}
    />
  )
}

export default DateRangePickerDemo