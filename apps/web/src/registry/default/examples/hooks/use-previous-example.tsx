'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePrevious } from '@/registry/default/hooks/use-previous'
import { PlusIcon, MinusIcon } from 'lucide-react'

const UsePreviousExample = () => {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  return (
    <Card className="w-full max-w-md border">
      <CardContent className="space-y-4 pt-6">
        {/* Counter Display */}
        <div className="bg-muted/30 rounded-md p-4 shadow-sm transition-all duration-200">
          <div className="flex justify-center py-3">
            <div className="text-6xl font-bold tabular-nums text-center text-primary transition-all duration-200">
              {count}
            </div>
          </div>
          <div className="text-center text-sm mt-2 py-1 bg-muted/50 rounded-md text-muted-foreground">
            Previous:{' '}
            <span className="font-medium">
              {prevCount !== undefined ? prevCount : 'N/A'}
            </span>
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
}

export default UsePreviousExample
