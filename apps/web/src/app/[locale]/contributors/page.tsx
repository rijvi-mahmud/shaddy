import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink, Github } from 'lucide-react'
import {
  GitHubContributor,
  fetchGitHubContributors,
} from '@/lib/shaddy/api/github'

function ContributorCard({ contributor }: { contributor: GitHubContributor }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-border">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-background shadow-lg">
              <AvatarImage
                src={contributor.avatar_url || '/placeholder.svg'}
                alt={`${contributor.login}'s avatar`}
                className="object-cover"
              />
              <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                {contributor.login.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1">
              <Badge
                variant="secondary"
                className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
              >
                <Github className="h-3 w-3" />
              </Badge>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="font-semibold text-foreground text-lg leading-none">
              {contributor.login}
            </h3>
            <p className="text-sm text-muted-foreground">Contributor</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
            asChild
          >
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View Profile
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

async function ContributorsList() {
  const contributors = await fetchGitHubContributors()

  if (contributors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <Github className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No contributors found
          </h3>
          <p className="text-muted-foreground">
            Unable to load contributors at this time. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.id} contributor={contributor} />
      ))}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="text-center space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
          <Github className="h-4 w-4" />
          Open Source Contributors
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Meet Our Contributors
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Celebrating the talented individuals who have helped shape and improve
          this project. Their dedication and contributions make our community
          stronger.
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <ContributorsList />
      </Suspense>
    </div>
  )
}
