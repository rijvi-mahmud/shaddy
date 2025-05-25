'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { useLocale } from 'next-intl'

import type { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import type { NavItemWithChildren } from '@/lib/opendocs/types/nav'

import {
  SunIcon,
  FileIcon,
  MoonIcon,
  LaptopIcon,
  CircleIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { useRouter } from '@/navigation'
import { cn } from '@/lib/utils'

import {
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandDialog,
  CommandSeparator,
} from './ui/command'

import { useDocsConfig } from '@/lib/opendocs/hooks/use-docs-config'
import { useBlogConfig } from '@/lib/opendocs/hooks/use-blog-config'
import { useTypedHooksConfig } from '@/lib/opendocs/hooks/use-typed-hooks-config'
import { getObjectValueByLocale } from '@/lib/opendocs/utils/locale'
import { allBlogs } from 'contentlayer/generated'

interface CommandMenuProps extends AlertDialogProps {
  messages: {
    docs: string
    blog: string
    hooks: string
    search: string
    noResultsFound: string
    searchDocumentation: string
    typeCommandOrSearch: string
    themes: {
      theme: string
      dark: string
      light: string
      system: string
    }
  }
}

export function CommandMenu({ messages, ...props }: CommandMenuProps) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const locale = useLocale()
  const docsConfig = useDocsConfig()
  const blogConfig = useBlogConfig()
  const hooksConfig = useTypedHooksConfig()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  // Flatten navigation items for search with group context
  const flattenNavItems = (
    items: NavItemWithChildren[],
    locale: string,
    group: string
  ) => {
    let result: { title: string; href?: string; group: string }[] = []
    items.forEach((item) => {
      if (item.href) {
        result.push({
          title: getObjectValueByLocale(item.title, locale as 'en' | 'pt'),
          href: item.href,
          group,
        })
      }
      if (item.items?.length) {
        result = result.concat(
          flattenNavItems(item.items, locale as 'en' | 'pt', group)
        )
      }
    })
    return result
  }

  // Collect all searchable items with group context
  const allSearchableItems = useMemo(() => {
    const mainNavItems = [
      ...docsConfig.docs.mainNav,
      ...blogConfig.blog.mainNav,
      ...hooksConfig.hooks.mainNav,
    ]
      .filter((navItem) => !navItem.external && navItem.href)
      .map((item) => ({
        title: getObjectValueByLocale(item.title, docsConfig.currentLocale),
        href: item.href,
        group: 'Links',
      }))

    const docsItems = docsConfig.docs.sidebarNav.flatMap((group) =>
      flattenNavItems(group.items, docsConfig.currentLocale, messages.docs)
    )

    const hooksItems = hooksConfig.hooks.sidebarNav.flatMap((group) =>
      flattenNavItems(group.items, hooksConfig.currentLocale, messages.hooks)
    )

    const blogItems = allBlogs
      .filter((post) => {
        const [postLocale] = post.slugAsParams.split('/')
        return postLocale === locale
      })
      .map((post) => {
        const [, ...slugs] = post.slugAsParams.split('/')
        const slug = slugs.join('/')
        return {
          title: post.title,
          href: `/blog/${slug}`,
          group: messages.blog,
          searchValue: `${post.title} ${post.excerpt} ${post.tags.join(' ')}`,
        }
      })

    return {
      mainNav: mainNavItems,
      docs: docsItems,
      hooks: hooksItems,
      blog: blogItems,
    }
  }, [docsConfig, blogConfig, hooksConfig, locale, messages])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'bg-card-primary text-muted-foreground relative h-8 w-full justify-start rounded-lg text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">
          {messages.searchDocumentation}...
        </span>
        <span className="inline-flex lg:hidden">{messages.search}...</span>
        <kbd className="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={`${messages.typeCommandOrSearch}...`} />
        <CommandList>
          <CommandEmpty>{messages.noResultsFound}.</CommandEmpty>

          <CommandGroup heading="Links">
            {allSearchableItems.mainNav.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
              >
                <FileIcon className="mr-2 size-4" />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1" />

          <CommandGroup heading={messages.docs}>
            {allSearchableItems.docs.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
              >
                <div className="mr-2 flex size-4 items-center justify-center">
                  <CircleIcon className="size-3" />
                </div>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1" />

          <CommandGroup heading={messages.hooks}>
            {allSearchableItems.hooks.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
              >
                <div className="mr-2 flex size-4 items-center justify-center">
                  <CircleIcon className="size-3" />
                </div>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1" />
          {/* 
          <CommandGroup heading={messages.blog}>
            {allSearchableItems.blog.map((item) => (
              <CommandItem
                key={item.href}
                value={item.searchValue || `${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
              >
                <div className="mx-1 flex size-4 items-center justify-center">
                  <FileTextIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-1 p-2 w-full">
                  <h1 className="text-lg">{item.title}</h1>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1" /> */}

          <CommandGroup heading={messages.themes.theme}>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className="mr-2 size-4" />
              {messages.themes.light}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className="mr-2 size-4" />
              {messages.themes.dark}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className="mr-2 size-4" />
              {messages.themes.system}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
