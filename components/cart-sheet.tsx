'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2, CreditCard } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left">Корзина ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <CreditCard className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Корзина пуста</p>
              <p className="text-sm text-muted-foreground mt-1">
                Добавьте товары для оформления заказа
              </p>
            </div>
            <Button onClick={() => setIsOpen(false)}>
              Перейти к покупкам
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className="flex gap-4 py-4 border-b border-border last:border-0">
                    <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        {item.selectedColor && <p>Цвет: {item.selectedColor}</p>}
                        {item.selectedStorage && <p>Память: {item.selectedStorage}</p>}
                      </div>
                      <p className="font-semibold text-sm mt-2">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
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

            <div className="border-t border-border pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Итого</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full h-12 text-base" onClick={handleCheckout}>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Оплатить картой
                </Button>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Image src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/kz.svg" alt="KZ" width={20} height={15} className="rounded-sm" />
                  <span className="text-xs text-muted-foreground">Visa, Mastercard, Kaspi</span>
                </div>
              </div>

              <Button variant="ghost" className="w-full" onClick={clearCart}>
                Очистить корзину
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
