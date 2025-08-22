import { ReactNode, Children, useState, useContext, createContext } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertCircle, Check } from 'lucide-react'

// =======================
// Context & Types
// =======================

export type StepError = {
  hasError: boolean
  message?: string
}

export type StepperContextType = {
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  stepErrors: Record<number, StepError>
  setStepErrors: (errors: Record<number, StepError>) => void
}

export const StepperContext = createContext<StepperContextType | null>(null)

export const useStepperContext = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('useStepperContext must be used within a StepperProvider')
  }
  return context
}

// =======================
// Stepper Component
// =======================

type StepperProps = {
  children: React.ReactNode
  onComplete?: () => void | Promise<void>
  completeLabel?: string
}

export const Stepper = ({
  children,
  onComplete,
  completeLabel = 'Complete',
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepErrors, setStepErrors] = useState<Record<number, StepError>>({})

  const steps = Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === Step
  )
  const totalSteps = steps.length

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        stepErrors,
        setStepErrors,
      }}
    >
      <StepContent onComplete={onComplete} completeLabel={completeLabel}>
        {children}
      </StepContent>
    </StepperContext.Provider>
  )
}

Stepper.displayName = 'Stepper'

// =======================
// Step Component
// =======================

export type StepProps = {
  children: ReactNode
  validate?: () => StepError | Promise<StepError>
}

export const Step = ({ children }: StepProps) => {
  const { currentStep, stepErrors } = useStepperContext()
  const error = stepErrors[currentStep]

  return (
    <div className="p-2">
      {error?.hasError && error.message && (
        <div className="text-center mb-4">
          <p className="text-destructive text-sm">{error.message}</p>
        </div>
      )}

      {children}
    </div>
  )
}

Stepper.Step = Step

// =======================
// Step Indicator
// =======================

type StepIndicatorProps = {
  step: number
  error?: StepError
  isActive: boolean
  isCompleted: boolean
}

export const StepIndicator = ({
  step,
  error,
  isActive,
  isCompleted,
}: StepIndicatorProps) => {
  const baseClassName =
    'w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0'

  if (error?.hasError) {
    return (
      <div className={cn(baseClassName, 'border-destructive text-destructive')}>
        <AlertCircle className="w-4 h-4" aria-label="Error" />
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div
        className={cn(
          baseClassName,
          'bg-green-500 border-green-500 text-white'
        )}
      >
        <Check className="w-4 h-4" aria-label="Completed" />
      </div>
    )
  }

  if (isActive) {
    return (
      <div className={cn(baseClassName, 'border-primary text-primary')}>
        <span>{step}</span>
      </div>
    )
  }

  return (
    <div className={cn(baseClassName, 'border-muted text-muted-foreground')}>
      <span>{step}</span>
    </div>
  )
}

StepIndicator.displayName = 'StepIndicator'

// =======================
// Step Connector
// =======================

export const StepConnector = ({ isCompleted }: { isCompleted: boolean }) => (
  <div
    className={cn('h-0.5 w-full', isCompleted ? 'bg-green-500' : 'bg-muted')}
    role="separator"
  />
)

StepConnector.displayName = 'StepConnector'

// =======================
// Step Content
// =======================

type StepContentProps = {
  children: React.ReactNode
  onComplete?: () => void | Promise<void>
  completeLabel?: string
}

const StepContent = ({
  children,
  onComplete,
  completeLabel = 'Complete',
}: StepContentProps) => {
  const {
    currentStep,
    totalSteps,
    stepErrors,
    handleNext,
    handlePrevious,
    steps,
  } = useStepContent(children)

  return (
    <div
      className="flex flex-col h-full gap-4"
      role="region"
      aria-label="Step progress"
    >
      <div className="flex items-center px-8 mt-3">
        <div className="flex items-center w-full">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <StepIndicator
                step={step}
                error={stepErrors[step]}
                isActive={currentStep === step}
                isCompleted={currentStep > step}
              />
              {step < totalSteps && (
                <StepConnector
                  isCompleted={
                    currentStep > step && !stepErrors[step]?.hasError
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">{steps[currentStep - 1]}</div>

      <div className="flex justify-between py-4 border-t">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => handleNext(onComplete)}
          disabled={currentStep > totalSteps}
        >
          {currentStep === totalSteps ? completeLabel : 'Next'}
        </Button>
      </div>
    </div>
  )
}

StepContent.displayName = 'StepContent'

// =======================
// useStepContent Hook
// =======================

export const useStepContent = (children: React.ReactNode) => {
  const { currentStep, setCurrentStep, totalSteps, stepErrors, setStepErrors } =
    useStepperContext()

  const steps = Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === Step
  )

  const validateStep = async (step: number): Promise<StepError> => {
    const currentChild = steps[step - 1] as React.ReactElement<StepProps>
    if (currentChild.props.validate) {
      return await currentChild.props.validate()
    }
    return { hasError: false }
  }

  const handleNext = async (
    onComplete?: () => void | Promise<void>
  ): Promise<void> => {
    const error = await validateStep(currentStep)
    if (error.hasError) {
      setStepErrors({ [currentStep]: error })
      return
    }

    setStepErrors({ [currentStep]: { hasError: false } })

    if (currentStep === totalSteps && onComplete) {
      await onComplete()
      return
    }

    setCurrentStep(currentStep + 1)
  }

  const handlePrevious = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return {
    currentStep,
    totalSteps,
    stepErrors,
    handleNext,
    handlePrevious,
    steps,
  }
}
