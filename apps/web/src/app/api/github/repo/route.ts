import { NextResponse } from 'next/server'

import { fetchGitHubRepoStats } from '@/lib/shaddy/api/github'

export async function GET() {
  try {
    const data = await fetchGitHubRepoStats()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GitHub repo API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repository data' },
      { status: 500 }
    )
  }
}
