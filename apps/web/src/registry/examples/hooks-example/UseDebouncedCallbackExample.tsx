'use client'

import { useState, useEffect, useReducer } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useDebouncedCallback } from '@/registry/hooks/use-debounced-callback'
import { Clock, AlertTriangle, Settings } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { replaceImportPathForHook } from '@/lib/shaddy/utils/common'

/** State interface */
interface State {
  /** Input values */
  input: {
    value: string
    immediate: string
    debounced: string
  }
  /** Debounce configuration */
  config: {
    delay: number
    leading: boolean
    trailing: boolean
    maxWait: number | null
  }
  /** Status */
  status: {
    isPending: boolean
    lastUpdated: Date | null
  }
  /** UI state */
  ui: {
    activeExample: string
  }
}

/** Action types */
type Action =
  | { type: 'SET_INPUT_VALUE'; payload: string }
  | { type: 'SET_DEBOUNCED_VALUE'; payload: string }
  | { type: 'UPDATE_CONFIG'; payload: Partial<State['config']> }
  | { type: 'SET_PENDING'; payload: boolean }
  | { type: 'SET_LAST_UPDATED'; payload: Date }
  | { type: 'APPLY_EXAMPLE'; payload: string }

/** Example presets */
const EXAMPLES = {
  default: {
    title: 'Default',
    leading: false,
    trailing: true,
    maxWait: null,
    delay: 500,
  },
  leading: {
    title: 'Leading',
    leading: true,
    trailing: false,
    maxWait: null,
    delay: 500,
  },
  both: {
    title: 'Both',
    leading: true,
    trailing: true,
    maxWait: null,
    delay: 500,
  },
  maxWait: {
    title: 'Max Wait',
    leading: false,
    trailing: true,
    maxWait: 1500,
    delay: 500,
  },
  fast: {
    title: 'Fast',
    leading: false,
    trailing: true,
    maxWait: null,
    delay: 200,
  },
}

/** Initial state */
const initialState: State = {
  input: {
    value: '',
    immediate: '',
    debounced: '',
  },
  config: {
    delay: 500,
    leading: false,
    trailing: true,
    maxWait: null,
  },
  status: {
    isPending: false,
    lastUpdated: null,
  },
  ui: {
    activeExample: 'default',
  },
}

/** Reducer function */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        input: {
          ...state.input,
          value: action.payload,
          immediate: action.payload,
        },
      }
    case 'SET_DEBOUNCED_VALUE':
      return {
        ...state,
        input: {
          ...state.input,
          debounced: action.payload,
        },
      }
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      }
    case 'SET_PENDING':
      return {
        ...state,
        status: {
          ...state.status,
          isPending: action.payload,
        },
      }
    case 'SET_LAST_UPDATED':
      return {
        ...state,
        status: {
          ...state.status,
          lastUpdated: action.payload,
        },
      }
    case 'APPLY_EXAMPLE': {
      const example = EXAMPLES[action.payload as keyof typeof EXAMPLES]
      return {
        ...state,
        config: {
          delay: example.delay,
          leading: example.leading,
          trailing: example.trailing,
          maxWait: example.maxWait,
        },
        ui: {
          ...state.ui,
          activeExample: action.payload,
        },
      }
    }
    default:
      return state
  }
}

export const UseDebouncedCallbackExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { input, config, status, ui } = state

  /** Handle input change */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value })
  }

  /** Create debounced callback */
  const debouncedCallback = useDebouncedCallback(
    (value: string) => {
      dispatch({ type: 'SET_DEBOUNCED_VALUE', payload: value })
      dispatch({ type: 'SET_LAST_UPDATED', payload: new Date() })
      dispatch({ type: 'SET_PENDING', payload: false })
    },
    config.delay,
    {
      leading: config.leading,
      trailing: config.trailing,
      maxWait: config.maxWait || undefined,
    }
  )

  /** Apply example preset */
  const applyExample = (exampleKey: keyof typeof EXAMPLES) => {
    dispatch({ type: 'APPLY_EXAMPLE', payload: exampleKey })
  }

  /** Call debounced function when input changes */
  useEffect(() => {
    debouncedCallback(input.value)
    dispatch({ type: 'SET_PENDING', payload: debouncedCallback.isPending() })
  }, [input.value, debouncedCallback])

  /** Update pending status periodically */
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'SET_PENDING', payload: debouncedCallback.isPending() })
    }, 100)
    return () => clearInterval(interval)
  }, [debouncedCallback])

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-5">
          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Input Field</Label>
              <Badge
                variant="outline"
                className={`px-3 py-1 text-sm transition-colors ${
                  status.isPending
                    ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                    : 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                }`}
              >
                {status.isPending ? (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
                    Pending
                  </>
                ) : (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full bg-green-500 dark:bg-green-400" />
                    Idle
                  </>
                )}
              </Badge>
            </div>
            <Input
              value={input.value}
              onChange={handleInputChange}
              placeholder="Start typing..."
              className={`h-10 text-base ${status.isPending ? 'border-amber-300 dark:border-amber-800' : ''}`}
            />
          </div>

          {/* Quick Examples */}
          <div className="space-y-3 pt-2">
            <Label className="text-base font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Presets
            </Label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(EXAMPLES).map(([key, example]) => (
                <Button
                  key={key}
                  variant={ui.activeExample === key ? 'default' : 'outline'}
                  size="default"
                  onClick={() => applyExample(key as keyof typeof EXAMPLES)}
                  className="h-9"
                >
                  {example.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Delay</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {config.delay}ms
                </span>
              </div>
              <Slider
                value={[config.delay]}
                min={100}
                max={2000}
                step={100}
                onValueChange={(values) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { delay: values[0] },
                  })
                }
                className="py-2"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Max Wait</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {config.maxWait || 'None'}
                </span>
              </div>
              <Slider
                value={[config.maxWait || 0]}
                min={0}
                max={5000}
                step={500}
                onValueChange={(values) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { maxWait: values[0] === 0 ? null : values[0] },
                  })
                }
                className="py-2"
              />
            </div>
          </div>

          {/* Edge Options */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="leading"
                checked={config.leading}
                onCheckedChange={(checked) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { leading: checked === true },
                  })
                }
                className="h-5 w-5"
              />
              <Label htmlFor="leading" className="text-sm font-medium">
                Leading Edge
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trailing"
                checked={config.trailing}
                onCheckedChange={(checked) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { trailing: checked === true },
                  })
                }
                className="h-5 w-5"
              />
              <Label htmlFor="trailing" className="text-sm font-medium">
                Trailing Edge
              </Label>
            </div>
            <div className="flex gap-2 sm:ml-auto mt-2 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => debouncedCallback.cancel()}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  debouncedCallback.flush()
                  dispatch({ type: 'SET_PENDING', payload: false })
                }}
              >
                Flush
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 mt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <Label className="text-sm font-medium">Immediate Value</Label>
              </div>
              <div className="p-3 bg-muted/50 rounded-md text-base font-mono min-h-[48px] flex items-center">
                {input.immediate || (
                  <span className="text-muted-foreground text-sm italic">
                    Empty
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <Label className="text-sm font-medium">Debounced Value</Label>
              </div>
              <div className="p-3 bg-muted/50 rounded-md text-base font-mono min-h-[48px] flex items-center">
                {input.debounced || (
                  <span className="text-muted-foreground text-sm italic">
                    Empty
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Last Updated */}
          {status.lastUpdated && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-3 mt-2 border-t">
              <Clock className="h-4 w-4" />
              <span>
                Last update:{' '}
                {status.lastUpdated.toLocaleTimeString([], { hour12: false })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default UseDebouncedCallbackExample

UseDebouncedCallbackExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useState, useEffect, useReducer } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useDebouncedCallback } from '@/registry/hooks/use-debounced-callback'
import { Clock, AlertTriangle, Settings } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/** State interface */
interface State {
  /** Input values */
  input: {
    value: string
    immediate: string
    debounced: string
  }
  /** Debounce configuration */
  config: {
    delay: number
    leading: boolean
    trailing: boolean
    maxWait: number | null
  }
  /** Status */
  status: {
    isPending: boolean
    lastUpdated: Date | null
  }
  /** UI state */
  ui: {
    activeExample: string
  }
}

/** Action types */
type Action =
  | { type: 'SET_INPUT_VALUE'; payload: string }
  | { type: 'SET_DEBOUNCED_VALUE'; payload: string }
  | { type: 'UPDATE_CONFIG'; payload: Partial<State['config']> }
  | { type: 'SET_PENDING'; payload: boolean }
  | { type: 'SET_LAST_UPDATED'; payload: Date }
  | { type: 'APPLY_EXAMPLE'; payload: string }

/** Example presets */
const EXAMPLES = {
  default: {
    title: 'Default',
    leading: false,
    trailing: true,
    maxWait: null,
    delay: 500,
  },
  leading: {
    title: 'Leading',
    leading: true,
    trailing: false,
    maxWait: null,
    delay: 500,
  },
  both: {
    title: 'Both',
    leading: true,
    trailing: true,
    maxWait: null,
    delay: 500,
  },
  maxWait: {
    title: 'Max Wait',
    leading: false,
    trailing: true,
    maxWait: 1500,
    delay: 500,
  },
  fast: {
    title: 'Fast',
    leading: false,
    trailing: true,
    maxWait: null,
    delay: 200,
  },
}

/** Initial state */
const initialState: State = {
  input: {
    value: '',
    immediate: '',
    debounced: '',
  },
  config: {
    delay: 500,
    leading: false,
    trailing: true,
    maxWait: null,
  },
  status: {
    isPending: false,
    lastUpdated: null,
  },
  ui: {
    activeExample: 'default',
  },
}

/** Reducer function */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        input: {
          ...state.input,
          value: action.payload,
          immediate: action.payload,
        },
      }
    case 'SET_DEBOUNCED_VALUE':
      return {
        ...state,
        input: {
          ...state.input,
          debounced: action.payload,
        },
      }
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      }
    case 'SET_PENDING':
      return {
        ...state,
        status: {
          ...state.status,
          isPending: action.payload,
        },
      }
    case 'SET_LAST_UPDATED':
      return {
        ...state,
        status: {
          ...state.status,
          lastUpdated: action.payload,
        },
      }
    case 'APPLY_EXAMPLE': {
      const example = EXAMPLES[action.payload as keyof typeof EXAMPLES]
      return {
        ...state,
        config: {
          delay: example.delay,
          leading: example.leading,
          trailing: example.trailing,
          maxWait: example.maxWait,
        },
        ui: {
          ...state.ui,
          activeExample: action.payload,
        },
      }
    }
    default:
      return state
  }
}

export const UseDebouncedCallbackExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { input, config, status, ui } = state

  /** Handle input change */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value })
  }

  /** Create debounced callback */
  const debouncedCallback = useDebouncedCallback(
    (value: string) => {
      dispatch({ type: 'SET_DEBOUNCED_VALUE', payload: value })
      dispatch({ type: 'SET_LAST_UPDATED', payload: new Date() })
      dispatch({ type: 'SET_PENDING', payload: false })
    },
    config.delay,
    {
      leading: config.leading,
      trailing: config.trailing,
      maxWait: config.maxWait || undefined,
    }
  )

  /** Apply example preset */
  const applyExample = (exampleKey: keyof typeof EXAMPLES) => {
    dispatch({ type: 'APPLY_EXAMPLE', payload: exampleKey })
  }

  /** Call debounced function when input changes */
  useEffect(() => {
    debouncedCallback(input.value)
    dispatch({ type: 'SET_PENDING', payload: debouncedCallback.isPending() })
  }, [input.value, debouncedCallback])

  /** Update pending status periodically */
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'SET_PENDING', payload: debouncedCallback.isPending() })
    }, 100)
    return () => clearInterval(interval)
  }, [debouncedCallback])

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-5">
          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Input Field</Label>
              <Badge
                variant="outline"
                className={"px-3 py-1 text-sm transition-colors \${
                  status.isPending
                    ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                    : 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                }"}>
                {status.isPending ? (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
                    Pending
                  </>
                ) : (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full bg-green-500 dark:bg-green-400" />
                    Idle
                  </>
                )}
              </Badge>
            </div>
            <Input
              value={input.value}
              onChange={handleInputChange}
              placeholder="Start typing..."
              className={"h-10 text-base \${status.isPending ? 'border-amber-300 dark:border-amber-800' : ''}"}
            />
          </div>

          {/* Quick Examples */}
          <div className="space-y-3 pt-2">
            <Label className="text-base font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Presets
            </Label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(EXAMPLES).map(([key, example]) => (
                <Button
                  key={key}
                  variant={ui.activeExample === key ? 'default' : 'outline'}
                  size="default"
                  onClick={() => applyExample(key as keyof typeof EXAMPLES)}
                  className="h-9"
                >
                  {example.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Delay</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {config.delay}ms
                </span>
              </div>
              <Slider
                value={[config.delay]}
                min={100}
                max={2000}
                step={100}
                onValueChange={(values) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { delay: values[0] },
                  })
                }
                className="py-2"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Max Wait</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {config.maxWait || 'None'}
                </span>
              </div>
              <Slider
                value={[config.maxWait || 0]}
                min={0}
                max={5000}
                step={500}
                onValueChange={(values) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { maxWait: values[0] === 0 ? null : values[0] },
                  })
                }
                className="py-2"
              />
            </div>
          </div>

          {/* Edge Options */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="leading"
                checked={config.leading}
                onCheckedChange={(checked) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { leading: checked === true },
                  })
                }
                className="h-5 w-5"
              />
              <Label htmlFor="leading" className="text-sm font-medium">
                Leading Edge
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trailing"
                checked={config.trailing}
                onCheckedChange={(checked) =>
                  dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { trailing: checked === true },
                  })
                }
                className="h-5 w-5"
              />
              <Label htmlFor="trailing" className="text-sm font-medium">
                Trailing Edge
              </Label>
            </div>
            <div className="flex gap-2 sm:ml-auto mt-2 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => debouncedCallback.cancel()}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  debouncedCallback.flush()
                  dispatch({ type: 'SET_PENDING', payload: false })
                }}
              >
                Flush
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 mt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <Label className="text-sm font-medium">Immediate Value</Label>
              </div>
              <div className="p-3 bg-muted/50 rounded-md text-base font-mono min-h-[48px] flex items-center">
                {input.immediate || (
                  <span className="text-muted-foreground text-sm italic">
                    Empty
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <Label className="text-sm font-medium">Debounced Value</Label>
              </div>
              <div className="p-3 bg-muted/50 rounded-md text-base font-mono min-h-[48px] flex items-center">
                {input.debounced || (
                  <span className="text-muted-foreground text-sm italic">
                    Empty
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Last Updated */}
          {status.lastUpdated && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-3 mt-2 border-t">
              <Clock className="h-4 w-4" />
              <span>
                Last update:{' '}
                {status.lastUpdated.toLocaleTimeString([], { hour12: false })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default UseDebouncedCallbackExample
`)
