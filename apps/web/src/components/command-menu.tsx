'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { useLocale } from 'next-intl'

import type { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import type { NavItemWithChildren } from '@/lib/shaddy/types/nav'

import {
  SunIcon,
  FileIcon,
  MoonIcon,
  LaptopIcon,
  CircleIcon,
  MagnifyingGlassIcon,
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

import { useDocsConfig } from '@/lib/shaddy/hooks/use-docs-config'
import { useBlogConfig } from '@/lib/shaddy/hooks/use-blog-config'
import { useTypedHooksConfig } from '@/lib/shaddy/hooks/use-typed-hooks-config'
import { useUiConfig } from '@/lib/shaddy/hooks/use-ui-config'
import { useUtilsConfig } from '@/lib/shaddy/hooks/use-utils-config'
import { getObjectValueByLocale } from '@/lib/shaddy/utils/locale'
import { allBlogs } from 'contentlayer/generated'
import { useFormConfig } from '@/lib/shaddy/hooks/use-form-config'
import { useReactPatternsConfig } from '@/lib/shaddy/hooks/use-react-patterns-config'

interface CommandMenuProps extends AlertDialogProps {
  messages: {
    docs: string
    blog: string
    hooks: string
    form: string
    ui: string
    utils: string
    reactPatterns: string
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
  // const docsConfig = useDocsConfig()
  // const blogConfig = useBlogConfig()
  const hooksConfig = useTypedHooksConfig()
  const formConfig = useFormConfig()
  const uiConfig = useUiConfig()
  const utilsConfig = useUtilsConfig()
  const reactPatternsConfig = useReactPatternsConfig()
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
      // ...docsConfig.docs.mainNav,
      // ...blogConfig.blog.mainNav,
      ...hooksConfig.hooks.mainNav,
      ...formConfig.form.mainNav,
      ...uiConfig.ui.mainNav,
      ...utilsConfig.utils.mainNav,
      ...reactPatternsConfig.reactPatterns.mainNav,
    ]
      .filter((navItem) => !navItem.external && navItem.href)
      .map((item) => ({
        title: getObjectValueByLocale(item.title, hooksConfig.currentLocale),
        href: item.href,
        group: 'Links',
      }))

    // const docsItems = docsConfig.docs.sidebarNav.flatMap((group) =>
    //   flattenNavItems(group.items, docsConfig.currentLocale, messages.docs)
    // )

    const hooksItems = hooksConfig.hooks.sidebarNav.flatMap((group) =>
      flattenNavItems(group.items, hooksConfig.currentLocale, messages.hooks)
    )

    const formItems = formConfig.form.sidebarNav.flatMap((group) =>
      flattenNavItems(group.items, formConfig.currentLocale, messages.form)
    )

    const uiItems = uiConfig.ui.sidebarNav.flatMap((group) =>
      flattenNavItems(group.items, uiConfig.currentLocale, messages.ui)
    )

    const utilsItems = utilsConfig.utils.sidebarNav.flatMap((group) =>
      flattenNavItems(group.items, utilsConfig.currentLocale, messages.utils)
    )

    const reactPatternsItems =
      reactPatternsConfig.reactPatterns.sidebarNav.flatMap((group) =>
        flattenNavItems(
          group.items,
          reactPatternsConfig.currentLocale,
          messages.reactPatterns
        )
      )

    // const blogItems = allBlogs
    //   .filter((post) => {
    //     const [postLocale] = post.slugAsParams.split('/')
    //     return postLocale === locale
    //   })
    //   .map((post) => {
    //     const [, ...slugs] = post.slugAsParams.split('/')
    //     const slug = slugs.join('/')
    //     return {
    //       title: post.title,
    //       href: `/blog/${slug}`,
    //       group: messages.blog,
    //       searchValue: `${post.title} ${post.excerpt} ${post.tags.join(' ')}`,
    //     }
    //   })

    return {
      mainNav: mainNavItems,
      // docs: docsItems,
      hooks: hooksItems,
      // blog: blogItems,
      form: formItems,
      ui: uiItems,
      utils: utilsItems,
      reactPatterns: reactPatternsItems,
    }
  }, [
    hooksConfig,
    formConfig,
    uiConfig,
    utilsConfig,
    reactPatternsConfig,
    locale,
    messages,
  ])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'bg-card-primary text-muted-foreground relative h-8 w-full justify-start rounded-md border-input text-sm font-normal shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <span className="hidden lg:inline-flex">
          {messages.searchDocumentation}...
        </span>
        <span className="inline-flex lg:hidden">{messages.search}...</span>
        <kbd className="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-0.5 rounded border border-border/50 px-1.5 font-mono text-[10px] font-medium opacity-100 shadow-sm sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={`${messages.typeCommandOrSearch}...`}
          className="h-11"
        />
        <CommandList className="max-h-[400px] overflow-y-auto scrollbar-thin">
          <CommandEmpty className="py-6 text-center text-sm">
            {messages.noResultsFound}.
          </CommandEmpty>

          <CommandGroup heading="Links">
            {allSearchableItems.mainNav.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
                className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <FileIcon className="mr-2 size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1.5" />

          {/* <CommandGroup heading={messages.docs}>
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
          </CommandGroup> */}

          <CommandSeparator className="my-1.5" />

          <CommandGroup heading={messages.hooks}>
            {allSearchableItems.hooks.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
                className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <div className="mr-2 flex size-4 shrink-0 items-center justify-center">
                  <CircleIcon className="size-3" />
                </div>
                <span className="flex-1 truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1.5" />
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

          <CommandSeparator className="my-1.5" /> */}

          <CommandGroup heading={messages.form}>
            {allSearchableItems.form.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
                className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <div className="mr-2 flex size-4 shrink-0 items-center justify-center">
                  <CircleIcon className="size-3" />
                </div>
                <span className="flex-1 truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1.5" />

          <CommandGroup heading={messages.ui}>
            {allSearchableItems.ui.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
                className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <div className="mr-2 flex size-4 shrink-0 items-center justify-center">
                  <CircleIcon className="size-3" />
                </div>
                <span className="flex-1 truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1.5" />

          <CommandGroup heading={messages.utils}>
            {allSearchableItems.utils.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
                className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <div className="mr-2 flex size-4 shrink-0 items-center justify-center">
                  <CircleIcon className="size-3" />
                </div>
                <span className="flex-1 truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1.5" />

          <CommandGroup heading={messages.reactPatterns}>
            {allSearchableItems.reactPatterns.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} (${item.group})`}
                onSelect={() => runCommand(() => router.push(item.href!))}
                className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <div className="mr-2 flex size-4 shrink-0 items-center justify-center">
                  <CircleIcon className="size-3" />
                </div>
                <span className="flex-1 truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1.5" />

          <CommandGroup heading={messages.themes.theme}>
            <CommandItem
              onSelect={() => runCommand(() => setTheme('light'))}
              className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
            >
              <SunIcon className="mr-2 size-4 shrink-0" />
              <span className="flex-1">{messages.themes.light}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => setTheme('dark'))}
              className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
            >
              <MoonIcon className="mr-2 size-4 shrink-0" />
              <span className="flex-1">{messages.themes.dark}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => setTheme('system'))}
              className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
            >
              <LaptopIcon className="mr-2 size-4 shrink-0" />
              <span className="flex-1">{messages.themes.system}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
