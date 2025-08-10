'use client'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { ShaddyForm, ShaddyFormRef } from '@/registry/default/form/shaddy-form'
import z from 'zod'
import { SelectField } from '@/registry/default/form/fields/select-field'
import { TextField } from '@/registry/default/form/fields/text-field'
import { SwitchField } from '@/registry/default/form/fields/switch-field'
import { FormEvent, useRef } from 'react'
import { SubmitHandler } from 'react-hook-form'

const user = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  role: z.string().min(1, { error: 'Role is required' }),
  isActive: z.boolean().default(false),
})

export type User = z.infer<typeof user>

const initialValues: User = {
  username: '',
  role: '',
  isActive: false,
}

const ROLE_OPTIONS = [
  { value: 'admin', text: 'Admin' },
  { value: 'editor', text: 'Editor' },
  { value: 'viewer', text: 'Viewer' },
]

const onSubmit: SubmitHandler<User> = (data) => {
  console.log('User saved:', data.isActive)
}


const SwitchFieldExample = () => {
  return (
    <ShaddyForm<User>
      schema={user}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <div className="space-y-4 w-72">
        <TextField<User>
          name="username"
          label="Username"
          placeholder="Enter username"
        />

        <SwitchField<User>
          name="isActive"
          label="Account Enabled"
        />

        <SelectField<User>
          name="role"
          label="User Role"
          placeholder="Select a role"
          options={ROLE_OPTIONS}
        />

        <SubmitButton label="Save User" />
      </div>
    </ShaddyForm>
  )
}

export default SwitchFieldExample
