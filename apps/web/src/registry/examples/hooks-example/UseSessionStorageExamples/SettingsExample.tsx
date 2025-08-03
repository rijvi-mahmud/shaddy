'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useSessionStorage } from '@/registry/hooks/use-session-storage'
import { Save, Settings, Trash2 } from 'lucide-react'

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

export default SettingsExample
