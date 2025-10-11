'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useLocalStorage } from '@/registry/default/hooks/use-local-storage'
import { Database, Settings, Trash2 } from 'lucide-react'

// Example 2: User settings with complex object
const SettingsExample = () => {
  const [settings, setSettings, removeSettings] = useLocalStorage(
    'user-settings',
    {
      theme: 'light',
      notifications: true,
      language: 'en',
      autoSave: false,
      fontSize: 14,
    }
  )

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5" />
          <h3 className="text-lg font-semibold">User Preferences</h3>
          <Badge variant="secondary" className="ml-auto">
            <Database className="h-3 w-3 mr-1" />
            Saved Locally
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="flex gap-2">
              {['light', 'dark', 'auto'].map((theme) => (
                <Button
                  key={theme}
                  onClick={() => updateSetting('theme', theme)}
                  variant={
                    settings.theme === theme ? 'default' : 'outline-solid'
                  }
                  size="sm"
                  className="capitalize"
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <div className="flex gap-2">
              {[
                { code: 'en', name: 'English' },
                { code: 'es', name: 'Spanish' },
                { code: 'fr', name: 'French' },
              ].map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => updateSetting('language', lang.code)}
                  variant={
                    settings.language === lang.code
                      ? 'default'
                      : 'outline-solid'
                  }
                  size="sm"
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="notifications">Push Notifications</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                updateSetting('notifications', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="autoSave">Auto Save</Label>
            <Switch
              id="autoSave"
              checked={settings.autoSave}
              onCheckedChange={(checked) => updateSetting('autoSave', checked)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fontSize">Font Size: {settings.fontSize}px</Label>
            <Input
              id="fontSize"
              type="range"
              min="12"
              max="20"
              value={settings.fontSize}
              onChange={(e) =>
                updateSetting('fontSize', parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded border">
          <div className="text-sm font-medium mb-2">Current Settings:</div>
          <pre className="text-xs bg-background p-2 rounded border overflow-auto">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={removeSettings} variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-1" />
            Reset All
          </Button>
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          useLocalStorage('user-settings', defaultObject)
        </code>
        <div className="mt-1 text-xs">
          Complex objects are automatically serialized/deserialized
        </div>
      </div>
    </div>
  )
}

export default SettingsExample
