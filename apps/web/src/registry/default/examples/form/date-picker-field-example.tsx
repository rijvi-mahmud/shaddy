'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { DatePickerField } from '@/registry/default/form/fields/date-picker-field'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'

const schema = z.object({
  dob: z.date({
    message: "A date of birth is required.",
  }),
})

export type FormValues = z.infer<typeof schema>

const initialValues: FormValues = {
  dob: new Date(),
}

const DatePickerFieldExample = () => {
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
        <DatePickerField<FormValues>
          name="dob"
          label="Date of Birth"
          required
        />
        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default DatePickerFieldExample