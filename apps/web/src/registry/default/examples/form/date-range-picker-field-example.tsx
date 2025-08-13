'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'
import { DateRangePickerField } from '@/registry/default/form/fields/date-range-picker-field'

const schema = z.object({
  stayingDates: z.object({
    from: z.date({
      message: "A start date is required.",
    }),
    to: z.date({
      message: "An end date is required.",
    }),
  }),
})

export type FormValues = z.infer<typeof schema>

const initialValues: FormValues = {
  stayingDates: {
    from: new Date(),
    to: new Date(),
  },
}

const DateRangePickerFieldExample = () => {
  return (
    <ShaddyForm<FormValues>
      mode="onChange"
      schema={schema}
      initialValues={initialValues}
      onSubmit={(data) => {
        console.log('Form submitted:', data)
      }}
    >
      <div className="space-y-4 w-72">
        <DateRangePickerField<FormValues>
          name="stayingDates"
          label="Staying Dates"
          required
        />
        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default DateRangePickerFieldExample