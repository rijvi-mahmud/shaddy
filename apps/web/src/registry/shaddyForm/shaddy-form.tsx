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
import { z, ZodType } from 'zod'

export type ShaddyFormRef<T extends FieldValues> = {
  form: UseFormReturn<T>
}

export type ShaddyFormProps<TSchema extends ZodType> = {
  schema: TSchema
  initialValues: Partial<z.infer<TSchema>>
  onSubmit: SubmitHandler<z.infer<TSchema>>
  children: ReactNode
  //   @ts-ignore
  ref: Ref<ShaddyFormRef<z.infer<TSchema>>>
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'all'
} & React.ComponentPropsWithoutRef<'form'>

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
export const ShaddyForm = <TSchema extends ZodType>({
  ref,
  initialValues,
  schema,
  onSubmit,
  children,
  mode = 'onChange',
}: ShaddyFormProps<TSchema>) => {
  // @ts-ignore
  const form = useForm<z.infer<TSchema>>({
    defaultValues: initialValues as DefaultValues<z.infer<TSchema>>,
    // @ts-ignore
    resolver: zodResolver(schema),
    mode,
  })

  useImperativeHandle(ref, () => ({
    // @ts-ignore
    form,
  }))

  return (
    // @ts-ignore
    <Form {...form}>
      {/* @ts-ignore */}
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  )
}

ShaddyForm.displayName = 'ShaddyForm'
