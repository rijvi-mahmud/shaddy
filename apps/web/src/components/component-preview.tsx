'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeModeToggle } from './theme-mode-toggle'
import { CopyButton } from './copy-button'
import { registry } from '@/registry'

interface ComponentPreviewProps {
  name: string
  className?: string
}

export function ComponentPreview({ name, className }: ComponentPreviewProps) {
  const example = registry[name]

  if (!example) {
    return <div>Example not found for "{name}"</div>
  }

  const Component = example.component
  const code = example.sourceCode

  return (
    <div className={`relative ${className}`}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            {code && (
              <TabsTrigger
                value="code"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            )}
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <ThemeModeToggle
                messages={{
                  dark: 'Dark',
                  light: 'Light',
                  system: 'System',
                }}
              />
            </div>
          </div>
          <div
            className={`preview flex min-h-[350px] w-full justify-center p-10 overflow-auto`}
          >
            <div className={`flex items-center justify-center w-full`}>
              <Component />
            </div>
          </div>
          {/* Render CodeBlock here (hidden) to precompute code highlighting */}
          {code && (
            <div style={{ display: 'none' }}>
              <CodeBlock code={code} language="tsx" theme="github-dark" />
            </div>
          )}
        </TabsContent>
        <TabsContent value="code">
          <div className="relative">
            {code && (
              <div className="relative rounded-lg border bg-card">
                <CopyButton
                  value={code}
                  className="absolute right-4 top-4 z-10 h-8 w-8 p-0 hover:bg-background"
                />
                <div className="overflow-hidden rounded-lg">
                  <CodeBlock code={code} language="tsx" theme="github-dark" />
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CodeBlockProps {
  code: string
  language: string
  theme: string
}

function CodeBlock({ code, language, theme }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!code) {
      setHtml('')
      setLoading(false)
      return
    }
    setLoading(true)
    // Dynamically import shiki only on client
    import('shiki').then(({ codeToHtml }) => {
      codeToHtml(code, { lang: language, theme: theme })
        .then((highlighted: string) => setHtml(highlighted))
        .catch((error: any) => {
          console.error('Error highlighting code:', error)
          setHtml(`<pre><code>${code}</code></pre>`)
        })
        .finally(() => setLoading(false))
    })
  }, [code, language, theme])

  if (!code) return null

  return (
    <div className="relative">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span className="text-sm">Highlighting code...</span>
          </div>
        </div>
      ) : (
        <div
          className="code-block overflow-auto text-sm [&_pre]:m-0 [&_pre]:max-h-[400px] [&_pre]:overflow-auto [&_pre]:bg-transparent [&_pre]:p-4 [&_pre]:font-mono [&_code]:break-words"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  )
}
