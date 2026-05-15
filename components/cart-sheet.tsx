'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2, CreditCard, ShoppingBag } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg glass-menu border-l-0 p-0">
        <SheetHeader className="p-6 border-b border-neutral-200/50">
          <SheetTitle className="text-left text-xl text-neutral-900">Корзина ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center premium-shadow">
              <ShoppingBag className="w-10 h-10 text-neutral-400" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Корзина пуста</p>
              <p className="text-sm text-neutral-500 mt-1">
                Добавьте товары для оформления заказа
              </p>
            </div>
            <Button onClick={() => setIsOpen(false)} className="rounded-full bg-neutral-900 hover:bg-neutral-800">
              Перейти к покупкам
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className="flex gap-4 p-4 glass-card rounded-2xl">
                    <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight truncate text-neutral-900">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-neutral-500 mt-1 space-y-0.5">
                        {item.selectedColor && <p>Цвет: {item.selectedColor}</p>}
                        {item.selectedStorage && <p>Память: {item.selectedStorage}</p>}
                      </div>
                      <p className="font-semibold text-sm mt-2 text-neutral-900">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-neutral-400 hover:text-red-500 rounded-full"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full glass-button border-neutral-200/50"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium text-neutral-900">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full glass-button border-neutral-200/50"
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

            <div className="border-t border-neutral-200/50 p-6 space-y-4 bg-white/40">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Товары ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Доставка</span>
                  <span className="text-emerald-600 font-medium">Бесплатно</span>
                </div>
                <div className="h-px bg-neutral-200/50 my-3" />
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-neutral-900">Итого</span>
                  <span className="text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full h-14 text-base rounded-full bg-neutral-900 hover:bg-neutral-800 premium-shadow-lg" onClick={handleCheckout}>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Оплатить картой
                </Button>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <span className="text-xs text-neutral-500">Visa, Mastercard, Kaspi QR</span>
                </div>
              </div>

              <Button variant="ghost" className="w-full text-neutral-500 hover:text-neutral-700 rounded-full" onClick={clearCart}>
                Очистить корзину
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
