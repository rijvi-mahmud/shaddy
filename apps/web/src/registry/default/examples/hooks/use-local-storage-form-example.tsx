'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLocalStorage } from '@/registry/default/hooks/use-local-storage'
import { Save, Trash2 } from 'lucide-react'
import { useState } from 'react'

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
      <div className="bg-muted/30 rounded-md p-4 shadow-xs">
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

export default FormExample
