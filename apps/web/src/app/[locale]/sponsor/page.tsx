import { Suspense } from 'react'
import { SponsorPageClient } from './sponsor-client'
import { Heart, Users, Github } from 'lucide-react'
import { fetchGitHubRepoStats } from '@/lib/shaddy/api/github'

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
  const stats = await fetchGitHubRepoStats()

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 backdrop-blur-xs border border-border/50">
        <Users className="h-5 w-5 text-primary" />
        <div className="text-left">
          <p className="text-2xl font-bold text-foreground">
            {stats.watchers.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Watchers</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 backdrop-blur-xs border border-border/50">
        <Github className="h-5 w-5 text-primary" />
        <div className="text-left">
          <p className="text-2xl font-bold text-foreground">
            {stats.stars.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">GitHub Stars</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 backdrop-blur-xs border border-border/50">
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-accent/20 border border-primary/20 text-sm font-medium mb-4">
          <Heart className="h-4 w-4 text-primary fill-primary" />
          <span className="text-foreground">Become a Sponsor</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
          Support Open Source
          <span className="block mt-2 bg-linear-to-r from-primary via-accent-foreground to-primary/70 bg-clip-text text-transparent">
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
