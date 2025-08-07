'use client'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/registry/default/hooks/use-local-storage'
import { RefreshCw } from 'lucide-react'

// Example 4: Advanced usage with custom serialization
const AdvancedExample = () => {
  // Custom serialization for Date objects
  const [lastVisit, setLastVisit, removeLastVisit] = useLocalStorage(
    'last-visit',
    new Date(),
    {
      serializer: (date: Date) => date.toISOString(),
      deserializer: (dateStr: string) => new Date(dateStr),
    }
  )

  // Shopping cart with complex data
  type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    addedAt: Date
  }
  const [cart, setCart, removeCart] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  )

  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${cart.length + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      quantity: 1,
      addedAt: new Date(),
    }
    setCart([...cart, newItem])
  }

  const updateVisit = () => {
    setLastVisit(new Date())
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Advanced Features</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">Custom Date Serialization</h4>
            <div className="p-3 bg-muted/50 rounded">
              <div className="text-sm text-muted-foreground">Last Visit:</div>
              <div className="font-mono text-sm">
                {lastVisit.toLocaleString()}
              </div>
              <Button onClick={updateVisit} size="sm" className="mt-2">
                <RefreshCw className="h-4 w-4 mr-1" />
                Update Visit Time
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Shopping Cart</h4>
            <div className="p-3 bg-muted/50 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Items: {cart.length}
                </span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={addToCart} size="sm">
                  Add Item
                </Button>
                <Button
                  onClick={removeCart}
                  variant="outline"
                  size="sm"
                  disabled={cart.length === 0}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {cart.length > 0 && (
          <div className="mt-4">
            <h5 className="font-medium mb-2">Cart Contents:</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 bg-background rounded border text-sm"
                >
                  <span>{item.name}</span>
                  <span className="font-medium">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedExample
