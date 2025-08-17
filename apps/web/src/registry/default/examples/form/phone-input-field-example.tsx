import { isValidPhoneNumber } from 'libphonenumber-js'
import React from 'react'
import z from 'zod'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import { PhoneInputField } from '@/registry/default/form/fields/phone-input-field'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
export const phoneSchema = z.object({
  phone: z.string().refine((value) => {
    try {
      return isValidPhoneNumber(value)
    } catch {
      return false
    }
  }, 'Invalid phone number'),
})

export type PhoneSchemaType = z.infer<typeof phoneSchema>
const PhoneInputExample = () => {
  return (
    <ShaddyForm<PhoneSchemaType>
      schema={phoneSchema}
      initialValues={{
        phone: '',
      }}
      onSubmit={(data) => {
        alert(JSON.stringify(data))
      }}
    >
      <div className="space-y-4">
        <PhoneInputField<PhoneSchemaType>
          name="phone"
          label="Phone Number"
          required
        />
        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default PhoneInputExample
