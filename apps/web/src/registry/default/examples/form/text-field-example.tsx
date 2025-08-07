'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { TextField } from '@/registry/default/form/fields/text-field'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'

const user = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  email: z.email({ error: 'Invalid email address' }),
})

export type User = z.infer<typeof user>

const initialValues: User = {
  name: '',
  email: '',
}

const TextFieldExample = () => {
  return (
    <ShaddyForm
      schema={user}
      initialValues={initialValues}
      onSubmit={(data) => {
        console.log('Form submitted:', data)
      }}
    >
      <div className="space-y-4 w-72">
        <TextField<User>
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
        <TextField<User>
          name="email"
          label="Email"
          required
          placeholder="Enter your email"
        />

        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default TextFieldExample
