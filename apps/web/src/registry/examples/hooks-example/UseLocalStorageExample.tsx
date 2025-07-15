'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useLocalStorage } from '@/registry/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Trash2, RefreshCw, Save, Database, Settings } from 'lucide-react'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { replaceImportPathForHook } from '@/lib/shaddy/utils/common'

export const UseLocalStorageExample = () => {
  return (
    <Card className="w-full border">
      <CardContent className="pt-6">
        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic Usage</TabsTrigger>
            <TabsTrigger value="settings">User Settings</TabsTrigger>
            <TabsTrigger value="form">Form Data</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <BasicExample />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsExample />
          </TabsContent>

          <TabsContent value="form" className="space-y-4">
            <FormExample />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <AdvancedExample />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

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
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
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
                  variant={settings.theme === theme ? 'default' : 'outline'}
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
                    settings.language === lang.code ? 'default' : 'outline'
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

// Example 3: Form data persistence
const FormExample = () => {
  type DraftForm = {
    title: string
    content: string
    category: string
    tags: string[]
    priority: string
  }

  const [formData, setFormData, removeFormData] = useLocalStorage<DraftForm>(
    'draft-form',
    {
      title: '',
      content: '',
      category: 'general',
      tags: [],
      priority: 'medium',
    }
  )

  const [newTag, setNewTag] = useState('')

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      updateField('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateField(
      'tags',
      formData.tags.filter((tag) => tag !== tagToRemove)
    )
  }

  const handleSubmit = () => {
    alert('Form submitted! (In real app, this would save to server)')
    removeFormData() // Clear draft after submission
  }

  const isEmpty =
    !formData.title && !formData.content && formData.tags.length === 0

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Draft Article</h3>
          <div className="flex items-center gap-2">
            {!isEmpty && (
              <Badge variant="outline">
                <Save className="h-3 w-3 mr-1" />
                Auto-saved
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter article title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write your article content here..."
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
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
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
            Submit Article
          </Button>
          <Button onClick={removeFormData} variant="outline" disabled={isEmpty}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear Draft
          </Button>
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          Auto-saves form data as you type - try refreshing the page!
        </code>
      </div>
    </div>
  )
}

// Example 4: Advanced usage with custom serialization
const AdvancedExample = () => {
  // Custom serialization for Date objects
  const [lastVisit, setLastVisit, removeLastVisit] = useLocalStorage(
    'last-visit',
    new Date(),
    {
      serializer: (date: Date) => date.toISOString(),
      deserializer: (dateStr: string) => new Date(dateStr),
    }
  )

  // Shopping cart with complex data
  type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    addedAt: Date
  }
  const [cart, setCart, removeCart] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  )

  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${cart.length + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      quantity: 1,
      addedAt: new Date(),
    }
    setCart([...cart, newItem])
  }

  const updateVisit = () => {
    setLastVisit(new Date())
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Advanced Features</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">Custom Date Serialization</h4>
            <div className="p-3 bg-muted/50 rounded">
              <div className="text-sm text-muted-foreground">Last Visit:</div>
              <div className="font-mono text-sm">
                {lastVisit.toLocaleString()}
              </div>
              <Button onClick={updateVisit} size="sm" className="mt-2">
                <RefreshCw className="h-4 w-4 mr-1" />
                Update Visit Time
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Shopping Cart</h4>
            <div className="p-3 bg-muted/50 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Items: {cart.length}
                </span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={addToCart} size="sm">
                  Add Item
                </Button>
                <Button
                  onClick={removeCart}
                  variant="outline"
                  size="sm"
                  disabled={cart.length === 0}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {cart.length > 0 && (
          <div className="mt-4">
            <h5 className="font-medium mb-2">Cart Contents:</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 bg-background rounded border text-sm"
                >
                  <span>{item.name}</span>
                  <span className="font-medium">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Export for Basic Example
export const UseLocalStorageBasicExample = () => {
  return <BasicExample />
}

UseLocalStorageBasicExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useLocalStorage } from '@/registry/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

export const UseLocalStorageBasicExample = () => {
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
    </div>
  )
}`)

// Export for Settings Example
export const UseLocalStorageSettingsExample = () => {
  return <SettingsExample />
}

UseLocalStorageSettingsExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useLocalStorage } from '@/registry/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Trash2, Database, Settings } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'

export const UseLocalStorageSettingsExample = () => {
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
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
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
                  variant={settings.theme === theme ? 'default' : 'outline'}
                  size="sm"
                  className="capitalize"
                >
                  {theme}
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
}`)

// Export for Form Example
export const UseLocalStorageFormExample = () => {
  return <FormExample />
}

UseLocalStorageFormExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useLocalStorage } from '@/registry/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Trash2, Save } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export const UseLocalStorageFormExample = () => {
  type DraftForm = {
    title: string
    content: string
    category: string
    tags: string[]
    priority: string
  }

  const [formData, setFormData, removeFormData] = useLocalStorage<DraftForm>(
    'draft-form',
    {
      title: '',
      content: '',
      category: 'general',
      tags: [],
      priority: 'medium',
    }
  )

  const [newTag, setNewTag] = useState('')

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      updateField('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateField(
      'tags',
      formData.tags.filter((tag) => tag !== tagToRemove)
    )
  }

  const handleSubmit = () => {
    alert('Form submitted! (In real app, this would save to server)')
    removeFormData()
  }

  const isEmpty =
    !formData.title && !formData.content && formData.tags.length === 0

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Draft Article</h3>
          <div className="flex items-center gap-2">
            {!isEmpty && (
              <Badge variant="outline">
                <Save className="h-3 w-3 mr-1" />
                Auto-saved
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter article title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write your article content here..."
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
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
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
            Submit Article
          </Button>
          <Button onClick={removeFormData} variant="outline" disabled={isEmpty}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear Draft
          </Button>
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          Auto-saves form data as you type - try refreshing the page!
        </code>
      </div>
    </div>
  )
}`)

// Export for Advanced Example
export const UseLocalStorageAdvancedExample = () => {
  return <AdvancedExample />
}

UseLocalStorageAdvancedExample.componentInString =
  replaceImportPathForHook(`'use client'

import { useLocalStorage } from '@/registry/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export const UseLocalStorageAdvancedExample = () => {
  // Custom serialization for Date objects
  const [lastVisit, setLastVisit, removeLastVisit] = useLocalStorage(
    'last-visit',
    new Date(),
    {
      serializer: (date: Date) => date.toISOString(),
      deserializer: (dateStr: string) => new Date(dateStr),
    }
  )

  // Shopping cart with complex data
  type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    addedAt: Date
  }
  const [cart, setCart, removeCart] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  )

  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      name: \`Item \${cart.length + 1}\`,
      price: Math.floor(Math.random() * 100) + 10,
      quantity: 1,
      addedAt: new Date(),
    }
    setCart([...cart, newItem])
  }

  const updateVisit = () => {
    setLastVisit(new Date())
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Advanced Features</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">Custom Date Serialization</h4>
            <div className="p-3 bg-muted/50 rounded">
              <div className="text-sm text-muted-foreground">Last Visit:</div>
              <div className="font-mono text-sm">
                {lastVisit.toLocaleString()}
              </div>
              <Button onClick={updateVisit} size="sm" className="mt-2">
                <RefreshCw className="h-4 w-4 mr-1" />
                Update Visit Time
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Shopping Cart</h4>
            <div className="p-3 bg-muted/50 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Items: {cart.length}
                </span>
                <span className="font-medium">\${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={addToCart} size="sm">
                  Add Item
                </Button>
                <Button
                  onClick={removeCart}
                  variant="outline"
                  size="sm"
                  disabled={cart.length === 0}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {cart.length > 0 && (
          <div className="mt-4">
            <h5 className="font-medium mb-2">Cart Contents:</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 bg-background rounded border text-sm"
                >
                  <span>{item.name}</span>
                  <span className="font-medium">\${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
`)
