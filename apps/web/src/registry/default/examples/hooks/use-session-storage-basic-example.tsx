'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSessionStorage } from '@/registry/default/hooks/use-session-storage'
import { Trash2 } from 'lucide-react'

// Example 1: Session-based interaction counter
const BasicExample = () => {
  const [clickCount, setClickCount, removeClickCount] = useSessionStorage(
    'session-clicks',
    0
  )
  const [nickname, setNickname, removeNickname] = useSessionStorage(
    'session-nickname',
    ''
  )

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-xs">
        <div className="text-center mb-4">
          <div className="text-sm text-muted-foreground mb-1">
            Session Interaction Counter
          </div>
          <div className="text-4xl font-bold text-primary mb-2">
            {clickCount}
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setClickCount(clickCount + 1)} size="sm">
              Register Click
            </Button>
            <Button
              onClick={() => setClickCount(0)}
              variant="secondary"
              size="sm"
            >
              Reset
            </Button>
            <Button onClick={removeClickCount} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nickname">Session Nickname</Label>
          <div className="flex gap-2">
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter temporary nickname..."
              className="flex-1"
            />
            <Button onClick={removeNickname} variant="outline" size="sm">
              Clear
            </Button>
          </div>
          {nickname && (
            <div className="text-sm text-muted-foreground">
              Current nickname: <span className="font-medium">{nickname}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          const [value, setValue, removeValue] = useSessionStorage(key,
          initialValue)
        </code>
        <div className="mt-1 text-xs">
          Tracks interactions and nickname for this session only - close tab to
          clear
        </div>
      </div>
    </div>
  )
}

export default BasicExample
