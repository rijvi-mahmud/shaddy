import React from 'react'
import { FieldArray } from '@/registry/default/form/field-array'
import { TextField } from '@/registry/default/form/fields/text-field'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash } from 'lucide-react'

export const FormSchema = z.object({
  items: z.array(
    z.object({
      name: z.string().min(2).max(100),
    })
  ),
})

export type FormValues = z.infer<typeof FormSchema>

const FieldArrayExample = () => {
  return (
    <ShaddyForm<FormValues>
      schema={FormSchema}
      initialValues={{ items: [{ name: '' }] }}
      onSubmit={async (values) => {
        console.log(values)
      }}
    >
      <FieldArray<FormValues> name="items">
        {({ fields, append, remove }) => (
          <div className="space-y-6">
            {/* Add Item Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed h-20 hover:border-primary hover:bg-primary/5"
              onClick={() => append({ name: '' })}
            >
              <div className="flex flex-col items-center space-y-2">
                <PlusCircle className="w-6 h-6" />
                <span>Add Item</span>
              </div>
            </Button>

            {/* Item Cards */}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded p-4 flex items-center space-x-4"
              >
                <div className="flex-1 flex items-center">
                  <TextField
                    name={`items.${index}.name`}
                    label={`Item ${index + 1}`}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center h-full">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="ml-2 text-destructive"
                    title="Remove"
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    </ShaddyForm>
  )
}

export default FieldArrayExample
