'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'
import { CheckboxGroupField } from '@/registry/default/form/fields/checkbox-group-field'

const schema = z.object({
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
})

export type FormValues = z.infer<typeof schema>

const initialValues: FormValues = {
  skills: [],
}

const CheckboxGroupFieldExample = () => {
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
        <CheckboxGroupField<FormValues>
          name="skills"
          label="Skills"
          required
          options={[
            { text: 'React', value: 'react' },
            { text: 'Vue', value: 'vue' },
            { text: 'Angular', value: 'angular' },
          ]}
        />
        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default CheckboxGroupFieldExample