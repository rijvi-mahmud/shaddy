'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'
import { TextAreaField } from '@/registry/default/form/fields/text-area-field'

const user = z.object({
  description: z.string().min(1, { error: 'Description is required' }),
})

export type User = z.infer<typeof user>

const initialValues: User = {
  description: '',
}

const TextAreaFieldExample = () => {
  return (
    <ShaddyForm
      schema={user}
      initialValues={initialValues}
      onSubmit={(data) => {
        console.log('Form submitted:', data)
      }}
    >
      <div className="space-y-4 w-72">
        <TextAreaField<User>
          name="description"
          label="Description"
          placeholder="Enter a description"
          resizable
        />

        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default TextAreaFieldExample


