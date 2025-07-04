import { UseBooleanExample } from './examples/hooks-example/UseBooleanExample'
import { ComponentType } from 'react'
import { UseDefaultExample } from './examples/hooks-example/UseDefaultExample'
import { UseClipboardCopyExample } from './examples/hooks-example/UseClipboardCopyExample'
import { UseDebounceExample } from './examples/hooks-example/UseDebounceExample'
import { UseIntervalExample } from './examples/hooks-example/UseIntervalExample'
import { UsePreviousExample } from './examples/hooks-example/UsePreviousExample'
import { UseWindowResizeExample } from './examples/hooks-example/UseWindowResizeExample'
import { UseDebouncedCallbackExample } from './examples/hooks-example/UseDebouncedCallbackExample'

type RegistryItem = {
  component: ComponentType
  sourceCode?: string
  description?: string
}

// Registry object mapping hook names to their example components
export const registryHooks: Record<string, RegistryItem> = {
  'use-boolean': {
    component: UseBooleanExample,
    description: 'A hook for managing boolean state with utility functions',
    sourceCode: `'use client'
import { useBoolean } from '@/hooks/use-boolean'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  RefreshCw,
  ToggleLeft,
} from 'lucide-react'

export const UseBooleanExample = () => {
  const [value, { setValue, toggle, setTrue, setFalse, reset, getValue }] =
    useBoolean(false)

  return (
    <Card className="mx-auto border shadow-sm transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-center flex flex-col items-center gap-3">
          <h6 className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
            Current value
          </h6>
          <div key={value.toString()}>
            <Badge
              variant={value ? 'default' : 'destructive'}
              className="px-4 py-1 text-sm font-medium"
            >
              {value ? 'true' : 'false'}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Button
            variant="outline"
            size="sm"
            onClick={setTrue}
            className="h-9 font-medium transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" /> Set True
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={setFalse}
            className="h-9 font-medium transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 flex items-center justify-center gap-2"
          >
            <XCircle className="h-4 w-4" /> Set False
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={toggle}
            className="h-9 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ToggleLeft className="h-4 w-4" /> Toggle
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="h-9 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => setValue(!getValue())}
            className="h-9 font-medium transition-colors col-span-1 sm:col-span-2 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Set Opposite
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}`,
  },
  'use-default': {
    component: UseDefaultExample,
    description: 'A hook for managing state with a default fallback value',
    sourceCode: `'use client'
    import { useState } from 'react'
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
    import { Button } from '@/components/ui/button'
    import { Badge } from '@/components/ui/badge'
    import { useDefault } from '@/registry/hooks/use-default'
    import {
      RotateCcw,
      CircleOff,
      CircleSlash,
      Plus,
      Minus,
      RefreshCw,
    } from 'lucide-react'
    
    export const UseDefaultExample = () => {
      const initialValue = 10
      const defaultValue = 0
      const [value, setValue] = useDefault(initialValue, defaultValue)
      const [customValue, setCustomValue] = useState(5)
    
      return (
        <Card className="mx-auto border shadow-sm transition-all duration-200 max-w-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-center flex flex-col justify-center items-center gap-3">
              <h6 className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
                Current value
              </h6>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setValue(value - 1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
    
                <Badge
                  variant={
                    value > 0 ? 'default' : value < 0 ? 'destructive' : 'secondary'
                  }
                  className="px-4 py-1 text-sm font-medium"
                >
                  {value}
                </Badge>
    
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setValue(value + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setValue(null)}
                className="h-9 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CircleOff className="h-4 w-4" /> Set Null
              </Button>
    
              <Button
                variant="outline"
                size="sm"
                onClick={() => setValue(undefined)}
                className="h-9 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CircleSlash className="h-4 w-4" /> Set Undefined
              </Button>
    
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setValue(initialValue)}
                className="h-9 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
    
              <Button
                variant="default"
                size="sm"
                onClick={() => setValue(customValue)}
                className="h-9 font-medium transition-colors col-span-1 sm:col-span-3 flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Set Custom Value ({customValue})
              </Button>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              <p>
                Initial: {initialValue} | Default: {defaultValue} | Custom:{' '}
                {customValue}
              </p>
              <p className="mt-1">
                Note: When setting to null or undefined, the hook automatically
                falls back to the default value ({defaultValue}).
              </p>
            </div>
          </CardContent>
        </Card>
      )
    }
    `,
  },
  'use-clipboard-copy': {
    component: UseClipboardCopyExample,
    description:
      'A hook for copying text to the clipboard with status feedback',
    sourceCode: `'use client'
    
    import { useState } from 'react'
    import { useClipboardCopy } from '@/hooks/use-clipboard-copy'
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
    import { Button } from '@/components/ui/button'
    import { Badge } from '@/components/ui/badge'
    import { Input } from '@/components/ui/input'
    import { Clipboard, CheckCircle2, RefreshCw, ClipboardX } from 'lucide-react'
    import { useToast } from '@/hooks/use-toast'
    
    export const UseClipboardCopyExample = () => {
      const [inputText, setInputText] = useState('Copy this text to clipboard!')
      const { toast } = useToast()
      const [copiedText, copy, copyStatus] = useClipboardCopy()
    
      const handleCopy = async () => {
        const success = await copy(inputText)
    
        if (success && copiedText) {
          toast({
            title: 'Text copied!',
            description:
              copiedText.length > 50
                ? \`\${copiedText.substring(0, 50)}...\`
                : copiedText,
            variant: 'default',
            duration: 1000,
          })
        } else {
          toast({
            title: 'Copy failed',
            description: 'Could not copy text to clipboard',
            variant: 'destructive',
          })
        }
      }
    
      const handleReset = () => {
        setInputText('Copy this text to clipboard!')
      }
    
      return (
        <Card className="mx-auto border shadow-sm transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-center flex flex-col items-center gap-3">
              <h6 className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
                Clipboard Copy Demo
              </h6>
              <div>
                <Badge
                  variant={
                    copyStatus === 'success'
                      ? 'default'
                      : copyStatus === 'error'
                        ? 'destructive'
                        : 'secondary'
                  }
                  className="px-4 py-1 text-sm font-medium"
                >
                  {copyStatus === 'success'
                    ? 'Copied!'
                    : copyStatus === 'error'
                      ? 'Failed!'
                      : 'Ready'}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="text-to-copy" className="text-sm font-medium">
                  Text to copy:
                </label>
                <Input
                  id="text-to-copy"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to copy..."
                  className="w-full"
                />
              </div>
    
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="default"
                  onClick={handleCopy}
                  className="h-9 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {copyStatus === 'success' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : copyStatus === 'error' ? (
                    <ClipboardX className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                  Copy to Clipboard
                </Button>
    
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="h-9 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
    `,
  },
  'use-debounce': {
    component: UseDebounceExample,
    description: 'A hook for debouncing input changes with a delay',
    sourceCode: `'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Clock, Search, Loader2, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'

export const UseDebounceExample = () => {
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [delay, setDelay] = useState(500)

  // Debounce the input value with the selected delay
  const debouncedValue = useDebounce(inputValue, delay)

  // This effect simulates an API call whenever the debounced value changes
  useEffect(() => {
    // Only search if there's a value
    if (!debouncedValue) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setIsSearching(true)
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 500))
      setResults([
        \`Result for "\${debouncedValue}" - Item 1\`,
        \`Result for "\${debouncedValue}" - Item 2\`,
        \`Result for "\${debouncedValue}" - Item 3\`,
      ])
      setIsSearching(false)
    }

    fetchResults()
  }, [debouncedValue])

  return (
    <Card className="mx-auto max-w-md w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Debounce Search</h3>
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              <Clock className="h-3 w-3 mr-1" />
              {delay}ms
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setDelay(Math.max(100, delay - 100))}
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => setDelay(delay + 100)}
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type to search..."
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs bg-muted/50 rounded-md p-2">
          <div>
            <span className="text-muted-foreground">Input:</span>
            <div className="font-medium truncate">
              {inputValue || '(empty)'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Debounced:</span>
            <div className="font-medium truncate">
              {debouncedValue || '(empty)'}
            </div>
          </div>
        </div>

        <div className="min-h-[140px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Results</span>
            {isSearching && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Searching...
              </div>
            )}
            {!isSearching && results.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {results.length} found
              </Badge>
            )}
          </div>

          {!isSearching && results.length > 0 && (
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="group relative p-3 bg-gradient-to-r from-muted/20 to-muted/10 rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground mb-1">
                        {result.split(' - ')[1] || result}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Match for "{debouncedValue}" •{' '}
                        {Math.floor(Math.random() * 100)}% relevance
                      </div>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {isSearching && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-3 bg-muted/20 rounded-lg border border-border/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-4 bg-muted rounded animate-pulse"
                        style={{ width: \`\${60 + Math.random() * 30}%\` }}
                      />
                      <div
                        className="h-3 bg-muted/60 rounded animate-pulse"
                        style={{ width: \`\${40 + Math.random() * 20}%\` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isSearching && results.length === 0 && (
            <div className="flex flex-col items-center justify-center h-24 text-center">
              {inputValue ? (
                <>
                  <Search className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <div className="text-xs text-muted-foreground">
                    No results found for "{inputValue}"
                  </div>
                  <div className="text-xs text-muted-foreground/70 mt-1">
                    Try adjusting your search terms
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-muted/30 rounded-full flex items-center justify-center mb-2">
                    <Search className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Start typing to search
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}`,
  },
  'use-interval': {
    component: UseIntervalExample,
    description: 'A hook for running a callback at specified intervals',
    sourceCode: `'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { Play, Pause, RotateCcw, Minus, Plus, Clock } from 'lucide-react'
import { useInterval } from '@/hooks/use-interval'

export function UseIntervalExample() {
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)

  // Use the custom useInterval hook
  const { start, stop, isRunning, reset } = useInterval(() => {
    setCount((prev) => prev + 1)
  }, delay)

  const handleReset = () => {
    setCount(0)
    reset()
  }

  const adjustDelay = (adjustment: number) => {
    const newDelay = Math.max(100, delay + adjustment)
    setDelay(newDelay)
  }

  const formatDelay = (ms: number) => {
    if (ms >= 1000) {
      return \`\${(ms / 1000).toFixed(1)}s\`
    }
    return \`\${ms}ms\`
  }

  return (
    <Card className="w-full max-w-md border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Interval Counter</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Counter Display */}
        <div className="bg-muted/30 rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant={isRunning ? 'default' : 'outline'}
              className="text-xs"
            >
              {isRunning ? 'Active' : 'Idle'}
            </Badge>
          </div>

          <div className="flex justify-center py-2">
            <div className="relative">
              <div className="text-5xl font-bold tabular-nums text-center text-primary">
                {count}
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={start}
            disabled={isRunning}
            size="sm"
            variant="default"
            className="flex items-center justify-center"
          >
            <Play className="w-3 h-3 mr-1.5" />
            Start
          </Button>

          <Button
            onClick={stop}
            disabled={!isRunning}
            size="sm"
            variant="destructive"
            className="flex items-center justify-center"
          >
            <Pause className="w-3 h-3 mr-1.5" />
            Stop
          </Button>

          <Button
            onClick={handleReset}
            size="sm"
            variant="outline"
            className="flex items-center justify-center"
          >
            <RotateCcw className="w-3 h-3 mr-1.5" />
            Reset
          </Button>
        </div>

        <Separator />

        {/* Interval Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Interval Speed</h3>
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              <Clock className="h-3 w-3 mr-1" />
              {formatDelay(delay)}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => adjustDelay(-100)}
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              disabled={delay <= 100}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => adjustDelay(100)}
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Presets */}
        <div className="flex justify-center gap-2 pt-1">
          {[500, 1000, 2000].map((preset) => (
            <Button
              key={preset}
              onClick={() => setDelay(preset)}
              variant={delay === preset ? 'default' : 'outline'}
              size="sm"
              className="text-xs h-7"
            >
              {formatDelay(preset)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}`,
  },
  'use-previous': {
    component: UsePreviousExample,
    description: 'A hook to get the previous value of a state or prop',
    sourceCode: `'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePrevious } from '@/hooks/use-previous'
import { PlusIcon, MinusIcon } from 'lucide-react'

export const UsePreviousExample = () => {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <Card className="w-full max-w-md border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Use Previous Example</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Counter Display */}
        <div className="bg-muted/30 rounded-md p-4 shadow-sm transition-all duration-200">
          <div className="flex justify-center py-3">
            <div className="text-6xl font-bold tabular-nums text-center text-primary transition-all duration-200">
              {count}
            </div>
          </div>
          <div className="text-center text-sm mt-2 py-1 bg-muted/50 rounded-md text-muted-foreground">
            Previous: <span className="font-medium">{prevCount !== undefined ? prevCount : 'N/A'}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setCount((c) => c - 1)} 
            size="sm"
            variant="outline"
            className="flex items-center justify-center hover:bg-destructive/10"
          >
            <MinusIcon className="h-4 w-4 mr-1" /> Decrement
          </Button>
          <Button 
            onClick={() => setCount((c) => c + 1)} 
            size="sm"
            className="flex items-center justify-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" /> Increment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}`,
  },
  'use-window-resize': {
    component: UseWindowResizeExample,
    description: 'A hook for tracking window resize events with debouncing',
    sourceCode: `'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useWindowResize } from '@/hooks/use-window-resize'
import { ArrowsUpFromLine } from 'lucide-react'

export const UseWindowResizeExample = () => {
  const { width = 0, height = 0 } = useWindowResize()

  return (
    <Card className="w-full border">
      <CardContent className="space-y-4 pt-6">
        {/* Dimensions Display */}
        <div className="bg-muted/30 rounded-md p-4 shadow-sm transition-all duration-200">
          <div className="flex justify-center items-center gap-3 py-3">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Width</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-primary transition-all duration-200">
                {width}px
              </div>
            </div>
            <div className="text-muted-foreground">×</div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Height</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-primary transition-all duration-200">
                {height}px
              </div>
            </div>
          </div>
          <div className="text-center text-xs sm:text-sm mt-2 py-2 bg-muted/50 rounded-md text-muted-foreground flex items-center justify-center">
            <ArrowsUpFromLine className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Resize your browser window to see changes
            <ArrowsUpFromLine className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
          </div>
        </div>

        {/* Responsive Info */}
        <div className="grid grid-cols-1 gap-2">
          <div className="text-xs sm:text-sm p-2 border rounded-md">
            <span className="font-medium">Viewport Size: </span>
            {width < 640
              ? 'Small (Mobile)'
              : width < 1024
                ? 'Medium (Tablet)'
                : 'Large (Desktop)'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}`,
  },
  'use-debounced-callback': {
    component: UseDebouncedCallbackExample,
    description: 'A hook for creating debounced functions that delay execution',
    sourceCode: `'use client'

import { useState, useEffect, useReducer } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useDebouncedCallback } from '@/hooks/use-debounced-callback'
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
                className={\`px-3 py-1 text-sm transition-colors \${
                  status.isPending
                    ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                    : 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                }\`}
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
              className={\`h-10 text-base \${status.isPending ? 'border-amber-300 dark:border-amber-800' : ''}\`}
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
}`,
  },
}
