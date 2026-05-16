'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { products, type Product } from '@/lib/products'

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedStorage?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, color?: string, storage?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const CART_STORAGE_KEY = 'iroom-cart'

function loadCartItems(): CartItem[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedItems = window.localStorage.getItem(CART_STORAGE_KEY)

    const parsedItems = storedItems ? JSON.parse(storedItems) : []

    if (!Array.isArray(parsedItems)) {
      return []
    }

    return parsedItems.reduce<CartItem[]>((items, item) => {
      const product = products.find((catalogProduct) => catalogProduct.id === item?.product?.id)

      if (!product || typeof item?.quantity !== 'number') {
        return items
      }

      items.push({
        product,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedStorage: item.selectedStorage,
      })

      return items
    }, [])
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hasLoadedCart, setHasLoadedCart] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setItems(loadCartItems())
    setHasLoadedCart(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedCart) {
      return
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [hasLoadedCart, items])

  const addItem = useCallback((product: Product, color?: string, storage?: string) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => 
          item.product.id === product.id && 
          item.selectedColor === color && 
          item.selectedStorage === storage
      )
      
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      }
      
      return [...prev, { product, quantity: 1, selectedColor: color, selectedStorage: storage }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
