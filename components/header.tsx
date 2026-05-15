'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'
import { ShoppingBag, Menu, Phone, MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { CartSheet } from '@/components/cart-sheet'

const navigation = [
  { name: 'iPhone', category: 'iphone' },
  { name: 'Mac', category: 'mac' },
  { name: 'iPad', category: 'ipad' },
  { name: 'Watch', category: 'watch' },
  { name: 'AirPods', category: 'airpods' },
  { name: 'Аксессуары', category: 'accessories' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, setIsOpen, setActiveCategory } = useCart()

  const handleNavClick = useCallback((category: string) => {
    setActiveCategory(category)
    setMobileMenuOpen(false)
    
    // Scroll to catalog section
    const catalogElement = document.getElementById('catalog')
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [setActiveCategory])

  return (
    <>
      {/* Top bar */}
      <div className="bg-foreground/95 text-background backdrop-blur-sm">
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

      {/* Main header - Liquid Glass */}
      <header className="sticky top-0 z-50 glass border-b border-white/30">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-foreground premium-shadow">
                <svg className="w-5 h-5 text-background" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight">iRoom</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item.category)}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/50 rounded-full transition-all cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full hover:bg-white/50"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden h-10 w-10 rounded-full hover:bg-white/50"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu - Fixed Liquid Glass */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="absolute top-0 right-0 h-full w-full max-w-sm glass-menu animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-semibold text-xl">Меню</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full hover:bg-black/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Navigation */}
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleNavClick(item.category)}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-white/50 rounded-xl px-4 py-3 transition-all text-left cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
              
              {/* Contact info */}
              <div className="mt-auto pt-8 border-t border-black/10 space-y-4">
                <a 
                  href="tel:+77001234567" 
                  className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium">+7 700 123 45 67</span>
                </a>
                <div className="flex items-center gap-3 text-foreground/70">
                  <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Алматы, Астана, Шымкент</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartSheet />
    </>
  )
}
