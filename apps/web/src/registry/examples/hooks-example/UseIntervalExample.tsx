'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { Play, Pause, RotateCcw, Minus, Plus, Clock } from 'lucide-react'
import { useInterval } from '@/registry/hooks/use-interval'

function UseIntervalExample() {
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
      return `${(ms / 1000).toFixed(1)}s`
    }
    return `${ms}ms`
  }

  return (
    <Card className="w-full max-w-md border">
      <CardContent className="space-y-4 pt-6">
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
}

export default UseIntervalExample
