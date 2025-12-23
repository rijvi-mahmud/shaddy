import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest'
import { GET } from './route'
import { NextResponse } from 'next/server'

// Mock the fetch function
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
    })),
  },
}))

describe('GET /api/github/contributors', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return formatted contributors data', async () => {
    const mockContributors = [
      {
        id: 1,
        login: 'user1',
        avatar_url: 'https://avatar.com/user1',
        html_url: 'https://github.com/user1',
        contributions: 10,
      },
    ]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContributors,
    })

    const response = await GET()
    const data = await response.json()

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/rijvi-mahmud/shaddy/contributors',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 * 60 * 24 },
      }
    )

    expect(data).toEqual([
      {
        id: 1,
        login: 'user1',
        avatar_url: 'https://avatar.com/user1',
        html_url: 'https://github.com/user1',
        contributions: 10,
      },
    ])
  })

  it('should handle API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'API rate limit exceeded',
    })

    const response = await GET()
    const data = await response.json()

    expect(data).toEqual([])
    expect(response.status).toBe(200)
  })
})

afterAll(() => {
  vi.restoreAllMocks()
})
