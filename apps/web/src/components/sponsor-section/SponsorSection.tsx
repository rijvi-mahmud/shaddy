'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'

const sponsors = [
  {
    name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=140&h=60&fit=crop&crop=center',
  },
  {
    name: 'InnovateLab',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=140&h=60&fit=crop&crop=center',
  },
  {
    name: 'DataFlow',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=140&h=60&fit=crop&crop=center',
  },
  {
    name: 'CloudSync',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=140&h=60&fit=crop&crop=center',
  },
  {
    name: 'DevTools Pro',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=140&h=60&fit=crop&crop=center',
  },
  {
    name: 'ScaleUp',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=140&h=60&fit=crop&crop=center',
  },
  {
    name: 'NextGen',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=140&h=60&fit=crop&crop=center&auto=format',
  },
  {
    name: 'BuildFast',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=140&h=60&fit=crop&crop=center&auto=format',
  },
]

function MarqueeRow({
  sponsors,
  reverse = false,
}: {
  sponsors: {
    name: string
    logo?: string
  }[]
  reverse?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame: number
    let start: number | null = null
    let scrollWidth = 0
    let speed = 60 // px per second

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      if (containerRef.current && contentRef.current) {
        if (!scrollWidth) {
          scrollWidth = contentRef.current.scrollWidth / 2
        }
        let offset = ((elapsed / 1000) * speed) % scrollWidth
        if (reverse) offset = scrollWidth - offset
        contentRef.current.style.transform = `translateX(${-offset}px)`
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [reverse])

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <div
        ref={contentRef}
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {[...sponsors, ...sponsors].map((sponsor, idx) => (
          <Card
            key={`${reverse ? 'row2' : 'row1'}-${sponsor.name}-${idx}`}
            className="flex items-center justify-center shadow-md mx-2 min-w-[25%] bg-transparent border-none"
          >
            <Image
              src={sponsor.logo || '/placeholder.svg'}
              alt={`${sponsor.name} logo`}
              width={400} // bigger logo
              height={160} // bigger logo
              className="w-full h-full object-contain opacity-80"
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function SponsorSection() {
  const hasSponsors = sponsors.length < 0

  return (
    <div className="container relative mx-auto px-4 md:px-6 z-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Our Sponsors
      </h1>

      {/* Marquee Rows or Fallback */}
      <div className="space-y-6">
        {hasSponsors ? (
          <>
            <MarqueeRow sponsors={sponsors} />
            <MarqueeRow sponsors={sponsors} reverse />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Image
              src="/placeholder.svg"
              alt="No sponsors yet"
              width={120}
              height={120}
              className="mb-4 opacity-60"
            />
            <p className="text-lg text-slate-400">
              No sponsors yet. Be the first to partner with us!
            </p>
          </div>
        )}
      </div>

      <div className="text-center mt-16">
        <p className="text-sm text-slate-400 mb-6">Want to become a sponsor?</p>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-slate-900 hover:bg-slate-200 h-10 px-6 py-2">
          Partner with Us
        </button>
      </div>
    </div>
  )
}
