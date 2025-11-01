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
import { AnnouncementBanner } from '@/components/announcement-banner'

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
      next: { revalidate: 60 * 60 * 24 * 2 }, // Cache for 2 days
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
    <>
      <AnnouncementBanner
        message="Hiring? Remote Frontend/Full Stack Dev | 3+ years React/Next.js/NodeJs | Startup & Team Lead experience | AI Engineering | Open to freelance & full-time"
        ctas={[
          {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/rijvi-mahmud/',
          },
          {
            text: 'Portfolio',
            href: 'https://rijvi-mahmud-portfolio.vercel.app/',
          },
        ]}
        variant="gradient"
        storageKey="hiring-banner-nov-2024"
      />
      <div className="container flex h-14 max-w-(--breakpoint-2xl) items-center top-0 z-50 w-full backdrop-blur-sm sticky top-0">
        <MainNav
          messages={{
            docs: t('words.docs'),
            blog: t('words.blog'),
            typed_hooks: t('words.typed_hooks'),
            table: t('words.table'),
            form: t('words.form'),
            ui: t('words.ui'),
            utils: t('words.utils'),
            resources: t('words.resources'),
            react_patterns: t('words.react_patterns'),
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
                form: t('words.form'),
                docs: t('words.docs'),
                blog: t('words.blog'),
                hooks: t('words.typed_hooks'),
                ui: t('words.ui'),
                utils: t('words.utils'),
                reactPatterns: t('words.react_patterns'),
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
    </>
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
