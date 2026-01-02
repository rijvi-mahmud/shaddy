import React, { useEffect, useRef, useState } from 'react'
import { Stepper, Step } from '@/registry/default/ui/stepper'
import { ShaddyForm, ShaddyFormRef } from '@/registry/default/form/shaddy-form'
import z from 'zod'
import { TextField } from '@/registry/default/form/fields/text-field'
import { useTriggerForm } from '@/registry/default/form/use-trigger-form'
import { useFormContext } from 'react-hook-form'
import { TextAreaField } from '@/registry/default/form/fields/text-area-field'

export const FormSchema = z.object({
  name: z.string().min(2).max(100),
  age: z.coerce.number().min(0).optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(5, 'Phone number must be at least 5 digits')
    .max(15, 'Phone number caanot exceed 15 digits')
    .optional(),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .optional(),
  city: z.string().min(2, 'City must be at least 2 characters').optional(),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

export type FormValues = z.infer<typeof FormSchema>

const initialValues: FormValues = {
  name: '',
  age: undefined,
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  occupation: '',
  bio: '',
}

export const StepFormExample = () => {
  const formRef = useRef<ShaddyFormRef<FormValues>>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const triggerForm = useTriggerForm<FormValues>()

  const clickSubmit = () => {
    submitRef.current?.click()
  }

  return (
    <div className="w-full">
      <ShaddyForm<FormValues>
        ref={formRef}
        schema={FormSchema}
        initialValues={initialValues}
        onSubmit={(data) => console.log('Submitted:', data)}
        className="w-full"
      >
        <Stepper onComplete={clickSubmit} completeLabel="Submit">
          <Step
            validate={() => triggerForm(formRef.current?.form, ['name', 'age'])}
          >
            <div className="w-full space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <TextField<FormValues>
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                className="w-full"
              />
              <TextField<FormValues>
                name="age"
                label="Age"
                type="number"
                placeholder="Enter your age"
                className="w-full"
              />
            </div>
          </Step>
          <Step
            validate={() =>
              triggerForm(formRef.current?.form, ['email', 'phone'])
            }
          >
            <div className="w-full space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <TextField<FormValues>
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                className="w-full"
              />
              <TextField<FormValues>
                name="phone"
                type="number"
                label="Phone Number"
                placeholder="Enter your phone number"
                className="w-full"
              />
            </div>
          </Step>
          <Step
            validate={() =>
              triggerForm(formRef.current?.form, ['address', 'city', 'country'])
            }
          >
            <div className="w-full space-y-4">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <TextField<FormValues>
                name="address"
                label="Street Address"
                placeholder="Enter your street address"
                className="w-full"
              />
              <TextField<FormValues>
                name="city"
                label="City"
                placeholder="Enter your city"
                className="w-full"
              />
              <TextField<FormValues>
                name="country"
                label="Country"
                placeholder="Enter your country"
                className="w-full"
              />
            </div>
          </Step>
          <Step
            validate={() =>
              triggerForm(formRef.current?.form, ['occupation', 'bio'])
            }
          >
            <div className="w-full space-y-4">
              <h3 className="text-lg font-semibold">
                Professional Information
              </h3>
              <TextField<FormValues>
                name="occupation"
                label="Occupation"
                placeholder="Enter your occupation"
                className="w-full"
              />
              <TextAreaField<FormValues>
                name="bio"
                label="Bio"
                placeholder="Tell us about yourself"
                className="w-full"
              />
            </div>
          </Step>
          <Step>
            <StepFormPreview />
          </Step>
        </Stepper>
        <button type="submit" hidden ref={submitRef}>
          Submit
        </button>
      </ShaddyForm>
    </div>
  )
}

const StepFormPreview = () => {
  const { getValues } = useFormContext<FormValues>()
  const values = getValues()

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-bold">Review Your Information</h2>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Name:</span> {values.name}
          </div>
          <div>
            <span className="font-medium">Age:</span>{' '}
            {values.age || 'Not provided'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Email:</span> {values.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span>{' '}
            {values.phone || 'Not provided'}
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <span className="font-medium">Address:</span>{' '}
            {values.address || 'Not provided'}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">City:</span>{' '}
              {values.city || 'Not provided'}
            </div>
            <div>
              <span className="font-medium">Country:</span> {values.country}
            </div>
          </div>
        </div>

        <div>
          <span className="font-medium">Occupation:</span>{' '}
          {values.occupation || 'Not provided'}
        </div>

        {values.bio && (
          <div>
            <span className="font-medium">Bio:</span>
            <p className="mt-1 text-sm text-muted-foreground">{values.bio}</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        Please review your information and click Submit to finish.
      </div>
    </div>
  )
}

export default StepFormExample
