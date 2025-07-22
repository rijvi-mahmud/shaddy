'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useSessionStorage } from '@/registry/hooks/use-session-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Trash2, RefreshCw, Save, EyeOff, Settings } from 'lucide-react'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { replaceImportPathForHook } from '@/lib/shaddy/utils/common'

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
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
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

// Example 2: Session-based UI preferences
const SettingsExample = () => {
  const [uiSettings, setUiSettings, removeUiSettings] = useSessionStorage(
    'session-ui-settings',
    {
      showBanner: true,
      showTooltips: true,
      highContrast: false,
    }
  )

  const updateSetting = (key: string, value: any) => {
    setUiSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Session UI Preferences</h3>
          <Badge variant="secondary" className="ml-auto">
            <Save className="h-3 w-3 mr-1" />
            Session Saved
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="showBanner">Show Welcome Banner</Label>
            <Switch
              id="showBanner"
              checked={uiSettings.showBanner}
              onCheckedChange={(checked) =>
                updateSetting('showBanner', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="showTooltips">Show Tooltips</Label>
            <Switch
              id="showTooltips"
              checked={uiSettings.showTooltips}
              onCheckedChange={(checked) =>
                updateSetting('showTooltips', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="highContrast">High Contrast Mode</Label>
            <Switch
              id="highContrast"
              checked={uiSettings.highContrast}
              onCheckedChange={(checked) =>
                updateSetting('highContrast', checked)
              }
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded border">
          <div className="text-sm font-medium mb-2">Current UI Settings:</div>
          <pre className="text-xs bg-background p-2 rounded border overflow-auto">
            {JSON.stringify(uiSettings, null, 2)}
          </pre>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={removeUiSettings} variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-1" />
            Reset Preferences
          </Button>
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          useSessionStorage('session-ui-settings', defaultObject)
        </code>
        <div className="mt-1 text-xs">
          UI preferences persist only for this session - close tab to reset
        </div>
      </div>
    </div>
  )
}

// Example 3: Temporary note draft
const FormExample = () => {
  type NoteDraft = {
    title: string
    content: string
    tags: string[]
  }

  const [noteData, setNoteData, removeNoteData] = useSessionStorage<NoteDraft>(
    'session-note-draft',
    {
      title: '',
      content: '',
      tags: [],
    }
  )

  const [newTag, setNewTag] = useState('')

  const updateField = (field: string, value: any) => {
    setNoteData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !noteData.tags.includes(newTag.trim())) {
      updateField('tags', [...noteData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateField(
      'tags',
      noteData.tags.filter((tag) => tag !== tagToRemove)
    )
  }

  const handleSubmit = () => {
    alert('Note saved! (In a real app, this would save to a server)')
    removeNoteData()
  }

  const isEmpty =
    !noteData.title && !noteData.content && noteData.tags.length === 0

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Session Note Draft</h3>
          <div className="flex items-center gap-2">
            {!isEmpty && (
              <Badge variant="outline">
                <Save className="h-3 w-3 mr-1" />
                Session-saved
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Note Title</Label>
            <Input
              id="title"
              value={noteData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter note title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Note Content</Label>
            <Textarea
              id="content"
              value={noteData.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write your note here..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                onKeyUp={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button onClick={addTag} size="sm" disabled={!newTag.trim()}>
                Add
              </Button>
            </div>
            {noteData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {noteData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSubmit} disabled={isEmpty}>
            Save Note
          </Button>
          <Button onClick={removeNoteData} variant="outline" disabled={isEmpty}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear Draft
          </Button>
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          Auto-saves note draft in session - close tab to clear!
        </code>
      </div>
    </div>
  )
}

// Example 4: Session-based analytics tracking
const AdvancedExample = () => {
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

// Export for Basic Example
export const UseSessionStorageBasicExample = () => {
  return <BasicExample />
}

UseSessionStorageBasicExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useSessionStorage } from '@/registry/hooks/use-session-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

export const UseSessionStorageBasicExample = () => {
  const [clickCount, setClickCount, removeClickCount] = useSessionStorage('session-clicks', 0)
  const [nickname, setNickname, removeNickname] = useSessionStorage('session-nickname', '')

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="text-center mb-4">
          <div className="text-sm text-muted-foreground mb-1">
            Session Interaction Counter
          </div>
          <div className="text-4xl font-bold text-primary mb-2">{clickCount}</div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setClickCount(clickCount + 1)} size="sm">
              Register Click
            </Button>
            <Button onClick={() => setClickCount(0)} variant="secondary" size="sm">
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
    </div>
  )
}`)

// Export for Settings Example
export const UseSessionStorageSettingsExample = () => {
  return <SettingsExample />
}

UseSessionStorageSettingsExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useSessionStorage } from '@/registry/hooks/use-session-storage'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Trash2, Save, Settings } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export const UseSessionStorageSettingsExample = () => {
  const [uiSettings, setUiSettings, removeUiSettings] = useSessionStorage(
    'session-ui-settings',
    {
      showBanner: true,
      showTooltips: true,
      highContrast: false,
    }
  )

  const updateSetting = (key: string, value: any) => {
    setUiSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Session UI Preferences</h3>
          <Badge variant="secondary" className="ml-auto">
            <Save className="h-3 w-3 mr-1" />
            Session Saved
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="showBanner">Show Welcome Banner</Label>
            <Switch
              id="showBanner"
              checked={uiSettings.showBanner}
              onCheckedChange={(checked) => updateSetting('showBanner', checked)}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="showTooltips">Show Tooltips</Label>
            <Switch
              id="showTooltips"
              checked={uiSettings.showTooltips}
              onCheckedChange={(checked) => updateSetting('showTooltips', checked)}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="highContrast">High Contrast Mode</Label>
            <Switch
              id="highContrast"
              checked={uiSettings.highContrast}
              onCheckedChange={(checked) => updateSetting('highContrast', checked)}
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded border">
          <div className="text-sm font-medium mb-2">Current UI Settings:</div>
          <pre className="text-xs bg-background p-2 rounded border overflow-auto">
            {JSON.stringify(uiSettings, null, 2)}
          </pre>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={removeUiSettings} variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-1" />
            Reset Preferences
          </Button>
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          useSessionStorage('session-ui-settings', defaultObject)
        </code>
        <div className="mt-1 text-xs">
          UI preferences persist only for this session - close tab to reset
        </div>
      </div>
    </div>
  )
}`)

// Export for Form Example
export const UseSessionStorageFormExample = () => {
  return <FormExample />
}

UseSessionStorageFormExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useSessionStorage } from '@/registry/hooks/use-session-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Trash2, Save } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export const UseSessionStorageFormExample = () => {
  type NoteDraft = {
    title: string
    content: string
    tags: string[]
  }

  const [noteData, setNoteData, removeNoteData] = useSessionStorage<NoteDraft>(
    'session-note-draft',
    {
      title: '',
      content: '',
      tags: [],
    }
  )

  const [newTag, setNewTag] = useState('')

  const updateField = (field: string, value: any) => {
    setNoteData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !noteData.tags.includes(newTag.trim())) {
      updateField('tags', [...noteData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateField('tags', noteData.tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    alert('Note saved! (In a real app, this would save to a server)')
    removeNoteData()
  }

  const isEmpty = !noteData.title && !noteData.content && noteData.tags.length === 0

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Session Note Draft</h3>
          <div className="flex items-center gap-2">
            {!isEmpty && (
              <Badge variant="outline">
                <Save className="h-3 w-3 mr-1" />
                Session-saved
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Note Title</Label>
            <Input
              id="title"
              value={noteData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter note title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Note Content</Label>
            <Textarea
              id="content"
              value={noteData.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write your note here..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                onKeyUp={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button onClick={addTag} size="sm" disabled={!newTag.trim()}>
                Add
              </Button>
            </div>
            {noteData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {noteData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSubmit} disabled={isEmpty}>
            Save Note
          </Button>
          <Button onClick={removeNoteData} variant="outline" disabled={isEmpty}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear Draft
          </Button>
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          Auto-saves note draft in session - close tab to clear!
        </code>
      </div>
    </div>
  )
}`)

// Export for Advanced Example
export const UseSessionStorageAdvancedExample = () => {
  return <AdvancedExample />
}

UseSessionStorageAdvancedExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useSessionStorage } from '@/registry/hooks/use-session-storage'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export const UseSessionStorageAdvancedExample = () => {
  type AnalyticsEvent = {
    id: number
    type: string
    timestamp: Date
  }

  const [analytics, setAnalytics, removeAnalytics] = useSessionStorage<AnalyticsEvent[]>(
    'session-analytics',
    [],
    {
      serializer: (events: AnalyticsEvent[]) => JSON.stringify(events.map(event => ({
        ...event,
        timestamp: event.timestamp.toISOString()
      }))),
      deserializer: (data: string) => JSON.parse(data).map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp)
      }))
    }
  )

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
              <div className="text-sm text-muted-foreground">Total Events: {analytics.length}</div>
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
                  <span className="font-mono">{event.timestamp.toLocaleString()}</span>
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
`)
