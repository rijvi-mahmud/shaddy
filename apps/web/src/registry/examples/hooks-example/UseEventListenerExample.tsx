'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useEventListener } from '@/registry/hooks/use-event-listener'
import { MousePointer, EyeIcon, EyeOffIcon, Keyboard } from 'lucide-react'
import { useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

const UseEventListenerExample = () => {
  return (
    <Card className="w-full border">
      <CardContent className="pt-6">
        <Tabs defaultValue="click">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="click">Click Events</TabsTrigger>
            <TabsTrigger value="keyboard">Keyboard Events</TabsTrigger>
            <TabsTrigger value="delegation">Event Delegation</TabsTrigger>
          </TabsList>

          <TabsContent value="click" className="space-y-4">
            <ClickExample />
          </TabsContent>

          <TabsContent value="keyboard" className="space-y-4">
            <KeyboardExample />
          </TabsContent>

          <TabsContent value="delegation" className="space-y-4">
            <DelegationExample />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default UseEventListenerExample

// Example 1: Basic click events (similar to original)
const ClickExample = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [clickCount, setClickCount] = useState(0)

  // Using useEventListener with window (default target)
  useEventListener('click', () => {
    setIsVisible(!isVisible)
    setClickCount((prev) => prev + 1)
  })

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm transition-all duration-200">
        <div className="flex justify-center items-center gap-3 py-3">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-primary transition-all duration-200 flex items-center justify-center">
              {isVisible ? (
                <>
                  <EyeIcon className="h-6 w-6 mr-2" />
                  Visible
                </>
              ) : (
                <>
                  <EyeOffIcon className="h-6 w-6 mr-2" />
                  Hidden
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-center mt-2 font-medium">
          <MousePointer className="inline h-3 w-3 mr-1" />
          Click anywhere to toggle visibility (click count: {clickCount})
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          useEventListener('click', handler)
        </code>{' '}
        - Attaches to window by default
      </div>
    </div>
  )
}

// Example 2: Keyboard events
const KeyboardExample = () => {
  const [lastKey, setLastKey] = useState<string>('None')
  const [keyHistory, setKeyHistory] = useState<string[]>([])

  // Using useEventListener with document and keyboard events
  useEventListener(
    'keydown',
    (event) => {
      const key = event.key
      setLastKey(key)
      setKeyHistory((prev) => [key, ...prev.slice(0, 4)])
    },
    document
  )

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="flex justify-center items-center py-3">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">
              Last Key Pressed
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-primary flex items-center justify-center">
              <Keyboard className="h-5 w-5 mr-2" />
              {lastKey === ' ' ? 'Space' : lastKey}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-2">
          {keyHistory.map((key, index) => (
            <div
              key={index}
              className="bg-muted p-2 rounded text-center text-sm font-mono border"
            >
              {key === ' ' ? 'Space' : key}
            </div>
          ))}
        </div>

        <div className="text-center text-xs sm:text-sm mt-4 py-2 bg-muted/50 rounded-md text-muted-foreground">
          Press any key to see it captured here
        </div>
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          useEventListener('keydown', handler, document)
        </code>{' '}
        - Attaches to document
      </div>
    </div>
  )
}

// Example 3: Event delegation
const DelegationExample = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sam Williams',
      email: 'sam@example.com',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Taylor Brown',
      email: 'taylor@example.com',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Jordan Smith',
      email: 'jordan@example.com',
      status: 'Pending',
    },
    {
      id: 5,
      name: 'Casey Miller',
      email: 'casey@example.com',
      status: 'Active',
    },
  ])
  const [lastAction, setLastAction] = useState<string>('')
  const [sortField, setSortField] = useState<string>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const tableRef = useRef<HTMLTableElement>(null)

  // Sort users based on current sort field and direction
  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]
    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })

  // Using a SINGLE event listener to handle ALL table interactions
  useEventListener(
    'click',
    (event, target) => {
      if (!target) return

      // Handle different actions based on data attributes
      const action = target.getAttribute('data-action')

      if (action === 'sort') {
        const field = target.getAttribute('data-field')
        if (field) {
          if (sortField === field) {
            // Toggle direction if clicking same field
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
          } else {
            // New field, default to ascending
            setSortField(field)
            setSortDirection('asc')
          }
          setLastAction(
            `Sorted by ${field} (${sortDirection === 'asc' ? 'ascending' : 'descending'})`
          )
        }
      } else if (action === 'select-all') {
        if (selectedRows.length === users.length) {
          // Deselect all
          setSelectedRows([])
          setLastAction('Deselected all rows')
        } else {
          // Select all
          setSelectedRows(users.map((u) => u.id))
          setLastAction('Selected all rows')
        }
      } else if (action === 'select-row') {
        const rowId = parseInt(target.getAttribute('data-id') || '0')
        if (rowId) {
          setSelectedRows((prev) =>
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId]
          )
          setLastAction(
            `${selectedRows.includes(rowId) ? 'Deselected' : 'Selected'} user #${rowId}`
          )
        }
      } else if (action === 'view') {
        const userId = target.closest('tr')?.getAttribute('data-id')
        const user = users.find((u) => u.id.toString() === userId)
        setLastAction(`Viewing details for ${user?.name}`)
      } else if (action === 'edit') {
        const userId = target.closest('tr')?.getAttribute('data-id')
        const user = users.find((u) => u.id.toString() === userId)
        setLastAction(`Editing ${user?.name}`)
      } else if (action === 'delete') {
        const userId = parseInt(
          target.closest('tr')?.getAttribute('data-id') || '0'
        )
        if (userId) {
          setUsers(users.filter((u) => u.id !== userId))
          setSelectedRows(selectedRows.filter((id) => id !== userId))
          setLastAction(`Deleted user #${userId}`)
        }
      }
    },
    tableRef.current,
    { selector: '[data-action]' }
  )

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <div className="text-center mb-3">
          <div className="text-sm text-muted-foreground mb-1">
            Interactive Data Table
          </div>
          <div className="text-lg font-medium">
            One event listener for all table interactions
          </div>
          <span className={'text-xs text-muted-foreground'}>
            Note: we can effectively handle table with{' '}
            <Link
              className="text-primary hover:underline"
              href={'https://tanstack.com/table/latest'}
            >
              TanStack Table
            </Link>
            . This example demonstrates how to use a single event listener for
            sorting, selecting rows, and performing actions like viewing,
            editing, and deleting users.
          </span>
        </div>

        <div className="border rounded-md overflow-hidden mb-3">
          <table ref={tableRef} className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === users.length && users.length > 0
                      }
                      data-action="select-all"
                      className="mr-2"
                    />
                    <span
                      data-action="sort"
                      data-field="id"
                      className="cursor-pointer hover:text-primary flex items-center"
                    >
                      ID
                      {sortField === 'id' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </span>
                  </div>
                </th>
                <th className="p-2 text-left">
                  <span
                    data-action="sort"
                    data-field="name"
                    className="cursor-pointer hover:text-primary flex items-center"
                  >
                    Name
                    {sortField === 'name' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </th>
                <th className="p-2 text-left">
                  <span
                    data-action="sort"
                    data-field="email"
                    className="cursor-pointer hover:text-primary flex items-center"
                  >
                    Email
                    {sortField === 'email' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </th>
                <th className="p-2 text-left">
                  <span
                    data-action="sort"
                    data-field="status"
                    className="cursor-pointer hover:text-primary flex items-center"
                  >
                    Status
                    {sortField === 'status' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr
                  key={user.id}
                  data-id={user.id}
                  className={`border-t ${
                    selectedRows.includes(user.id)
                      ? 'bg-primary/10 dark:bg-primary/20'
                      : 'bg-background dark:bg-card'
                  }`}
                >
                  <td className="p-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        data-action="select-row"
                        data-id={user.id}
                        className="mr-2"
                      />
                      {user.id}
                    </div>
                  </td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active'
                          ? 'bg-success/20 text-success dark:bg-success/30 dark:text-success-foreground'
                          : user.status === 'Inactive'
                            ? 'bg-muted text-muted-foreground dark:bg-muted/70'
                            : 'bg-warning/20 text-warning dark:bg-warning/30 dark:text-warning-foreground'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center space-x-1">
                      <button
                        data-action="view"
                        className="p-1 text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/90"
                        title="View details"
                      >
                        👁️
                      </button>
                      <button
                        data-action="edit"
                        className="p-1 text-warning hover:text-warning/80 dark:text-warning dark:hover:text-warning/90"
                        title="Edit user"
                      >
                        ✏️
                      </button>
                      <button
                        data-action="delete"
                        className="p-1 text-destructive hover:text-destructive/80 dark:text-destructive dark:hover:text-destructive/90"
                        title="Delete user"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-muted-foreground"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {lastAction && (
          <div className="text-center p-2 border rounded-md bg-muted/50 text-sm">
            Last action: <span className="font-medium">{lastAction}</span>
          </div>
        )}
      </div>

      <div className="text-sm p-2 bg-muted/30 text-muted-foreground rounded border">
        <code className="font-mono text-xs">
          useEventListener('click', handler, tableRef, &#123; selector:
          '[data-action]' &#125;)
        </code>
        <div className="mt-2 text-xs space-y-1">
          <p>
            This data table demonstrates the ideal use case for event
            delegation:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              A single event listener handles 7+ different actions (sort
              columns, select rows, view/edit/delete)
            </li>
            <li>
              Works efficiently even with many rows without performance
              degradation
            </li>
            <li>Automatically works with dynamically added/removed elements</li>
            <li>Uses data attributes to simplify event handling logic</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
