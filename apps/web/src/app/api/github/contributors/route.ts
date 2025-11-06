import { NextResponse } from 'next/server'

export async function GET() {
  try {
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

    return NextResponse.json(
      contributors.map((contributor: any) => ({
        id: contributor.id,
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions,
      }))
    )
  } catch (error) {
    console.error('Error in GitHub contributors API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributors' },
      { status: 500 }
    )
  }
}
