import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tier, name, email, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get access key from environment variable
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not set')
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Prepare data for Web3Forms
    const formData = {
      access_key: accessKey,
      name,
      email,
      company: company || 'Not provided',
      tier: tier === 'general' ? 'General Inquiry' : `${tier} Tier`,
      message,
      subject: `New Sponsor Inquiry: ${tier === 'general' ? 'General' : tier} Tier`,
      from_name: 'OpenDocs Sponsor Form',
      replyto: email,
    }

    // Submit to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Form submitted successfully' },
        { status: 200 }
      )
    } else {
      console.error('Web3Forms error:', result)
      return NextResponse.json(
        { success: false, message: 'Failed to submit form' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
