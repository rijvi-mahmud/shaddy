'use client'
import { useBoolean } from '@/registry/hooks/use-boolean'
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
            title="Same as toggle but using setValue and getValue methods"
          >
            <RefreshCw className="h-4 w-4" /> Set Opposite (Alternative)
          </Button>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Note: "Toggle" and "Set Opposite" perform the same action but use
          different hook methods.
        </div>
      </CardContent>
    </Card>
  )
}
