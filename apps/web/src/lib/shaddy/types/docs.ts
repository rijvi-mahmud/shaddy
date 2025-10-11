import type { NavItem, SidebarNavItem } from './nav'
import type { LocaleOptions } from './i18n'

export interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export type DocParams = {
  slug: string[]
  locale: LocaleOptions
}

export interface DocPageProps {
  params: Promise<DocParams>
}
