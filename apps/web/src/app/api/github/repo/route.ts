import { NextResponse } from 'next/server'

export async function GET() {
  try {
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
      throw new Error('Failed to fetch GitHub repo data')
    }

    const data = await response.json()

    return NextResponse.json({
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      watchers: data.subscribers_count || 0,
    })
  } catch (error) {
    console.error('Error in GitHub repo API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repository data' },
      { status: 500 }
    )
  }
}
