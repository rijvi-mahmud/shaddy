'use client'

import { useLogger } from '@/registry/default/hooks/use-logger'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Bug,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Table as TableIcon,
  Timer,
  Trash2,
} from 'lucide-react'

const UseLoggerExample = () => {
  const logger = useLogger({
    prefix: 'Demo',
    colored: true,
    showTimestamp: true,
  })

  const logActions = [
    {
      label: 'Debug',
      icon: Bug,
      action: () => logger.debug('Debug message', { data: 'debug info' }),
    },
    {
      label: 'Info',
      icon: Info,
      action: () => logger.info('Info message', { userId: 123 }),
    },
    {
      label: 'Warning',
      icon: AlertTriangle,
      action: () => logger.warn('Warning message'),
    },
    {
      label: 'Error',
      icon: XCircle,
      action: () =>
        logger.error('Error occurred', new Error('Something went wrong!')),
    },
    {
      label: 'Success',
      icon: CheckCircle2,
      action: () => logger.success('Success!', { duration: '2.5s' }),
    },
    {
      label: 'Table',
      icon: TableIcon,
      action: () =>
        logger.table([
          { id: 1, name: 'John Doe', role: 'Admin' },
          { id: 2, name: 'Jane Smith', role: 'User' },
        ]),
    },
    {
      label: 'Timer',
      icon: Timer,
      action: () => {
        logger.time('Timer')
        setTimeout(() => logger.timeEnd('Timer'), 1000)
      },
    },
    {
      label: 'Clear',
      icon: Trash2,
      action: () => logger.clear(),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Logger Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {logActions.map(({ label, icon: Icon, action }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              onClick={action}
              className="h-auto py-2.5 flex flex-col items-center gap-1.5"
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          💡 Open browser console (F12) to see the logs
        </p>
      </CardContent>
    </Card>
  )
}

export default UseLoggerExample
