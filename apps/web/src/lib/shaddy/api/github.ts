export interface GitHubRepoStats {
  stars: number
  forks: number
  watchers: number
}

export interface GitHubContributor {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export async function fetchGitHubRepoStats(): Promise<GitHubRepoStats> {
  const response = await fetch(
    'https://api.github.com/repos/rijvi-mahmud/shaddy',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repository stats')
  }

  const data = await response.json()

  return {
    stars: data.stargazers_count || 0,
    forks: data.forks_count || 0,
    watchers: data.subscribers_count || 0,
  }
}

export async function fetchGitHubContributors(): Promise<GitHubContributor[]> {
  const response = await fetch(
    'https://api.github.com/repos/rijvi-mahmud/shaddy/contributors',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 60 * 60 * 24 }, // Cache for 1 day
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub contributors')
  }

  const contributors = await response.json()

  return contributors.map((contributor: any) => ({
    id: contributor.id,
    login: contributor.login,
    avatar_url: contributor.avatar_url,
    html_url: contributor.html_url,
    contributions: contributor.contributions,
  }))
}
