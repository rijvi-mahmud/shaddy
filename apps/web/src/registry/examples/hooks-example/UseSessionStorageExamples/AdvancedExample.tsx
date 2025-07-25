'use client'

import { Button } from '@/components/ui/button'
import { useSessionStorage } from '@/registry/hooks/use-session-storage'

// Example 4: Session-based analytics tracking
export const AdvancedExample = () => {
  type AnalyticsEvent = {
    id: number
    type: string
    timestamp: Date
  }

  const [analytics, setAnalytics, removeAnalytics] = useSessionStorage<
    AnalyticsEvent[]
  >('session-analytics', [], {
    serializer: (events: AnalyticsEvent[]) =>
      JSON.stringify(
        events.map((event) => ({
          ...event,
          timestamp: event.timestamp.toISOString(),
        }))
      ),
    deserializer: (data: string) =>
      JSON.parse(data).map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp),
      })),
  })

  const addEvent = (type: string) => {
    const newEvent = {
      id: Date.now(),
      type,
      timestamp: new Date(),
    }
    setAnalytics([...analytics, newEvent])
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Session Analytics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">Track Session Events</h4>
            <div className="p-3 bg-muted/50 rounded">
              <div className="text-sm text-muted-foreground">
                Total Events: {analytics.length}
              </div>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => addEvent('page_view')} size="sm">
                  Log Page View
                </Button>
                <Button onClick={() => addEvent('click')} size="sm">
                  Log Click
                </Button>
                <Button
                  onClick={removeAnalytics}
                  variant="outline"
                  size="sm"
                  disabled={analytics.length === 0}
                >
                  Clear Events
                </Button>
              </div>
            </div>
          </div>
        </div>

        {analytics.length > 0 && (
          <div className="mt-4">
            <h5 className="font-medium mb-2">Session Events:</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {analytics.map((event) => (
                <div
                  key={event.id}
                  className="flex justify-between items-center p-2 bg-background rounded border text-sm"
                >
                  <span>{event.type}</span>
                  <span className="font-mono">
                    {event.timestamp.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          Tracks session events with custom serialization
        </code>
      </div>
    </div>
  )
}
