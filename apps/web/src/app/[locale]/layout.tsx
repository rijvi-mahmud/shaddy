import { setRequestLocale } from 'next-intl/server'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'
import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

import { getObjectValueByLocale } from '@/lib/shaddy/utils/locale'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { defaultLocale } from '@/config/i18n'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'

import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { GoogleAnalytics } from '@next/third-parties/google'

interface AppLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: LocaleOptions
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LocaleOptions }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale || defaultLocale)

  return {
    metadataBase: new URL(siteConfig.url || 'http://localhost:3000'),

    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },

    description: getObjectValueByLocale(siteConfig.description, locale),

    keywords: [
      'Docs',
      'Blog',
      'i18n',
      'React',
      'shadcn',
      'Next.js',
      'Radix UI',
      'Template',
      'Tailwind CSS',
      'Documentation',
      'Server Components',
      'Internationalization',
    ],

    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.author.site,
      },
    ],

    creator: siteConfig.author.name,

    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      siteName: siteConfig.name,

      description: getObjectValueByLocale(
        siteConfig.description,
        locale
      ),

      images: [
        {
          ...siteConfig.og.size,
          alt: siteConfig.name,
          url: siteConfig.og.image,
        },
      ],
    },

    twitter: {
      creator: siteConfig.links.twitter.username,
      title: siteConfig.name,
      card: 'summary_large_image',
      images: [siteConfig.og.image],

      description: getObjectValueByLocale(
        siteConfig.description,
        locale
      ),
    },

    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      shortcut: '/favicon-16x16.png',
    },

    manifest: `${siteConfig.url}/site.webmanifest`,
  }
}

export const dynamicParams = true

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default async function RootLayout({ children, params }: AppLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <html lang={locale || defaultLocale} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#181423" />
      </head>

      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider
          locale={locale || defaultLocale}
          messages={{}}
        >
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="relative z-10 flex min-h-screen flex-col">
              <SiteHeader />

              <main className="flex-1">{children}</main>

              <SiteFooter />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-FMY1H5W652" />

        <Toaster />
      </body>
    </html>
  )
}
