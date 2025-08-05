'use client'
import { SubmitButton } from '@/registry/shaddyForm/fields/submit-button'
import { UniqueTextField } from '@/registry/shaddyForm/fields/unique-text-field'
import { ShaddyForm } from '@/registry/shaddyForm/shaddy-form'
import z from 'zod'

const user = z.object({
  email: z.email({ error: 'Invalid email address' }),
})

export type User = z.infer<typeof user>

const initialValues: User = {
  email: '',
}

const UniqueTextFieldExample = () => {
  return (
    <ShaddyForm
      schema={user}
      initialValues={initialValues}
      onSubmit={(data) => {
        console.log('Form submitted:', data)
      }}
      className="max-w-md"
      mode="onSubmit"
    >
      <div className="space-y-4">
        <UniqueTextField<User>
          name="email"
          label="Email"
          required
          placeholder="Enter your email"
          checkFunction={checkFunction}
        />

        <SubmitButton label="Submit" />
        <p className="text-sm text-gray-500 max-w-md">
          Valid emails <code>test@example.com</code> or{' '}
          <code>user@example.com</code>
        </p>
      </div>
    </ShaddyForm>
  )
}

export default UniqueTextFieldExample

/**
 * Mock api call unique value function
 */

const checkFunction = async (value: string): Promise<boolean> => {
  // some predefined email addresses for demonstration
  const predefinedEmails = ['test@example.com', 'user@example.com']
  // Simulate an API call to check if the value is unique
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demonstration, let's assume all emails in the predefined list are not unique
      resolve(predefinedEmails.includes(value))
    }, 1000)
  })
}
