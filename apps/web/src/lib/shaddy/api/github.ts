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

async function githubFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...options.headers,
      },
    })

    if (response.status === 403) {
      console.warn(
        `GitHub API Rate Limit exceeded for ${url}. Returning fallback data.`
      )
      return null
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from GitHub API (${url}):`, error)
    return null
  }
}

export async function fetchGitHubRepoStats(): Promise<GitHubRepoStats> {
  const data = await githubFetch(
    'https://api.github.com/repos/rijvi-mahmud/shaddy',
    {
      next: { revalidate: 3600 },
    }
  )

  return {
    stars: data?.stargazers_count || 0,
    forks: data?.forks_count || 0,
    watchers: data?.subscribers_count || 0,
  }
}

export async function fetchGitHubContributors(): Promise<GitHubContributor[]> {
  const contributors = await githubFetch(
    'https://api.github.com/repos/rijvi-mahmud/shaddy/contributors',
    {
      next: { revalidate: 60 * 60 * 24 },
    }
  )

  if (!contributors || !Array.isArray(contributors)) {
    return []
  }

  return contributors.map((contributor: any) => ({
    id: contributor.id,
    login: contributor.login,
    avatar_url: contributor.avatar_url,
    html_url: contributor.html_url,
    contributions: contributor.contributions,
  }))
}
