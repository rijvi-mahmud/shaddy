'use client'

import * as React from 'react'
import { Copy, Check, ChevronDown, FileText } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AIActionsMenuProps {
  content: string
  pageUrl: string
  className?: string
}

const AI_SERVICES = [
  {
    id: 'v0',
    name: 'v0',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="currentColor"
        fill-rule="evenodd"
        height="1em"
        style={{ flex: 'none', lineHeight: 1 }}
        viewBox="0 0 24 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <title>V0</title>
        <path
          clipRule="evenodd"
          d="M14.252 8.25h5.624c.088 0 .176.006.26.018l-5.87 5.87a1.889 1.889 0 01-.019-.265V8.25h-2.25v5.623a4.124 4.124 0 004.125 4.125h5.624v-2.25h-5.624c-.09 0-.179-.006-.265-.018l5.874-5.875a1.9 1.9 0 01.02.27v5.623H24v-5.624A4.124 4.124 0 0019.876 6h-5.624v2.25zM0 7.5v.006l7.686 9.788c.924 1.176 2.813.523 2.813-.973V7.5H8.25v6.87L2.856 7.5H0z"
        ></path>
      </svg>
    ),
    getUrl: (content: string) =>
      `https://v0.dev/chat?q=${encodeURIComponent(content)}`,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 320 320"
        {...props}
      >
        <path d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z" />
      </svg>
    ),
    getUrl: (content: string) =>
      `https://chat.openai.com/?q=${encodeURIComponent(content)}`,
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        id="Anthropic-Icon--Streamline-Svg-Logos"
        height="24"
        width="24"
        {...props}
      >
        <path
          d="m13.788825 3.932 6.43325 16.136075h3.5279L17.316725 3.932H13.788825Z"
          stroke-width="0.25"
        ></path>
        <path
          d="m6.325375 13.682775 2.20125 -5.67065 2.201275 5.67065H6.325375ZM6.68225 3.932 0.25 20.068075h3.596525l1.3155 -3.3886h6.729425l1.315275 3.3886h3.59655L10.371 3.932H6.68225Z"
          stroke-width="0.25"
        ></path>
      </svg>
    ),
    getUrl: (content: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(content)}`,
  },
] as const

export function AIActionsMenu({
  content,
  pageUrl,
  className,
}: AIActionsMenuProps) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  const handleCopyPage = React.useCallback(() => {
    navigator.clipboard.writeText(content)
    setHasCopied(true)
  }, [content])

  const handleViewAsMarkdown = React.useCallback(() => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    // Clean up the blob URL after a short delay
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }, [content])

  const handleOpenInAI = React.useCallback(
    (serviceId: string) => {
      const service = AI_SERVICES.find((s) => s.id === serviceId)
      if (service) {
        const prompt = `I'm looking at this shaddy-docs documentation: ${pageUrl}.\nHelp me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`
        window.open(service.getUrl(prompt), '_blank', 'noopener,noreferrer')
      }
    },
    [pageUrl]
  )

  return (
    <div className={cn('inline-flex items-center', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyPage}
        className="gap-1.5 text-xs font-medium h-9 rounded-r-none border-r-0 transition-all duration-200 hover:bg-muted/50"
      >
        {hasCopied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        Copy Page
      </Button>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2 rounded-l-none transition-all duration-200 hover:bg-muted/50"
          >
            <ChevronDown
              className={cn(
                'h-3 w-3 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[220px] bg-card/95 backdrop-blur-xl border-2 border-border shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
        >
          <DropdownMenuItem
            onClick={handleViewAsMarkdown}
            className="cursor-pointer focus:bg-muted/80"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>View as Markdown</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {AI_SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <DropdownMenuItem
                key={service.id}
                onClick={() => handleOpenInAI(service.id)}
                className="cursor-pointer focus:bg-muted/80"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>Open in {service.name}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
