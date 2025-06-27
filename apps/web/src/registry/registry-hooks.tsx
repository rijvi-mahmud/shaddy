import { UseBooleanExample } from './examples/hooks-example/UseBooleanExample'
import { ComponentType } from 'react'
import { UseDefaultExample } from './examples/hooks-example/UseDefaultExample'
import { UseClipboardCopyExample } from './examples/hooks-example/UseClipboardCopyExample'

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
}
