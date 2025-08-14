import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, Ref, useImperativeHandle } from 'react'
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { ZodType } from 'zod'

export type ShaddyFormRef<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T, any, T>
}

export type ShaddyFormProps<TSchema extends FieldValues = FieldValues> = {
  schema: ZodType<TSchema, any>
  initialValues: DefaultValues<TSchema>
  onSubmit: SubmitHandler<TSchema>
  children: ReactNode
  ref?: Ref<ShaddyFormRef<TSchema>>
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'all'
} & Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'>

/**
 * A generic form component.
 * @param schema The schema of the form.
 * @param initialValues The initial values of the form.
 * @param onSubmit The submit handler of the form.
 * @param children The children of the form.
 * @param ref The reference of the form.
 *
 * @returns The generic form component.
 */
export const ShaddyForm = <TSchema extends FieldValues = FieldValues>({
  ref,
  initialValues,
  schema,
  onSubmit,
  children,
  mode = 'onChange',
}: ShaddyFormProps<TSchema>) => {
  const form = useForm<TSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
    mode,
  })

  useImperativeHandle(ref, () => ({ form }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  )
}

ShaddyForm.displayName = 'ShaddyForm'
