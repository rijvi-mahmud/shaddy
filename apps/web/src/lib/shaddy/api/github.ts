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
  const response = await fetch('/api/github/repo')
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repository stats')
  }
  return response.json()
}

export async function fetchGitHubContributors(): Promise<GitHubContributor[]> {
  const response = await fetch('/api/github/contributors')
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub contributors')
  }
  return response.json()
}
