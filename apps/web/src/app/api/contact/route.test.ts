import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST } from './route'
import { NextRequest } from 'next/server'

// Test data factory
const createTestData = (overrides: Record<string, any> = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Test message',
  ...overrides,
})

// Request helper
const createRequest = (body: Record<string, any>): NextRequest => {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

// Common assertions
const assertErrorResponse = async (
  response: Response,
  status: number,
  message: string
) => {
  const data = await response.json()
  expect(response.status).toBe(status)
  expect(data).toMatchObject({
    success: false,
    message: expect.stringContaining(message),
  })
}

const assertSuccessResponse = async (response: Response) => {
  const data = await response.json()
  expect(response.status).toBe(200)
  expect(data).toMatchObject({
    success: true,
    message: 'Form submitted successfully',
  })
}

// Mock setup
const setupWeb3FormsMock = (
  success: boolean,
  data: Record<string, any> = {}
) => {
  process.env.WEB3FORMS_ACCESS_KEY = 'test-key-123'
  ;(global.fetch as any).mockResolvedValueOnce({
    json: async () => ({
      success,
      ...data,
    }),
  })
}

// Mock the sponsorship config
vi.mock('@/config/sponsorship', () => ({
  getTierByName: vi.fn((tierName: string) => {
    const tiers: Record<string, any> = {
      Bronze: {
        name: 'Bronze',
        price: '$10',
        benefits: ['Your name in our README', 'Sponsor badge on profile'],
      },
      Silver: {
        name: 'Silver',
        price: '$25',
        benefits: ['Everything in Bronze', 'Logo in project documentation'],
      },
    }
    return tiers[tierName]
  }),
}))

describe('POST /api/contact', () => {
  const mockEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...mockEnv }
    global.fetch = vi.fn()
  })

  afterEach(() => {
    process.env = mockEnv
    vi.clearAllMocks()
  })

  it('should return 400 when required fields are missing', async () => {
    const request = createRequest({ name: 'John Doe' })
    const response = await POST(request)

    await assertErrorResponse(response, 400, 'Missing required fields')
  })

  it('should return 500 when WEB3FORMS_ACCESS_KEY is not set', async () => {
    delete process.env.WEB3FORMS_ACCESS_KEY
    const request = createRequest(createTestData())
    const response = await POST(request)

    await assertErrorResponse(response, 500, 'Server configuration error')
  })

  it('should successfully submit form for general inquiry', async () => {
    setupWeb3FormsMock(true)
    const request = createRequest({
      ...createTestData(),
      tier: 'general',
    })

    const response = await POST(request)
    await assertSuccessResponse(response)

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    )
  })

  it('should successfully submit form with sponsorship tier', async () => {
    setupWeb3FormsMock(true)
    const request = createRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      company: 'Acme Corp',
      message: 'Interested in sponsorship',
      tier: 'Bronze',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(response.status).toBe(200)

    const fetchCall = (global.fetch as any).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)

    expect(body.subject).toBe('Sponsorship Inquiry - Bronze Tier - $10/month')
    expect(body.message).toContain('Sponsorship Tier: Bronze')
    expect(body.message).toContain('Price: $10/month')
    expect(body.message).toContain('Your name in our README')
  })

  it('should handle Web3Forms API failure', async () => {
    setupWeb3FormsMock(false, { message: 'API error' })
    const request = createRequest(createTestData())
    const response = await POST(request)

    await assertErrorResponse(response, 500, 'Failed to submit form')
  })

  it('should handle unexpected errors', async () => {
    process.env.WEB3FORMS_ACCESS_KEY = 'test-key-123'
    ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

    const request = createRequest(createTestData())
    const response = await POST(request)

    await assertErrorResponse(response, 500, 'Internal server error')
  })

  it('should include company field when provided', async () => {
    process.env.WEB3FORMS_ACCESS_KEY = 'test-key-123'
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    })

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Tech Corp',
        message: 'Test message',
      }),
    })

    await POST(request)

    const fetchCall = (global.fetch as any).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)

    expect(body.company).toBe('Tech Corp')
  })

  it('should set company to "Not provided" when not included', async () => {
    process.env.WEB3FORMS_ACCESS_KEY = 'test-key-123'
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    })

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    })

    await POST(request)

    const fetchCall = (global.fetch as any).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)

    expect(body.company).toBe('Not provided')
  })
})
