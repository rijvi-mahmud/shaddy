import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'
import { VersionDropdown } from './version-dropdown'
import { MobileNav } from '@/components/mobile-nav'
import { MainNav } from '@/components/main-nav'
import { buttonVariants } from './ui/button'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { I18nToggle } from './i18n-toggle'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

const CommandMenu = dynamic(() =>
  import('@/components/command-menu').then((mod) => mod.CommandMenu)
)

const githubStars = async () => {
  try {
    const repoPath = siteConfig.links.github.url.replace(
      'https://github.com/',
      ''
    )

    const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    return data.stargazers_count
  } catch (error) {
    console.error('Error fetching GitHub stars:', error)
    return null
  }
}

// GitHub Stars component with loading state
const GitHubStars = async () => {
  const stars = await githubStars()

  if (stars === null) {
    return null
  }

  return <span className="font-medium">{stars.toLocaleString()}</span>
}

export async function SiteHeader() {
  const t = await getTranslations('site')

  return (
    <header className={'sticky top-0 z-50 w-full backdrop-blur'}>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav
          messages={{
            docs: t('words.docs'),
            blog: t('words.blog'),
            typed_hooks: t('words.typed_hooks'),
            utility: t('words.utility'),
            form: t('words.form'),
          }}
        />

        <MobileNav
          messages={{
            menu: t('words.menu'),
            toggleMenu: t('buttons.toggle_menu'),
          }}
          menuLinks={<SiteHeaderMenuLinks />}
        />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu
              messages={{
                docs: t('words.docs'),
                blog: t('words.blog'),
                hooks: t('words.typed_hooks'),
                search: t('search.search'),
                noResultsFound: t('search.no_results_found'),
                typeCommandOrSearch: t('search.type_command_or_search'),
                searchDocumentation: t('search.search_documentation'),

                themes: {
                  dark: t('themes.dark'),
                  theme: t('themes.theme'),
                  light: t('themes.light'),
                  system: t('themes.system'),
                },
              }}
            />
          </div>

          <nav className="flex items-center">
            {/* <VersionDropdown
              messages={{
                changelog: t('changelog'),
              }}
            /> */}

            {/* <I18nToggle
              messages={{
                toggleLanguage: t('buttons.toggle_language'),
              }}
            /> */}

            <ThemeModeToggle
              messages={{
                dark: t('themes.dark'),
                light: t('themes.light'),
                system: t('themes.system'),
              }}
            />

            <div className="phone:flex hidden items-center">
              <Separator orientation="vertical" className="mx-1 h-5" />
              <SiteHeaderMenuLinks />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export function SiteHeaderMenuLinks() {
  return (
    <Link href={siteConfig.links.github.url} target="_blank" rel="noreferrer">
      <div
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
          'w-auto px-2',
          'flex items-center justify-center'
        )}
      >
        <Icons.gitHub className="size-4 mr-1.5" />
        <Suspense fallback={null}>
          <GitHubStars />
        </Suspense>
        <span className="sr-only">GitHub</span>
      </div>
    </Link>
  )
}
