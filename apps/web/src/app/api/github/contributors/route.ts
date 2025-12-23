import { NextResponse } from 'next/server'

import { fetchGitHubContributors } from '@/lib/shaddy/api/github'

export async function GET() {
  try {
    const contributors = await fetchGitHubContributors()
    return NextResponse.json(contributors)
  } catch (error) {
    console.error('Error in GitHub contributors API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributors' },
      { status: 500 }
    )
  }
}
