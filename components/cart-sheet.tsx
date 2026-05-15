'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2, CreditCard, ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { formatPrice } from '@/lib/products'
import { toast } from 'sonner'

export function CartSheet() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  const handleCheckout = () => {
    toast.info('Для приема платежей необходимо подключить Stripe', {
      description: 'Подключите интеграцию Stripe в настройках проекта.',
      duration: 5000,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Cart panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md glass-menu animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/5">
            <h2 className="text-xl font-semibold">Корзина ({items.length})</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-full hover:bg-black/5"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-foreground/30" />
              </div>
              <div>
                <p className="font-medium text-foreground/80">Корзина пуста</p>
                <p className="text-sm text-foreground/50 mt-1">
                  Добавьте товары для оформления заказа
                </p>
              </div>
              <Button 
                className="rounded-full px-6 h-11 premium-shadow"
                onClick={() => setIsOpen(false)}
              >
                Перейти к покупкам
              </Button>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} 
                      className="flex gap-4 p-4 rounded-2xl glass-card"
                    >
                      <div className="relative w-20 h-20 bg-white/50 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight truncate text-foreground/90">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-foreground/50 mt-1 space-y-0.5">
                          {item.selectedColor && <p>Цвет: {item.selectedColor}</p>}
                          {item.selectedStorage && <p>Память: {item.selectedStorage}</p>}
                        </div>
                        <p className="font-semibold text-sm mt-2 text-foreground/80">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-foreground/40 hover:text-red-500 hover:bg-red-50"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full glass-button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full glass-button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-black/5 p-6 space-y-4 bg-white/30">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50">Товары ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span className="text-foreground/80">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50">Доставка</span>
                    <span className="text-emerald-600 font-medium">Бесплатно</span>
                  </div>
                  <div className="h-px bg-black/5 my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Итого</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full h-14 rounded-full text-base premium-shadow-lg" 
                    onClick={handleCheckout}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Оплатить картой
                  </Button>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="text-xs text-foreground/40">Visa, Mastercard, Kaspi</span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full rounded-full text-foreground/50 hover:text-foreground hover:bg-black/5" 
                  onClick={clearCart}
                >
                  Очистить корзину
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
