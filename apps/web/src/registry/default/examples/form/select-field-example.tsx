'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'
import { SelectField } from '@/registry/default/form/fields/select-field'
import { TextField } from '@/registry/default/form/fields/text-field'

const user = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  role: z.string().min(1, { error: 'Role is required' }),
})

export type User = z.infer<typeof user>

const initialValues: User = {
  username: '',
  role: '',
}

const ROLE_OPTIONS = [
  { value: 'admin', text: 'Admin' },
  { value: 'editor', text: 'Editor' },
  { value: 'viewer', text: 'Viewer' },
]

const SelectFieldExample = () => {
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
          name="username"
          label="Username"
          placeholder="Enter your username"
        />

        <SelectField<User>
          name="role"
          label="User Role"
          placeholder="Select a role"
          options={ROLE_OPTIONS}
        />

        <SubmitButton label="Submit" />
      </div>
    </ShaddyForm>
  )
}

export default SelectFieldExample
