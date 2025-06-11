"use client"
import { useBoolean } from "@shaddy/use-typed-hooks/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const UseBooleanExample = () => {
  const [value, { setValue, toggle, setTrue, setFalse, reset, getValue }] = useBoolean(false)

  return (
    <Card className="mx-auto p-0! m-0!">
      <CardHeader className="pb-3 space-y-1">
        <CardTitle className="text-xl font-semibold tracking-tight">useBoolean Hook</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-1">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Current value:</span> 
          <Badge variant={value ? "outline" : "destructive"} className="font-mono text-xs px-3 py-0.5">
            {value ? "true" : "false"}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={setTrue} className="h-8 px-4 font-medium">
            Set True
          </Button>
          
          <Button variant="outline" size="sm" onClick={setFalse} className="h-8 px-4 font-medium">
            Set False
          </Button>
          
          <Button variant="secondary" size="sm" onClick={toggle} className="h-8 px-4 font-medium">
            Toggle
          </Button>
          
          <Button variant="ghost" size="sm" onClick={reset} className="h-8 px-4 font-medium">
            Reset
          </Button>
          
          <Button variant="default" size="sm" onClick={() => setValue(!getValue())} className="h-8 px-4 font-medium">
            Set Opposite
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t">
        <CardDescription className="text-xs leading-relaxed pt-2">
          This example demonstrates all methods provided by the useBoolean hook.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
