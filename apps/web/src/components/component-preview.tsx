'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeModeToggle } from './theme-mode-toggle'
import { CopyButton } from './copy-button'

interface ComponentPreviewProps {
  name?: string
  component: React.ReactNode
  code: string
  className?: string
}

export function ComponentPreview({
  component,
  code,
  className,
}: ComponentPreviewProps) {
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
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {size === 'desktop' && <Monitor className="h-3.5 w-3.5" />}
                    {size === 'tablet' && <Tablet className="h-3.5 w-3.5" />}
                    {size === 'mobile' && (
                      <Smartphone className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only">Toggle size</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setSize('desktop')}>
                    <Monitor className="mr-2 h-4 w-4" />
                    Desktop
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSize('tablet')}>
                    <Tablet className="mr-2 h-4 w-4" />
                    Tablet
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSize('mobile')}>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              {/* <Separator orientation="vertical" className="mx-2 h-4" /> */}
              <ThemeModeToggle
                messages={{
                  dark: 'dark',
                  light: 'light',
                  system: 'system',
                }}
              />
            </div>
          </div>
          <div
            className={`preview flex min-h-[350px] w-full justify-center p-10 `}
          >
            <div className={`flex items-center justify-center`}>
              {component}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Code</span>
              </div>
              <CopyButton value={code} className="h-7 w-7 p-0" />
            </div>
            {code && (
              <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                <CodeBlock code={code} language="tsx" theme="github-dark" />
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
          setHtml(`<pre>${code}</pre>`)
        })
        .finally(() => setLoading(false))
    })
  }, [code, language, theme])

  if (!code) return null

  return (
    <pre className={`${theme} text-sm`}>
      {loading ? (
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </pre>
  )
}
