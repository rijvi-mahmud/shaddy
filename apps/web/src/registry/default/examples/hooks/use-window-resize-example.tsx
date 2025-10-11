'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useWindowResize } from '@/registry/default/hooks/use-window-resize'
import { ArrowsUpFromLine } from 'lucide-react'

const UseWindowResizeExample = () => {
  const { width = 0, height = 0 } = useWindowResize()

  return (
    <Card className="w-full border">
      <CardContent className="space-y-4 pt-6">
        {/* Dimensions Display */}
        <div className="bg-muted/30 rounded-md p-4 shadow-xs transition-all duration-200">
          <div className="flex justify-center items-center gap-3 py-3">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Width</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-primary transition-all duration-200">
                {width}px
              </div>
            </div>
            <div className="text-muted-foreground">×</div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Height</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-primary transition-all duration-200">
                {height}px
              </div>
            </div>
          </div>
          <div className="text-center text-xs sm:text-sm mt-2 py-2 bg-muted/50 rounded-md text-muted-foreground flex items-center justify-center">
            <ArrowsUpFromLine className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Resize your browser window to see changes
            <ArrowsUpFromLine className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
          </div>
        </div>

        {/* Responsive Info */}
        <div className="grid grid-cols-1 gap-2">
          <div className="text-xs sm:text-sm p-2 border rounded-md">
            <span className="font-medium">Viewport Size: </span>
            {width < 640
              ? 'Small (Mobile)'
              : width < 1024
                ? 'Medium (Tablet)'
                : 'Large (Desktop)'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UseWindowResizeExample
