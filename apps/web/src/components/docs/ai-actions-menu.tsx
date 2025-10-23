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
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" opacity="0.5" />
        <path
          d="M7 10L12 13L17 10M12 13V18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <text
          x="12"
          y="11"
          fontSize="8"
          fontWeight="bold"
          textAnchor="middle"
          fill="currentColor"
        >
          v0
        </text>
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
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M22.2819 9.8211C22.9528 11.3769 22.8379 13.1595 21.9667 14.6198C21.1006 16.0701 19.5916 17.0598 17.8777 17.3267C17.8777 19.4042 16.8577 21.3524 15.1438 22.5267C13.4299 23.701 11.2181 24.0179 9.18394 23.3976C7.14979 22.7773 5.50394 21.2826 4.63279 19.3343C3.76164 17.386 3.74664 15.1537 4.59194 13.1945C2.91394 12.6242 1.53979 11.3949 0.768939 9.79505C-0.00191406 8.1952 -0.171914 6.36145 0.328086 4.6652C0.828086 2.96895 1.98894 1.5527 3.54644 0.742949C5.10394 -0.0668008 6.92479 -0.211801 8.59394 0.383949C9.84979 -1.13355 11.6898 -2.0902 13.6698 -1.8902C15.6498 -1.6902 17.4248 -0.35145 18.5098 1.4152C19.5948 3.18185 19.8698 5.3552 19.2598 7.3652C20.5848 7.9352 21.6498 8.9652 22.2819 9.8211Z" />
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
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M17.2 2C16.4 2 15.6 2.4 15.2 3L3.2 21C2.8 21.6 2.8 22.4 3.2 23C3.6 23.6 4.4 24 5.2 24H19.2C20 24 20.8 23.6 21.2 23C21.6 22.4 21.6 21.6 21.2 21L9.2 3C8.8 2.4 8 2 7.2 2H17.2ZM7.6 4L19.6 22H5.6L17.6 4H7.6Z" />
        <path d="M12 8L16 16H8L12 8Z" opacity="0.5" />
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
        const prompt = `Help me understand and use this documentation:\n\nPage URL: ${pageUrl}\n\nContent:\n${content}`
        window.open(service.getUrl(prompt), '_blank', 'noopener,noreferrer')
      }
    },
    [content, pageUrl]
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
