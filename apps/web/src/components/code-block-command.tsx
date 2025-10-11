'use client'

import * as React from 'react'
import { CheckIcon, ClipboardIcon } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<'pre'> & any) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const [packageManager, setPackageManager] = React.useState<
    'pnpm' | 'npm' | 'yarn' | 'bun'
  >('pnpm')
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpmCommand__,
      npm: __npmCommand__,
      yarn: __yarnCommand__,
      bun: __bunCommand__,
    }
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]
    if (!command) {
      return
    }

    navigator.clipboard
      .writeText(command)
      .then(() => setHasCopied(true))
      .catch(() => {
        // Handle the case where the copy failed, e.g., show an error toast
        console.error('Failed to copy command to clipboard')
      })
  }, [packageManager, tabs])

  return (
    <div className="relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setPackageManager(value as 'pnpm' | 'npm' | 'yarn' | 'bun')
        }}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
          <TabsList className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
            {Object.entries(tabs).map(([key, value]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
                >
                  {key}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent key={key} value={key} className="mt-0">
                <pre className="py-5">
                  <code
                    className="relative font-mono text-sm leading-none px-4"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2.5 top-2 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
      </Button>
    </div>
  )
}
