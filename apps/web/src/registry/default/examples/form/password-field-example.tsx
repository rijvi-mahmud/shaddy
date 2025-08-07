'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { PasswordField } from '@/registry/default/form/fields/password-field'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'

const user = z.object({
  password: z
    .string()
    .min(6, { error: 'Password must be at least 6 characters' }),
})

export type User = z.infer<typeof user>

const initialValues: User = {
  password: '',
}

const PasswordFieldExample = () => {
  return (
    <ShaddyForm
      mode="onChange"
      schema={user}
      initialValues={initialValues}
      onSubmit={(data) => {
        console.log('Form submitted:', data)
      }}
    >
      <div className="space-y-4 w-72">
        <PasswordField<User>
          name="password"
          label="Password"
          required
          placeholder="Enter your password"
        />
        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default PasswordFieldExample
