'use client'

import { useState } from 'react'
import { useClipboardCopy } from '@/registry/default/hooks/use-clipboard-copy'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Clipboard, CheckCircle2, RefreshCw, ClipboardX } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const UseClipboardCopyExample = () => {
  const [inputText, setInputText] = useState('Copy this text to clipboard!')
  const { toast } = useToast()
  const [copiedText, copy, copyStatus] = useClipboardCopy()

  const handleCopy = async () => {
    const success = await copy(inputText)

    if (success) {
      toast({
        title: 'Text copied!',
        description:
          copiedText && copiedText?.length > 50
            ? `${copiedText?.substring(0, 50)}...`
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
    <Card className="mx-auto border shadow-xs transition-all duration-200">
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

export default UseClipboardCopyExample
