import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest'
import { GET } from './route'

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

describe('GET /api/github/repo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return formatted repository data', async () => {
    const mockRepoData = {
      stargazers_count: 100,
      forks_count: 50,
      subscribers_count: 30,
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepoData,
    })

    const response = await GET()
    const data = await response.json()

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/rijvi-mahmud/shaddy',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    )

    expect(data).toEqual({
      stars: 100,
      forks: 50,
      watchers: 30,
    })
  })

  it('should handle missing data with default values', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const response = await GET()
    const data = await response.json()

    expect(data).toEqual({
      stars: 0,
      forks: 0,
      watchers: 0,
    })
  })

  it('should handle API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    })

    const response = await GET()
    const data = await response.json()

    expect(data).toEqual({
      error: 'Failed to fetch GitHub repository data',
    })
    expect(response.status).toBe(500)
  })
})

afterAll(() => {
  vi.restoreAllMocks()
})
