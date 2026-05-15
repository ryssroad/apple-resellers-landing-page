'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Menu, X, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@/components/cart-provider'
import { CartSheet } from '@/components/cart-sheet'

const navigation = [
  { name: 'iPhone', href: '#catalog', category: 'iphone' },
  { name: 'Mac', href: '#catalog', category: 'mac' },
  { name: 'iPad', href: '#catalog', category: 'ipad' },
  { name: 'Watch', href: '#catalog', category: 'watch' },
  { name: 'AirPods', href: '#catalog', category: 'airpods' },
  { name: 'Аксессуары', href: '#catalog', category: 'accessories' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, setIsOpen } = useCart()

  return (
    <>
      {/* Top bar */}
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="hidden sm:flex items-center gap-6">
              <a href="tel:+77001234567" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <Phone className="h-3.5 w-3.5" />
                +7 700 123 45 67
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Алматы, Астана, Шымкент
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs sm:text-sm w-full sm:w-auto justify-center sm:justify-end">
              <span>Доставка по всему Казахстану</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Гарантия 1 год</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground">
                <svg className="w-5 h-5 text-background" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
              </div>
              <span className="font-semibold text-lg">iStore KZ</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-sm">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">Меню</span>
                    </div>
                    <nav className="flex flex-col gap-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                    <div className="border-t border-border pt-6 space-y-4">
                      <a href="tel:+77001234567" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Phone className="h-4 w-4" />
                        +7 700 123 45 67
                      </a>
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Алматы, Астана, Шымкент
                      </span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      <CartSheet />
    </>
  )
}
