'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocalStorage } from '@/registry/default/hooks/use-local-storage'
import { Trash2 } from 'lucide-react'

// Example 1: Basic counter with localStorage persistence
const BasicExample = () => {
  const [count, setCount, removeCount] = useLocalStorage('counter', 0)
  const [name, setName, removeName] = useLocalStorage('user-name', '')

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="text-center mb-4">
          <div className="text-sm text-muted-foreground mb-1">
            Persistent Counter
          </div>
          <div className="text-4xl font-bold text-primary mb-2">{count}</div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setCount(count + 1)} size="sm">
              Increment
            </Button>
            <Button
              onClick={() => setCount(count - 1)}
              variant="outline"
              size="sm"
            >
              Decrement
            </Button>
            <Button onClick={() => setCount(0)} variant="secondary" size="sm">
              Reset
            </Button>
            <Button onClick={removeCount} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Your Name (persisted)</Label>
          <div className="flex gap-2">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="flex-1"
            />
            <Button onClick={removeName} variant="outline" size="sm">
              Clear
            </Button>
          </div>
          {name && (
            <div className="text-sm text-muted-foreground">
              Hello, <span className="font-medium">{name}</span>! 👋
            </div>
          )}
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          const [value, setValue, removeValue] = useLocalStorage(key,
          initialValue)
        </code>
        <div className="mt-1 text-xs">
          Refresh the page to see values persist across sessions
        </div>
      </div>
    </div>
  )
}

export default BasicExample
