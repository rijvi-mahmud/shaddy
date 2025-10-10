import { Suspense } from 'react'
import { SponsorPageClient } from './sponsor-client'
import { Heart, Users, Github } from 'lucide-react'

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
}

async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/rijvi-mahmud/shaddy',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub stats')
    }

    const data = await response.json()

    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      watchers: data.subscribers_count || 0,
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    return {
      stars: 0,
      forks: 0,
      watchers: 0,
    }
  }
}

function StatsSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted animate-pulse"
        >
          <div className="h-5 w-5 bg-muted-foreground/20 rounded" />
          <div>
            <div className="h-6 w-16 bg-muted-foreground/20 rounded mb-1" />
            <div className="h-3 w-20 bg-muted-foreground/20 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function StatsDisplay() {
  const stats = await getGitHubStats()

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/50">
        <Users className="h-5 w-5 text-primary" />
        <div className="text-left">
          <p className="text-2xl font-bold text-foreground">
            {stats.watchers.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Watchers</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/50">
        <Github className="h-5 w-5 text-primary" />
        <div className="text-left">
          <p className="text-2xl font-bold text-foreground">
            {stats.stars.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">GitHub Stars</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/50">
        <Heart className="h-5 w-5 text-primary fill-primary" />
        <div className="text-left">
          <p className="text-2xl font-bold text-foreground">
            {stats.forks.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Forks</p>
        </div>
      </div>
    </div>
  )
}

export default async function SponsorPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/20 border border-primary/20 text-sm font-medium mb-4">
          <Heart className="h-4 w-4 text-primary fill-primary" />
          <span className="text-foreground">Become a Sponsor</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
          Support Open Source
          <span className="block mt-2 bg-gradient-to-r from-primary via-accent-foreground to-primary/70 bg-clip-text text-transparent">
            Shape the Future Together
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your sponsorship helps us build better tools, maintain quality
          documentation, and create a thriving community. Join the companies and
          individuals who make this project possible.
        </p>

        <Suspense fallback={<StatsSkeleton />}>
          <StatsDisplay />
        </Suspense>
      </div>

      <SponsorPageClient />
    </div>
  )
}
