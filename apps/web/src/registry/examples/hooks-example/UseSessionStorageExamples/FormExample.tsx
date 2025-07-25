'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSessionStorage } from '@/registry/hooks/use-session-storage'
import { Save, Trash2 } from 'lucide-react'
import { useState } from 'react'

// Example 3: Temporary note draft
export const FormExample = () => {
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
