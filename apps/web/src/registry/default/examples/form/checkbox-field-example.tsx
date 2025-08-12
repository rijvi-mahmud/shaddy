'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { CheckboxField } from '@/registry/default/form/fields/checkbox-field'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'

const schema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

export type FormValues = z.infer<typeof schema>

const initialValues: FormValues = {
  acceptTerms: false,
}

const CheckboxFieldExample = () => {
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
        <CheckboxField<FormValues>
          name="acceptTerms"
          label="I accept the Terms and Conditions"
          required
        />
        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default CheckboxFieldExample