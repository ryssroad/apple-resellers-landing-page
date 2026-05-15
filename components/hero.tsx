'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Truck, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'Гарантия 1 год',
    description: 'Официальная гарантия на всю технику',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'По всему Казахстану за 1-3 дня',
  },
  {
    icon: CreditCard,
    title: 'Удобная оплата',
    description: 'Visa, Mastercard, Kaspi QR',
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Новинки 2026 уже в наличии
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Официальная техника{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Apple
              </span>{' '}
              в Казахстане
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              Авторизованный реселлер Apple. Гарантия качества, быстрая доставка по всему Казахстану и удобная оплата любым способом.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="#catalog">
                  Смотреть каталог
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <a href="tel:+77001234567">
                  Позвонить нам
                </a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-muted via-transparent to-transparent rounded-3xl" />
              <Image
                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693009284541"
                alt="iPhone 17 Pro Max"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-6 pb-12 lg:pb-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
