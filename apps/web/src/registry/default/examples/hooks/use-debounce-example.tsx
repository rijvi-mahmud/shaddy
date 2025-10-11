'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Clock, Search, Loader2, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/registry/default/hooks/use-debounce'

const UseDebounceExample = () => {
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [delay, setDelay] = useState(500)

  // Debounce the input value with the selected delay
  const debouncedValue = useDebounce(inputValue, delay)

  // This effect simulates an API call whenever the debounced value changes
  useEffect(() => {
    // Only search if there's a value
    if (!debouncedValue) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setIsSearching(true)
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 500))
      setResults([
        `Result for "\${debouncedValue}" - Item 1`,
        `Result for "\${debouncedValue}" - Item 2`,
        `Result for "\${debouncedValue}" - Item 3`,
      ])
      setIsSearching(false)
    }

    fetchResults()
  }, [debouncedValue])

  return (
    <Card className="mx-auto max-w-md w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Debounce Search</h3>
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              <Clock className="h-3 w-3 mr-1" />
              {delay}ms
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setDelay(Math.max(100, delay - 100))}
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => setDelay(delay + 100)}
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type to search..."
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs bg-muted/50 rounded-md p-2">
          <div>
            <span className="text-muted-foreground">Input:</span>
            <div className="font-medium truncate">
              {inputValue || '(empty)'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Debounced:</span>
            <div className="font-medium truncate">
              {debouncedValue || '(empty)'}
            </div>
          </div>
        </div>

        <div className="min-h-[140px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Results</span>
            {isSearching && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Searching...
              </div>
            )}
            {!isSearching && results.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {results.length} found
              </Badge>
            )}
          </div>

          {!isSearching && results.length > 0 && (
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="group relative p-3 bg-linear-to-r from-muted/20 to-muted/10 rounded-lg border border-border/50 hover:border-primary/20 hover:shadow-xs transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground mb-1">
                        {result.split(' - ')[1] || result}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Match for "\${debouncedValue}" •{' '}
                        {Math.floor(Math.random() * 100)}% relevance
                      </div>
                    </div>
                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {isSearching && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-3 bg-muted/20 rounded-lg border border-border/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-4 bg-muted rounded animate-pulse"
                        style={{ width: `${60 + Math.random() * 30}%` }}
                      />
                      <div
                        className="h-3 bg-muted/60 rounded animate-pulse"
                        style={{ width: `${40 + Math.random() * 20}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isSearching && results.length === 0 && (
            <div className="flex flex-col items-center justify-center h-24 text-center">
              {inputValue ? (
                <>
                  <Search className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <div className="text-xs text-muted-foreground">
                    No results found for "\${inputValue}"
                  </div>
                  <div className="text-xs text-muted-foreground/70 mt-1">
                    Try adjusting your search terms
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-muted/30 rounded-full flex items-center justify-center mb-2">
                    <Search className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Start typing to search
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default UseDebounceExample
