import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const useTriggerForm = <T extends FieldValues>() => {
  const triggerForm = async (
    form: UseFormReturn<T> | null | undefined,
    paths: Path<T>[]
  ) => {
    if (!form) {
      return { hasError: true, message: 'Form is not initialized' }
    }

    const triggerResults = await form.trigger(paths)

    if (triggerResults === false) {
      return { hasError: true, message: 'Please fill in all fields' }
    }

    return { hasError: false }
  }

  return triggerForm
}
