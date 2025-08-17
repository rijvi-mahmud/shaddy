import React from 'react'
import { PhoneInput } from '@/registry/default/ui/phone-input'

const PhoneInputWithCountrySelectorDemo = () => {
  const [value, setValue] = React.useState<string>('')
  return (
    <div>
      <PhoneInput
        className="h-10"
        value={value}
        onPhoneChange={(phone) => setValue(phone)}
      />
      <p className="mt-4 text-sm text-muted-foreground">
        Current Value: {value}
      </p>
    </div>
  )
}

export default PhoneInputWithCountrySelectorDemo
